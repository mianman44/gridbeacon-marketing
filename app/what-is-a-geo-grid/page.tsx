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
  RankKey,
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
 * What is a geo-grid? -- an explainer, not a product page.
 *
 * Home, /google-maps-rank-tracker, /features and /how-it-works already
 * carry "geo-grid rank tracker" as a commercial term, so a fourth page
 * chasing it would compete with them. This one answers the question
 * behind the term (what a geo-grid is, why rankings vary across a map,
 * how to set one up and read it) and links to the product pages for
 * readers who are ready to buy.
 *
 * The ranking-factor wording follows Google's own help page, linked in
 * the copy. The spacing formula matches the backend: points are
 * radius / ((size - 1) / 2) miles apart.
 */

const PATH = "/what-is-a-geo-grid";
const IMAGES = "/marketing/google-maps-rank-tracker";
const GOOGLE_RANKING_HELP = "https://support.google.com/business/answer/7091";
const UPDATED = "2026-09-27";

const TITLE = "What Is a Geo-Grid? Local Rank Grids Explained";
const DESCRIPTION =
  "A geo-grid checks your Google Maps ranking from many points across an area. Learn how geo-grid rank tracking works, which grid size to use and how to read one.";

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: `${TITLE} | GridBeacon`,
  description: DESCRIPTION,
  absoluteTitle: true,
  image: {
    url: `${IMAGES}/og-google-maps-rank-tracker.jpg`,
    width: 1200,
    height: 630,
    alt: "A geo-grid of 25 points over Dallas, each coloured by the business's Google Maps rank at that point",
  },
});

const FAQS: [string, string][] = [
  [
    "What is a geo-grid in local SEO?",
    "A geo-grid is a set of evenly spaced points laid over a map around a business. A geo-grid rank tracker searches a keyword on Google Maps from each point and records where the business ranks there, so you see your ranking across a whole area instead of from a single spot.",
  ],
  [
    "Why is my Google Maps ranking different in different places?",
    "Google ranks local results on relevance, distance and prominence. Distance is measured from the person searching, so the same search made a few miles apart can return a different map pack. A business usually ranks best close to where Google places it and weaker further out.",
  ],
  [
    "What grid size should I use for a geo-grid scan?",
    "Match the grid to where your customers are. A 5 × 5 or 7 × 7 grid over a few miles suits a business customers visit locally, such as a dentist or restaurant. A 9 × 9 to 13 × 13 grid over a wider radius suits service-area businesses covering a city or metro. Larger grids give more detail but use more credits.",
  ],
  [
    "How much does a geo-grid scan cost?",
    "Most geo-grid tools charge one credit per grid point, so a 7 × 7 scan uses 49 credits. In GridBeacon, new accounts get 500 free credits, and paid plans include 8,000 to 32,000 credits a month.",
  ],
  [
    "How often should I run a geo-grid scan?",
    "Weekly is a good default while you are actively working on a profile, and monthly once rankings are stable. Always use the same centre, grid size and radius, or the scans can't be compared.",
  ],
  [
    "Is there a free geo-grid rank checker?",
    "Yes. GridBeacon's free Google Maps rank checker runs a 3 × 3 geo-grid scan for any business without an account, and a free GridBeacon account includes 500 credits for larger grids.",
  ],
];

