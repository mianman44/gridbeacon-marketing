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
  Steps,
  TextLink,
  Toc,
} from "@/components/marketing/seo-landing";
import { ProductPageStructuredData } from "@/components/marketing/structured-data";
import { pageMetadata, SIGNUP_URL } from "@/lib/seo";

/*
 * Methodology: how a scan asks Google Maps and how the numbers are
 * worked out. Every statement here follows the backend:
 *   - request parameters: backend/app/services/dataforseo_scan_service.py
 *     (coordinate to 7 decimals, zoom from _zoom_for_radius, language
 *     "en", device "desktop", search_this_area)
 *   - ARP / ATRP / SoLV: backend/app/services/keyword_report_service.py
 *     (unranked counts as 21 for ATRP; SoLV = share of points in the top 3)
 *   - point spacing: radius / ((size - 1) / 2), as on /what-is-a-geo-grid
 * Change this page when any of those change. The result depth is a
 * server setting, so the page does not quote a number for it.
 */

const PATH = "/how-gridbeacon-checks-rankings";
const IMAGES = "/marketing/google-maps-rank-tracker";
const UPDATED = "2026-11-02";

const TITLE = "How GridBeacon Checks Google Maps Rankings";
const DESCRIPTION =
  "The method behind every GridBeacon scan: how grid points are placed, how each Google Maps search is made, and how ARP, ATRP, SoLV and visibility are calculated.";

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: "How We Check Google Maps Rankings: Our Method",
  description: DESCRIPTION,
});

const FAQS: [string, string][] = [
  [
    "Are GridBeacon's rankings real Google Maps results?",
    "Yes. Each grid point is its own Google Maps search for your keyword, requested through a specialised search-data provider at that exact coordinate. GridBeacon records the results Google returned there; it does not estimate or model positions.",
  ],
  [
    "Why does GridBeacon show a different rank from what I see on my phone?",
    "Your own search uses your exact location, your device and sometimes your search history. A GridBeacon point searches from the grid coordinate, in English, on a desktop-style request with no personal history. A few hundred metres, a different device or a later time can all change the map pack, so compare scans with scans rather than with one personal search.",
  ],
  [
    "What does 'not ranked' mean on a GridBeacon heatmap?",
    "The business was not in the results captured at that point. It may appear further down the list, but beyond the depth the scan collected. For ATRP, a point like that counts as rank 21, the usual convention for local grids.",
  ],
  [
    "How does GridBeacon know which result is my business?",
    "It matches the business by its Google place ID, the identifier Google gives each listing, and falls back to the business name only when a result has no ID. That keeps a competitor with a similar name from being counted as you.",
  ],
  [
    "Can I compare two scans with different settings?",
    "You can open them side by side, but the numbers are only comparable when the keyword, centre, grid size, radius and excluded points match. Rank MRI enforces this: it only compares scans that asked the same question.",
  ],
  [
    "Is a scan the same as a search a customer makes?",
    "It is a close stand-in, not a copy. A scan shows what Google Maps returned at each point when it ran. It does not measure how many people searched, saw your listing or called you.",
  ],
];

