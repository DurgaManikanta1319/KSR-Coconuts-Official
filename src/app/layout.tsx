import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

// Nunito Bold is used as a web-safe rounded fallback when 'Arial Rounded MT Bold' is not installed
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KSR Coconuts | Fresh Farm Coconuts Direct From Ethakota",
  description: "Premium quality fresh tender coconuts, mature coconuts, and organic coconut oil delivered direct from the farms of Ethakota, East Godavari, Andhra Pradesh.",
  keywords: "KSR Coconuts, Ethakota Coconuts, East Godavari Coconuts, Tender Coconut wholesale, Copra suppliers, Coconut oil Andhra Pradesh, buy fresh coconuts online",
  authors: [{ name: "KSR Coconuts Team" }],
  metadataBase: new URL("https://ksrcoconuts.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KSR Coconuts | Premium Farm Coconuts Direct From Ethakota",
    description: "Order premium, chemical-free coconuts directly harvested from our organic orchards in East Godavari. Fast wholesale and home delivery.",
    url: "https://ksrcoconuts.com",
    siteName: "KSR Coconuts",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KSR Coconuts Farm and Products",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KSR Coconuts | Fresh Farm Coconuts Direct From Ethakota",
    description: "Direct farm-to-door fresh coconuts from East Godavari, Andhra Pradesh. Tap for wholesale quotes and retail orders.",
    images: ["/og-image.jpg"],
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "KSR COCONUTS",
    "image": "https://ksrcoconuts.com/og-image.jpg",
    "@id": "https://ksrcoconuts.com/#localbusiness",
    "url": "https://ksrcoconuts.com",
    "telephone": "+919989152333",
    "email": "ksrcoconuts@gmail.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ethakota",
      "addressLocality": "East Godavari",
      "addressRegion": "Andhra Pradesh",
      "postalCode": "533238",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "16.7255868",
      "longitude": "81.8335793"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "06:00",
      "closes": "21:00"
    },
    "sameAs": [
      "https://facebook.com/ksrcoconuts",
      "https://instagram.com/ksrcoconuts"
    ]
  };

  return (
    <html
      lang="en"
      className={`${nunito.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
