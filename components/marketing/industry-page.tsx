/*
 * One industry landing page, rendered from its entry in
 * lib/industries.ts.
 *
 * The layout is shared; the substance is not. Every section's copy --
 * how customers search, how the trade is set up on Google, who it
 * competes with, what usually goes wrong -- is written per trade, and a
 * trade can add a section of its own (seasons, practice areas, spam).
 * An industry is only published with a real scan of a business in
 * that trade: without one, its page 404s and it stays out of the
 * sitemap and the hub (see isPublished).
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
  TextLink,
  Toc,
} from "@/components/marketing/seo-landing";
import { ProductPageStructuredData } from "@/components/marketing/structured-data";
import { INDUSTRIES, isPublished, type Industry } from "@/lib/industries";
import { pageMetadata, SIGNUP_URL } from "@/lib/seo";

const MODEL_LABEL: Record<Industry["model"], string> = {
  sab: "Usually a service-area business",
  storefront: "Usually a storefront business",
  mixed: "Storefront or service-area",
};

export function IndustryPage({ industry }: { industry: Industry }) {
  if (!isPublished(industry)) notFound();
  const { scan } = industry;
  const related = industry.related
    .map((slug) => INDUSTRIES.find((other) => other.slug === slug))
    .filter((other): other is Industry => !!other && isPublished(other));

  return (
    <SeoLandingPage>
      <ProductPageStructuredData name={industry.breadcrumb} path={industry.path} faqs={industry.faqs} />

      <Hero
        eyebrow={industry.eyebrow}
        title={industry.h1}
        lede={industry.lede}
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        primaryNote="No credit card required. New accounts get 500 free scan credits."
        secondary={{ label: "See a Real Scan", href: "#example" }}
        facts={[MODEL_LABEL[industry.model], ...industry.facts]}
        media={
          <Screenshot
            src={scan.heatmap.src}
            width={scan.heatmap.width}
            height={scan.heatmap.height}
            eager
            sizes="(min-width: 1240px) 700px, (min-width: 1024px) 56vw, 100vw"
            alt={scan.heatmap.alt}
            caption={scan.caption}
          />
        }
      />

      <Section
        id="searches"
        eyebrow="How customers search"
        title={industry.searches.title}
        intro={<p>{industry.searches.intro}</p>}
      >
        <ComparisonTable
          label={`Searches to track for ${industry.plural}`}
          columns={["Search", "Why track it", "What it tells you"]}
          rows={industry.searches.rows}
          caption={industry.searches.caption}
        />
        <Toc
          items={[
            ["Setting up tracking", "setup"],
            ["A real scan", "example"],
            [industry.landscape.toc, "competition"],
            ...(industry.extra ? [[industry.extra.toc, industry.extra.id] as [string, string]] : []),
            ["Common ranking problems", "problems"],
            ["FAQ", "faq"],
          ]}
        />
      </Section>

      <Section
        id="setup"
        tone="tint"
        eyebrow="Setting up tracking"
        title={industry.setup.title}
        intro={<p>{industry.setup.intro}</p>}
      >
        <Cards columns={4} items={industry.setup.cards} />
        <Note>{industry.setup.budget}</Note>
      </Section>

      <Section
        id="example"
        eyebrow="A real scan"
        title={scan.title}
        intro={<p>{scan.intro}</p>}
      >
        <Split
          reverse
          media={
            <Screenshot
              src={scan.detail.src}
              width={scan.detail.width}
              height={scan.detail.height}
              alt={scan.detail.alt}
              caption={scan.detailCaption}
            />
          }
        >
          <Checklist items={scan.findings} />
          <p>{scan.takeaway}</p>
        </Split>
      </Section>

      <Section
        id="competition"
        tone="tint"
        eyebrow={industry.landscape.eyebrow}
        title={industry.landscape.title}
        intro={<p>{industry.landscape.intro}</p>}
      >
        <Cards items={industry.landscape.cards} />
      </Section>

      {industry.extra && (
        <Section
          id={industry.extra.id}
          eyebrow={industry.extra.eyebrow}
          title={industry.extra.title}
          intro={<p>{industry.extra.intro}</p>}
        >
          <Cards columns={industry.extra.cards.length === 4 ? 2 : 3} items={industry.extra.cards} />
        </Section>
      )}

      <Section
        id="problems"
        tone={industry.extra ? "tint" : "white"}
        eyebrow="Diagnosis"
        title={`Common Google Maps Ranking Problems for ${industry.titleNoun}`}
        intro={
          <p>
            What a geo-grid usually shows when something is wrong, and where
            to look first. These are starting points, not guarantees.
          </p>
        }
      >
        <ComparisonTable
          label={`Ranking problems ${industry.plural} commonly see`}
          columns={["What the grid shows", "Common cause", "Where to look first"]}
          rows={industry.problems}
          caption={
            <>
              Google ranks local results on relevance, distance and
              prominence. <TextLink href="/local-seo-competitor-analysis">How to find who beats you at each point</TextLink>.
            </>
          }
        />
      </Section>

      <Section id="faq" tone={industry.extra ? "white" : "tint"} eyebrow="FAQ" title={`Rank Tracking for ${industry.titleNoun}: Questions`}>
        <Faq items={industry.faqs.map(([question, answer]) => [question, <p key="a">{answer}</p>])} />
        <InlineCta>
          {related.length > 0 && (
            <>
              Also for:{" "}
              {related.map((other, index) => (
                <span key={other.slug}>
                  {index > 0 && " · "}
                  <TextLink href={other.path}>{other.titleNoun}</TextLink>
                </span>
              ))}
              {" · "}
            </>
          )}
          <TextLink href="/local-rank-tracking-by-industry">All industries</TextLink>
          {" · "}
          <TextLink href={industry.model === "storefront" ? "/what-is-a-geo-grid" : "/service-area-business-rank-tracking"}>
            {industry.model === "storefront" ? "What is a geo-grid?" : "Service-area businesses"}
          </TextLink>
        </InlineCta>
      </Section>

      <CtaBand
        title={industry.cta.title}
        body={industry.cta.body}
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        note="No credit card required."
        secondary={{ label: "For Agencies", href: "/local-rank-tracker-for-agencies" }}
      />
    </SeoLandingPage>
  );
}

export function IndustryList() {
  return (
    <Cards
      items={INDUSTRIES.filter(isPublished).map((industry) => ({
        tag: MODEL_LABEL[industry.model],
        title: industry.titleNoun,
        body: (
          <>
            {industry.summary}{" "}
            <TextLink href={industry.path}>Rank tracking for {industry.plural}</TextLink>
          </>
        ),
      }))}
    />
  );
}

export function industryMetadata(industry: Industry): Metadata {
  const image = industry.scan?.heatmap;
  return pageMetadata({
    path: industry.path,
    title: industry.title,
    description: industry.description,
    absoluteTitle: true,
    image: image
      ? { url: image.src, width: image.width, height: image.height, alt: image.alt }
      : {
          url: "/marketing/google-maps-rank-tracker/og-google-maps-rank-tracker.jpg",
          width: 1200,
          height: 630,
          alt: "A GridBeacon geo-grid scan showing a business's Google Maps rankings",
        },
  });
}
