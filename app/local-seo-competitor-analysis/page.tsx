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
  Toc,
} from "@/components/marketing/seo-landing";
import { ProductPageStructuredData } from "@/components/marketing/structured-data";
import { pageMetadata, SIGNUP_URL } from "@/lib/seo";

/*
 * Local SEO competitor analysis.
 *
 * Every feature named here is on the app's heatmap or Competitors page
 * (frontend competitors/page.tsx section titles and the heatmap's
 * point inspector, "Your grid / Their grid / Gap" switch and "Beats you
 * at N of M"). The "what to do about it" advice is general local SEO
 * practice and is worded as such; it never promises a ranking result.
 */

const PATH = "/local-seo-competitor-analysis";
const IMAGES = "/marketing/google-maps-rank-tracker";

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: "Local SEO Competitor Analysis for Google Maps | GridBeacon",
  description:
    "See which competitors outrank you on Google Maps, at which points and for which keywords. Competitor grids, a Gap view and profile comparisons from every scan.",
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
    "What is local SEO competitor analysis?",
    "It is finding out which businesses outrank you in local search, where in your area they do it, for which keywords, and what they have that you don't, such as more reviews, better-matched categories or a location closer to your customers. For Google Maps, it works best on a geo-grid, because the competitors ranking above you change from one part of town to another.",
  ],
  [
    "How do I find out who my local competitors are?",
    "Search your main keywords on Google Maps from several places across your service area and note which businesses appear in the map pack. A geo-grid scan does this automatically: GridBeacon records every business Google Maps returns at every grid point and ranks them in a competitor leaderboard.",
  ],
  [
    "Does competitor analysis cost extra credits in GridBeacon?",
    "No. Every scan already records the full local results at each point, so competitor grids, the Gap view, the leaderboard and the Competitors page use data you have paid for once. You only spend credits on the scan itself.",
  ],
  [
    "What does the Gap view show?",
    "After you pick a competitor on a scan, the Gap view compares your rank with theirs at every point: green where you are ahead, red where they are. Alongside it, GridBeacon shows each competitor as “beats you at N of M”: of the M points where it appears, the N where it ranks above you.",
  ],
  [
    "Can I compare my Google Business Profile with a competitor's?",
    "Yes. The Competitors page compares your profile with competitors' on rating, number of reviews, reviews gained in the last 30 days, categories, photos and profile completeness.",
  ],
  [
    "Do my competitors know I am tracking them?",
    "No. GridBeacon reads public Google Maps results. Nothing is sent to the businesses you track and no access to their profiles is needed.",
  ],
];

