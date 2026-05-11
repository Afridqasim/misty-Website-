"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from "lucide-react";
import SectionTag from "../../components/SectionTag";

const contactInfo = [
  { icon: Mail, label: "Email Us", value: "info@plus91design.com", href: "mailto:info@plus91design.com" },
  { icon: Phone, label: "Call Us", value: "+91 98765 43210", href: "tel:+919876543210" },
  { icon: MapPin, label: "Mumbai Office", value: "Mumbai, Maharashtra, India", href: null },
  { icon: MapPin, label: "Dubai Office", value: "Dubai, United Arab Emirates", href: null },
  { icon: Clock, label: "Working Hours", value: "Mon - Sat: 9:00 AM - 7:00 PM IST", href: null },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", message: "", service: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      <section className="relative py-24 overflow-hidden">
        {/* Background gradient orbs removed to fix visual division */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center flex flex-col items-center"
          >
            <SectionTag text="Get In Touch" />
            <h1 className="text-5xl sm:text-6xl font-black text-white leading-[1.1] mb-6">
              Let&apos;s Create Something{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent">Amazing</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Ready to make your next exhibition unforgettable? Get in touch with our team and let&apos;s discuss your project.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/5"
                >
                  <div className="w-10 h-10 rounded-lg bg-fuchsia-500/10 flex items-center justify-center shrink-0">
                    <info.icon size={18} className="text-fuchsia-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{info.label}</div>
                    {info.href ? (
                      <a href={info.href} className="text-gray-400 text-sm hover:text-fuchsia-400 transition-colors">{info.value}</a>
                    ) : (
                      <div className="text-gray-400 text-sm">{info.value}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-white/[0.03] border border-white/5 space-y-6">
                <h3 className="text-2xl font-bold text-white mb-2">Send Us a Message</h3>
                <p className="text-gray-400 text-sm mb-6">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Full Name *</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 transition-colors placeholder-gray-600" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Email *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 transition-colors placeholder-gray-600" placeholder="john@company.com" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Phone</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 transition-colors placeholder-gray-600" placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Company</label>
                    <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 transition-colors placeholder-gray-600" placeholder="Your Company" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Service Interested In</label>
                  <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 transition-colors appearance-none">
                    <option value="" className="bg-gray-900">Select a service</option>
                    <option value="exhibition-stand" className="bg-gray-900">Exhibition Stand Design</option>
                    <option value="booth-viz" className="bg-gray-900">Booth Visualization</option>
                    <option value="custom-stall" className="bg-gray-900">Custom Stall Design</option>
                    <option value="trade-show" className="bg-gray-900">Trade Show Graphics</option>
                    <option value="other" className="bg-gray-900">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Message *</label>
                  <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 transition-colors placeholder-gray-600 resize-none"
                    placeholder="Tell us about your project, exhibition, and requirements..." />
                </div>

                <button type="submit" disabled={submitted}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-semibold hover:shadow-xl hover:shadow-fuchsia-500/30 transition-all duration-300 disabled:opacity-60">
                  {submitted ? (<><CheckCircle size={18} /> Message Sent!</>) : (<><Send size={18} /> Send Message</>)}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
