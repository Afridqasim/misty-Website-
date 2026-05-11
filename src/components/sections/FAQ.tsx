"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What do you need to start?",
    answer: "We need your booth size, open sides, brand guidelines, and any specific requirements you have for the stand (e.g. meeting areas, storage, display screens)."
  },
  {
    question: "How long does a design take?",
    answer: "Typically, a first draft is ready in 3-5 business days. Final renders and technical drawings usually take another 2-3 days after your approval."
  },
  {
    question: "Do you provide technical drawings?",
    answer: "Yes, we provide build-ready technical drawings with dimensions and materials specified, ready for your booth builder to start construction."
  },
  {
    question: "Can we request revisions?",
    answer: "Absolutely. We offer 2-3 rounds of revisions to ensure the design perfectly aligns with your vision and requirements."
  },
  {
    question: "Do you handle stand production?",
    answer: "We are a specialist design studio. While we don't build the stands ourselves, our designs are optimized for construction and we work closely with your builders."
  },
  {
    question: "What are your costs?",
    answer: "Pricing depends on the complexity and size of the stand. Contact us for a custom quote based on your specific project needs."
  }
];

import SectionTag from "../SectionTag";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionTag text="FAQ" />
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Real answers to the questions we hear most
          </h2>
          <div className="h-1.5 w-20 bg-fuchsia-500 mx-auto rounded-full" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/5 rounded-2xl overflow-hidden bg-white/[0.02]">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left p-6 flex justify-between items-center glass-tab rounded-2xl"
              >
                <span className="text-lg font-semibold text-white">{faq.question}</span>
                <span className="p-1 rounded-lg bg-white/5 text-fuchsia-400">
                  {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
