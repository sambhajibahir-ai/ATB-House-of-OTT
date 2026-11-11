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
  MapPin, 
  ThumbsUp, 
  MessageSquare, 
  ArrowLeft, 
  ArrowRight,
  Heart,
  ShieldCheck
} from "lucide-react";
import { 
  GOOGLE_REVIEW_URL, 
  REVIEW_OCCASIONS, 
  REVIEW_HIGHLIGHTS, 
  PRE_CRAFTED_REVIEWS, 
  generateDynamicReview,
  PreCraftedReview 
} from "@/data/reviewTemplates";
import { useTheme } from "@/context/ThemeContext";

export function ReviewGenerator() {
  const { config } = useTheme();

  // State for generator
  const [selectedOccasion, setSelectedOccasion] = useState<string>("birthday");
  const [selectedHighlights, setSelectedHighlights] = useState<string[]>([
    "screen",
    "sound",
    "decor"
  ]);
  const [variantIndex, setVariantIndex] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  // Generate review whenever occasion, highlights, or variant index changes
  useEffect(() => {
    const generated = generateDynamicReview(selectedOccasion, selectedHighlights, variantIndex);
    setReviewText(generated);
  }, [selectedOccasion, selectedHighlights, variantIndex]);

  // Handle Occasion Selection
  const handleSelectOccasion = (id: string) => {
    setSelectedOccasion(id);
    const occ = REVIEW_OCCASIONS.find((o) => o.id === id);
    if (occ) {
      setSelectedHighlights(occ.defaultHighlights);
    }
    setVariantIndex(0);
    setCopied(false);
  };

  // Toggle Highlight Chip
  const toggleHighlight = (id: string) => {
    setSelectedHighlights((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
    setCopied(false);
  };

  // Shuffle variant
  const handleShuffle = () => {
    setVariantIndex((prev) => prev + 1);
    setCopied(false);
  };

  // Primary Copy & Go to Google Action
  const handleCopyAndGoToGoogle = async (textToCopy: string, cardId: string = "main") => {
    try {
      if (navigator?.clipboard) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
    } catch (err) {
      console.warn("Clipboard copy failed, opening URL:", err);
    }

    if (cardId === "main") {
      setCopied(true);
    } else {
      setCopiedId(cardId);
      setTimeout(() => setCopiedId(null), 3500);
    }
    setShowInstructions(true);

    // Open Google Review Link in a new tab
    window.open(GOOGLE_REVIEW_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Top Breadcrumb & Return to Site */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
          <span>Back to House of OTT</span>
        </Link>

        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-amber-400/40 text-xs font-semibold text-gray-200 transition-all shadow-cinema-soft"
        >
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-white font-bold">4.9★</span>
          <span className="text-gray-400">580+ Google Reviews</span>
          <ExternalLink className="w-3 h-3 text-amber-400 ml-1" />
        </a>
      </div>

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider mb-3 text-amber-400 shadow-cinema-soft">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Instant Google Review Helper</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
          Share Your Celebration Review
        </h1>
        <p className="text-sm sm:text-base text-gray-300">
          Loved your private theater experience at House of OTT Ravet? 
          Select what you celebrated below, click <strong className="text-amber-400">Copy &amp; Go to Google</strong>, and paste your review in 5 seconds!
        </p>
      </div>

      {/* Instructions Popup Banner (Appears after user clicks Copy) */}
      {showInstructions && (
        <div className="mb-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-[#0D101C] to-emerald-950/60 border border-emerald-500/40 shadow-2xl animate-fade-in text-left">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>Review Copied to Clipboard!</span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">Google Tab Opened</span>
                </h3>
                <p className="text-xs text-gray-300 mt-0.5">
                  Follow these 3 quick steps in the Google window that just opened:
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowInstructions(false)}
              className="text-gray-400 hover:text-white text-xs underline shrink-0"
            >
              Dismiss
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10 text-xs">
            <div className="p-3 rounded-2xl bg-black/40 border border-white/10">
              <span className="font-bold text-amber-400 block mb-1">Step 1: Rate 5 Stars</span>
              <span className="text-gray-300">Click the 5th star on Google to leave a 5-star rating ⭐⭐⭐⭐⭐</span>
            </div>
            <div className="p-3 rounded-2xl bg-black/40 border border-white/10">
              <span className="font-bold text-amber-400 block mb-1">Step 2: Paste Your Review</span>
              <span className="text-gray-300">Press <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white">Ctrl + V</kbd> (or long-press &amp; tap Paste on phone).</span>
            </div>
            <div className="p-3 rounded-2xl bg-black/40 border border-white/10">
              <span className="font-bold text-amber-400 block mb-1">Step 3: Click 'Post'</span>
              <span className="text-gray-300">Hit Post! Thank you so much for supporting House of OTT Ravet! 💖</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Interactive Review Generator Card */}
      <div className="rounded-3xl bg-[#0D101C] border border-white/15 p-6 sm:p-8 shadow-2xl ring-1 ring-white/10 mb-12">
        
        {/* Step 1: Occasion Selector */}
        <div className="mb-6">
          <label className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-3">
            1. What Did You Celebrate?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {REVIEW_OCCASIONS.map((occ) => {
              const isSelected = selectedOccasion === occ.id;
              return (
                <button
                  key={occ.id}
                  type="button"
                  onClick={() => handleSelectOccasion(occ.id)}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                    isSelected
                      ? "bg-amber-400 text-black border-amber-400 font-bold shadow-lg shadow-amber-400/20 scale-[1.02]"
                      : "bg-white/5 hover:bg-white/10 text-gray-300 border-white/10"
                  }`}
                >
                  <span className="text-xl">{occ.icon}</span>
                  <span className="text-xs truncate w-full">{occ.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Highlight Chips */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
              2. What Features Did You Love? (Select Any)
            </label>
            <span className="text-[11px] text-gray-400">Click to toggle</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {REVIEW_HIGHLIGHTS.map((hl) => {
              const isSelected = selectedHighlights.includes(hl.id);
              return (
                <button
                  key={hl.id}
                  type="button"
                  onClick={() => toggleHighlight(hl.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-white/15 border-amber-400/60 text-white shadow-sm"
                      : "bg-white/5 border-white/5 text-gray-400 hover:text-gray-200 hover:bg-white/10"
                  }`}
                >
                  {isSelected ? (
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-gray-600 block" />
                  )}
                  <span>{hl.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Review Preview & Editable Box */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="review-textarea" className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
              3. Auto-Generated SEO Review (Feel Free To Edit)
            </label>
            
            <button
              type="button"
              onClick={handleShuffle}
              className="text-xs text-gray-300 hover:text-amber-400 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              title="Generate alternative phrasing"
            >
              <Shuffle className="w-3.5 h-3.5 text-amber-400" />
              <span>Shuffle Phrasing</span>
            </button>
          </div>

          <div className="relative">
            <textarea
              id="review-textarea"
              rows={5}
              value={reviewText}
              onChange={(e) => {
                setReviewText(e.target.value);
                setCopied(false);
              }}
              className="w-full p-4 rounded-2xl bg-black/60 border border-white/15 text-white text-sm sm:text-base leading-relaxed focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors shadow-inner resize-y"
              placeholder="Your SEO review will generate here..."
            />

            <div className="absolute bottom-3 right-3 text-[11px] text-gray-500 pointer-events-none">
              {reviewText.length} characters
            </div>
          </div>
        </div>

        {/* Big Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5">
          <button
            type="button"
            onClick={() => handleCopyAndGoToGoogle(reviewText, "main")}
            className={`w-full sm:flex-1 py-4 px-6 rounded-2xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-xl hover:scale-[1.01] active:scale-95 ${config.buttonClass}`}
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-black" />
                <span>Copied! Opening Google Reviews...</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>Copy &amp; Go To Google Review (5★)</span>
                <ExternalLink className="w-4 h-4" />
              </>
            )}
          </button>

          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/15 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            <span>Write from scratch on Google</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          </a>
        </div>
      </div>

      {/* Pre-Crafted Ready-to-Copy Reviews Grid */}
      <div className="mt-14">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            Or Choose A Ready-Made Review
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Pick any pre-written 5-star review below. One click copies the review and opens the Google review dialog.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRE_CRAFTED_REVIEWS.map((card) => {
            const isCardCopied = copiedId === card.id;
            return (
              <div
                key={card.id}
                className="rounded-3xl bg-[#0D101C] border border-white/10 hover:border-amber-400/40 p-6 flex flex-col justify-between transition-all duration-300 shadow-cinema-soft hover:shadow-cinema-hover group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-amber-400 border border-white/10">
                      {card.occasion}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(card.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                    "{card.text}"
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyAndGoToGoogle(card.text, card.id)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all border ${
                    isCardCopied
                      ? "bg-emerald-500 text-black border-emerald-500 font-extrabold"
                      : "bg-white/10 hover:bg-white/20 text-white border-white/15 group-hover:border-amber-400/40"
                  }`}
                >
                  {isCardCopied ? (
                    <>
                      <Check className="w-4 h-4 text-black" />
                      <span>Copied! Opening Google...</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-400" />
                      <span>Copy &amp; Open Google</span>
                      <ExternalLink className="w-3 h-3 text-gray-400" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust & Location Footer Card */}
      <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>Sector 29, Ravet, Pune</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            House of OTT Private Theater
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Prime Ville, Plot 4, Near OYO, Sector 29, Ravet, PCMC Pune — 412101
          </p>
        </div>

        <Link
          href="/#book"
          className="py-3 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all border border-white/15 shrink-0"
        >
          Book Your Next Celebration →
        </Link>
      </div>
    </div>
  );
}