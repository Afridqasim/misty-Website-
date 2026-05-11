"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";
import type { Article } from "../../lib/types";
import { Clock, User, ArrowRight, Loader2, Calendar } from "lucide-react";
import Link from "next/link";
import SectionTag from "../../components/SectionTag";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setArticles(data);
      setLoading(false);
    }
    fetchArticles();
  }, []);

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
            <SectionTag text="Blog & Insights" />
            <h1 className="text-5xl sm:text-6xl font-black text-white leading-[1.1] mb-6">
              Articles &{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                Insights
              </span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Stay updated with the latest trends, tips, and insights from the
              world of exhibition design and trade show marketing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <Loader2 size={40} className="text-fuchsia-400 animate-spin" />
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-32">
              <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
                <ArrowRight size={32} className="text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No Articles Yet
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Articles will appear here once published from the admin panel.
                Stay tuned for insights and updates!
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, i) => (
                <motion.div
                  key={article.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Link
                    href={`/articles/${article.slug}`}
                    className="group block rounded-2xl overflow-hidden bg-white/[0.03] border border-white/5 hover:border-fuchsia-500/30 transition-all duration-500"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.02]">
                      {article.image_url ? (
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-fuchsia-500/10 to-purple-500/10">
                          <div className="text-5xl font-black text-white/5">+91</div>
                        </div>
                      )}
                      {article.category && (
                        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-fuchsia-500/80 text-white text-xs font-semibold backdrop-blur-sm">
                          {article.category}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-fuchsia-400 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                          {article.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        {article.author && (
                          <span className="flex items-center gap-1">
                            <User size={12} />
                            {article.author}
                          </span>
                        )}
                        {article.read_time && (
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {article.read_time}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(article.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