export default function CompetitorAnalysisPage() {
  return (
    <SeoLandingPage>
      <ProductPageStructuredData name="Local SEO Competitor Analysis" path={PATH} faqs={FAQS} />

      <Hero
        eyebrow="Local SEO competitor analysis"
        title="See Who Beats You on Google Maps, and Where"
        lede={
          <>
            The businesses above you in the map pack aren&apos;t the same
            across your whole area. GridBeacon records every business Google
            Maps returns at every point of your grid, then shows who controls
            each part of the map, where they beat you, and how their profiles
            compare with yours. It all comes from the scan you already ran.
          </>
        }
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        primaryNote="No credit card required. New accounts get 500 free scan credits."
        secondary={{ label: "How to Run an Analysis", href: "#process" }}
        facts={["No extra credits for competitor data", "Gap view against any competitor", "Profile comparison"]}
        media={
          <Screenshot
            src={`${IMAGES}/grid-point-competitors-20260919.webp`}
            width={1600}
            height={772}
            eager
            sizes="(min-width: 1240px) 700px, (min-width: 1024px) 56vw, 100vw"
            alt="GridBeacon heatmap with one grid point selected and the list of businesses Google Maps ranked at that point"
            caption="Select any point to see every business ranked there, in order."
          />
        }
      />

      <Section
        id="questions"
        eyebrow="What it should answer"
        title="Five Questions a Local Competitor Analysis Should Answer"
        intro={
          <p>
            A list of competitor names is not an analysis. To decide what to
            do next, you need answers to these:
          </p>
        }
      >
        <Cards
          items={[
            { tag: "1", title: "Who outranks me?", body: "The businesses that take the map pack spots you want, ranked by how much of your area they control." },
            { tag: "2", title: "Where do they win?", body: "The neighbourhoods or directions where a competitor ranks above you, and where you still lead." },
            { tag: "3", title: "For which keywords?", body: "A competitor that dominates “emergency plumber” may be weak on “water heater repair”." },
            { tag: "4", title: "Why are they ahead?", body: "Ratings, review count and pace, categories, photos and profile completeness, set side by side." },
            { tag: "5", title: "Is it changing?", body: "Who gained or lost ground since the last scan, and whether your share of the map is growing." },
          ]}
        />
        <Toc
          items={[
            ["Competitor tools in GridBeacon", "tools"],
            ["How to run the analysis", "process"],
            ["Turning findings into actions", "actions"],
            ["FAQ", "faq"],
          ]}
        />
      </Section>

      <Section
        id="tools"
        tone="tint"
        eyebrow="In GridBeacon"
        title="Competitor Analysis Tools Built Into Every Scan"
      >
        <Split
          reverse
          media={
            <Screenshot
              src={`${IMAGES}/rank-movement-heatmap-20260919.webp`}
              width={1600}
              height={813}
              alt="GridBeacon heatmap with trend arrows showing where rankings moved since the previous scan"
              caption="Trend arrows show where rankings moved since the previous scan."
            />
          }
        >
          <Checklist
            items={[
              <><strong>Point inspector.</strong> Click any grid point for the full list of businesses Google Maps ranked there.</>,
              <><strong>Competitor grids.</strong> Open any competitor from the scan as its own heatmap.</>,
              <><strong>Gap view.</strong> Your grid against theirs, point by point: green where you lead, red where they do.</>,
              <><strong>&ldquo;Beats you at N of M&rdquo;.</strong> For each competitor, how many of the points where it appears it ranks above you.</>,
            ]}
          />
        </Split>
        <Cards
          items={[
            { title: "Local Competitor Leaderboard", body: "Every business found in your scans, ranked by how well it performs across your grid." },
            { title: "Share of Local Visibility", body: "How much of the map each business controls, based on who wins each grid point." },
            { title: "Geographic Competitor Coverage", body: "Which competitor holds the top spot at each point, so you can see territory, not just totals." },
            { title: "Keyword Battle", body: "Who dominates each tracked keyword, you and your chosen competitors side by side." },
            { title: "Biggest Competitor Changes", body: "Who gained and who lost ground since the previous completed scan." },
            { title: "Business Profile Comparison", body: "Rating, reviews, reviews gained in 30 days, categories, photos and profile completeness." },
            { title: "Head-to-Head", body: "Your business against the strongest competitor detected in your scans." },
            { title: "Visibility Over Time", body: "How visibility in your area has moved across past scans." },
            { title: "Watched competitors", body: "Pin the competitors you care about and filter the page down to them." },
          ]}
        />
      </Section>

      <Section
        id="process"
        eyebrow="Step by step"
        title="How to Run a Local SEO Competitor Analysis"
      >
        <Steps
          items={[
            { title: "Scan your main keywords", body: "Use the grid size and radius that match your service area, one scan per keyword that brings calls." },
            { title: "Find who controls the map", body: "Check the leaderboard and Share of Local Visibility to name the two or three competitors that matter." },
            { title: "Map where they win", body: "Open each one's grid and the Gap view to see the exact areas they take from you." },
            { title: "Compare the profiles", body: "Line up ratings, review pace, categories and photos to spot what they have that you don't." },
          ]}
        />
        <Note>
          Repeat the scans on a schedule. A single scan shows a moment;
          Biggest Competitor Changes and Visibility Over Time only mean
          something across several.
        </Note>
      </Section>

      <Section
        id="actions"
        tone="tint"
        eyebrow="What to do with it"
        title="Turning Competitor Findings Into Actions"
        intro={
          <p>
            Common patterns, what they usually mean, and where to look first.
            None guarantees a ranking change, but each points you at the
            likeliest cause.
          </p>
        }
      >
        <ComparisonTable
          label="Common competitor findings and what to check"
          columns={["What you see", "What it often means", "Where to look first"]}
          rows={[
            ["A competitor wins most points near you", "Their profile is a better match for the keyword", "Primary and secondary categories, services, business description"],
            ["They win one side of town only", "They are based closer to those customers", "Distance can't be changed; focus on the areas you can win and on prominence"],
            ["They gained ground since last scan", "Recent activity on their profile", "Their review count and 30-day review growth, new photos"],
            ["Far more reviews than you", "Prominence gap", "A steady review-request routine with your customers"],
            ["Similar profiles, but they rank higher", "Signals outside the profile", "Their website, local links and citations"],
          ]}
          caption="General local SEO guidance, not a GridBeacon feature list. Google names relevance, distance and prominence as its local ranking factors."
        />
        <InlineCta>
          <TextLink href="/what-is-a-geo-grid">How geo-grids work</TextLink>
          {" · "}
          <TextLink href="/local-seo-report">Turn the analysis into a client report</TextLink>
        </InlineCta>
      </Section>

      <Section id="faq" eyebrow="FAQ" title="Local Competitor Analysis Questions">
        <Faq items={FAQS.map(([question, answer]) => [question, <p key="a">{answer}</p>])} />
      </Section>

      <CtaBand
        title="Find Out Who's Taking Your Map Pack Spots"
        body="Scan your main keyword on 500 free credits and see every competitor at every point of your area."
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        note="No credit card required."
        secondary={{ label: "View Pricing", href: "/pricing" }}
      />
    </SeoLandingPage>
  );
}
