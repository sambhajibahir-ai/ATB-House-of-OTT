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
    <section id="faq" aria-labelledby="faq-heading" className="py-20 relative bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">
            Common Inquiries
          </div>
          <h2 id="faq-heading" className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
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
                className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-xs"
              >
                <h3>
                  <button
                    type="button"
                    id={btnId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-slate-900 hover:text-brand-red transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
                  >
                    <span className="text-sm sm:text-base font-semibold pr-2">
                      {faq.question}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-brand-red" : "text-slate-500"
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
                    className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-150 pt-3"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra contact box */}
        <div className="mt-10 text-center p-5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-sm font-semibold text-slate-900 mb-1">
            Need further assistance?
          </div>
          <div className="text-xs text-slate-600 mb-3">
            Our Ravet team is available 7 days a week from 10:00 AM to 03:00 AM.
          </div>
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://wa.me/919168530789?text=Hi%20House%20of%20OTT%20Ravet!%20I%20have%20a%20question%20regarding%20booking."
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:outline-none"
            >
              Ask on WhatsApp
            </a>
            <a
              href="tel:+919168530789"
              className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-250 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
            >
              Call +91 91685 30789
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
