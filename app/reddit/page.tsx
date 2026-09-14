import type { Metadata } from "next";
import { getImageProps } from "next/image";
import { Check, Crosshair, Grid3x3, Hash, MapPin, Palette, Users } from "lucide-react";

import { GridComparison } from "@/components/marketing/reddit/grid-comparison";
import { RedditFooter, RedditHeader } from "@/components/marketing/reddit/reddit-chrome";
import { RedditTracking } from "@/components/marketing/reddit/reddit-tracking";
import { TrackedCta } from "@/components/marketing/reddit/tracked-cta";
import styles from "@/components/marketing/reddit/reddit.module.css";
import {
  Checklist,
  Compare,
  LandingShell,
  Note,
  Screenshot,
  Section,
  Split,
  Steps,
} from "@/components/marketing/seo-landing";
import { pageMetadata, SIGNUP_URL } from "@/lib/seo";

/*
 * /reddit -- landing page for paid Reddit traffic.
 *
 * Not for search: noindex, follow; not in the sitemap or any site
 * navigation. One goal, a free account, with every signup button
 * carrying the ad's campaign parameters (TrackedCta).
 *
 * The hero is a real GridBeacon scan with the business name and
 * address blurred. The three-grid comparison is drawn with example
 * data and labelled as such. Plan-gated features are marked.
 */

const PATH = "/reddit";
const IMAGES = "/marketing/reddit";

export const metadata: Metadata = {
  ...pageMetadata({
    path: PATH,
    title: "See Where You Rank on Google Maps, Point by Point | GridBeacon",
    description:
      "See your Google Maps ranking from dozens or hundreds of points across your area. Find weak spots, compare competitors and measure local SEO work.",
    absoluteTitle: true,
    image: {
      url: "/marketing/google-maps-rank-tracker/og-google-maps-rank-tracker.jpg",
      width: 1200,
      height: 630,
      alt: "A GridBeacon geo-grid scan showing a business's Google Maps rankings at 25 points",
    },
  }),
  // Paid traffic only: keep it out of search results, but let
  // crawlers follow its links to the rest of the site.
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
};

const HERO_ALT =
  "GridBeacon heatmap of a real 5 by 5 Google Maps scan for “garage door repair” in Dallas. Each dot shows the business's rank at that point; the panel shows 84% visibility, an average rank of 5.7 and top-3 positions at 44% of points. The business name is blurred.";

/* Art direction: the full dashboard on wider screens; on phones the
   grid alone, so every rank number stays legible (the panel's figures
   follow as text). Both are crops of the same real capture, and
   eager-loaded because this is the LCP image. */
function HeroScreenshot() {
  const common = { alt: HERO_ALT, sizes: "(min-width: 1160px) 1112px, 100vw", quality: 80 };
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: `${IMAGES}/heatmap-hero.webp`, width: 1600, height: 780 });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, src: `${IMAGES}/heatmap-hero-grid.webp`, width: 661, height: 622 });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} width={1600} height={780} />
      <source srcSet={mobile} width={661} height={622} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is in rest */}
      <img {...rest} className={styles.frameImage} loading="eager" fetchPriority="high" />
    </picture>
  );
}

const FEATURE_CARDS = [
  {
    icon: Grid3x3,
    title: "Geo-Grid Rank Tracking",
    body: "See your Google Maps position across dozens or hundreds of geographic points instead of relying on one ranking.",
  },
  {
    icon: Users,
    title: "Competitor Grid Analysis",
    body: "Compare your visibility against competing businesses across the same geographic area.",
  },
  {
    icon: Crosshair,
    title: "Gap Grid",
    body: "Quickly identify locations where competitors rank but your business does not.",
  },
];

const FEATURE_LIST: [string, string?][] = [
  ["Geo-Grid Rank Tracking"],
  ["Google Maps Heatmaps"],
  ["Competitor Grids"],
  ["Gap Grid Analysis"],
  ["Rank History"],
  ["Scheduled Scans", "Paid plans"],
  ["Scan Reports (PDF)"],
  ["AI Reports", "Paid plans"],
  ["Google Business Profile Activity Tracking", "Paid plans"],
  ["Local SEO Reporting"],
];

