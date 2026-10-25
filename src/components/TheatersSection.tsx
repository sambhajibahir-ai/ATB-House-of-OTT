"use client";

import React, { useState } from "react";
import Image from "next/image";
import { THEATERS } from "@/data/theaters";
import { Check, Users, Monitor, Volume2, Sparkles, ChevronRight, Clock } from "lucide-react";

interface TheatersSectionProps {
  onSelectTheater?: (theaterId: string) => void;
}

export function TheatersSection({ onSelectTheater }: TheatersSectionProps) {
  const [selectedTheaterId, setSelectedTheaterId] = useState<string>("cinema-suite");

  const handleBookTheater = (theaterId: string) => {
    setSelectedTheaterId(theaterId);
    if (onSelectTheater) {
      onSelectTheater(theaterId);
    }
    const bookElem = document.getElementById("book");
    if (bookElem) {
      bookElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="theaters" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-crimson text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Private Screening Rooms in Ravet</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Choose Your Private Theater
          </h2>
          <p className="text-base sm:text-lg text-gray-400">
            Every theater at House of OTT Ravet is 100% private, sanitized, sound-treated, 
            and loaded with ultra-high definition projection and heart-thumping Dolby surround sound.
          </p>
        </div>

        {/* Theaters Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {THEATERS.map((theater) => {
            const isSelected = selectedTheaterId === theater.id;
            return (
              <div
                key={theater.id}
                className={`relative rounded-3xl overflow-hidden transition-all duration-300 flex flex-col ${
                  theater.popular
                    ? "bg-[#141720] border-2 border-brand-red/40 shadow-2xl shadow-brand-red/10"
                    : "bg-[#111319] border border-white/10 hover:border-white/25"
                }`}
              >
                {/* Popular Badge */}
                {theater.badge && (
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-brand-red text-white shadow-lg">
                    {theater.badge}
                  </div>
                )}

                {/* Theater Image */}
                <div className="relative h-60 w-full overflow-hidden group">
                  <Image
                    src={theater.image}
                    alt={`${theater.name} - Private Theater in Ravet Pune`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111319] via-transparent to-transparent" />
                  
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md flex items-center gap-1.5 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-brand-gold" />
                      3 Hours Booking
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md flex items-center gap-1.5 font-semibold">
                      <Users className="w-3.5 h-3.5 text-brand-crimson" />
                      {theater.capacityText}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {theater.name}
                    </h3>
                    <p className="text-xs text-gray-400 mb-6 min-h-[36px]">
                      {theater.tagline}
                    </p>

                    {/* Quick Specs Badges */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                        <Monitor className="w-4 h-4 text-brand-neon shrink-0" />
                        <div>
                          <div className="text-[10px] text-gray-400 uppercase font-semibold">Screen</div>
                          <div className="text-xs font-bold text-gray-200">{theater.screenSize}</div>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                        <Volume2 className="w-4 h-4 text-brand-gold shrink-0" />
                        <div>
                          <div className="text-[10px] text-gray-400 uppercase font-semibold">Audio</div>
                          <div className="text-xs font-bold text-gray-200">{theater.audioSpec.split(" ")[0]} Dolby</div>
                        </div>
                      </div>
                    </div>

                    {/* Features Checklist */}
                    <div className="space-y-2.5 mb-6">
                      <div className="text-xs font-bold uppercase tracking-wider text-gray-300">
                        What&apos;s Included:
                      </div>
                      {theater.features.slice(0, 5).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-6 border-t border-white/10 mt-auto">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <div className="text-xs text-gray-400 font-medium">Starting from</div>
                        <div className="text-3xl font-extrabold text-white">
                          ₹{theater.basePrice}
                          <span className="text-xs text-gray-400 font-normal"> / 3 hrs</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[11px] text-gray-400">Extra Guest</div>
                        <div className="text-xs font-semibold text-brand-gold">+₹{theater.extraPersonPrice}/person</div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleBookTheater(theater.id)}
                      className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg ${
                        theater.popular
                          ? "bg-gradient-to-r from-brand-red to-brand-crimson text-white hover:opacity-95 shadow-brand-red/30"
                          : "bg-white/10 hover:bg-white/20 text-white"
                      }`}
                    >
                      <span>Book {theater.name.split(" ")[1]}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Guarantee Banner */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 border border-white/10 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-brand-gold" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                Transparent Pricing • Only ₹750 Advance Token To Lock Slot
              </div>
              <div className="text-xs text-gray-400">
                Pay the remaining balance at the venue. Zero hidden service fees. Free outside food delivery permitted!
              </div>
            </div>
          </div>
          <a
            href="#pricing"
            className="shrink-0 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white border border-white/15 transition-all"
          >
            Calculate Exact Price →
          </a>
        </div>
      </div>
    </section>
  );
}
