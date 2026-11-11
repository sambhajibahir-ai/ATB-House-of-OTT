"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2 } from "lucide-react";

interface SocialProofItem {
  id: number;
  text: string;
  subtext: string;
  icon: string;
  tag: string;
}

const NOTIFICATIONS: SocialProofItem[] = [
  {
    id: 1,
    icon: "🔥",
    tag: "Just Booked",
    text: "Priya from Wakad reserved The Red Carpet Suite",
    subtext: "Saturday 5:30 PM Slot • 4 minutes ago"
  },
  {
    id: 2,
    icon: "💍",
    tag: "Surprise Proposal",
    text: "Aniket & Sneha booked Proposal Setup + Cloud Fog",
    subtext: "House of OTT Ravet • 12 minutes ago"
  },
  {
    id: 3,
    icon: "⚡",
    tag: "High Demand",
    text: "Only 2 evening slots left for this weekend!",
    subtext: "Book now with ₹750 advance token to lock slot"
  },
  {
    id: 4,
    icon: "🎂",
    tag: "Birthday Bash",
    text: "Rohan from Hinjawadi booked The Blockbuster Arena",
    subtext: "Birthday Decor & 180\" Laser Screen • 25 mins ago"
  },
  {
    id: 5,
    icon: "⭐",
    tag: "Top Rated",
    text: "4.9 / 5 Stars on Google Maps (580+ Reviews)",
    subtext: "Pune's #1 Most Loved Private Theater Celebration Venue"
  }
];

export function LiveSocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const timer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % NOTIFICATIONS.length);
        setIsVisible(true);
      }, 400);
    }, 7000);

    return () => clearInterval(timer);
  }, [isDismissed]);

  if (isDismissed) return null;

  const current = NOTIFICATIONS[currentIndex];

  const handleJumpToBooking = () => {
    const bookElem = document.getElementById("book");
    if (bookElem) {
      bookElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Live booking updates"
      className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 z-40 max-w-xs sm:max-w-sm"
    >
      <div
        className={`rounded-2xl bg-[#111422]/95 border border-amber-500/30 p-3 sm:p-3.5 backdrop-blur-xl shadow-2xl transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 text-lg">
            {current.icon}
          </div>

          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                {current.tag}
              </span>
              <span className="text-[10px] text-gray-400">• Ravet, Pune</span>
            </div>
            <p className="text-xs font-semibold text-white truncate">
              {current.text}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5 truncate">
              {current.subtext}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 shrink-0"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
          <span className="text-emerald-400 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-3 h-3" />
            <span>₹750 Advance Token</span>
          </span>
          <button
            type="button"
            onClick={handleJumpToBooking}
            className="text-amber-400 font-bold hover:underline flex items-center gap-1"
          >
            <span>Book Slot</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
