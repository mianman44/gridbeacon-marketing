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
  OtherAlternatives,
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
import { PROMAPRANKER_CHECKED, SOURCES } from "@/lib/competitors";
import { pageMetadata, SIGNUP_URL } from "@/lib/seo";

/*
 * GridBeacon as a ProMapRanker alternative.
 *
 * The two are priced almost identically at the bottom (8,000 credits
 * for $19 vs $19.99), so the page cannot lean on price. The real
 * differences are business caps (ProMapRanker: 5 and 30 on its two
 * smaller plans), rollover (ProMapRanker's paid credits never expire;
 * GridBeacon's plan credits reset), annual billing, and white label
 * (ProMapRanker from its Starter plan, GridBeacon on Agency only). The
 * page says where ProMapRanker wins. Every ProMapRanker figure is from
 * its own pricing and features pages, read in PROMAPRANKER_CHECKED.
 * Its FAQ says a grid point costs 2 credits while its credit table
 * uses 1; the page reports that rather than picking one.
 */

const PATH = "/promapranker-alternative";
const IMAGES = "/marketing/google-maps-rank-tracker";
/* Real captures with business names blurred or covered; see
   SCREENSHOT-SOURCES.md. */
const PMR = "/marketing/promapranker";

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: "ProMapRanker Alternatives: GridBeacon Compared | GridBeacon",
  description:
    "Looking for a ProMapRanker alternative? Compare GridBeacon and ProMapRanker on credits, business limits, free credits, white label and grid sizes, plan by plan.",
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
    "Is GridBeacon a good ProMapRanker alternative?",
    "Yes, if you track more than a handful of businesses. Both tools sell 8,000 credits a month for about $19 and run grids up to 21 × 21, but ProMapRanker limits its Starter plan to 5 businesses and Growth to 30, while every paid GridBeacon plan has unlimited businesses. GridBeacon is also cheaper at 32,000 credits ($69.99 against $79) and offers annual billing. ProMapRanker is the better fit if you want credits that never expire or white label on a small plan.",
  ],
  [
    "How does ProMapRanker pricing compare with GridBeacon?",
    `ProMapRanker lists Starter at $19 a month (8,000 credits, 5 businesses), Growth at $39 (16,000 credits, 30 businesses) and Agency at $79 (32,000 credits, unlimited businesses), with no annual price listed. GridBeacon is $19.99 (8,000 credits), $34.99 (15,000) and $69.99 (32,000) a month, or $15.99, $27.99 and $55.99 billed annually, with unlimited businesses on all three. ProMapRanker prices checked in ${PROMAPRANKER_CHECKED}.`,
  ],
  [
    "Do ProMapRanker credits roll over?",
    "ProMapRanker says its paid credits roll over and never expire. GridBeacon's monthly plan credits reset each billing cycle; credits from top-up packs carry over.",
  ],
  [
    "How many credits does a grid scan use in each tool?",
    "GridBeacon charges one credit per grid point per keyword, so a 7 × 7 scan uses 49 credits, and switched-off points are not charged. ProMapRanker's credit table also counts one credit per point per keyword, but its FAQ says each grid point costs 2 credits, so check with ProMapRanker before comparing scan volumes.",
  ],
  [
    "Does GridBeacon have a free plan like ProMapRanker?",
    "Yes. GridBeacon's free plan starts with 500 credits and covers 1 business and 3 keywords; ProMapRanker's free plan gives 150 one-time credits and 1 saved business. GridBeacon also has a free 3 × 3 Google Maps rank checker that needs no account.",
  ],
  [
    "Does GridBeacon offer white label like ProMapRanker?",
    "On the Agency plan. Scan, keyword and location reports, online, as PDFs and as live share links, carry your logo, colour and contact details. Share links without your branding are on every paid plan. ProMapRanker lists white label from its Starter plan, with live white-label share links on Growth and Agency.",
  ],
  [
    "Is GridBeacon affiliated with ProMapRanker?",
    `No. ProMapRanker is a separate company and its names and marks belong to its owner. This page compares the two products using ProMapRanker's public website, checked in ${PROMAPRANKER_CHECKED}.`,
  ],
];

