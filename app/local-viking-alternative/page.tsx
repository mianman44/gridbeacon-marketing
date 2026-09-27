import type { Metadata } from "next";

import {
  Cards,
  Checklist,
  ComparisonTable,
  CtaBand,
  Faq,
  Hero,
  InlineCta,
  Note,
  RelatedComparisons,
  Screenshot,
  Section,
  SeoLandingPage,
  Split,
  Steps,
  TextLink,
  Toc,
} from "@/components/marketing/seo-landing";
import { ProductPageStructuredData } from "@/components/marketing/structured-data";
import { COMPETITORS_CHECKED, SOURCES } from "@/lib/competitors";
import { pageMetadata, SIGNUP_URL } from "@/lib/seo";

/*
 * GridBeacon as a Local Viking alternative.
 *
 * localviking.com now redirects its pricing to app.localoptics.com:
 * the product is being renamed Local Optics, while its help centre is
 * still branded Local Viking. People still search for "Local Viking",
 * so the page targets that name and explains the rename. Its plans are
 * capped by GBP listings; GridBeacon's are not, which is the main
 * point of difference. Local Viking's GBP management (posts, photos)
 * has no GridBeacon equivalent, and the page says so.
 */

const PATH = "/local-viking-alternative";
const IMAGES = "/marketing/google-maps-rank-tracker";

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: "Local Viking Alternative (Now Local Optics) | GridBeacon",
  description:
    "Outgrowing Local Viking's listing limits? Compare Local Viking (now Local Optics) with GridBeacon on geo-grid credits, listing caps, grid sizes and price.",
  absoluteTitle: true,
  image: {
    url: `${IMAGES}/og-google-maps-rank-tracker.jpg`,
    width: 1200,
    height: 630,
    alt: "A GridBeacon geo-grid scan showing a business's Google Maps rankings at 25 points across Dallas",
  },
});

const FAQS: [string, string][] = [
  [
    "Is Local Viking now called Local Optics?",
    `Local Viking's pricing and sign-up now point to Local Optics (app.localoptics.com), and its site uses both names, while its help centre is still branded Local Viking. The plans below are the ones on the Local Optics pricing page, checked in ${COMPETITORS_CHECKED}.`,
  ],
  [
    "Is GridBeacon a good Local Viking alternative?",
    "For geo-grid rank tracking, yes, especially if you manage many businesses. Local Viking's plans are capped by the number of Google Business Profile listings (1 to 70); GridBeacon's paid plans have unlimited businesses and keywords and charge only for scan credits. Local Viking is the better fit if you also use it to schedule GBP posts and manage profiles.",
  ],
  [
    "How do Local Viking's GeoGrid credits compare with GridBeacon's?",
    "Both charge one credit per grid point. Local Viking's Enterprise plan includes 32,400 GeoGrid credits and 70 listings for $200 a month; GridBeacon's Agency plan includes 32,000 credits and unlimited businesses for $69.99. Local Viking's help centre says GeoGrid credits roll over month to month; GridBeacon's plan credits reset each cycle, while top-up credits carry over.",
  ],
  [
    "What grid sizes do Local Viking and GridBeacon support?",
    "Local Viking's help centre lists grids from 3 × 3 to 13 × 13 (up to 169 points), with 0.1 to 10 miles between points. GridBeacon supports every odd size from 3 × 3 to 21 × 21 (up to 441 points) with a radius from 0.1 to 100 miles.",
  ],
  [
    "Can GridBeacon schedule Google Business Profile posts?",
    "No. GridBeacon measures rankings and monitors GBP activity and reviews, but it does not publish posts or edit profiles. If post scheduling is part of your workflow, Local Viking covers it.",
  ],
  [
    "Is GridBeacon affiliated with Local Viking or Local Optics?",
    `No. Local Viking and Local Optics belong to their owner. This page compares the products using their public pricing page and help centre, checked in ${COMPETITORS_CHECKED}.`,
  ],
];

