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
 * GridBeacon as a Whitespark alternative.
 *
 * Whitespark sells products separately; the one that competes with
 * GridBeacon is Local Ranking Grids, which uses the same credit model
 * (one credit per point). That makes this the most direct price
 * comparison of all the pages, so the credit table is the centre of
 * it, and it says plainly where Whitespark is cheaper (the $10 entry
 * plan) and what it has that GridBeacon lacks (white-label live links,
 * Bing and organic tracking in its separate Local Rank Tracker).
 */

const PATH = "/whitespark-alternative";
const IMAGES = "/marketing/google-maps-rank-tracker";

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: "Whitespark Alternative for Local Ranking Grids | GridBeacon",
  description:
    "Comparing Whitespark Local Ranking Grids with GridBeacon? See credit prices plan by plan, grid sizes, free credits, competitor data and where each tool wins.",
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
    "Is GridBeacon a good Whitespark alternative?",
    "For Google Maps geo-grid tracking, yes. GridBeacon and Whitespark Local Ranking Grids both charge one credit per grid point, but GridBeacon includes more credits for the money on comparable plans, allows larger grids (up to 441 points against 225) and gives 500 free credits against 200. Whitespark is the better fit if you need white-label live report links or organic and Bing rank tracking.",
  ],
  [
    "Is GridBeacon cheaper than Whitespark?",
    "On comparable plan sizes, yes. 15,000 credits cost $34.99 a month on GridBeacon and $50 on Whitespark Local Ranking Grids; 32,000 credits cost $69.99 against $100. Whitespark has a cheaper starting point ($10 for 2,000 credits) and larger plans above 32,000 credits.",
  ],
  [
    "Do Whitespark and GridBeacon count credits the same way?",
    "Yes. Both charge one credit per grid point, so a 5 × 5 grid uses 25 credits in either tool, and both let you switch off points you don't need. In both, plan credits do not carry over to the next billing period. GridBeacon's separately bought top-up credits do.",
  ],
  [
    "What is the difference between Whitespark Local Rank Tracker and Local Ranking Grids?",
    "They are separate Whitespark products. Local Rank Tracker tracks keyword positions in local packs, Google Maps and organic results on Google and Bing, from $14 a month. Local Ranking Grids is the geo-grid heatmap tool, from $10 a month. GridBeacon competes with Local Ranking Grids.",
  ],
  [
    "Does GridBeacon offer white-label client links like Whitespark?",
    "No. Whitespark lets you share live, white-label grid links with clients. GridBeacon lets you invite teammates and download PDF reports and CSV exports, but reports carry GridBeacon's branding and there are no public client links yet.",
  ],
  [
    "Is GridBeacon affiliated with Whitespark?",
    `No. Whitespark is a separate company and its names and marks belong to its owner. This page compares the two products using Whitespark's public website, checked in ${COMPETITORS_CHECKED}.`,
  ],
];

