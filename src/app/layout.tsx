import type { Metadata } from "next";
import "./globals.css";
import { SITE_CONFIG, generateLocalBusinessSchema, generateFaqSchema } from "@/lib/seo";
import { FAQS } from "@/data/faq";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "House of OTT | Private Theater & Celebration Lounge in Ravet, Pune",
    template: "%s | House of OTT Ravet",
  },
  description:
    "Private screening theater and celebration venue in Ravet, Pune. 150\"-200\" 4K screens, Dolby Atmos sound, custom celebrations for birthdays, anniversaries, and movie dates. Advance ₹750.",
  keywords: [
    "Private Theater in Ravet Pune",
    "Private Cinema Hall Pune",
    "Birthday Celebration Private Theater PCMC",
    "Romantic Movie Date Night Ravet",
    "The Binge Town Pune Alternative",
    "Mini Theater For Rent Near Wakad",
    "Private Screening Room Near Hinjawadi",
    "Anniversary Celebration Venue Ravet",
    "House of OTT Ravet",
  ],
  authors: [{ name: "House of OTT Ravet" }],
  creator: "House of OTT",
  publisher: "House of OTT",
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    title: "House of OTT | Private Theater & Celebration Lounge in Ravet, Pune",
    description:
      "Your Private Cinema. Your Ultimate Celebration. Premium 150\"-200\" 4K screens, Dolby Atmos audio & private celebrations in Ravet, Pune.",
    url: SITE_CONFIG.url,
    siteName: "House of OTT",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: "House of OTT Private Theater Ravet Pune",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "House of OTT | Private Theater & Celebration Lounge in Ravet, Pune",
    description:
      "Pune's premier private screening theater in Ravet. Celebrate birthdays, anniversaries & movie nights on 4K screens with Dolby Atmos.",
    images: [SITE_CONFIG.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = generateLocalBusinessSchema();
  const faqSchema = generateFaqSchema(FAQS.slice(0, 8));

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      </head>
      <body className="bg-background text-slate-100 antialiased min-h-screen">
        {/* Accessibility Skip Link (WCAG 2.4.1) */}
        <a
          href="#main-content"
          className="sr-only not-sr-only:focus fixed top-4 left-4 z-50 bg-amber-400 text-black font-semibold py-2 px-4 rounded-md shadow-xl focus:outline-none focus:ring-2 focus:ring-black"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
