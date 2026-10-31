import type { Metadata } from "next";

import {
  ButtonLink,
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
} from "@/components/marketing/seo-landing";
import styles from "./page.module.css";
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

const FAQS: [string, string][] = [
  [
    "Is GridBeacon a good Local Falcon alternative?",
    "For Google Maps rank tracking, GridBeacon offers lower credit costs and competitor grids from each scan. Paid plans support grids up to 21×21 and a 100-mile radius; the free plan supports up to 5×5 and 5 miles. If you also need Apple Maps or AI search tracking or an API, Local Falcon covers more.",
  ],
  [
    "Is GridBeacon cheaper than Local Falcon?",
    "On the plans that are closest in size, yes. GridBeacon's plans work out roughly 25–32% cheaper per included credit, and its top-up packs cost a fraction of Local Falcon's pay-as-you-go rate. Local Falcon's AI analysis is cheaper per report (25 credits against 100), and it offers larger plans than GridBeacon.",
  ],
  [
    "Do the two tools count credits the same way?",
    "Yes. Both use one credit per grid point, so a 9 × 9 scan uses 81 credits in either tool. In both, a plan's monthly credits don't carry over to the next billing cycle; credits bought separately do.",
  ],
  [
    "Can GridBeacon track Apple Maps, ChatGPT or Google AI Overviews?",
    "No. GridBeacon tracks Google Maps rankings. Local Falcon also tracks Apple Maps and AI answer engines, so it is the better fit if you report on those.",
  ],
  [
    "Does GridBeacon offer white-label reports?",
    "Yes, on the Agency plan. Scan, keyword and location reports, online and as PDFs, can carry your agency's logo, header colour and contact details instead of GridBeacon's. AI Ranking Intelligence reports still carry GridBeacon's branding.",
  ],
  [
    "Can I import my Local Falcon scan history?",
    "No. Keep your existing reports: GridBeacon starts a new history from your first scan. For a useful comparison, match the business, keyword, coordinates, grid shape, spacing, radius and language, and scan close together in time. Results can still differ between tools.",
  ],
  [
    "Is GridBeacon affiliated with Local Falcon?",
    `No. Local Falcon is a separate company and its names and marks belong to its owner. This page compares the two products using Local Falcon's public website, checked in ${LOCAL_FALCON_CHECKED}.`,
  ],
];

