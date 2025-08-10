"use client";
import React, { useEffect, useRef, useState } from "react";
import { ensureAudioContext, isSecureContextOK, mapGumError, queryMicPermission, type PermState } from "../../lib/audioGuard";

function textToBits(s: string): number[] {
  const bytes = new TextEncoder().encode(s);
  const bits: number[] = [];
  for (let i = 0; i < 32; i++) bits.push(i % 2); // preamble
  for (const b of bytes) for (let i = 0; i < 8; i++) bits.push((b >> i) & 1);
  return bits;
}

export default function UltrasoundHandshake(props: { payload: string; onReceive?: (txt: string)=>void; }) {
  const { payload, onReceive } = props;
  const [perm, setPerm] = useState<PermState>("unknown");
  const [secure, setSecure] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [sending, setSending] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setSecure(isSecureContextOK());
    queryMicPermission().then(setPerm).catch(()=>setPerm("unknown"));
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      analyserRef.current?.disconnect();
      sourceRef.current?.disconnect();
      audioCtxRef.current?.close().catch(()=>{});
    };
  }, []);

  async function prime() {
    try {
      const ctx = await ensureAudioContext();
      audioCtxRef.current = ctx;
    } catch (e:any) { setErr(e?.message || "Audio init failed."); }
  }

  async function startListen() {
    setErr(null);
    if (!secure) { setErr("HTTPS/localhost required for mic."); return; }
    if (perm === "denied") { setErr("Mic denied. Allow mic and reload."); return; }
    await prime();
    try {
      const ctx = audioCtxRef.current!;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true }});
      const src = ctx.createMediaStreamSource(stream);
      const an = ctx.createAnalyser();
      an.fftSize = 2048;
      src.connect(an);
      sourceRef.current = src;
      analyserRef.current = an;

      const f0 = 1550, f1 = 1950; // safer than >18kHz for phones
      const binHz = ctx.sampleRate / an.fftSize;
      const b0 = Math.round(f0 / binHz);
      const b1 = Math.round(f1 / binHz);
      const buf = new Uint8Array(an.frequencyBinCount);

      // Minimal energy logging for now; decoding is non-trivial and will be iterated
      const loop = () => {
        an.getByteFrequencyData(buf);
        // heuristic: if energy near f0/f1 rises, we know something is transmitting
        // TODO: implement a robust slicer + bit-timing + frame parse; call onReceive(decoded)
        rafRef.current = requestAnimationFrame(loop);
      };
      loop();
      setListening(true);
    } catch (e:any) { setErr(mapGumError(e)); }
  }

  function stopListen() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    analyserRef.current?.disconnect();
    sourceRef.current?.disconnect();
    analyserRef.current = null;
    sourceRef.current = null;
    setListening(false);
  }

  async function transmit() {
    setErr(null);
    await prime();
    const ctx = audioCtxRef.current!;
    const gain = ctx.createGain(); gain.gain.value = 0.0001; gain.connect(ctx.destination);
    const osc = ctx.createOscillator(); osc.type = "sine"; osc.connect(gain);

    const bits = textToBits(payload);
    const bitMs = 40;
    const sec = bitMs / 1000;
    const f0 = 1550, f1 = 1950;

    let t = ctx.currentTime + 0.15;
    bits.forEach(bit => {
      const f = bit ? f1 : f0;
      osc.frequency.setValueAtTime(f, t);
      gain.gain.cancelScheduledValues(t);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.004);
      gain.gain.setValueAtTime(0.18, t + sec - 0.006);
      gain.gain.linearRampToValueAtTime(0.0001, t + sec - 0.002);
      t += sec;
    });

    setSending(true);
    osc.start(ctx.currentTime + 0.14);
    osc.stop(t + 0.02);
    await new Promise<void>(res => (osc.onended = () => res()));
    setSending(false);
  }

  return (
    <div className="grid gap-2">
      {err && <div className="rounded-xl border border-amber-500/30 bg-amber-900/20 p-2 text-sm">{err}</div>}
      <div className="text-xs text-neutral-400">Permission: {perm} · Secure: {String(secure)}</div>
      <div className="flex flex-wrap gap-2">
        {!listening ? (
          <button onClick={startListen} className="px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-500">Enable Mic + Listen</button>
        ) : (
          <button onClick={stopListen} className="px-3 py-2 rounded bg-amber-600 hover:bg-amber-500">Stop Listening</button>
        )}
        <button onClick={transmit} className="px-3 py-2 rounded bg-orange-600 hover:bg-orange-500" disabled={sending}>
          {sending ? "Transmitting..." : "Transmit Offer/Answer"}
        </button>
      </div>
      <p className="text-xs text-neutral-500">
        Beta: uses audio to pass the connect blob so peers can link without QR. Fall back to QR if noisy.
      </p>
    </div>
  );
}
