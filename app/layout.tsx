import type {
  Metadata,
} from "next";

import "./globals.css";
import Providers from "./providers";

import localFont from "next/font/local";

import { SITE_URL } from "@/lib/seo";

const inter = localFont({
  src: "../public/fonts/inter-latin-variable.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
});

/* Self-hosted for the same reason Inter is: the marketing pages
   should not need a third-party request before they can render
   their own headline. */
const manrope = localFont({
  src: "../public/fonts/manrope-latin-variable.woff2",
  weight: "400 800",
  display: "swap",
  variable: "--font-manrope",
});

/* Headline face of the Stitch pages. Loaded through next/font rather
   than a plain @font-face so it is preloaded with the page and gets a
   size-matched fallback: the headline and CTA row no longer move when
   it arrives. CSS reaches it through var(--font-jakarta). */
const jakarta = localFont({
  src: "../public/fonts/plus-jakarta-sans-latin-variable.woff2",
  weight: "200 800",
  display: "swap",
  variable: "--font-jakarta",
});

/* No canonical and no og:url here. Next merges metadata shallowly,
   so anything set at this level is inherited whole by every page
   that does not replace it: a canonical of "/" here made /about,
   /contact and the legal pages all name the home page as their
   canonical URL. Each page sets its own through pageMetadata(). */
export const metadata: Metadata = {
  /* Absolute URLs are built from this. Without it Next emits
     relative og:image and canonical values, which crawlers and
     social scrapers both ignore. */
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "GridBeacon | Google Maps Geo-Grid Rank Tracker",
    template:
      "%s | GridBeacon",
  },
  description:
    "Geo-grid rank tracking for Google Business Profiles: see your Google Maps rank at every point of your service area, compare competitors and track history.",
  applicationName:
    "GridBeacon",
  keywords: [
    "local rank tracker",
    "Google Business Profile rank tracker",
    "local SEO",
    "geo grid rank tracker",
    "local search heatmap",
    "GBP rank tracking",
  ],
  openGraph: {
    type: "website",
    siteName: "GridBeacon",
    title: "GridBeacon | Google Maps Geo-Grid Rank Tracker",
    description:
      "See your Google Maps ranking at every point across your service area. Geo-grid scans, competitor grids and client-ready reports.",
    images: [
      {
        url: "/artwork/local-advantage-city.png",
        // The asset's true size. Social scrapers crop to their
        // own ratio; declaring a size it is not would just make
        // them crop the wrong region.
        width: 1536,
        height: 1024,
        alt: "A geographic grid laid over a city, showing local ranking coverage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GridBeacon | Google Maps Geo-Grid Rank Tracker",
    description:
      "See your Google Maps ranking at every point across your service area.",
    images: ["/artwork/local-advantage-city.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${jakarta.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* The icon font is declared in plain CSS the browser only finds
            late; fetching it up front stops the icons (and the buttons
            they sit in) from waiting on it. */}
        <link
          rel="preload"
          href="/fonts/material-symbols-outlined-subset.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased bg-slate-50 text-slate-900">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
