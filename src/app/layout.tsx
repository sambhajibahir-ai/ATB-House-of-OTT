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
    "Book Pune's premier private theater in Ravet for Birthdays, Romantic Dates, Anniversaries, Proposals & Squad Parties. 150\"-200\" 4K laser screens, 1200W Dolby Atmos, cloud fog entry, custom neon decor & outside food allowed.",
  keywords: [
    "Private Theater in Ravet Pune",
    "Private Cinema Hall Pune",
    "Birthday Celebration Private Theater PCMC",
    "Romantic Movie Date Night Ravet",
    "The Binge Town Pune Alternative",
    "Mini Theater For Rent Near Wakad",
    "Private Screening Room Near Hinjawadi",
    "Anniversary Celebration Venue Ravet",
    "Bride to Be Party Private Theater Pune",
    "House of OTT Ravet",
    "4K Dolby Atmos Private Theater Pune",
    "Couple Private Theater Pune",
  ],
  authors: [{ name: "House of OTT Ravet" }],
  creator: "House of OTT",
  publisher: "House of OTT",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    title: "House of OTT | Private Theater & Celebration Lounge in Ravet, Pune",
    description:
      "Your Private Cinema. Your Ultimate Celebration. Experience 150\"-200\" 4K screens, 1200W Dolby Atmos sound, cloud fog entry & custom celebrations in Ravet, Pune.",
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
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      <body className="bg-[#08090C] text-white selection:bg-brand-red selection:text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
