"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabase";
import { Image, FileText, Eye, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const [portfolioCount, setPortfolioCount] = useState(0);
  const [articlesCount, setArticlesCount] = useState(0);

  useEffect(() => {
    async function fetchCounts() {
      const { count: pCount } = await supabase.from("portfolio").select("*", { count: "exact", head: true });
      const { count: aCount } = await supabase.from("articles").select("*", { count: "exact", head: true });
      if (pCount !== null) setPortfolioCount(pCount);
      if (aCount !== null) setArticlesCount(aCount);
    }
    fetchCounts();
  }, []);

  const cards = [
    { label: "Portfolio Projects", count: portfolioCount, icon: Image, color: "from-fuchsia-500 to-purple-600" },
    { label: "Published Articles", count: articlesCount, icon: FileText, color: "from-blue-500 to-cyan-500" },
    { label: "Total Content", count: portfolioCount + articlesCount, icon: TrendingUp, color: "from-emerald-500 to-green-500" },
    { label: "Public Pages", count: 6, icon: Eye, color: "from-orange-500 to-amber-500" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Manage your portfolio and articles here.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card) => (
          <div key={card.label} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 shadow-lg`}>
              <card.icon size={22} className="text-white" />
            </div>
            <div className="text-3xl font-black text-white mb-1">{card.count}</div>
            <div className="text-gray-400 text-sm">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/5">
        <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <a href="/admin/portfolio" className="flex items-center gap-4 p-4 rounded-xl bg-fuchsia-500/5 border border-fuchsia-500/10 hover:border-fuchsia-500/30 transition-all group">
            <Image size={20} className="text-fuchsia-400" />
            <div>
              <div className="text-white font-semibold text-sm group-hover:text-fuchsia-400 transition-colors">Manage Portfolio</div>
              <div className="text-gray-500 text-xs">Add, edit, or remove projects</div>
            </div>
          </a>
          <a href="/admin/articles" className="flex items-center gap-4 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 hover:border-blue-500/30 transition-all group">
            <FileText size={20} className="text-blue-400" />
            <div>
              <div className="text-white font-semibold text-sm group-hover:text-blue-400 transition-colors">Manage Articles</div>
              <div className="text-gray-500 text-xs">Write and publish blog posts</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
