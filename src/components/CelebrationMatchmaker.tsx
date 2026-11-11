"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, RotateCcw, Check } from "lucide-react";

interface CelebrationMatchmakerProps {
  onApplyRecommendation?: (theaterId: string, occasion: string, addons: string[]) => void;
}

export function CelebrationMatchmaker({ onApplyRecommendation }: CelebrationMatchmakerProps) {
  const [step, setStep] = useState<number>(1);
  const [who, setWho] = useState<"couple" | "squad" | "family">("couple");
  const [vibe, setVibe] = useState<"romantic" | "birthday" | "binge">("romantic");
  const [slot, setSlot] = useState<"afternoon" | "evening" | "night">("evening");

  const getRecommendation = () => {
    let theaterId = "cinema-suite";
    let theaterName = "The Red Carpet Suite";
    let occasion = "Romantic Anniversary";
    let addons = ["fog-entry", "surprise-video"];
    let addonText = "Cloud Fog Entry + Personal Video on Giant Screen";
    let image = "/images/venue/house-of-ott-anniversary-teddy-setup.jpg";
    let estimatedTotal = 2298;

    if (who === "couple") {
      theaterId = "cinema-suite";
      theaterName = "The Red Carpet Suite";
      image = "/images/venue/house-of-ott-anniversary-teddy-setup.jpg";
      if (vibe === "romantic") {
        occasion = "Romantic Surprise Proposal / Anniversary";
        addons = ["fog-entry", "truffle-cake", "surprise-video"];
        addonText = "Cloud Fog Entry + Belgian Truffle Cake + Giant Screen Video";
        estimatedTotal = 2348;
      } else if (vibe === "birthday") {
        occasion = "Couple Birthday Celebration";
        addons = ["truffle-cake", "fog-entry"];
        addonText = "Birthday Decor + Fresh Cake + Fog Entry";
        estimatedTotal = 2349;
      } else {
        occasion = "Private Movie Date";
        addons = ["popcorn-tub"];
        addonText = "Plush Velvet Recliner Bed + Netflix 4K + Gourmet Popcorn";
        estimatedTotal = 1699;
      }
    } else if (who === "squad") {
      theaterId = "blockbuster-arena";
      theaterName = "The Blockbuster Arena";
      image = "/images/venue/house-of-ott-birthday-neon-setup.jpg";
      if (vibe === "birthday") {
        occasion = "Squad Birthday Bash";
        addons = ["fog-entry", "pyro-sparklers", "truffle-cake"];
        addonText = "Custom Neon Age Sign + Cloud Fog + Cold Pyro Guns + Cake";
        estimatedTotal = 3848;
      } else {
        occasion = "Friends OTT Movie & PS5 Gaming";
        addons = ["fog-entry"];
        addonText = "180\" Laser Screen + 1000W Dolby Atmos + Fog Reveal";
        estimatedTotal = 2898;
      }
    } else {
      theaterId = "royal-ott-lounge";
      theaterName = "The Royal OTT Lounge";
      image = "/images/venue/house-of-ott-proposal-butterfly-setup.jpg";
      occasion = vibe === "birthday" ? "VIP Birthday Party" : "Grand Family Gathering";
      addons = ["fog-entry", "pyro-sparklers", "truffle-cake"];
      addonText = "200\" Screen + Dual Karaoke Mics + Full Balloon Decor + Cloud Fog";
      estimatedTotal = 5348;
    }

    return {
      theaterId,
      theaterName,
      occasion,
      addons,
      addonText,
      image,
      estimatedTotal,
      advanceToken: 750,
      balance: estimatedTotal - 750
    };
  };

  const rec = getRecommendation();

  const handleBookMatch = () => {
    if (onApplyRecommendation) {
      onApplyRecommendation(rec.theaterId, rec.occasion, rec.addons);
    }
    const bookElem = document.getElementById("book");
    if (bookElem) {
      bookElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const resetQuiz = () => {
    setStep(1);
    setWho("couple");
    setVibe("romantic");
    setSlot("evening");
  };

  return (
    <section 
      id="matchmaker" 
      aria-labelledby="matchmaker-heading"
      className="py-16 relative bg-[#07080B] border-b border-white/10"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-b from-[#111422] to-[#0A0C14] border border-white/15 p-6 sm:p-10 shadow-2xl relative">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider mb-3 text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>30-Second Party Matchmaker</span>
            </div>
            <h2 id="matchmaker-heading" className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Find Your Perfect Theater Package
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-2">
              Answer 3 quick questions to get the exact room, decor &amp; timing recommendation for your budget.
            </p>
          </div>

          {/* Stepper Progress */}
          {step <= 3 && (
            <div className="flex items-center justify-center gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    s === step
                      ? "w-12 bg-amber-400"
                      : s < step
                      ? "w-8 bg-amber-500/50"
                      : "w-8 bg-white/10"
                  }`}
                />
              ))}
            </div>
          )}

          {/* QUESTION 1 */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-lg font-bold text-white text-center mb-6">
                Step 1: Who are you planning to celebrate with?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => setWho("couple")}
                  className={`p-5 rounded-2xl border text-center transition-all ${
                    who === "couple"
                      ? "bg-amber-500/10 border-amber-500 shadow-lg text-white"
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <div className="text-3xl mb-2">💑</div>
                  <div className="font-bold text-sm">Just the 2 of Us</div>
                  <div className="text-xs text-gray-400 mt-1">Couples, Anniversary, Proposals, Dates</div>
                </button>

                <button
                  type="button"
                  onClick={() => setWho("squad")}
                  className={`p-5 rounded-2xl border text-center transition-all ${
                    who === "squad"
                      ? "bg-amber-500/10 border-amber-500 shadow-lg text-white"
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <div className="text-3xl mb-2">🎉</div>
                  <div className="font-bold text-sm">Friend Squad (3 - 6)</div>
                  <div className="text-xs text-gray-400 mt-1">Birthdays, Bride-to-be, Movie Binge</div>
                </button>

                <button
                  type="button"
                  onClick={() => setWho("family")}
                  className={`p-5 rounded-2xl border text-center transition-all ${
                    who === "family"
                      ? "bg-amber-500/10 border-amber-500 shadow-lg text-white"
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <div className="text-3xl mb-2">👑</div>
                  <div className="font-bold text-sm">Big Gang / Family (7 - 20)</div>
                  <div className="text-xs text-gray-400 mt-1">Mega Birthdays, Receptions, Reunions</div>
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* QUESTION 2 */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h3 className="text-lg font-bold text-white text-center mb-6">
                Step 2: What is the main vibe you want to create?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => setVibe("romantic")}
                  className={`p-5 rounded-2xl border text-center transition-all ${
                    vibe === "romantic"
                      ? "bg-rose-500/10 border-rose-500 shadow-lg text-white"
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <div className="text-3xl mb-2">🌹</div>
                  <div className="font-bold text-sm">Romantic &amp; Intimate</div>
                  <div className="text-xs text-gray-400 mt-1">Candles, Rose Petals &amp; Heart Lights</div>
                </button>

                <button
                  type="button"
                  onClick={() => setVibe("birthday")}
                  className={`p-5 rounded-2xl border text-center transition-all ${
                    vibe === "birthday"
                      ? "bg-rose-500/10 border-rose-500 shadow-lg text-white"
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <div className="text-3xl mb-2">🎂</div>
                  <div className="font-bold text-sm">Energetic Birthday Bash</div>
                  <div className="text-xs text-gray-400 mt-1">Neon Age Numbers, Fog &amp; Cake Stage</div>
                </button>

                <button
                  type="button"
                  onClick={() => setVibe("binge")}
                  className={`p-5 rounded-2xl border text-center transition-all ${
                    vibe === "binge"
                      ? "bg-rose-500/10 border-rose-500 shadow-lg text-white"
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <div className="text-3xl mb-2">🍿</div>
                  <div className="font-bold text-sm">Chill OTT Movie Marathon</div>
                  <div className="text-xs text-gray-400 mt-1">Popcorn, Netflix &amp; Recliner Comfort</div>
                </button>
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-gray-300 font-semibold"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* QUESTION 3 */}
          {step === 3 && (
            <div className="animate-fade-in">
              <h3 className="text-lg font-bold text-white text-center mb-6">
                Step 3: What time of day suits you best?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => setSlot("afternoon")}
                  className={`p-5 rounded-2xl border text-center transition-all ${
                    slot === "afternoon"
                      ? "bg-cyan-500/10 border-cyan-500 shadow-lg text-white"
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <div className="text-3xl mb-2">☀️</div>
                  <div className="font-bold text-sm">Afternoon Matinee</div>
                  <div className="text-xs text-gray-400 mt-1">11:00 AM - 5:00 PM (Great for relaxed dates)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSlot("evening")}
                  className={`p-5 rounded-2xl border text-center transition-all ${
                    slot === "evening"
                      ? "bg-cyan-500/10 border-cyan-500 shadow-lg text-white"
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <div className="text-3xl mb-2">🌆</div>
                  <div className="font-bold text-sm">Prime Sunset &amp; Evening</div>
                  <div className="text-xs text-gray-400 mt-1">5:30 PM - 8:30 PM (Most popular celebration slot)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSlot("night")}
                  className={`p-5 rounded-2xl border text-center transition-all ${
                    slot === "night"
                      ? "bg-cyan-500/10 border-cyan-500 shadow-lg text-white"
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <div className="text-3xl mb-2">🌙</div>
                  <div className="font-bold text-sm">Late Night VIP Party</div>
                  <div className="text-xs text-gray-400 mt-1">9:00 PM - 12:30 AM (Midnight cake cutting special)</div>
                </button>
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-gray-300 font-semibold"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>See My Match</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: RECOMMENDATION RESULT CARD */}
          {step === 4 && (
            <div className="animate-fade-in">
              <div className="text-center mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                  🎉 100% Match Found For You
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-2">
                  {rec.theaterName} + {rec.occasion}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#0E111C] rounded-2xl border border-white/15 p-4 sm:p-6 mb-6">
                <div className="md:col-span-5 relative h-48 sm:h-auto rounded-xl overflow-hidden bg-black">
                  <Image
                    src={rec.image}
                    alt={rec.theaterName}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-xs text-white font-bold">
                    Ravet, Pune Venue
                  </div>
                </div>

                <div className="md:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">
                      Recommended Package Includes:
                    </div>
                    <ul className="space-y-1.5 text-xs text-gray-300 mb-4">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>3 Hours Private Theater Booking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{rec.addonText}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>100% Private Room with Couple Recliners &amp; AC</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Outside Food Allowed (Zomato / Swiggy / Home Food)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-gray-400">Estimated Total</div>
                      <div className="text-xl font-black text-white">₹{rec.estimatedTotal}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-amber-400 font-bold uppercase">Advance Token</div>
                      <div className="text-lg font-extrabold text-amber-400">₹{rec.advanceToken}</div>
                      <div className="text-[10px] text-gray-400">Balance ₹{rec.balance} at venue</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={handleBookMatch}
                  className="w-full sm:flex-1 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Reserve This Match (Advance ₹750)</span>
                </button>
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="w-full sm:w-auto px-4 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-gray-300 font-semibold text-xs flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
