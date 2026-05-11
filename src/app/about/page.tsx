"use client";

import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Users,
  Award,
  Globe,
  Clock,
  CheckCircle,
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

const milestones = [
  { year: "2014", title: "Founded", desc: "Started as a freelance 3D visualization studio in Mumbai." },
  { year: "2016", title: "First International Project", desc: "Delivered our first European exhibition stand design for a major trade show in Germany." },
  { year: "2018", title: "Expanded to UAE", desc: "Opened operations in Dubai to serve the booming Middle East exhibition market." },
  { year: "2020", title: "Virtual Exhibitions", desc: "Pivoted to offer virtual 3D exhibition experiences during the global shift to digital." },
  { year: "2022", title: "500+ Projects", desc: "Crossed the milestone of 500 successful exhibition stand projects worldwide." },
  { year: "2024", title: "Global Design Hub", desc: "Operating as a fully global design studio serving clients in 15+ countries." },
];

const values = [
  { icon: Target, title: "Precision", desc: "Every millimeter matters. We deliver pixel-perfect, build-ready designs with precise technical specifications." },
  { icon: Eye, title: "Vision", desc: "We see beyond the brief to create exhibition experiences that truly capture your brand essence." },
  { icon: Users, title: "Partnership", desc: "We work as an extension of your team, maintaining open communication throughout every project." },
  { icon: Award, title: "Excellence", desc: "Quality is non-negotiable. Every design goes through our rigorous internal review process." },
  { icon: Globe, title: "Global Reach", desc: "Local knowledge with global standards. We understand exhibition regulations across continents." },
  { icon: Clock, title: "Reliability", desc: "Tight deadlines are our specialty. We deliver on time, every time." },
];

export default function AboutPage() {
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
            <SectionTag text="About Plus 91 Design" />
            <h1 className="text-5xl sm:text-6xl font-black text-white leading-[1.1] mb-6">
              Crafting Exhibition{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                Experiences
              </span>{" "}
              Since 2014
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Plus 91 Design is a specialist 3D exhibition stand design studio.
              We partner with booth builders, event agencies, and direct
              exhibitors to create stunning, build-ready exhibition stand
              designs for trade shows and exhibitions worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-2xl bg-white/[0.03] border border-white/5"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-purple-500/20 flex items-center justify-center mb-6">
                <Target size={28} className="text-fuchsia-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-400 leading-relaxed">
                To empower exhibitors and booth builders with world-class 3D
                exhibition stand designs that are visually stunning,
                technically precise, and delivered on time — every time. We aim
                to be the go-to design partner for exhibition professionals
                globally.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-2xl bg-white/[0.03] border border-white/5"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-purple-500/20 flex items-center justify-center mb-6">
                <Eye size={28} className="text-fuchsia-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-400 leading-relaxed">
                To become the world&apos;s most trusted 3D exhibition design studio,
                known for transforming ordinary exhibition spaces into
                extraordinary brand experiences that drive measurable business
                results for our clients.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
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
              Our Journey
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              Key Milestones
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-fuchsia-500/50 via-purple-500/30 to-transparent" />

            <div className="space-y-12">
              {milestones.map((ms, i) => (
                <motion.div
                  key={ms.year}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                  variants={fadeInUp}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    i % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className={`flex-1 ${i % 2 === 1 ? "md:text-left" : "md:text-right"}`}>
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-fuchsia-500/20 transition-all duration-300 inline-block">
                      <div className="text-fuchsia-400 font-bold text-sm mb-1">{ms.year}</div>
                      <h4 className="text-white font-bold text-lg mb-2">{ms.title}</h4>
                      <p className="text-gray-400 text-sm">{ms.desc}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-fuchsia-500 border-4 border-background z-10 shrink-0 shadow-lg shadow-fuchsia-500/30" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
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
              Our Values
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              What Drives Us
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20px" }}
                variants={fadeInUp}
                className="p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-fuchsia-500/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 flex items-center justify-center mb-5">
                  <v.icon size={24} className="text-fuchsia-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-12 rounded-3xl bg-gradient-to-br from-fuchsia-500/10 via-transparent to-purple-500/10 border border-white/5"
          >
            <div className="flex justify-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <CheckCircle key={i} size={20} className="text-fuchsia-400" />
              ))}
            </div>
            <h3 className="text-3xl font-black text-white mb-4">
              Join 150+ Satisfied Clients Worldwide
            </h3>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              From small startups to Fortune 500 companies, we&apos;ve helped brands
              create memorable exhibition experiences.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-semibold hover:shadow-xl hover:shadow-fuchsia-500/30 transition-all duration-300 hover:scale-105"
            >
              Work With Us
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
