"use client";

import React, { useState } from "react";
import Image from "next/image";
import { OCCASIONS } from "@/data/occasions";
import { Cake, Heart, Sparkles, PartyPopper, Tv, Smile, Check, ArrowRight } from "lucide-react";

interface OccasionsSectionProps {
  onSelectOccasion?: (occasionTitle: string) => void;
}

export function OccasionsSection({ onSelectOccasion }: OccasionsSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(OCCASIONS[0].id);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Cake":
        return <Cake className="w-4 h-4" aria-hidden="true" />;
      case "Heart":
        return <Heart className="w-4 h-4" aria-hidden="true" />;
      case "Sparkles":
        return <Sparkles className="w-4 h-4" aria-hidden="true" />;
      case "PartyPopper":
        return <PartyPopper className="w-4 h-4" aria-hidden="true" />;
      case "Tv":
        return <Tv className="w-4 h-4" aria-hidden="true" />;
      case "Smile":
      default:
        return <Smile className="w-4 h-4" aria-hidden="true" />;
    }
  };

  const currentOccasion = OCCASIONS.find((o) => o.id === activeTab) || OCCASIONS[0];

  const handleBookOccasion = (title: string) => {
    if (onSelectOccasion) {
      onSelectOccasion(title);
    }
    const bookElem = document.getElementById("book");
    if (bookElem) {
      bookElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="occasions" aria-labelledby="occasions-heading" className="py-20 relative bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">
            Celebration Experiences
          </div>
          <h2 id="occasions-heading" className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Tailored For Your Occasion
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            From intimate anniversary dates to high-energy birthday parties, our private theater 
            spaces are personalized with theme decor, music, and screen surprises.
          </p>
        </div>

        {/* Tab List */}
        <div 
          role="tablist" 
          aria-label="Celebration Occasions"
          className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar"
        >
          {OCCASIONS.map((occ) => {
            const isActive = activeTab === occ.id;
            return (
              <button
                key={occ.id}
                role="tab"
                id={`tab-${occ.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${occ.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTab(occ.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 shrink-0 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {getIcon(occ.icon)}
                <span>{occ.title.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Panel */}
        <div 
          role="tabpanel"
          id={`panel-${currentOccasion.id}`}
          aria-labelledby={`tab-${currentOccasion.id}`}
          className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Visual Image */}
            <div className="relative h-64 sm:h-80 lg:h-full min-h-[300px] bg-slate-100">
              <Image
                src={currentOccasion.image}
                alt={`${currentOccasion.title} setup at House of OTT Ravet`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/90 backdrop-blur-sm text-slate-800 border border-slate-200 shadow-xs">
                  Custom Decor Included
                </span>
              </div>
            </div>

            {/* Description & Perks */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-brand-red mb-1">
                  Private Celebration
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                  {currentOccasion.title}
                </h3>
                <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                  {currentOccasion.description}
                </p>

                {/* Highlights List */}
                <div className="mb-6">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-700 mb-2.5">
                    What&apos;s Included:
                  </div>
                  <ul className="space-y-2">
                    {currentOccasion.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleBookOccasion(currentOccasion.title)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg font-semibold text-xs tracking-wide bg-brand-red text-white hover:bg-red-800 transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
                >
                  <span>Book for {currentOccasion.title.split(" ")[0]}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <a
                  href="https://wa.me/919168530789?text=Hi%20House%20of%20OTT%20Ravet!%20I%20want%20to%20discuss%20a%20custom%20celebration%20theme."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg font-medium text-xs text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-center transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
                >
                  Custom Theme Discussion
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
