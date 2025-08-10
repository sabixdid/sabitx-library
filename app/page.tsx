"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

interface Section {
  title: string;
  slug: string;
  description: string;
}

const sections: Section[] = [
  { title: "VAULT Mesh", slug: "vault", description: "Offline audio chat. No Wi‑Fi. No cellular. Air‑gapped." },
  { title: "Memoir", slug: "memoir", description: "Chronicles of the maker. Raw and untamed." },
  { title: "SnapSec™", slug: "snapsec", description: "Tap‑to‑lock, scan‑to‑reveal. Personal security toolkit." },
  { title: "Retail Access", slug: "retailaccess", description: "POS, inventory, automation. Rewired." },
  { title: "EYEem", slug: "eyeem", description: "AI visual engine. Glitch search to deep vision." },
  { title: "TEAMup", slug: "teamup", description: "Crew sync: messages, ops, and mission control." },
  { title: "ARt", slug: "art", description: "Sonic visuals. Generative aesthetics. Fractals & chaos." },
  { title: "Prestige Heritage", slug: "prestigeheritage", description: "Origin story of SABITX. From ashes to override." },
  { title: "EXPRESS", slug: "express", description: "Ultrafast logistics and scheduling tools." }
];

export default function Page() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 1000);
    return () => clearTimeout(t);
  }, []);

  if (booting) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-orange-400 font-mono text-xs p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <p>&gt; SABITX SYSTEM OVERRIDE ENGAGED...</p>
          <p className="mt-2">&gt; Booting VAULT HUD / vX.0.1</p>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-black text-white">
      <Parallax pages={3}>
        <ParallaxLayer offset={0} speed={0.5} className="flex items-center justify-center h-screen">
          <div className="text-center">
            <Link href="/vault?room=SABITX-OPS#k=wolf-iron-ember" className="block w-fit mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl sm:text-7xl font-extrabold tracking-tight text-orange-400 hover:underline"
              >
                SABIT X VAULT
              </motion.h1>
            </Link>
            <p className="mt-4 text-sm text-neutral-400">
              Signal‑locked interface. Tap a node. Presence is entry.
            </p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.6} className="px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-20">
            {sections.map((section) => (
              <Link key={section.slug} href={`/${section.slug}`}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group border border-orange-500/30 bg-[#18181b] rounded-2xl p-6 shadow-md hover:shadow-orange-500/30 transition"
                >
                  <h2 className="text-xl font-bold text-orange-400 group-hover:underline">
                    {section.title}
                  </h2>
                  <p className="text-sm text-neutral-400 mt-1">{section.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0.4} className="flex items-center justify-center">
          <footer className="text-center text-xs text-neutral-500">
            © {new Date().getFullYear()} SABIT INC. · No Map · No Master · All Override
          </footer>
        </ParallaxLayer>
      </Parallax>
    </main>
  );
}