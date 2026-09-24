import type { Metadata } from "next";
import { preload } from "react-dom";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { stitchMarkup } from "@/components/marketing/stitch-markup";
import { HomeStructuredData } from "@/components/marketing/structured-data";
import {
  HOME_FAQ_PLACEHOLDER,
  renderHomeFaqList,
} from "@/components/marketing/home-faqs";
import { pageMetadata } from "@/lib/seo";
import "@/components/marketing/stitch-home.css";

export const metadata: Metadata = pageMetadata({
  path: "/",
  // Leads with "geo-grid local rank tracker". /google-maps-rank-tracker
  // keeps its own title and owns that phrase, so the two do not compete.
  title: "Geo-Grid Local Rank Tracker for Google Maps | GridBeacon",
  description:
    "Geo-grid local rank tracker for Google Business Profiles. See your Maps rank at every point of your service area, spy on competitors. 500 free credits.",
  absoluteTitle: true,
});

/* The hero screenshot is the LCP element. It lives inside the static
   markup, so React cannot see it; preload it here with high priority. */
const HERO_IMAGE = "/stitch/google-maps-rank-heatmap-dashboard.webp";

if (!stitchMarkup.includes(HOME_FAQ_PLACEHOLDER)) {
  throw new Error("Home markup is missing the FAQ placeholder.");
}

/* The FAQ comes from home-faqs.ts, the same list the FAQPage JSON-LD
   is built from. */
const homeMarkup = stitchMarkup.replace(
  HOME_FAQ_PLACEHOLDER,
  renderHomeFaqList(),
);

export default function HomePage() {
  preload(HERO_IMAGE, { as: "image", fetchPriority: "high" });

  return <>
    <link rel="stylesheet" href="/stitch-fonts.css" />
    <link rel="stylesheet" href="/stitch-utilities.css" />
    <HomeStructuredData />
    <MarketingHeader />
    <div id="stitch-home" dangerouslySetInnerHTML={{ __html: homeMarkup }} />
    <MarketingFooter />
  </>;
}
