import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { stitchMarkup } from "@/components/marketing/stitch-markup";
import "@/components/marketing/stitch-home.css";

export default function HomePage() {
  return <>
    <link rel="stylesheet" href="/stitch-fonts.css" />
    <link rel="stylesheet" href="/stitch-utilities.css" />
    <MarketingHeader />
    <div id="stitch-home" dangerouslySetInnerHTML={{ __html: stitchMarkup }} />
    <MarketingFooter />
  </>;
}
