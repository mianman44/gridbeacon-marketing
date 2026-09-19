import type { Metadata } from "next";

import { GapIllustration } from "@/components/marketing/google-maps-rank-tracker/gap-illustration";
import {
  ButtonLink,
  Cards,
  Checklist,
  Compare,
  CtaBand,
  Faq,
  Hero,
  InlineCta,
  Note,
  RankKey,
  Screenshot,
  ScreenshotPair,
  Section,
  SeoLandingPage,
  Split,
  Stack,
  Steps,
  TextLink,
} from "@/components/marketing/seo-landing";
import { ProductPageStructuredData } from "@/components/marketing/structured-data";
import { pageMetadata, SIGNUP_URL } from "@/lib/seo";

/*
 * The Google Maps rank tracker landing page -- GridBeacon's first
 * commercial SEO page and the pattern for the ones after it.
 *
 * Every product image is a real GridBeacon capture (sources in
 * SCREENSHOT-SOURCES.md), cropped to leave out account details. The
 * Gap view has no publishable capture yet, so it is drawn and
 * labelled as an illustration. Claims follow the product as built:
 * credits, plan gates and schedules are checked against the backend.
 */

const PATH = "/google-maps-rank-tracker";
const IMAGES = "/marketing/google-maps-rank-tracker";

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: "Google Maps Rank Tracker & Geo-Grid Tracker | GridBeacon",
  description:
    "Track Google Maps rankings across a geo-grid, monitor competitors, identify ranking gaps, follow rank history and generate local SEO reports with GridBeacon.",
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
    "What is a Google Maps rank tracker?",
    <p key="a">
      A tool that checks where a business appears in Google Maps results
      for the searches its customers use. GridBeacon checks from many
      points across a service area rather than one, so you can see the
      areas where you rank well and the areas where you don&apos;t.
    </p>,
  ],
  [
    "How does geo-grid rank tracking work?",
    <p key="a">
      You choose a grid (from 3 × 3 up to 21 × 21 points) and a radius
      around your business. GridBeacon runs your keyword as a separate
      Google Maps search from each point&apos;s coordinates, records the
      results and plots your position at every point as a colour-coded
      heatmap.
    </p>,
  ],
  [
    "Why does my Google Maps ranking change by location?",
    <p key="a">
      Google ranks local results on relevance, prominence and distance
      from the person searching. As the searcher moves, distance changes
      and so does the set of nearby competitors, which is why a business
      can be first in one neighbourhood and missing a few miles away.
    </p>,
  ],
  [
    "Can I track competitors with GridBeacon?",
    <p key="a">
      Yes. Every scan records the businesses Google Maps showed at each
      point, so you can open any competitor&apos;s grid, see how many
      points they beat you at and compare the two in the Gap view. That
      comes from the scan you already ran and uses no extra credits.
    </p>,
  ],
  [
    "Can I track multiple keywords?",
    <p key="a">
      Yes. The free plan covers one business and three keywords. Paid
      plans track unlimited businesses and keywords; every scan uses
      credits based on its grid size.
    </p>,
  ],
  [
    "How much does a scan cost?",
    <p key="a">
      One credit per grid point, and you see the cost before you run it.
      A 5 × 5 scan uses 25 credits and a 21 × 21 scan uses 441. New
      accounts start with 500 free credits; see{" "}
      <TextLink href="/pricing">pricing</TextLink> for plan allowances and
      top-ups.
    </p>,
  ],
  [
    "How often should I run a Google Maps ranking scan?",
    <p key="a">
      It depends on how much is changing. During active local SEO work,
      weekly scans show whether changes are having an effect; for steady
      monitoring, every two weeks or monthly is usually enough. Paid plans
      can schedule scans so they run on their own.
    </p>,
  ],
  [
    "Can agencies use GridBeacon for clients?",
    <p key="a">
      Yes. Agencies track each client as its own business, share heatmaps
      and AI report PDFs with clients, schedule repeat scans and invite
      team members into the same workspace on paid plans.
    </p>,
  ],
  [
    "What is the difference between a normal rank tracker and a geo-grid tracker?",
    <p key="a">
      A normal rank tracker reports one position for a keyword, usually
      from a single location. A geo-grid tracker reports your position at
      many locations at once, so you see how rankings change across the
      area your customers search from.
    </p>,
  ],
];

