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
  ScreenshotPair,
  Section,
  SeoLandingPage,
  Split,
  TextLink,
  Toc,
} from "@/components/marketing/seo-landing";
import { ProductPageStructuredData } from "@/components/marketing/structured-data";
import { COMPETITORS_CHECKED, SOURCES } from "@/lib/competitors";
import { pageMetadata, SIGNUP_URL } from "@/lib/seo";

/*
 * GridBeacon for local SEO agencies.
 *
 * The agency case rests on one verified fact: every paid plan has
 * unlimited businesses, keywords and team members, so cost follows
 * scanning, not client count. Everything agencies ask for that is NOT
 * built (white-label reports, client portal or public links, an API,
 * GBP posting) is listed on the page in its own section rather than
 * left for a trial user to discover. Check that section against the
 * app before every edit: if one of those ships, move it up.
 */

const PATH = "/local-rank-tracker-for-agencies";
const IMAGES = "/marketing/google-maps-rank-tracker";

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: "Local Rank Tracker for SEO Agencies | GridBeacon",
  description:
    "Geo-grid rank tracking for local SEO agencies: unlimited clients and keywords on every paid plan, shared credits, team access, scheduled scans and PDF reports.",
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
    "How many clients can an agency track in GridBeacon?",
    "As many as you like. Every paid plan includes unlimited businesses, unlimited keywords and unlimited team members. Your plan's monthly scan credits are the only limit, and they are shared across all your clients.",
  ],
  [
    "Which GridBeacon plan does an agency need?",
    "Work out credits per month: clients × keywords × grid points × scans per month. 20 clients with 3 keywords each on a 7 × 7 grid, scanned weekly, uses about 12,700 credits, which fits the Professional plan (15,000 credits, $34.99). About 50 clients on the same schedule fits the Agency plan (32,000 credits, $69.99). Top-up packs cover busy months.",
  ],
  [
    "Can my team work in the same GridBeacon account?",
    "Yes. Paid plans include unlimited team members. You invite people by email and give each one an admin or member role.",
  ],
  [
    "Does GridBeacon have white-label reports or a client portal?",
    "Not yet. You can download scan report PDFs, CSV exports and, on paid plans, AI Ranking Intelligence PDFs to send to clients, but they carry GridBeacon's branding, and there are no client logins or public report links. If white-label reporting is a must, Local Falcon, BrightLocal and Local Viking offer it.",
  ],
  [
    "Can I use GridBeacon to win new clients?",
    "Yes. Scan a prospect's business before the sales call, open the grid of the competitor that beats them, and show the Gap view: green where the prospect leads and red where the competitor does. The free Google Maps rank checker gives a quick 3 × 3 snapshot without an account.",
  ],
  [
    "Does GridBeacon need access to my clients' Google Business Profiles?",
    "No. You add a business by finding it on Google Maps or pasting its Maps link. Scans read public Google Maps results, so clients don't need to grant access and nothing on their profile is changed.",
  ],
  [
    "Does GridBeacon work for service-area businesses?",
    "Yes. For businesses that hide their address, such as plumbers, cleaners and locksmiths, you set the grid's centre yourself or use the location where Google places the listing.",
  ],
];

