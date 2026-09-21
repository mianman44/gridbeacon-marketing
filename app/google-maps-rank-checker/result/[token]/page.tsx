import type { Metadata } from "next";

import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { RankCheckResultPage } from "@/components/marketing/rank-checker/rank-check-result-page";

/* The link is emailed, so it must never be indexed and never appear in
   the sitemap: it is a private view of one visitor's scan. */
export const metadata: Metadata = {
  title: "Your Google Maps Rank Check",
  robots: { index: false, follow: false },
};

export default async function ResultPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return (
    <>
      <MarketingHeader />
      <main id="main-content">
        <RankCheckResultPage token={token} />
      </main>
      <MarketingFooter />
    </>
  );
}
