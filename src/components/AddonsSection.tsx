"use client";

import React, { useState } from "react";
import { ADDONS } from "@/data/addons";
import { useTheme } from "@/context/ThemeContext";
import { Cake, Camera, Utensils, Heart, Sparkles, Plus } from "lucide-react";

interface AddonsSectionProps {
  onToggleAddon?: (addonId: string) => void;
}

export function AddonsSection({ onToggleAddon }: AddonsSectionProps) {
  const { config } = useTheme();
  const [filter, setFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Add-ons" },
    { id: "cake", label: "Cakes & Sweets", icon: Cake },
    { id: "effect", label: "Fog & Surprises", icon: Sparkles },
    { id: "decor", label: "Decor & Roses", icon: Heart },
    { id: "photo", label: "Photography", icon: Camera },
    { id: "food", label: "Snacks & Food", icon: Utensils },
  ];

  const filteredAddons = filter === "all" 
    ? ADDONS 
    : ADDONS.filter((item) => item.category === filter);

  const handleSelectAddon = (addonId: string) => {
    if (onToggleAddon) {
      onToggleAddon(addonId);
    }
    const bookElem = document.getElementById("book");
    if (bookElem) {
      bookElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="addons" aria-labelledby="addons-heading" className="py-20 relative bg-[#07080B] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider mb-4 text-amber-400">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Customize Your Party</span>
          </div>
          <h2 id="addons-heading" className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Add-ons, Cakes &amp; Special Effects
          </h2>
          <p className="text-base sm:text-lg text-gray-300">
            Elevate your celebration with signature cinematic fog entry, fresh bakery cakes, 
            LED romantic pathways, and professional HD photography.
          </p>
        </div>

        {/* Category Filters */}
        <div 
          role="group" 
          aria-label="Filter Add-ons by Category"
          className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar"
        >
          {categories.map((cat) => {
            const isActive = filter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
                  isActive
                    ? "bg-white text-slate-950 font-bold shadow-md scale-105"
                    : "bg-[#111420] text-gray-400 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Addons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAddons.map((addon) => (
            <div
              key={addon.id}
              className="rounded-2xl bg-[#10131E] border border-white/10 p-6 flex flex-col justify-between hover:border-white/25 transition-all group shadow-lg"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {addon.name}
                  </h3>
                  {addon.popular && (
                    <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-400/10 text-amber-300 border border-amber-400/30">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  {addon.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase font-semibold">Price</div>
                  <div className="text-xl font-extrabold text-white">
                    ₹{addon.price}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectAddon(addon.id)}
                  aria-label={`Add ${addon.name} for ₹${addon.price}`}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/10 transition-all flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
                >
                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Add to Slot</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
