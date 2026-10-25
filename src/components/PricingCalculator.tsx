"use client";

import React, { useState } from "react";
import { THEATERS } from "@/data/theaters";
import { ADDONS } from "@/data/addons";
import { Calculator, Sparkles, Check, ArrowRight } from "lucide-react";

export function PricingCalculator() {
  const [theaterId, setTheaterId] = useState<string>("cinema-suite");
  const [guests, setGuests] = useState<number>(2);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([
    "effect-fog-entry",
    "cake-choc-truffle",
  ]);

  const currentTheater = THEATERS.find((t) => t.id === theaterId) || THEATERS[0];

  const baseCapacity = currentTheater.baseCapacity;
  const extraGuests = Math.max(0, guests - baseCapacity);
  const extraGuestsCost = extraGuests * currentTheater.extraPersonPrice;

  const addonsCost = selectedAddonIds.reduce((sum, id) => {
    const item = ADDONS.find((a) => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const totalCost = currentTheater.basePrice + extraGuestsCost + addonsCost;
  const advanceToken = 750;
  const venueBalance = totalCost - advanceToken;

  const toggleAddon = (id: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="pricing" className="py-20 relative bg-[#090b10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>100% Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Interactive Price Estimator
          </h2>
          <p className="text-base sm:text-lg text-gray-400">
            No surprises, no hidden convenience fees. Calculate your total cost in real-time 
            based on your group size, theater choice, and celebration add-ons.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Select Theater */}
            <div className="p-6 rounded-2xl bg-surface-card border border-white/10">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-3">
                1. Select Theater Room
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {THEATERS.map((t) => {
                  const isSelected = t.id === theaterId;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheaterId(t.id);
                        if (guests < t.baseCapacity) setGuests(t.baseCapacity);
                        if (guests > t.maxCapacity) setGuests(t.maxCapacity);
                      }}
                      className={`p-3.5 rounded-xl text-left border transition-all ${
                        isSelected
                          ? "bg-brand-red/15 border-brand-red text-white"
                          : "bg-white/5 border-white/5 text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      <div className="text-xs font-bold">{t.name.split(" ")[1]} {t.name.split(" ")[2] || ""}</div>
                      <div className="text-[11px] text-gray-400 mt-1">₹{t.basePrice} (3 hrs)</div>
                      <div className="text-[10px] text-brand-gold mt-0.5">{t.capacityText}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Number of Guests */}
            <div className="p-6 rounded-2xl bg-surface-card border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  2. Total Guests (Including Host)
                </label>
                <span className="text-sm font-extrabold text-white px-3 py-1 rounded-lg bg-brand-red/20 border border-brand-red/30">
                  {guests} Persons
                </span>
              </div>
              <input
                type="range"
                min={currentTheater.baseCapacity}
                max={currentTheater.maxCapacity}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full accent-brand-red cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-2">
                <span>Base includes {currentTheater.baseCapacity} persons</span>
                <span>Max {currentTheater.maxCapacity} persons</span>
              </div>
            </div>

            {/* Step 3: Add-ons quick pick */}
            <div className="p-6 rounded-2xl bg-surface-card border border-white/10">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-3">
                3. Customize Add-ons & Surprises
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ADDONS.slice(0, 8).map((addon) => {
                  const isChecked = selectedAddonIds.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-2 ${
                        isChecked
                          ? "bg-brand-red/10 border-brand-red/40 text-white"
                          : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                            isChecked
                              ? "bg-brand-red border-brand-red text-white"
                              : "border-gray-500"
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-medium truncate">{addon.name}</span>
                      </div>
                      <span className="text-xs font-bold text-gray-200 shrink-0">
                        +₹{addon.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Price Summary Breakdown Column (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="rounded-3xl bg-surface-card border-2 border-brand-red/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Live Cost Estimate
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {currentTheater.name}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
                  3 Hours Slot
                </span>
              </div>

              {/* Itemized lines */}
              <div className="space-y-3 text-xs mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Theater Base Rent (Up to {currentTheater.baseCapacity} guests)</span>
                  <span className="font-semibold text-white">₹{currentTheater.basePrice}</span>
                </div>

                {extraGuests > 0 && (
                  <div className="flex justify-between text-gray-300">
                    <span>
                      {extraGuests} Extra Guest{extraGuests > 1 ? "s" : ""} (@ ₹{currentTheater.extraPersonPrice}/person)
                    </span>
                    <span className="font-semibold text-white">₹{extraGuestsCost}</span>
                  </div>
                )}

                {addonsCost > 0 && (
                  <div className="flex justify-between text-gray-300">
                    <span>Selected Add-ons ({selectedAddonIds.length} items)</span>
                    <span className="font-semibold text-white">₹{addonsCost}</span>
                  </div>
                )}
              </div>

              {/* Total Price Block */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs text-gray-400 uppercase font-semibold">Total Event Cost</span>
                  <span className="text-3xl font-extrabold text-white">
                    ₹{totalCost}
                  </span>
                </div>
                <div className="text-[11px] text-gray-400">
                  Includes 3 full hours, private AC theater, Dolby Atmos & standard ambient decor
                </div>
              </div>

              {/* Advance Token Highlight */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-400 mb-1">
                  <span>Advance Token to Lock Slot:</span>
                  <span className="text-sm">₹{advanceToken}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-300">
                  <span>Balance payable at Ravet venue:</span>
                  <span>₹{venueBalance}</span>
                </div>
              </div>

              <a
                href="#book"
                className="w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-brand-red to-brand-crimson hover:opacity-95 shadow-lg shadow-brand-red/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Book This Setup</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
