"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";
import type { PortfolioItem } from "../../lib/types";
import { ArrowRight, Loader2, Check } from "lucide-react";
import Link from "next/link";
import SectionTag from "../../components/SectionTag";

const categories = [
  "All", "Europe", "UAE", "USA", "India", 
  "3D Visualization", "2D Graphics", "Walkthrough", "Animation", "Branding"
];

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function fetchPortfolio() {
      const { data, error } = await supabase
        .from("portfolio")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setItems(data);
      setLoading(false);
    }
    fetchPortfolio();
  }, []);

  const filtered =
    activeCategory === "All"
      ? items
      : items.filter((item) => {
          // If the category is a region, check location or category
          // If the category is a service, check category
          const searchStr = (item.category + " " + (item.location || "")).toLowerCase();
          return searchStr.includes(activeCategory.toLowerCase());
        });

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background gradient orbs removed to fix visual division */}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <SectionTag text="Selected Work" />
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl font-black text-white mb-8 tracking-tighter leading-tight"
          >
            The Work <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent">Speaks for <br /> Itself.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg sm:text-xl max-w-3xl leading-relaxed"
          >
            Exhibition stand visualization services for booth builders, exhibit agencies, and brands across Europe, UAE, USA, and India. Every project below was delivered on deadline, built to spec, and designed to perform.
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                    : "bg-white/5 text-gray-500 hover:text-white border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio List - Vertical Layout like Reference */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <Loader2 size={40} className="text-purple-500 animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-32 text-gray-500">
              No projects found in this category.
            </div>
          ) : (
            <div className="space-y-12">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-stretch rounded-[2.5rem] glass-tab group overflow-hidden border border-white/5 shadow-2xl`}
                >
                  {/* Image Container - Full Coverage */}
                  <div className="lg:w-3/5 relative min-h-[300px] sm:min-h-[420px] overflow-hidden">
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/5" />
                  </div>

                  {/* Content Container - Refined Padding */}
                  <div className="lg:w-2/5 p-10 sm:p-12 flex flex-col justify-center bg-black/40 backdrop-blur-sm">
                    <div className="text-purple-500 font-black text-5xl mb-6 opacity-80">
                      0{i + 1}
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight tracking-tight">
                      {item.title}
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <p className="text-purple-400 font-black text-[10px] uppercase tracking-[0.2em] mb-2">The Challenge</p>
                        <p className="text-gray-300 text-sm leading-relaxed opacity-80">{item.challenge || "Creating a high-impact presence within specific space constraints."}</p>
                      </div>

                      <div>
                        <p className="text-purple-400 font-black text-[10px] uppercase tracking-[0.2em] mb-2">What we did</p>
                        <ul className="space-y-2">
                          {["Full 3D visualization across both levels", "Material references and panel spec for fabrication", "Multiple render angles for client presentation"].map((point, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-gray-400 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-purple-400 font-black text-[10px] uppercase tracking-[0.2em] mb-2">The Result</p>
                        <p className="text-gray-300 text-sm leading-relaxed font-medium">{item.result || "Strategic 3D visualization and technical planning handed over 48 hours before deadline."}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Happy Clients", value: "100+" },
              { label: "Global Reach", value: "4" },
              { label: "Projects Done", value: "8" },
              { label: "Experience", value: "5 yrs" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl sm:text-5xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[4rem] overflow-hidden bg-gradient-to-br from-purple-900/40 to-black border border-white/5 p-16 sm:p-24 text-center">
            <h2 className="text-4xl sm:text-6xl font-black text-white mb-8">
              Seen Enough? Let&apos;s Talk About <br /> Your Next Project.
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-12 py-5 rounded-full bg-purple-600 text-white font-black text-lg hover:bg-purple-700 transition-all hover:scale-105 shadow-2xl shadow-purple-500/20"
            >
              Get In Touch
              <ArrowRight size={22} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
