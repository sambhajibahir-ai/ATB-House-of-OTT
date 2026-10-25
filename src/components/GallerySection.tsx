"use client";

import React from "react";
import Image from "next/image";

export function GallerySection() {
  const galleryItems = [
    {
      id: "gal-1",
      title: "Romantic Candlelight Date Night",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
      tag: "Red Carpet Suite"
    },
    {
      id: "gal-2",
      title: "Neon Birthday Celebration & Cake Cutting",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
      tag: "Blockbuster Arena"
    },
    {
      id: "gal-3",
      title: "200\" Ultra-Wide Laser Screen & Recliners",
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
      tag: "Royal OTT Lounge"
    },
    {
      id: "gal-4",
      title: "Bachelorette & Bride-to-Be Squad Party",
      image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80",
      tag: "Party Setup"
    },
    {
      id: "gal-5",
      title: "Cinematic Cloud Fog Entrance",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
      tag: "Special Effect"
    },
    {
      id: "gal-6",
      title: "Friends PS5 Gaming & Sports Screening",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
      tag: "Gaming & Live Matches"
    }
  ];

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="py-20 relative bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">
            Real Setup Vibes
          </div>
          <h2 id="gallery-heading" className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Photo Gallery
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Real photos from celebrations, private movie screenings, and surprise parties at our Ravet venue.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="relative h-64 rounded-xl overflow-hidden bg-white border border-slate-200 shadow-xs"
            >
              <Image
                src={item.image}
                alt={`${item.title} at House of OTT Ravet Pune`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

              <div className="absolute bottom-3 left-3 right-3">
                <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-white/90 text-slate-800 border border-slate-250 mb-1 shadow-xs">
                  {item.tag}
                </span>
                <h3 className="text-sm font-semibold text-white drop-shadow-xs">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
