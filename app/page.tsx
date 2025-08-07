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
      background: "linear-gradient(135deg, #0f2027 0%, #2c5364 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        background: "rgba(24,24,27,0.92)",
        border: "1px solid #222",
        boxShadow: "0 8px 32px 0 rgba(0,0,0,0.3)",
        backdropFilter: "blur(10px)",
        borderRadius: 32,
        padding: 36,
        width: "90vw",
        maxWidth: 370,
        margin: "auto",
        textAlign: "center",
        transition: "box-shadow 0.25s",
      }}>
        {/* Optional: add your logo here */}
        {/* <img src="/logo.svg" alt="Sabit X Logo" style={{ width: 56, margin: "0 auto 18px" }} /> */}

        <h1 style={{
          fontSize: 32,
          fontWeight: 900,
          color: "#fb923c",
          marginBottom: 28,
          letterSpacing: ".04em",
          fontFamily: "inherit",
          textShadow: "0 2px 8px #0008",
        }}>
          SABIT X VAULT
        </h1>

        {!unlocked ? (
          <form onSubmit={unlockVault} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <input
              type="password"
              placeholder="Enter Vault Code"
              value={code}
              onChange={e => setCode(e.target.value)}
              autoFocus
              style={{
                background: "rgba(36,36,40,0.96)",
                border: "1.5px solid #353535",
                color: "#fff",
                fontSize: 18,
                fontWeight: 500,
                padding: 16,
                borderRadius: 14,
                marginBottom: 4,
                outline: "none",
                textAlign: "center",
                letterSpacing: 2,
                boxShadow: "0 1.5px 10px #1116",
                transition: "border 0.2s, box-shadow 0.2s",
              }}
            />
            <button
              type="submit"
              style={{
                background: "linear-gradient(90deg, #fb923c 70%, #ffbc70 100%)",
                color: "#222",
                fontWeight: 800,
                fontSize: 18,
                border: "none",
                borderRadius: 14,
                padding: "16px 0",
                marginTop: 6,
                boxShadow: "0 2px 10px #fb923c50",
                cursor: "pointer",
                letterSpacing: 2,
                textTransform: "uppercase",
                transition: "background 0.15s, box-shadow 0.15s",
                filter: code ? "brightness(1)" : "brightness(0.8)",
                opacity: code ? 1 : 0.8,
              }}
              disabled={!code}
            >
              UNLOCK
            </button>
          </form>
        ) : (
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: 18, marginTop: 18,
          }}>
            {sections.map(section => (
              <div key={section} style={{
                background: "rgba(36,36,40,0.94)",
                padding: 22,
                borderRadius: 16,
                fontWeight: 700,
                fontSize: 16,
                boxShadow: "0 2px 8px #1116",
                color: "#fb923c",
                border: "1px solid #282828",
                letterSpacing: 1.5,
                textShadow: "0 2px 8px #000a",
                margin: 2,
                cursor: "pointer",
                userSelect: "none"
              }}>
                {section}
              </div>
            ))}
          </div>
        )}

        <div style={{
          marginTop: 34,
          color: "#bdbdbd",
          fontSize: 13,
          letterSpacing: 1.2,
          opacity: 0.9,
          textShadow: "0 1px 5px #0007",
        }}>
          © 2025 SABIT INC. | sabit@sabitinc.com
        </div>
      </div>
    </div>
  );
}