export default function GoogleMapsRankTrackerPage() {
  return (
    <SeoLandingPage>
      <ProductPageStructuredData name="Google Maps Rank Tracker" path={PATH} />

      <Hero
        eyebrow="Google Maps Rank Tracking"
        title="Google Maps Rank Tracker Built for Local SEO"
        lede={
          <>
            See how your Google Business Profile ranks across different
            locations, not just from one search point. GridBeacon turns
            Google Maps rankings into a visual geo-grid so you can find weak
            areas, competitors and growth opportunities.
          </>
        }
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        primaryNote="No credit card required. New accounts get 500 free scan credits."
        secondary={{ label: "See How It Works", href: "#how-it-works" }}
        facts={["3 × 3 to 21 × 21 grids", "0.1 to 100 mile radius", "1 credit per grid point"]}
        media={
          <Screenshot
            src={`${IMAGES}/geo-grid-scan-dallas-20260919.webp`}
            width={1600}
            height={780}
            eager
            sizes="(min-width: 1240px) 700px, (min-width: 1024px) 56vw, 100vw"
            alt="GridBeacon Google Maps geo-grid rank tracker showing a business's rankings at 25 points across Dallas"
            caption="A real 5 × 5 GridBeacon scan for “garage door repair” in Dallas. Each dot is the business's Google Maps position at that point."
          />
        }
      />

      <Section
        id="why-location-matters"
        eyebrow="Why one ranking isn't enough"
        title="Your Google Maps Ranking Changes by Location"
        intro={
          <>
            <p>
              Google orders local results by relevance, prominence and
              distance from the person searching. The same search for
              “plumber near me” can put a business first on one street and
              off the first page a few miles away.
            </p>
            <p>
              Most rank checks give you one number from one place. That
              number is true for that spot and misleading everywhere else. A
              Google Maps rank tracker that works on a geo-grid checks the
              same keyword from many points across your service area, so you
              see the whole picture.
            </p>
          </>
        }
      >
        <Compare
          before={{
            label: "Traditional rank check",
            title: "One search position",
            items: [
              "A single ranking, from a single location",
              "No view of how rankings change across the area",
              "No idea which competitors win in which neighbourhoods",
              "Hard to tell whether local SEO work made a difference",
            ],
          }}
          after={{
            label: "GridBeacon",
            title: "Your rankings across the whole map",
            items: [
              "Rankings from up to 441 points in one scan",
              "A geo-grid heatmap of strong and weak areas",
              "The businesses ahead of you at every point",
              "Visibility, average rank and top-3 share",
              "Saved scans to compare over time",
            ],
          }}
        />
      </Section>

      <Section
        id="geo-grid"
        tone="tint"
        eyebrow="Geo-grid rank tracking"
        title="See Your Google Maps Rankings Across an Entire Area"
      >
        <Split
          media={
            <RankKey
              title="How to read a GridBeacon heatmap"
              metrics={[
                ["Visibility", "The share of grid points where the business appears in the top 10."],
                ["Average rank", "The business's mean position across the points where it appears."],
                ["Top 3", "The share of points where it is in the map pack."],
              ]}
            />
          }
        >
          <p>
            A geo-grid scan places a grid of points over the area around your
            business and checks your ranking from every one of them. The
            result is a map you can read in seconds: green where customers see
            you first, red where they barely see you at all.
          </p>
          <Checklist
            items={[
              "Pick a grid from 3 × 3 (9 points) up to 21 × 21 (441 points) and a radius from 0.1 to 100 miles.",
              "Each point is a separate Google Maps search for your keyword from that exact coordinate.",
              "Rankings are plotted as a colour-coded heatmap, so strong and weak areas stand out at a glance.",
              "Remove points you don't serve, such as lakes or areas outside your service area, before you run the scan. You only pay for the points you keep.",
            ]}
          />
        </Split>
      </Section>

      <Section
        id="competitors"
        eyebrow="Competitor grid"
        title="See Who Is Outranking You"
      >
        <Split
          reverse
          media={
            <Screenshot
              src={`${IMAGES}/grid-point-competitors-20260919.webp`}
              width={1600}
              height={772}
              alt="GridBeacon heatmap with one grid point selected, listing the businesses Google Maps ranked at that location"
              caption="Selecting a grid point lists the businesses Google Maps returned there, in order, with ratings and review counts."
            />
          }
        >
          <p>
            Every scan records the full local results at every point, not just
            your own position. Competitor data comes from the scan you have
            already run, so looking at it costs no extra credits.
          </p>
          <Checklist
            items={[
              "Click any point to see the local competitors ranked there and where you sit among them.",
              "The Competitors tab lists the businesses seen across the scan, with their average rank and how many points they beat you at.",
              "Open any competitor's grid to see the areas where they dominate and the areas where they are weak.",
              "Compare share of visibility across competitors and export the results to CSV.",
            ]}
          />
          <p>
            <TextLink href="/features#deep-dive-competitor">
              More about competitor tracking
            </TextLink>
          </p>
        </Split>
      </Section>

      <Section
        id="ranking-gaps"
        tone="tint"
        eyebrow="Gap view"
        title="Find Local Ranking Gaps"
      >
        <Split media={<GapIllustration />}>
          <p>
            Once you pick a competitor, the heatmap can switch between your
            grid, their grid and a Gap view. The Gap view compares the two
            point by point: green where your business ranks higher, red where
            the competitor does.
          </p>
          <p>
            That turns a vague “they&apos;re beating us” into specific places
            on the map, such as the neighbourhoods furthest from your address
            or the side of town where a competitor is based. Those are the
            areas that may deserve attention next.
          </p>
          <Checklist
            items={[
              "Find locations where a competitor ranks strongly and you don't.",
              "Spot where you already lead, so you can protect those areas.",
              "Use the same comparison after your next scan to see whether the gap closed.",
            ]}
          />
        </Split>
      </Section>

      <Section
        id="rank-history"
        eyebrow="Rank history"
        title="Track Ranking Changes Over Time"
      >
        <Split
          media={
            <Screenshot
              src={`${IMAGES}/rank-movement-heatmap-20260919.webp`}
              width={1600}
              height={813}
              alt="GridBeacon heatmap with trend arrows showing where Google Maps rankings rose or fell since an earlier scan"
              caption="Trend arrows show which points moved since an earlier scan. Selecting a point spells the change out, e.g. “On Aug 31 you were #8, now you're #10”."
            />
          }
        >
          <p>
            One scan tells you where you stand today. A history of scans tells
            you whether things are getting better, and where.
          </p>
          <Checklist
            items={[
              "Every completed scan is saved with its grid, radius and results.",
              "Compare a scan with an earlier one and see which points moved up or down.",
              "Follow movement for each keyword over the last 7, 15, 30 and 60 days.",
              "Use the history to measure local SEO work: whether changes to a profile, website or reviews lined up with better rankings.",
            ]}
          />
        </Split>
        <Stack>
          <Screenshot
            src={`${IMAGES}/scan-history-table.webp`}
            width={1600}
            height={749}
            sizes="(min-width: 1240px) 1192px, 100vw"
            alt="GridBeacon scan history table showing best rank, coverage and Google Maps ranking movement over 7, 15, 30 and 60 days"
            caption="The scan list keeps every scan with its best rank, coverage and movement against earlier scans."
          />
        </Stack>
      </Section>

      <Section
        id="ai-reports"
        tone="tint"
        eyebrow="AI Ranking Intelligence reports"
        title="Turn Ranking Data Into Actionable Insights"
        intro={
          <p>
            On paid plans, any completed scan can become an AI Ranking
            Intelligence Report: a PDF that explains in plain language what
            the scan shows and what to look at first.
          </p>
        }
      >
        <Split
          media={
            <ScreenshotPair>
              <Screenshot
                src={`${IMAGES}/ai-report-summary-20260919.webp`}
                width={778}
                height={1000}
                sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 100vw"
                alt="Executive summary page of a GridBeacon AI Ranking Intelligence Report with visibility, average rank and top-3 coverage"
                caption="Executive summary"
              />
              <Screenshot
                src={`${IMAGES}/ai-report-geographic.webp`}
                width={837}
                height={1074}
                sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 100vw"
                alt="Geographic page of a GridBeacon AI report describing the strongest and weakest areas of a 21 by 21 Google Maps scan"
                caption="Geographic reading"
              />
            </ScreenshotPair>
          }
        >
          <Checklist
            items={[
              "A scan summary: visibility, average rank, top-3 coverage and how far from the business you still rank in the top 10.",
              "Ranking observations: your strongest and weakest areas, by direction and distance.",
              "Competitor insights: who is ahead of you, and where.",
              "Opportunities: prioritised next steps, each tied to evidence from the scan.",
              "A PDF you can download and share with a client or your team.",
            ]}
          />
          <Note>
            The report explains what the scan data shows; it can&apos;t
            guarantee ranking changes. Its opportunity scores are
            GridBeacon&apos;s way of prioritising, not Google ranking factors.
            Each report uses 100 credits.
          </Note>
          <p>
            <TextLink href="/features#deep-dive-reports">See report features</TextLink>
          </p>
        </Split>
      </Section>

      <Section
        id="scheduled-scans"
        eyebrow="Scheduled scans"
        title="Monitor Rankings Without Running Every Scan Manually"
        intro={
          <p>
            On paid plans, any keyword can be scanned on a schedule, so your
            ranking history builds up without anyone remembering to press the
            button.
          </p>
        }
      >
        <Cards
          items={[
            {
              title: "Pick a schedule",
              body: "Run a keyword's scan daily, weekly, every two weeks or monthly, with the same grid and radius each time.",
            },
            {
              title: "Get alerted",
              body: "Email alerts when rankings change sharply or credits run low, sent to you and any extra recipients you add.",
            },
            {
              title: "Keep the history",
              body: "Each scheduled run is saved like a manual scan, ready to compare with the ones before it.",
            },
          ]}
        />
        <Note>
          Scheduled scans are available on paid plans and use credits in the
          same way as a manual scan.
        </Note>
      </Section>

      <Section
        id="agencies"
        tone="tint"
        eyebrow="For agencies"
        title="Built for Local SEO Agencies"
      >
        <Split
          media={
            <Cards
              columns={2}
              items={[
                { title: "Many businesses", body: "Unlimited businesses and keywords on paid plans." },
                { title: "Visual results", body: "Heatmaps clients understand without an SEO glossary." },
                { title: "Proof over time", body: "Before-and-after scans and movement by keyword." },
                { title: "Team access", body: "Invite colleagues into the same workspace." },
              ]}
            />
          }
        >
          <p>
            Clients rarely trust a single ranking number, and they shouldn&apos;t.
            GridBeacon gives agencies a map of where each client ranks, who is
            ahead of them and how that changes month to month.
          </p>
          <Checklist
            items={[
              "Track multiple client businesses and keywords in one workspace.",
              "Prove ranking changes with saved scans and trend views.",
              "Show visual results instead of spreadsheets.",
              "Monitor each client's local competitors.",
              "Send AI report PDFs as part of your reporting.",
              "Schedule repeat scans for every client.",
            ]}
          />
          <InlineCta>
            <ButtonLink href={SIGNUP_URL}>Start Tracking Client Rankings</ButtonLink>
          </InlineCta>
        </Split>
      </Section>

      <Section
        id="local-businesses"
        eyebrow="For local businesses"
        title="Understand Where Customers Can Actually Find You"
        intro={
          <p>
            If customers find you through Google Maps, your ranking in each
            neighbourhood decides who gets the call. GridBeacon suits any
            business that serves a local area, for example:
          </p>
        }
      >
        <Cards
          columns={4}
          items={[
            { title: "Garage door companies", body: "Check you appear across the suburbs you drive to, not just near the shop." },
            { title: "Locksmiths", body: "Emergency searches favour whoever is closest. Find where you drop out." },
            { title: "HVAC companies", body: "See how far your visibility reaches during busy seasons." },
            { title: "Roofers", body: "Compare your coverage with the crews competing for the same jobs." },
            { title: "Plumbers", body: "Spot the neighbourhoods where “plumber near me” sends people elsewhere." },
            { title: "Dentists", body: "Understand which parts of town see your practice first." },
            { title: "Law firms", body: "Check visibility for practice-area searches across the city." },
            { title: "Other local services", body: "Cleaners, electricians, movers and more: anyone customers search for nearby." },
          ]}
        />
      </Section>

      <Section
        id="how-it-works"
        tone="tint"
        eyebrow="How it works"
        title="Track Google Maps Rankings in Four Steps"
      >
        <Steps
          items={[
            {
              title: "Add your business",
              body: "Find it on Google Maps by name and GridBeacon brings in its location and profile details.",
            },
            {
              title: "Add the keywords you want to track",
              body: "Use the searches customers actually type, such as “emergency plumber” or “garage door repair”.",
            },
            {
              title: "Choose your grid and scan area",
              body: "Pick the grid size and radius, remove points you don't serve, and see the exact credit cost before you run it.",
            },
            {
              title: "View rankings across the map",
              body: "Open the heatmap, click into any point, compare competitors and keep the scan in your history.",
            },
          ]}
        />
        <InlineCta>
          <TextLink href="/how-it-works">Read the full walkthrough</TextLink>
        </InlineCta>
      </Section>

      <Section
        id="features"
        eyebrow="What's included"
        title="Everything You Need to Track Google Maps Rankings"
        intro={
          <p>
            Scanning, competitor grids, the Gap view and history work on every
            plan. Features marked “Paid plans” need a Starter, Professional or
            Agency subscription.
          </p>
        }
      >
        <Cards
          items={[
            { title: "Geo-grid rank tracking", body: "Grids from 3 × 3 to 21 × 21 and a radius from 0.1 to 100 miles." },
            { title: "Competitor grids", body: "The full local results at every point, with no extra credits." },
            { title: "Gap view", body: "Your grid against a competitor's, point by point." },
            { title: "Rank history", body: "Compare scans and follow movement over 7 to 60 days." },
            { title: "AI Ranking Intelligence reports", tag: "Paid plans", body: "Plain-language PDF reports built from a scan." },
            { title: "Scheduled scans and alerts", tag: "Paid plans", body: "Daily to monthly scans, with email alerts when rankings move." },
            { title: "GBP Activity monitoring", tag: "Paid plans", body: "Keep track of activity on a Google Business Profile over time." },
            { title: "Review Intelligence", tag: "Paid plans", body: "Analyse up to 500 Google reviews for a business." },
            { title: "Credit-based scanning", body: "One credit per grid point, 500 free credits to start and top-ups when you need them." },
          ]}
        />
        <InlineCta>
          <TextLink href="/features">Explore all features</TextLink>
          {" · "}
          <TextLink href="/pricing">Compare plans</TextLink>
          {" · "}
          <TextLink href="/local-falcon-alternative">GridBeacon vs Local Falcon</TextLink>
        </InlineCta>
      </Section>

      <Section
        id="trust"
        tone="tint"
        eyebrow="Straight answers"
        title="What You Can Count On"
      >
        <Cards
          items={[
            { title: "No credit card to start", body: "New accounts get 500 scan credits. Upgrade only if you need more." },
            { title: "Transparent credits", body: "One credit per grid point, and the cost is shown before every scan." },
            { title: "Real Google Maps results", body: "Each point is a Google Maps search for your keyword from that coordinate." },
            { title: "Real screenshots", body: "Every product image on this page comes from actual GridBeacon scans." },
            {
              title: "Secure payments",
              body: <>Billing runs through Paddle, so GridBeacon never stores your card number. <TextLink href="/security">Security</TextLink></>,
            },
            {
              title: "A person answers",
              body: <>Questions go to our support team. <TextLink href="/contact">Contact us</TextLink></>,
            },
          ]}
        />
      </Section>

      <Section
        id="faq"
        eyebrow="FAQ"
        title="Google Maps Rank Tracking Questions"
      >
        <Faq items={FAQS} />
      </Section>

      <CtaBand
        title="See Where Your Business Really Ranks on Google Maps"
        body="Track rankings across a geo-grid, compare competitors and monitor your local visibility with GridBeacon."
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        note="No credit card required."
        secondary={{ label: "View Pricing", href: "/pricing" }}
      />
    </SeoLandingPage>
  );
}
