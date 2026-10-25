"use client";

import React, { useState } from "react";
import { FAQS } from "@/data/faq";
import { ChevronDown } from "lucide-react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-20 relative bg-background border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 uppercase tracking-wide mb-3">
            Common Inquiries
          </div>
          <h2 id="faq-heading" className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Clear information about private theater bookings, OTT streaming, outside food policy, and venue rules.
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
                className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden"
              >
                <h3>
                  <button
                    type="button"
                    id={btnId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-white hover:text-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
                  >
                    <span className="text-sm sm:text-base font-semibold pr-2">
                      {faq.question}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-amber-400" : "text-slate-400"
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
                    className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-3"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra contact box */}
        <div className="mt-10 text-center p-5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-sm font-semibold text-white mb-1">
            Need further assistance?
          </div>
          <div className="text-xs text-slate-400 mb-3">
            Our Ravet team is available 7 days a week from 10:00 AM to 03:00 AM.
          </div>
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://wa.me/919168530789?text=Hi%20House%20of%20OTT%20Ravet!%20I%20have%20a%20question%20regarding%20booking."
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
            >
              Ask on WhatsApp
            </a>
            <a
              href="tel:+919168530789"
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
            >
              Call +91 91685 30789
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
