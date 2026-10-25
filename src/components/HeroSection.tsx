"use client";

import React from "react";
import { Sparkles, Star, ShieldCheck, Video, MapPin, ArrowRight, Play, Utensils, Music } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Glows & Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-red/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-brand-amber/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Location & Rating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 hover:border-brand-red/40 transition-colors">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-crimson opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
          </span>
          <span className="text-xs font-semibold text-gray-200">
            Ravet, Pune&apos;s Most Loved Private Screening Lounge
          </span>
          <span className="text-gray-500">|</span>
          <div className="flex items-center gap-1 text-brand-gold text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-brand-gold" />
            <span>4.9/5 (580+ Google Reviews)</span>
          </div>
        </div>

        {/* Main H1 Headline for SEO & Conversion */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6">
          Your Private Cinema. <br />
          <span className="text-gradient-red">Your Ultimate Celebration.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8 font-normal leading-relaxed">
          Book private 4K laser theaters for <span className="text-white font-medium">Birthdays</span>,{" "}
          <span className="text-white font-medium">Romantic Anniversaries</span>,{" "}
          <span className="text-white font-medium">Proposals</span> &{" "}
          <span className="text-white font-medium">Movie Dates</span> in Ravet, Pune. 
          Enjoy 150&quot;–200&quot; giant screens, 1200W Dolby Atmos sound, custom neon decor & cloud fog entry!
        </p>

        {/* Feature Badges Grid */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto mb-10 text-xs sm:text-sm text-gray-300">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-card border border-white/10">
            <Video className="w-4 h-4 text-brand-crimson" />
            <span>150&quot;–200&quot; 4K Laser Screens</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-card border border-white/10">
            <Music className="w-4 h-4 text-brand-gold" />
            <span>1200W Dolby Atmos Audio</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-card border border-white/10">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Cloud Fog & Neon Decor</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-card border border-white/10">
            <Utensils className="w-4 h-4 text-emerald-400" />
            <span>Outside Food Allowed</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-card border border-white/10">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>100% Privacy Guaranteed</span>
          </div>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
          <a
            href="#book"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-brand-red to-brand-crimson hover:from-red-600 hover:to-brand-red shadow-xl shadow-brand-red/30 hover:shadow-brand-red/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Reserve Slot (Advance ₹750)</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <a
            href="#theaters"
            className="w-full sm:w-auto px-7 py-4 rounded-xl font-semibold text-sm text-gray-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 text-brand-crimson fill-brand-crimson" />
            <span>Explore 3 Theaters</span>
          </a>
        </div>

        {/* Location Prompt Banner */}
        <div className="max-w-2xl mx-auto rounded-2xl bg-gradient-to-r from-brand-red/10 via-surface-card to-brand-amber/10 border border-white/10 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-red/20 border border-brand-red/30 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-brand-crimson" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-bold text-brand-gold">
                Exclusive Pune Venue
              </div>
              <div className="text-sm font-semibold text-white">
                Sector 29, Prime Ville, Ravet, Pune
              </div>
              <div className="text-xs text-gray-400">
                5 mins from Akurdi & Kiwale | 10 mins from Wakad & Hinjawadi
              </div>
            </div>
          </div>
          <a
            href="https://share.google/6g19LyHLut3CkEDbk"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white border border-white/15 transition-all"
          >
            Open in Google Maps →
          </a>
        </div>
      </div>
    </section>
  );
}
