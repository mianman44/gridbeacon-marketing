import localFont from "next/font/local";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { BreadcrumbStructuredData } from "@/components/marketing/structured-data";
import { GoogleMapsRankCheckerPage } from "@/components/marketing/rank-checker/rank-checker-page";
import { pageMetadata } from "@/lib/seo";

const geist = localFont({
  src: "../../public/fonts/geist-latin-variable.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-rank-geist",
  // Not preloaded: this Next version emits a page font's preload on
  // every route, which put Geist and JetBrains Mono on the home page.
  // display:swap keeps text visible while they load here.
  preload: false,
});

const mono = localFont({
  src: "../../public/fonts/jetbrains-mono-latin-variable.woff2",
  weight: "100 800",
  display: "swap",
  variable: "--font-rank-mono",
  preload: false,
});

export const metadata = pageMetadata({
  path: "/google-maps-rank-checker",
  title: "Free Google Maps Rank Checker",
  description:
    "Check how a business ranks across Google Maps locations with GridBeacon's free local rank checker and geo-grid visibility preview.",
});

export default function Page() {
  return (
    <>
      <BreadcrumbStructuredData name="Google Maps Rank Checker" path="/google-maps-rank-checker" />
      <MarketingHeader />
      <div className={`${geist.variable} ${mono.variable}`}>
        <GoogleMapsRankCheckerPage />
      </div>
      <MarketingFooter />
    </>
  );
}