export default function WhitesparkAlternativePage() {
  return (
    <SeoLandingPage>
      <ProductPageStructuredData name="Whitespark Alternative" path={PATH} faqs={FAQS} />

      <Hero
        eyebrow="Whitespark alternative"
        title="A Whitespark Alternative With More Credits per Dollar"
        lede={
          <>
            Whitespark&apos;s Local Ranking Grids and GridBeacon price geo-grid
            scans the same way: one credit per point. The difference is how
            many credits each dollar buys, how big a grid you can run and
            what comes with each scan. Here is the plan-by-plan comparison,
            including where Whitespark wins.
          </>
        }
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        primaryNote="No credit card required. New accounts get 500 free scan credits."
        secondary={{ label: "Compare Credit Prices", href: "#credits" }}
        facts={["15,000 credits for $34.99", "Grids up to 441 points", "500 free credits"]}
        updated={COMPETITORS_CHECKED}
        media={
          <Screenshot
            src={`${IMAGES}/rank-movement-heatmap-20260919.webp`}
            width={1600}
            height={813}
            eager
            sizes="(min-width: 1240px) 700px, (min-width: 1024px) 56vw, 100vw"
            alt="GridBeacon heatmap with trend arrows showing where Google Maps rankings rose or fell since an earlier scan"
            caption="A real GridBeacon scan with trend arrows against the previous one."
          />
        }
      />

      <Section
        id="short-answer"
        eyebrow="The short answer"
        title="GridBeacon or Whitespark: Which Should You Use?"
      >
        <Split
          media={
            <Note>
              Whitespark sells its tools separately: Local Ranking Grids,
              Local Rank Tracker, Local Citation Finder and Reputation
              Builder. This page compares GridBeacon with Local Ranking Grids,
              the geo-grid tool.
            </Note>
          }
        >
          <p>
            <strong>Choose GridBeacon</strong> if you scan more than a few
            thousand grid points a month. From 8,000 credits up, GridBeacon
            gives more credits per dollar, runs grids up to 21 × 21, and adds
            competitor grids, a Gap view, AI reports and review analysis at
            no extra cost.
          </p>
          <p>
            <strong>Choose Whitespark</strong> if you only need a couple of
            small grids a month (its $10 plan is cheaper than any paid
            GridBeacon plan), if clients expect live white-label links, or if
            you also want Bing and organic rank tracking from the same
            company.
          </p>
        </Split>
        <Toc
          items={[
            ["Credit prices plan by plan", "credits"],
            ["Feature comparison", "comparison"],
            ["Why teams switch", "why-gridbeacon"],
            ["When Whitespark is better", "when-whitespark"],
            ["How to switch", "switching"],
            ["FAQ", "faq"],
          ]}
        />
      </Section>

      <Section
        id="credits"
        tone="tint"
        eyebrow="Pricing"
        title="Whitespark vs GridBeacon Credit Prices"
        intro={
          <p>
            Both tools charge one credit per grid point, so credits are a
            fair like-for-like measure. A 7 × 7 grid costs 49 credits in
            either tool.
          </p>
        }
      >
        <ComparisonTable
          label="Monthly credits and prices, GridBeacon compared with Whitespark Local Ranking Grids"
          columns={["Credits a month", "GridBeacon", "Whitespark Local Ranking Grids"]}
          rows={[
            ["2,000", "Top-up pack: $9.99 (no monthly plan this small)", "$10/mo"],
            ["5,000–8,000", "8,000 for $19.99/mo", "5,000 for $20/mo"],
            ["15,000", "$34.99/mo", "$50/mo"],
            ["32,000", "$69.99/mo", "$100/mo"],
            ["48,000 and up", "Agency plan plus top-up packs", "48,000 for $150/mo; 65,000+ from $200/mo"],
            ["Cost per credit", "$0.0022–$0.0025 monthly; from $0.0017 billed annually", "$0.0030–$0.0050"],
            ["Free credits", "500 on signup", "200 on signup"],
            ["Unused plan credits", "Reset each billing cycle; top-up credits carry over", "Expire after each billing period"],
          ]}
          caption={
            <>
              Monthly prices in USD. Whitespark figures from{" "}
              <TextLink href={SOURCES.whitesparkGrids} rel="nofollow noopener">
                its Local Ranking Grids page
              </TextLink>
              , checked in {COMPETITORS_CHECKED}. GridBeacon annual billing is
              $15.99, $27.99 and $55.99 a month; see{" "}
              <TextLink href="/pricing">our pricing page</TextLink>.
            </>
          }
        />
      </Section>

      <Section
        id="comparison"
        eyebrow="Side by side"
        title="GridBeacon vs Whitespark Local Ranking Grids Features"
      >
        <ComparisonTable
          label="GridBeacon compared with Whitespark Local Ranking Grids"
          columns={["", "GridBeacon", "Whitespark"]}
          rows={[
            ["Grid size", "3 × 3 to 21 × 21 (9 to 441 points)", "4 to 225 points"],
            ["Scan radius", "0.1 to 100 miles", "A neighbourhood up to a whole country"],
            ["Switch off points", "Yes, excluded points are not charged", "Yes"],
            ["Scheduling", "Daily, weekly, biweekly or monthly, with email alerts", "Daily, weekly or monthly at a set time"],
            ["Competitor data", "Every business at every point; any competitor's grid and a Gap view", "Tracks up to 100 competitors with review velocity and GBP changes"],
            ["AI analysis", "AI Ranking Intelligence PDF and AI Action Plan (paid plans)", "Not listed"],
            ["Reviews", "Review Intelligence: analysis of up to 500 reviews", "Separate product (Reputation Builder, $79/location/mo)"],
            ["Keyword research", "Keyword Explorer with local search volume (paid plans)", "Not included"],
            ["Organic and Bing tracking", "Not available", "Separate product (Local Rank Tracker, from $14/mo)"],
            ["Client sharing", "Team invites, PDF reports and CSV exports", "Live white-label share links, CSV and PDF export"],
          ]}
          caption={
            <>
              Whitespark details from{" "}
              <TextLink href={SOURCES.whitesparkGrids} rel="nofollow noopener">
                Local Ranking Grids
              </TextLink>{" "}
              and{" "}
              <TextLink href={SOURCES.whitesparkTracker} rel="nofollow noopener">
                Local Rank Tracker
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
        title="Why Teams Choose GridBeacon Over Whitespark"
      >
        <Cards
          items={[
            {
              title: "About 30% less per credit",
              body: "At 15,000 and 32,000 credits a month, GridBeacon costs $34.99 and $69.99 against Whitespark's $50 and $100. Annual billing lowers it further.",
            },
            {
              title: "Grids nearly twice as large",
              body: "Up to 441 points in a 21 × 21 grid, for metro-wide service areas that a 225-point ceiling can't cover at useful density.",
            },
            {
              title: "More included in one plan",
              body: "Review Intelligence, GBP Activity monitoring, Keyword Explorer and AI reports come with paid plans instead of being separate subscriptions.",
            },
            {
              title: "See who wins each point",
              body: "Click any grid point for the full list of businesses Google Maps ranked there, then open any of them as its own grid.",
            },
            {
              title: "A bigger free start",
              body: "500 free credits covers one full 21 × 21 scan, or twenty 5 × 5 scans, before you pay anything.",
            },
            {
              title: "Unlimited businesses and keywords",
              body: "Paid plans have no cap on profiles, keywords or team members. Credits are the only meter.",
            },
          ]}
        />
      </Section>

      <Section
        id="when-whitespark"
        eyebrow="Straight answer"
        title="When Whitespark Is the Better Fit"
        intro={<p>Whitespark is likely the better choice if you need:</p>}
      >
        <Split
          media={
            <Screenshot
              src={`${IMAGES}/scan-history-table.webp`}
              width={1600}
              height={749}
              alt="GridBeacon scan history table listing past scans with visibility, average rank and top-3 share"
              caption="GridBeacon keeps every scan so you can compare any two."
            />
          }
        >
          <Checklist
            items={[
              "Live, white-label report links your clients can open without an account.",
              "Rank tracking in organic results and on Bing, not just Google Maps.",
              "A very small monthly budget: Whitespark's $10 plan (2,000 credits) is below GridBeacon's cheapest paid plan.",
              "More than 32,000 credits a month on a single plan.",
              "Citation research and building, or review generation, from the same vendor.",
              "Competitor tracking that follows review velocity and Google Business Profile edits.",
            ]}
          />
        </Split>
      </Section>

      <Section
        id="switching"
        tone="tint"
        eyebrow="Switching"
        title="Moving From Whitespark to GridBeacon"
        intro={
          <p>
            Nothing needs to be connected. Run both until your current
            Whitespark credits run out, then decide.
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
              title: "Add your businesses",
              body: "Find each on Google Maps by name or paste its Maps link. Service-area businesses are supported.",
            },
            {
              title: "Recreate your grids",
              body: "Use the same keyword, grid size and radius, and exclude the same points, so results line up.",
            },
            {
              title: "Schedule and compare",
              body: "Set scans to run daily, weekly or monthly and compare the heatmaps with your Whitespark history.",
            },
          ]}
        />
        <InlineCta>
          <TextLink href="/how-it-works">How GridBeacon works</TextLink>
          {" · "}
          <TextLink href="/pricing">Compare plans</TextLink>
        </InlineCta>
        <RelatedComparisons current={PATH} />
      </Section>

      <Section id="faq" eyebrow="FAQ" title="GridBeacon vs Whitespark Questions">
        <Faq items={FAQS.map(([question, answer]) => [question, <p key="a">{answer}</p>])} />
      </Section>

      <CtaBand
        title="Get More Grid Points for Your Money"
        body="Recreate your Whitespark grid in GridBeacon on 500 free credits and compare the heatmaps side by side."
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        note="No credit card required. Whitespark is a trademark of its owner; GridBeacon is not affiliated with it."
        secondary={{ label: "View Pricing", href: "/pricing" }}
      />
    </SeoLandingPage>
  );
}
