"use client";

import React from "react";
import Image from "next/image";
import { THEATERS } from "@/data/theaters";
import { Check, Users, Monitor, Volume2, ChevronRight, Clock } from "lucide-react";

interface TheatersSectionProps {
  onSelectTheater?: (theaterId: string) => void;
}

export function TheatersSection({ onSelectTheater }: TheatersSectionProps) {
  const handleBookTheater = (theaterId: string) => {
    if (onSelectTheater) {
      onSelectTheater(theaterId);
    }
    const bookElem = document.getElementById("book");
    if (bookElem) {
      bookElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="theaters" aria-labelledby="theaters-heading" className="py-20 relative bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">
            Private Screening Rooms
          </div>
          <h2 id="theaters-heading" className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Select Your Private Theater Room
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Every theater at House of OTT Ravet is 100% private, sanitized, sound-treated, 
            and equipped with 4K laser projection and immersive Dolby surround sound.
          </p>
        </div>

        {/* Theaters Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {THEATERS.map((theater) => (
            <div
              key={theater.id}
              className={`rounded-2xl overflow-hidden flex flex-col border transition-all ${
                theater.popular
                  ? "bg-white border-brand-red/50 shadow-md ring-1 ring-brand-red/20"
                  : "bg-white border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm"
              }`}
            >
              {/* Theater Image */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <Image
                  src={theater.image}
                  alt={`${theater.name} setup at House of OTT Ravet`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                />
                
                {/* Popular Badge */}
                {theater.badge && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-semibold bg-brand-red text-white shadow-sm">
                    {theater.badge}
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-900">
                  <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm flex items-center gap-1.5 font-medium border border-slate-200 shadow-xs">
                    <Clock className="w-3.5 h-3.5 text-amber-700" aria-hidden="true" />
                    3 Hours Slot
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm flex items-center gap-1.5 font-medium border border-slate-200 shadow-xs">
                    <Users className="w-3.5 h-3.5 text-brand-red" aria-hidden="true" />
                    {theater.capacityText}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1.5">
                    {theater.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mb-5 min-h-[38px] leading-relaxed">
                    {theater.tagline}
                  </p>

                  {/* Specs Summary */}
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-0.5">
                        <Monitor className="w-3.5 h-3.5 text-slate-700" aria-hidden="true" />
                        <span>Screen Size</span>
                      </div>
                      <div className="text-xs font-semibold text-slate-900">{theater.screenSize}</div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-0.5">
                        <Volume2 className="w-3.5 h-3.5 text-amber-700" aria-hidden="true" />
                        <span>Sound</span>
                      </div>
                      <div className="text-xs font-semibold text-slate-900">{theater.audioSpec.split(" ")[0]} Dolby</div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mb-6">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-700 mb-2">
                      Key Highlights:
                    </div>
                    <ul className="space-y-2">
                      {theater.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-5 border-t border-slate-200 mt-auto">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <div className="text-xs text-slate-500 font-medium">Rent (for {theater.baseCapacity} pax)</div>
                      <div className="text-2xl font-bold text-slate-900">
                        ₹{theater.basePrice}
                        <span className="text-xs text-slate-500 font-normal"> / 3 hrs</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500">Extra Guests</div>
                      <div className="text-xs font-semibold text-amber-800">+₹{theater.extraPersonPrice}/person</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleBookTheater(theater.id)}
                    aria-label={`Book ${theater.name} for ₹${theater.basePrice}`}
                    className={`w-full py-2.5 rounded-lg font-semibold text-xs tracking-wide transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none ${
                      theater.popular
                        ? "bg-brand-red text-white hover:bg-red-800"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-250"
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
