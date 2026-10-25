"use client";

import React, { useState } from "react";
import { ADDONS } from "@/data/addons";
import { Sparkles, Cake, Camera, Utensils, Heart, Plus, Check } from "lucide-react";

interface AddonsSectionProps {
  onToggleAddon?: (addonId: string) => void;
}

export function AddonsSection({ onToggleAddon }: AddonsSectionProps) {
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
    <section id="addons" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-crimson/10 border border-brand-crimson/20 text-brand-crimson text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customize Your Party</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Add-ons, Cakes & Special Effects
          </h2>
          <p className="text-base sm:text-lg text-gray-400">
            Elevate your celebration with signature cinematic fog entry, fresh bakery cakes, 
            LED romantic pathways, and professional HD photography.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isActive = filter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                  isActive
                    ? "bg-white text-black font-bold shadow-md"
                    : "bg-surface-card text-gray-400 hover:text-white hover:bg-white/5 border border-white/5"
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
              className="rounded-2xl bg-surface-card border border-white/10 p-6 flex flex-col justify-between hover:border-brand-crimson/40 transition-all group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-base font-bold text-white group-hover:text-brand-crimson transition-colors">
                    {addon.name}
                  </h3>
                  {addon.popular && (
                    <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-brand-red/20 text-brand-crimson border border-brand-red/30">
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
                  <div className="text-[10px] text-gray-400 uppercase font-semibold">Price</div>
                  <div className="text-xl font-extrabold text-white">
                    ₹{addon.price}
                  </div>
                </div>

                <button
                  onClick={() => handleSelectAddon(addon.id)}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-brand-red text-xs font-bold text-white border border-white/10 hover:border-brand-red transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Booking</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
