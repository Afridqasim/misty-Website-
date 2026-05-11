"use client";

import { motion } from "framer-motion";
import SectionTag from "../SectionTag";

const values = [
  { l: "R", name: "Responsive", desc: "Fast communication and quick design turnarounds." },
  { l: "E", name: "Expert", desc: "Deep industry knowledge of exhibition construction." },
  { l: "L", name: "Logical", desc: "Smarter spatial planning for better floor traffic." },
  { l: "I", name: "Intelligent", desc: "Design that aligns with your brand strategy." },
  { l: "A", name: "Accurate", desc: "Build-ready technical drawings with precise dimensions." },
  { l: "B", name: "Bold", desc: "Creative concepts that stand out on the exhibition floor." },
  { l: "L", name: "Leading", desc: "Cutting-edge 3D visualization and design trends." },
  { l: "E", name: "Effective", desc: "Maximizing ROI and visitor engagement for every booth." }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function ReliableValues() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionTag text="Our Values" />
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
          Every project we deliver is built on <br />
          one standard — <span className="text-fuchsia-500">RELIABLE</span>
        </h2>
        <div className="h-1.5 w-20 bg-fuchsia-500 mx-auto rounded-full mb-16" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="group p-10 rounded-[2.5rem] glass-tab text-center"
            >
              <div className="text-4xl font-black text-fuchsia-500 mb-6 group-hover:scale-110 transition-transform inline-block">
                {val.l}
              </div>
              <h3 className="text-xl font-black text-white mb-3">{val.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
