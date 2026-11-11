"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface StoryItem {
  id: string;
  label: string;
  tag: string;
  icon: string;
  image: string;
  headline: string;
  description: string;
  highlights: string[];
}

const STORIES: StoryItem[] = [
  {
    id: "fog-entry",
    label: "Cloud Fog Entry",
    tag: "Trending FX",
    icon: "💨",
    image: "/images/venue/cloud-fog-entrance-real.jpg",
    headline: "Dreamy Cloud Fog Entry",
    description: "Walk into your celebration walking on clouds. Our safe, odorless low-lying dry ice fog transforms the private theater into a dreamy Bollywood fairytale entrance.",
    highlights: ["Odorless & 100% Safe", "Synchronized Spotlight", "Perfect for Couple Entries & Surprise Reveals"]
  },
  {
    id: "proposal",
    label: "Surprise Proposals",
    tag: "Romantic",
    icon: "💍",
    image: "/images/venue/house-of-ott-anniversary-teddy-setup.jpg",
    headline: "Romantic Private Proposal Suite",
    description: "Rose petal carpets, soft glowing candles, 'Marry Me' neon backdrop, and your favorite love story or personal photo slideshow playing on a 150-inch 4K screen.",
    highlights: ["Custom Neon Sign Backdrop", "Couple Velvet Recliner Bed", "Personal Video Screening on 150\" Screen"]
  },
  {
    id: "birthday",
    label: "Birthday Bashes",
    tag: "Celebration",
    icon: "🎂",
    image: "/images/venue/house-of-ott-birthday-neon-setup.jpg",
    headline: "Epic Birthday Celebrations",
    description: "Celebrate your birthday with up to 20 best friends or family. High-energy party lighting, customized balloon arch, laser projection, and gourmet cake cutting stage.",
    highlights: ["Custom Age Neon Numbers", "Outside Cake & Food Allowed", "1000W Dolby Atmos Party Music"]
  },
  {
    id: "bride-to-be",
    label: "Bride-to-Be",
    tag: "Girl Gang",
    icon: "👰",
    image: "/images/venue/house-of-ott-proposal-butterfly-setup.jpg",
    headline: "Bride-To-Be & Bachelorette Party",
    description: "The ultimate private girls' night out! Chic pastel balloon decor, tiara props, pink neon photobooth backdrop, and dance to your playlist with complete privacy.",
    highlights: ["100% Private & Safe", "Selfie Photobooth Corner", "Karaoke Microphones Included"]
  },
  {
    id: "movie-date",
    label: "Cozy Movie Date",
    tag: "Couple Special",
    icon: "🎬",
    image: "/images/venue/house-of-ott-anniversary-teddy-setup.jpg",
    headline: "Couple Private Cinema Date",
    description: "Skip crowded public movie halls. Snuggle into plush couple recliner beds, order your favorite food on Swiggy/Zomato, and stream any OTT movie on a giant 4K screen.",
    highlights: ["Full OTT Access (Netflix/Prime)", "Recliner Bed with Blankets & Cushions", "Zero Interruption & Complete Privacy"]
  },
  {
    id: "ps5-gaming",
    label: "PS5 Gaming Arena",
    tag: "Gaming",
    icon: "🎮",
    image: "/images/venue/real-gaming-suite.jpg",
    headline: "200\" 4K Console Gaming Battles",
    description: "Hook up PS5 or Nintendo Switch on a massive 200-inch laser screen with 0.1ms low latency and 1200W surround audio. FIFA, Mortal Kombat & Call of Duty tournaments with friends.",
    highlights: ["Low Latency Laser Projection", "Dual Wireless Controllers", "Tournament Seating for Squads"]
  }
];

