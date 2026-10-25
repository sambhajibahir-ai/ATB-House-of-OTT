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
        return <Cake className="w-5 h-5" />;
      case "Heart":
        return <Heart className="w-5 h-5" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5" />;
      case "PartyPopper":
        return <PartyPopper className="w-5 h-5" />;
      case "Tv":
        return <Tv className="w-5 h-5" />;
      case "Smile":
      default:
        return <Smile className="w-5 h-5" />;
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
    <section id="occasions" className="py-20 relative bg-[#0c0e14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Celebrate Every Milestone</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Custom Celebrations & Experiences
          </h2>
          <p className="text-base sm:text-lg text-gray-400">
            From fairytale candlelight proposals to high-voltage birthday bashes, 
            we transform our private theater into a personalized wonderland just for you.
          </p>
        </div>

        {/* Occasion Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {OCCASIONS.map((occ) => {
            const isActive = activeTab === occ.id;
            return (
              <button
                key={occ.id}
                onClick={() => setActiveTab(occ.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                  isActive
                    ? "bg-brand-red text-white shadow-lg shadow-brand-red/30 scale-105"
                    : "bg-surface-card text-gray-400 hover:text-white hover:bg-white/5 border border-white/5"
                }`}
              >
                {getIcon(occ.icon)}
                <span>{occ.title.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Occasion Showcase Card */}
        <div className="rounded-3xl bg-surface-card border border-white/10 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Visual Image */}
            <div className="relative h-72 sm:h-96 lg:h-full min-h-[340px]">
              <Image
                src={currentOccasion.image}
                alt={`${currentOccasion.title} at House of OTT Ravet`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-surface-card via-transparent to-transparent opacity-80 lg:opacity-60" />
              
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-brand-gold border border-brand-gold/30 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Custom Decor Included
                </span>
              </div>
            </div>

            {/* Description & Perks */}
            <div className="p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider font-bold text-brand-crimson mb-2">
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
                      <div className="w-5 h-5 rounded-full bg-brand-red/20 text-brand-crimson flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => handleBookOccasion(currentOccasion.title)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-brand-red to-brand-crimson text-white hover:opacity-95 shadow-lg shadow-brand-red/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>Plan {currentOccasion.title.split(" ")[0]} Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="https://wa.me/919168530789?text=Hi%20House%20of%20OTT%20Ravet!%20I%20want%20to%20customize%20a%20celebration%20for%20my%20event."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-semibold text-xs text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 text-center transition-all"
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
