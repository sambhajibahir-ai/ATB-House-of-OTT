export const SITE_CONFIG = {
  name: "House of OTT",
  legalName: "House of OTT Private Theater & Celebration Lounge",
  description:
    "Pune's premier private theater and celebration lounge in Ravet. Luxury 150\"-200\" 4K screens, 1200W Dolby Atmos sound, custom birthday & anniversary decor, fog entry, and OTT streaming.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://houseofott.vercel.app",
  ogImage: "/images/venue/house-of-ott-anniversary-teddy-setup.jpg",
  phone: "+91 91685 30789",
  whatsappNumber: "919168530789",
  email: "houseofott.ravet@gmail.com",
  address: {
    streetAddress: "S.No. 215, Prime Ville, Plot No. 4, Next to OYO Hotel, Sector No. 29",
    addressLocality: "Ravet",
    addressRegion: "Pune, Maharashtra",
    postalCode: "412101",
    addressCountry: "IN",
  },
  geo: {
    latitude: 18.6534,
    longitude: 73.7432,
  },
  googleMapsUrl: "https://share.google/6g19LyHLut3CkEDbk",
  openingHours: "Mo-Su 10:00-03:00",
  priceRange: "₹₹ (₹1,499 - ₹4,999)",
  rating: {
    ratingValue: "4.9",
    reviewCount: "580",
  },
};

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EntertainmentBusiness",
    "@id": `${SITE_CONFIG.url}/#business`,
    name: SITE_CONFIG.name,
    alternateName: ["House of OTT Ravet", "House of OTT Private Cinema Pune"],
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    image: [
      "/images/venue/house-of-ott-anniversary-teddy-setup.jpg",
      "/images/venue/house-of-ott-birthday-neon-setup.jpg",
      "/images/venue/house-of-ott-proposal-butterfly-setup.jpg",
      "/images/venue/cold-pyro-cake-celebration.jpg",
      "/images/venue/cloud-fog-entrance-real.jpg",
      "/images/venue/real-gaming-suite.jpg",
    ],
    priceRange: SITE_CONFIG.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.streetAddress,
      addressLocality: SITE_CONFIG.address.addressLocality,
      addressRegion: SITE_CONFIG.address.addressRegion,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude,
    },
    hasMap: SITE_CONFIG.googleMapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "03:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE_CONFIG.rating.ratingValue,
      reviewCount: SITE_CONFIG.rating.reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "4K Laser Projector", value: true },
      { "@type": "LocationFeatureSpecification", name: "Dolby Atmos 7.1 Surround Sound", value: true },
      { "@type": "LocationFeatureSpecification", name: "Recliner Beds & Lounge Sofas", value: true },
      { "@type": "LocationFeatureSpecification", name: "Customized Birthday & Anniversary Decor", value: true },
      { "@type": "LocationFeatureSpecification", name: "Cinematic Fog Entry Machine", value: true },
      { "@type": "LocationFeatureSpecification", name: "Full OTT Access (Netflix, Prime, Hotstar)", value: true },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioned", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free Parking & Elevator", value: true },
    ],
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/#book`,
        inLanguage: "en-US",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: {
        "@type": "Reservation",
        name: "Private Theater Slot Reservation",
      },
    },
  };
}

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

