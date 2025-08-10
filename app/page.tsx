"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

interface Section {
  title: string;
  slug: string;
  description: string;
}

const sections: Section[] = [
  {
    title: 'Prestige Heritage',
    slug: 'prestigeheritage',
    description: 'Discover the legacy and origins of SABITX, from past to future.',
  },
  {
    title: 'SnapSec™',
    slug: 'snapsec',
    description: 'Your personal security vault – one tap to secure, scan, and share.',
  },
  {
    title: 'Retail Access',
    slug: 'retailaccess',
    description: 'Explore commerce solutions: POS, inventory, and seamless payments.',
  },
  {
    title: 'EXPRESS',
    slug: 'express',
    description: 'Ultrafast logistics and scheduling tools for the modern world.',
  },
  {
    title: 'EYEem',
    slug: 'eyeem',
    description: 'AI-powered visual insight, from image search to deep analysis.',
  },
  {
    title: 'TEAMup',
    slug: 'teamup',
    description: 'Collaborate with your crew – messaging, tasks, and sync in one place.',
  },
  {
    title: 'ARt',
    slug: 'art',
    description: 'A gallery of glitch art, generative visuals, and sonic experiments.',
  },
  {
    title: 'MEMOIR',
    slug: 'memoir',
    description: 'A personal log and story of the maker behind SABITX.',
  },
  {
    title: 'VAULT Mesh',
    slug: 'vault',
    description: 'Offline audio chat. No Wi‑Fi. No cellular. Air‑gapped.',
  },
];

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-12 py-20 space-y-16">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-5xl sm:text-6xl font-extrabold tracking-tight text-center text-orange-400"
      >
        SABIT X VAULT
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl text-center text-gray-300 leading-relaxed"
      >
        Welcome to the FUTURE of SABITX. Explore each module to unlock tools, stories, and
        experiences crafted for creators, rebels, and operators. No passwords – just dive in.
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {sections.map((section) => (
          <Link key={section.slug} href={`/${section.slug}`}>
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="card cursor-pointer bg-[#18181b] border border-[#333] rounded-2xl p-6 shadow-lg hover:shadow-orange-500/30 transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2 text-orange-400">
                {section.title}
              </h2>
              <p className="text-sm text-gray-400">
                {section.description}
              </p>
            </motion.div>
          </Link>
        ))}
      </div>
      <footer className="text-xs text-gray-500 mt-12 opacity-75">
        © {new Date().getFullYear()} SABIT INC. | sabit@sabitinc.com
      </footer>
    </main>
  );
}