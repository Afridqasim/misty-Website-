"use client";

import { motion } from "framer-motion";

export default function SectionTag({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="inline-flex items-center px-6 py-2 rounded-full bg-purple-950/40 border border-purple-500/30 mb-8"
    >
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-fuchsia-400">
        {text}
      </span>
    </motion.div>
  );
}
