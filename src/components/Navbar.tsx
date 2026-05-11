"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/articles", label: "Articles" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 py-6 pointer-events-none">
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`mx-auto max-w-7xl pointer-events-auto transition-all duration-500 ${
          scrolled 
            ? "bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-8 shadow-2xl shadow-purple-500/10" 
            : "bg-transparent px-4"
        }`}
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-fuchsia-500/30">
              +91
            </div>
            <span className="text-lg font-black text-white tracking-tighter uppercase">
              Plus 91 <span className="text-fuchsia-500">Design</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navActive"
                      className="absolute inset-0 rounded-full bg-purple-500/15 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white text-xs font-black uppercase tracking-widest hover:shadow-lg hover:shadow-fuchsia-500/40 transition-all duration-300 hover:scale-105"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="md:hidden fixed inset-4 top-24 bg-black/95 backdrop-blur-2xl border border-white/10 rounded-3xl z-40 p-8 flex flex-col items-center justify-center gap-6 pointer-events-auto"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-black text-white uppercase tracking-tighter"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 px-10 py-4 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-black uppercase tracking-widest"
            >
              Get a Quote
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
