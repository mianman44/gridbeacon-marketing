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
import { GRIDBEACON } from "@/lib/competitors";
import { pageMetadata, SIGNUP_URL } from "@/lib/seo";

/*
 * Rank tracking by city and ZIP code.
 *
 * For people searching "track rankings by zip code", "rank tracker by
 * city" and city-named variants. What the product really does: a scan
 * centres on the listing's location, or, for a service-area business,
 * on a searched city or ZIP code or a dragged pin (ServiceAreaPicker);
 * the grid size and radius then decide how much of a city or which
 * ZIP codes it covers. There is no per-ZIP report and no list of ZIP
 * codes per point, so the page does not claim either.
 */

const PATH = "/rank-tracking-by-city-and-zip-code";
const IMAGES = "/marketing/google-maps-rank-tracker";
/* Real captures, names covered; see SCREENSHOT-SOURCES.md. */
const CITY = "/marketing/city-zip";

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: "Track Google Maps Rankings by City and ZIP Code | GridBeacon",
  description:
    "Track Google Maps rankings across a city or ZIP code with a geo-grid: see your map pack position block by block, not from one spot. 500 free credits.",
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
    "Can I track Google Maps rankings by ZIP code?",
    "Yes, by covering the ZIP code with a geo-grid. GridBeacon runs the same Google Maps search from every point of a grid and shows your rank at each one, so you can see where in a ZIP code you appear in the map pack. Service-area businesses can centre the grid on a ZIP code directly; other businesses centre on their listing and set the radius to reach the ZIP codes they care about.",
  ],
  [
    "Why does my Google Maps ranking change from one ZIP code to the next?",
    "Google ranks local results partly by distance between the searcher and each business. A customer three ZIP codes away sees a different map pack from one next door, so one rank check shows only the spot it was run from.",
  ],
  [
    "Can I track rankings in a city I'm not based in?",
    "A geo-grid can reach well beyond your address: grids run up to 21 × 21 points and a 100-mile radius. Service-area businesses can also centre the scan on another city or ZIP code they serve. Expect lower ranks far from your listing; that is how Google weighs distance, and the map shows exactly where it happens.",
  ],
  [
    "Do I get a separate report for each ZIP code?",
    "No. Each scan produces one heatmap of the whole area, with your rank at every point and who ranked at each point. Use a grid and radius that cover the ZIP codes you serve, and read the map neighbourhood by neighbourhood.",
  ],
  [
    "How much does it cost to track a city?",
    "One credit per grid point. A 9 × 9 grid across a city uses 81 credits per keyword per scan. New accounts get 500 free credits, and paid plans start at $19.99 a month for 8,000 credits.",
  ],
];

