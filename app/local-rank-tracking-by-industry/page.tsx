import type { Metadata } from "next";

import { IndustryList } from "@/components/marketing/industry-page";
import {
  Cards,
  CtaBand,
  Hero,
  InlineCta,
  Screenshot,
  Section,
  SeoLandingPage,
  TextLink,
} from "@/components/marketing/seo-landing";
import { BreadcrumbStructuredData } from "@/components/marketing/structured-data";
import { pageMetadata, SIGNUP_URL } from "@/lib/seo";

/*
 * The industries hub: links every published industry page so none is
 * an orphan, and explains why the set-up differs by trade.
 */

const PATH = "/local-rank-tracking-by-industry";
const IMAGES = "/marketing/google-maps-rank-tracker";

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: "Local Rank Tracking by Industry | GridBeacon",
  description:
    "How Google Maps rank tracking differs for plumbers, dentists, lawyers, roofers and other local businesses: the searches, grid sizes and rivals in each trade.",
  absoluteTitle: true,
  image: {
    url: `${IMAGES}/og-google-maps-rank-tracker.jpg`,
    width: 1200,
    height: 630,
    alt: "A GridBeacon geo-grid scan showing a business's Google Maps rankings",
  },
});

export default function IndustriesHubPage() {
  return (
    <SeoLandingPage>
      <BreadcrumbStructuredData name="Local Rank Tracking by Industry" path={PATH} />

      <Hero
        eyebrow="By industry"
        title="Google Maps Rank Tracking by Industry"
        lede={
          <>
            A dentist and a roofer both need to rank on Google Maps, but their
            customers search differently, travel different distances and
            choose from different competitors. Each guide below covers the
            searches worth tracking, the grid to use and who you&apos;re up
            against.
          </>
        }
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        primaryNote="No credit card required. New accounts get 500 free scan credits."
        secondary={{ label: "Choose Your Industry", href: "#industries" }}
        media={
          <Screenshot
            src={`${IMAGES}/geo-grid-scan-dallas-20260919.webp`}
            width={1600}
            height={780}
            eager
            sizes="(min-width: 1240px) 700px, (min-width: 1024px) 56vw, 100vw"
            alt="A GridBeacon geo-grid heatmap of Google Maps rankings across Dallas"
            caption="A real 5 × 5 GridBeacon scan for “garage door repair” in Dallas."
          />
        }
      />

      <Section id="industries" eyebrow="Industries" title="Choose Your Industry">
        <IndustryList />
      </Section>

      <Section
        id="differences"
        tone="tint"
        eyebrow="Why it differs"
        title="What Changes From One Trade to Another"
      >
        <Cards
          columns={4}
          items={[
            { title: "Where customers are served", body: "Storefronts rank from their address; service-area businesses from where Google places a hidden-address listing." },
            { title: "How far customers travel", body: "Patients stay within a mile or two; roofing customers are spread across a metro. The grid should match." },
            { title: "How they search", body: "By trade, by job, by symptom or by treatment. Each can have its own map pack." },
            { title: "Who competes", body: "Franchises, specialists, chains, ads and sometimes doubtful listings, in different mixes by trade." },
          ]}
        />
        <InlineCta>
          <TextLink href="/what-is-a-geo-grid">What is a geo-grid?</TextLink>
          {" · "}
          <TextLink href="/service-area-business-rank-tracking">Service-area businesses</TextLink>
          {" · "}
          <TextLink href="/local-rank-tracker-for-agencies">For agencies</TextLink>
        </InlineCta>
      </Section>

      <CtaBand
        title="Scan Your Own Business"
        body="Run your trade's main keywords across your area with 500 free credits."
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        note="No credit card required."
        secondary={{ label: "Free Rank Checker", href: "/google-maps-rank-checker" }}
      />
    </SeoLandingPage>
  );
}
