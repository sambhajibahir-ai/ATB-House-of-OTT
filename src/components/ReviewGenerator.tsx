"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Star, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Shuffle, 
  ArrowLeft, 
  CheckCircle2
} from "lucide-react";
import { 
  GOOGLE_REVIEW_URL, 
  GOOGLE_REVIEW_SEARCH_URL,
  REVIEW_OCCASIONS, 
  generateDynamicReview 
} from "@/data/reviewTemplates";
import { useTheme } from "@/context/ThemeContext";

export function ReviewGenerator() {
  const { config } = useTheme();

  // State for generator
  const [selectedOccasion, setSelectedOccasion] = useState<string>("birthday");
  const [variantIndex, setVariantIndex] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  // Generate review whenever occasion or variant index changes
  useEffect(() => {
    const occ = REVIEW_OCCASIONS.find((o) => o.id === selectedOccasion);
    const highlights = occ ? occ.defaultHighlights : ["screen", "sound", "decor"];
    const generated = generateDynamicReview(selectedOccasion, highlights, variantIndex);
    setReviewText(generated);
  }, [selectedOccasion, variantIndex]);

  // Handle Occasion Selection
  const handleSelectOccasion = (id: string) => {
    setSelectedOccasion(id);
    setVariantIndex(0);
    setCopied(false);
  };

  // Shuffle variant
  const handleShuffle = () => {
    setVariantIndex((prev) => prev + 1);
    setCopied(false);
  };

  // Copy to clipboard helper
  const copyToClipboard = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(reviewText);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = reviewText;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      return true;
    } catch (err) {
      console.warn("Clipboard copy failed:", err);
      setCopied(true);
      return false;
    }
  };

  // Handle primary action (copy + native link open)
  const handlePrimaryClick = () => {
    copyToClipboard();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
      
      {/* Top Bar: Return to Home & Google Rating */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors group p-1"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-white font-bold">4.9★</span>
          <span>(580+ Reviews)</span>
        </div>
      </div>

      {/* Main Focus Card */}
      <div className="rounded-3xl bg-[#0D101C] border border-white/15 p-5 sm:p-7 shadow-2xl ring-1 ring-white/10 text-left">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Google Review Helper</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Rate House of OTT on Google
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-md mx-auto">
            Choose what you celebrated, copy the ready 5-star draft, and jump straight into Google Reviews!
          </p>
        </div>

        {/* Step 1: Occasion Pills */}
        <div className="mb-5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2 text-center">
            Select Your Celebration:
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {REVIEW_OCCASIONS.map((occ) => {
              const isSelected = selectedOccasion === occ.id;
              return (
                <button
                  key={occ.id}
                  type="button"
                  onClick={() => handleSelectOccasion(occ.id)}
                  className={`p-2 sm:p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? "bg-amber-400 text-black border-amber-400 font-bold shadow-lg shadow-amber-400/25 scale-[1.02]"
                      : "bg-white/5 hover:bg-white/10 text-gray-300 border-white/10"
                  }`}
                >
                  <span className="text-lg sm:text-xl">{occ.icon}</span>
                  <span className="text-[11px] font-semibold leading-tight truncate w-full">
                    {occ.label.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Generated Review Draft Box */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
              <span className="text-xs font-bold text-white ml-1.5">5.0 Star Review Draft</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShuffle}
                className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                title="Shuffle review phrasing"
              >
                <Shuffle className="w-3.5 h-3.5 text-amber-400" />
                <span>Shuffle</span>
              </button>
              <button
                type="button"
                onClick={copyToClipboard}
                className="text-xs text-gray-300 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                title="Copy text only"
              >
                <Copy className="w-3.5 h-3.5 text-gray-400" />
                <span>Copy</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <textarea
              id="review-draft"
              rows={5}
              value={reviewText}
              onChange={(e) => {
                setReviewText(e.target.value);
                setCopied(false);
              }}
              className="w-full p-4 rounded-2xl bg-black/60 border border-white/15 text-white text-sm leading-relaxed focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors shadow-inner resize-none"
              placeholder="Your SEO review draft..."
            />
          </div>
        </div>

        {/* Copied Notification Badge */}
        {copied && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>Review draft copied!</strong> Now opening Google — tap 5 stars and paste (Ctrl+V / Long-press).</span>
          </div>
        )}

        {/* Primary Laser-Focus Button: Direct Native Link to Google's Write Review Dialog */}
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handlePrimaryClick}
          className={`w-full py-4 px-6 rounded-2xl font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-xl hover:scale-[1.01] active:scale-95 ${config.buttonClass}`}
        >
          {copied ? (
            <>
              <Check className="w-5 h-5 text-black" />
              <span>Review Copied • Open Google Review Box</span>
              <ExternalLink className="w-4 h-4 ml-0.5" />
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              <span>Copy Review &amp; Open Google</span>
              <ExternalLink className="w-4 h-4 ml-0.5" />
            </>
          )}
        </a>

        {/* 3-Step Clear Instructions Box */}
        <div className="mt-5 p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2">
            How to Post on Google in 3 Seconds:
          </div>
          <ol className="space-y-1.5 text-xs text-gray-300">
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-amber-400 text-black font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
              <span>Tap <strong>Copy Review &amp; Open Google</strong> above (copies text automatically).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-amber-400 text-black font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
              <span>On Google's review box, select <strong>5 Stars ⭐⭐⭐⭐⭐</strong>.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-amber-400 text-black font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
              <span>Paste (<kbd className="bg-white/10 px-1 py-0.2 rounded text-[11px]">Ctrl+V</kbd> or long-press paste) and click <strong>Post</strong>!</span>
            </li>
          </ol>
        </div>

        {/* Alternative direct Google Search popup link if local browser blocks direct intent */}
        <div className="text-center mt-4 space-y-1">
          <div>
            <a
              href={GOOGLE_REVIEW_SEARCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={copyToClipboard}
              className="text-[11px] text-gray-400 hover:text-amber-300 inline-flex items-center gap-1 transition-colors underline underline-offset-4"
            >
              <span>Review box didn't open? Click here to open via Google Search popup</span>
              <ExternalLink className="w-3 h-3 text-amber-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
