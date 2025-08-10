"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ensureAudioContext,
  isSecureContextOK,
  mapGumError,
  queryMicPermission,
  type PermState,
} from "../lib/audioGuard";
import { sendMessage } from "../lib/audioModem";

export default function SabitxVaultOfflineAudioMesh() {
  const [nick, setNick] = useState(() => `SABIT-${Math.random().toString(36).slice(2, 6)}`);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [perm, setPerm] = useState<PermState>("unknown");
  const [secure, setSecure] = useState<boolean>(true);
  const [demoMode, setDemoMode] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setSecure(isSecureContextOK());
    queryMicPermission().then(setPerm).catch(() => setPerm("unknown"));
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      analyserRef.current?.disconnect();
      sourceRef.current?.disconnect();
      audioCtxRef.current?.close().catch(() => {});
    };
  }, []);

  async function primeAudio() {
    setError(null);
    try {
      if (!audioCtxRef.current) audioCtxRef.current = await ensureAudioContext();
      if (audioCtxRef.current.state === "suspended") await audioCtxRef.current.resume();
    } catch (err: any) {
      setError(err?.message || "Failed to initialize audio.");
    }
  }

  async function startListening() {
    setError(null);
    if (!secure) {
      setError("Blocked: mic requires HTTPS or localhost.");
      return;
    }
    await primeAudio();
    const ctx = audioCtxRef.current!;
    try {
      if (perm === "denied") {
        setError("Mic permission denied. Allow mic for sabitx.com and reload.");
        return;
      }
      if (!navigator.mediaDevices?.getUserMedia) {
        setError("Browser does not support getUserMedia.");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: false },
      });
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.2;
      source.connect(analyser);

      sourceRef.current = source;
      analyserRef.current = analyser;

      const buf = new Uint8Array(analyser.frequencyBinCount);
      const loop = () => {
        analyser.getByteFrequencyData(buf);
        rafRef.current = requestAnimationFrame(loop);
      };
      loop();

      setListening(true);
    } catch (err: any) {
      setError(mapGumError(err));
      setListening(false);
    }
  }

  function stopListening() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    analyserRef.current?.disconnect();
    sourceRef.current?.disconnect();
    analyserRef.current = null;
    sourceRef.current = null;
    setListening(false);
  }

  return (
    <div className="bg-neutral-950 text-neutral-100 p-4 rounded-2xl">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-xl font-semibold">SABITX Vault · Offline Audio Mesh</h2>
          <p className="text-xs text-neutral-400">Air‑gap comms over sound. No Wi‑Fi, no cellular.</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-neutral-400">Node</div>
          <div className="text-sm font-mono">{nick}</div>
        </div>
      </div>

      {!secure && (
        <div className="rounded-lg border border-red-500/30 bg-red-900/20 p-2 text-sm mb-2">
          Not a secure context. Use HTTPS/localhost.
        </div>
      )}
      {error && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-900/20 p-2 text-sm mb-2">{error}</div>
      )}

      <div className="grid gap-3">
        <div className="bg-neutral-900 rounded-xl p-3">
          <label className="block text-sm mb-1">Nickname</label>
          <input
            value={nick}
            onChange={(e) => setNick(e.target.value)}
            className="w-full bg-neutral-800 rounded-lg px-3 py-2 outline-none"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {!listening ? (
              <button onClick={startListening} className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500">
                Enable Mic + Start Listening
              </button>
            ) : (
              <button onClick={stopListening} className="px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-500">
                Stop Listening
              </button>
            )}
            <button onClick={primeAudio} className="px-3 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600">
              Prime Audio
            </button>
            {!listening && (
              <button
                onClick={() => {
                  setDemoMode((v) => !v);
                  setError(null);
                }}
                className="px-3 py-2 rounded-lg bg-blue-700 hover:bg-blue-600"
              >
                {demoMode ? "Disable Demo" : "Enable Demo (No Mic)"}
              </button>
            )}
            <button
              onClick={() => sendMessage("VAULT ONLINE")}
              className="px-3 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 text-white font-semibold"
            >
              Transmit Signal
            </button>
          </div>
          <p className="mt-2 text-xs text-neutral-400">
            Permission: {perm}. Secure: {String(secure)}. If denied, allow mic for sabitx.com and reload.
          </p>
        </div>
      </div>
    </div>
  );
}