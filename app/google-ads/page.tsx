import type { Metadata } from "next";
import localFont from "next/font/local";

import { CampaignParams } from "@/components/marketing/google-ads/campaign-params";
import {
  AdsLandingHeader, HeroSection, ValueStrip, ProximitySection,
  HeatmapSection, CompetitorSection, AISection, HistorySection,
  AgencySection, WorkflowSection, AudienceSection, ComparisonSection,
  FAQSection, FinalCTASection, AdsLandingFooter,
} from "@/components/marketing/google-ads/sections";
import { pageMetadata } from "@/lib/seo";
import "@/components/marketing/google-ads/landing.css";

/*
 * /google-ads -- the Google Ads landing page.
 *
 * The original ads page from /google-maps-rank-tracker (commit
 * 00674e9), restored here when that URL became the SEO page. Same
 * sections and design; the two product images are now real GridBeacon
 * captures and sign-in/sign-up go straight to the app. Paid traffic
 * only: noindex, not in the sitemap or any site navigation, and no
 * structured data (the SEO page carries that).
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
    title: "Google Maps Rank Tracker & Geo-Grid Tool | GridBeacon",
    description:
      "See where you rank on Google Maps with GridBeacon's geo-grid rank tracker. Compare competitors, track ranking history and start with 500 free scan credits.",
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
        <ValueStrip />
        <ProximitySection />
        <HeatmapSection />
        <CompetitorSection />
        <AISection />
        <HistorySection />
        <AgencySection />
        <WorkflowSection />
        <AudienceSection />
        <ComparisonSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <AdsLandingFooter />
    </div>
  );
}
