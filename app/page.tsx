"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const sections = [
  { title: "Vault Mesh", slug: "vault", description: "Offline audio relay. No Wi-Fi. No cellular." },
  { title: "Memoir", slug: "memoir", description: "Chronicles of the maker. Raw and untamed." },
  { title: "SnapSec™", slug: "snapsec", description: "Tap-to-lock, scan-to-reveal. Personal security toolkit." },
  { title: "Retail Access", slug: "retailaccess", description: "POS, inventory, automation. Rewired." },
  { title: "EYEem", slug: "eyeem", description: "AI visual engine. Glitch search to deep vision." },
  { title: "TEAMup", slug: "teamup", description: "Crew sync: messages, ops, and mission control." },
  { title: "ARt", slug: "art", description: "Sonic visuals. Generative aesthetics. Fractals & chaos." },
  { title: "Prestige Heritage", slug: "prestigeheritage", description: "Origin story of SABITX. From ashes to override." },
];

export default function Page() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 2800);
    return () => clearTimeout(t);
  }, []);

  if (booting) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-green-400 font-mono text-xs p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p>> SABITX SYSTEM OVERRIDE ENGAGED...</p>
          <p className="mt-2">> Booting secure HUD / vX.0.1</p>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-black text-white px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight text-green-400"
          >
            SABIT X [ HUD ]
          </motion.h1>
          <p className="mt-4 text-sm text-neutral-400">
            Signal-locked command interface. Tap any node. No passwords, just presence.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, idx) => (
            <Link key={section.slug} href={`/${section.slug}`}>
              <motion.div
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group border border-green-600/30 bg-neutral-900 rounded-2xl p-6 shadow-md hover:shadow-green-500/30 transition duration-200"
              >
                <h2 className="text-xl font-bold text-green-400 group-hover:underline">
                  {section.title}
                </h2>
                <p className="text-sm text-neutral-400 mt-1">{section.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>

        <footer className="pt-10 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} SABIT INC. · No Map · No Master · All Override
        </footer>
      </div>
    </main>
  );
}