import React from "react";
import type { Metadata } from "next";
import { ReviewGenerator } from "@/components/ReviewGenerator";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Write a Google Review | House of OTT Ravet Pune",
  description:
    "Share your 5-star experience at House of OTT Ravet. Generate an SEO-friendly review for your birthday, anniversary, or movie date, copy with one click, and post directly to Google Reviews.",
  keywords: [
    "House of OTT Google Review",
    "House of OTT Ravet Reviews",
    "Private Theater Pune Reviews",
    "Birthday Theater Ravet Reviews",
    "House of OTT Feedback",
    "Best Private Cinema PCMC Reviews",
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/reviews`,
  },
  openGraph: {
    title: "Review House of OTT Ravet | 5-Star Private Theater Experience",
    description:
      "Share your birthday or anniversary experience at House of OTT Ravet on Google Reviews in 1 click.",
    url: `${SITE_CONFIG.url}/reviews`,
    siteName: "House of OTT",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: "House of OTT Ravet Customer Reviews",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function ReviewsPage() {
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "House of OTT",
    image: `${SITE_CONFIG.url}/images/venue/house-of-ott-anniversary-teddy-setup.jpg`,
    "@id": `${SITE_CONFIG.url}/#business`,
    url: SITE_CONFIG.url,
    telephone: "+919168530789",
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "S.No. 215, Prime Ville, Plot No. 4, Sector No. 29",
      addressLocality: "Ravet, Pimpri-Chinchwad, Pune",
      addressRegion: "Maharashtra",
      postalCode: "412101",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 18.6534,
      longitude: 73.7432,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "580",
    },
  };

  return (
    <div className="relative min-h-screen bg-[#07080B] text-slate-100 selection:bg-amber-500 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewsSchema),
        }}
      />

      <ThemeSwitcher />
      <Header />

      <main id="main-content" className="pt-4">
        <ReviewGenerator />
      </main>

      <Footer />
    </div>
  );
}