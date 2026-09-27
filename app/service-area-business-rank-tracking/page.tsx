import type { Metadata } from "next";

import {
  Cards,
  Checklist,
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
 * Rank tracking for service-area businesses (SABs).
 *
 * Built on release 20260923: the Maps link identifies the exact listing
 * by its cid, a hidden address marks it as a service-area business,
 * and the grid centre is the owner's choice -- the listing's location
 * (recommended), a searched city or ZIP, or a dragged pin. What is not
 * built yet (several service areas per business, a centre per keyword)
 * is stated on the page. Google's rules are quoted from its own help
 * page, linked in the copy.
 */

const PATH = "/service-area-business-rank-tracking";
const IMAGES = "/marketing/google-maps-rank-tracker";
const GOOGLE_SAB_HELP = "https://support.google.com/business/answer/9157481";

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: "Rank Tracking for Service-Area Businesses | GridBeacon",
  description:
    "Track Google Maps rankings for plumbers, cleaners and other service-area businesses that hide their address. Centre the grid where Google places your listing.",
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
    "What is a service-area business on Google?",
    "A business that serves customers at their location rather than at its own, such as a plumber, cleaner or mobile mechanic. Google asks these businesses to hide their address on their Business Profile and to list the cities, postal codes or areas they serve instead.",
  ],
  [
    "Why is rank tracking harder for a service-area business?",
    "Most rank trackers centre their checks on the business's address, and a service-area business has none on its profile. Google still places the listing at a point on the map and ranks it from around there, so a grid centred on the middle of the city it serves can miss where it actually ranks.",
  ],
  [
    "Where should I centre a geo-grid for a service-area business?",
    "Start where Google places the listing. GridBeacon can look this up for you with its Use my Google listing's location option. You can also centre the grid on a city or ZIP code, or drag the pin, if you want to measure a particular part of your area.",
  ],
  [
    "Does GridBeacon need access to my Google Business Profile?",
    "No. You paste your listing's Google Maps link and GridBeacon identifies that exact listing from it, so it never mixes you up with a similar-sounding business. No profile access is needed.",
  ],
  [
    "Can I track several service areas for one business?",
    "Not yet. Each business has one scan centre today; to measure another part of your area, move the centre and keep in mind that scans with different centres can't be compared directly. Separate service areas per business are planned.",
  ],
  [
    "Does hiding my address hurt my Google Maps rankings?",
    "Google asks service-area businesses to hide their address, so doing so follows its guidelines. Distance still matters: Google measures it from where it places your listing, which is why tracking from that point gives the most realistic picture.",
  ],
];