export default function LocalFalconAlternativePage() {
  return (
    <SeoLandingPage>
      <ProductPageStructuredData name="Local Falcon Alternative" path={PATH} faqs={FAQS} />

      <Hero
        eyebrow="Local Falcon alternative"
        title="Google Maps tracking. Lower scan costs."
        lede={
          <>
            A Local Falcon alternative for tracking rankings across your
            service area, comparing competitors, and following changes over
            time. Paid plans start at $19.99/month.
          </>
        }
        primary={{ label: "Start Free — 500 Credits", href: SIGNUP_URL }}
        primaryNote="No credit card required. Free plan: grids up to 5×5, within a 5-mile radius."
        secondary={{ label: "See the Comparison", href: "#comparison" }}
        facts={["20 free 5×5 scans", "Competitor grids included", "1 credit per grid point"]}
        media={
          <div className={styles.productPreview}>
          <Screenshot
            src={`${IMAGES}/grid-point-competitors-20260919.webp`}
            width={1600}
            height={772}
            eager
            sizes="(min-width: 1240px) 700px, (min-width: 1024px) 56vw, 100vw"
            alt="GridBeacon geo-grid heatmap with one point selected, listing the competitors Google Maps ranked at that location"
            caption="Product example: select a map point to inspect the businesses ranked there. Larger grids require a paid plan."
          />
          <TextLink href={`${IMAGES}/grid-point-competitors-20260919.webp`}>View the full-size product screenshot</TextLink>
          </div>
        }
      />

      <Section id="scan-costs" eyebrow="What your budget buys" title="$5 less per month. More scans included."
        intro={<p>Compare the standard monthly entry plans using a full 9×9 grid: one keyword, one business, 81 credits per scan.</p>}>
        <ComparisonTable label="Monthly entry-plan scan capacity" columns={["Entry plan", "GridBeacon", "Local Falcon"]}
          rows={[
            ["Monthly price", "$19.99", "$24.99"],
            ["Included credits", "8,000", "7,500"],
            ["Complete 9×9 scans", "98", "92"],
          ]}
          caption={<>USD, standard monthly prices excluding promotions. Scan counts are rounded down and assume all credits go to scans; AI reports and other credit-consuming tools reduce this allowance. Prices checked October 29, 2026: <TextLink href="/pricing">GridBeacon pricing</TextLink> and <TextLink href={LOCAL_FALCON_PRICING} rel="nofollow noopener">Local Falcon pricing</TextLink>.</>}
        />
        <InlineCta><TextLink href="/pricing">Estimate your usage and compare plans</TextLink></InlineCta>
      </Section>

      <Section
        id="comparison"
        eyebrow="Side by side"
        title="GridBeacon vs Local Falcon at a Glance"
        intro={
          <p>
            Choose GridBeacon for lower-cost Google Maps scans and competitor
            grids. Consider Local Falcon if you need additional search platforms
            or integrations. Availability can depend on the plan.
          </p>
        }
      >
        <div className={styles.comparisonGroups}>
        <h3>Cost and scan allowance</h3>
        <ComparisonTable
          label="GridBeacon compared with Local Falcon"
          columns={["", "GridBeacon", "Local Falcon"]}
          rows={[
            ["Free credits on signup", "500", "100"],
            ["What a credit buys", "One grid point", "One grid point (“map pin”)"],
            ["Free-plan limits", "1 business, 3 keywords; up to 5×5 and 5 miles", "100 signup credits; check current trial terms"],
            ["Paid grid sizes", "3 × 3 to 21 × 21", "3 × 3 to 21 × 21"],
            ["Paid scan radius", "0.1 to 100 miles", "0.1 to 100 miles"],
            ["Entry plan", "$19.99/mo · 8,000 credits", "$24.99/mo · 7,500 credits"],
            ["Mid-size plan", "$34.99/mo · 15,000 credits", "$49.99/mo · 15,150 credits"],
            ["Larger plan", "$69.99/mo · 32,000 credits", "$99.99/mo · 31,250 credits"],
            ["Largest self-serve plan", "$69.99/mo · 32,000 credits", "$199.99/mo · 63,150 credits"],
            ["Extra credits", "Top-up packs from $9.99 for 2,000 (about $0.0035–$0.005 each)", "Pay-as-you-go at $0.05 per credit"],
            ["Unused plan credits", "Refresh each billing cycle", "Expire at the end of each month or year"],
          ]}
          caption={<>Standard monthly prices in USD, excluding promotions. Pricing checked October 29, 2026 against <TextLink href="/pricing">GridBeacon pricing</TextLink> and <TextLink href={LOCAL_FALCON_PRICING} rel="nofollow noopener">Local Falcon pricing</TextLink>.</>}
        />
        <h3>Rank tracking and competitor analysis</h3>
        <ComparisonTable label="Rank tracking capabilities" columns={["Capability", "GridBeacon", "Local Falcon"]}
          rows={[
            ["Maps and search platforms", "Google Maps", "Google Maps, Apple Maps and AI answer engines (ChatGPT, Gemini, Google AI Overviews and AI Mode, Grok)"],
            ["Competitor data", "Competitor grids and a Gap view from every scan, no extra credits", "Competitor Report"],
          ]}
          caption={<>Platform and feature comparison based on public product information checked in {LOCAL_FALCON_CHECKED}. See <TextLink href="/features">GridBeacon features</TextLink> and <TextLink href={LOCAL_FALCON_PRICING} rel="nofollow noopener">Local Falcon plan details</TextLink>.</>}
        />
        <h3>Reports, automation and integrations</h3>
        <ComparisonTable label="Reporting and automation capabilities" columns={["Capability", "GridBeacon", "Local Falcon"]}
          rows={[
            ["AI scan analysis", "AI Ranking Intelligence report, 100 credits (paid plans)", "Falcon AI analysis, 25 credits"],
            ["Scheduled scans", "Daily to monthly, paid plans", "Yes (Campaigns)"],
            ["White-label reports", "Agency plan: scan, keyword and location reports", "Available"],
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
        <InlineCta><ButtonLink href={SIGNUP_URL}>Try your first Google Maps scan</ButtonLink></InlineCta>
        <Note>500 one-time free credits. Free grids are up to 5×5; paid plans unlock larger grids and scheduled scans.</Note>
        </div>
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
              body: "500 one-time signup credits cover 20 full 5×5 scans at 25 credits each. The free plan supports one business, three keywords and a radius up to 5 miles.",
            },
            {
              title: "Competitor grids from every scan",
              body: "Every scan records the full local results at each point, so any competitor's grid, and a Gap view against yours, costs nothing extra.",
            },
            {
              title: "More built into paid plans",
              body: "Rank MRI point investigation, Review Intelligence, GBP Activity monitoring, AI Action Plans, Keyword Explorer, a Citation Audit and scheduled scans with email alerts.",
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
              If Google Maps is your priority, test GridBeacon with your own
              business and keywords. Compare the workflow and reports before
              choosing a plan.
            </Note>
          }
        >
          <Checklist
            items={[
              "Rank tracking on Apple Maps, or visibility in AI answer engines such as ChatGPT, Gemini and Google AI Overviews.",
              "An API, MCP access or integrations with Looker Studio, Zapier, Slack or n8n.",
              "An AI agent that can act on a Google Business Profile, such as replying to reviews or publishing posts.",
              "More than 32,000 credits a month on a single self-serve plan.",
              "Cheaper AI analysis per scan (25 credits against GridBeacon's 100).",
              "Reporting built around its Share of Local Voice (SoLV®) metric.",
            ]}
          />
        </Split>
        <InlineCta><ButtonLink href={SIGNUP_URL}>Try your first Google Maps scan</ButtonLink></InlineCta>
      </Section>

      <Section
        id="what-you-get"
        tone="tint"
        eyebrow="What GridBeacon does"
        title="See what you can learn from a scan"
      >
        <Split
          reverse
          media={
            <Screenshot
              src={`${IMAGES}/rank-movement-heatmap-20260919.webp`}
              width={1600}
              height={813}
              alt="GridBeacon heatmap with trend arrows showing where Google Maps rankings rose or fell since an earlier scan"
            caption="Product example: trend arrows show which sampled locations moved since an earlier scan. Historical results are not a promise of future rankings."
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
            {" · "}
            <TextLink href="/reports/garage-door-20260908/report.pdf">Open a historical sample report (PDF)</TextLink>
          </p>
        </Split>
        <Note>Each point represents a search from a sampled location. Rankings can differ with coordinates, keyword, language and scan time. Compare matching settings over time; a heatmap measures rankings, not calls or revenue. The sample report illustrates the paid reporting feature and carries GridBeacon branding.</Note>
      </Section>

      <Section
        id="switching"
        eyebrow="Switching"
        title="Moving From Local Falcon to GridBeacon"
        intro={
          <p>
            Start a new ranking history while keeping your existing reports.
            Local Falcon scan history cannot be imported. Run both tools side
            by side before deciding whether to switch.
          </p>
        }
      >
        <Steps
          items={[
            {
              title: "Create a free account",
              body: "Get 500 one-time credits without a credit card. Start with up to 20 full 5×5 scans within the free plan's 5-mile radius.",
            },
            {
              title: "Add the same business and keywords",
              body: "Find the business on Google Maps by name and add the keywords you track today.",
            },
            {
              title: "Match the scan settings",
              body: "Use the same business, exact keyword, centre coordinates, grid shape, spacing, radius and language. Choose settings within your plan's limits.",
            },
            {
              title: "Compare the results",
              body: "Run both scans close together in time, then compare coverage, competitors and reporting. Results can still differ; matching settings does not guarantee identical rankings.",
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
        id="faq"
        tone="tint"
        eyebrow="FAQ"
        title="GridBeacon vs Local Falcon Questions"
      >
        <Faq items={FAQS.map(([question, answer]) => [question, <p key="a">{answer}</p>])} />
      </Section>

      <CtaBand
        title="Try GridBeacon Next to Local Falcon"
        body="Get 500 one-time free credits and explore your rankings with up to 20 full 5×5 scans. Free accounts support one business, three keywords and a 5-mile radius."
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        note="No credit card required. Local Falcon is a trademark of its owner; GridBeacon is not affiliated with it."
        secondary={{ label: "View Pricing", href: "/pricing" }}
      />
    </SeoLandingPage>
  );
}
