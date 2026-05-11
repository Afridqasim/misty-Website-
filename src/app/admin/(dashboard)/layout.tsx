"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";
import { LayoutDashboard, Image, FileText, LogOut, Loader2, Menu, X } from "lucide-react";

const sidebarLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/portfolio", label: "Portfolio", icon: Image },
  { href: "/admin/articles", label: "Articles", icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
        return;
      }
      setLoading(false);
    }
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 size={40} className="text-fuchsia-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] flex">
      {/* Mobile toggle */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-fuchsia-500/30">
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] w-64 bg-black/80 backdrop-blur-xl border-r border-white/5 z-40 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">+91</div>
            <span className="text-white font-bold">Admin Panel</span>
          </div>

          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? "bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                >
                  <link.icon size={18} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/5">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/5 w-full transition-all">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-6 lg:p-10 w-full">
        {children}
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="lg:hidden fixed inset-0 bg-black/50 z-30" />}
    </div>
  );
}
