"use client";

import React, { useState } from "react";
import { FAQS } from "@/data/faq";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-20 relative bg-[#07080B] border-b border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider mb-4 text-amber-400">
            <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 id="faq-heading" className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-gray-300">
            Everything you need to know about booking, OTT streaming, outside food policy, 
            decorations, and private theater experiences in Ravet, Pune.
          </p>
        </div>

        {/* WAI-ARIA Accessible Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const btnId = `faq-trigger-${idx}`;
            const panelId = `faq-panel-${idx}`;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#111420] border border-white/10 overflow-hidden transition-all shadow-md"
              >
                <h3>
                  <button
                    type="button"
                    id={btnId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 text-white hover:text-amber-400 transition-colors focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
                  >
                    <span className="text-sm sm:text-base font-bold pr-2">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full bg-white/5 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-amber-500 text-slate-950 font-bold" : "text-gray-400"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-4"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Have more questions CTA */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
          <div className="text-sm font-bold text-white mb-1">
            Have a question not listed here?
          </div>
          <div className="text-xs text-gray-400 mb-4">
            Our team is available on WhatsApp and Phone 7 days a week from 10:00 AM to 03:00 AM.
          </div>
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://wa.me/919168530789?text=Hi%20House%20of%20OTT%20Ravet!%20I%20have%20a%20question%20regarding%20booking."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
            >
              Ask on WhatsApp
            </a>
            <a
              href="tel:+919168530789"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/10 text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
            >
              Call +91 91685 30789
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
