import React from "react";
import { Film, MapPin, Phone, MessageCircle, Star, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="bg-[#050608] border-t border-white/10 pt-14 pb-20 sm:pb-12 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-900/30">
                <Film className="w-4 h-4" aria-hidden="true" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                HOUSE OF <span className="text-amber-400">OTT</span>
              </span>
            </div>

            <p className="text-gray-400 leading-relaxed max-w-sm">
              Pune&apos;s premier private cinema and celebration venue in Ravet. 
              100% soundproof privacy with 4K laser projection and couple recliners.
            </p>

            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Star className="w-4 h-4 fill-amber-400" aria-hidden="true" />
              <span className="text-white">4.9 / 5 Rating</span>
              <span className="text-gray-500 font-normal">• 580+ Reviews in Ravet</span>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer Quick Links">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#events" className="hover:text-white transition-colors">
                  Celebration Packages
                </a>
              </li>
              <li>
                <a href="#venue-gallery" className="hover:text-white transition-colors">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#highlights" className="hover:text-white transition-colors">
                  Effects &amp; Add-ons
                </a>
              </li>
              <li>
                <a href="#book" className="hover:text-white transition-colors">
                  Reserve Slot
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">
                  Location &amp; Directions
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
              <div className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  S.No. 215, Prime Ville, Sector 29, Ravet, Pune 412101
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
                <a href="tel:+919168530789" className="text-white hover:underline">
                  +91 91685 30789
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <a
                  href="https://wa.me/919168530789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline"
                >
                  WhatsApp Booking Desk
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-500">
          <div>
            © {currentYear} House of OTT. All rights reserved. Ravet, Pune.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted for private celebrations in Pune</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" aria-hidden="true" />
          </div>
        </div>
      </div>
    </footer>
  );
}