"use client";

import React from "react";
import { REVIEWS } from "@/data/reviews";
import { Star, CheckCircle, Quote, Sparkles } from "lucide-react";

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 relative bg-[#0b0d13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-wider mb-4">
            <Star className="w-3.5 h-3.5 fill-brand-gold" />
            <span>580+ Verified 5-Star Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Loved by Pune &amp; PCMC
          </h2>
          <p className="text-base sm:text-lg text-gray-400">
            See why couples, families, and party planners rate House of OTT higher 
            than any other private screening theater in Pune.
          </p>
        </div>

        {/* Rating summary bar */}
        <div className="max-w-xl mx-auto mb-12 p-4 rounded-2xl bg-surface-card border border-white/10 flex items-center justify-around text-center">
          <div>
            <div className="text-3xl font-extrabold text-white flex items-center justify-center gap-1">
              <span>4.9</span>
              <Star className="w-5 h-5 fill-brand-gold text-brand-gold" />
            </div>
            <div className="text-[11px] text-gray-400 mt-0.5">Google Rating</div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <div className="text-3xl font-extrabold text-white">580+</div>
            <div className="text-[11px] text-gray-400 mt-0.5">Public Reviews</div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <div className="text-3xl font-extrabold text-emerald-400">100%</div>
            <div className="text-[11px] text-gray-400 mt-0.5">Privacy Verified</div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl bg-surface-card border border-white/10 p-6 flex flex-col justify-between hover:border-brand-red/30 transition-all shadow-lg relative group"
            >
              <div>
                {/* Header: Stars & Occasion */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-brand-crimson px-2.5 py-0.5 rounded-full bg-brand-crimson/10 border border-brand-crimson/20">
                    {review.occasion}
                  </span>
                </div>

                <Quote className="w-6 h-6 text-white/10 mb-2" />
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Author & Theater Tag */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>{review.name}</span>
                    {review.verified && (
                      <span title="Verified Customer" className="inline-flex items-center">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-gray-500">{review.date}</div>
                </div>

                <span className="text-[11px] text-gray-400 font-medium">
                  {review.theaterName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