export default function RedditLandingPage() {
  return (
    <LandingShell header={<RedditHeader />} footer={<RedditFooter />}>
      <RedditTracking />

      <section className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden="true" />
            GOOGLE MAPS RANK TRACKING
          </p>
          <h1 className={styles.heroTitle}>
            <span>You Rank #2 on Google Maps.</span>
            <span>
              But <em className={styles.highlight} style={{ fontStyle: "normal" }}>Only From Where You Searched.</em>
            </span>
          </h1>
          <p className={styles.heroLede}>
            Google Maps rankings can change dramatically just a few miles away.
            GridBeacon shows exactly where your business ranks across an entire
            area, so you can find weak spots, compare competitors, and measure
            whether your local SEO is actually working.
          </p>
          <div className={styles.ctaRow}>
            <TrackedCta href={SIGNUP_URL} event="reddit_primary_cta_click" location="hero" signup size="large">
              See My Local Rankings
            </TrackedCta>
            <TrackedCta href="#how-it-works" event="reddit_secondary_cta_click" location="hero" variant="secondary" size="large">
              See How It Works
            </TrackedCta>
          </div>
          <p className={styles.heroNote}>
            Create a free account • No complicated setup • 500 free scan credits
          </p>
        </div>

        <div className={styles.shotWrap}>
          <div className={styles.frame}>
            <div className={styles.frameBar} aria-hidden="true">
              <span className={styles.frameDot} />
              <span className={styles.frameDot} />
              <span className={styles.frameDot} />
              <span className={styles.frameLabel}>GridBeacon · Heatmap · “garage door repair” · 5 × 5 grid · 5 mi</span>
            </div>
            <HeroScreenshot />
          </div>
          {/* Phones get the grid alone, so the panel's figures are
              repeated here as text, from the same scan. */}
          <p className={styles.mobileStats}>
            From this scan: <strong>84%</strong> visibility · average rank{" "}
            <strong>5.7</strong> · top 3 at <strong>44%</strong> of points
          </p>
          <ul className={styles.legendRow} aria-label="Heatmap colours">
            <li><span className={`${styles.swatch} ${styles.swatchTop3}`} aria-hidden="true" /> Rank 1–3</li>
            <li><span className={`${styles.swatch} ${styles.swatchTop10}`} aria-hidden="true" /> 4–10</li>
            <li><span className={`${styles.swatch} ${styles.swatchTop20}`} aria-hidden="true" /> 11–20</li>
            <li><span className={`${styles.swatch} ${styles.swatchLow}`} aria-hidden="true" /> 21+</li>
            <li><span className={`${styles.swatch} ${styles.swatchNone}`} aria-hidden="true" /> Not ranked</li>
          </ul>
          <ul className={styles.explain}>
            <li>
              <span className={styles.explainIcon} aria-hidden="true"><MapPin size={16} /></span>
              <span><strong>Each dot is one search location</strong>A separate Google Maps search, run from that exact point.</span>
            </li>
            <li>
              <span className={styles.explainIcon} aria-hidden="true"><Hash size={16} /></span>
              <span><strong>The number is your rank there</strong>Where the business appeared in the results at that spot.</span>
            </li>
            <li>
              <span className={styles.explainIcon} aria-hidden="true"><Palette size={16} /></span>
              <span><strong>The colour is the rank band</strong>Green is the map pack; red is where searchers rarely see you.</span>
            </li>
          </ul>
          <p className={styles.shotCaption}>
            A real GridBeacon scan: “garage door repair” in Dallas, 5 × 5 grid,
            5-mile radius. Business details blurred.
          </p>
        </div>
      </section>

      <Section
        id="one-number"
        tone="tint"
        title="A Single Ranking Number Doesn't Tell the Whole Story"
        intro={
          <>
            <p>
              Local rankings are heavily influenced by location. Checking Google
              from your office can make your visibility look much stronger than
              it really is.
            </p>
            <p>GridBeacon measures rankings from many points across your target area.</p>
          </>
        }
      >
        <div className={styles.contrast}>
          <div className={styles.contrastCard}>
            <span className={styles.contrastLabel}><MapPin size={16} aria-hidden="true" /> Search from Location A</span>
            <p className={styles.contrastRankLabel}>Google Maps rank</p>
            <p className={`${styles.contrastRank} ${styles.rankGood}`}>#2</p>
          </div>
          <span className={styles.contrastVs} aria-hidden="true">VS</span>
          <div className={styles.contrastCard}>
            <span className={styles.contrastLabel}><MapPin size={16} aria-hidden="true" /> Search a few miles away</span>
            <p className={styles.contrastRankLabel}>Google Maps rank</p>
            <p className={`${styles.contrastRank} ${styles.rankBad}`}>#17</p>
          </div>
        </div>
        <span className={styles.exampleTag}>Example: same business, same keyword, two search locations.</span>
      </Section>

      <Section id="winning" title="See Exactly Where You're Winning — And Where You're Invisible">
        <div className={styles.featureCards}>
          {FEATURE_CARDS.map(({ icon: Icon, title, body }) => (
            <div className={styles.featureCard} key={title}>
              <span className={styles.featureIcon} aria-hidden="true"><Icon size={22} /></span>
              <h3 className={styles.featureTitle}>{title}</h3>
              <p className={styles.featureBody}>{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="features" tone="tint" title="Built for Local SEO Decisions, Not Just Pretty Heatmaps">
        <ul className={styles.featureList}>
          {FEATURE_LIST.map(([name, tag]) => (
            <li key={name}>
              <Check size={18} className={styles.featureCheck} aria-hidden="true" />
              {name}
              {tag && <span className={styles.planTag}>{tag}</span>}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="how-it-works" title="Turn Ranking Data Into Action">
        <Steps
          items={[
            { title: "Run a Scan", body: "Choose your business, keyword, grid size and search radius." },
            { title: "Find Weak Areas", body: "See where your rankings drop and where competitors are stronger." },
            {
              title: "Track Improvement",
              body: "Make local SEO changes and compare future scans to see whether visibility actually improved.",
            },
          ]}
        />
      </Section>

      <Section
        id="competitors"
        tone="tint"
        title="Know Who Is Beating You — And Where"
        intro={
          <>
            <p>
              A competitor may dominate one side of the city while being almost
              invisible somewhere else.
            </p>
            <p>
              GridBeacon lets you compare local ranking coverage across the same
              map so you can see where the real opportunities are.
            </p>
          </>
        }
      >
        <GridComparison />
        <ul className={styles.pointNotes}>
          <li>
            Every scan records the businesses Google Maps showed at each point,
            so competitor grids come from the scan you already ran, with no
            extra credits.
          </li>
          <li>
            The Competitors tab lists the businesses seen across the scan and how
            many points each one beats you at.
          </li>
        </ul>
      </Section>

      <Section id="ai-reports" title="Turn Hundreds of Ranking Points Into a Clear Report">
        <Split
          media={
            <Screenshot
              src="/marketing/google-maps-rank-tracker/ai-report-geographic.webp"
              width={837}
              height={1074}
              sizes="(min-width: 1024px) 560px, 100vw"
              alt="A page from a GridBeacon AI Ranking Intelligence Report describing the strongest and weakest areas of a 21 by 21 scan"
              caption="A page from a real AI Ranking Intelligence Report."
            />
          }
        >
          <p>GridBeacon AI analyses your scan data and summarises:</p>
          <Checklist
            items={[
              "Ranking strengths",
              "Weak geographic areas",
              "Competitor threats",
              "Visibility opportunities",
              "Recommended next actions",
            ]}
          />
          <Note>
            AI reports explain what your scan shows; they don&apos;t change
            rankings by themselves. Available on paid plans, 100 credits per
            report.
          </Note>
          <div className={styles.ctaRow} style={{ justifyContent: "flex-start" }}>
            <TrackedCta href={SIGNUP_URL} event="reddit_primary_cta_click" location="ai_reports" signup>
              Generate Better Local SEO Insights
            </TrackedCta>
          </div>
        </Split>
      </Section>

      <Section
        id="agencies"
        tone="tint"
        title="Made for Agencies That Need to Show Clients What Is Actually Happening"
      >
        <Split
          reverse
          media={
            <Screenshot
              src="/marketing/google-maps-rank-tracker/scan-history-table.webp"
              width={1600}
              height={749}
              sizes="(min-width: 1024px) 640px, 100vw"
              alt="GridBeacon scan history showing each scan's best rank, coverage and ranking movement over 7, 15, 30 and 60 days"
              caption="Scan history from a real GridBeacon workspace."
            />
          }
        >
          <Checklist
            items={[
              "Visual reports",
              "Downloadable scan reports",
              "Ranking history",
              "Competitor comparisons",
              "Scheduled scans (paid plans)",
              "Easy client explanations",
            ]}
          />
          <p className={styles.pullQuote}>
            Instead of telling a client their average ranking changed from 8.2
            to 7.6, show them exactly where their visibility expanded.
          </p>
        </Split>
      </Section>

      <Section id="comparison" title="One Ranking Check vs. A Real Local Visibility Map">
        <Compare
          before={{
            label: "Old way",
            title: "One ranking check",
            items: [
              "Search keyword manually",
              "See one ranking",
              "Location-biased result",
              "Hard to measure improvement",
              "No geographic context",
            ],
          }}
          after={{
            label: "GridBeacon",
            title: "A local visibility map",
            items: [
              "Scan an entire area",
              "See rankings point-by-point",
              "Measure visibility coverage",
              "Track changes over time",
              "Compare competitors geographically",
            ],
          }}
        />
      </Section>

      <section className={styles.finalCta} aria-labelledby="final-cta-title">
        <div className={styles.container}>
          <h2 id="final-cta-title" className={styles.finalTitle}>
            Find Out Where You Really Rank on Google Maps
          </h2>
          <p className={styles.finalBody}>
            Stop guessing from a single search. See your local visibility across
            the entire market.
          </p>
          <div className={styles.ctaRow}>
            <TrackedCta href={SIGNUP_URL} event="reddit_primary_cta_click" location="final" signup size="large">
              Start Free
            </TrackedCta>
          </div>
          <p className={styles.finalNote}>Create an account and run your first GridBeacon scan.</p>
        </div>
      </section>
    </LandingShell>
  );
}
