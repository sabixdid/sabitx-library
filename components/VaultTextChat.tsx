"use client";

export default function VaultTextChat({
  room,
  nick,
  wsUrl
}: {
  room: string;
  nick: string;
  wsUrl: string;
}) {
  return (
    <div className="p-6 border border-dashed border-orange-500 rounded-xl">
      <h2 className="text-xl font-bold text-orange-400 mb-2">[Text Chat Placeholder]</h2>
      <p className="text-sm text-neutral-400">
        Room: <span className="font-mono">{room}</span><br />
        Node: <span className="font-mono">{nick}</span><br />
        Relay: <span className="font-mono">{wsUrl}</span>
      </p>
      <p className="text-xs text-neutral-500 mt-2">Coming soon...</p>
    </div>
  );
}
