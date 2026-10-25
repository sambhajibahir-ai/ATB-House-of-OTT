import React from "react";
import { Film, MapPin, Phone, MessageCircle, Star } from "lucide-react";

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
    "Private Theater with Recliners Pune",
    "Couple Movie Theater Ravet",
  ];

  return (
    <footer role="contentinfo" className="bg-slate-950 border-t border-slate-800 pt-14 pb-24 sm:pb-12 text-slate-300 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-red flex items-center justify-center text-white">
                <Film className="w-4 h-4" aria-hidden="true" />
              </div>
              <span className="font-bold text-lg text-white">
                HOUSE OF <span className="text-red-400">OTT</span>
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed max-w-sm">
              Pune&apos;s premier private screening theater and celebration venue. 
              Equipped with 150&quot; to 200&quot; 4K HDR laser screens, 1200W Dolby Atmos sound, 
              comfortable recliners, and personalized celebration packages.
            </p>

            <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Star className="w-4 h-4 fill-amber-400" aria-hidden="true" />
              <span className="text-white">4.9 / 5 Rating</span>
              <span className="text-slate-400 font-normal">• 580+ Reviews in Ravet</span>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer Quick Links">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#theaters" className="hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none rounded">
                  Private Theaters
                </a>
              </li>
              <li>
                <a href="#occasions" className="hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none rounded">
                  Celebration Packages
                </a>
              </li>
              <li>
                <a href="#addons" className="hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none rounded">
                  Cakes &amp; Add-ons
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none rounded">
                  Price Estimator
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none rounded">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none rounded">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </nav>

          {/* Occasions */}
          <nav aria-label="Footer Occasions Links">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Occasions
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#occasions" className="hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none rounded">
                  Birthday Surprises
                </a>
              </li>
              <li>
                <a href="#occasions" className="hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none rounded">
                  Anniversaries &amp; Dates
                </a>
              </li>
              <li>
                <a href="#occasions" className="hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none rounded">
                  Candlelight Proposals
                </a>
              </li>
              <li>
                <a href="#occasions" className="hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none rounded">
                  Bride-to-be Bachelorette
                </a>
              </li>
              <li>
                <a href="#occasions" className="hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none rounded">
                  OTT Movie &amp; Gaming
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Ravet Venue
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-slate-300">
                  S.No. 215, Prime Ville, Sector 29, Ravet, Pune 412101
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
                <a href="tel:+919168530789" className="text-slate-200 hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none rounded">
                  +91 91685 30789
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                <a
                  href="https://wa.me/919168530789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-200 hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none rounded"
                >
                  WhatsApp Booking Desk
                </a>
              </div>
              <div className="pt-1">
                <a
                  href="https://share.google/6g19LyHLut3CkEDbk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-amber-400 hover:underline font-medium focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none rounded"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Tag List */}
        <div className="pt-6 pb-6 border-t border-slate-800">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
            Searches in Pune &amp; PCMC:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {seoKeywords.map((kw, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            © {currentYear} House of OTT. All rights reserved. Located exclusively in Ravet, Pune.
          </div>
          <div>
            Private Cinema &amp; Celebration Lounge
          </div>
        </div>
      </div>
    </footer>
  );
}
