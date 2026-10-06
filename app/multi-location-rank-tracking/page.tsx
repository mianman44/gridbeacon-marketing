import { CommercialFeaturePage } from "@/components/marketing/commercial-feature-page";
import { MULTI_LOCATION } from "@/lib/commercial-pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: MULTI_LOCATION.path, title: MULTI_LOCATION.name, description: MULTI_LOCATION.description });

export default function Page() {
  return <CommercialFeaturePage content={MULTI_LOCATION} />;
}
