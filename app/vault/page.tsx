git add app/vault/page.tsx
git commit -m "💬 Add Vault chat/audio page with sharable link"
git push

npx vercel deploy --prod
{
  title: "VAULT Mesh",
  slug: "vault",
  description: "Offline audio chat. No Wi‑Fi. No cellular. Air‑gapped.",
}
git add app/vault/page.tsx
git commit -m "💬 Add Vault chat/audio page with sharable link"
git push

npx vercel deploy --prod
"use client";
import { useEffect, useMemo, useState } from "react";
import SabitxVaultOfflineAudioMesh from "../../components/SabitxVaultOfflineAudioMesh";

function getFragmentKey(): string {
  if (typeof window === "undefined") return "";
  const frag = window.location.hash.slice(1); // "k=pass"
  const params = new URLSearchParams(frag);
  return params.get("k") ?? "";
}

export default function VaultPage() {
  const [room, setRoom] = useState<string>("");
  const [key, setKey] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const r = url.searchParams.get("room") || "SABITX-OPS";
    const k = getFragmentKey() || "";
    setRoom(r);
    setKey(k);
  }, []);

  const shareLink = useMemo(() => {
    if (typeof window === "undefined") return "";
    const base = `${window.location.origin}/vault`;
    const r = encodeURIComponent(room || "SABITX-OPS");
    const k = encodeURIComponent(key || "");
    return k ? `${base}?room=${r}#k=${k}` : `${base}?room=${r}`;
  }, [room, key]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareLink);
    } catch {
      // no clipboard? no cry.
    }
  }

  return (
    <main className="min-h-screen w-full bg-black text-neutral-100 px-6 py-8">
      <div className="mx-auto max-w-3xl grid gap-6">
        <header className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">SABITX · Vault Mesh</h1>
          <p className="text-sm text-neutral-400">
            Air‑gapped chat over sound. Serve this page over HTTPS, then audio does the rest locally.
          </p>
        </header>

        <section className="bg-neutral-900 rounded-2xl p-4 grid gap-3">
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
              <label className="block text-sm mb-1">Passphrase (not sent to server)</label>
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
            <button onClick={copyLink} className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500">
              Copy Link
            </button>
          </div>

          <p className="text-xs text-neutral-400">
            Send this link via SMS. <code>?room=</code> loads the room, <code>#k=</code> stays private client-side.
          </p>
        </section>

        {/* 🔗 THIS is where the mesh component gets integrated 🔗 */}
        <SabitxVaultOfflineAudioMesh />
      </div>
    </main>
  );
}