export default function CityZipRankTrackingPage() {
  return (
    <SeoLandingPage>
      <ProductPageStructuredData name="Rank Tracking by City and ZIP Code" path={PATH} />

      <Hero
        eyebrow="City and ZIP code rank tracking"
        title="Track Google Maps Rankings by City and ZIP Code"
        lede={
          <>
            Your Google Maps rank is different in every part of town. A
            geo-grid runs the same search from points across a city or a ZIP
            code and maps your position at each one, so you can see which
            neighbourhoods you win and which go to competitors.
          </>
        }
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        primaryNote="No credit card required. New accounts get 500 free scan credits."
        secondary={{ label: "Try the Free Rank Checker", href: "/google-maps-rank-checker" }}
        facts={[`Grids ${GRIDBEACON.grids}`, `Radius ${GRIDBEACON.radius}`, "1 credit per point"]}
        media={
          <Screenshot
            src={`${CITY}/hartford-ring-scan-20261108.webp`}
            width={1600}
            height={1079}
            eager
            sizes="(min-width: 1240px) 700px, (min-width: 1024px) 56vw, 100vw"
            alt="GridBeacon ring scan for best pizza across Hartford, Connecticut: green top-3 ranks near the business, blue and orange further out, grey 40+ at the edges"
            caption="A real scan across Hartford for “best pizza”: 217 points in 8 rings over 5 miles. Strong in West Hartford, weaker to the south, absent at the edges. Business name hidden."
          />
        }
      />

      <Section
        id="why"
        eyebrow="The problem"
        title="Why One Rank Check Is Not Your City-Wide Rank"
      >
        <Split
          media={
            <Note>
              Searching your keyword from your own office shows the result
              for that spot. Customers searching from the other side of the
              city, or from the next ZIP code, see a different map pack.
            </Note>
          }
        >
          <p>
            Google weighs relevance, prominence and distance when it ranks
            local results. Distance changes with every searcher, so a
            plumber can hold #1 in their own ZIP code and not appear at all
            five miles away.
          </p>
          <p>
            Tracking by city or ZIP code means measuring rank where your
            customers actually are. A geo-grid does that by searching from
            many fixed points at once and putting the answers on a map.
          </p>
        </Split>
        <Toc
          items={[
            ["How it works", "how"],
            ["Grid sizes for cities and ZIP codes", "sizes"],
            ["Set it up", "setup"],
            ["What it does not do", "limits"],
            ["FAQ", "faq"],
          ]}
        />
      </Section>

      <Section
        id="how"
        tone="tint"
        eyebrow="How it works"
        title="Cover a City or ZIP Code With a Geo-Grid"
      >
        <Cards
          items={[
            {
              title: "Pick the centre",
              body: "Scans centre on where Google places your listing. Service-area businesses can instead search a city or ZIP code, or drag a pin, to centre the grid there.",
            },
            {
              title: "Set the reach",
              body: "Choose a radius from 0.1 to 100 miles and a square grid or rings so the scan covers the ZIP codes or the part of the city you serve, and switch off points over water or empty land.",
            },
            {
              title: "Read it block by block",
              body: "Each point shows your rank and every business ranked there, so you can see which neighbourhoods you hold and who takes the others.",
            },
          ]}
        />
        <Split
          media={
            <Screenshot
              src={`${CITY}/service-area-centre-picker-20261108.webp`}
              width={632}
              height={835}
              sizes="(min-width: 1024px) 34vw, 100vw"
              alt="GridBeacon Add business step for a service-area business: Storefront or Service-area choice, a City or ZIP code search box and a map pin with a circle over Brooklyn"
              caption="Adding a service-area business: search a city or ZIP code, or drag the pin, and the circle shows what the scans will cover."
            />
          }
        >
          <p>
            <strong>Service-area businesses choose their own centre.</strong>{" "}
            When the address is hidden on Google, GridBeacon asks where scans
            should centre: the area around where Google places the listing
            (recommended), a city or ZIP code you search, or a point you drag
            the pin to.
          </p>
          <p>
            <strong>Storefronts centre on their Google pin.</strong>{" "}
            Customers come to the address, so the grid starts there and the
            radius decides how far across the city it reaches.
          </p>
        </Split>
      </Section>

      <Section
        id="sizes"
        eyebrow="Sizing"
        title="Grid Sizes for Cities and ZIP Codes"
        intro={<p>Starting points, not rules. Keep the same settings from scan to scan so results stay comparable.</p>}
      >
        <ComparisonTable
          label="Suggested grid sizes by area"
          columns={["Area to cover", "Grid and radius", "Credits per keyword scan"]}
          rows={[
            ["One ZIP code or neighbourhood", "5 × 5 to 7 × 7, 1–3 miles", "25–49"],
            ["A small city", "7 × 7 to 9 × 9, 3–6 miles", "49–81"],
            ["A large city", "11 × 11 to 13 × 13, 8–15 miles", "121–169"],
            ["A metro area across several cities", "15 × 15 to 21 × 21, 15–30 miles", "225–441"],
          ]}
          caption={
            <>
              One credit per grid point; switched-off points are free. See{" "}
              <TextLink href="/blog/geo-grid-size-and-radius">how to choose grid size and radius</TextLink>.
            </>
          }
        />
        <Screenshot
          src={`${CITY}/scan-setup-21x21-new-york-20261108.webp`}
          width={1600}
          height={1074}
          sizes="(min-width: 1240px) 1100px, 100vw"
          alt="GridBeacon scan setup with a 21 by 21 square grid and 7-mile radius over New York City, 441 points and 441 credits"
          caption="Scan setup for a whole city: a 21 × 21 grid with a 7-mile radius covers Brooklyn, Lower Manhattan and Jersey City in 441 points. Business name hidden."
        />
      </Section>

      <Section
        id="setup"
        tone="tint"
        eyebrow="Setup"
        title="Track Your First City in Four Steps"
      >
        <Steps
          items={[
            { title: "Add your business", body: "Find it on Google Maps by name or paste its Maps link." },
            { title: "Choose the centre", body: "Use the listing's location, or for a service-area business a city, ZIP code or pin." },
            { title: "Size the grid", body: "Pick a grid and radius that cover the area, then add your keywords." },
            { title: "Scan and schedule", body: "Run the first scan, then repeat it weekly or monthly to see each area move." },
          ]}
        />
        <Screenshot
          src={`${CITY}/scan-setup-rings-new-york-20261108.webp`}
          width={1600}
          height={1077}
          sizes="(min-width: 1240px) 1100px, 100vw"
          alt="GridBeacon scan setup with 10 rings and a 7-mile radius over New York City, 331 points and 331 credits"
          caption="The same 7-mile area as 10 rings: 331 points instead of 441, because a round layout skips the corners of the square."
        />
        <InlineCta>
          <TextLink href="/service-area-business-rank-tracking">Service-area businesses</TextLink>
          {" · "}
          <TextLink href="/multi-location-rank-tracking">Tracking several locations</TextLink>
          {" · "}
          <TextLink href="/what-is-a-geo-grid">What is a geo-grid?</TextLink>
        </InlineCta>
      </Section>

      <Section
        id="limits"
        eyebrow="Straight answer"
        title="What City and ZIP Tracking Does Not Do"
      >
        <Split
          media={
            <Screenshot
              src={`${IMAGES}/grid-point-competitors-20260919.webp`}
              width={1600}
              height={772}
              alt="GridBeacon grid point detail listing the businesses Google Maps ranked at that point"
              caption="Each point lists every business Google Maps ranked there."
            />
          }
        >
          <Checklist
            items={[
              "There is no separate report per ZIP code: one scan gives one heatmap of the whole area.",
              "Points are not labelled with ZIP codes; read the map against the streets you know.",
              "A storefront business's scans centre on its listing, not on another city.",
              "It measures Google Maps only, not organic results.",
            ]}
          />
        </Split>
        <RelatedComparisons current={PATH} />
      </Section>

      <Section id="faq" tone="tint" eyebrow="FAQ" title="City and ZIP Code Rank Tracking Questions">
        <Faq items={FAQS.map(([question, answer]) => [question, <p key="a">{answer}</p>])} />
      </Section>

      <CtaBand
        title="See Your Rank Across the Whole City"
        body="Scan your main keyword across your city or ZIP codes with 500 free credits."
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        note="No credit card required."
        secondary={{ label: "Free Rank Checker", href: "/google-maps-rank-checker" }}
      />
    </SeoLandingPage>
  );
}
