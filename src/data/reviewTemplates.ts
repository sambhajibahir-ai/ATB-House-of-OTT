export const GOOGLE_REVIEW_URL = 
  "https://www.google.com/search?q=HOUSE+OF+OTT&oq=house+of+&gs_lcrp=EgZjaHJvbWUqCAgBEEUYJxg7MgYIABBFGDkyCAgBEEUYJxg7MggIAhBFGCcYOzIKCAMQABiABBi0BzIKCAQQLhixAxiABDIGCAUQRRg9MgYIBhBFGD0yBggHEEUYPdIBCDI3NDFqMGo3qAIAsAIA&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x3bc2b9ee3aef87fb:0x886e07dd1628d9f0,3,,,,";

export interface ReviewOccasion {
  id: string;
  label: string;
  icon: string;
  defaultHighlights: string[];
}

export const REVIEW_OCCASIONS: ReviewOccasion[] = [
  {
    id: "birthday",
    label: "Birthday Celebration",
    icon: "🎂",
    defaultHighlights: ["decor", "cake", "screen", "privacy"]
  },
  {
    id: "anniversary",
    label: "Romantic Anniversary",
    icon: "🌹",
    defaultHighlights: ["recliners", "fog", "privacy", "decor"]
  },
  {
    id: "proposal",
    label: "Marriage Proposal",
    icon: "💍",
    defaultHighlights: ["fog", "decor", "privacy", "staff"]
  },
  {
    id: "movie_date",
    label: "Couple Movie Date",
    icon: "🍿",
    defaultHighlights: ["screen", "sound", "recliners", "food"]
  },
  {
    id: "friends_gaming",
    label: "Friends & PS5 Gaming",
    icon: "🎮",
    defaultHighlights: ["screen", "sound", "food", "parking"]
  },
  {
    id: "general",
    label: "Overall 5★ Experience",
    icon: "⭐",
    defaultHighlights: ["screen", "sound", "staff", "privacy"]
  }
];

export interface HighlightTag {
  id: string;
  label: string;
  textSnippet: string;
}

export const REVIEW_HIGHLIGHTS: HighlightTag[] = [
  {
    id: "screen",
    label: "150\"-200\" 4K Screen",
    textSnippet: "The giant 4K laser screen quality is crisp and far better than public multiplexes."
  },
  {
    id: "sound",
    label: "Dolby Atmos Sound",
    textSnippet: "The 1200W Dolby Atmos sound system gave absolute goosebumps with clear bass."
  },
  {
    id: "recliners",
    label: "Couple Luxury Recliners",
    textSnippet: "The luxury recliner seating was super cozy and comfortable for the entire 3 hours."
  },
  {
    id: "decor",
    label: "Neon & Balloon Decor",
    textSnippet: "The custom neon sign, floral backdrop, and balloon decor looked straight out of Pinterest."
  },
  {
    id: "fog",
    label: "Cloud Fog Entrance",
    textSnippet: "The fairytale cloud fog entry effect made our entrance totally magical."
  },
  {
    id: "cake",
    label: "Truffle Cake & Cold Pyro",
    textSnippet: "The fresh chocolate truffle cake paired with indoor cold pyro sparklers was awesome for cake cutting photos."
  },
  {
    id: "privacy",
    label: "100% Soundproof Privacy",
    textSnippet: "Loved the 100% soundproof privacy with zero disturbance throughout our booking."
  },
  {
    id: "food",
    label: "Outside Food & Swiggy Allowed",
    textSnippet: "They allow outside food and Swiggy/Zomato deliveries, which made the party so convenient."
  },
  {
    id: "staff",
    label: "Polite & Helpful Staff",
    textSnippet: "The team at House of OTT was polite, punctual, and took care of every request seamlessly."
  },
  {
    id: "parking",
    label: "Easy Location & Free Parking",
    textSnippet: "Super convenient location at Prime Ville Sector 29 Ravet with easy parking."
  }
];

// Pre-crafted SEO rich reviews covering core Pune/PCMC search terms
export interface PreCraftedReview {
  id: string;
  occasion: string;
  title: string;
  rating: number;
  authorType: string;
  text: string;
}

export const PRE_CRAFTED_REVIEWS: PreCraftedReview[] = [
  {
    id: "pc-1",
    occasion: "Birthday Celebration",
    title: "Best Birthday Surprise Private Theater in Ravet!",
    rating: 5,
    authorType: "Birthday Surprise",
    text: "Celebrated my best friend's birthday at House of OTT in Ravet, Pune and it was hands down the best experience! The glowing 'Happy Birthday' neon sign, metallic balloon arch, and cake pedestal looked stunning in photos. The 4K screen and 1200W Dolby sound made our birthday video look grand. Best private theater in PCMC near Wakad and Hinjawadi. 100% recommended!"
  },
  {
    id: "pc-2",
    occasion: "Romantic Anniversary",
    title: "Unforgettable Anniversary Date Night",
    rating: 5,
    authorType: "Couples Special",
    text: "Booked the couple celebration suite at House of OTT Ravet for our wedding anniversary. The teddy bears, romantic heart decor, and luxury couple recliners were so cozy. We loved having 100% soundproof privacy to stream our favorite movie on the massive 150-inch laser display. Outside food and cake allowed with zero hassle. Truly Pune's premier private cinema for couples!"
  },
  {
    id: "pc-3",
    occasion: "Surprise Marriage Proposal",
    title: "She Said YES! Magical Proposal Setup",
    rating: 5,
    authorType: "Proposal Celebration",
    text: "Planned a surprise marriage proposal at House of OTT in Prime Ville, Ravet. The fairytale cloud fog entrance and giant red floral heart wall took her breath away. The staff was incredibly discreet, managed the blindfold surprise perfectly, and played our personal proposal video on the big screen. If you're looking for a private proposal venue in Pune, this is the place!"
  },
  {
    id: "pc-4",
    occasion: "Movie Marathon & OTT Binge",
    title: "Way Better than Commercial Theaters",
    rating: 5,
    authorType: "Movie Enthusiast",
    text: "Visited House of OTT Ravet for a private movie date. The 4K laser projection clarity and Dolby Atmos surround audio beats regular cinema halls by a mile. Spotless hygiene, plush recliner beds, chilling AC, and the freedom to order pizzas via Swiggy. Super affordable pricing with just ₹750 token to lock the slot. Will definitely come back!"
  },
  {
    id: "pc-5",
    occasion: "Friends Reunion & PS5 Gaming",
    title: "Epic Gaming & Match Screening Hall",
    rating: 5,
    authorType: "Squad Night",
    text: "Booked the Grand VIP Lounge at House of OTT with 8 friends for PS5 gaming and cricket match binge. The 200\" screen with dual wireless controllers and club surround sound was mindblowing! Ample parking at Sector 29 Ravet and super friendly management. Best hangout spot in PCMC Pune!"
  },
  {
    id: "pc-6",
    occasion: "Bride-to-be Bachelorette",
    title: "Perfect Private Hall for Girls Bachelorette",
    rating: 5,
    authorType: "Bachelorette Party",
    text: "Organized a bride-to-be celebration at House of OTT Ravet. The neon lighting, wireless karaoke microphones, and cold pyro sparklers made our party vibrant and fun. Full privacy, clean washroom, and warm hospitality by the staff. Highly recommended celebration venue in Pune!"
  }
];

