"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Users, Video, Music, ArrowRight, Heart, Cake, Crown, Gamepad2, Check, MapPin } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface FeaturedEventCardsProps {
  onSelectEvent?: (theaterId: string, occasion: string) => void;
}

export function FeaturedEventCards({ onSelectEvent }: FeaturedEventCardsProps) {
  const { config } = useTheme();

  const events = [
    {
      id: "birthday-bash",
      title: "Birthday Celebration",
      theaterId: "blockbuster-arena",
      occasion: "Birthday Celebrations",
      badge: "Popular For Birthdays",
      guests: "4 - 10 Guests",
      screen: "180\" 4K Screen",
      sound: "1000W Atmos",
      priceText: "From ₹2,499",
      icon: <Cake className="w-5 h-5 text-amber-400" />,
      image: "/images/venue/house-of-ott-birthday-neon-setup.jpg",
      locationTag: "Ravet, Pune",
      highlights: [
        "Glowing 'Happy Birthday' neon sign & balloon arch",
        "Dedicated cake cutting pedestal & spotlights",
        "Outside food, cake & Swiggy/Zomato allowed"
      ]
    },
    {
      id: "romantic-date",
      title: "Anniversary & Proposal Suite",
      theaterId: "cinema-suite",
      occasion: "Romantic Anniversaries",
      badge: "Couples Special",
      guests: "2 - 4 Guests",
      screen: "150\" 4K Laser",
      sound: "Dolby 5.1",
      priceText: "From ₹1,499",
      icon: <Heart className="w-5 h-5 text-rose-400" />,
      image: "/images/venue/house-of-ott-anniversary-teddy-setup.jpg",
      locationTag: "Ravet, Pune",
      highlights: [
        "Illuminated 'Happy Anniversary' floral arch",
        "Cuddly teddy bears hugging heart & love decor",
        "Play your photos, videos, Netflix & OTT"
      ]
    },
    {
      id: "vip-grand",
      title: "VIP Grand Lounge",
      theaterId: "royal-ott-lounge",
      occasion: "Bride-to-be & Bachelorette",
      badge: "VIP Grand Hall",
      guests: "8 - 20 Guests",
      screen: "200\" IMAX Display",
      sound: "1200W Club Audio",
      priceText: "From ₹3,999",
      icon: <Crown className="w-5 h-5 text-amber-400" />,
      image: "/images/venue/house-of-ott-proposal-butterfly-setup.jpg",
      locationTag: "Ravet, Pune",
      highlights: [
        "Giant red floral heart wall & butterfly floor lamp",
        "200\" IMAX display with wireless karaoke mics",
        "Spacious celebration & party floor"
      ]
    },
    {
      id: "movie-gaming",
      title: "Movie Marathon & PS5 Gaming",
      theaterId: "blockbuster-arena",
      occasion: "Movie Date & OTT Chill",
      badge: "Gaming & Binge",
      guests: "3 - 8 Guests",
      screen: "180\" 4K Screen",
      sound: "1000W Immersive",
      priceText: "From ₹1,999",
      icon: <Gamepad2 className="w-5 h-5 text-cyan-400" />,
      image: "/images/venue/real-gaming-suite.jpg",
      locationTag: "Ravet, Pune",
      highlights: [
        "PlayStation 5 console with dual wireless controllers",
        "180\" low-latency 4K gaming & OTT streaming",
        "Outside snacks & drinks welcome"
      ]
    }
  ];

  const handleBookClick = (theaterId: string, occasion: string) => {
    if (onSelectEvent) {
      onSelectEvent(theaterId, occasion);
    }
    const bookElem = document.getElementById("book");
    if (bookElem) {
      bookElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="events" 
      aria-labelledby="events-heading" 
      className="py-14 sm:py-18 relative bg-[#06070A] border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider mb-3 text-amber-400 shadow-cinema-soft">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Celebration Packages</span>
          </div>
          <h2 id="events-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            Private Theater Packages
          </h2>
          <p className="text-sm text-gray-300">
            100% private suites in Ravet for your birthdays, anniversaries, and movie dates.
          </p>
        </div>

        {/* 2x2 Clean Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="group rounded-3xl overflow-hidden bg-[#0D101C] border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col shadow-cinema-soft hover:shadow-cinema-hover ring-1 ring-white/5"
            >
              {/* Card Image Banner */}
              <div className="relative h-52 xs:h-60 sm:h-72 w-full overflow-hidden bg-black">
                <Image
                  src={evt.image}
                  alt={evt.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-100"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D101C]/80 via-transparent to-transparent pointer-events-none" />

                {/* Badge Tag */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-amber-400 border border-amber-400/30 shadow-lg">
                    {evt.badge}
                  </span>
                </div>

                {/* Location Tag */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] font-medium bg-black/70 backdrop-blur-md text-gray-300 border border-white/10 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{evt.locationTag}</span>
                  </span>
                </div>

                {/* Key Spec Badges */}
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] sm:text-xs text-white z-10">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 font-semibold flex items-center gap-1 sm:gap-1.5 shadow-md">
                      <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                      <span>{evt.guests}</span>
                    </span>
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 font-semibold flex items-center gap-1 sm:gap-1.5 shadow-md">
                      <Video className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-400" />
                      <span>{evt.screen}</span>
                    </span>
                  </div>

                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 font-semibold flex items-center gap-1 sm:gap-1.5 shadow-md">
                    <Music className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" />
                    <span>{evt.sound}</span>
                  </span>
                </div>
              </div>

              {/* Card Content - Clean & Minimal */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 shrink-0 shadow-inner">
                      {evt.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      {evt.title}
                    </h3>
                  </div>

                  {/* Highlights Checklist */}
                  <div className="my-2.5 space-y-1.5 sm:space-y-2 border-t border-b border-white/5 py-3">
                    {evt.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-200">
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Simple Price & Reserve Button */}
                <div className="pt-2 flex items-center justify-between gap-2 sm:gap-3">
                  <div>
                    <span className="text-sm sm:text-base font-extrabold text-amber-400">{evt.priceText}</span>
                    <span className="text-[11px] sm:text-xs text-gray-400 ml-1 font-medium">(3 Hours)</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleBookClick(evt.theaterId, evt.occasion)}
                    className="shrink-0 py-2.5 px-3.5 sm:px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 border border-white/15 transition-all shadow-md group-hover:border-amber-400/40 min-h-[44px]"
                  >
                    <span>Reserve</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
