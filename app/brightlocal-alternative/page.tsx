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
 * GridBeacon as a BrightLocal alternative.
 *
 * BrightLocal is a local SEO suite (citations, listings, reviews,
 * audits, organic rank tracking) with a geo-grid tool inside it, not a
 * geo-grid tracker. So the honest pitch is narrow: GridBeacon replaces
 * the Local Search Grid part, and for many readers the right answer is
 * to keep BrightLocal for the rest. The page says so. Every BrightLocal
 * figure comes from lib/competitors.ts sources.
 */

const PATH = "/brightlocal-alternative";
const IMAGES = "/marketing/google-maps-rank-tracker";

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: "BrightLocal Alternative for Geo-Grid Tracking | GridBeacon",
  description:
    "Looking for a BrightLocal alternative for Google Maps grids? Compare Local Search Grid with GridBeacon on keyword limits, grid sizes, pricing and features.",
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
    "Is GridBeacon a good BrightLocal alternative?",
    "For geo-grid rank tracking on Google Maps, yes. GridBeacon runs larger grids over a wider area and lets you scan as many keywords as your credits cover, where BrightLocal's Local Search Grid covers up to five keywords per location on its standard plans. GridBeacon does not replace BrightLocal's citation building, listings sync, review management or organic rank tracking.",
  ],
  [
    "How much does BrightLocal cost compared with GridBeacon?",
    `BrightLocal's plans for one location start at $31 a month billed annually ($369 a year) for Track, $40 for Manage and $49 for Grow, and the price rises with the number of locations. GridBeacon's paid plans are $19.99, $34.99 and $69.99 a month (from $15.99 billed annually), priced by scan credits rather than locations, with unlimited businesses and keywords. BrightLocal prices checked in ${COMPETITORS_CHECKED}.`,
  ],
  [
    "How many keywords can BrightLocal's Local Search Grid track?",
    "BrightLocal's pricing page lists geo-grid tracking for up to five keywords on each plan. Its help centre describes add-ons that raise this to a maximum of 30 keywords per report. GridBeacon has no keyword limit on paid plans: each scan uses one credit per grid point.",
  ],
  [
    "What grid sizes do the two tools support?",
    "BrightLocal's Local Search Grid offers 3 × 3, 5 × 5, 7 × 7, 11 × 11 and 15 × 15 grids. GridBeacon offers every odd size from 3 × 3 to 21 × 21, with a radius from 0.1 to 100 miles, and lets you exclude individual points such as water or empty land.",
  ],
  [
    "Can I use GridBeacon and BrightLocal together?",
    "Yes, and many teams do. BrightLocal handles citations, listings and reviews; GridBeacon handles detailed Google Maps grids. You add a business to GridBeacon by finding it on Google Maps, so nothing needs to be connected or migrated.",
  ],
  [
    "Does GridBeacon offer white-label reports like BrightLocal?",
    "Not today. GridBeacon's scan reports and AI Ranking Intelligence reports are PDFs you can share with clients, but they carry GridBeacon's branding. If white-label reporting is essential, BrightLocal includes it.",
  ],
  [
    "Is GridBeacon affiliated with BrightLocal?",
    `No. BrightLocal is a separate company and its names and marks belong to its owner. This page compares the two products using BrightLocal's public website, checked in ${COMPETITORS_CHECKED}.`,
  ],
];

