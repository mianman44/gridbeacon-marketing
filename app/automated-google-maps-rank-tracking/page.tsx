import { CommercialFeaturePage } from "@/components/marketing/commercial-feature-page";
import { AUTOMATED_TRACKING } from "@/lib/commercial-pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: AUTOMATED_TRACKING.path, title: AUTOMATED_TRACKING.name, description: AUTOMATED_TRACKING.description });

export default function Page() {
  return <CommercialFeaturePage content={AUTOMATED_TRACKING} />;
}
