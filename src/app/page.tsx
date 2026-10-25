"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { TheatersSection } from "@/components/TheatersSection";
import { OccasionsSection } from "@/components/OccasionsSection";
import { AddonsSection } from "@/components/AddonsSection";
import { PricingCalculator } from "@/components/PricingCalculator";
import { BookingWizard } from "@/components/BookingWizard";
import { GallerySection } from "@/components/GallerySection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { LocationMapSection } from "@/components/LocationMapSection";
import { FaqSection } from "@/components/FaqSection";
import { FloatingCTAs } from "@/components/FloatingCTAs";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  const [selectedTheaterForBooking, setSelectedTheaterForBooking] = useState<string>("cinema-suite");
  const [selectedOccasionForBooking, setSelectedOccasionForBooking] = useState<string>("Birthday Celebrations");

  const handleSelectTheater = (theaterId: string) => {
    setSelectedTheaterForBooking(theaterId);
  };

  const handleSelectOccasion = (occasionTitle: string) => {
    setSelectedOccasionForBooking(occasionTitle);
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900">
      {/* Navigation Header */}
      <Header />

      <main id="main-content">
        {/* 1. Hero Showcase */}
        <HeroSection />

        {/* 2. Private Theater Rooms */}
        <TheatersSection onSelectTheater={handleSelectTheater} />

        {/* 3. Occasions & Experiences */}
        <OccasionsSection onSelectOccasion={handleSelectOccasion} />

        {/* 4. Addons, Cakes & Special Effects */}
        <AddonsSection />

        {/* 5. Real-Time Pricing Estimator */}
        <PricingCalculator />

        {/* 6. The Core Booking Wizard (Syncs with Google Sheets) */}
        <BookingWizard
          initialTheaterId={selectedTheaterForBooking}
          initialOccasion={selectedOccasionForBooking}
        />

        {/* 7. Photo Gallery */}
        <GallerySection />

        {/* 8. Google Customer Reviews */}
        <ReviewsSection />

        {/* 9. Location & Direction Guide (Ravet, Pune) */}
        <LocationMapSection />

        {/* 10. Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Floating Action Buttons for Mobile */}
      <FloatingCTAs />

      {/* Footer with PCMC & Pune SEO Footprint */}
      <Footer />
    </div>
  );
}

