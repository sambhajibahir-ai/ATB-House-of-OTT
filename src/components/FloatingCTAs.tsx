"use client";

import React, { useState, useEffect } from "react";
import { Phone, MessageCircle } from "lucide-react";

export function FloatingCTAs() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div 
      role="region" 
      aria-label="Quick booking actions"
      className="fixed bottom-0 left-0 right-0 z-40 p-2.5 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 sm:hidden shadow-lg"
    >
      <div className="flex items-center gap-2">
        <a
          href="tel:+919168530789"
          className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-amber-400 flex items-center justify-center shrink-0 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
          aria-label="Call House of OTT at +91 91685 30789"
        >
          <Phone className="w-4 h-4" aria-hidden="true" />
        </a>

        <a
          href="https://wa.me/919168530789?text=Hi%20House%20of%20OTT%20Ravet!%20I%20want%20to%20check%20private%20theater%20slot%20availability."
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-300 flex items-center justify-center shrink-0 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
          aria-label="Chat with House of OTT on WhatsApp"
        >
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
        </a>

        <a
          href="#book"
          className="flex-1 py-2.5 px-4 rounded-lg font-semibold text-xs tracking-wide text-white bg-brand-red hover:bg-red-700 transition-colors flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
        >
          <span>Book Slot (Advance ₹750)</span>
        </a>
      </div>
    </div>
  );
}
