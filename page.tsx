"use client";
import React, { useState } from "react";

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");

  const sections = [
    "Prestige Heritage", "SnapSec™", "Retail Access", "EXPRESS",
    "EYEem", "TEAMup", "ARt", "MEMOIR"
  ];

  function unlockVault(e: React.FormEvent) {
    e.preventDefault();
    if (code === "override") setUnlocked(true);
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#000", color: "#fff",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#18181b", padding: 40, borderRadius: 16, boxShadow: "0 2px 24px #000a",
        width: "100%", maxWidth: 400, textAlign: "center"
      }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: "#fb923c", marginBottom: 32 }}>
          SABIT X VAULT
        </h1>
        {!unlocked ? (
          <form onSubmit={unlockVault} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input
              type="password"
              placeholder="Enter Vault Code"
              value={code}
              onChange={e => setCode(e.target.value)}
              style={{
                padding: 12, borderRadius: 8, border: "none", fontSize: 18,
                background: "#262626", color: "#fff", marginBottom: 12
              }}
              autoFocus
            />
            <button
              type="submit"
              style={{
                background: "#fb923c", color: "#000", padding: 12, borderRadius: 8, fontWeight: 600,
                fontSize: 16, cursor: "pointer"
              }}>
              UNLOCK
            </button>
          </form>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {sections.map(section => (
              <div key={section} style={{
                background: "#262626", padding: 18, borderRadius: 10, fontWeight: 500,
                cursor: "pointer", fontSize: 16
              }}>
                {section}
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ marginTop: 32, color: "#aaa", fontSize: 12 }}>
        © 2025 SABIT INC. | sabit@sabitinc.com
      </div>
    </div>
  );
}
