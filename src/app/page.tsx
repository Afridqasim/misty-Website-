"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PortfolioTeaser from "../components/sections/PortfolioTeaser";
import ReliableValues from "../components/sections/ReliableValues";
import Specialist from "../components/sections/Specialist";
import Process from "../components/sections/Process";
import TrustFactors from "../components/sections/TrustFactors";
import FAQ from "../components/sections/FAQ";
import SectionTag from "../components/SectionTag";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden">
        {/* Background gradient orbs removed to fix visual division */}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <SectionTag text="3D Exhibition Stand Design Studio" />

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl font-black text-white leading-tight tracking-tight mb-6"
              >
                Exhibition Stand{" "}
                <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Design That Wins
                </span>{" "}
                on the Floor
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed"
              >
                High-end 3D exhibition stand design studio for booth builders
                and exhibitors across Europe, UAE, USA, and India. 
                Build-ready designs. Fast delivery.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-fuchsia-500 text-white font-bold hover:bg-fuchsia-600 transition-all duration-300 hover:scale-105"
                >
                  View Portfolio
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all duration-300"
                >
                  Join us today
                </Link>
              </motion.div>
            </div>

            {/* 3D Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotate: 0,
                y: [0, -20, 0] 
              }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.4 },
                scale: { duration: 0.8, delay: 0.4 },
                rotate: { duration: 0.8, delay: 0.4 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-fuchsia-500/20 blur-[100px] rounded-full animate-pulse" />
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-fuchsia-500/10">
                <img 
                  src="/hero-3d.png" 
                  alt="3D Exhibition Stand Design" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500/10 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "STANDS DESIGNED ANNUALLY", value: "12+" },
              { label: "TOTAL STANDS DELIVERED", value: "2000+" },
              { label: "EXPERIENCED DESIGNERS", value: "5+" },
              { label: "GLOBAL MARKETS", value: "4+" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Teaser */}
      <PortfolioTeaser />

      {/* Reliable Values */}
      <ReliableValues />

      {/* Specialist section (Services) */}
      <Specialist />

      {/* Process Section */}
      <Process />

      {/* Trust Factors */}
      <TrustFactors />

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-fuchsia-600 to-purple-800 p-12 sm:p-20 text-center"
          >
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-6xl font-black text-white mb-6">
                Let&apos;s Build Something <br />
                <span className="text-white/80 italic font-serif">Unforgettable</span>
              </h2>
              <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                Join 100+ booth builders who trust us to deliver world-class 3D exhibition designs on time, every time.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-white text-black font-black text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl"
              >
                Start your project now
              </Link>
            </div>
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-400/20 blur-[80px] rounded-full -ml-32 -mb-32" />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
