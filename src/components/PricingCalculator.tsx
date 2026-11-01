"use client";

import React, { useState } from "react";
import { THEATERS } from "@/data/theaters";
import { ADDONS } from "@/data/addons";
import { useTheme } from "@/context/ThemeContext";
import { Calculator, Check, ArrowRight } from "lucide-react";

export function PricingCalculator() {
  const { config } = useTheme();
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
    <section id="pricing" aria-labelledby="pricing-heading" className="py-20 relative bg-[#090C12] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider mb-4 text-amber-400">
            <Calculator className="w-3.5 h-3.5" aria-hidden="true" />
            <span>100% Transparent Pricing</span>
          </div>
          <h2 id="pricing-heading" className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Interactive Price Estimator
          </h2>
          <p className="text-base sm:text-lg text-gray-300">
            No surprises, no hidden convenience fees. Calculate your total cost in real-time 
            based on your group size, theater choice, and celebration add-ons.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Select Theater */}
            <fieldset className="p-6 rounded-2xl bg-[#111420] border border-white/10 shadow-xl">
              <legend className="text-xs font-bold uppercase tracking-wider text-gray-300 px-1 mb-3">
                1. Select Theater Room
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {THEATERS.map((t) => {
                  const isSelected = t.id === theaterId;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => {
                        setTheaterId(t.id);
                        if (guests < t.baseCapacity) setGuests(t.baseCapacity);
                        if (guests > t.maxCapacity) setGuests(t.maxCapacity);
                      }}
                      className={`p-3.5 rounded-xl text-left border transition-all focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
                        isSelected
                          ? "bg-white/15 border-amber-400 text-white ring-1 ring-amber-400/40"
                          : "bg-white/5 border-white/5 text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      <div className="text-xs font-bold">{t.name}</div>
                      <div className="text-[11px] text-amber-400 font-semibold mt-1">₹{t.basePrice} (3 hrs)</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{t.capacityText}</div>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Step 2: Number of Guests */}
            <div className="p-6 rounded-2xl bg-[#111420] border border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="guest-range" className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  2. Total Guests (Including Host)
                </label>
                <span className="text-sm font-extrabold text-white px-3 py-1 rounded-lg bg-white/15 border border-white/20">
                  {guests} Persons
                </span>
              </div>
              <input
                id="guest-range"
                type="range"
                min={currentTheater.baseCapacity}
                max={currentTheater.maxCapacity}
                value={guests}
                aria-valuemin={currentTheater.baseCapacity}
                aria-valuemax={currentTheater.maxCapacity}
                aria-valuenow={guests}
                aria-valuetext={`${guests} people`}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-2">
                <span>Base includes {currentTheater.baseCapacity} persons</span>
                <span>Max {currentTheater.maxCapacity} persons</span>
              </div>
            </div>

            {/* Step 3: Add-ons quick pick */}
            <fieldset className="p-6 rounded-2xl bg-[#111420] border border-white/10 shadow-xl">
              <legend className="text-xs font-bold uppercase tracking-wider text-gray-300 px-1 mb-3">
                3. Customize Add-ons &amp; Surprises
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ADDONS.slice(0, 8).map((addon) => {
                  const isChecked = selectedAddonIds.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      role="checkbox"
                      aria-checked={isChecked}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between gap-2 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
                        isChecked
                          ? "bg-white/15 border-amber-400/60 text-white"
                          : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                            isChecked
                              ? "bg-amber-500 border-amber-500 text-slate-950 font-bold"
                              : "border-gray-600 bg-white/5"
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" aria-hidden="true" />}
                        </div>
                        <span className="text-xs font-medium truncate">{addon.name}</span>
                      </div>
                      <span className="text-xs font-bold text-gray-200 shrink-0">
                        +₹{addon.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>

          {/* Price Summary Breakdown Column */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="rounded-3xl bg-[#121522] border-2 border-white/15 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Live Cost Estimate
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {currentTheater.name}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-400/10 text-amber-300 border border-amber-400/20">
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
                  Includes 3 full hours, private AC theater, Dolby Atmos &amp; standard ambient decor
                </div>
              </div>

              {/* Advance Token Highlight */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-6 text-xs">
                <div className="flex items-center justify-between font-bold text-emerald-400 mb-1">
                  <span>Advance Token to Lock Slot:</span>
                  <span className="text-sm">₹{advanceToken}</span>
                </div>
                <div className="flex items-center justify-between text-gray-300 text-[11px]">
                  <span>Balance payable at Ravet venue:</span>
                  <span>₹{venueBalance}</span>
                </div>
              </div>

              <a
                href="#book"
                className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none ${config.buttonClass}`}
              >
                <span>Proceed to Book This Setup</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