export default function WhatIsAGeoGridPage() {
  return (
    <SeoLandingPage>
      <ProductPageStructuredData
        name="What Is a Geo-Grid?"
        path={PATH}
        faqs={FAQS}
        article={{ headline: TITLE, description: DESCRIPTION, dateModified: UPDATED }}
      />

      <Hero
        eyebrow="Local SEO guide"
        title="What Is a Geo-Grid? How Local Rank Grids Work"
        lede={
          <>
            A geo-grid is a set of evenly spaced points laid over a map
            around a business. A geo-grid rank tracker searches a keyword on
            Google Maps from every point and records where the business
            ranks there. The result is a heatmap of your local visibility:
            where customers see you in the map pack, and where a competitor
            takes your place.
          </>
        }
        primary={{ label: "Run a Free Geo-Grid Scan", href: "/google-maps-rank-checker" }}
        primaryNote="Free 3 × 3 scan, no account needed."
        secondary={{ label: "How It Works", href: "#how-it-works" }}
        facts={["Why rankings vary by location", "Choosing grid size and radius", "Reading a heatmap"]}
        updated="September 2026"
        media={
          <Screenshot
            src={`${IMAGES}/geo-grid-scan-dallas-20260919.webp`}
            width={1600}
            height={780}
            eager
            sizes="(min-width: 1240px) 700px, (min-width: 1024px) 56vw, 100vw"
            alt="A 5 × 5 geo-grid over Dallas, each point coloured by the business's Google Maps rank there"
            caption="A 5 × 5 geo-grid: 25 Google Maps searches, one from each point."
          />
        }
      />

      <Section
        id="why"
        eyebrow="The problem it solves"
        title="Why Your Google Maps Ranking Changes Across a City"
        intro={
          <p>
            Search &ldquo;plumber near me&rdquo; at your office and you might
            be first. Search again five miles away and you might not appear
            at all. Both results are real, because Google ranks local results
            partly by where the searcher is.
          </p>
        }
      >
        <Cards
          items={[
            {
              tag: "Factor 1",
              title: "Relevance",
              body: "How well a Business Profile matches the search: categories, services and the words in the profile.",
            },
            {
              tag: "Factor 2",
              title: "Distance",
              body: "How far each business is from the person searching. This is why the map pack changes as you move across town.",
            },
            {
              tag: "Factor 3",
              title: "Prominence",
              body: "How well known a business is, including reviews, links and how it appears across the web.",
            },
          ]}
        />
        <Note>
          These are the three factors Google names in its{" "}
          <TextLink href={GOOGLE_RANKING_HELP} rel="nofollow noopener">
            help page on local ranking
          </TextLink>
          . Distance is the one a single rank check can&apos;t show you,
          because a single check is made from one place.
        </Note>
        <Toc
          items={[
            ["How a geo-grid scan works", "how-it-works"],
            ["Geo-grid vs single-point tracking", "vs-single"],
            ["Choosing grid size and radius", "grid-size"],
            ["Reading a geo-grid heatmap", "reading"],
            ["Common mistakes", "mistakes"],
            ["FAQ", "faq"],
          ]}
        />
      </Section>

      <Section
        id="how-it-works"
        tone="tint"
        eyebrow="Step by step"
        title="How a Geo-Grid Scan Works"
      >
        <Steps
          items={[
            {
              title: "Pick a centre",
              body: "Usually the business's own location on Google Maps. For a business that hides its address, the point where Google places the listing.",
            },
            {
              title: "Set size and radius",
              body: "A 7 × 7 grid with a 3-mile radius puts 49 points in a square 6 miles across, 1 mile apart.",
            },
            {
              title: "Search from every point",
              body: "The tool runs the same Google Maps search from each point, as a customer standing there would.",
            },
            {
              title: "Map the ranks",
              body: "Each point is coloured by the business's position, giving a heatmap of where it wins and loses.",
            },
          ]}
        />
        <Note>
          Points are spaced at the radius divided by (points per side − 1)
          ÷ 2. A 9 × 9 grid with a 4-mile radius puts points 1
          mile apart; the same grid at 8 miles puts them 2 miles apart.
          Denser grids show more detail; wider ones cover more ground.
        </Note>
      </Section>

      <Section
        id="vs-single"
        eyebrow="Why it matters"
        title="Geo-Grid Tracking vs Traditional Local Rank Tracking"
      >
        <ComparisonTable
          label="Geo-grid rank tracking compared with single-location rank tracking"
          columns={["", "Geo-grid tracking", "Single-location tracking"]}
          rows={[
            ["Where it searches from", "Many points across your area", "One point, usually a city centre or ZIP code"],
            ["What you learn", "Where you rank across the whole service area", "Your rank for one searcher in one place"],
            ["Distance effect", "Visible: rankings fade as points move away", "Hidden"],
            ["Competitors", "Who wins each part of the map", "Who ranks above you at one point"],
            ["Best for", "Map pack visibility, service areas, multi-location businesses", "Organic rankings, quick spot checks"],
            ["Cost", "One credit per point, so bigger grids cost more", "Usually one check per keyword"],
          ]}
          caption="Most local SEO teams use both: geo-grids for the map pack, keyword tracking for organic results."
        />
      </Section>

      <Section
        id="grid-size"
        tone="tint"
        eyebrow="Setting it up"
        title="Which Grid Size and Radius Should You Use?"
        intro={
          <p>
            Cover the area your customers actually come from, at a density
            that shows real change. These are sensible starting points:
          </p>
        }
      >
        <ComparisonTable
          label="Suggested geo-grid sizes by type of business"
          columns={["Business", "Suggested grid", "Why"]}
          rows={[
            ["Restaurant, café or salon in a city", "5 × 5 or 7 × 7, 1–2 mile radius", "Customers come from nearby, and ranks change block by block."],
            ["Dentist, clinic or law firm", "7 × 7, 2–5 mile radius", "People travel a little further for a trusted provider."],
            ["Plumber, electrician or locksmith", "9 × 9 to 13 × 13, 5–15 mile radius", "Service-area businesses sell across a whole city."],
            ["Roofer or builder covering a metro", "13 × 13 or larger, 15–30 mile radius", "Jobs are spread over a wide region."],
            ["Rural business", "7 × 7 to 9 × 9, 10–25 mile radius", "Fewer competitors, longer distances between towns."],
          ]}
          caption="Starting points, not rules. If most of the grid is red, try a smaller radius; if most is green, widen it to find where you stop ranking."
        />
        <InlineCta>
          Grid sizes in GridBeacon run from 3 × 3 to 21 × 21 and the radius
          from 0.1 to 100 miles. <TextLink href="/pricing">See what each size costs in credits</TextLink>.
        </InlineCta>
      </Section>

      <Section
        id="reading"
        eyebrow="Interpreting the result"
        title="How to Read a Geo-Grid Heatmap"
      >
        <Split
          media={
            <RankKey
              title="What the colours mean"
              metrics={[
                ["Visibility", "The share of grid points where the business appears in the top 10."],
                ["Average rank", "The business's mean position across the points where it appears."],
                ["Top 3", "The share of points where it is in the map pack."],
              ]}
            />
          }
        >
          <p>
            Start with the pattern, not the numbers. Most healthy grids are
            green near the business and fade outward. What matters is where
            the fade starts and which direction it falls fastest.
          </p>
          <Checklist
            items={[
              <><strong>Green core, red edges:</strong> normal. Work on relevance and prominence to push the edge outward.</>,
              <><strong>Red at the centre:</strong> often a relevance problem: the profile may not match the keyword well, or competitors cluster nearby.</>,
              <><strong>One weak side:</strong> often a strong competitor in that direction. Check who ranks at those points.</>,
              <><strong>Mostly empty:</strong> the business isn&apos;t in the results. Check the grid is centred where Google places the listing.</>,
            ]}
          />
          <p>
            <TextLink href="/local-seo-competitor-analysis">
              How to find out who beats you at each point
            </TextLink>
          </p>
        </Split>
      </Section>

      <Section
        id="mistakes"
        tone="tint"
        eyebrow="Avoid these"
        title="Common Geo-Grid Mistakes"
      >
        <Cards
          items={[
            {
              title: "Changing the settings between scans",
              body: "A new centre, size or radius gives a different grid. Keep all three fixed if you want to measure progress.",
            },
            {
              title: "Centring a service-area business on the city",
              body: "Google ranks a service-area business from around where it places the listing, which can be miles from the city centre.",
            },
            {
              title: "Reading one scan as a trend",
              body: "Local results shift day to day. Judge progress over several scans, not the difference between two.",
            },
            {
              title: "Tracking a single keyword",
              body: "Customers search in different ways, and each keyword can have its own map. Track the handful that bring real calls.",
            },
            {
              title: "Paying for empty points",
              body: "Points over water, parkland or farmland have no customers. Exclude them if your tool allows it.",
            },
            {
              title: "Ignoring the competitors",
              body: "A grid shows where you lose; the businesses ranked at those points show why.",
            },
          ]}
        />
      </Section>

      <Section id="faq" eyebrow="FAQ" title="Geo-Grid Questions">
        <Faq items={FAQS.map(([question, answer]) => [question, <p key="a">{answer}</p>])} />
        <InlineCta>
          <TextLink href="/google-maps-rank-tracker">GridBeacon&apos;s Google Maps rank tracker</TextLink>
          {" · "}
          <TextLink href="/best-local-rank-trackers">Best local rank trackers compared</TextLink>
          {" · "}
          <TextLink href="/service-area-business-rank-tracking">Tracking a service-area business</TextLink>
        </InlineCta>
      </Section>

      <CtaBand
        title="See Your Own Geo-Grid"
        body="Run a free 3 × 3 scan now, or create an account for 500 free credits and grids up to 21 × 21."
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        note="No credit card required."
        secondary={{ label: "Free Rank Checker", href: "/google-maps-rank-checker" }}
      />
    </SeoLandingPage>
  );
}
