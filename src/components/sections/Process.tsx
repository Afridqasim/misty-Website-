"use client";

import { motion } from "framer-motion";

const steps = [
  { name: "Brief", desc: "Understanding your goals" },
  { name: "Research", desc: "Analyzing floor plans" },
  { name: "Draft", desc: "Initial spatial layout" },
  { name: "Design", desc: "3D modeling & branding" },
  { name: "Render", desc: "High-end visualizations" },
  { name: "Delivery", desc: "Build-ready drawings" }
];

import SectionTag from "../SectionTag";

export default function Process() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <SectionTag text="Our Process" />
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
          Our 3D Process — built for global exhibition demands
        </h2>
        <div className="h-1.5 w-20 bg-fuchsia-500 mx-auto rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 hidden lg:block" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-[#111] border-2 border-white/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:border-fuchsia-500 group-hover:shadow-[0_0_20px_rgba(217,70,239,0.3)]">
                  <span className="text-white font-bold">{i + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{step.name}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
