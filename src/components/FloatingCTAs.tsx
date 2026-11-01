"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Phone, MessageCircle, Sparkles } from "lucide-react";

export function FloatingCTAs() {
  const { config } = useTheme();
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
      className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-[#07080B]/95 backdrop-blur-lg border-t border-white/10 sm:hidden shadow-2xl"
    >
      <div className="flex items-center gap-2">
        <a
          href="tel:+919168530789"
          className="p-3 rounded-xl bg-white/5 border border-white/10 text-amber-400 flex items-center justify-center shrink-0 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
          aria-label="Call House of OTT at +91 91685 30789"
        >
          <Phone className="w-4 h-4" aria-hidden="true" />
        </a>

        <a
          href="https://wa.me/919168530789?text=Hi%20House%20of%20OTT%20Ravet!%20I%20want%20to%20check%20private%20theater%20slot%20availability."
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
          aria-label="Chat with House of OTT on WhatsApp"
        >
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
        </a>

        <a
          href="#book"
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none ${config.buttonClass}`}
        >
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Book Slot (₹750 Token)</span>
        </a>
      </div>
    </div>
  );
}
