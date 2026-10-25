import { TheaterRoom } from "@/types";

export const THEATERS: TheaterRoom[] = [
  {
    id: "cinema-suite",
    name: "The Red Carpet Suite",
    tagline: "Ultra-cozy private theater designed for romantic dates & intimate celebrations",
    screenSize: "150\" 4K HDR Laser Screen",
    audioSpec: "600W Dolby 5.1 Cinematic Surround",
    capacityText: "2 - 4 Guests",
    baseCapacity: 2,
    maxCapacity: 4,
    basePrice: 1499,
    extraPersonPrice: 350,
    badge: "Most Popular For Couples",
    popular: true,
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "150-inch 4K HDR Laser Projection",
      "600W Dolby 5.1 Surround Sound with deep bass",
      "Plush velvet recliner beds & cozy couple cushions",
      "Customizable romantic RGB ambient lighting",
      "Netflix, Prime Video, Disney+ Hotstar, YouTube 4K",
      "Private AC climate control",
      "Outside food delivery allowed",
      "Surprise video slideshow on screen setup"
    ],
    bestFor: [
      "Romantic Date Nights",
      "Anniversary Celebrations",
      "Marriage Proposals",
      "Intimate Birthday Surprises"
    ]
  },
  {
    id: "blockbuster-arena",
    name: "The Blockbuster Arena",
    tagline: "High-octane entertainment theater built for family celebrations & friend squad parties",
    screenSize: "180\" 4K Ultra-Wide Acoustic Screen",
    audioSpec: "1000W Dolby Atmos 7.1 Immersive Audio",
    capacityText: "5 - 10 Guests",
    baseCapacity: 5,
    maxCapacity: 10,
    basePrice: 2499,
    extraPersonPrice: 300,
    badge: "Bestseller For Birthdays",
    popular: true,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "180-inch 4K Ultra-Wide Acoustic Screen",
      "1000W Dolby Atmos 7.1 with Dual Bass Subwoofers",
      "Multi-tiered luxury recliners & plush corner sofas",
      "High-speed OTT streaming (Netflix, Hotstar, Prime, etc.)",
      "PlayStation 5 / Console Gaming Ready on request",
      "Live Sports Screening (Cricket, Premier League, F1)",
      "Dedicated cake cutting stage with spotlight",
      "Custom birthday neon message board included"
    ],
    bestFor: [
      "Birthday Bashes",
      "Bride-to-Be & Bachelor Parties",
      "Family Movie Marathons",
      "Live Cricket Screening Parties"
    ]
  },
  {
    id: "royal-ott-lounge",
    name: "The Royal OTT Lounge",
    tagline: "VIP grand screening lounge with party lights, karaoke mics & luxury party zone",
    screenSize: "200\" 4K IMAX-Grade Display",
    audioSpec: "1200W Club-Grade Dolby Sound + Karaoke Setup",
    capacityText: "8 - 20 Guests",
    baseCapacity: 8,
    maxCapacity: 20,
    basePrice: 3999,
    extraPersonPrice: 250,
    badge: "VIP Grand Hall",
    popular: false,
    image: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "200-inch 4K IMAX-grade mega projection",
      "1200W Dolby Surround + 2 Wireless Karaoke Microphones",
      "Expansive VIP L-shaped sectional sofas & ottoman loungers",
      "Party strobe laser lights & cinematic fog entry ready",
      "Spacious celebration & dance floor zone",
      "Dedicated Butler service & refreshment station",
      "Full 3-hour uninterrupted private VIP booking",
      "Full OTT library + 4K HDMI plug & play"
    ],
    bestFor: [
      "Grand Birthday Celebrations",
      "Farewell & Reunion Gatherings",
      "Corporate Team Celebrations",
      "Baby Shower & Gender Reveal Events"
    ]
  }
];

