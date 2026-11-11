"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Wind, Cake, Flame, ArrowRight, ShieldCheck, SlidersHorizontal } from "lucide-react";

interface PartyRoomVisualizerProps {
  onApplySetup?: (theaterId: string, occasion: string, addons: string[]) => void;
}

const THEATERS_LIST = [
  {
    id: "cinema-suite",
    name: "The Red Carpet Suite",
    guests: "2 - 4 Guests",
    basePrice: 1499,
    screen: "150\" 4K Laser Screen",
    sound: "600W Dolby 5.1",
    image: "/images/venue/house-of-ott-anniversary-teddy-setup.jpg",
    badge: "Couple Favorite"
  },
  {
    id: "blockbuster-arena",
    name: "The Blockbuster Arena",
    guests: "5 - 10 Guests",
    basePrice: 2499,
    screen: "180\" 4K Acoustic Screen",
    sound: "1000W Dolby Atmos 7.1",
    image: "/images/venue/house-of-ott-birthday-neon-setup.jpg",
    badge: "Birthday Squads"
  },
  {
    id: "royal-ott-lounge",
    name: "The Royal OTT Lounge",
    guests: "8 - 20 Guests",
    basePrice: 3999,
    screen: "200\" IMAX Laser Screen",
    sound: "1200W Club Surround",
    image: "/images/venue/house-of-ott-proposal-butterfly-setup.jpg",
    badge: "VIP Grand Hall"
  }
];

const LIGHTING_THEMES = [
  {
    id: "ruby",
    label: "Romantic Ruby",
    color: "#E11D48",
    gradient: "from-rose-600/30 via-red-900/20 to-transparent",
    glowColor: "rgba(225, 29, 72, 0.4)",
  },
  {
    id: "gold",
    label: "Champagne Gold",
    color: "#F59E0B",
    gradient: "from-amber-500/30 via-yellow-900/20 to-transparent",
    glowColor: "rgba(245, 158, 11, 0.4)",
  },
  {
    id: "cyberpunk",
    label: "Cyberpunk Violet",
    color: "#9333EA",
    gradient: "from-purple-600/30 via-fuchsia-950/20 to-transparent",
    glowColor: "rgba(147, 51, 234, 0.4)",
  },
  {
    id: "azure",
    label: "Electric Azure",
    color: "#06B6D4",
    gradient: "from-cyan-500/30 via-blue-950/20 to-transparent",
    glowColor: "rgba(6, 182, 212, 0.4)",
  }
];

const OCCASIONS_LIST = [
  {
    id: "birthday",
    name: "Birthday Celebration",
    decorPrice: 400,
    decorText: "Neon 'Happy Birthday' Sign + Metallic Balloons + Cake Podium",
    icon: "🎂"
  },
  {
    id: "anniversary",
    name: "Romantic Anniversary",
    decorPrice: 400,
    decorText: "Heart-Shaped Balloon Arch + Candle Lanterns + Fairy Lights",
    icon: "💍"
  },
  {
    id: "proposal",
    name: "Surprise Proposal",
    decorPrice: 600,
    decorText: "Rose Petal Carpet + 'Marry Me' Neon Backdrop + Candle Walkway",
    icon: "🌹"
  },
  {
    id: "movie",
    name: "Movie Date & OTT Binge",
    decorPrice: 0,
    decorText: "Recliner Bed + Velvet Blankets + Giant 4K Screen Streaming",
    icon: "🎬"
  }
];

