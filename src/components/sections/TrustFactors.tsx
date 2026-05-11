"use client";

import { motion } from "framer-motion";

const factors = [
  {
    title: "EXPERT IN-HOUSE TEAM",
    desc: "A dedicated team of exhibition designers, not freelancers."
  },
  {
    title: "FAST GLOBAL DELIVERY",
    desc: "Supporting booth builders across 4 continents with speed."
  },
  {
    title: "BUILD-READY DESIGNS",
    desc: "Technically accurate designs that can actually be built."
  },
  {
    title: "PROVEN TRACK RECORD",
    desc: "Over 2000+ stands delivered for world-class brands."
  }
];

import SectionTag from "../SectionTag";

export default function TrustFactors() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <SectionTag text="Expertise" />
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
          If you work in exhibitions and need design you can rely on — you&apos;re in the right place.
        </h2>
        <div className="h-1.5 w-20 bg-fuchsia-500 mx-auto rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {factors.map((factor, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-10 rounded-[2rem] glass-tab text-left relative group"
            >
              <div className="text-[10px] font-black text-fuchsia-500 mb-6 tracking-widest opacity-50">
                0{i + 1}
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-fuchsia-400 transition-colors">
                {factor.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {factor.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
