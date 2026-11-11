"use client";

import React, { useState } from "react";
import { Calendar, Users, Sparkles, Clock, ArrowRight, ShieldCheck, Check } from "lucide-react";

interface HeroQuickCheckProps {
  onQuickBook?: (theaterId: string, occasion: string, date: string, time: string, guests: number) => void;
}

export function HeroQuickCheck({ onQuickBook }: HeroQuickCheckProps) {
  const [selectedTheater, setSelectedTheater] = useState("cinema-suite");
  const [selectedOccasion, setSelectedOccasion] = useState("Birthday Celebrations");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("05:30 PM - 08:30 PM");
  const [dateOption, setDateOption] = useState<"today" | "tomorrow" | "weekend">("today");

  const getPricePreview = () => {
    let base = 1499;
    if (selectedTheater === "blockbuster-arena") base = 2499;
    if (selectedTheater === "royal-ott-lounge") base = 3999;
    return base;
  };

  const handleCheckAndReserve = () => {
    const today = new Date();
    const targetDate = new Date();
    if (dateOption === "tomorrow") {
      targetDate.setDate(today.getDate() + 1);
    } else if (dateOption === "weekend") {
      const day = today.getDay();
      const diff = (6 - day + 7) % 7 || 7;
      targetDate.setDate(today.getDate() + diff);
    }
    const dateStr = targetDate.toISOString().split("T")[0];

    const guests = selectedTheater === "cinema-suite" ? 2 : selectedTheater === "blockbuster-arena" ? 5 : 8;

    if (onQuickBook) {
      onQuickBook(selectedTheater, selectedOccasion, dateStr, selectedTimeSlot, guests);
    }

    const wizardElem = document.getElementById("book");
    if (wizardElem) {
      wizardElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-[#0F121C]/90 border border-white/20 p-5 sm:p-6 backdrop-blur-xl shadow-2xl relative z-20 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Quick Slot &amp; Price Check (Ravet, Pune)
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Advance ₹750 Only • Balance at Venue</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
        {/* Date Selector */}
        <div>
          <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Select Day</span>
          </label>
          <div className="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => setDateOption("today")}
              className={`py-2 rounded-lg text-xs font-semibold text-center transition-all ${
                dateOption === "today"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setDateOption("tomorrow")}
              className={`py-2 rounded-lg text-xs font-semibold text-center transition-all ${
                dateOption === "tomorrow"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Tmrw
            </button>
            <button
              type="button"
              onClick={() => setDateOption("weekend")}
              className={`py-2 rounded-lg text-xs font-semibold text-center transition-all ${
                dateOption === "weekend"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Weekend
            </button>
          </div>
        </div>

        {/* Theater Room */}
        <div>
          <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Theater Room</span>
          </label>
          <select
            value={selectedTheater}
            onChange={(e) => setSelectedTheater(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-2.5 px-3 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none font-semibold"
          >
            <option value="cinema-suite" className="bg-[#121520] text-white">
              Red Carpet Suite (2-4 Guests) - ₹1,499
            </option>
            <option value="blockbuster-arena" className="bg-[#121520] text-white">
              Blockbuster Arena (5-10 Guests) - ₹2,499
            </option>
            <option value="royal-ott-lounge" className="bg-[#121520] text-white">
              Royal OTT Lounge (8-20 Guests) - ₹3,999
            </option>
          </select>
        </div>

        {/* Time Slot */}
        <div>
          <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>3-Hour Slot</span>
          </label>
          <select
            value={selectedTimeSlot}
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-2.5 px-3 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none font-semibold"
          >
            <option value="11:00 AM - 02:00 PM" className="bg-[#121520] text-white">
              11:00 AM - 02:00 PM (Matinee)
            </option>
            <option value="02:15 PM - 05:15 PM" className="bg-[#121520] text-white">
              02:15 PM - 05:15 PM (Afternoon)
            </option>
            <option value="05:30 PM - 08:30 PM" className="bg-[#121520] text-white">
              05:30 PM - 08:30 PM (Evening Prime)
            </option>
            <option value="08:45 PM - 11:45 PM" className="bg-[#121520] text-white">
              08:45 PM - 11:45 PM (Night Special)
            </option>
            <option value="11:55 PM - 02:55 AM" className="bg-[#121520] text-white">
              11:55 PM - 02:55 AM (Midnight VIP)
            </option>
          </select>
        </div>

        {/* Occasion */}
        <div>
          <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>Occasion</span>
          </label>
          <select
            value={selectedOccasion}
            onChange={(e) => setSelectedOccasion(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-2.5 px-3 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none font-semibold"
          >
            <option value="Birthday Celebrations" className="bg-[#121520] text-white">
              Birthday Celebrations
            </option>
            <option value="Romantic Anniversaries" className="bg-[#121520] text-white">
              Romantic Anniversaries
            </option>
            <option value="Surprise Marriage Proposal" className="bg-[#121520] text-white">
              Surprise Marriage Proposal
            </option>
            <option value="Movie Date & OTT Chill" className="bg-[#121520] text-white">
              Movie Date &amp; OTT Chill
            </option>
            <option value="Bride-to-be & Bachelorette" className="bg-[#121520] text-white">
              Bride-to-be &amp; Bachelorette
            </option>
            <option value="PS5 Gaming Tournament" className="bg-[#121520] text-white">
              PS5 Gaming Tournament
            </option>
          </select>
        </div>
      </div>

      {/* Action Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-white/10">
        <div className="flex items-center gap-4 text-xs">
          <div>
            <span className="text-gray-400">Theater Starting: </span>
            <span className="font-extrabold text-white text-base">₹{getPricePreview()}</span>
          </div>
          <span className="text-gray-600">|</span>
          <div className="text-emerald-400 font-semibold flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            <span>Outside Food Allowed</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCheckAndReserve}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 transition-transform active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Check Availability &amp; Book (₹750 Advance)</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>
      </div>
    </div>
  );
}