export default function BrightLocalAlternativePage() {
  return (
    <SeoLandingPage>
      <ProductPageStructuredData name="BrightLocal Alternative" path={PATH} faqs={FAQS} />

      <Hero
        eyebrow="BrightLocal alternative"
        title="The BrightLocal Alternative Built for Google Maps Grids"
        lede={
          <>
            BrightLocal is an all-in-one local SEO suite, and its Local Search
            Grid is one tool among many. GridBeacon does only geo-grid rank
            tracking, so it goes further: grids up to 21 × 21, a 100-mile
            radius, unlimited keywords and competitor grids from every scan.
            Here is an honest comparison, including where BrightLocal is the
            better buy.
          </>
        }
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        primaryNote="No credit card required. New accounts get 500 free scan credits."
        secondary={{ label: "See the Comparison", href: "#comparison" }}
        facts={["Unlimited keywords on paid plans", "Grids up to 21 × 21", "Plans from $19.99/month"]}
        updated={COMPETITORS_CHECKED}
        media={
          <Screenshot
            src={`${IMAGES}/geo-grid-scan-dallas-20260919.webp`}
            width={1600}
            height={780}
            eager
            sizes="(min-width: 1240px) 700px, (min-width: 1024px) 56vw, 100vw"
            alt="GridBeacon geo-grid heatmap of a business's Google Maps rankings across Dallas, with visibility and average rank above the map"
            caption="A real GridBeacon scan: one Google Maps search from every point of the grid."
          />
        }
      />

      <Section
        id="short-answer"
        eyebrow="The short answer"
        title="Should You Switch From BrightLocal?"
      >
        <Split
          media={
            <Note>
              BrightLocal and GridBeacon overlap in one place: the geo-grid.
              Everything else BrightLocal does (citations, listings sync,
              review campaigns, organic rank tracking) GridBeacon does not
              try to do.
            </Note>
          }
        >
          <p>
            <strong>Choose GridBeacon</strong> if the Google Maps map pack is
            where your leads come from and BrightLocal&apos;s five-keyword
            grid is the part you keep running into. You get more keywords,
            bigger grids and a wider radius for less money, and paying by
            credits means no per-location price.
          </p>
          <p>
            <strong>Stay with BrightLocal</strong> if you use it mainly for
            citations, listings management, review generation or white-label
            client reporting. GridBeacon does not replace those.
          </p>
          <p>
            <strong>Use both</strong> if you want BrightLocal&apos;s suite and
            detailed grids. Many agencies keep BrightLocal for listings and
            reviews and run their Maps grids in GridBeacon.
          </p>
        </Split>
        <Toc
          items={[
            ["Side-by-side comparison", "comparison"],
            ["Keyword and grid limits", "limits"],
            ["What it costs", "cost"],
            ["Why teams switch", "why-gridbeacon"],
            ["When BrightLocal is better", "when-brightlocal"],
            ["How to switch", "switching"],
            ["FAQ", "faq"],
          ]}
        />
      </Section>

      <Section
        id="comparison"
        tone="tint"
        eyebrow="Side by side"
        title="GridBeacon vs BrightLocal at a Glance"
        intro={
          <p>
            This compares GridBeacon with BrightLocal&apos;s geo-grid tool,
            Local Search Grid, and lists the rest of BrightLocal&apos;s suite
            so you can see what GridBeacon leaves out.
          </p>
        }
      >
        <ComparisonTable
          label="GridBeacon compared with BrightLocal"
          columns={["", "GridBeacon", "BrightLocal"]}
          rows={[
            ["What it is", "A dedicated Google Maps geo-grid rank tracker", "An all-in-one local SEO suite with a geo-grid tool (Local Search Grid)"],
            ["How you pay", "Monthly scan credits: 1 credit per grid point", "Per plan, priced by number of locations"],
            ["Entry price", "$19.99/mo, or $15.99/mo billed annually", "$31/mo for one location, billed annually ($369/year)"],
            ["Free option", "Free plan with 500 scan credits, no card", "14-day free trial, no card"],
            ["Geo-grid keywords", "Unlimited on paid plans", "Up to 5 per location; up to 30 with add-ons"],
            ["Grid sizes", "3 × 3 to 21 × 21 (up to 441 points)", "3 × 3, 5 × 5, 7 × 7, 11 × 11, 15 × 15"],
            ["Scan radius", "0.1 to 100 miles, with points you can exclude", "Set by grid size and distance"],
            ["Businesses", "Unlimited on paid plans", "Priced per location"],
            ["Competitor grids", "Any competitor's grid and a Gap view from every scan, no extra credits", "Side-by-side grid comparison with a competitor"],
            ["Scheduled scans", "Daily, weekly, biweekly or monthly, with email alerts", "Recurring reports"],
            ["AI analysis", "AI Ranking Intelligence PDF and AI Action Plan (paid plans)", "AI Insights (Manage and Grow)"],
            ["Organic rank tracking", "Not available: Google Maps only", "Local Rank Tracker, up to 100 keywords"],
            ["Citations and listings", "Not available", "Citation Tracker, listings sync, Citation Builder (pay per citation)"],
            ["Review management", "Review Intelligence: analysis of up to 500 reviews", "Monitoring, replies, review campaigns and widgets (Grow)"],
            ["White-label reports", "Not available", "Available"],
            ["API", "Not available", "Custom-priced API"],
          ]}
          caption={
            <>
              Prices in USD. BrightLocal details from{" "}
              <TextLink href={SOURCES.brightLocalPricing} rel="nofollow noopener">
                its pricing page
              </TextLink>
              ,{" "}
              <TextLink href={SOURCES.brightLocalGrid} rel="nofollow noopener">
                Local Search Grid page
              </TextLink>{" "}
              and help centre, checked in {COMPETITORS_CHECKED}; they may
              have changed since. GridBeacon details from{" "}
              <TextLink href="/pricing">our pricing page</TextLink>.
            </>
          }
        />
      </Section>

      <Section
        id="limits"
        eyebrow="Where the tools differ most"
        title="Keyword and Grid Limits: Local Search Grid vs GridBeacon"
        intro={
          <p>
            A single grid shows one keyword. A business that gets calls for
            &ldquo;emergency plumber&rdquo;, &ldquo;water heater
            repair&rdquo; and &ldquo;drain cleaning&rdquo; ranks differently
            for each, often in different parts of town. The number of
            keywords you can put on a grid decides how much of that picture
            you see.
          </p>
        }
      >
        <Split
          reverse
          media={
            <Screenshot
              src={`${IMAGES}/grid-point-competitors-20260919.webp`}
              width={1600}
              height={772}
              alt="GridBeacon heatmap with one grid point selected, listing the businesses Google Maps ranked at that location"
              caption="Every point stores the full local results, so competitor grids cost nothing extra."
            />
          }
        >
          <Checklist
            items={[
              <><strong>Keywords.</strong> BrightLocal&apos;s plans include grids for up to five keywords per location, with add-ons up to 30. GridBeacon has no keyword cap on paid plans: you spend credits on the scans you run.</>,
              <><strong>Grid size.</strong> BrightLocal tops out at 15 × 15 (225 points). GridBeacon goes to 21 × 21 (441 points), which matters for service-area businesses that cover a whole metro.</>,
              <><strong>Coverage.</strong> GridBeacon&apos;s radius runs from 0.1 to 100 miles, and you can switch off points that fall on water or empty land so you don&apos;t pay for them.</>,
              <><strong>Competitors.</strong> Each GridBeacon scan records every business Google Maps returned at every point, so you can open any competitor&apos;s grid, or a Gap view against yours, without scanning again.</>,
            ]}
          />
        </Split>
      </Section>

      <Section
        id="cost"
        tone="tint"
        eyebrow="Pricing"
        title="What Geo-Grid Tracking Costs in Each Tool"
        intro={
          <p>
            BrightLocal prices by location and plan tier; GridBeacon prices
            by scan credits. One credit is one grid point, so a 7 × 7 grid
            costs 49 credits and a 9 × 9 costs 81.
          </p>
        }
      >
        <Cards
          items={[
            {
              tag: "Example",
              title: "One business, 15 keywords",
              body: "A 7 × 7 grid for 15 keywords, scanned weekly, uses about 3,200 credits a month. That fits GridBeacon's Starter plan (8,000 credits, $19.99). On BrightLocal the same 15 keywords need grid add-ons beyond the five included.",
            },
            {
              tag: "Example",
              title: "An agency with 20 clients",
              body: "20 clients × 3 keywords on a 7 × 7 grid, scanned weekly, uses about 12,700 credits a month: GridBeacon's Professional plan (15,000 credits, $34.99). BrightLocal is priced by location count, so 20 clients means a 20-location plan.",
            },
            {
              tag: "Flexible",
              title: "Top-ups when you need more",
              body: "Busy month? GridBeacon top-up packs start at 2,000 credits for $9.99, are spent after your monthly credits, and do not reset at the end of the cycle.",
            },
          ]}
        />
        <InlineCta>
          <TextLink href="/pricing">See GridBeacon plans and the credit calculator</TextLink>
        </InlineCta>
      </Section>

      <Section
        id="why-gridbeacon"
        eyebrow="Where GridBeacon stands out"
        title="Why Teams Choose GridBeacon Over BrightLocal for Grids"
      >
        <Cards
          items={[
            {
              title: "No per-location price",
              body: "Paid plans include unlimited businesses, keywords and team members. You pay for scanning, not for how many profiles you manage.",
            },
            {
              title: "Bigger, wider grids",
              body: "Up to 21 × 21 points and 100 miles, with excluded points for coastlines, lakes and empty land.",
            },
            {
              title: "Competitors at every point",
              body: "Click any point to see who outranks you there, then open their grid or a Gap view: green where you lead, red where they do.",
            },
            {
              title: "Movement over time",
              body: "Trend arrows show which points rose or fell since the last scan, and scan history keeps every grid for comparison.",
            },
            {
              title: "Reports you can send",
              body: "A standard scan report PDF, CSV exports, and on paid plans an AI Ranking Intelligence report with an action plan.",
            },
            {
              title: "Try it without a trial clock",
              body: "The free plan gives you 500 credits, enough for a full 21 × 21 scan, with no time limit and no card.",
            },
          ]}
        />
      </Section>

      <Section
        id="when-brightlocal"
        tone="tint"
        eyebrow="Straight answer"
        title="When BrightLocal Is the Better Fit"
        intro={
          <p>
            BrightLocal covers far more of local SEO than GridBeacon. It is
            likely the better choice if you need:
          </p>
        }
      >
        <Split
          media={
            <Note>
              If most of your BrightLocal use is the grid, GridBeacon will
              likely cost less and show more. If most of it is citations,
              listings and reviews, keep BrightLocal and add GridBeacon only
              if you need bigger grids.
            </Note>
          }
        >
          <Checklist
            items={[
              "Citation tracking, citation building or listings sync across directories and data aggregators.",
              "Review monitoring, review request campaigns and review widgets for your website.",
              "Organic and local-pack rank tracking in Google search, not just Google Maps.",
              "Google Business Profile post scheduling and GBP audits against competitors.",
              "White-label reports under your agency's brand.",
              "An API to pull local search data into your own tools.",
              "AI visibility tracking across ChatGPT and Google's AI answers.",
            ]}
          />
        </Split>
      </Section>

      <Section
        id="switching"
        eyebrow="Switching"
        title="Moving Your Grids From BrightLocal to GridBeacon"
        intro={
          <p>
            There is nothing to connect or migrate, and you can run both side
            by side until you are sure.
          </p>
        }
      >
        <Steps
          items={[
            {
              title: "Create a free account",
              body: "You get 500 scan credits straight away, no card needed.",
            },
            {
              title: "Add the business",
              body: "Find it on Google Maps by name, or paste its Maps link. Service-area businesses are supported.",
            },
            {
              title: "Match your Local Search Grid",
              body: "Use the same keyword, grid size and distance as your BrightLocal report so the results line up.",
            },
            {
              title: "Compare, then expand",
              body: "Put the two grids side by side, then add the keywords BrightLocal's limit kept you from tracking.",
            },
          ]}
        />
        <RelatedComparisons current={PATH} />
      </Section>

      <Section
        id="faq"
        tone="tint"
        eyebrow="FAQ"
        title="GridBeacon vs BrightLocal Questions"
      >
        <Faq items={FAQS.map(([question, answer]) => [question, <p key="a">{answer}</p>])} />
      </Section>

      <CtaBand
        title="Run a Bigger Grid Than BrightLocal Allows"
        body="Scan your most important keywords on grids up to 21 × 21 with 500 free credits, and compare the result with your last Local Search Grid report."
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        note="No credit card required. BrightLocal is a trademark of its owner; GridBeacon is not affiliated with it."
        secondary={{ label: "View Pricing", href: "/pricing" }}
      />
    </SeoLandingPage>
  );
}
