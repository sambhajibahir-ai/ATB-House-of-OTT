"use client";

import React, { useState } from "react";
import { Sparkles, X, Flame, ArrowRight } from "lucide-react";

export function TopAnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 text-white text-xs font-semibold py-2 px-4 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex-1 flex items-center justify-center gap-2 text-center flex-wrap">
          <span className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full text-[11px] uppercase tracking-wider font-extrabold text-amber-300">
            <Flame className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            Limited Slots
          </span>
          <span>
            Weekend Prime Slots Filling Fast in Ravet! Reserve today with just{" "}
            <strong className="underline underline-offset-2 font-black text-amber-200">
              ₹750 Advance Token
            </strong>{" "}
            &amp; get <strong>FREE Big-Screen Video Screening</strong>!
          </span>
          <a
            href="#book"
            className="inline-flex items-center gap-1 font-bold text-amber-200 hover:text-white underline underline-offset-4 ml-1"
          >
            <span>Claim Offer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="p-1 rounded-md hover:bg-black/20 text-white/80 hover:text-white transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