export default function AgencyPage() {
  return (
    <SeoLandingPage>
      <ProductPageStructuredData name="Local Rank Tracker for Agencies" path={PATH} faqs={FAQS} />

      <Hero
        eyebrow="For local SEO agencies"
        title="The Local Rank Tracker for Agencies That Doesn't Charge per Client"
        lede={
          <>
            Most local rank trackers price by location, so every client you
            sign makes your tools more expensive. GridBeacon prices by scan
            credits. Every paid plan includes unlimited client businesses,
            unlimited keywords and your whole team, so you choose how deeply
            to track each client.
          </>
        }
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        primaryNote="No credit card required. New accounts get 500 free scan credits."
        secondary={{ label: "Plan Your Credits", href: "#credits" }}
        facts={["Unlimited clients", "Unlimited team members", "32,000 credits for $69.99"]}
        media={
          <Screenshot
            src={`${IMAGES}/geo-grid-scan-dallas-20260919.webp`}
            width={1600}
            height={780}
            eager
            sizes="(min-width: 1240px) 700px, (min-width: 1024px) 56vw, 100vw"
            alt="GridBeacon geo-grid heatmap of a client's Google Maps rankings across Dallas, with visibility and average rank above the map"
            caption="A real client scan: one Google Maps search from every point of the grid."
          />
        }
      />

      <Section
        id="what-agencies-need"
        eyebrow="Choosing a tool"
        title="What an Agency Needs From a Local Rank Tracker"
        intro={
          <p>
            A tracker that works for one business can get expensive or
            clumsy at twenty. Before you choose one, check how it handles
            these six things:
          </p>
        }
      >
        <Cards
          items={[
            {
              title: "A pricing model that scales",
              body: "Per-location pricing grows with every client you sign. Credit pricing grows with how much you scan, which you control.",
            },
            {
              title: "Enough grid for the service area",
              body: "A dentist needs a tight grid, a roofer covering a metro needs a wide one. Look for flexible grid sizes and radius, and excluded points.",
            },
            {
              title: "Competitors, not just positions",
              body: "Clients ask who is beating them and where. You need every business at every point, not only your client's rank.",
            },
            {
              title: "Scheduling and alerts",
              body: "Scans should run on their own and tell you when something moves, so you spot a drop before the client does.",
            },
            {
              title: "Reports a client understands",
              body: "A heatmap plus a plain explanation of what changed and what you are doing about it.",
            },
            {
              title: "Room for the team",
              body: "Account managers and specialists should work in one account without paying per seat.",
            },
          ]}
        />
        <Toc
          items={[
            ["Built for agency work", "features"],
            ["Plan your credits", "credits"],
            ["Win new clients", "prospecting"],
            ["Monthly reporting workflow", "reporting"],
            ["What's not built yet", "not-yet"],
            ["Agency pricing compared", "pricing-models"],
            ["FAQ", "faq"],
          ]}
        />
      </Section>

      <Section
        id="features"
        tone="tint"
        eyebrow="Built for agency work"
        title="How GridBeacon Fits an Agency's Workflow"
      >
        <Cards
          items={[
            {
              title: "Unlimited clients and keywords",
              body: "Add every client business and every keyword that matters. No plan upgrade when you sign client number 41.",
            },
            {
              title: "One pool of credits",
              body: "Credits are shared across all clients. Scan a new client deeply in month one, then lighter once they rank.",
            },
            {
              title: "Your whole team, no seat fees",
              body: "Invite unlimited team members as admins or members on any paid plan.",
            },
            {
              title: "Scheduled scans and email alerts",
              body: "Run each client's grids daily, weekly, biweekly or monthly, and get an email when a scan is ready.",
            },
            {
              title: "Competitor grids and Gap view",
              body: "Every scan stores the full local results at each point, so any competitor's grid comes free, with a Gap view against your client.",
            },
            {
              title: "Service-area businesses",
              body: "Track plumbers, cleaners and other businesses that hide their address, centred where Google places the listing.",
            },
            {
              title: "Reports and exports",
              body: "Scan report PDFs, CSV exports of grid points and rank history, and AI Ranking Intelligence PDFs on paid plans.",
            },
            {
              title: "Keyword Explorer",
              body: "Find the local keywords worth tracking for a new client, with search volume for their city (paid plans).",
            },
            {
              title: "No profile access needed",
              body: "Add a business from Google Maps. Clients don't have to grant access, and nothing on their profile changes.",
            },
          ]}
        />
      </Section>

      <Section
        id="credits"
        eyebrow="Credit planning"
        title="How Many Credits Does an Agency Need?"
        intro={
          <p>
            One credit is one grid point. Monthly credits = clients ×
            keywords × grid points × scans a month (a weekly schedule is
            about 4.33 scans a month). Some typical portfolios:
          </p>
        }
      >
        <ComparisonTable
          label="Example agency portfolios and the GridBeacon plan that covers each"
          columns={["Portfolio", "Plan that fits", "Credits a month"]}
          rows={[
            ["10 clients · 3 keywords · 7 × 7 · monthly", "Starter, $19.99 (8,000 credits)", "1,470"],
            ["10 clients · 5 keywords · 5 × 5 · weekly", "Starter, $19.99 (8,000 credits)", "about 5,400"],
            ["20 clients · 3 keywords · 7 × 7 · weekly", "Professional, $34.99 (15,000 credits)", "about 12,700"],
            ["40 clients · 5 keywords · 9 × 9 · monthly", "Agency, $69.99 (32,000 credits)", "16,200"],
            ["50 clients · 3 keywords · 7 × 7 · weekly", "Agency, $69.99 (32,000 credits)", "about 31,800"],
          ]}
          caption={
            <>
              Monthly prices in USD; annual billing is $15.99, $27.99 and
              $55.99 a month. Top-up packs (2,000 for $9.99, 5,000 for
              $19.99, 10,000 for $34.99) are used after monthly credits and
              carry over. Try your own numbers in the{" "}
              <TextLink href="/pricing">credit calculator on the pricing page</TextLink>.
            </>
          }
        />
        <Note>
          A tip from how agencies use it: scan new clients on a bigger grid
          weekly while you fix their profile, then move them to monthly once
          rankings settle. Credits follow the work, not the client count.
        </Note>
      </Section>

      <Section
        id="prospecting"
        tone="tint"
        eyebrow="Sales"
        title="Use Geo-Grids to Win New Clients"
        intro={
          <p>
            A heatmap of a prospect&apos;s own neighbourhood, with the
            competitor beating them named, makes a stronger opening than a
            generic audit.
          </p>
        }
      >
        <Split
          media={
            <Screenshot
              src={`${IMAGES}/grid-point-competitors-20260919.webp`}
              width={1600}
              height={772}
              alt="GridBeacon heatmap with one grid point selected, listing the businesses Google Maps ranked at that point"
              caption="Select a point to show a prospect exactly who ranks above them there."
            />
          }
        >
          <Checklist
            items={[
              <><strong>Scan the prospect.</strong> Add the business from Google Maps and scan their main money keyword.</>,
              <><strong>Name the competitor.</strong> Click the points where they don&apos;t rank and see who takes the map pack instead.</>,
              <><strong>Show the gap.</strong> Open that competitor&apos;s grid and the Gap view: green where the prospect leads, red where they lose.</>,
            ]}
          />
          <p>
            For a quick look without an account, the{" "}
            <TextLink href="/google-maps-rank-checker">
              free Google Maps rank checker
            </TextLink>{" "}
            runs a 3 × 3 scan.
          </p>
        </Split>
      </Section>

      <Section
        id="reporting"
        eyebrow="Client reporting"
        title="A Monthly Client Reporting Workflow"
      >
        <Split
          reverse
          media={
            <ScreenshotPair>
              <Screenshot
                src={`${IMAGES}/ai-report-summary-20260919.webp`}
                width={778}
                height={1000}
                sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 100vw"
                alt="First page of a GridBeacon AI Ranking Intelligence report summarising a scan's visibility and rank"
              />
              <Screenshot
                src={`${IMAGES}/ai-report-geographic.webp`}
                width={837}
                height={1074}
                sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 100vw"
                alt="GridBeacon AI report page describing where in the service area the business ranks strongly and weakly"
              />
            </ScreenshotPair>
          }
        >
          <Checklist
            items={[
              <><strong>Schedule it once.</strong> Each client&apos;s keywords run on their own; you get an email when scans are ready.</>,
              <><strong>Review the movement.</strong> Trend arrows show which points rose or fell, and scan history lets you compare any two dates.</>,
              <><strong>Check the competition.</strong> Open the Gap view for the competitor your client cares about most.</>,
              <><strong>Send the report.</strong> Download the scan report PDF, or generate an AI Ranking Intelligence report (100 credits) that explains the results and lists next actions.</>,
            ]}
          />
        </Split>
      </Section>

      <Section
        id="not-yet"
        tone="tint"
        eyebrow="Straight answer"
        title="What GridBeacon Doesn't Do Yet"
        intro={
          <p>
            Better to know now than halfway through a trial. GridBeacon does
            not currently offer:
          </p>
        }
      >
        <Split
          media={
            <Note>
              If white-label reporting is essential to how you sell,{" "}
              <TextLink href="/local-falcon-alternative">Local Falcon</TextLink>,{" "}
              <TextLink href="/brightlocal-alternative">BrightLocal</TextLink> and{" "}
              <TextLink href="/local-viking-alternative">Local Viking</TextLink>{" "}
              all offer it. Our comparison pages show what each costs.
            </Note>
          }
        >
          <Checklist
            variant="cross"
            items={[
              "White-label reports with your agency's logo and colours.",
              "Client logins, a client portal or public report links.",
              "An API or integrations such as Looker Studio or Zapier.",
              "Google Business Profile post scheduling or profile editing.",
              "Citation building, listings sync or review request campaigns.",
              "Organic, Bing, Apple Maps or AI-search rank tracking.",
            ]}
          />
        </Split>
      </Section>

      <Section
        id="pricing-models"
        eyebrow="Pricing models"
        title="How Agency Pricing Compares Across Rank Trackers"
        intro={
          <p>
            What 50 clients cost depends less on the list price than on what
            the tool charges for: locations, listings or grid points.
          </p>
        }
      >
        <ComparisonTable
          label="How rank trackers charge agencies"
          columns={["Tool", "What it charges for", "At agency scale"]}
          rows={[
            ["GridBeacon", "Grid points scanned", "Unlimited businesses; 32,000 credits for $69.99/mo"],
            [
              "Local Falcon",
              "Grid points scanned",
              <>Largest self-serve plan: 63,150 credits for $199.99/mo. <TextLink href="/local-falcon-alternative">Comparison</TextLink></>,
            ],
            [
              "BrightLocal",
              "Locations",
              <>From $31/mo for one location, billed annually; rises with location count. <TextLink href="/brightlocal-alternative">Comparison</TextLink></>,
            ],
            [
              "Local Viking (Local Optics)",
              "GBP listings",
              <>70 listings and 32,400 GeoGrid credits for $200/mo. <TextLink href="/local-viking-alternative">Comparison</TextLink></>,
            ],
            [
              "Whitespark Local Ranking Grids",
              "Grid points scanned",
              <>32,000 credits for $100/mo. <TextLink href="/whitespark-alternative">Comparison</TextLink></>,
            ],
          ]}
          caption={
            <>
              Competitor prices from their public pricing pages (
              <TextLink href={SOURCES.localFalconPricing} rel="nofollow noopener">Local Falcon</TextLink>,{" "}
              <TextLink href={SOURCES.brightLocalPricing} rel="nofollow noopener">BrightLocal</TextLink>,{" "}
              <TextLink href={SOURCES.localOpticsPricing} rel="nofollow noopener">Local Optics</TextLink>,{" "}
              <TextLink href={SOURCES.whitesparkGrids} rel="nofollow noopener">Whitespark</TextLink>
              ), checked in {COMPETITORS_CHECKED}.
            </>
          }
        />
        <InlineCta>
          <TextLink href="/best-local-rank-trackers">See all local rank trackers compared</TextLink>
        </InlineCta>
        <RelatedComparisons current={PATH} />
      </Section>

      <Section id="faq" tone="tint" eyebrow="FAQ" title="GridBeacon for Agencies: Questions">
        <Faq items={FAQS.map(([question, answer]) => [question, <p key="a">{answer}</p>])} />
      </Section>

      <CtaBand
        title="Put Every Client on the Map"
        body="Start with 500 free credits, scan your first client and a prospect, and see how the heatmaps and Gap view fit your reporting."
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        note="No credit card required."
        secondary={{ label: "View Pricing", href: "/pricing" }}
      />
    </SeoLandingPage>
  );
}
