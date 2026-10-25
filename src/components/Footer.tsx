import React from "react";
import Link from "next/link";
import { Film, MapPin, Phone, Mail, MessageCircle, Heart, Star } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const seoKeywords = [
    "Private Theater in Ravet Pune",
    "Birthday Celebration Private Theater PCMC",
    "Romantic Movie Date Theater Pune",
    "Mini Theater Near Wakad",
    "Private Cinema Near Hinjawadi IT Park",
    "Anniversary Celebration Theater Ravet",
    "Bride to Be Party Venue PCMC",
    "House of OTT Ravet Pune",
    "The Binge Town Alternative Pune",
    "Private Theater with Recliners Pune",
    "PlayStation Gaming Theater Pune",
    "Couple Movie Theater Ravet",
  ];

  return (
    <footer className="bg-[#050608] border-t border-white/10 pt-16 pb-24 sm:pb-12 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-red to-brand-crimson flex items-center justify-center text-white shadow-lg shadow-brand-red/30">
                <Film className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                HOUSE OF <span className="text-brand-crimson">OTT</span>
              </span>
            </div>

            <p className="text-gray-400 leading-relaxed max-w-sm">
              Pune&apos;s premier private screening theater and celebration venue. 
              Equipped with 150&quot; to 200&quot; 4K HDR laser screens, 1200W Dolby Atmos sound, 
              romantic recliner beds, cloud fog entrance, and custom neon celebrations.
            </p>

            <div className="flex items-center gap-2 text-brand-gold font-bold">
              <Star className="w-4 h-4 fill-brand-gold" />
              <span className="text-white">4.9 / 5 Rating</span>
              <span className="text-gray-500">• 580+ Happy Celebrations in Ravet</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#theaters" className="hover:text-white transition-colors">
                  Private Theaters
                </a>
              </li>
              <li>
                <a href="#occasions" className="hover:text-white transition-colors">
                  Celebration Packages
                </a>
              </li>
              <li>
                <a href="#addons" className="hover:text-white transition-colors">
                  Cakes &amp; Add-ons
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Price Estimator
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Occasions Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Celebrations
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#occasions" className="hover:text-white transition-colors">
                  Birthday Surprises
                </a>
              </li>
              <li>
                <a href="#occasions" className="hover:text-white transition-colors">
                  Anniversaries &amp; Dates
                </a>
              </li>
              <li>
                <a href="#occasions" className="hover:text-white transition-colors">
                  Candlelight Proposals
                </a>
              </li>
              <li>
                <a href="#occasions" className="hover:text-white transition-colors">
                  Bride-to-be Bachelorette
                </a>
              </li>
              <li>
                <a href="#occasions" className="hover:text-white transition-colors">
                  OTT Movie &amp; Gaming Nights
                </a>
              </li>
              <li>
                <a href="#occasions" className="hover:text-white transition-colors">
                  Baby Showers
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Location Info */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Ravet Venue
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-brand-crimson shrink-0 mt-0.5" />
                <span>
                  S.No. 215, Prime Ville, Plot No. 4, Sector No. 29, Ravet, Pune, Maharashtra 412101
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <a href="tel:+919168530789" className="text-white hover:underline">
                  +91 91685 30789
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/919168530789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline"
                >
                  WhatsApp Booking Desk
                </a>
              </div>
              <div className="pt-2">
                <a
                  href="https://share.google/6g19LyHLut3CkEDbk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-brand-gold hover:underline font-semibold"
                >
                  View on Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Tag Cloud - Boosts organic ranking for local search queries */}
        <div className="pt-8 pb-8 border-t border-white/5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-3">
            Popular Searches in Pune &amp; PCMC:
          </div>
          <div className="flex flex-wrap gap-2">
            {seoKeywords.map((kw, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] text-gray-400 hover:text-white"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <div>
            © {currentYear} House of OTT. All rights reserved. Exclusively in Ravet, Pune.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-brand-crimson fill-brand-crimson inline" />
            <span>for movie lovers &amp; celebrators in Pune</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
