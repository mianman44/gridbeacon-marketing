import type { Metadata } from "next";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { StitchHow } from "@/components/marketing/stitch-how";
import { BreadcrumbStructuredData } from "@/components/marketing/structured-data";
import { pageMetadata } from "@/lib/seo";
import "@/components/marketing/stitch-how.css";
export const metadata: Metadata = pageMetadata({
  path: "/how-it-works",
  title: "How Geo-Grid Rank Tracking Works",
  description:
    "How GridBeacon checks your Google Maps ranking from every point of a grid, what a scan costs in credits, and how to read the heatmap and competitor results.",
});
export default function HowItWorksPage() {
  return <>
    <link rel="stylesheet" href="/how-utilities.css" />
    <BreadcrumbStructuredData name="How It Works" path="/how-it-works" />
    <MarketingHeader />
    <main id="main-content"><StitchHow /></main>
    <MarketingFooter />
  </>;
}
