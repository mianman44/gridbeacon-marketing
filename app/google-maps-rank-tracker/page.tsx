import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  AdsLandingHeader, HeroSection, ValueStrip, ProximitySection,
  HeatmapSection, CompetitorSection, AISection, HistorySection,
  AgencySection, WorkflowSection, AudienceSection, ComparisonSection,
  FAQSection, FinalCTASection, AdsLandingFooter,
} from "@/components/marketing/google-maps-rank-tracker/sections";
import "@/components/marketing/google-maps-rank-tracker/landing.css";

// One variable latin woff2 (200-800) in place of five TrueType weights.
const jakarta = localFont({
  src: "../../public/fonts/plus-jakarta-sans-latin-variable.woff2",
  weight: "200 800",
  style: "normal",
  display: "swap",
  preload: true,
});

const title = "Google Maps Rank Tracker & Geo-Grid Tool | GridBeacon";
const description = "See where you rank on Google Maps with GridBeacon’s geo-grid rank tracker. Compare competitors, track ranking history and start with 500 free scan credits.";
const url = "https://gridbeaconhq.com/google-maps-rank-tracker";
const images = [{
  url: "/marketing/google-maps-rank-tracker/geo-grid-heatmap.webp",
  width: 1536, height: 1024,
  alt: "GridBeacon Google Maps rank tracker showing rankings across a geographic grid",
}];

export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website", siteName: "GridBeacon", images },
  twitter: { card: "summary_large_image", title, description, images },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "GridBeacon",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web browser",
  url,
  description,
  featureList: ["Geo-grid ranking scans", "Competitor comparisons", "Saved rank history", "AI reports on paid plans"],
};

export default function GoogleMapsRankTrackerPage() {
  return (
    <div id="google-maps-landing" className={jakarta.className}>
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </div>
  );
}
