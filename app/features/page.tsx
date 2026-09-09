import { MarketingFooter } from "@/components/marketing/marketing-footer";
import type { Metadata } from "next";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { featuresMarkup } from "@/components/marketing/stitch-features-markup";
import "@/components/marketing/stitch-features.css";

export const metadata: Metadata = {
  title: "Features",
  description: "Explore GridBeacon geo-grid heatmaps, competitor insights, gap finder, white-label reports and automated local rank tracking.",
  alternates: { canonical: "/features" },
};

export default function FeaturesPage() {
  return <>
    <link rel="stylesheet" href="/features-utilities.css" />
    <MarketingHeader />
    <div id="stitch-features" dangerouslySetInnerHTML={{ __html: featuresMarkup }} />
    <MarketingFooter />
  </>;
}