// Dynamic generator templates for randomized fresh reviews
export function generateDynamicReview(
  occasionId: string,
  selectedHighlightIds: string[],
  variantIndex: number = 0
): string {
  const templates: Record<string, string[]> = {
    birthday: [
      "Celebrated a birthday at House of OTT in Ravet, Pune and it was absolutely phenomenal! {HIGHLIGHTS} The entire theater gave us 100% privacy and the customized setup made our celebration extra special. Hands down the best private theater in PCMC near Wakad and Hinjawadi!",
      "Had an amazing birthday party at House of OTT Ravet! {HIGHLIGHTS} Being able to play our personal birthday video on the giant screen was unforgettable. Super clean, courteous staff, and very well maintained. 5 stars all the way!",
      "If you're planning a birthday surprise in Pune, House of OTT in Sector 29 Ravet is the absolute best venue. {HIGHLIGHTS} Loved having our own private cinema with outside food and cake freedom. Highly recommended!"
    ],
    anniversary: [
      "Celebrated our anniversary at House of OTT Ravet and it exceeded all expectations! {HIGHLIGHTS} The romantic ambience, plush couple recliner seating, and private screening room made our date night magical. Best couple theater in Pune!",
      "House of OTT in Ravet is the perfect place for romantic anniversaries and date nights. {HIGHLIGHTS} 100% soundproof privacy with breathtaking 4K screen clarity. Thank you team for making our day memorable!",
      "Booked the anniversary suite at House of OTT Ravet for my spouse. {HIGHLIGHTS} Everything was set up cleanly before our arrival. Much cleaner and more private than public cinemas. 5/5 stars!"
    ],
    proposal: [
      "Planned a surprise marriage proposal at House of OTT Ravet, and she said YES! {HIGHLIGHTS} The team coordinated the lights, screen slideshow, and music with perfection. The best private proposal venue in PCMC Pune!",
      "Unforgettable proposal experience at House of OTT Sector 29 Ravet! {HIGHLIGHTS} The privacy, fairytale atmosphere, and grand screen made the moment pure magic. 10/10 recommendation!"
    ],
    movie_date: [
      "Had a wonderful private movie screening at House of OTT Ravet. {HIGHLIGHTS} 4K laser picture quality with immersive Dolby sound. So relaxing to enjoy our favorite OTT series on couple recliners with outside snacks. Definitely visiting again!",
      "Best private movie date experience in Pune! House of OTT in Ravet has top-notch acoustics and comfort. {HIGHLIGHTS} Affordable pricing with a simple ₹750 advance token. Must visit for movie buffs!"
    ],
    friends_gaming: [
      "Hosted our squad hangout at House of OTT Ravet. {HIGHLIGHTS} Gaming on the massive screen with surround sound was a next-level experience. Great air conditioning, hassle-free parking, and total freedom with outside food. 5 stars!",
      "Epic hangout with friends at House of OTT PCMC! {HIGHLIGHTS} Screen size and audio punch were unmatched. Perfect private lounge in Ravet near Wakad and Hinjawadi."
    ],
    general: [
      "House of OTT in Sector 29, Ravet is Pune's finest private screening and celebration lounge. {HIGHLIGHTS} Spotless cleanliness, 100% soundproof privacy, and top-tier hospitality. Highly recommend for any special occasion!",
      "Fantastic experience at House of OTT Ravet! {HIGHLIGHTS} Everything from the booking process to the theater ambiance was smooth and professional. Best private theater in PCMC Pune!"
    ]
  };

  const pool = templates[occasionId] || templates.general;
  const template = pool[variantIndex % pool.length];

  // Map selected highlights into readable sentences
  const snippets = selectedHighlightIds
    .map((id) => REVIEW_HIGHLIGHTS.find((h) => h.id === id)?.textSnippet)
    .filter(Boolean);

  let highlightsText = "";
  if (snippets.length > 0) {
    highlightsText = snippets.slice(0, 3).join(" ");
  } else {
    highlightsText = "The 4K laser screen, Dolby Atmos sound, and 100% soundproof privacy were top-tier.";
  }

  return template.replace("{HIGHLIGHTS}", highlightsText);
}