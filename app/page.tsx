import type { Metadata } from "next";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { stitchMarkup } from "@/components/marketing/stitch-markup";
import { HomeStructuredData } from "@/components/marketing/structured-data";
import { pageMetadata } from "@/lib/seo";
import "@/components/marketing/stitch-home.css";

export const metadata: Metadata = pageMetadata({
  path: "/",
  title: "GridBeacon | Google Maps Geo-Grid Rank Tracker",
  description:
    "Geo-grid rank tracking for Google Business Profiles: see your Google Maps rank at every point of your service area, compare competitors and track history.",
  absoluteTitle: true,
});

export default function HomePage() {
  return <>
    <link rel="stylesheet" href="/stitch-fonts.css" />
    <link rel="stylesheet" href="/stitch-utilities.css" />
    <HomeStructuredData />
    <MarketingHeader />
    <div id="stitch-home" dangerouslySetInnerHTML={{ __html: stitchMarkup }} />
    <MarketingFooter />
  </>;
}
