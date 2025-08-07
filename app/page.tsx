"use client";
import React, { useState } from "react";

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");

  const sections = [
    "Prestige Heritage", "SnapSec™", "Retail Access", "EXPRESS",
    "EYEem", "TEAMup", "ARt", "MEMOIR"
  ];

  function unlockVault(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (code === "override") setUnlocked(true);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(145deg,#0f0f0f,#18181b)",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "rgba(20,20,24,0.95)",
        borderRadius: 28,
        boxShadow: "0 10px 30px #00000070",
        border: "1px solid #333",
        padding: 36,
        width: "90vw", maxWidth: 360,
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <h1 style={{
          fontSize: 28,
          fontWeight: 800,
          color: "#fb923c",
          marginBottom: 30,
          letterSpacing: "0.05em",
          textShadow: "0 2px 6px #00000080"
        }}>
          SABIT X VAULT
        </h1>

        {!unlocked ? (
          <form onSubmit={unlockVault} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <input
              type="password"
              placeholder="Enter Vault Code"
              value={code}
              onChange={e => setCode(e.target.value)}
              autoFocus
              style={{
                background: "#262626",
                border: "none",
                padding: 14,
                borderRadius: 12,
                color: "#fff",
                fontSize: 16,
                boxShadow: "0 4px 10px #00000040"
              }}
            />
            <button
              type="submit"
              style={{
                background: "linear-gradient(90deg,#fb923c,#ffa75a)",
                color: "#111",
                fontWeight: 700,
                padding: 14,
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 12px #fb923c70",
                textTransform: "uppercase",
                letterSpacing: "0.1em"
              }}>
              Unlock
            </button>
          </form>
        ) : (
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: 14, marginTop: 20
          }}>
            {sections.map(section => (
              <div key={section} style={{
                background: "#262626",
                padding: 18,
                borderRadius: 12,
                fontWeight: 600,
                color: "#fb923c",
                fontSize: 14,
                boxShadow: "0 2px 8px #00000050",
                cursor: "pointer",
                userSelect: "none"
              }}>
                {section}
              </div>
            ))}
          </div>
        )}

        <div style={{
          color: "#777",
          fontSize: 12,
          marginTop: 26
        }}>
          © 2025 SABIT INC. | sabit@sabitinc.com
        </div>
      </div>
    </div>
  );
}
