import type { Metadata } from "next";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { StitchPricing } from "@/components/marketing/stitch-pricing";
import "@/components/marketing/stitch-pricing.css";
export const metadata: Metadata = {
  title: "Pricing",
  description: "Compare GridBeacon plans, estimate your monthly geo-grid scan credits, and choose monthly or annual billing.",
  alternates: { canonical: "/pricing" },
};
export default function PricingPage() {
  return <>
    <link rel="stylesheet" href="/stitch-fonts.css" />
    <link rel="stylesheet" href="/pricing-utilities.css" />
    <MarketingHeader />
    <StitchPricing />
    <MarketingFooter />
  </>;
}
