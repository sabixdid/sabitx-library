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

  const WS_URL = "wss://your-relay.example/ws"; // optional: replace when real-time text chat is live

  return (
    <main className="min-h-screen w-full bg-black text-white p-6 space-y-6">
      <header className="space-y-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">SABITX · Vault {mode === "audio" ? "Audio Mesh" : "Text Chat"}</h1>
          <button
            onClick={() => setMode((m) => (m === "audio" ? "text" : "audio"))}
            className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            {mode === "audio" ? "Switch to Text" : "Switch to Audio"}
          </button>
        </div>

        <div className="bg-neutral-900 p-4 rounded-xl space-y-2">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Room</label>
              <input
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full bg-neutral-800 px-3 py-2 rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Passphrase</label>
              <input
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full bg-neutral-800 px-3 py-2 rounded-lg outline-none"
              />
            </div>
          </div>
          <input
            readOnly
            value={shareLink}
            className="w-full mt-2 bg-neutral-800 px-3 py-2 font-mono text-xs rounded-lg"
          />
        </div>
      </header>

      {mode === "audio" ? (
        <SabitxVaultOfflineAudioMesh />
      ) : (
        <VaultTextChat room={room} nick={nick} wsUrl={WS_URL} />
      )}

      {showConsole && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-xs text-white border border-neutral-700 p-4 rounded-xl shadow-xl">
          <div className="flex justify-between mb-2">
            <strong>SABITX Ops Console</strong>
            <button onClick={() => setShowConsole(false)} className="text-red-400">✕</button>
          </div>
          <p>Node: {nick}</p>
          <p>Mode: {mode}</p>
          <p>Room: {room}</p>
          <p>Key: {key ? "•••••" : "(none)"}</p>
        </div>
      )}
    </main>
  );
}
EOFcat > app/vault/page.tsx <<'EOF'
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

  const WS_URL = "wss://your-relay.example/ws"; // optional: replace when real-time text chat is live

  return (
    <main className="min-h-screen w-full bg-black text-white p-6 space-y-6">
      <header className="space-y-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">SABITX · Vault {mode === "audio" ? "Audio Mesh" : "Text Chat"}</h1>
          <button
            onClick={() => setMode((m) => (m === "audio" ? "text" : "audio"))}
            className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            {mode === "audio" ? "Switch to Text" : "Switch to Audio"}
          </button>
        </div>

        <div className="bg-neutral-900 p-4 rounded-xl space-y-2">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Room</label>
              <input
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full bg-neutral-800 px-3 py-2 rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Passphrase</label>
              <input
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full bg-neutral-800 px-3 py-2 rounded-lg outline-none"
              />
            </div>
          </div>
          <input
            readOnly
            value={shareLink}
            className="w-full mt-2 bg-neutral-800 px-3 py-2 font-mono text-xs rounded-lg"
          />
        </div>
      </header>

      {mode === "audio" ? (
        <SabitxVaultOfflineAudioMesh />
      ) : (
        <VaultTextChat room={room} nick={nick} wsUrl={WS_URL} />
      )}

      {showConsole && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-xs text-white border border-neutral-700 p-4 rounded-xl shadow-xl">
          <div className="flex justify-between mb-2">
            <strong>SABITX Ops Console</strong>
            <button onClick={() => setShowConsole(false)} className="text-red-400">✕</button>
          </div>
          <p>Node: {nick}</p>
          <p>Mode: {mode}</p>
          <p>Room: {room}</p>
          <p>Key: {key ? "•••••" : "(none)"}</p>
        </div>
      )}
    </main>
  );
}
