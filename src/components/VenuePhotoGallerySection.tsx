"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { 
  Sparkles, 
  Maximize2, 
  X, 
  Heart, 
  Cake, 
  Crown, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink 
} from "lucide-react";

export interface GalleryPhotoItem {
  id: string;
  image: string;
  alt: string;
  category: "all" | "couples" | "birthdays" | "proposals";
}

// Authentic photos from House of OTT Google listing (Sector 29, Ravet)
export const GALLERY_PHOTOS: GalleryPhotoItem[] = [
  {
    id: "photo-anniversary-teddy",
    image: "/images/venue/house-of-ott-anniversary-teddy-setup.jpg",
    alt: "Romantic Anniversary & Teddy Celebration Setup at House of OTT Ravet",
    category: "couples"
  },
  {
    id: "photo-birthday-neon",
    image: "/images/venue/house-of-ott-birthday-neon-setup.jpg",
    alt: "Glowing Birthday Neon and Balloon Setup at House of OTT Ravet",
    category: "birthdays"
  },
  {
    id: "photo-proposal-butterfly",
    image: "/images/venue/house-of-ott-proposal-butterfly-setup.jpg",
    alt: "VIP Grand Hall and Floral Heart Proposal Lounge at House of OTT Ravet",
    category: "proposals"
  },
  {
    id: "photo-hero-panorama",
    image: "/images/venue/hero-cinema-setup.jpg",
    alt: "Widescreen VIP Celebration Theater Room at House of OTT Ravet",
    category: "couples"
  },
  {
    id: "photo-cloud-fog",
    image: "/images/venue/cloud-fog-entrance-real.jpg",
    alt: "Fairytale Cloud Fog Entrance Effect at House of OTT Ravet",
    category: "proposals"
  },
  {
    id: "photo-cold-pyro-cake",
    image: "/images/venue/cold-pyro-cake-celebration.jpg",
    alt: "Celebration Cake Cutting with Cold Pyro Sparklers at House of OTT",
    category: "birthdays"
  },
  {
    id: "photo-couple-recliners",
    image: "/images/venue/couple-luxury-recliner-suite.jpg",
    alt: "Couple Luxury Recliner Seating Suite at House of OTT Ravet",
    category: "couples"
  },
  {
    id: "photo-vip-squad",
    image: "/images/venue/vip-squad-theater-lounge.jpg",
    alt: "VIP Squad Theater Celebration Lounge at House of OTT Ravet",
    category: "proposals"
  }
];

interface VenuePhotoGallerySectionProps {
  onSelectPhoto?: (theaterId: string, occasion: string) => void;
}

