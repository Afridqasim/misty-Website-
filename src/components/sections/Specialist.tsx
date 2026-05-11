"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const points = [
  "Specialist 3D exhibition stand designers",
  "Build-ready technical drawings included",
  "Fast turnaround — ready for your builder",
  "Designs that maximize floor space ROI",
  "Global experience (Europe, UAE, USA, India)",
  "Fixed pricing per project, no hidden fees"
];

import SectionTag from "../SectionTag";

export default function Specialist() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTag text="Why us" />
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-8">
              We&apos;re not a generic agency. <br />
              <span className="text-fuchsia-500 text-3xl sm:text-4xl">We&apos;re a specialist studio.</span>
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              Everything we do is focused on one thing: creating exhibition stands that win. From the first sketch to the final technical drawing, we speak the language of booth builders.
            </p>
            <button className="px-8 py-4 rounded-full bg-fuchsia-500 text-white font-bold hover:bg-fuchsia-600 transition-all hover:scale-105">
              Work with us
            </button>
          </div>

          <div className="grid gap-4">
            {points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-5 rounded-2xl glass-tab"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-fuchsia-500/10 flex items-center justify-center text-fuchsia-500">
                  <Check size={18} />
                </div>
                <span className="text-lg font-medium text-white">{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
