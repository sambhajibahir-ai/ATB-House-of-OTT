"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, Square, Radio, Activity } from "lucide-react";

export function SoundExperienceDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePreset, setActivePreset] = useState<"action" | "romantic" | "party">("action");
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);

  const [eqHeights, setEqHeights] = useState<number[]>([15, 30, 45, 60, 80, 50, 70, 95, 65, 40, 25, 15]);

  useEffect(() => {
    let animId: number;
    if (isPlaying) {
      const interval = setInterval(() => {
        setEqHeights((prev) =>
          prev.map(() => Math.floor(Math.random() * 85) + 15)
        );
      }, 100);

      return () => clearInterval(interval);
    } else {
      setEqHeights([10, 15, 20, 25, 20, 15, 25, 30, 20, 15, 10, 8]);
    }
  }, [isPlaying]);

  const stopAudio = () => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.1);
      setTimeout(() => {
        if (oscillatorRef.current) {
          try {
            oscillatorRef.current.stop();
            oscillatorRef.current.disconnect();
          } catch {
            // ignore
          }
          oscillatorRef.current = null;
        }
        setIsPlaying(false);
      }, 120);
    } else {
      setIsPlaying(false);
    }
  };

  const playSyntheticAudio = (type: "action" | "romantic" | "party") => {
    try {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
        } catch {
          // ignore
        }
      }

      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = "lowpass";
      gain.gain.setValueAtTime(0.01, ctx.currentTime);

      if (type === "action") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 1.5);
        filter.frequency.setValueAtTime(250, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 3.5);
      } else if (type === "romantic") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(330, ctx.currentTime + 2);
        filter.frequency.setValueAtTime(600, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 4);
      } else {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(90, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.6);
        filter.frequency.setValueAtTime(400, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 3);
      }

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
      filterNodeRef.current = filter;

      setIsPlaying(true);
      setActivePreset(type);

      const duration = type === "action" ? 3600 : type === "romantic" ? 4100 : 3100;
      setTimeout(() => {
        setIsPlaying(false);
      }, duration);
    } catch {
      setIsPlaying(true);
      setActivePreset(type);
      setTimeout(() => setIsPlaying(false), 4000);
    }
  };

  return (
    <section 
      aria-labelledby="audio-experience-heading"
      className="py-16 relative bg-[#090B12] border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-r from-[#121524] via-[#161A2E] to-[#121524] border border-amber-500/20 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Background audio waves decorative glow */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Heading & Hardware Specs */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Radio className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                <span>Dolby Atmos 1200W Spatial Audio &amp; 4K Laser Projection</span>
              </div>

              <h2 id="audio-experience-heading" className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                Feel Every Subwoofer Rumble &amp; Whisper
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
                Most home theaters and portable speakers distort sound. At House of OTT Ravet, each private suite features studio-grade acoustic foam wall treatment, custom dual subwoofers, and crystal-clear dialogue tuning so dialogue never gets drowned out by background explosions.
              </p>

              {/* Hardware Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-amber-400 font-extrabold text-lg">1200W</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">Surround Power</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-rose-400 font-extrabold text-lg">7.1 Atmos</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">Spatial Audio</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-cyan-400 font-extrabold text-lg">200 Inch</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">4K HDR Display</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-emerald-400 font-extrabold text-lg">0.1ms</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">Gaming Latency</div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Sound Player Card */}
            <div className="lg:col-span-5 bg-[#0A0C14] rounded-2xl border border-white/15 p-6 shadow-xl text-center">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-400" />
                  <span>Interactive Sound Simulator</span>
                </div>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  isPlaying ? "bg-emerald-500/20 text-emerald-300 animate-pulse" : "bg-white/10 text-gray-400"
                }`}>
                  {isPlaying ? "● Sound Active" : "Click to Test"}
                </span>
              </div>

              {/* Dancing Frequency Spectrum Equalizer */}
              <div className="h-28 rounded-xl bg-black/60 border border-white/10 p-3 flex items-end justify-between gap-1.5 mb-5 shadow-inner">
                {eqHeights.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t transition-all duration-100 ease-out"
                    style={{
                      height: `${h}%`,
                      background: isPlaying
                        ? `linear-gradient(to top, #F59E0B, #E11D48)`
                        : "rgba(255, 255, 255, 0.15)"
                    }}
                  />
                ))}
              </div>

              {/* Sound Mode Buttons */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => playSyntheticAudio("action")}
                  className={`p-2 rounded-xl text-xs font-semibold border transition-all ${
                    activePreset === "action" && isPlaying
                      ? "bg-rose-500/20 border-rose-500 text-rose-300 shadow-md"
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  💣 Action Bass
                </button>
                <button
                  type="button"
                  onClick={() => playSyntheticAudio("romantic")}
                  className={`p-2 rounded-xl text-xs font-semibold border transition-all ${
                    activePreset === "romantic" && isPlaying
                      ? "bg-amber-500/20 border-amber-500 text-amber-300 shadow-md"
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  🎻 Romantic Glide
                </button>
                <button
                  type="button"
                  onClick={() => playSyntheticAudio("party")}
                  className={`p-2 rounded-xl text-xs font-semibold border transition-all ${
                    activePreset === "party" && isPlaying
                      ? "bg-purple-500/20 border-purple-500 text-purple-300 shadow-md"
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  ⚡ Club Beat
                </button>
              </div>

              {/* Main Play / Stop Button */}
              {isPlaying ? (
                <button
                  type="button"
                  onClick={stopAudio}
                  className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Square className="w-4 h-4 fill-white" />
                  <span>Stop Sound Simulator</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => playSyntheticAudio("action")}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 transition-transform active:scale-95"
                >
                  <Volume2 className="w-4 h-4 text-slate-950" />
                  <span>Test 1200W Sound Experience</span>
                </button>
              )}

              <div className="mt-3 text-[11px] text-gray-400">
                🔊 Tip: Turn on device volume or use headphones for deep sub-bass response!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
