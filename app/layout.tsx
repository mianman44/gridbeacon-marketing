import type {
  Metadata,
} from "next";

import "./globals.css";
import Providers from "./providers";

import localFont from "next/font/local";

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

/* Absolute URLs are built from this. Without it Next emits
   relative og:image and canonical values, which crawlers and
   social scrapers both ignore. */
const SITE_URL = "https://gridbeaconhq.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  title: {
    default:
      "GridBeacon | Local Search Rank Tracking",
    template:
      "%s | GridBeacon",
  },
  description:
    "GridBeacon is a local search rank tracking platform that maps Google Business Profile rankings across geographic grids, helping businesses and SEO agencies monitor local visibility.",
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
    url: SITE_URL,
    title: "GridBeacon | Local Search Rank Tracking",
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
    title: "GridBeacon | Local Search Rank Tracking",
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
      className={`${inter.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head><link rel="stylesheet" href="/features-fonts.css" /></head>
      <body className="font-sans antialiased bg-slate-50 text-slate-900">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
