"use client";

import React from "react";
import Image from "next/image";
import { Wind, Cake, Camera, Check, ArrowRight, Gift } from "lucide-react";

interface PromotionalOffersSectionProps {
  onSelectOffer?: (addonId: string) => void;
}

export function PromotionalOffersSection({ onSelectOffer }: PromotionalOffersSectionProps) {
  const offers = [
    {
      id: "fog-entry",
      addonId: "effect-fog-entry",
      title: "Fairytale Cloud Fog Entry",
      tag: "Signature Entry",
      icon: <Wind className="w-5 h-5 text-cyan-400" />,
      image: "/images/venue/cloud-fog-entrance-real.jpg",
      highlights: [
        "100% odorless low-lying smoke effect",
        "Synchronized entrance spotlight"
      ]
    },
    {
      id: "cake-pyro",
      addonId: "cake-choc-truffle",
      title: "Truffle Cake & Cold Pyro",
      tag: "Cake & Sparklers",
      icon: <Cake className="w-5 h-5 text-rose-400" />,
      image: "/images/venue/cold-pyro-cake-celebration.jpg",
      highlights: [
        "Fresh Belgian Chocolate Truffle cake (0.5kg)",
        "Pair of safe indoor cold pyro sparkler guns"
      ]
    },
    {
      id: "photo-reel",
      addonId: "photo-reel",
      title: "Instagram Reel & Photos",
      tag: "Photography",
      icon: <Camera className="w-5 h-5 text-amber-400" />,
      image: "/images/venue/real-photographer-reel.jpg",
      highlights: [
        "1 Edited 4K Instagram celebration reel",
        "25+ Color graded HD digital photos"
      ]
    }
  ];

  const handleClaimOffer = (addonId: string) => {
    if (onSelectOffer) {
      onSelectOffer(addonId);
    }
    const bookElem = document.getElementById("book");
    if (bookElem) {
      bookElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="highlights"
      aria-labelledby="offers-heading" 
      className="py-14 sm:py-18 relative bg-gradient-to-b from-[#06070A] via-[#090C14] to-[#06070A] border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider mb-3 text-amber-400 shadow-cinema-soft">
            <Gift className="w-3.5 h-3.5" />
            <span>Celebration Add-ons</span>
          </div>
          <h2 id="offers-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            Special Effects &amp; Upgrades
          </h2>
          <p className="text-sm text-gray-300">
            Popular add-ons to elevate your celebration at House of OTT.
          </p>
        </div>

        {/* 3 Simple Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="rounded-3xl overflow-hidden bg-[#0D101C] border border-white/10 hover:border-amber-400/30 transition-all duration-300 flex flex-col shadow-cinema-soft hover:shadow-cinema-hover ring-1 ring-white/5 group"
            >
              {/* Offer Image Header */}
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-black">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D101C] via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-semibold bg-black/80 backdrop-blur-md text-gray-200 border border-white/20 shadow-md">
                    {offer.tag}
                  </span>
                </div>
              </div>

              {/* Offer Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 shadow-inner">
                      {offer.icon}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {offer.title}
                    </h3>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1.5 mb-4 text-xs text-gray-200">
                    {offer.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleClaimOffer(offer.addonId)}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-white/10 group-hover:border-amber-400/30 min-h-[44px]"
                >
                  <span>Include in Booking</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}