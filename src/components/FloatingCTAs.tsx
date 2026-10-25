"use client";

import React, { useState, useEffect } from "react";
import { Phone, MessageCircle, Sparkles, MapPin } from "lucide-react";

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
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-[#0d0f17]/95 backdrop-blur-lg border-t border-white/10 sm:hidden shadow-2xl">
      <div className="flex items-center gap-2">
        <a
          href="tel:+919168530789"
          className="p-3 rounded-xl bg-white/5 border border-white/10 text-brand-gold flex items-center justify-center shrink-0"
          aria-label="Call House of OTT"
        >
          <Phone className="w-4 h-4" />
        </a>

        <a
          href="https://wa.me/919168530789?text=Hi%20House%20of%20OTT%20Ravet!%20I%20want%20to%20check%20private%20theater%20slot%20availability."
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0"
          aria-label="WhatsApp House of OTT"
        >
          <MessageCircle className="w-4 h-4" />
        </a>

        <a
          href="#book"
          className="flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-brand-red to-brand-crimson shadow-lg shadow-brand-red/30 flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Book Slot (₹750 Token)</span>
        </a>
      </div>
    </div>
  );
}
