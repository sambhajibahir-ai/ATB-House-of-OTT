"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { Phone, MessageCircle, Menu, X, MapPin, Film, Sparkles } from "lucide-react";

export function Header() {
  const { theme, config } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Theaters", href: "#theaters" },
    { label: "Occasions", href: "#occasions" },
    { label: "Add-ons & Cakes", href: "#addons" },
    { label: "Pricing Calculator", href: "#pricing" },
    { label: "Photo Gallery", href: "#gallery" },
    { label: "Reviews", href: "#reviews" },
    { label: "Ravet Venue", href: "#location" },
    { label: "FAQs", href: "#faq" },
  ];

  return (
    <header
      role="banner"
      className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#07080B]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl"
          : "bg-[#07080B]/80 backdrop-blur-sm border-b border-white/5 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none p-1 group"
            aria-label="House of OTT - Home"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-slate-950 font-bold transition-transform group-hover:scale-105 shadow-md ${config.buttonClass}`}>
              <Film className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                  HOUSE OF <span className={config.accentText}>OTT</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-white/10 text-gray-300 border border-white/10">
                  Ravet, Pune
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
                <span>Sector 29, Ravet</span>
                <span className="text-gray-600" aria-hidden="true">•</span>
                <span className="text-emerald-400 font-semibold">Open 10 AM – 3 AM</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none rounded px-2 py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/919168530789?text=Hi%20House%20of%20OTT%20Ravet!%20I%20want%20to%20inquire%20about%20booking%20a%20private%20theater."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact us on WhatsApp at +91 91685 30789"
              className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all flex items-center gap-1.5 text-xs font-semibold focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>

            <a
              href="tel:+919168530789"
              aria-label="Call +91 91685 30789"
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 transition-all flex items-center gap-1.5 text-xs font-semibold focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
            >
              <Phone className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span>+91 91685 30789</span>
            </a>

            <a
              href="#book"
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none ${config.buttonClass}`}
            >
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Book Slot (₹750)</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href="#book"
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${config.buttonClass}`}
            >
              Book
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/10 text-gray-200 hover:text-white focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile Navigation"
          className="lg:hidden bg-[#0e111a] border-b border-white/10 px-4 pt-3 pb-6 mt-2 space-y-3 shadow-2xl"
        >
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
            <a
              href="tel:+919168530789"
              className="flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 text-gray-200 text-xs font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
              Call Venue
            </a>
            <a
              href="https://wa.me/919168530789?text=Hi%20House%20of%20OTT%20Ravet!%20I%20want%20to%20inquire%20about%20booking%20a%20private%20theater."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20"
            >
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
              WhatsApp
            </a>
          </div>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2">
            <a
              href="#book"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full block text-center py-3 rounded-xl font-bold text-sm ${config.buttonClass}`}
            >
              Reserve Slot Online (Advance ₹750)
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
