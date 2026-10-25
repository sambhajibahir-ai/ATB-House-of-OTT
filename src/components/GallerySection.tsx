"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Camera } from "lucide-react";

export function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const galleryItems = [
    {
      id: "gal-1",
      title: "Romantic Candlelight Date Night",
      category: "romantic",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
      tag: "Red Carpet Suite"
    },
    {
      id: "gal-2",
      title: "Neon Birthday Celebration & Cake Cutting",
      category: "birthday",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
      tag: "Blockbuster Arena"
    },
    {
      id: "gal-3",
      title: "200\" Ultra-Wide Laser Screen & Recliners",
      category: "theater",
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
      tag: "Royal OTT Lounge"
    },
    {
      id: "gal-4",
      title: "Bachelorette & Bride-to-Be Squad Party",
      category: "party",
      image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80",
      tag: "Party Zone"
    },
    {
      id: "gal-5",
      title: "Cinematic Cloud Fog Entrance",
      category: "effects",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
      tag: "Special Effect"
    },
    {
      id: "gal-6",
      title: "Friends PS5 Gaming Tournament & IPL Match",
      category: "party",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
      tag: "Dolby Atmos 7.1"
    }
  ];

  const filteredItems = activeFilter === "all"
    ? galleryItems
    : galleryItems.filter((i) => i.category === activeFilter);

  return (
    <section id="gallery" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-crimson/10 border border-brand-crimson/20 text-brand-crimson text-xs font-bold uppercase tracking-wider mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>Real Moments & Vibes</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            House of OTT Gallery
          </h2>
          <p className="text-base sm:text-lg text-gray-400">
            Take a look inside Ravet&apos;s most aesthetic celebration lounge. 
            Real photos from real birthday surprises, anniversaries, and squad parties.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative h-72 rounded-2xl overflow-hidden bg-surface-card border border-white/10 hover:border-brand-red/40 transition-all shadow-xl"
            >
              <Image
                src={item.image}
                alt={`${item.title} at House of OTT Ravet Pune`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-brand-red/80 text-white mb-1.5 backdrop-blur-sm">
                  {item.tag}
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-brand-crimson transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Instagram Prompt */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-gray-400">
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span>Follow our Instagram for daily reels and celebration setups in Ravet</span>
          </div>
        </div>
      </div>
    </section>
  );
}
