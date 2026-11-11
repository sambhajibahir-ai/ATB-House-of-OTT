"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MessageCircle, Menu, X, MapPin, Film } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function Header() {
  const { config } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      role="banner"
      className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#07080B]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-xl"
          : "bg-[#07080B]/80 backdrop-blur-sm border-b border-white/5 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Venue Location */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="House of OTT - Home"
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-slate-950 font-bold transition-transform group-hover:scale-105 shadow-md ${config.buttonClass}`}>
              <Film className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white block leading-none">
                HOUSE OF <span className={config.accentText}>OTT</span>
              </span>
              <span className="text-[11px] text-gray-400 flex items-center gap-1 mt-1 font-medium">
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>Sector 29, Ravet, Pune</span>
              </span>
            </div>
          </Link>

          {/* Simple Desktop Nav */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6">
            <Link
              href="/#events"
              className="text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white transition-colors"
            >
              Celebrations
            </Link>
            <Link
              href="/#venue-gallery"
              className="text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white transition-colors"
            >
              Photos
            </Link>
            <Link
              href="/#highlights"
              className="text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white transition-colors"
            >
              Upgrades
            </Link>
            <Link
              href="/#location"
              className="text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white transition-colors"
            >
              Location
            </Link>
            <Link
              href="/reviews"
              className="text-xs font-semibold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              <span>Reviews</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">4.9★</span>
            </Link>
          </nav>

          {/* Right Direct Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/919168530789?text=Hi%20House%20of%20OTT%20Ravet!%20I%20would%20like%20to%20inquire%20about%20booking%20a%20private%20theater."
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            <a
              href="#book"
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md ${config.buttonClass}`}
            >
              Reserve Slot
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-white/5 text-gray-200 border border-white/10 focus:outline-none"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10 pb-3 animate-fade-in space-y-3">
            <nav className="flex flex-col gap-1.5">
              <Link
                href="/#events"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 min-h-[44px] flex items-center rounded-xl text-sm font-medium text-gray-200 hover:bg-white/5"
              >
                Celebrations
              </Link>
              <Link
                href="/#venue-gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 min-h-[44px] flex items-center rounded-xl text-sm font-medium text-gray-200 hover:bg-white/5"
              >
                Venue Photos
              </Link>
              <Link
                href="/#highlights"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 min-h-[44px] flex items-center rounded-xl text-sm font-medium text-gray-200 hover:bg-white/5"
              >
                Upgrades
              </Link>
              <Link
                href="/#location"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 min-h-[44px] flex items-center rounded-xl text-sm font-medium text-gray-200 hover:bg-white/5"
              >
                Location &amp; Directions
              </Link>
              <Link
                href="/reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 min-h-[44px] flex items-center justify-between rounded-xl text-sm font-medium text-amber-400 hover:bg-white/5"
              >
                <span>Write a Google Review</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300">4.9★</span>
              </Link>
            </nav>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
              <a
                href="tel:+919168530789"
                className="py-2.5 rounded-xl bg-white/5 text-gray-200 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Venue</span>
              </a>
              <a
                href="https://wa.me/919168530789?text=Hi%20House%20of%20OTT%20Ravet!%20I%20want%20to%20book%20a%20private%20theater."
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            <a
              href="#book"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center text-center ${config.buttonClass}`}
            >
              Reserve Your Slot
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
