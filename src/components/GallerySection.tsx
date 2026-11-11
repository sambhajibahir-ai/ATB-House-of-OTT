"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { Camera, Instagram, Sparkles, X, ChevronRight, Heart } from "lucide-react";

interface GalleryPhoto {
  id: string;
  title: string;
  category: "all" | "couples" | "birthdays" | "theaters" | "cakes";
  image: string;
  tag: string;
  caption: string;
  likes: string;
}

export function GallerySection() {
  const { config } = useTheme();
  const [filter, setFilter] = useState<string>("all");
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const galleryItems: GalleryPhoto[] = [
    {
      id: "gal-1",
      title: "Fairytale Candlelight Date & Rose Petal Aisle",
      category: "couples",
      image: "/images/venue/house-of-ott-anniversary-teddy-setup.jpg",
      tag: "Red Carpet Suite",
      caption: "Heart-shaped fresh red rose petal pathway with romantic LED candles & fairy light canopy.",
      likes: "482",
    },
    {
      id: "gal-2",
      title: "Neon Birthday Celebration & Balloon Arch",
      category: "birthdays",
      image: "/images/venue/house-of-ott-birthday-neon-setup.jpg",
      tag: "Blockbuster Arena",
      caption: "Illuminated 'Happy Birthday' neon board with customized birthday song blast on 180\" screen.",
      likes: "614",
    },
    {
      id: "gal-3",
      title: "200\" Ultra-Wide 4K Laser Projection Hall",
      category: "theaters",
      image: "/images/venue/house-of-ott-proposal-butterfly-setup.jpg",
      tag: "The Royal OTT Lounge",
      caption: "IMAX-grade private auditorium with multi-tiered plush recliners & 1200W Dolby Atmos sound.",
      likes: "895",
    },
    {
      id: "gal-4",
      title: "Bachelorette & Bride-to-Be Squad Party",
      category: "birthdays",
      image: "/images/venue/cold-pyro-cake-celebration.jpg",
      tag: "Squad Party Hall",
      caption: "12-guest girls night celebration with wireless karaoke microphones, neon photo props & outside pizza.",
      likes: "530",
    },
    {
      id: "gal-5",
      title: "Cinematic Low Cloud Fog Entrance",
      category: "couples",
      image: "/images/venue/cloud-fog-entrance-real.jpg",
      tag: "Signature Effect",
      caption: "Low-lying dense cloud fog rolls into the room when the cake is unveiled or proposal clip plays.",
      likes: "740",
    },
    {
      id: "gal-6",
      title: "Dutch Chocolate Truffle & Celebration Cake",
      category: "cakes",
      image: "/images/venue/truffle-cake-pyro.jpg",
      tag: "Bakery Cakes",
      caption: "Freshly prepared rich Belgian chocolate ganache & heart-shaped red velvet celebration cakes.",
      likes: "390",
    },
    {
      id: "gal-7",
      title: "PS5 Gaming Tournament & IPL Cricket Night",
      category: "theaters",
      image: "/images/venue/real-gaming-suite.jpg",
      tag: "Gaming & Live Sports",
      caption: "Ultra-low latency 120Hz display connection with deep subwoofer bass for gaming marathons.",
      likes: "468",
    },
    {
      id: "gal-8",
      title: "Professional 4K Video & Candid Photography",
      category: "cakes",
      image: "/images/venue/real-photographer-reel.jpg",
      tag: "Media Package",
      caption: "Dedicated photographer with prime lenses capturing cake-cutting, surprise reactions & 4K Instagram reels.",
      likes: "520",
    },
    {
      id: "gal-9",
      title: "Aesthetic Couple Screening & Recliner Beds",
      category: "couples",
      image: "/images/venue/house-of-ott-anniversary-teddy-setup.jpg",
      tag: "Couples Suite",
      caption: "Total privacy for 2 to 4 guests with cozy velvet couple loungers & Netflix 4K streaming.",
      likes: "812",
    },
  ];

  const categories = [
    { id: "all", label: "All Setups" },
    { id: "couples", label: "Couples & Dates" },
    { id: "birthdays", label: "Birthday Bashes" },
    { id: "theaters", label: "Screening Halls" },
    { id: "cakes", label: "Cakes & Snacks" },
  ];

  const filteredItems = filter === "all" 
    ? galleryItems 
    : galleryItems.filter((i) => i.category === filter);

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="py-20 relative bg-[#090C12] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider mb-4 text-amber-400">
            <Camera className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Real Moments &amp; Social Media Vibes</span>
          </div>
          <h2 id="gallery-heading" className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            House of OTT Photo Gallery
          </h2>
          <p className="text-base sm:text-lg text-gray-300">
            Browse real photos from actual celebrations, private movie screenings, and romantic dates at our Ravet venue.
          </p>

          {/* Social Media Hashtag Pill */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
            <Instagram className="w-4 h-4 text-rose-400" aria-hidden="true" />
            <span className="font-semibold text-gray-200">#HouseOfOttRavet</span>
            <span>• Tag us on your Instagram reels!</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div 
          role="group" 
          aria-label="Filter Photo Gallery by Category"
          className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar"
        >
          {categories.map((c) => {
            const isActive = filter === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setFilter(c.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
                  isActive
                    ? "bg-white text-slate-950 font-bold shadow-md scale-105"
                    : "bg-[#111420] text-gray-300 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group relative h-72 rounded-2xl overflow-hidden bg-[#111420] border border-white/10 hover:border-amber-400/50 transition-all cursor-pointer shadow-xl hover:-translate-y-1"
            >
              <Image
                src={item.image}
                alt={`${item.title} at House of OTT Ravet Pune`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Top tag & like count */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-black/70 backdrop-blur-md text-amber-300 border border-amber-400/30">
                  {item.tag}
                </span>
                <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-black/70 backdrop-blur-md text-white flex items-center gap-1">
                  <Heart className="w-3 h-3 text-rose-500 fill-rose-500" aria-hidden="true" />
                  {item.likes}
                </span>
              </div>

              {/* Bottom Title & Click hint */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-[11px] text-gray-300 line-clamp-1">
                  {item.caption}
                </p>
                <div className="text-[10px] text-amber-400 font-semibold mt-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Click to expand view</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        >
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#121522] border border-white/20 overflow-hidden shadow-2xl">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-black text-white focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-80 sm:h-96 w-full bg-black">
              <Image
                src={activePhoto.image}
                alt={activePhoto.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {activePhoto.tag}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Instagram className="w-3.5 h-3.5 text-rose-400" />
                  House of OTT Ravet
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {activePhoto.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mb-6 leading-relaxed">
                {activePhoto.caption}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
                <div className="text-xs text-gray-400">
                  Available for custom setup at Sector 29, Ravet
                </div>
                <a
                  href="#book"
                  onClick={() => setActivePhoto(null)}
                  className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider ${config.buttonClass}`}
                >
                  Book This Experience (₹750 Advance)
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
