import type { Metadata } from "next";
import localFont from "next/font/local";

import { CampaignParams } from "@/components/marketing/google-ads/campaign-params";
import {
  AdsLandingFooter,
  AdsLandingHeader,
  BenefitsSection,
  ComparisonSection,
  FAQSection,
  FinalCTASection,
  HeatmapSection,
  HeroSection,
  OfferSection,
  ProximitySection,
  SignupOfferSection,
  TrustSection,
  WorkflowSection,
} from "@/components/marketing/google-ads/sections";
import { pageMetadata } from "@/lib/seo";
import "@/components/marketing/google-ads/landing.css";

/*
 * /google-ads -- the Google Ads landing page.
 *
 * Paid traffic only: noindex, not in the sitemap or any site navigation,
 * and no structured data. The organic page for the same topic is
 * /google-maps-rank-tracker; keeping this one out of the index avoids
 * two near-identical pages competing in search.
 *
 * Flow: hero + free offer -> product heatmap -> why one number misleads
 * -> three benefits -> comparison -> how it works -> trust -> signup
 * offer -> FAQ -> final call to action.
 */

// One variable latin woff2 (200-800) in place of five TrueType weights.
const jakarta = localFont({
  src: "../../public/fonts/plus-jakarta-sans-latin-variable.woff2",
  weight: "200 800",
  style: "normal",
  display: "swap",
  preload: true,
});

const ROOT_ID = "google-maps-landing";

export const metadata: Metadata = {
  ...pageMetadata({
    path: "/google-ads",
    title: "Google Maps Rank Tracker | Geo-Grid Rank Tracking | GridBeacon",
    description:
      "Track Google Maps rankings across your service area with geo-grid heatmaps, competitor insights and AI analysis. Start GridBeacon free with 500 scan credits.",
    absoluteTitle: true,
    image: {
      url: "/marketing/google-maps-rank-tracker/og-google-maps-rank-tracker.jpg",
      width: 1200,
      height: 630,
      alt: "A GridBeacon geo-grid scan showing a business's Google Maps rankings at 25 points",
    },
  }),
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
};

export default function GoogleAdsLandingPage() {
  return (
    <div id={ROOT_ID} className={jakarta.className}>
      <CampaignParams rootId={ROOT_ID} />
      <a className="ads-skip-link" href="#landing-content">Skip to content</a>
      <AdsLandingHeader />
      <main id="landing-content">
        <HeroSection />
        <OfferSection />
        <HeatmapSection />
        <ProximitySection />
        <BenefitsSection />
        <ComparisonSection />
        <WorkflowSection />
        <TrustSection />
        <SignupOfferSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <AdsLandingFooter />
    </div>
  );
}
