"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabase";
import type { PortfolioItem } from "../../lib/types";
import SectionTag from "../SectionTag";

export default function PortfolioTeaser() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      const { data } = await supabase
        .from("portfolio")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);
      if (data) setItems(data);
      setLoading(false);
    }
    fetchItems();
  }, []);

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionTag text="Our Work" />
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
          A glimpse into booth designs <br /> delivered worldwide
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-16">
          High-end 3D visualizations that help our clients win bids and deliver stunning exhibitions.
        </p>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="text-fuchsia-500 animate-spin" size={40} />
          </div>
        ) : items.length === 0 ? (
          <div className="py-20 text-gray-500">
            No projects added yet. Add some in the Admin Panel!
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative aspect-[4/3] rounded-[2.5rem] overflow-hidden glass-tab"
              >
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-left">
                  <p className="text-fuchsia-500 text-[10px] font-black uppercase tracking-widest mb-2">
                    {item.category || "Exhibition Design"}
                  </p>
                  <h3 className="text-white text-xl font-bold">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
          >
            See More Work
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
