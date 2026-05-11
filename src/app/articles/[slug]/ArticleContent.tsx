"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import type { Article } from "../../../lib/types";
import { Clock, User, Calendar, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ArticleContent() {
  const params = useParams();
  const rawSlug = params.slug as string;
  const slug = rawSlug ? decodeURIComponent(rawSlug) : "";
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      if (!slug) return;
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .single();
      if (!error && data) setArticle(data);
      setLoading(false);
    }
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={40} className="text-fuchsia-400 animate-spin" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-white mb-4">Article Not Found</h2>
        <Link href="/articles" className="text-fuchsia-400 hover:underline">Back to Articles</Link>
      </div>
    );
  }

  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/articles" className="inline-flex items-center gap-2 text-gray-400 hover:text-fuchsia-400 text-sm mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Articles
          </Link>
          {article.category && (
            <span className="inline-block px-3 py-1 rounded-full bg-fuchsia-500/10 text-fuchsia-400 text-xs font-semibold mb-4 border border-fuchsia-500/20">{article.category}</span>
          )}
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-[1.15] mb-6">{article.title}</h1>
          <div className="flex items-center gap-6 text-sm text-gray-400 mb-10 pb-8 border-b border-white/5">
            {article.author && (<span className="flex items-center gap-1.5"><User size={14} className="text-fuchsia-400" />{article.author}</span>)}
            {article.read_time && (<span className="flex items-center gap-1.5"><Clock size={14} className="text-fuchsia-400" />{article.read_time}</span>)}
            <span className="flex items-center gap-1.5"><Calendar size={14} className="text-fuchsia-400" />{new Date(article.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          </div>
          {article.image_url && (
            <div className="relative rounded-2xl overflow-hidden mb-10 aspect-[16/9]">
              <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: article.content || "" }} />
        </motion.div>
      </div>
    </section>
  );
}
