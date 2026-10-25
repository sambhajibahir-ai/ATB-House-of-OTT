"use client";

import React, { useState } from "react";
import { ADDONS } from "@/data/addons";
import { Cake, Camera, Utensils, Heart, Sparkles, Plus } from "lucide-react";

interface AddonsSectionProps {
  onToggleAddon?: (addonId: string) => void;
}

export function AddonsSection({ onToggleAddon }: AddonsSectionProps) {
  const [filter, setFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Items" },
    { id: "cake", label: "Cakes", icon: Cake },
    { id: "effect", label: "Special Effects", icon: Sparkles },
    { id: "decor", label: "Decor & Flowers", icon: Heart },
    { id: "photo", label: "Photoshoot", icon: Camera },
    { id: "food", label: "Snacks Menu", icon: Utensils },
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
    <section id="addons" aria-labelledby="addons-heading" className="py-20 relative bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">
            Add-ons &amp; Surprises
          </div>
          <h2 id="addons-heading" className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Custom Add-ons &amp; Cakes
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Enhance your celebration with fresh bakery cakes, cinematic fog entry, 
            romantic LED candle pathways, and HD photography.
          </p>
        </div>

        {/* Category Filters */}
        <div 
          role="group" 
          aria-label="Filter Add-ons by Category"
          className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar"
        >
          {categories.map((cat) => {
            const isActive = filter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setFilter(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Addons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAddons.map((addon) => (
            <div
              key={addon.id}
              className="rounded-xl bg-white border border-slate-200 p-5 flex flex-col justify-between hover:border-slate-300 shadow-xs hover:shadow-sm transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {addon.name}
                  </h3>
                  {addon.popular && (
                    <span className="shrink-0 px-2 py-0.5 rounded text-[11px] font-semibold bg-red-50 text-brand-red border border-red-200">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  {addon.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Price</div>
                  <div className="text-lg font-bold text-slate-900">
                    ₹{addon.price}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectAddon(addon.id)}
                  aria-label={`Add ${addon.name} for ₹${addon.price}`}
                  className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-brand-red text-xs font-semibold text-slate-800 hover:text-white border border-slate-200 hover:border-brand-red transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
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
