import { CommercialFeaturePage } from "@/components/marketing/commercial-feature-page";
import { GMB_RANK_TRACKER } from "@/lib/commercial-pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: GMB_RANK_TRACKER.path, title: "GMB Rank Tracker for Google Business Profiles", description: GMB_RANK_TRACKER.description });

export default function Page() {
  return <CommercialFeaturePage content={GMB_RANK_TRACKER} />;
}
