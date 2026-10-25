"use client";

import React from "react";
import { REVIEWS } from "@/data/reviews";
import { Star, CheckCircle, Quote } from "lucide-react";

export function ReviewsSection() {
  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="py-20 relative bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">
            Customer Testimonials
          </div>
          <h2 id="reviews-heading" className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Ratings &amp; Reviews
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Read authentic reviews from guests across Ravet, Wakad, Hinjawadi, and Pune.
          </p>
        </div>

        {/* Rating summary bar */}
        <div className="max-w-md mx-auto mb-10 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-around text-center shadow-xs">
          <div>
            <div className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-1">
              <span>4.9</span>
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" aria-hidden="true" />
            </div>
            <div className="text-xs text-slate-500 mt-0.5">Google Rating</div>
          </div>
          <div className="h-7 w-px bg-slate-200" aria-hidden="true" />
          <div>
            <div className="text-2xl font-bold text-slate-900">580+</div>
            <div className="text-xs text-slate-500 mt-0.5">Reviews</div>
          </div>
          <div className="h-7 w-px bg-slate-200" aria-hidden="true" />
          <div>
            <div className="text-2xl font-bold text-emerald-700">100%</div>
            <div className="text-xs text-slate-500 mt-0.5">Private Rooms</div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="rounded-xl bg-white border border-slate-200 p-5 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all"
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
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" aria-hidden="true" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                    {review.occasion}
                  </span>
                </div>

                <Quote className="w-5 h-5 text-slate-300 mb-2" aria-hidden="true" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-5">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Author & Theater */}
              <div className="pt-3.5 border-t border-slate-150 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{review.name}</span>
                    {review.verified && (
                      <span title="Verified Customer" className="inline-flex items-center">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0" aria-label="Verified Customer" />
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500">{review.date}</div>
                </div>

                <span className="text-xs text-slate-600 font-medium">
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
