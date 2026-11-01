"use client";

import React, { useState } from "react";
import Image from "next/image";
import { THEATERS } from "@/data/theaters";
import { useTheme } from "@/context/ThemeContext";
import { Check, Users, Monitor, Volume2, ChevronRight, Clock, Sparkles } from "lucide-react";

interface TheatersSectionProps {
  onSelectTheater?: (theaterId: string) => void;
}

export function TheatersSection({ onSelectTheater }: TheatersSectionProps) {
  const { config } = useTheme();
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
    <section id="theaters" aria-labelledby="theaters-heading" className="py-20 relative bg-[#07080B] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider mb-4 text-amber-400">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Private Screening Rooms in Ravet</span>
          </div>
          <h2 id="theaters-heading" className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Choose Your Private Theater Room
          </h2>
          <p className="text-base sm:text-lg text-gray-300">
            Every theater at House of OTT Ravet is 100% private, sanitized, sound-treated, 
            and loaded with ultra-high definition projection and heart-thumping Dolby surround sound.
          </p>
        </div>

        {/* Theaters Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {THEATERS.map((theater) => (
            <div
              key={theater.id}
              className={`rounded-3xl overflow-hidden flex flex-col transition-all duration-300 ${
                theater.popular
                  ? "bg-[#131622] border-2 border-amber-500/50 shadow-2xl shadow-amber-950/20"
                  : "bg-[#0E1118] border border-white/10 hover:border-white/20"
              }`}
            >
              {/* Theater Image */}
              <div className="relative h-60 w-full overflow-hidden group">
                <Image
                  src={theater.image}
                  alt={`${theater.name} setup at House of OTT Ravet`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1118] via-transparent to-transparent opacity-80" />

                {/* Popular Badge */}
                {theater.badge && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg">
                    {theater.badge}
                  </div>
                )}

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md flex items-center gap-1.5 font-semibold border border-white/10">
                    <Clock className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                    3 Hours Slot
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md flex items-center gap-1.5 font-semibold border border-white/10">
                    <Users className="w-3.5 h-3.5 text-rose-400" aria-hidden="true" />
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
                  <p className="text-xs sm:text-sm text-gray-300 mb-6 min-h-[40px] leading-relaxed">
                    {theater.tagline}
                  </p>

                  {/* Specs Summary */}
                  <div className="grid grid-cols-2 gap-2.5 mb-6">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
                        <Monitor className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                        <span className="uppercase text-[10px] font-bold">Screen</span>
                      </div>
                      <div className="text-xs font-bold text-gray-200">{theater.screenSize}</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
                        <Volume2 className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                        <span className="uppercase text-[10px] font-bold">Sound</span>
                      </div>
                      <div className="text-xs font-bold text-gray-200">{theater.audioSpec.split(" ")[0]} Dolby</div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-300">
                      What&apos;s Included:
                    </div>
                    {theater.features.slice(0, 5).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
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
                      <div className="text-xs text-gray-400">Extra Guests</div>
                      <div className="text-xs font-semibold text-amber-400">+₹{theater.extraPersonPrice}/person</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleBookTheater(theater.id)}
                    aria-label={`Book ${theater.name} for ₹${theater.basePrice}`}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
                      theater.popular
                        ? config.buttonClass
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    <span>Choose {theater.name}</span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