export default function ProMapRankerAlternativePage() {
  return (
    <SeoLandingPage>
      <ProductPageStructuredData name="ProMapRanker Alternative" path={PATH} />

      <Hero
        eyebrow="ProMapRanker alternative"
        title="A ProMapRanker Alternative With No Business Limits"
        lede={
          <>
            ProMapRanker and GridBeacon cost almost the same to start: about
            $19 a month for 8,000 grid-scan credits. The difference shows up
            as you add clients. ProMapRanker caps its smaller plans at 5 and
            30 businesses; every paid GridBeacon plan is unlimited. Here is
            the plan-by-plan comparison, including where ProMapRanker wins.
          </>
        }
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        primaryNote="No credit card required. New accounts get 500 free scan credits."
        secondary={{ label: "Compare Plans", href: "#plans" }}
        facts={["Unlimited businesses on paid plans", "500 free credits", "32,000 credits for $69.99"]}
        updated={PROMAPRANKER_CHECKED}
        media={
          <Screenshot
            src={`${PMR}/businesses-list-42-20261108.webp`}
            width={1600}
            height={1138}
            eager
            sizes="(min-width: 1240px) 700px, (min-width: 1024px) 56vw, 100vw"
            alt="A GridBeacon businesses list with 42 businesses across several US cities, showing 3-pack visibility, rating, reviews and last scan for each"
            caption="One GridBeacon workspace tracking 42 businesses across the US. Paid plans have no business limit. Names blurred."
          />
        }
      />

      <Section
        id="short-answer"
        eyebrow="The short answer"
        title="ProMapRanker Alternatives: Should You Switch?"
      >
        <Split
          media={
            <Note>
              Both tools run Google Maps geo-grids from 3 × 3 to 21 × 21 and
              charge in credits. The comparison below comes down to business
              limits, rollover, annual billing and what each plan includes.
            </Note>
          }
        >
          <p>
            <strong>Choose GridBeacon</strong> if you manage more than 5
            businesses on a budget plan, or more than 30 on a mid-size one.
            GridBeacon has no business or keyword cap on any paid plan, costs
            less at 32,000 credits, offers annual billing, and includes Rank
            MRI, a Citation Audit, Keyword Explorer and AI reports.
          </p>
          <p>
            <strong>Choose ProMapRanker</strong> if you want paid credits that
            never expire, white label on its $19 plan, or AI-search
            visibility checks (ChatGPT and Gemini) and a data API from the
            same tool.
          </p>
        </Split>
        <Toc
          items={[
            ["Plans compared", "plans"],
            ["Feature comparison", "comparison"],
            ["Why teams switch", "why-gridbeacon"],
            ["When ProMapRanker is better", "when-promapranker"],
            ["How to switch", "switching"],
            ["Other alternatives", "other-alternatives"],
            ["FAQ", "faq"],
          ]}
        />
      </Section>

      <Section
        id="plans"
        tone="tint"
        eyebrow="Pricing"
        title="ProMapRanker vs GridBeacon Plans"
        intro={
          <p>
            Both count credits per grid point per keyword, so credits are the
            fairest measure. Business limits are where the plans differ most.
          </p>
        }
      >
        <ComparisonTable
          label="Monthly plans compared, GridBeacon and ProMapRanker"
          columns={["", "GridBeacon", "ProMapRanker"]}
          rows={[
            ["Free plan", "500 credits, 1 business, 3 keywords", "150 one-time credits, 1 saved business"],
            ["8,000 credits", "$19.99/mo, unlimited businesses", "$19/mo (Starter), 5 businesses"],
            ["15,000–16,000 credits", "15,000 for $34.99/mo, unlimited businesses", "16,000 for $39/mo (Growth), 30 businesses"],
            ["32,000 credits", "$69.99/mo, unlimited businesses", "$79/mo (Agency), unlimited businesses"],
            ["Annual billing", "$15.99, $27.99 and $55.99 a month", "Not listed"],
            ["Unused credits", "Plan credits reset each cycle; top-up credits carry over", "Paid credits roll over and never expire"],
            ["Extra credits", "Top-ups: 2,000 for $9.99, 5,000 for $19.99, 10,000 for $34.99", "Not listed"],
            ["Refunds", <TextLink key="r" href="/refund-policy">Our refund policy</TextLink>, "7-day money-back guarantee on the first paid month"],
          ]}
          caption={
            <>
              Monthly prices in USD. ProMapRanker figures from{" "}
              <TextLink href={SOURCES.proMapRankerPricing} rel="nofollow noopener">
                its pricing page
              </TextLink>
              , checked in {PROMAPRANKER_CHECKED}. GridBeacon figures from{" "}
              <TextLink href="/pricing">our pricing page</TextLink>.
            </>
          }
        />
      </Section>

      <Section
        id="comparison"
        eyebrow="Side by side"
        title="GridBeacon vs ProMapRanker Features"
      >
        <ComparisonTable
          label="GridBeacon compared with ProMapRanker"
          columns={["", "GridBeacon", "ProMapRanker"]}
          rows={[
            ["Grid size", "3 × 3 to 21 × 21 (9 to 441 points)", "3 × 3 to 21 × 21"],
            ["Scan radius", "0.1 to 100 miles", "Any radius"],
            ["Credits per point", "1, and switched-off points are free", "1 in its credit table; its FAQ says 2"],
            ["Competitor data", "Every business at every point; any competitor's grid and a Gap view", "Who outranks you at each point; competitor gap reports on Growth and Agency"],
            ["White label", "Agency plan (reports, PDFs and share links)", "From Starter; live white-label links on Growth and Agency"],
            ["AI features", "AI Ranking Intelligence PDF and AI Action Plan (paid plans)", "GBP audit with AI fix list; AI-search visibility checks (ChatGPT, Gemini)"],
            ["Reviews", "Review Intelligence: analysis of up to 500 reviews", "Review topic analysis"],
            ["Citations", "Citation Audit on 60+ directories (paid plans)", "Not listed"],
            ["Keyword research", "Keyword Explorer with local search volume (paid plans)", "Not listed"],
            ["API", "Not available", "Read-only data API"],
          ]}
          caption={
            <>
              ProMapRanker details from its{" "}
              <TextLink href={SOURCES.proMapRankerPricing} rel="nofollow noopener">
                pricing
              </TextLink>{" "}
              and{" "}
              <TextLink href={SOURCES.proMapRankerFeatures} rel="nofollow noopener">
                features
              </TextLink>{" "}
              pages, checked in {PROMAPRANKER_CHECKED}. &ldquo;Not
              listed&rdquo; means we did not find it on those pages.
            </>
          }
        />
      </Section>

      <Section
        id="why-gridbeacon"
        tone="tint"
        eyebrow="Where GridBeacon stands out"
        title="Why Teams Choose GridBeacon Over ProMapRanker"
      >
        <Cards
          items={[
            {
              title: "No business limit to outgrow",
              body: "Add your sixth or thirty-first client without changing plan. Credits are the only meter on every paid GridBeacon plan.",
            },
            {
              title: "Less at agency volume",
              body: "32,000 credits a month cost $69.99 on GridBeacon against $79 on ProMapRanker, and $55.99 a month billed annually.",
            },
            {
              title: "A bigger free start",
              body: "500 free credits, enough for a full 21 × 21 scan or twenty 5 × 5 scans, against 150.",
            },
            {
              title: "See who wins each point",
              body: "Click any grid point for every business Google Maps ranked there, then open any of them as its own grid or compare in the Gap view.",
            },
            {
              title: "Audits in the same plan",
              body: "Rank MRI, the Citation Audit, Keyword Explorer, Review Intelligence and AI reports come with paid plans.",
            },
            {
              title: "Pay only for points you need",
              body: "Switch off grid points over water or empty land and they are not charged.",
            },
          ]}
        />
        <Screenshot
          src={`${PMR}/gap-view-dallas-20261108.webp`}
          width={1600}
          height={1070}
          sizes="(min-width: 1240px) 1100px, 100vw"
          alt="GridBeacon Gap view for a Dallas coffee shop against its top competitor: green points where the business leads, red where the competitor leads, with the competitor list on the left"
          caption="The Gap view, on every paid plan: green where you lead the chosen competitor and by how many places, red where they lead. Names hidden."
        />
      </Section>

      <Section
        id="when-promapranker"
        eyebrow="Straight answer"
        title="When ProMapRanker Is the Better Fit"
        intro={<p>ProMapRanker is likely the better choice if you need:</p>}
      >
        <Split
          media={
            <Screenshot
              src={`${IMAGES}/grid-point-competitors-20260919.webp`}
              width={1600}
              height={772}
              alt="GridBeacon grid point detail listing the businesses Google Maps ranked at that point"
              caption="In GridBeacon, every point lists the businesses that ranked there."
            />
          }
        >
          <Checklist
            items={[
              "Credits that never expire, so a quiet month is not wasted.",
              "White-label reports on a plan below an agency tier.",
              "AI-search visibility checks in ChatGPT and Gemini.",
              "A data API to pull results into your own tools.",
              "A few dollars less at the 8,000-credit level if you track 5 businesses or fewer.",
            ]}
          />
        </Split>
      </Section>

      <Section
        id="switching"
        tone="tint"
        eyebrow="Switching"
        title="Moving From ProMapRanker to GridBeacon"
        intro={
          <p>
            Nothing needs to be connected or exported. Run both side by side
            and compare.
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
              body: "Use the same keyword, grid size and radius so the heatmaps line up.",
            },
            {
              title: "Schedule and compare",
              body: "Set scans to run daily, weekly, biweekly or monthly, with email alerts when rankings move.",
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

      <Section
        id="other-alternatives"
        eyebrow="Other options"
        title="Other ProMapRanker Alternatives Worth Comparing"
        intro={<p>GridBeacon is not the only geo-grid tracker. These tools also track Google Maps rankings on a grid, each with a different strength. Facts are from each vendor&apos;s own site; follow a link for the sources and the date they were checked.</p>}
      >
        <OtherAlternatives exclude="promapranker" />
      </Section>

      <Section id="faq" tone="tint" eyebrow="FAQ" title="GridBeacon vs ProMapRanker Questions">
        <Faq items={FAQS.map(([question, answer]) => [question, <p key="a">{answer}</p>])} />
      </Section>

      <CtaBand
        title="Track Every Client Without a Business Cap"
        body="Recreate your ProMapRanker grids in GridBeacon on 500 free credits and compare the heatmaps side by side."
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        note="No credit card required. ProMapRanker is a trademark of its owner; GridBeacon is not affiliated with it."
        secondary={{ label: "View Pricing", href: "/pricing" }}
      />
    </SeoLandingPage>
  );
}