export default function LocalVikingAlternativePage() {
  return (
    <SeoLandingPage>
      <ProductPageStructuredData name="Local Viking Alternative" path={PATH} faqs={FAQS} />

      <Hero
        eyebrow="Local Viking alternative"
        title="A Local Viking Alternative Without Listing Limits"
        lede={
          <>
            Local Viking, now being renamed Local Optics, prices its plans by
            the number of Google Business Profiles you manage. GridBeacon
            doesn&apos;t: paid plans cover unlimited businesses and keywords,
            with larger grids and a wider radius. Here is how the two compare
            for geo-grid tracking, and what Local Viking does that GridBeacon
            doesn&apos;t.
          </>
        }
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        primaryNote="No credit card required. New accounts get 500 free scan credits."
        secondary={{ label: "See the Comparison", href: "#comparison" }}
        facts={["Unlimited businesses", "32,000 credits for $69.99", "Grids up to 21 × 21"]}
        updated={COMPETITORS_CHECKED}
        media={
          <Screenshot
            src={`${IMAGES}/grid-point-competitors-20260919.webp`}
            width={1600}
            height={772}
            eager
            sizes="(min-width: 1240px) 700px, (min-width: 1024px) 56vw, 100vw"
            alt="GridBeacon geo-grid heatmap with one point selected, listing the competitors Google Maps ranked at that location"
            caption="A real GridBeacon scan. Select any point to see every business ranked there."
          />
        }
      />

      <Section
        id="short-answer"
        eyebrow="The short answer"
        title="Should You Move From Local Viking to GridBeacon?"
      >
        <Split
          media={
            <Note>
              Local Viking combines geo-grid tracking with Google Business
              Profile management: scheduled posts, photos and keyword
              tracking. GridBeacon only replaces the geo-grid part.
            </Note>
          }
        >
          <p>
            <strong>Choose GridBeacon</strong> if geo-grids are what you use
            Local Viking for and its listing cap is what pushes you up a
            plan. At 32,000 credits a month, GridBeacon costs $69.99 with no
            limit on businesses; Local Viking&apos;s plan with the same
            credits costs $200 and covers 70 listings.
          </p>
          <p>
            <strong>Stay with Local Viking</strong> if you rely on it to
            schedule Google Business Profile posts and photos for clients,
            want GeoGrid credits that roll over, or need white-label reports
            and an embeddable GeoGrid widget.
          </p>
        </Split>
        <Toc
          items={[
            ["Plans and listing limits", "plans"],
            ["Feature comparison", "comparison"],
            ["Why teams switch", "why-gridbeacon"],
            ["When Local Viking is better", "when-local-viking"],
            ["How to switch", "switching"],
            ["FAQ", "faq"],
          ]}
        />
      </Section>

      <Section
        id="plans"
        tone="tint"
        eyebrow="Pricing"
        title="Local Viking (Local Optics) Plans vs GridBeacon Plans"
        intro={
          <p>
            Local Viking&apos;s plans each include a number of GBP listings,
            keyword credits and GeoGrid credits. GridBeacon&apos;s include
            scan credits only, with unlimited businesses on every paid plan.
          </p>
        }
      >
        <ComparisonTable
          label="Local Viking plans next to the GridBeacon plan with similar geo-grid credits"
          columns={["Local Viking plan", "Nearest GridBeacon plan", "Local Viking (Local Optics)"]}
          rows={[
            ["Single", "Starter: $19.99/mo, 8,000 credits, unlimited businesses", "$39/mo: 1 listing, 7,500 GeoGrid credits, 1,600 keyword credits"],
            ["Starter", "Starter: $19.99/mo, 8,000 credits, unlimited businesses", "$59/mo: 10 listings, 8,100 GeoGrid credits, 3,200 keyword credits"],
            ["Pro", "Professional: $34.99/mo, 15,000 credits, unlimited businesses", "$99/mo: 20 listings, 16,200 GeoGrid credits, 5,600 keyword credits, white label"],
            ["Agency", "Agency: $69.99/mo, 32,000 credits, unlimited businesses", "$149/mo: 40 listings, 24,300 GeoGrid credits, 17,700 keyword credits, white label"],
            ["Enterprise", "Agency: $69.99/mo, 32,000 credits, unlimited businesses", "$200/mo: 70 listings, 32,400 GeoGrid credits, 26,600 keyword credits, white label"],
          ]}
          caption={
            <>
              Monthly prices in USD. Local Viking plans from{" "}
              <TextLink href={SOURCES.localOpticsPricing} rel="nofollow noopener">
                the Local Optics pricing page
              </TextLink>
              , checked in {COMPETITORS_CHECKED}. Local Viking keyword credits
              pay for its separate Maps and organic keyword tracking, which
              GridBeacon does not offer.
            </>
          }
        />
      </Section>

      <Section
        id="comparison"
        eyebrow="Side by side"
        title="GridBeacon vs Local Viking Geo-Grid Features"
      >
        <ComparisonTable
          label="GridBeacon compared with Local Viking"
          columns={["", "GridBeacon", "Local Viking"]}
          rows={[
            ["Businesses per plan", "Unlimited on paid plans", "1 to 70 GBP listings, by plan"],
            ["Grid sizes", "3 × 3 to 21 × 21 (up to 441 points)", "3 × 3 to 13 × 13 (up to 169 points)"],
            ["Coverage", "Radius from 0.1 to 100 miles", "0.1 to 10 miles between points"],
            ["Credit model", "1 credit per grid point", "1 credit per grid point"],
            ["Unused credits", "Plan credits reset each cycle; top-ups carry over", "GeoGrid credits roll over"],
            ["Scheduled scans", "Daily, weekly, biweekly or monthly, with email alerts", "Weekly or monthly"],
            ["Competitor data", "Every business at every point; any competitor's grid and a Gap view", "Competitor geogrids by Maps URL, search or Place ID"],
            ["AI analysis", "AI Ranking Intelligence PDF and AI Action Plan (paid plans)", "Not listed"],
            ["Reviews", "Review Intelligence: analysis of up to 500 reviews", "Review management"],
            ["GBP post scheduling", "Not available", "Unlimited GBP posts"],
            ["Organic keyword tracking", "Not available", "Maps and organic, desktop and mobile (keyword credits)"],
            ["White label", "Not available", "Pro plan and up, plus a GeoGrid widget"],
          ]}
          caption={
            <>
              Local Viking details from{" "}
              <TextLink href={SOURCES.localOpticsPricing} rel="nofollow noopener">
                its pricing page
              </TextLink>{" "}
              and help centre articles on{" "}
              <TextLink href={SOURCES.localVikingGrids} rel="nofollow noopener">
                creating geogrids
              </TextLink>{" "}
              and{" "}
              <TextLink href={SOURCES.localVikingCredits} rel="nofollow noopener">
                credits
              </TextLink>
              , checked in {COMPETITORS_CHECKED}.
            </>
          }
        />
      </Section>

      <Section
        id="why-gridbeacon"
        tone="tint"
        eyebrow="Where GridBeacon stands out"
        title="Why Agencies Choose GridBeacon Over Local Viking"
      >
        <Cards
          items={[
            {
              title: "No listing cap",
              body: "Add your 71st client without changing plan. Every paid GridBeacon plan includes unlimited businesses, keywords and team members.",
            },
            {
              title: "Far less for the same credits",
              body: "32,000 geo-grid credits cost $69.99 a month on GridBeacon, against $200 on Local Viking's Enterprise plan.",
            },
            {
              title: "Grids more than twice as large",
              body: "21 × 21 grids (441 points) against Local Viking's 13 × 13 (169), and a radius up to 100 miles for wide service areas.",
            },
            {
              title: "Daily scans when it matters",
              body: "Schedule daily during a campaign or after a profile change, then drop back to weekly or monthly.",
            },
            {
              title: "Every competitor at every point",
              body: "Each scan stores the full local results at each point, so any competitor's grid and a Gap view come free with it.",
            },
            {
              title: "Reports that explain the grid",
              body: "Scan report PDFs and CSV exports, plus AI Ranking Intelligence reports and an action plan on paid plans.",
            },
          ]}
        />
      </Section>

      <Section
        id="when-local-viking"
        eyebrow="Straight answer"
        title="When Local Viking Is the Better Fit"
        intro={<p>Local Viking is likely the better choice if you need:</p>}
      >
        <Split
          media={
            <Screenshot
              src={`${IMAGES}/rank-movement-heatmap-20260919.webp`}
              width={1600}
              height={813}
              alt="GridBeacon heatmap with trend arrows showing where Google Maps rankings rose or fell since an earlier scan"
              caption="GridBeacon's trend arrows show where rankings moved since the last scan."
            />
          }
        >
          <Checklist
            items={[
              "Scheduled Google Business Profile posts and photos across many client profiles.",
              "GeoGrid credits that roll over instead of resetting each month.",
              "White-label reporting and an embeddable GeoGrid widget for client sites.",
              "Keyword tracking in organic results on desktop and mobile, alongside Maps.",
              "Grids placed by a spacing between points rather than an overall radius.",
            ]}
          />
        </Split>
      </Section>

      <Section
        id="switching"
        tone="tint"
        eyebrow="Switching"
        title="Moving Your Geo-Grids From Local Viking"
        intro={
          <p>
            GridBeacon doesn&apos;t need access to your Google Business
            Profiles: you add businesses by finding them on Google Maps. That
            also means you can keep Local Viking for posting while you move
            the grids.
          </p>
        }
      >
        <Steps
          items={[
            {
              title: "Create a free account",
              body: "500 scan credits are added straight away, no card needed.",
            },
            {
              title: "Add every client",
              body: "Find each business by name or paste its Maps link. There is no listing limit on paid plans.",
            },
            {
              title: "Match your grids",
              body: "A 9 × 9 grid with 1 mile between points spans 8 miles edge to edge, so use a 4-mile radius in GridBeacon.",
            },
            {
              title: "Schedule and compare",
              body: "Set the same weekly or monthly cadence and compare the first heatmaps with your Local Viking history.",
            },
          ]}
        />
        <InlineCta>
          <TextLink href="/local-rank-tracker-for-agencies">GridBeacon for agencies</TextLink>
          {" · "}
          <TextLink href="/pricing">Compare plans</TextLink>
        </InlineCta>
        <RelatedComparisons current={PATH} />
      </Section>

      <Section id="faq" eyebrow="FAQ" title="GridBeacon vs Local Viking Questions">
        <Faq items={FAQS.map(([question, answer]) => [question, <p key="a">{answer}</p>])} />
      </Section>

      <CtaBand
        title="Track Every Client Without a Listing Cap"
        body="Recreate your Local Viking geogrids in GridBeacon on 500 free credits, then add as many businesses as you manage."
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        note="No credit card required. Local Viking and Local Optics are trademarks of their owner; GridBeacon is not affiliated with them."
        secondary={{ label: "View Pricing", href: "/pricing" }}
      />
    </SeoLandingPage>
  );
}
