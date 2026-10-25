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
    <section id="location" aria-labelledby="location-heading" className="py-20 relative bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">
            Location Guide
          </div>
          <h2 id="location-heading" className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Ravet Venue &amp; Directions
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Conveniently situated in Sector 29, Ravet, just minutes away from major IT hubs, 
            highways, and residential neighborhoods of Pune &amp; PCMC.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Location Info Card */}
          <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-800 mb-2">
                <Navigation className="w-4 h-4" aria-hidden="true" />
                <span>Venue Address</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                House of OTT
              </h3>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 mb-5 text-xs sm:text-sm text-slate-800 space-y-1">
                <div className="font-semibold text-slate-900">
                  S.No. 215, Prime Ville, Plot No. 4,
                </div>
                <div>(Next to OYO Hotel), Sector No. 29,</div>
                <div>Ravet, Pimpri-Chinchwad, Pune, Maharashtra — 412101</div>
              </div>

              {/* Operating Hours */}
              <div className="space-y-2.5 text-xs mb-5">
                <div className="flex items-center gap-2.5 text-slate-700">
                  <Clock className="w-4 h-4 text-brand-red shrink-0" aria-hidden="true" />
                  <span><strong>Timings:</strong> 10:00 AM – 03:00 AM (Open 7 Days)</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-700">
                  <Car className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                  <span><strong>Parking:</strong> Dedicated 2-Wheeler &amp; 4-Wheeler Parking</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-700">
                  <Shield className="w-4 h-4 text-amber-800 shrink-0" aria-hidden="true" />
                  <span><strong>Facilities:</strong> Elevator &amp; Air Conditioned Rooms</span>
                </div>
              </div>

              {/* Driving Distances */}
              <div className="mb-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-700 mb-2">
                  Driving Distances:
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {directions.map((d, idx) => (
                    <div key={idx} className="p-2 rounded bg-slate-50 border border-slate-200">
                      <div className="font-semibold text-slate-900 truncate">{d.from}</div>
                      <div className="text-slate-500">{d.time} ({d.distance})</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-5 border-t border-slate-200 space-y-2">
              <a
                href="https://share.google/6g19LyHLut3CkEDbk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-lg font-semibold text-xs tracking-wide text-white bg-brand-red hover:bg-red-800 transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
              >
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>Open in Google Maps App</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+919168530789"
                  className="py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-700" aria-hidden="true" />
                  <span>Call Venue</span>
                </a>
                <a
                  href="https://wa.me/919168530789?text=Hi%20House%20of%20OTT%20Ravet!%20Please%20share%20your%20exact%20location%20and%20directions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:outline-none"
                >
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xs relative min-h-[400px]">
            <iframe
              title="House of OTT Ravet Location Map"
              src="https://maps.google.com/maps?q=18.6534,73.7432+(House%20of%20OTT%20Ravet)&t=&z=15&ie=UTF8&iwloc=B&output=embed"
              className="w-full h-full min-h-[400px] border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
