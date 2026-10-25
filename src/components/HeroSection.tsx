"use client";

import React from "react";
import { Star, ShieldCheck, Video, MapPin, ArrowRight, Play, Utensils, Music } from "lucide-react";

export function HeroSection() {
  return (
    <section 
      aria-labelledby="hero-heading" 
      className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Rating & Location Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-250 mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-600" aria-hidden="true" />
          <span className="text-xs font-medium text-slate-700">
            Ravet, Pune • Private Screening Venue
          </span>
          <span className="text-slate-300" aria-hidden="true">|</span>
          <div className="flex items-center gap-1 text-amber-700 text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" aria-hidden="true" />
            <span>4.9 / 5 (580+ Google Reviews)</span>
          </div>
        </div>

        {/* Main H1 Headline */}
        <h1 
          id="hero-heading" 
          className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight mb-5"
        >
          Your Private Cinema. <br />
          <span className="text-brand-red">Your Personal Celebration.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto mb-8 font-normal leading-relaxed">
          Book exclusive private mini-theaters for Birthdays, Anniversaries, Proposals, 
          and Movie Dates in Ravet, Pune. Enjoy 150&quot;–200&quot; 4K laser screens, 1200W Dolby Atmos sound, 
          comfortable recliner seating, and personalized celebration setups.
        </p>

        {/* Sober Feature Badges Grid */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-3xl mx-auto mb-10 text-xs font-medium text-slate-700">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-slate-200 shadow-xs">
            <Video className="w-4 h-4 text-brand-red" aria-hidden="true" />
            <span>150&quot;–200&quot; 4K Laser Screens</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-slate-200 shadow-xs">
            <Music className="w-4 h-4 text-amber-700" aria-hidden="true" />
            <span>1200W Dolby Atmos Audio</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-slate-200 shadow-xs">
            <Utensils className="w-4 h-4 text-emerald-700" aria-hidden="true" />
            <span>Outside Food Allowed</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-slate-200 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-blue-700" aria-hidden="true" />
            <span>100% Private Screening Rooms</span>
          </div>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-12">
          <a
            href="#book"
            className="w-full sm:w-auto px-7 py-3 rounded-lg font-semibold text-sm text-white bg-brand-red hover:bg-red-800 transition-colors shadow-sm flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
          >
            <span>Reserve Slot (Advance ₹750)</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>

          <a
            href="#theaters"
            className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-sm text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 transition-colors flex items-center justify-center gap-2 shadow-xs focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
          >
            <Play className="w-4 h-4 text-brand-red fill-brand-red" aria-hidden="true" />
            <span>View 3 Theater Rooms</span>
          </a>
        </div>

        {/* Location Notice Banner */}
        <div className="max-w-2xl mx-auto rounded-xl bg-white border border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-left shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-brand-red" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide font-semibold text-amber-800">
                Venue Location
              </div>
              <div className="text-sm font-semibold text-slate-900">
                S.No. 215, Prime Ville, Sector 29, Ravet, Pune
              </div>
              <div className="text-xs text-slate-600">
                5 mins from Akurdi &amp; Kiwale • 10 mins from Wakad &amp; Hinjawadi
              </div>
            </div>
          </div>
          <a
            href="https://share.google/6g19LyHLut3CkEDbk"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-3.5 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-800 border border-slate-250 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
          >
            Directions on Map →
          </a>
        </div>
      </div>
    </section>
  );
}
