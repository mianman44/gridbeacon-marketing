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
  Screenshot,
  Section,
  SeoLandingPage,
  Split,
  Steps,
  TextLink,
} from "@/components/marketing/seo-landing";
import { ProductPageStructuredData } from "@/components/marketing/structured-data";
import { pageMetadata, SIGNUP_URL } from "@/lib/seo";

/*
 * GridBeacon as a Local Falcon alternative.
 *
 * A comparison page is only worth something if a Local Falcon user
 * would recognise the description of their own tool, so every claim
 * about Local Falcon comes from its public website (pricing page,
 * home page and knowledge base) and the page says where GridBeacon is
 * the weaker choice as plainly as where it is the stronger one.
 * Re-check the figures in LOCAL_FALCON_CHECKED whenever this page is
 * edited: competitor pricing drifts.
 */

const PATH = "/local-falcon-alternative";
const IMAGES = "/marketing/google-maps-rank-tracker";
const LOCAL_FALCON_PRICING = "https://www.localfalcon.com/pricing";
const LOCAL_FALCON_CHECKED = "September 2026";

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: "Local Falcon Alternative | GridBeacon Geo-Grid Rank Tracker",
  description:
    "Comparing GridBeacon and Local Falcon? See how the two geo-grid rank trackers differ on credit pricing, free credits, competitor grids, AI reports and features.",
  absoluteTitle: true,
  image: {
    url: `${IMAGES}/og-google-maps-rank-tracker.jpg`,
    width: 1200,
    height: 630,
    alt: "A GridBeacon geo-grid scan showing a business's Google Maps rankings at 25 points across Dallas",
  },
});

const FAQS: [string, React.ReactNode][] = [
  [
    "Is GridBeacon a good Local Falcon alternative?",
    <p key="a">
      For Google Maps rank tracking, yes: both run geo-grid scans with the
      same grid sizes and radius range, and both charge one credit per grid
      point. GridBeacon costs less per credit and includes competitor grids
      from every scan. If you also need Apple Maps or AI search tracking,
      white-label reports or an API, Local Falcon covers more.
    </p>,
  ],
  [
    "Is GridBeacon cheaper than Local Falcon?",
    <p key="a">
      On the plans that are closest in size, yes. GridBeacon&apos;s plans
      work out roughly 25–32% cheaper per included credit, and its top-up
      packs cost a fraction of Local Falcon&apos;s pay-as-you-go rate.
      Local Falcon&apos;s AI analysis is cheaper per report (25 credits
      against 100), and it offers larger plans than GridBeacon.
    </p>,
  ],
  [
    "Do the two tools count credits the same way?",
    <p key="a">
      Yes. Both use one credit per grid point, so a 9 × 9 scan uses 81
      credits in either tool. In both, a plan&apos;s monthly credits
      don&apos;t carry over to the next billing cycle; credits bought
      separately do.
    </p>,
  ],
  [
    "Can GridBeacon track Apple Maps, ChatGPT or Google AI Overviews?",
    <p key="a">
      No. GridBeacon tracks Google Maps rankings. Local Falcon also tracks
      Apple Maps and AI answer engines, so it is the better fit if you
      report on those.
    </p>,
  ],
  [
    "Does GridBeacon offer white-label reports?",
    <p key="a">
      Not today. GridBeacon&apos;s AI Ranking Intelligence reports are
      PDFs you can share with clients, but they carry GridBeacon&apos;s
      branding.
    </p>,
  ],
  [
    "Can I import my Local Falcon scan history?",
    <p key="a">
      No. GridBeacon starts a new history from your first scan. Running the
      same keywords with the same grid and radius gives you a like-for-like
      starting point to compare with your last Local Falcon report.
    </p>,
  ],
  [
    "Is GridBeacon affiliated with Local Falcon?",
    <p key="a">
      No. Local Falcon is a separate company and its names and marks belong
      to its owner. This page compares the two products using Local
      Falcon&apos;s public website, checked in {LOCAL_FALCON_CHECKED}.
    </p>,
  ],
];

