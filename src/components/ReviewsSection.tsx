"use client";

import React from "react";
import { REVIEWS } from "@/data/reviews";
import { Star, CheckCircle, Quote } from "lucide-react";

export function ReviewsSection() {
  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="py-20 relative bg-background border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 uppercase tracking-wide mb-3">
            Customer Testimonials
          </div>
          <h2 id="reviews-heading" className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Ratings &amp; Reviews
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Read authentic reviews from guests across Ravet, Wakad, Hinjawadi, and Pune.
          </p>
        </div>

        {/* Rating summary bar */}
        <div className="max-w-md mx-auto mb-10 p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-around text-center">
          <div>
            <div className="text-2xl font-bold text-white flex items-center justify-center gap-1">
              <span>4.9</span>
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" aria-hidden="true" />
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Google Rating</div>
          </div>
          <div className="h-7 w-px bg-slate-800" aria-hidden="true" />
          <div>
            <div className="text-2xl font-bold text-white">580+</div>
            <div className="text-xs text-slate-400 mt-0.5">Reviews</div>
          </div>
          <div className="h-7 w-px bg-slate-800" aria-hidden="true" />
          <div>
            <div className="text-2xl font-bold text-emerald-400">100%</div>
            <div className="text-xs text-slate-400 mt-0.5">Private Rooms</div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="rounded-xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between shadow-sm"
            >
              <div>
                {/* Header: Rating & Occasion */}
                <div className="flex items-center justify-between mb-3">
                  <div 
                    className="flex items-center gap-1"
                    role="img"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-300 px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                    {review.occasion}
                  </span>
                </div>

                <Quote className="w-5 h-5 text-slate-600 mb-2" aria-hidden="true" />
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-5">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Author & Theater */}
              <div className="pt-3.5 border-t border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>{review.name}</span>
                    {review.verified && (
                      <span title="Verified Customer" className="inline-flex items-center">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-label="Verified Customer" />
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400">{review.date}</div>
                </div>

                <span className="text-xs text-slate-400 font-medium">
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