export default function ServiceAreaBusinessPage() {
  return (
    <SeoLandingPage>
      <ProductPageStructuredData name="Service-Area Business Rank Tracking" path={PATH} faqs={FAQS} />

      <Hero
        eyebrow="Service-area businesses"
        title="Google Maps Rank Tracking for Service-Area Businesses"
        lede={
          <>
            Plumbers, cleaners, locksmiths and other businesses that visit
            their customers hide their address on Google. That leaves most
            rank trackers guessing where to scan from. GridBeacon identifies
            your exact listing from its Maps link and centres the grid where
            Google actually places you, so the heatmap shows where you really
            rank.
          </>
        }
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        primaryNote="No credit card required. New accounts get 500 free scan credits."
        secondary={{ label: "Why SABs Are Different", href: "#why" }}
        facts={["No profile access needed", "Grids up to 21 × 21", "Radius up to 100 miles"]}
        media={
          <Screenshot
            src={`${IMAGES}/geo-grid-scan-dallas-20260919.webp`}
            width={1600}
            height={780}
            eager
            sizes="(min-width: 1240px) 700px, (min-width: 1024px) 56vw, 100vw"
            alt="GridBeacon geo-grid heatmap of Google Maps rankings across a city"
            caption="A geo-grid shows where across your area customers see you in the map pack."
          />
        }
      />

      <Section
        id="why"
        eyebrow="The problem"
        title="Why Service-Area Businesses Are Hard to Track"
        intro={
          <p>
            Google&apos;s{" "}
            <TextLink href={GOOGLE_SAB_HELP} rel="nofollow noopener">
              service-area business guidelines
            </TextLink>{" "}
            ask businesses that don&apos;t serve customers at their premises
            to remove their address, and to describe the areas they cover by
            city, postal code or region, up to 20 areas and roughly two hours
            of driving from their base. That creates three problems for rank
            tracking.
          </p>
        }
      >
        <Cards
          items={[
            {
              tag: "Problem 1",
              title: "No address to centre on",
              body: "Trackers that start from the business address have nothing to use, so they fall back on a city centre or ask you to guess.",
            },
            {
              tag: "Problem 2",
              title: "The listing still has a location",
              body: "Google places a service-area listing at a point on the map and ranks it from around there, not from the middle of the areas it lists.",
            },
            {
              tag: "Problem 3",
              title: "Look-alike listings",
              body: "Searching by name can match a similarly named business. Track the wrong one and every scan measures someone else.",
            },
          ]}
        />
        <Note>
          When we added service-area support we checked real cases: city
          centres that owners chose were often 5 to 10 miles from where Google
          placed the listing, and grids centred there found little or nothing.
          The same business, scanned from its listing&apos;s location, showed
          up across its area.
        </Note>
        <Toc
          items={[
            ["How GridBeacon handles it", "how"],
            ["Setting up the grid", "setup"],
            ["Tips for service-area businesses", "tips"],
            ["What's not built yet", "limits"],
            ["FAQ", "faq"],
          ]}
        />
      </Section>

      <Section
        id="how"
        tone="tint"
        eyebrow="How GridBeacon handles it"
        title="Tracking Built for Businesses Without an Address"
      >
        <Split
          reverse
          media={
            <Screenshot
              src={`${IMAGES}/grid-point-competitors-20260919.webp`}
              width={1600}
              height={772}
              alt="GridBeacon heatmap with a point selected, listing the businesses Google Maps ranked there"
              caption="See which competitors take the map pack in each part of your area."
            />
          }
        >
          <Checklist
            items={[
              <><strong>The exact listing, from its Maps link.</strong> Paste your Google Maps link and GridBeacon reads the listing&apos;s ID from it, so it can&apos;t be confused with a similar name.</>,
              <><strong>Detected automatically.</strong> When Google hides a listing&apos;s address, GridBeacon sets the business up as a service-area business.</>,
              <><strong>Centred where Google places you.</strong> One click uses your Google listing&apos;s location as the grid centre, the point Google ranks you from.</>,
              <><strong>Or centre it yourself.</strong> Search a city or ZIP code, or drag the pin, with a circle showing how far the scan reaches.</>,
              <><strong>Honest about absence.</strong> If the listing isn&apos;t in the results at any point, the heatmap says so plainly.</>,
            ]}
          />
        </Split>
      </Section>

      <Section
        id="setup"
        eyebrow="Setup"
        title="Setting Up a Service-Area Business in GridBeacon"
      >
        <Steps
          items={[
            { title: "Copy your Maps link", body: "Open your listing on Google Maps and copy its link from the address bar or the Share button." },
            { title: "Paste it in GridBeacon", body: "Add a business, paste the link, and GridBeacon finds that exact listing." },
            { title: "Confirm the centre", body: "Use your Google listing's location, recommended, or pick a city, ZIP or point." },
            { title: "Add keywords and scan", body: "Choose a grid size and radius that cover your area, then run the first scan." },
          ]}
        />
        <InlineCta>
          Not sure which grid to use? <TextLink href="/what-is-a-geo-grid">Read the geo-grid guide</TextLink>.
        </InlineCta>
      </Section>

      <Section
        id="tips"
        tone="tint"
        eyebrow="Tips"
        title="Rank Tracking Tips for Service-Area Businesses"
      >
        <Cards
          items={[
            {
              title: "Use a wider grid",
              body: "Service areas are big. A 9 × 9 to 13 × 13 grid over 5 to 15 miles is a sensible start for a trade covering one city.",
            },
            {
              title: "Track the jobs, not just the trade",
              body: "“Boiler repair” and “emergency plumber” can rank very differently. Track the few searches that bring paid work.",
            },
            {
              title: "Keep the centre fixed",
              body: "Moving the centre changes the whole grid. Keep it in one place so month-to-month comparisons mean something.",
            },
            {
              title: "Skip empty ground",
              body: "Exclude points over water, parks or farmland where you have no customers; excluded points use no credits.",
            },
            {
              title: "Watch the edges",
              body: "Where your ranking fades shows how far your visibility reaches. Pushing that edge outward is the goal.",
            },
            {
              title: "Know who takes your spots",
              body: "Other service-area businesses often rank from their own base. The point inspector shows who they are.",
            },
          ]}
        />
        <Note>
          Works for any service-area trade: plumbers, electricians, HVAC,
          roofers, cleaners, locksmiths, pest control, landscapers, movers,
          mobile mechanics and dog groomers.
        </Note>
      </Section>

      <Section
        id="limits"
        eyebrow="Straight answer"
        title="What's Not Built Yet"
      >
        <Split
          media={
            <Note>
              Separate service areas and a centre per keyword are planned.
              Until then, one well-chosen centre per business, usually the
              listing&apos;s location, covers most service-area businesses.
            </Note>
          }
        >
          <Checklist
            variant="cross"
            items={[
              "Several separate service areas for one business, each with its own centre.",
              "A different grid centre for each keyword.",
              "Reading your Business Profile's list of service areas: you choose the centre and radius yourself.",
            ]}
          />
        </Split>
        <InlineCta>
          <TextLink href="/local-seo-competitor-analysis">Competitor analysis</TextLink>
          {" · "}
          <TextLink href="/google-maps-rank-tracker">Google Maps rank tracker</TextLink>
          {" · "}
          <TextLink href="/pricing">Pricing</TextLink>
        </InlineCta>
      </Section>

      <Section id="faq" tone="tint" eyebrow="FAQ" title="Service-Area Business Questions">
        <Faq items={FAQS.map(([question, answer]) => [question, <p key="a">{answer}</p>])} />
      </Section>

      <CtaBand
        title="See Where Your Service-Area Business Really Ranks"
        body="Paste your Maps link, centre the grid on your listing and scan with 500 free credits."
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        note="No credit card required."
        secondary={{ label: "View Pricing", href: "/pricing" }}
      />
    </SeoLandingPage>
  );
}
