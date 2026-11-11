"use client";

import React from "react";
import { Check, X, Sparkles, ShieldCheck, HeartHandshake, Film } from "lucide-react";

export function MarketingComparison() {
  const comparisonItems = [
    {
      feature: "100% Private Room & Recliners",
      ott: "Exclusive private suite with plush velvet couple recliners — zero strangers",
      cinema: "Crowded public auditorium with 200+ strangers & whispering",
      cafe: "Noisy open tables, staff interruptions, zero intimacy",
      highlight: true
    },
    {
      feature: "Outside Food & Cake Allowed",
      ott: "100% Allowed! Order Zomato/Swiggy or bring home-cooked food & outside cake",
      cinema: "Strictly banned — forced to pay ₹500+ for popcorn & cold drinks",
      cafe: "Must order from limited cafe menu, outside cake fee often charged",
      highlight: true
    },
    {
      feature: "Special Effects & Surprise Decor",
      ott: "Fairytale Cloud Fog Entry, Neon Signboards, Cold Pyro Sparklers & Balloon Arch",
      cinema: "Zero decor allowed — strictly standard movie seats",
      cafe: "Basic table candle at best, no special stage or smoke entry",
      highlight: true
    },
    {
      feature: "Personal Surprise Video on Big Screen",
      ott: "Free! Play your personal couple memories, photo montage or proposal slideshow",
      cinema: "Impossible on public cinema screens",
      cafe: "Not possible",
      highlight: false
    },
    {
      feature: "150\"–200\" 4K Display & 1200W Sound",
      ott: "4K Laser Projection with heart-thumping 1200W Dolby Atmos surround sound",
      cinema: "Good audio, but fixed movie schedule with loud commercial ads",
      cafe: "Small 40-inch television with low background music",
      highlight: false
    },
    {
      feature: "Low Advance Booking Token",
      ott: "Lock slot with just ₹750 advance token — pay remaining balance at the venue",
      cinema: "100% non-refundable ticket charges upfront",
      cafe: "High table cover charge or waiting in long queues",
      highlight: true
    }
  ];

  return (
    <section 
      id="why-choose-us"
      aria-labelledby="comparison-heading"
      className="py-20 relative bg-gradient-to-b from-[#07080B] via-[#0C0F17] to-[#07080B] border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider mb-4 text-amber-400">
            <HeartHandshake className="w-3.5 h-3.5" aria-hidden="true" />
            <span>The Smarter Celebration Choice</span>
          </div>
          <h2 id="comparison-heading" className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Why Celebrate at House of OTT?
          </h2>
          <p className="text-base sm:text-lg text-gray-300">
            Compare why couples, birthday squads, and families in Ravet &amp; PCMC choose our private theater over ordinary movie halls and noisy restaurants.
          </p>
        </div>

        {/* Comparison Table for Desktop / Cards for Mobile */}
        <div className="hidden md:block rounded-3xl overflow-hidden border border-white/15 bg-[#0D101A] shadow-2xl">
          <div className="grid grid-cols-12 bg-[#121624] p-5 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-gray-400">
            <div className="col-span-4 text-white flex items-center gap-2">
              <Film className="w-4 h-4 text-amber-400" />
              <span>Feature / Experience</span>
            </div>
            <div className="col-span-4 text-center text-amber-400 font-extrabold flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>House of OTT (Ravet)</span>
            </div>
            <div className="col-span-2 text-center text-gray-400">Public Cinema Hall</div>
            <div className="col-span-2 text-center text-gray-400">Regular Cafe / Restaurant</div>
          </div>

          <div className="divide-y divide-white/5">
            {comparisonItems.map((item, idx) => (
              <div 
                key={idx}
                className={`grid grid-cols-12 p-5 items-center transition-colors ${
                  item.highlight ? "bg-amber-500/[0.02] hover:bg-amber-500/[0.05]" : "hover:bg-white/[0.02]"
                }`}
              >
                {/* Feature Name */}
                <div className="col-span-4 pr-4">
                  <div className="text-sm font-bold text-white mb-0.5">{item.feature}</div>
                </div>

                {/* House of OTT (Winner Column) */}
                <div className="col-span-4 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center">
                  <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item.ott}</span>
                  </div>
                </div>

                {/* Public Cinema */}
                <div className="col-span-2 px-3 text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{item.cinema}</span>
                </div>

                {/* Regular Cafe */}
                <div className="col-span-2 px-3 text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{item.cafe}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View: Cards */}
        <div className="md:hidden space-y-4">
          {comparisonItems.map((item, idx) => (
            <div key={idx} className="rounded-2xl bg-[#0E111C] border border-white/10 p-4 shadow-lg">
              <h3 className="text-sm font-bold text-white mb-2 flex items-center justify-between">
                <span>{item.feature}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                  House of OTT Advantage
                </span>
              </h3>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 mb-2">
                <div className="flex items-start gap-2 text-xs font-bold text-amber-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item.ott}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-400">
                <div className="p-2 rounded-lg bg-white/5 flex items-start gap-1">
                  <X className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span>Public Cinema: {item.cinema}</span>
                </div>
                <div className="p-2 rounded-lg bg-white/5 flex items-start gap-1">
                  <X className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span>Regular Cafe: {item.cafe}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 text-center">
          <a
            href="#book"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-amber-950/40 hover:from-amber-400 hover:to-amber-300 transition-transform active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Book Your Private Screening (₹750 Advance Token)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