export function VenuePhotoGallerySection({ onSelectPhoto }: VenuePhotoGallerySectionProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const categories = [
    { id: "all", label: "All Photos", icon: Sparkles },
    { id: "couples", label: "Anniversaries & Couples", icon: Heart },
    { id: "birthdays", label: "Birthdays", icon: Cake },
    { id: "proposals", label: "Proposals & VIP", icon: Crown },
  ];

  const filteredPhotos = activeCategory === "all"
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === activeCategory);

  const checkScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [filteredPhotos]);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = direction === "left" ? -460 : 460;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const activePhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  const nextLightbox = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % filteredPhotos.length);
  }, [lightboxIndex, filteredPhotos.length]);

  const prevLightbox = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + filteredPhotos.length) % filteredPhotos.length);
  }, [lightboxIndex, filteredPhotos.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") nextLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, nextLightbox, prevLightbox]);

  return (
    <section 
      id="venue-gallery" 
      aria-labelledby="gallery-heading"
      className="py-14 sm:py-20 relative bg-gradient-to-b from-[#07080B] via-[#0B0E18] to-[#06070A] border-b border-white/10 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider mb-3 text-amber-400 shadow-cinema-soft">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Photo Gallery • Ravet</span>
            </div>
            <h2 id="gallery-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Venue Photos
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Authentic celebration setups from our Ravet private cinema.
            </p>
          </div>

          {/* Carousel Navigation Arrows & Google Link */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.google.com/search?q=HOUSE+OF+OTT#lpg=cid:CgIgAQ%3D%3D,ik:CAoSHENJQUJJaEFySVVfek1iakxJUHBWR2E2R3dQenQ%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors shadow-sm"
            >
              <span>Google Listing</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </a>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous photo"
                className={`p-2.5 rounded-xl border transition-all ${
                  canScrollLeft
                    ? "bg-white/10 border-white/20 text-white hover:bg-white/20 shadow-md active:scale-95"
                    : "bg-white/5 border-white/5 text-gray-600 cursor-not-allowed"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Next photo"
                className={`p-2.5 rounded-xl border transition-all ${
                  canScrollRight
                    ? "bg-white/10 border-white/20 text-white hover:bg-white/20 shadow-md active:scale-95"
                    : "bg-white/5 border-white/5 text-gray-600 cursor-not-allowed"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar scroll-smooth">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all duration-200 border ${
                  isActive
                    ? "bg-amber-400 text-black border-amber-400 shadow-md font-bold"
                    : "bg-white/5 hover:bg-white/10 text-gray-300 border-white/10"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-black" : "text-amber-400"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* HORIZONTAL PHOTO CAROUSEL: PURE IMAGES ONLY (No explanatory text, no offers) */}
        <div
          ref={carouselRef}
          onScroll={checkScroll}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 no-scrollbar scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setLightboxIndex(index)}
              className="flex-shrink-0 w-[78vw] max-w-[320px] sm:w-[380px] md:w-[440px] h-[300px] xs:h-[350px] sm:h-[420px] md:h-[460px] snap-start rounded-3xl overflow-hidden bg-black border border-white/15 hover:border-amber-400/50 relative cursor-pointer group shadow-2xl transition-all duration-300 hover:scale-[1.015]"
            >
              {/* Pure High-Resolution Venue Image - Zero Text & Zero Offers */}
              <Image
                src={photo.image}
                alt={photo.alt}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-100"
                sizes="(max-width: 768px) 80vw, 440px"
                priority={index < 2}
              />

              {/* Subtle hover darkener for zoom prompt */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 pointer-events-none" />

              {/* Minimal Zoom Pill on Hover */}
              <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <span className="p-2.5 rounded-xl bg-black/80 backdrop-blur-md text-white border border-white/20 flex items-center justify-center shadow-lg">
                  <Maximize2 className="w-4 h-4 text-amber-400" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Minimal helper line */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-gray-500">
          <span>Swipe or click arrows to view photos • Tap any photo to enlarge</span>
          <span className="hidden sm:inline">House of OTT • Sector 29, Ravet</span>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL: Pure Image Viewer (No text, no offers) */}
      {activePhoto && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar with Counter and Close Button */}
          <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
            <div className="pointer-events-auto">
              <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-amber-400 border border-amber-400/30 text-xs font-bold shadow-lg">
                Photo {lightboxIndex + 1} of {filteredPhotos.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="pointer-events-auto p-2.5 rounded-full bg-black/80 hover:bg-white/20 text-white transition-colors border border-white/20 shadow-xl"
              aria-label="Close photo view"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevLightbox();
            }}
            className="absolute left-3 sm:left-8 z-30 p-3 rounded-full bg-black/75 hover:bg-amber-400 hover:text-black text-white border border-white/20 transition-all shadow-2xl hover:scale-110 active:scale-95"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextLightbox();
            }}
            className="absolute right-3 sm:right-8 z-30 p-3 rounded-full bg-black/75 hover:bg-amber-400 hover:text-black text-white border border-white/20 transition-all shadow-2xl hover:scale-110 active:scale-95"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content: Pure High-Res Photo Container */}
          <div
            className="relative w-full max-w-5xl h-[70vh] sm:h-[82vh] rounded-3xl overflow-hidden bg-black border border-white/20 shadow-2xl shadow-black animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activePhoto.image}
              alt={activePhoto.alt}
              fill
              className="object-contain object-center"
              sizes="90vw"
              priority
            />
          </div>

          {/* Bottom Thumbnail Strip */}
          <div 
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 overflow-x-auto max-w-[90vw] p-2 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {filteredPhotos.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className={`relative w-12 h-12 rounded-xl overflow-hidden border shrink-0 transition-all ${
                  lightboxIndex === idx
                    ? "ring-2 ring-amber-400 border-amber-400 scale-105"
                    : "border-white/10 opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}