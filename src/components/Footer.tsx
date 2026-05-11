import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Articles", href: "/articles" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Exhibition Stand Design", href: "/services" },
    { label: "3D Booth Visualization", href: "/services" },
    { label: "Custom Stall Design", href: "/services" },
    { label: "Trade Show Design", href: "/services" },
    { label: "Event Branding", href: "/services" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-black/60 border-t border-white/5">
      {/* Glow effect at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center font-bold text-white text-lg">
                +91
              </div>
              <span className="text-xl font-bold text-white">
                Plus 91 Design
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Specialist 3D exhibition stand design studio for booth builders
              and exhibitors across Europe, UAE, USA, and India.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-fuchsia-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-fuchsia-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Get In Touch
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-fuchsia-400 mt-1 shrink-0" />
                <a
                  href="mailto:info@plus91design.com"
                  className="text-gray-400 hover:text-fuchsia-400 text-sm transition-colors"
                >
                  info@plus91design.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-fuchsia-400 mt-1 shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-gray-400 hover:text-fuchsia-400 text-sm transition-colors"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-fuchsia-400 mt-1 shrink-0" />
                <span className="text-gray-400 text-sm">
                  Mumbai, India | Dubai, UAE
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Plus 91 Design. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-fuchsia-400 text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-500 hover:text-fuchsia-400 text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
