"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Box,
  Palette,
  Layers,
  Eye,
  Globe,
  Zap,
  Ruler,
  Monitor,
  Printer,
  PenTool,
  Layout,
  Lightbulb,
} from "lucide-react";
import SectionTag from "../../components/SectionTag";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const mainServices = [
  {
    icon: Box,
    title: "3D Exhibition Stand Design",
    desc: "From concept sketches to photorealistic 3D renders, we create complete exhibition stand designs that are visually stunning and build-ready. Our designs include detailed views from all angles, material callouts, and dimensions.",
    features: ["Photorealistic 3D rendering", "360° visualization", "Multiple design concepts", "Revision rounds included"],
  },
  {
    icon: Palette,
    title: "Booth Visualization & Animation",
    desc: "Experience your booth before it's built. We create immersive 3D walkthroughs and fly-through animations that let you and your stakeholders experience the design in virtual reality.",
    features: ["3D walkthrough videos", "Virtual reality ready", "Interactive presentations", "Stakeholder approval tool"],
  },
  {
    icon: Layers,
    title: "Custom Stall Design",
    desc: "Every brand is unique, and so should be your exhibition stall. We create bespoke designs that reflect your brand DNA while maximizing visitor flow and engagement within your allocated space.",
    features: ["Brand-aligned aesthetics", "Visitor flow optimization", "Modular design options", "Scalable concepts"],
  },
  {
    icon: Ruler,
    title: "Technical & Production Drawings",
    desc: "Our designs come with comprehensive technical drawings and production files ready for fabrication. Including structural details, electrical layouts, and material specifications.",
    features: ["AutoCAD production drawings", "Structural engineering", "Electrical layout plans", "Material specifications"],
  },
  {
    icon: Monitor,
    title: "Digital & Interactive Experiences",
    desc: "Integrate cutting-edge digital elements into your exhibition stand. From touchscreen kiosks to LED video walls, we design immersive digital experiences that captivate visitors.",
    features: ["Touchscreen integration", "LED wall design", "Interactive displays", "AR/VR experiences"],
  },
  {
    icon: PenTool,
    title: "Graphic & Branding Design",
    desc: "Complete visual communication for your exhibition presence. We design everything from large-format graphics and signage to brochures, giveaways, and digital assets.",
    features: ["Large-format graphics", "Signage design", "Marketing collateral", "Digital assets"],
  },
];

const process = [
  { step: "01", title: "Brief & Discovery", desc: "We understand your brand, objectives, space constraints, and budget to create a tailored design brief." },
  { step: "02", title: "Concept Development", desc: "Our designers create 2-3 unique concept directions with mood boards and initial 3D sketches for your review." },
  { step: "03", title: "3D Design & Rendering", desc: "The chosen concept is developed into detailed 3D designs with photorealistic renders from multiple angles." },
  { step: "04", title: "Revisions & Finalization", desc: "We refine the design based on your feedback until it perfectly matches your vision and requirements." },
  { step: "05", title: "Production Files", desc: "Delivery of complete build-ready files including technical drawings, material specs, and construction guidelines." },
];

const additionalServices = [
  { icon: Globe, title: "International Standards", desc: "Designs compliant with exhibition venue regulations across Europe, Middle East, Asia, and Americas." },
  { icon: Zap, title: "Rush Delivery", desc: "Need it fast? Our express service delivers initial concepts within 24 hours and final designs in 3 days." },
  { icon: Layout, title: "Space Planning", desc: "Strategic floor plan layouts that maximize visitor engagement and traffic flow within your booth space." },
  { icon: Printer, title: "Print-Ready Files", desc: "All graphic files delivered in print-ready format with correct color profiles and bleed settings." },
  { icon: Eye, title: "On-Site Supervision", desc: "Optional on-site design supervision during booth construction to ensure design integrity." },
  { icon: Lightbulb, title: "Creative Consulting", desc: "Strategic creative consulting for exhibition marketing, visitor engagement strategies, and ROI optimization." },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        {/* Background gradient orbs removed to fix visual division */}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center flex flex-col items-center"
          >
            <SectionTag text="Our Services" />
            <h1 className="text-5xl sm:text-6xl font-black text-white leading-[1.1] mb-6">
              End-to-End Exhibition{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                Design Services
              </span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
              From initial concept to build-ready production files, we provide
              comprehensive 3D exhibition design services tailored to your brand
              and budget.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {mainServices.map((svc, i) => (
              <motion.div
                key={svc.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={fadeInUp}
                className="group grid md:grid-cols-2 gap-8 p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-fuchsia-500/20 transition-all duration-500"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-purple-500/20 flex items-center justify-center mb-6">
                    <svc.icon size={28} className="text-fuchsia-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {svc.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{svc.desc}</p>
                </div>
                <div className="flex items-center">
                  <ul className="space-y-3 w-full">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-gray-300 text-sm">
                        <div className="w-6 h-6 rounded-full bg-fuchsia-500/10 flex items-center justify-center shrink-0">
                          <ArrowRight size={12} className="text-fuchsia-400" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-fuchsia-500/10 text-fuchsia-400 text-sm font-medium mb-4 border border-fuchsia-500/20">
              Our Process
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              How We Work
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/5 text-center"
              >
                <div className="text-3xl font-black bg-gradient-to-b from-fuchsia-400 to-purple-500 bg-clip-text text-transparent mb-3">
                  {p.step}
                </div>
                <h4 className="text-white font-bold mb-2 text-sm">{p.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-fuchsia-500/10 text-fuchsia-400 text-sm font-medium mb-4 border border-fuchsia-500/20">
              More Services
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              Additional Offerings
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((s, i) => (
              <motion.div
                key={s.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-fuchsia-500/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-fuchsia-500/10 flex items-center justify-center mb-4">
                  <s.icon size={20} className="text-fuchsia-400" />
                </div>
                <h4 className="text-white font-bold mb-2">{s.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-12 rounded-3xl bg-gradient-to-br from-fuchsia-500/10 via-transparent to-purple-500/10 border border-white/5"
          >
            <h3 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Need a Custom Service Package?
            </h3>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              We tailor our services to match your specific requirements, timeline, and budget.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-semibold hover:shadow-xl hover:shadow-fuchsia-500/30 transition-all duration-300 hover:scale-105"
            >
              Discuss Your Project
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
