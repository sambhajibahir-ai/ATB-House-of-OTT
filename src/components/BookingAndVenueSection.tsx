"use client";

import React from "react";
import { BookingWizard } from "@/components/BookingWizard";
import { MapPin, Navigation, Phone, MessageCircle, Clock, Car, Star, ShieldCheck, Compass } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface BookingAndVenueSectionProps {
  initialTheaterId?: string;
  initialOccasion?: string;
  initialDate?: string;
  initialSlotId?: string;
  initialGuests?: number;
  initialAddonIds?: string[];
}

export function BookingAndVenueSection({
  initialTheaterId,
  initialOccasion,
  initialDate,
  initialSlotId,
  initialGuests,
  initialAddonIds
}: BookingAndVenueSectionProps) {
  const { config } = useTheme();

  const drivingRoutes = [
    { from: "Akurdi Station / Kiwale", time: "5 Mins", distance: "2.4 km" },
    { from: "Wakad / Bhumkar Chowk", time: "10 Mins", distance: "5.8 km" },
    { from: "Hinjawadi IT Park", time: "12 Mins", distance: "7.5 km" },
    { from: "Pimple Saudagar / Nigdi", time: "14 Mins", distance: "8.0 km" }
  ];

  return (
    <section 
      id="book" 
      aria-labelledby="booking-venue-heading" 
      className="py-20 relative bg-[#07080B] border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider mb-4 text-amber-400">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Instant Reservation &amp; Venue Pass</span>
          </div>
          <h2 id="booking-venue-heading" className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Lock Your Celebration Slot
          </h2>
          <p className="text-base sm:text-lg text-gray-300">
            Select your event, date, and slot. Pay only <strong className="text-amber-400">₹750 advance token</strong> to reserve. 
            The remaining balance is payable at the venue after your celebration!
          </p>
        </div>

        {/* 2-Column Layout: Booking Form (Col 8) + Venue & Contact Card (Col 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Booking Form Card */}
          <div className="lg:col-span-8">
            <BookingWizard
              initialTheaterId={initialTheaterId}
              initialOccasion={initialOccasion}
              initialDate={initialDate}
              initialSlotId={initialSlotId}
              initialGuests={initialGuests}
              initialAddonIds={initialAddonIds}
            />
          </div>

          {/* Right Column: Venue & Trust Card */}
          <div className="lg:col-span-4 space-y-6">
            {/* Venue Location Card */}
            <div className="rounded-3xl bg-[#0F121E] border border-white/10 p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Ravet Venue Location</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                  Open 7 Days
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                House of OTT
              </h3>

              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                S.No. 215, Prime Ville, Plot No. 4 (Next to OYO Hotel), Sector No. 29, Ravet, Pune, Maharashtra — 412101.
              </p>

              {/* Operating Info */}
              <div className="space-y-2.5 text-xs text-gray-300 border-t border-b border-white/10 py-3.5 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Timings:</strong> 11:00 AM – 03:00 AM Daily</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Parking:</strong> Free 2 &amp; 4 Wheeler Parking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                  <span><strong>Rating:</strong> 4.9★ (580+ Google Reviews)</span>
                </div>
              </div>

              {/* Driving Distances */}
              <div className="mb-5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>Driving Distances:</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {drivingRoutes.map((r, i) => (
                    <div key={i} className="p-2 rounded-xl bg-white/5 border border-white/5">
                      <div className="font-semibold text-white truncate">{r.from}</div>
                      <div className="text-amber-400 font-bold">{r.time} ({r.distance})</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <a
                  href="https://share.google/6g19LyHLut3CkEDbk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${config.buttonClass}`}
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href="tel:+919168530789"
                    className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Call Venue</span>
                  </a>
                  <a
                    href="https://wa.me/919168530789?text=Hi%20House%20of%20OTT%20Ravet!%20Please%20share%20directions%20and%20slot%20availability."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Google Reviews Trust Badge Card */}
            <div className="rounded-3xl bg-gradient-to-br from-[#121626] to-[#0A0D18] border border-amber-500/20 p-5 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                  ★
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">Top Rated in Pune &amp; PCMC</div>
                  <div className="text-xs text-amber-400 font-semibold">4.9 Stars on Google Maps</div>
                </div>
              </div>
              <p className="text-[11px] text-gray-300 italic leading-relaxed">
                &ldquo;Best private theater celebration venue in Ravet! The fog entry and surprise video setup on the 180-inch screen made my wife&apos;s birthday magical.&rdquo;
              </p>
              <div className="mt-2 text-[10px] text-gray-400 text-right">
                — Rohit S., Verified Customer
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