export default function MethodologyPage() {
  return (
    <SeoLandingPage>
      <ProductPageStructuredData
        name="How GridBeacon Checks Rankings"
        path={PATH}
        article={{ headline: TITLE, description: DESCRIPTION, dateModified: UPDATED }}
      />

      <Hero
        eyebrow="Methodology"
        title="How GridBeacon Checks Your Google Maps Rankings"
        lede={
          <>
            A ranking number is only useful if you know how it was measured.
            This page explains exactly what happens in a GridBeacon scan:
            where the grid points go, how each Google Maps search is made,
            how your business is found in the results, and how the summary
            figures are calculated.
          </>
        }
        primary={{ label: "Run a Free 3 × 3 Check", href: "/google-maps-rank-checker" }}
        primaryNote="No card and no account needed."
        secondary={{ label: "The Formulas", href: "#metrics" }}
        facts={["One real Maps search per point", "Matched by Google place ID", "Published formulas"]}
        updated="November 2026"
        media={
          <Screenshot
            src={`${IMAGES}/grid-point-inspector-20261031.webp`}
            width={1372}
            height={772}
            eager
            sizes="(min-width: 1240px) 700px, (min-width: 1024px) 56vw, 100vw"
            alt="A GridBeacon scan with one grid point open, listing the businesses Google Maps returned at that point in order"
            caption="Every point keeps the full list Google returned there, so any rank can be checked."
          />
        }
      />

      <Section id="grid" eyebrow="Step 1" title="Where the Grid Points Go">
        <Toc
          items={[
            ["Placing the grid", "grid"],
            ["Each Google Maps search", "search"],
            ["Finding your business", "matching"],
            ["How the figures are calculated", "metrics"],
            ["What a scan does not tell you", "limits"],
          ]}
        />
        <Cards
          items={[
            { title: "A centre and a radius", body: "Every scan starts from a centre, usually the business's map pin, and a radius from 0.1 to 100 miles. Service-area businesses with a hidden address set the centre themselves." },
            { title: "Evenly spaced points", body: "A square grid from 3 × 3 (9 points) to 21 × 21 (441 points) is laid over that area. Points are radius ÷ ((size − 1) ÷ 2) miles apart, so a 9 × 9 grid over 4 miles puts them 1 mile apart." },
            { title: "Rings instead of rows", body: "The ring layout places points on circles around the centre instead, for areas that spread evenly in every direction." },
            { title: "Points you leave out", body: "Custom scan areas let you exclude points over water or outside your service area. Excluded points are not searched and not charged." },
          ]}
        />
        <InlineCta>
          New to grids? <TextLink href="/what-is-a-geo-grid">Read what a geo-grid is</TextLink> or{" "}
          <TextLink href="/blog/geo-grid-size-and-radius">how to choose a grid size and radius</TextLink>.
        </InlineCta>
      </Section>

      <Section
        id="search"
        tone="tint"
        eyebrow="Step 2"
        title="How Each Google Maps Search Is Made"
        intro={<p>Each active point becomes its own Google Maps search, sent through a specialised search-data provider. One point, one search, one credit.</p>}
      >
        <ComparisonTable
          label="The settings each grid point is searched with"
          columns={["Setting", "Value", "Why"]}
          rows={[
            ["Location", "The point's exact latitude and longitude (7 decimal places)", "The search happens where the point is, not from an IP address or ZIP code"],
            ["Map zoom", "Chosen from the radius: zoomed in for small areas (up to 0.5 mi), further out for large ones (over 8 mi)", "Matches the map view a searcher would have at that scale"],
            ["Search area", "Results for the visible map area", "Mirrors how Maps lists businesses for the area in view"],
            ["Language", "English", "Kept fixed so two scans ask the same question"],
            ["Device", "Desktop", "Kept fixed for the same reason"],
            ["Keyword", "Exactly as you typed it", "“plumber” and “plumber near me” are different searches"],
          ]}
          caption="Rank MRI records the language and device for every point, so it can refuse to compare scans that asked different questions."
        />
      </Section>

      <Section id="matching" eyebrow="Step 3" title="How Your Business Is Found in the Results">
        <Steps
          items={[
            { title: "The results are stored", body: "For each point, GridBeacon keeps the businesses Google returned there, in order, with ratings and review counts." },
            { title: "Your listing is matched by place ID", body: "Google gives every listing a place ID. GridBeacon finds yours by that ID, and uses the business name only for results without one, so a similarly named competitor is not counted as you." },
            { title: "A position or 'not ranked'", body: "If your listing is in the list, its position is recorded. If it is not among the results captured, the point is marked not ranked." },
            { title: "Competitors come free", body: "Because every business at every point is stored, any competitor's grid and the Gap view are built from the same scan without another search." },
          ]}
        />
      </Section>

      <Section
        id="metrics"
        tone="tint"
        eyebrow="Step 4"
        title="How ARP, ATRP, SoLV and Visibility Are Calculated"
        intro={<p>Every summary figure comes from the ranks at the scan&apos;s points. Here are the formulas, so you can check any number by hand.</p>}
      >
        <ComparisonTable
          label="GridBeacon's ranking metrics and how each is calculated"
          columns={["Metric", "Formula", "Example: 25 points, ranked at 20"]}
          rows={[
            ["ARP (Average Rank Position)", "Mean rank over the points where the business ranks", "Ranks at the 20 ranked points average 4.0 → ARP 4.0"],
            ["ATRP (Average Total Rank Position)", "Mean rank over every point, counting each not-ranked point as 21", "(20 × 4.0 + 5 × 21) ÷ 25 → ATRP 7.4"],
            ["SoLV (Share of Local Voice)", "Percentage of all points where the business is in the top 3", "8 points in the top 3 → 8 ÷ 25 = 32%"],
            ["Visibility", "Percentage of all points where the business is in the top 10", "18 points in the top 10 → 72%"],
          ]}
          caption="ARP can look strong when a business ranks in only a few places, because points where it is missing are left out. ATRP and SoLV count every point, so read them together."
        />
        <InlineCta>
          <TextLink href="/blog/share-of-local-voice">More on share of local voice</TextLink>
          {" · "}
          <TextLink href="/blog/how-to-read-google-maps-ranking-heatmap">How to read a ranking heatmap</TextLink>
        </InlineCta>
      </Section>

      <Section id="limits" eyebrow="Honest limits" title="What a Scan Does Not Tell You">
        <Checklist
          variant="cross"
          items={[
            "How many people searched, saw your listing or called. Rankings are not traffic or leads.",
            "What one particular customer sees: their exact spot, phone and history can differ from a grid point.",
            "Why a ranking changed. A profile edit before a drop is a clue, not proof.",
            "Results between the points. A grid samples the area; a denser grid samples it more finely.",
            "Positions below the depth the scan collected; those points show as not ranked.",
          ]}
        />
        <Note>
          Google ranks local results on relevance, distance and prominence, as described in its{" "}
          <TextLink href="https://support.google.com/business/answer/7091" rel="noopener">local ranking help page</TextLink>.
          Distance is measured from the searcher, which is why a grid of searches shows more than any single one.
        </Note>
      </Section>

      <Section id="faq" tone="tint" eyebrow="FAQ" title="Ranking Method Questions">
        <Faq items={FAQS.map(([question, answer]) => [question, <p key="a">{answer}</p>])} />
        <InlineCta>
          <TextLink href="/google-maps-rank-tracker">Google Maps rank tracker</TextLink>
          {" · "}
          <TextLink href="/gmb-rank-tracker">GMB rank tracker</TextLink>
          {" · "}
          <TextLink href="/best-local-rank-trackers">Best local rank trackers compared</TextLink>
        </InlineCta>
      </Section>

      <CtaBand
        title="Check the Method on Your Own Business"
        body="Run a free 3 × 3 check, or create an account with 500 free credits and open any point to see the full list Google returned there."
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        note="No credit card required."
        secondary={{ label: "Free Rank Checker", href: "/google-maps-rank-checker" }}
      />
    </SeoLandingPage>
  );
}
