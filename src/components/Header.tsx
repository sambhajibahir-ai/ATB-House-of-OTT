"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MessageCircle, Menu, X, MapPin, Film } from "lucide-react";

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
    { label: "Pricing", href: "#pricing" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reviews", href: "#reviews" },
    { label: "Location", href: "#location" },
    { label: "FAQs", href: "#faq" },
  ];

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm"
          : "bg-white/80 backdrop-blur-sm border-b border-slate-150 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none p-1"
            aria-label="House of OTT - Home"
          >
            <div className="w-9 h-9 rounded-lg bg-brand-red flex items-center justify-center text-white shrink-0 shadow-sm">
              <Film className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900">
                  HOUSE OF <span className="text-brand-red">OTT</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold rounded bg-slate-100 text-slate-700 border border-slate-200">
                  Ravet, Pune
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" aria-hidden="true" />
                <span>Sector 29, Ravet</span>
                <span className="text-slate-400" aria-hidden="true">•</span>
                <span className="text-emerald-700 font-medium">Open 10 AM – 3 AM</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-700 hover:text-brand-red transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none rounded px-2 py-1"
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
              className="px-3.5 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors flex items-center gap-1.5 text-xs font-semibold focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:outline-none"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>

            <a
              href="tel:+919168530789"
              aria-label="Call +91 91685 30789"
              className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-250 transition-colors flex items-center gap-1.5 text-xs font-semibold focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
            >
              <Phone className="w-4 h-4 text-amber-700" aria-hidden="true" />
              <span>+91 91685 30789</span>
            </a>

            <a
              href="#book"
              className="px-4 py-2 rounded-lg font-semibold text-xs tracking-wide text-white bg-brand-red hover:bg-red-900 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
            >
              Book Slot (₹750)
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href="#book"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-brand-red hover:bg-red-900"
            >
              Book
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
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
          className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 mt-2 space-y-3 shadow-lg"
        >
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200">
            <a
              href="tel:+919168530789"
              className="flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-amber-700" aria-hidden="true" />
              Call Venue
            </a>
            <a
              href="https://wa.me/919168530789?text=Hi%20House%20of%20OTT%20Ravet!%20I%20want%20to%20inquire%20about%20booking%20a%20private%20theater."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200"
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
                className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-brand-red hover:bg-slate-50"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2">
            <a
              href="#book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full block text-center py-2.5 rounded-lg font-semibold text-sm text-white bg-brand-red hover:bg-red-900"
            >
              Reserve Slot Online (Advance ₹750)
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
