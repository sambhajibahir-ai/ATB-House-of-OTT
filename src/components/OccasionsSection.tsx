"use client";

import React, { useState } from "react";
import Image from "next/image";
import { OCCASIONS } from "@/data/occasions";
import { useTheme } from "@/context/ThemeContext";
import { Cake, Heart, Sparkles, PartyPopper, Tv, Smile, Check, ArrowRight } from "lucide-react";

interface OccasionsSectionProps {
  onSelectOccasion?: (occasionTitle: string) => void;
}

export function OccasionsSection({ onSelectOccasion }: OccasionsSectionProps) {
  const { config } = useTheme();
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
    <section id="occasions" aria-labelledby="occasions-heading" className="py-20 relative bg-[#090C12] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider mb-4 text-amber-400">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Celebrate Every Milestone</span>
          </div>
          <h2 id="occasions-heading" className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Custom Celebrations &amp; Experiences
          </h2>
          <p className="text-base sm:text-lg text-gray-300">
            From fairytale candlelight proposals to high-voltage birthday bashes, 
            we transform our private theater into a personalized wonderland just for you.
          </p>
        </div>

        {/* Tab List */}
        <div 
          role="tablist" 
          aria-label="Celebration Occasions"
          className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar"
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
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
                  isActive
                    ? `${config.buttonClass} shadow-lg scale-105`
                    : "bg-[#11141F] text-gray-300 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {getIcon(occ.icon)}
                <span>{occ.title.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Panel */}
        <div 
          role="tabpanel"
          id={`panel-${currentOccasion.id}`}
          aria-labelledby={`tab-${currentOccasion.id}`}
          className="rounded-3xl bg-[#111420] border border-white/10 overflow-hidden shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Visual Image */}
            <div className="relative h-72 sm:h-96 lg:h-full min-h-[340px] bg-black">
              <Image
                src={currentOccasion.image}
                alt={`${currentOccasion.title} setup at House of OTT Ravet`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#111420] via-transparent to-transparent opacity-80 lg:opacity-60" />
              
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/30 flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  Custom Decor Included
                </span>
              </div>
            </div>

            {/* Description & Perks */}
            <div className="p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider font-bold text-amber-400 mb-2">
                  Special Experience
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                  {currentOccasion.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-300 mb-6 leading-relaxed">
                  {currentOccasion.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-3 mb-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    What Makes It Special:
                  </div>
                  {currentOccasion.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-gray-200">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleBookOccasion(currentOccasion.title)}
                  className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none ${config.buttonClass}`}
                >
                  <span>Plan {currentOccasion.title.split(" ")[0]} Now</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <a
                  href="https://wa.me/919168530789?text=Hi%20House%20of%20OTT%20Ravet!%20I%20want%20to%20customize%20a%20celebration%20for%20my%20event."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-semibold text-xs text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 text-center transition-all focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
                >
                  Discuss Custom Theme
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