export function StoryHighlights() {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  // Auto-progress story timer
  useEffect(() => {
    if (activeStoryIndex === null) {
      setProgress(0);
      return;
    }

    const intervalTime = 50;
    const totalTime = 6000;
    const step = (intervalTime / totalTime) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (activeStoryIndex < STORIES.length - 1) {
            setActiveStoryIndex(activeStoryIndex + 1);
            return 0;
          } else {
            setActiveStoryIndex(null);
            return 0;
          }
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [activeStoryIndex]);

  const openStory = (index: number) => {
    setActiveStoryIndex(index);
    setProgress(0);
  };

  const closeStory = () => {
    setActiveStoryIndex(null);
    setProgress(0);
  };

  const nextStory = () => {
    if (activeStoryIndex !== null && activeStoryIndex < STORIES.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
      setProgress(0);
    } else {
      closeStory();
    }
  };

  const prevStory = () => {
    if (activeStoryIndex !== null && activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
      setProgress(0);
    }
  };

  return (
    <div className="w-full py-3.5 border-b border-white/10 bg-[#07080B]/90 backdrop-blur-md sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span className="text-xs font-bold tracking-wider uppercase text-gray-300">
              Celebration Highlights &amp; Vibe Reels
            </span>
          </div>
          <span className="text-[11px] text-amber-400/80 font-medium hidden sm:inline-block">
            Tap a story circle to preview live party setups
          </span>
        </div>

        {/* Story Circles Row */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-1 scrollbar-none scroll-smooth">
          {STORIES.map((story, idx) => (
            <button
              key={story.id}
              onClick={() => openStory(idx)}
              className="group flex flex-col items-center shrink-0 focus:outline-none text-left"
              aria-label={`View story: ${story.label}`}
            >
              {/* Outer Gradient Ring */}
              <div className="relative p-[2.5px] rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-amber-200 group-hover:scale-105 transition-transform duration-200 shadow-md">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-black p-[2px]">
                  <Image
                    src={story.image}
                    alt={story.label}
                    fill
                    className="object-cover rounded-full group-hover:opacity-90"
                    sizes="64px"
                  />
                  {/* Badge Emoji */}
                  <span className="absolute bottom-0 right-0 text-xs sm:text-sm bg-black/80 rounded-full p-0.5 border border-white/20">
                    {story.icon}
                  </span>
                </div>
              </div>

              {/* Story Title */}
              <span className="mt-1.5 text-[11px] sm:text-xs font-semibold text-gray-300 group-hover:text-amber-400 transition-colors text-center truncate max-w-[80px]">
                {story.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Story Viewer Lightbox Modal */}
      {activeStoryIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/95 backdrop-blur-xl animate-fade-in"
        >
          <div className="relative w-full h-full sm:h-auto sm:max-h-[85vh] sm:max-w-md rounded-none sm:rounded-3xl bg-[#0F121C] border-0 sm:border border-white/20 overflow-hidden flex flex-col shadow-2xl">
            {/* Top Progress Bars */}
            <div className="absolute top-3 left-3 right-3 z-30 flex items-center gap-1.5">
              {STORIES.map((_, i) => (
                <div
                  key={i}
                  className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden"
                >
                  <div
                    className="h-full bg-amber-400 transition-all ease-linear"
                    style={{
                      width:
                        i < activeStoryIndex
                          ? "100%"
                          : i === activeStoryIndex
                          ? `${progress}%`
                          : "0%"
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Story Top Bar */}
            <div className="absolute top-7 left-4 right-4 z-30 flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full overflow-hidden relative border border-amber-400">
                  <Image
                    src={STORIES[activeStoryIndex].image}
                    alt="House of OTT"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <span>House of OTT Ravet</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                      {STORIES[activeStoryIndex].tag}
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-300">
                    Live celebration preview
                  </div>
                </div>
              </div>

              <button
                onClick={closeStory}
                className="p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm transition-colors"
                aria-label="Close story"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Visual Image */}
            <div className="relative flex-1 min-h-[350px] sm:min-h-[420px] w-full bg-black">
              <Image
                src={STORIES[activeStoryIndex].image}
                alt={STORIES[activeStoryIndex].headline}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F121C] via-transparent to-black/40" />

              {/* Navigation Click Zones */}
              <button
                onClick={prevStory}
                className="absolute left-0 top-0 bottom-0 w-1/3 z-20 opacity-0 cursor-pointer"
                aria-label="Previous story"
              />
              <button
                onClick={nextStory}
                className="absolute right-0 top-0 bottom-0 w-1/3 z-20 opacity-0 cursor-pointer"
                aria-label="Next story"
              />

              {/* Previous/Next arrow buttons */}
              {activeStoryIndex > 0 && (
                <button
                  onClick={prevStory}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/50 text-white hover:bg-black/80"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              {activeStoryIndex < STORIES.length - 1 && (
                <button
                  onClick={nextStory}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/50 text-white hover:bg-black/80"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Bottom Caption & Action */}
            <div className="p-5 bg-[#0F121C] relative z-30 border-t border-white/10">
              <h4 className="text-lg font-bold text-white mb-1.5 flex items-center gap-2">
                <span>{STORIES[activeStoryIndex].icon}</span>
                <span>{STORIES[activeStoryIndex].headline}</span>
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                {STORIES[activeStoryIndex].description}
              </p>

              {/* Highlights pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {STORIES[activeStoryIndex].highlights.map((h, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-amber-300 font-medium"
                  >
                    ✓ {h}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <a
                href="#book"
                onClick={closeStory}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Book This Vibe (Advance ₹750)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