export default function LocalFalconAlternativePage() {
  return (
    <SeoLandingPage>
      <ProductPageStructuredData name="Local Falcon Alternative" path={PATH} />

      <Hero
        eyebrow="Local Falcon alternative"
        title="A Local Falcon Alternative for Google Maps Rank Tracking"
        lede={
          <>
            GridBeacon is a geo-grid rank tracker built around Google Maps. If
            what you need is to see where a business ranks across its service
            area, who beats it and how that changes, GridBeacon does it for
            less per credit. Here is an honest comparison, including where
            Local Falcon is the better choice.
          </>
        }
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        primaryNote="No credit card required. New accounts get 500 free scan credits."
        secondary={{ label: "See the Comparison", href: "#comparison" }}
        facts={["500 free credits", "Plans from $19.99/month", "1 credit per grid point"]}
        media={
          <Screenshot
            src={`${IMAGES}/grid-point-competitors.webp`}
            width={1600}
            height={772}
            eager
            sizes="(min-width: 1240px) 700px, (min-width: 1024px) 56vw, 100vw"
            alt="GridBeacon geo-grid heatmap with one point selected, listing the competitors Google Maps ranked at that location"
            caption="A real GridBeacon scan. Selecting a grid point lists every business Google Maps returned there."
          />
        }
      />

      <Section
        id="comparison"
        eyebrow="Side by side"
        title="GridBeacon vs Local Falcon at a Glance"
        intro={
          <p>
            The two tools scan the same way: a grid of points around a
            business, one Google Maps search per point, one credit per point.
            They differ on price, on what comes with each scan and on how
            much sits around the core rank tracking.
          </p>
        }
      >
        <ComparisonTable
          label="GridBeacon compared with Local Falcon"
          columns={["", "GridBeacon", "Local Falcon"]}
          rows={[
            ["Free credits on signup", "500", "100"],
            ["What a credit buys", "One grid point", "One grid point (“map pin”)"],
            ["Grid sizes", "3 × 3 to 21 × 21", "3 × 3 to 21 × 21"],
            ["Scan radius", "0.1 to 100 miles", "0.1 to 100 miles"],
            ["Entry plan", "$19.99/mo · 8,000 credits", "$24.99/mo · 7,500 credits"],
            ["Mid-size plan", "$34.99/mo · 15,000 credits", "$49.99/mo · 15,150 credits"],
            ["Larger plan", "$69.99/mo · 32,000 credits", "$99.99/mo · 31,250 credits"],
            ["Largest self-serve plan", "$69.99/mo · 32,000 credits", "$199.99/mo · 63,150 credits"],
            ["Extra credits", "Top-up packs from $9.99 for 2,000 (about $0.0035–$0.005 each)", "Pay-as-you-go at $0.05 per credit"],
            ["Unused plan credits", "Refresh each billing cycle", "Expire at the end of each month or year"],
            ["AI scan analysis", "AI Ranking Intelligence report, 100 credits (paid plans)", "Falcon AI analysis, 25 credits"],
            ["Maps and search platforms", "Google Maps", "Google Maps, Apple Maps and AI answer engines (ChatGPT, Gemini, Google AI Overviews and AI Mode, Grok)"],
            ["Competitor data", "Competitor grids and a Gap view from every scan, no extra credits", "Competitor Report"],
            ["Scheduled scans", "Daily to monthly, paid plans", "Yes (Campaigns)"],
            ["White-label reports", "Not available", "Available"],
            ["API and integrations", "Not available", "API, MCP, Looker Studio, Slack, Zapier, n8n"],
          ]}
          caption={
            <>
              Monthly prices in USD. Local Falcon details from{" "}
              <TextLink href={LOCAL_FALCON_PRICING} rel="nofollow noopener">
                its public pricing page
              </TextLink>{" "}
              and website, checked in {LOCAL_FALCON_CHECKED}; they may have
              changed since. GridBeacon details from{" "}
              <TextLink href="/pricing">our pricing page</TextLink>.
            </>
          }
        />
      </Section>

      <Section
        id="why-gridbeacon"
        tone="tint"
        eyebrow="Where GridBeacon stands out"
        title="Why Teams Choose GridBeacon"
      >
        <Cards
          items={[
            {
              title: "Lower price per credit",
              body: "On the closest plan sizes, GridBeacon's included credits cost roughly 25–32% less. At the entry level that is 8,000 credits for $19.99 against 7,500 for $24.99.",
            },
            {
              title: "Much cheaper extra credits",
              body: "Top-up packs work out at about $0.0035–$0.005 a credit, against $0.05 on Local Falcon's pay-as-you-go. Helpful in a month with more scanning than usual.",
            },
            {
              title: "Five times the free credits",
              body: "500 credits at signup covers a full 21 × 21 scan (441 credits). 100 credits covers a 9 × 9 (81).",
            },
            {
              title: "Competitor grids from every scan",
              body: "Every scan records the full local results at each point, so any competitor's grid, and a Gap view against yours, costs nothing extra.",
            },
            {
              title: "More built into paid plans",
              body: "Review Intelligence, GBP Activity monitoring, AI Action Plans, Keyword Explorer and scheduled scans with email alerts.",
            },
            {
              title: "Focused on Google Maps",
              body: "One job, done clearly: a heatmap, the businesses ahead of you and your history, without a wider AI-search suite to pay for.",
            },
          ]}
        />
      </Section>

      <Section
        id="when-local-falcon"
        eyebrow="Straight answer"
        title="When Local Falcon Is the Better Fit"
        intro={
          <p>
            Local Falcon does more than GridBeacon in several areas. It is
            likely the better choice if you need any of these:
          </p>
        }
      >
        <Split
          media={
            <Note>
              Most local businesses and many agencies only report on Google
              Maps rankings. If that is you, the features on the left
              won&apos;t change your results, and GridBeacon&apos;s lower
              credit prices will.
            </Note>
          }
        >
          <Checklist
            items={[
              "Rank tracking on Apple Maps, or visibility in AI answer engines such as ChatGPT, Gemini and Google AI Overviews.",
              "White-label reports under your agency's own brand.",
              "An API, MCP access or integrations with Looker Studio, Zapier, Slack or n8n.",
              "An AI agent that can act on a Google Business Profile, such as replying to reviews or publishing posts.",
              "More than 32,000 credits a month on a single self-serve plan.",
              "Cheaper AI analysis per scan (25 credits against GridBeacon's 100).",
              "Reporting built around its Share of Local Voice (SoLV®) metric.",
            ]}
          />
        </Split>
      </Section>

      <Section
        id="what-you-get"
        tone="tint"
        eyebrow="What GridBeacon does"
        title="Google Maps Rank Tracking Without the Extras"
      >
        <Split
          reverse
          media={
            <Screenshot
              src={`${IMAGES}/rank-movement-heatmap.webp`}
              width={1600}
              height={813}
              alt="GridBeacon heatmap with trend arrows showing where Google Maps rankings rose or fell since an earlier scan"
              caption="Trend arrows on a real scan show which points moved since the previous one."
            />
          }
        >
          <p>
            GridBeacon checks a keyword from every point of a grid around a
            business and shows the result as a colour-coded heatmap, with
            visibility, average rank and top-3 share for the whole area.
          </p>
          <Checklist
            items={[
              "Click any point to see the businesses ranked there.",
              "Open any competitor's grid, or the Gap view against yours.",
              "Compare scans over time and follow movement over 7 to 60 days.",
              "Generate an AI Ranking Intelligence PDF for a client (paid plans).",
            ]}
          />
          <p>
            <TextLink href="/google-maps-rank-tracker">
              See the full Google Maps rank tracker
            </TextLink>
          </p>
        </Split>
      </Section>

      <Section
        id="switching"
        eyebrow="Switching"
        title="Moving From Local Falcon to GridBeacon"
        intro={
          <p>
            There is nothing to migrate and no card to enter. You can run
            both side by side until you are sure.
          </p>
        }
      >
        <Steps
          items={[
            {
              title: "Create a free account",
              body: "You get 500 scan credits straight away, enough for a full 21 × 21 scan.",
            },
            {
              title: "Add the same business and keywords",
              body: "Find the business on Google Maps by name and add the keywords you track today.",
            },
            {
              title: "Match your grid and radius",
              body: "The grid sizes and radius range are the same as Local Falcon's, so your scans line up.",
            },
            {
              title: "Compare the results",
              body: "Put the first GridBeacon heatmap next to your last Local Falcon report, then decide.",
            },
          ]}
        />
        <InlineCta>
          <TextLink href="/how-it-works">How GridBeacon works</TextLink>
          {" · "}
          <TextLink href="/pricing">Compare plans</TextLink>
        </InlineCta>
      </Section>

      <Section
        id="faq"
        tone="tint"
        eyebrow="FAQ"
        title="GridBeacon vs Local Falcon Questions"
      >
        <Faq items={FAQS} />
      </Section>

      <CtaBand
        title="Try GridBeacon Next to Local Falcon"
        body="Run the same keyword with the same grid on 500 free credits and compare the heatmaps yourself."
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        note="No credit card required. Local Falcon is a trademark of its owner; GridBeacon is not affiliated with it."
        secondary={{ label: "View Pricing", href: "/pricing" }}
      />
    </SeoLandingPage>
  );
}
