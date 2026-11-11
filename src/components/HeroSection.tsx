"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Star, ShieldCheck, ArrowRight, Utensils, Music, Sparkles, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function HeroSection() {
  const { config } = useTheme();

  // Authentic photos from the Google Profile (https://share.google/aBG7gWmvFooTEkLFQ)
  const heroImages = [
    {
      src: "/images/venue/house-of-ott-anniversary-teddy-setup.jpg",
      label: "Anniversary Suite",
      alt: "Romantic Anniversary & Couple Setup at House of OTT Ravet"
    },
    {
      src: "/images/venue/house-of-ott-birthday-neon-setup.jpg",
      label: "Birthday Setup",
      alt: "Glowing Birthday Neon Setup at House of OTT Ravet"
    },
    {
      src: "/images/venue/house-of-ott-proposal-butterfly-setup.jpg",
      label: "VIP Grand Hall",
      alt: "VIP Grand Hall & Proposal Setup at House of OTT Ravet"
    },
    {
      src: "/images/venue/hero-cinema-setup.jpg",
      label: "Private Cinema",
      alt: "Private Cinema Screening Suite at House of OTT Ravet"
    }
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Auto-advance photos every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <section 
      aria-labelledby="hero-heading" 
      className="relative pt-8 pb-14 sm:pt-12 sm:pb-18 lg:pt-16 lg:pb-20 overflow-hidden bg-gradient-to-b from-[#06070A] via-[#0B0E17] to-[#06070A] border-b border-white/10"
    >
      {/* Dynamic ambient color glow according to theme */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* 1. IMAGES FIRST (Left Column on Desktop, Top on Mobile) */}
          <div className="lg:col-span-6 order-first relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 via-rose-500/15 to-amber-500/10 rounded-3xl blur-2xl opacity-75 pointer-events-none" />

            <div className="relative rounded-3xl overflow-hidden bg-[#0D101C] border border-white/15 p-2.5 sm:p-3 shadow-2xl shadow-black/80 ring-1 ring-white/10">
              {/* Main Photo Container */}
              <div className="relative h-[340px] sm:h-[420px] md:h-[460px] w-full rounded-2xl overflow-hidden bg-black shadow-inner group">
                <Image
                  src={heroImages[activeImageIndex].src}
                  alt={heroImages[activeImageIndex].alt}
                  fill
                  className="object-cover object-center transition-all duration-700 opacity-100"
                  priority
                />

                {/* Subtle top edge vignette */}
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

                {/* Floating Top Venue Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-amber-400/30 shadow-lg">
                    Real Photo • Sector 29, Ravet
                  </span>
                </div>

                {/* Floating Navigation Arrows */}
                <button
                  type="button"
                  onClick={prevImage}
                  aria-label="Previous photo"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/70 hover:bg-black text-white hover:text-amber-400 transition-colors border border-white/15 shadow-lg active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  aria-label="Next photo"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/70 hover:bg-black text-white hover:text-amber-400 transition-colors border border-white/15 shadow-lg active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Photo Switcher Thumbnail Pills */}
              <div className="grid grid-cols-4 gap-2 mt-2.5">
                {heroImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`py-1.5 px-1 rounded-xl text-[11px] font-semibold truncate transition-all border ${
                      activeImageIndex === idx
                        ? "bg-amber-400 text-black border-amber-400 shadow-md font-bold"
                        : "bg-white/5 hover:bg-white/10 text-gray-300 border-white/10"
                    }`}
                  >
                    {img.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 2. TEXT & ACTIONS (Right Column on Desktop, Below Image on Mobile) */}
          <div className="lg:col-span-6 text-left">
            {/* Authentic Google Review Tag */}
            <a
              href="https://share.google/aBG7gWmvFooTEkLFQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-amber-400/40 text-xs font-semibold text-gray-200 mb-4 backdrop-blur-md transition-all shadow-cinema-soft hover:shadow-cinema-hover group"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>4.9</span>
              </span>
              <span className="text-gray-300 font-medium">580+ Google Reviews</span>
              <span className="text-gray-600">•</span>
              <span className="text-amber-300/90 group-hover:text-amber-300">Ravet, Pune</span>
            </a>

            {/* Main Headline */}
            <h1 
              id="hero-heading" 
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] mb-3.5 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
            >
              Your Private Cinema. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-300 to-amber-200">
                Made For Celebrations.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-gray-300 max-w-xl font-normal leading-relaxed mb-5">
              Pune&apos;s premier private theater lounge in Ravet. Celebrate birthdays, anniversaries, and romantic dates in 100% soundproof luxury.
            </p>

            {/* Key Value Badges */}
            <div className="grid grid-cols-2 gap-2 mb-6 text-xs text-gray-200">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 shadow-cinema-soft">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Private Theater</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 shadow-cinema-soft">
                <Utensils className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Outside Food Allowed</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 shadow-cinema-soft">
                <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Neon &amp; Balloon Decor</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 shadow-cinema-soft">
                <Music className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Dolby Atmos Sound</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#events"
                className={`py-3.5 px-7 rounded-xl font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-95 ${config.buttonClass}`}
              >
                <span>Explore Celebrations</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/919168530789?text=Hi%20House%20of%20OTT%20Ravet!%20I%20would%20like%20to%20know%20more%20about%20booking%20a%20private%20theater."
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-xl font-semibold text-xs text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 shadow-cinema-soft hover:shadow-cinema-hover flex items-center justify-center gap-2 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}