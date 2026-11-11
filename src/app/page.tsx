"use client";

import React, { useState } from "react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedEventCards } from "@/components/FeaturedEventCards";
import { VenuePhotoGallerySection } from "@/components/VenuePhotoGallerySection";
import { PromotionalOffersSection } from "@/components/PromotionalOffersSection";
import { BookingWizard } from "@/components/BookingWizard";
import { LocationMapSection } from "@/components/LocationMapSection";
import { FloatingCTAs } from "@/components/FloatingCTAs";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  const [selectedTheaterForBooking, setSelectedTheaterForBooking] = useState<string>("cinema-suite");
  const [selectedOccasionForBooking, setSelectedOccasionForBooking] = useState<string>("Birthday Celebrations");
  const [selectedDateForBooking, setSelectedDateForBooking] = useState<string>("");
  const [selectedSlotForBooking, setSelectedSlotForBooking] = useState<string>("slot-evening");
  const [selectedGuestsForBooking, setSelectedGuestsForBooking] = useState<number>(2);
  const [selectedAddonsForBooking, setSelectedAddonsForBooking] = useState<string[]>([]);

  // When an event card or photo setup is clicked
  const handleSelectEvent = (theaterId: string, occasion: string) => {
    setSelectedTheaterForBooking(theaterId);
    setSelectedOccasionForBooking(occasion);
    if (theaterId === "cinema-suite") setSelectedGuestsForBooking(2);
    else if (theaterId === "blockbuster-arena") setSelectedGuestsForBooking(5);
    else if (theaterId === "royal-ott-lounge") setSelectedGuestsForBooking(8);
  };

  // When an add-on upgrade is clicked in Section 4
  const handleSelectOffer = (addonId: string) => {
    setSelectedAddonsForBooking((prev) => {
      if (prev.includes(addonId)) return prev;
      return [...prev, addonId];
    });
  };

  return (
    <div className="relative min-h-screen bg-[#07080B] text-slate-100 selection:bg-amber-500 selection:text-black">
      {/* 1. Theme Switcher */}
      <ThemeSwitcher />

      {/* 2. Simplified Clean Header */}
      <Header />

      <main id="main-content">
        {/* 1st Place: Simplistic Hero Section (Realistic photo showcase, zero pricing in first view) */}
        <HeroSection />

        {/* 2nd Place: Celebration Theater Events Cards */}
        <FeaturedEventCards onSelectEvent={handleSelectEvent} />

        {/* 3rd Place: Official Google Photo Gallery Showcase */}
        <VenuePhotoGallerySection onSelectPhoto={handleSelectEvent} />

        {/* 4th Place: Special Event Effects & Upgrades */}
        <PromotionalOffersSection onSelectOffer={handleSelectOffer} />

        {/* 5th Place: Instant Reservation (₹750 Advance Token, Google Sheets & WhatsApp Sync) */}
        <BookingWizard
          initialTheaterId={selectedTheaterForBooking}
          initialOccasion={selectedOccasionForBooking}
          initialDate={selectedDateForBooking}
          initialSlotId={selectedSlotForBooking}
          initialGuests={selectedGuestsForBooking}
          initialAddonIds={selectedAddonsForBooking}
        />

        {/* 6th Place: Location & Directions Card (Sector 29 Ravet, Pune) */}
        <LocationMapSection />
      </main>

      {/* Floating Action Buttons for Mobile */}
      <FloatingCTAs />

      {/* Clean Footer */}
      <Footer />
    </div>
  );
}
