"use client";

import { useEffect, useMemo, useState } from "react";
import VaultTextChat from "@/components/VaultTextChat";
import SabitxVaultOfflineAudioMesh from "@/components/SabitxVaultOfflineAudioMesh";

function getFragmentKey(): string {
  if (typeof window === "undefined") return "";
  const frag = window.location.hash.slice(1);
  const params = new URLSearchParams(frag);
  return params.get("k") ?? "";
}

export default function VaultPage() {
  const [room, setRoom] = useState("SABITX-OPS");
  const [key, setKey] = useState("");
  const [nick] = useState(() => `SABIT-${Math.random().toString(36).slice(2, 6)}`);
  const [mode, setMode] = useState<"text" | "audio">("audio");
  const [showConsole, setShowConsole] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    setRoom(url.searchParams.get("room") || "SABITX-OPS");
    setKey(getFragmentKey());
  }, []);

  const shareLink = useMemo(() => {
    if (typeof window === "undefined") return "";
    const base = `${window.location.origin}/vault`;
    const r = encodeURIComponent(room || "SABITX-OPS");
    const k = encodeURIComponent(key || "");
    return k ? `${base}?room=${r}#k=${k}` : `${base}?room=${r}`;
  }, [room, key]);

  const WS_URL = "wss://your-relay.example/ws";

  return (
    <main className="min-h-screen w-full bg-black text-neutral-100 px-6 py-8 space-y-4">
      <header className="space-y-1">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            SABITX · Vault {mode === "audio" ? "Audio Mesh" : "Text Chat"}
          </h1>
          <button
            onClick={() => setMode((m) => (m === "audio" ? "text" : "audio"))}
            className="px-3 py-2 rounded-lg bg-blue-700 hover:bg-blue-600"
          >
            {mode === "audio" ? "Switch to Text" : "Switch to Audio"}
          </button>
        </div>

        <div className="bg-neutral-900 rounded-2xl p-4 grid gap-3">
          <div className="grid gap-2 md:grid-cols-2">
            <div>
              <label className="block text-sm mb-1">Room</label>
              <input
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full bg-neutral-800 rounded-lg px-3 py-2 outline-none"
                placeholder="SABITX-OPS"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Passphrase</label>
              <input
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full bg-neutral-800 rounded-lg px-3 py-2 outline-none"
                placeholder="wolf-iron-ember"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <input
              readOnly
              value={shareLink}
              className="flex-1 bg-neutral-800 rounded-lg px-3 py-2 font-mono text-xs"
            />
            <button
              onClick={() => navigator.clipboard.writeText(shareLink).catch(() => {})}
              className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500"
            >
              Copy Link
            </button>
            <button
              onClick={() => setShowConsole(true)}
              className="px-3 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-xs"
            >
              Open Ops Console
            </button>
          </div>

          <p className="text-xs text-neutral-400">
            Share the link by SMS — room is in query string, key is in fragment and stays client-side.
          </p>
        </div>
      </header>

      {mode === "audio" ? (
        <SabitxVaultOfflineAudioMesh />
      ) : (
        <VaultTextChat room={room} nick={nick} wsUrl={WS_URL} />
      )}

      {showConsole && (
        <div className="fixed bottom-4 right-4 bg-black/80 backdrop-blur border border-neutral-700 text-xs text-white rounded-xl px-4 py-3 z-50 shadow-xl">
          <div className="flex justify-between items-center mb-2">
            <div className="font-semibold">SABITX Ops Console</div>
            <button onClick={() => setShowConsole(false)} className="text-red-400">✕</button>
          </div>
          <p className="opacity-80">Node: {nick}</p>
          <p>Mode: {mode}</p>
          <p>Room: {room}</p>
          <p>Pass: {key ? "••••••" : "(none)"}</p>
        </div>
      )}
    </main>
  );
}
