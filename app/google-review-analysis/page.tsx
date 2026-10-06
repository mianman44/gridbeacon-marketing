import { CommercialFeaturePage } from "@/components/marketing/commercial-feature-page";
import { REVIEW_ANALYSIS } from "@/lib/commercial-pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: REVIEW_ANALYSIS.path, title: REVIEW_ANALYSIS.name, description: REVIEW_ANALYSIS.description });

export default function Page() {
  return <CommercialFeaturePage content={REVIEW_ANALYSIS} />;
}
