"use client";

import React, { useState } from "react";
import { MessageCircle, Phone, X, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";

export function QuickCallbackModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState("Birthday Party");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) return;

    // Send direct WhatsApp inquiry
    const text = encodeURIComponent(
      `Hi House of OTT Ravet! I'd like a quick callback about a ${occasion}. My name is ${name || "Guest"} (${phone}).`
    );
    const waUrl = `https://wa.me/919168530789?text=${text}`;

    setIsSuccess(true);
    setTimeout(() => {
      window.open(waUrl, "_blank");
      setIsOpen(false);
      setIsSuccess(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Trigger Pill on bottom-right (above CTAs) or Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 sm:bottom-24 sm:right-6 z-40 px-4 py-2.5 rounded-full bg-[#161B2E] hover:bg-[#1C233C] text-amber-300 border border-amber-500/40 shadow-2xl backdrop-blur-md flex items-center gap-2 text-xs font-bold transition-all hover:scale-105 active:scale-95"
        aria-label="Request 2-minute callback"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <MessageCircle className="w-4 h-4 text-emerald-400" />
        <span>Need Help? Instant WhatsApp Assistance</span>
      </button>

      {/* Modal Lightbox */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
        >
          <div className="relative w-full max-w-md rounded-3xl bg-[#0F121C] border border-white/20 p-6 sm:p-8 shadow-2xl text-left">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSuccess ? (
              <form onSubmit={handleSubmit}>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ravet Venue Support</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                  Get Instant Callback &amp; Quote
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed mb-5">
                  Have questions about custom decorations, outside food, or slots? Our venue coordinator will assist you right away.
                </p>

                <div className="space-y-3.5 mb-6">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                      WhatsApp Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                      Celebration Occasion
                    </label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full bg-[#121522] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      <option value="Birthday Party">Birthday Party</option>
                      <option value="Romantic Anniversary">Romantic Anniversary</option>
                      <option value="Surprise Proposal">Surprise Proposal</option>
                      <option value="Movie Date">Movie Date Night</option>
                      <option value="Bride-to-Be / Bachelorette">Bride-to-Be / Bachelorette</option>
                      <option value="PS5 Gaming Squad">PS5 Gaming Tournament</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-transform active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>Connect on WhatsApp Now</span>
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-gray-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Direct contact with House of OTT Ravet venue manager</span>
                </div>
              </form>
            ) : (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3 animate-bounce" />
                <h4 className="text-xl font-bold text-white mb-2">Connecting to WhatsApp...</h4>
                <p className="text-xs text-gray-300">
                  Opening WhatsApp chat with House of OTT Ravet coordinator now.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
