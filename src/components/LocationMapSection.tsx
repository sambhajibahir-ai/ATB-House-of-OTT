"use client";

import React from "react";
import { MapPin, Navigation, Phone, MessageCircle, Clock, Car, Shield } from "lucide-react";

export function LocationMapSection() {
  const directions = [
    { from: "Akurdi Railway Station", time: "5 Mins", distance: "2.4 km" },
    { from: "Kiwale & Punawale", time: "6 Mins", distance: "3.1 km" },
    { from: "Nigdi Pradhikaran", time: "8 Mins", distance: "4.2 km" },
    { from: "Wakad Bridge / Bhumkar Chowk", time: "10 Mins", distance: "5.8 km" },
    { from: "Hinjawadi IT Park (Phase 1)", time: "12 Mins", distance: "7.5 km" },
    { from: "Chinchwad & Pimple Saudagar", time: "14 Mins", distance: "8.0 km" },
  ];

  return (
    <section id="location" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-crimson text-xs font-bold uppercase tracking-wider mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>Prime Venue in PCMC Pune</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Visit Us in Ravet, Pune
          </h2>
          <p className="text-base sm:text-lg text-gray-400">
            Conveniently situated in Sector 29, Ravet, just minutes away from major IT hubs, 
            highways, and residential neighborhoods of Pune &amp; PCMC.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Location Info Card (5 Columns) */}
          <div className="lg:col-span-5 rounded-3xl bg-surface-card border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-gold mb-3">
                <Navigation className="w-4 h-4" />
                <span>Venue Address &amp; Directions</span>
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-3">
                House of OTT
              </h3>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 mb-6 text-xs text-gray-300 space-y-2">
                <div className="font-semibold text-white">
                  S.No. 215, Prime Ville, Plot No. 4,
                </div>
                <div>(Next to OYO Hotel), Sector No. 29,</div>
                <div>Ravet, Pimpri-Chinchwad, Pune, Maharashtra — 412101</div>
              </div>

              {/* Operating Hours & Amenities */}
              <div className="space-y-3 text-xs mb-6">
                <div className="flex items-center gap-2.5 text-gray-300">
                  <Clock className="w-4 h-4 text-brand-crimson shrink-0" />
                  <span><strong>Timings:</strong> 10:00 AM – 03:00 AM (Open 7 Days a Week)</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-300">
                  <Car className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Parking:</strong> Dedicated 2-Wheeler &amp; 4-Wheeler Parking</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-300">
                  <Shield className="w-4 h-4 text-brand-gold shrink-0" />
                  <span><strong>Accessibility:</strong> Elevator &amp; Air Conditioned Lounge</span>
                </div>
              </div>

              {/* Nearby Distance Matrix */}
              <div className="mb-6">
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Driving Distances:
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {directions.map((d, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-white/5 border border-white/5">
                      <div className="font-semibold text-white truncate">{d.from}</div>
                      <div className="text-gray-400">{d.time} ({d.distance})</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-6 border-t border-white/10 space-y-2.5">
              <a
                href="https://share.google/6g19LyHLut3CkEDbk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-brand-red to-brand-crimson hover:opacity-95 shadow-lg shadow-brand-red/30 transition-all flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                <span>Open in Google Maps App</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+919168530789"
                  className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-gold" />
                  <span>+91 91685 30789</span>
                </a>
                <a
                  href="https://wa.me/919168530789?text=Hi%20House%20of%20OTT%20Ravet!%20Please%20share%20your%20exact%20location%20and%20directions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Get Live Location</span>
                </a>
              </div>
            </div>
          </div>

          {/* Embedded Google Map (7 Columns) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden bg-surface-card border border-white/10 shadow-2xl relative min-h-[420px]">
            <iframe
              title="House of OTT Ravet Location Map"
              src="https://maps.google.com/maps?q=18.6534,73.7432+(House%20of%20OTT%20Ravet)&t=&z=15&ie=UTF8&iwloc=B&output=embed"
              className="w-full h-full min-h-[420px] border-0 filter grayscale-[20%] contrast-125"
              loading="lazy"
              allowFullScreen
            />
            
            {/* Map Overlay Badge */}
            <div className="absolute top-4 left-4 z-10 px-3.5 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-xs text-white flex items-center gap-2 shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>House of OTT • Sector 29 Ravet</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
