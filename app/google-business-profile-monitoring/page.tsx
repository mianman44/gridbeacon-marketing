import { CommercialFeaturePage } from "@/components/marketing/commercial-feature-page";
import { GBP_MONITORING } from "@/lib/commercial-pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: GBP_MONITORING.path, title: GBP_MONITORING.name, description: GBP_MONITORING.description });

export default function Page() {
  return <CommercialFeaturePage content={GBP_MONITORING} />;
}
