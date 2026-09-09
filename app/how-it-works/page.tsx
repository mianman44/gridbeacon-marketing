import type { Metadata } from "next";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { StitchHow } from "@/components/marketing/stitch-how";
import "@/components/marketing/stitch-how.css";
export const metadata: Metadata = {
  title: "How It Works",
  description: "See how GridBeacon turns local coordinates into geo-grid rank insights, competitor comparisons and client reports.",
  alternates: { canonical: "/how-it-works" },
};
export default function HowItWorksPage() {
  return <>
    <link rel="stylesheet" href="/how-utilities.css" />
    <MarketingHeader />
    <main id="main-content"><StitchHow /></main>
    <MarketingFooter />
  </>;
}
