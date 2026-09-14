import { MarketingFooter } from "@/components/marketing/marketing-footer";
import type { Metadata } from "next";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { featuresMarkup } from "@/components/marketing/stitch-features-markup";
import { BreadcrumbStructuredData } from "@/components/marketing/structured-data";
import { pageMetadata } from "@/lib/seo";
import "@/components/marketing/stitch-features.css";

export const metadata: Metadata = pageMetadata({
  path: "/features",
  title: "Geo-Grid Rank Tracking Features",
  description:
    "Geo-grid heatmaps, competitor grids from every scan, custom scan areas, scheduled scans, scan history and AI ranking reports for Google Business Profiles.",
});

export default function FeaturesPage() {
  return <>
    <link rel="stylesheet" href="/features-utilities.css" />
    <BreadcrumbStructuredData name="Features" path="/features" />
    <MarketingHeader />
    <div id="stitch-features" dangerouslySetInnerHTML={{ __html: featuresMarkup }} />
    <MarketingFooter />
  </>;
}
