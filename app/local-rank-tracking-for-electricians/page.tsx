import { IndustryPage, industryMetadata } from "@/components/marketing/industry-page";
import { industryBySlug } from "@/lib/industries";

/* Copy and scan live in lib/industries.ts; the page 404s until the
   trade has a real scan. */
const industry = industryBySlug("electricians");

export const metadata = industryMetadata(industry);

export default function ElectriciansRankTrackingPage() {
  return <IndustryPage industry={industry} />;
}
