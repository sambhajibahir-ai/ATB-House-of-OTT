"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MessageCircle, Menu, X, MapPin, Sparkles, Film } from "lucide-react";

export function Header() {
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
    { label: "Price Calculator", href: "#pricing" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reviews", href: "#reviews" },
    { label: "Location", href: "#location" },
    { label: "FAQs", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#08090C]/95 backdrop-blur-md py-3 border-b border-white/10 shadow-xl"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Location Tag */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-red to-brand-crimson flex items-center justify-center shadow-lg shadow-brand-red/30 group-hover:scale-105 transition-transform">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white">
                  HOUSE OF <span className="text-brand-crimson">OTT</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-brand-red/20 text-brand-crimson border border-brand-red/30">
                  Private Theater
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-gray-400">
                <MapPin className="w-3 h-3 text-brand-amber animate-pulse" />
                <span className="text-gray-300 font-medium">Ravet, Pune</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block ml-1" />
                <span className="text-emerald-400 text-[10px] font-semibold">Open Now</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white hover:text-brand-crimson transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/919168530789?text=Hi%20House%20of%20OTT%20Ravet!%20I%20want%20to%20inquire%20about%20booking%20a%20private%20theater."
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all flex items-center gap-1.5 text-xs font-semibold"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>

            <a
              href="tel:+919168530789"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 transition-all flex items-center gap-1.5 text-xs font-semibold"
              title="Call Us"
            >
              <Phone className="w-4 h-4 text-brand-gold" />
              <span className="hidden md:inline">+91 91685 30789</span>
            </a>

            <a
              href="#book"
              className="relative px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-brand-red to-brand-crimson hover:opacity-95 shadow-lg shadow-brand-red/30 hover:shadow-brand-red/50 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book Slot</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href="#book"
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-brand-red"
            >
              Book Now
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/10 text-gray-200 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e1017] border-b border-white/10 px-4 pt-3 pb-6 mt-2 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
            <a
              href="tel:+919168530789"
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 text-gray-200 text-xs font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              Call Ravet Branch
            </a>
            <a
              href="https://wa.me/919168530789?text=Hi%20House%20of%20OTT%20Ravet!%20I%20want%20to%20inquire%20about%20booking%20a%20private%20theater."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Us
            </a>
          </div>

          <div className="flex flex-col space-y-2">
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
              className="w-full block text-center py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-red to-brand-crimson shadow-lg shadow-brand-red/30"
            >
              ⚡ Reserve Slot Online (Token ₹750)
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