export function PartyRoomVisualizer({ onApplySetup }: PartyRoomVisualizerProps) {
  const [selectedTheater, setSelectedTheater] = useState(THEATERS_LIST[0]);
  const [selectedLight, setSelectedLight] = useState(LIGHTING_THEMES[0]);
  const [selectedOccasion, setSelectedOccasion] = useState(OCCASIONS_LIST[0]);
  const [fogActive, setFogActive] = useState(true);
  const [pyroActive, setPyroActive] = useState(false);
  const [cakeActive, setCakeActive] = useState(true);

  // Calculate pricing
  const theaterPrice = selectedTheater.basePrice;
  const decorPrice = selectedOccasion.decorPrice;
  const fogPrice = fogActive ? 399 : 0;
  const pyroPrice = pyroActive ? 499 : 0;
  const cakePrice = cakeActive ? 450 : 0;
  const totalPrice = theaterPrice + decorPrice + fogPrice + pyroPrice + cakePrice;
  const advanceToken = 750;
  const balanceAtVenue = totalPrice - advanceToken;

  const handleBookCurrentSetup = () => {
    const addons: string[] = [];
    if (fogActive) addons.push("fog-entry");
    if (pyroActive) addons.push("pyro-sparklers");
    if (cakeActive) addons.push("truffle-cake");

    if (onApplySetup) {
      onApplySetup(selectedTheater.id, selectedOccasion.name, addons);
    }

    const wizardElem = document.getElementById("book");
    if (wizardElem) {
      wizardElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="visualizer"
      aria-labelledby="visualizer-heading"
      className="py-20 relative bg-gradient-to-b from-[#07080B] via-[#0E111A] to-[#07080B] border-b border-white/10 overflow-hidden"
    >
      {/* Background radial glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[160px] pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: selectedLight.glowColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider mb-4 text-amber-400">
            <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Interactive 3D Studio Visualizer</span>
          </div>
          <h2 id="visualizer-heading" className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Customize Your Celebration Vibe
          </h2>
          <p className="text-base sm:text-lg text-gray-300">
            Switch rooms, tweak neon ambient colors, add cloud smoke effects, and see your private theater party come to life before reserving!
          </p>
        </div>

        {/* Visualizer Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Live Interactive Preview Stage (7 Cols) */}
          <div className="lg:col-span-7 bg-[#121522] rounded-3xl border border-white/15 p-4 sm:p-6 shadow-2xl relative overflow-hidden">
            {/* The Stage Screen */}
            <div className="relative h-[320px] sm:h-[420px] w-full rounded-2xl overflow-hidden bg-black shadow-inner border border-white/10">
              <Image
                src={selectedTheater.image}
                alt={`${selectedTheater.name} Visualizer Setup`}
                fill
                className="object-cover transition-all duration-700"
                priority
              />

              {/* Dynamic Neon Color Filter Overlay */}
              <div 
                className={`absolute inset-0 bg-gradient-to-t ${selectedLight.gradient} mix-blend-color-dodge transition-all duration-700 pointer-events-none`}
              />
              <div 
                className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 30%, ${selectedLight.glowColor} 0%, transparent 70%)`
                }}
              />

              {/* Fog FX Simulation Layer */}
              {fogActive && (
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/30 via-white/10 to-transparent blur-md pointer-events-none animate-pulse">
                  <div className="absolute inset-0 flex items-end justify-center pb-2">
                    <span className="text-[11px] font-bold text-white tracking-widest uppercase bg-black/60 px-3 py-1 rounded-full border border-white/20 backdrop-blur-md">
                      💨 Cloud Fog Active on Stage
                    </span>
                  </div>
                </div>
              )}

              {/* Stage Top Floating Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-20">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md text-xs font-bold text-white border border-white/20 shadow-lg">
                    {selectedTheater.name}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-wider shadow-md">
                    {selectedTheater.badge}
                  </span>
                </div>

                <div 
                  className="px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider backdrop-blur-md border shadow-lg flex items-center gap-1.5"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    color: selectedLight.color,
                    borderColor: selectedLight.color
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{selectedLight.label}</span>
                </div>
              </div>

              {/* Occasion Center Stage Tag */}
              <div className="absolute bottom-5 left-4 right-4 z-20">
                <div className="bg-black/85 backdrop-blur-md rounded-xl p-3 border border-white/20 shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{selectedOccasion.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{selectedOccasion.name}</span>
                        {selectedOccasion.decorPrice > 0 && (
                          <span className="text-[10px] text-amber-400 font-semibold">
                            (+₹{selectedOccasion.decorPrice} Setup)
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-gray-300 truncate max-w-[200px] sm:max-w-xs">
                        {selectedOccasion.decorText}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-[10px] text-gray-400 uppercase font-semibold">Screen Spec</div>
                    <div className="text-xs font-bold text-amber-300">{selectedTheater.screen}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage Quick Summary Metrics */}
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-gray-400">Audio System</div>
                <div className="text-xs font-bold text-white mt-0.5">{selectedTheater.sound}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-gray-400">Ideal Guests</div>
                <div className="text-xs font-bold text-white mt-0.5">{selectedTheater.guests}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-gray-400">Duration</div>
                <div className="text-xs font-bold text-amber-400 mt-0.5">3 Full Hours</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Interactive Customization Controls (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Control 1: Select Room */}
            <div className="p-5 rounded-2xl bg-[#111420] border border-white/10">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center justify-between">
                <span>1. Select Theater Room</span>
                <span className="text-[11px] text-gray-400 font-normal">Ravet, Pune</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {THEATERS_LIST.map((th) => (
                  <button
                    key={th.id}
                    onClick={() => setSelectedTheater(th)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedTheater.id === th.id
                        ? "bg-amber-500/10 border-amber-500 text-white shadow-md shadow-amber-950/30"
                        : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    <div className="text-xs font-bold">{th.name}</div>
                    <div className="text-[11px] text-amber-400 font-semibold mt-1">
                      ₹{th.basePrice}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{th.guests}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Select Neon Ambient Light */}
            <div className="p-5 rounded-2xl bg-[#111420] border border-white/10">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center justify-between">
                <span>2. Ambient Neon Lighting Vibe</span>
                <span className="text-[11px] text-gray-400 font-normal">Remote controlled</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {LIGHTING_THEMES.map((light) => (
                  <button
                    key={light.id}
                    onClick={() => setSelectedLight(light)}
                    className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                      selectedLight.id === light.id
                        ? "bg-white/15 border-white text-white font-bold shadow-lg"
                        : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                    }`}
                  >
                    <span 
                      className="w-4 h-4 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: light.color }}
                    />
                    <span className="text-xs truncate">{light.label.split(" ")[1]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: Occasion Celebration Setup */}
            <div className="p-5 rounded-2xl bg-[#111420] border border-white/10">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                3. Celebration Occasion &amp; Decor
              </div>
              <div className="grid grid-cols-2 gap-2">
                {OCCASIONS_LIST.map((occ) => (
                  <button
                    key={occ.id}
                    onClick={() => setSelectedOccasion(occ)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedOccasion.id === occ.id
                        ? "bg-rose-500/10 border-rose-500 text-white shadow-md shadow-rose-950/20"
                        : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      <span>{occ.icon}</span>
                      <span className="truncate">{occ.name}</span>
                    </div>
                    <div className="text-[10px] text-gray-400 mt-1">
                      {occ.decorPrice === 0 ? "Standard Setup" : `+₹${occ.decorPrice} Premium Decor`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Control 4: Special FX Toggles */}
            <div className="p-5 rounded-2xl bg-[#111420] border border-white/10">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                4. Enhance With Special Effects &amp; Cake
              </div>
              <div className="space-y-2">
                {/* Fog entry */}
                <label className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-colors">
                  <div className="flex items-center gap-2.5">
                    <Wind className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="text-xs font-bold text-white">Cloud Fog / Smoke Entry</div>
                      <div className="text-[10px] text-gray-400">Fairytale cloud entry effect (+₹399)</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={fogActive}
                    onChange={(e) => setFogActive(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 bg-black border-white/20"
                  />
                </label>

                {/* Cake */}
                <label className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-colors">
                  <div className="flex items-center gap-2.5">
                    <Cake className="w-4 h-4 text-rose-400" />
                    <div>
                      <div className="text-xs font-bold text-white">Half Kg Belgian Truffle Cake</div>
                      <div className="text-[10px] text-gray-400">Fresh eggless celebration cake (+₹450)</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={cakeActive}
                    onChange={(e) => setCakeActive(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 bg-black border-white/20"
                  />
                </label>

                {/* Cold Pyro */}
                <label className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-colors">
                  <div className="flex items-center gap-2.5">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-xs font-bold text-white">Cold Pyro Sparkler Guns (Pair)</div>
                      <div className="text-[10px] text-gray-400">100% safe indoor cake cutting sparklers (+₹499)</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={pyroActive}
                    onChange={(e) => setPyroActive(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 bg-black border-white/20"
                  />
                </label>
              </div>
            </div>

            {/* Total Price & Book CTA Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1A1D2B] to-[#121522] border-2 border-amber-500/40 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-xs text-gray-400 uppercase font-semibold">Total Package Price</div>
                  <div className="text-2xl font-black text-white flex items-baseline gap-2">
                    <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                    <span className="text-xs text-gray-400 font-normal">all inclusive</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">
                    Advance Token Only
                  </div>
                  <div className="text-lg font-extrabold text-amber-400">
                    ₹{advanceToken}
                  </div>
                  <div className="text-[10px] text-gray-400">
                    Balance ₹{balanceAtVenue} at venue
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleBookCurrentSetup}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-950/40 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Reserve This Setup (₹750 Advance)</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Hidden Charges • Instant WhatsApp Confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
