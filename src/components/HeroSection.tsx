"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { Star, ShieldCheck, Video, MapPin, ArrowRight, Play, Utensils, Music, Sparkles, Check, X } from "lucide-react";

export function HeroSection() {
  const { config } = useTheme();
  const [showTeaser, setShowTeaser] = useState(false);

  return (
    <section 
      aria-labelledby="hero-heading" 
      className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-b from-[#07080B] via-[#0D0F17] to-[#07080B] border-b border-white/10"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-red-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Rating & Location Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md shadow-lg">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold text-gray-200">
            Ravet, Pune&apos;s Exclusive Private Cinema &amp; Lounge
          </span>
          <span className="text-gray-600" aria-hidden="true">|</span>
          <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400" aria-hidden="true" />
            <span>4.9 / 5 (580+ Google Reviews)</span>
          </div>
        </div>

        {/* Main H1 Headline */}
        <h1 
          id="hero-heading" 
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6"
        >
          Your Private Cinema. <br />
          <span className={`text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-amber-200`}>
            Your Personal Celebration.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8 font-normal leading-relaxed">
          Book private 4K laser theaters for <strong className="text-white font-semibold">Birthdays</strong>,{" "}
          <strong className="text-white font-semibold">Romantic Anniversaries</strong>,{" "}
          <strong className="text-white font-semibold">Proposals</strong> &amp;{" "}
          <strong className="text-white font-semibold">Movie Dates</strong> in Ravet, Pune. 
          Enjoy 150&quot;–200&quot; giant screens, 1200W Dolby Atmos sound, custom neon decor &amp; cloud fog entry.
        </p>

        {/* OTT Platforms Supported Ticker */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto mb-8 text-xs text-gray-400 font-medium">
          <span className="text-gray-500 uppercase tracking-wider text-[11px] font-bold">Stream On Big Screen:</span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white font-bold">NETFLIX 4K</span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white font-bold">PRIME VIDEO</span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white font-bold">HOTSTAR</span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white font-bold">YOUTUBE 4K</span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white font-bold">PS5 GAMING</span>
        </div>

        {/* Feature Badges Grid */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-4xl mx-auto mb-10 text-xs sm:text-sm text-gray-200">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <Video className="w-4 h-4 text-rose-400" aria-hidden="true" />
            <span>150&quot;–200&quot; 4K Laser Screens</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <Music className="w-4 h-4 text-amber-400" aria-hidden="true" />
            <span>1200W Dolby Atmos Audio</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-purple-400" aria-hidden="true" />
            <span>Cloud Fog &amp; Neon Sign Decor</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <Utensils className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span>Outside Food Allowed</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-cyan-400" aria-hidden="true" />
            <span>100% Privacy Guaranteed</span>
          </div>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
          <a
            href="#book"
            className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none ${config.buttonClass}`}
          >
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>Reserve Slot (Advance ₹750)</span>
            <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setShowTeaser(true)}
            className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold text-xs text-gray-200 bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
          >
            <Play className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
            <span>Watch Venue Atmosphere</span>
          </button>
        </div>

        {/* Location Notice Banner */}
        <div className="max-w-2xl mx-auto rounded-2xl bg-white/5 border border-white/10 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-left backdrop-blur-sm shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-amber-400" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-bold text-amber-400">
                Exclusive Pune Venue
              </div>
              <div className="text-sm font-semibold text-white">
                S.No. 215, Prime Ville, Plot No. 4, Sector 29, Ravet, Pune
              </div>
              <div className="text-xs text-gray-400">
                5 mins from Akurdi &amp; Kiwale • 10 mins from Wakad &amp; Hinjawadi IT Park
              </div>
            </div>
          </div>
          <a
            href="https://share.google/6g19LyHLut3CkEDbk"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/15 transition-all focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
          >
            Open in Google Maps →
          </a>
        </div>
      </div>

      {/* Atmosphere Preview Lightbox Modal */}
      {showTeaser && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-label="House of OTT Atmosphere Preview"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        >
          <div className="relative w-full max-w-3xl rounded-2xl bg-[#121520] border border-white/20 overflow-hidden p-6 text-left shadow-2xl">
            <button
              onClick={() => setShowTeaser(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-2">
              Inside House of OTT (Ravet, Pune)
            </h3>
            <p className="text-xs text-gray-300 mb-4">
              Real private cinema rooms with plush couple recliners, Dolby Atmos surround sound, and customized ambient celebration lighting.
            </p>

            <div className="relative h-80 w-full rounded-xl overflow-hidden mb-4 bg-black">
              <Image
                src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80"
                alt="House of OTT Private Theater Interior"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs text-amber-400 font-semibold">
                ★ 100% Sanitized &amp; Private • Air-Conditioned
              </div>
              <a
                href="#book"
                onClick={() => setShowTeaser(false)}
                className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wide font-bold ${config.buttonClass}`}
              >
                Book This Theater Now
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
