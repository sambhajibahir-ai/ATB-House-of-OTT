"use client";

import React, { useState } from "react";
import { THEATERS } from "@/data/theaters";
import { ADDONS } from "@/data/addons";
import { Check, ArrowRight } from "lucide-react";

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
    <section id="pricing" aria-labelledby="pricing-heading" className="py-20 relative bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">
            Transparent Pricing
          </div>
          <h2 id="pricing-heading" className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Calculate Event Cost
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            No hidden service fees or convenience charges. Calculate your total rate based on group size, 
            theater room, and custom celebration add-ons.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-5">
            {/* 1. Theater Selection */}
            <fieldset className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <legend className="text-xs font-semibold uppercase tracking-wide text-slate-800 px-1 mb-3">
                1. Select Theater Room
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
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
                      className={`p-3 rounded-lg text-left border transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none ${
                        isSelected
                          ? "bg-red-50/80 border-brand-red text-slate-900 ring-1 ring-brand-red/30"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">{t.name}</div>
                      <div className="text-xs text-brand-red font-semibold mt-0.5">₹{t.basePrice} (3 hrs)</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{t.capacityText}</div>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* 2. Guest Slider */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="guest-slider" className="text-xs font-semibold uppercase tracking-wide text-slate-800">
                  2. Total Guests (Including Host)
                </label>
                <span className="text-xs font-bold text-slate-900 px-2.5 py-1 rounded bg-slate-100 border border-slate-200">
                  {guests} Persons
                </span>
              </div>
              <input
                id="guest-slider"
                type="range"
                min={currentTheater.baseCapacity}
                max={currentTheater.maxCapacity}
                value={guests}
                aria-valuemin={currentTheater.baseCapacity}
                aria-valuemax={currentTheater.maxCapacity}
                aria-valuenow={guests}
                aria-valuetext={`${guests} people`}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full accent-brand-red cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-900"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>Base includes {currentTheater.baseCapacity} pax</span>
                <span>Maximum {currentTheater.maxCapacity} pax</span>
              </div>
            </div>

            {/* 3. Addons Toggle */}
            <fieldset className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <legend className="text-xs font-semibold uppercase tracking-wide text-slate-800 px-1 mb-3">
                3. Choose Celebration Add-ons
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ADDONS.slice(0, 8).map((addon) => {
                  const isChecked = selectedAddonIds.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      role="checkbox"
                      aria-checked={isChecked}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-2.5 rounded-lg border text-left transition-colors flex items-center justify-between gap-2 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none ${
                        isChecked
                          ? "bg-red-50/70 border-brand-red text-slate-900"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                            isChecked
                              ? "bg-brand-red border-brand-red text-white"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" aria-hidden="true" />}
                        </div>
                        <span className="text-xs font-medium truncate">{addon.name}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-800 shrink-0">
                        +₹{addon.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>

          {/* Price Summary Breakdown */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Estimated Cost
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {currentTheater.name}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  3 Hours
                </span>
              </div>

              {/* Itemized lines */}
              <div className="space-y-2.5 text-xs mb-5">
                <div className="flex justify-between text-slate-600">
                  <span>Base Rent (up to {currentTheater.baseCapacity} guests)</span>
                  <span className="font-semibold text-slate-900">₹{currentTheater.basePrice}</span>
                </div>

                {extraGuests > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>
                      {extraGuests} Extra Guest{extraGuests > 1 ? "s" : ""} (@ ₹{currentTheater.extraPersonPrice}/pax)
                    </span>
                    <span className="font-semibold text-slate-900">₹{extraGuestsCost}</span>
                  </div>
                )}

                {addonsCost > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Add-ons ({selectedAddonIds.length} items)</span>
                    <span className="font-semibold text-slate-900">₹{addonsCost}</span>
                  </div>
                )}
              </div>

              {/* Total Price Block */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-5">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs text-slate-500 font-semibold uppercase">Total Event Cost</span>
                  <span className="text-2xl font-bold text-slate-900">
                    ₹{totalCost}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  Includes 3 full hours, air conditioning, Dolby sound &amp; ambient decor.
                </div>
              </div>

              {/* Advance Token Highlight */}
              <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 mb-5 text-xs">
                <div className="flex items-center justify-between font-semibold text-emerald-900 mb-0.5">
                  <span>Advance Token to Lock Slot:</span>
                  <span className="text-sm font-bold">₹{advanceToken}</span>
                </div>
                <div className="flex items-center justify-between text-emerald-800">
                  <span>Balance payable at Ravet venue:</span>
                  <span>₹{venueBalance}</span>
                </div>
              </div>

              <a
                href="#book"
                className="w-full py-3 rounded-lg font-semibold text-xs tracking-wide text-white bg-brand-red hover:bg-red-800 transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
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
