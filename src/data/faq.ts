export interface FAQItem {
  question: string;
  answer: string;
  category: "booking" | "experience" | "food" | "policies";
}

export const FAQS: FAQItem[] = [
  {
    category: "booking",
    question: "What is House of OTT in Ravet, Pune?",
    answer: "House of OTT is Pune's premier private mini-theater and celebration lounge located in Sector 29, Ravet. We offer private cinema rooms equipped with 150\" to 200\" 4K screens, 1000W+ Dolby Atmos surround sound, luxury recliners, custom party decor (birthdays, anniversaries, proposals), and full OTT streaming (Netflix, Prime, Hotstar)."
  },
  {
    category: "booking",
    question: "How do I book a private theater slot at House of OTT?",
    answer: "Booking is seamless! Select your date, choose your preferred theater room (Red Carpet Suite, Blockbuster Arena, or Royal OTT Lounge), pick your 3-hour time slot, select your celebration add-ons (cakes, fog entry, photography, roses), and submit your booking. You can reserve the slot by paying a small advance token amount, and our team confirms your slot instantly on WhatsApp."
  },
  {
    category: "booking",
    question: "How much advance do I need to pay to confirm a slot?",
    answer: "To lock in your date and time slot, a nominal advance payment of ₹750 is required. The remaining balance can be easily paid at the venue via UPI, Cash, or Card upon your arrival."
  },
  {
    category: "experience",
    question: "Which OTT platforms and content can we watch?",
    answer: "We provide high-speed access to Netflix 4K, Amazon Prime Video, Disney+ Hotstar, YouTube 4K, SonyLIV, Zee5, and Apple TV. You can also log into your personal accounts or bring your own laptop/PlayStation via HDMI. For your privacy, our system auto-logs out after your slot ends."
  },
  {
    category: "experience",
    question: "Can we play our own personal photos or videos on the screen?",
    answer: "Yes, absolutely! We love curating surprises. You can send us your photos, videos, or proposal clips via WhatsApp or Google Drive ahead of time, or plug in a laptop. Our audio-visual tech crew will time the playback seamlessly for your special moment."
  },
  {
    category: "food",
    question: "Is outside food or cake allowed inside House of OTT?",
    answer: "Yes! While we offer delicious in-house snack combos (popcorn, cheesy nachos, pizzas, fries, mocktails) and custom bakery cakes, you are also free to order food via Swiggy/Zomato directly to our Ravet venue or bring your own cake and snacks."
  },
  {
    category: "experience",
    question: "How is House of OTT better than The Binge Town?",
    answer: "House of OTT in Ravet provides larger 4K laser screens (up to 200\"), higher-wattage Dolby Atmos sound (up to 1200W), ultra-comfortable custom recliner beds, dedicated fog smoke entry, crystal-clear transparent pricing with no hidden charges, and a hyper-localized VIP experience right in PCMC Pune with easy parking and elevator access."
  },
  {
    category: "policies",
    question: "Where exactly is House of OTT located in Pune?",
    answer: "We are conveniently located at S.No. 215, Prime Ville, Plot No. 4 (Next to OYO Hotel), Sector No. 29, Ravet, Pune, Maharashtra 412101. We are only 5-10 minutes from Akurdi, Kiwale, Punawale, and 12 minutes from Wakad and Hinjawadi IT Park."
  },
  {
    category: "policies",
    question: "What is your cancellation and rescheduling policy?",
    answer: "We understand that plans can change! If you notify us at least 48 hours prior to your scheduled slot, you can reschedule your booking to any available date within 30 days without any penalty."
  },
  {
    category: "experience",
    question: "Is complete privacy guaranteed for couples and families?",
    answer: "100% Yes. Once your slot begins, the theater room is completely private and dedicated solely to you and your invited guests. Our staff only enters if you press the service bell or request food/assistance."
  }
];

