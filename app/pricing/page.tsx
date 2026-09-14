import type { Metadata } from "next";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { StitchPricing } from "@/components/marketing/stitch-pricing";
import { BreadcrumbStructuredData } from "@/components/marketing/structured-data";
import { pageMetadata } from "@/lib/seo";
import "@/components/marketing/stitch-pricing.css";
export const metadata: Metadata = pageMetadata({
  path: "/pricing",
  title: "Pricing & Scan Credits",
  description:
    "GridBeacon plans from $0 to $69.99 a month. One credit per grid point, 500 free credits at signup, monthly credit allowances and one-time top-up packs.",
});
export default function PricingPage() {
  return <>
    <link rel="stylesheet" href="/stitch-fonts.css" />
    <link rel="stylesheet" href="/pricing-utilities.css" />
    <BreadcrumbStructuredData name="Pricing" path="/pricing" />
    <MarketingHeader />
    <StitchPricing />
    <MarketingFooter />
  </>;
}
