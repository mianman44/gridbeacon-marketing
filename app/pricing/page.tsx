import type { Metadata } from "next";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { StitchPricing } from "@/components/marketing/stitch-pricing";
import { FaqStructuredData, ProductPageStructuredData, faqsFromMarkup } from "@/components/marketing/structured-data";
import { pricingMarkup } from "@/components/marketing/stitch-pricing-markup";
import { pageMetadata } from "@/lib/seo";
import "@/components/marketing/stitch-pricing.css";
export const metadata: Metadata = pageMetadata({
  path: "/pricing",
  title: "Local Rank Tracker Pricing: Plans From $0",
  description:
    "GridBeacon plans from $0 to $69.99 a month. One credit per grid point, 500 free credits at signup, monthly credit allowances and one-time top-up packs.",
});
export default function PricingPage() {
  return <>
    <link rel="stylesheet" href="/stitch-fonts.css" />
    <link rel="stylesheet" href="/pricing-utilities.css" />
    {/* The plan offers live on the shared SoftwareApplication node. */}
    <ProductPageStructuredData name="Pricing" path="/pricing" />
    <FaqStructuredData items={faqsFromMarkup(pricingMarkup)} />
    <MarketingHeader />
    <StitchPricing />
    <MarketingFooter />
  </>;
}
