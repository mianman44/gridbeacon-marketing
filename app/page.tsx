import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BellRing, CalendarClock, Check, Coins, FileText, Grid3x3, History, MapPinned, ScanSearch, Sparkles, Star, Users } from "lucide-react";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { ScreenshotGallery } from "@/components/marketing/screenshot-gallery";
import { HomeExplainer } from "@/components/marketing/home-explainer";
import { RankHistoryShowcase } from "@/components/marketing/rank-history-showcase";
import { Testimonials } from "@/components/marketing/testimonials";
import { StructuredData, HOME_FAQS } from "@/components/marketing/structured-data";
import styles from "@/components/marketing/home.module.css";

/* Three claims a reader can check, rather than three adjectives.
   Each is a fact of the product: the grid sizes the scanner
   accepts, the credit arithmetic, and the fact that scans are
   kept rather than overwritten. */
const assurances = [
  [Grid3x3, "Grids from 3 × 3 to 21 × 21", "Up to 441 points in a single scan"],
  [Coins, "One credit per grid point", "No subscriptions to features you never use"],
  [History, "Every scan kept", "Compare today against any scan before it"],
] as const;

/* Taken from PLAN_FEATURE_GROUPS, which is itself checked against the
   backend -- the grid ceiling, the radius and the review depth all
   come from constants rather than from a copywriter. The three the
   assurance strip already makes (grid sizes, credits, scans kept) are
   deliberately not repeated here. */
const platformFeatures = [
  [MapPinned, "Interactive rank heatmaps", "Your position at every point, in one view"],
  [Users, "Competitor grids", "Pulled from the scan you already ran"],
  [FileText, "AI Ranking Intelligence Report", "A client-ready PDF of the scan"],
  [CalendarClock, "Automated scheduled scans", "Run them on a schedule, not by hand"],
  [BellRing, "Email scan alerts", "Told when a scan finishes"],
  [Star, "Review Intelligence", "Up to 500 reviews per business"],
  [ScanSearch, "Local keyword discovery", "Find the terms worth tracking nearby"],
  [Sparkles, "AI Action Plan", "What to do about what the scan found"],
] as const;

const steps = [
  ["01", "Make it your territory.", "Add your business, choose a keyword and set the area you want to understand."],
  ["02", "See the whole picture.", "Run a grid scan to see your ranking at each point across your service area."],
  ["03", "Know your next move.", "Compare competitors, review your history and share your findings with a clear report."],
];

export default function HomePage() {
  return (
    <div className={styles.site}>
      <MarketingHeader />
      <StructuredData />
      <main id="main-content">

        <section className={styles.hero} aria-labelledby="hero-heading">
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={`${styles.container} ${styles.heroInner}`}>
            <div>
              <p className={styles.badge}>Built for local businesses &amp; SEO agencies</p>

              {/* The payoff, not the category. Nobody wakes up wanting
                  local advantage; they want the phone to ring, and the
                  ranking is how that happens. */}
              <h1 id="hero-heading">Your Google Maps rank, street by street.</h1>

              <p className={styles.heroDescription}>
                Google shows different results depending on where the searcher
                is standing. GridBeacon scans a grid of points across your
                service area so you can see every one of them.
              </p>

              <div className={styles.heroActions}>
                <Link href="/signup" className={styles.primaryButton}>
                  Start free <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <a href="#how-it-works" className={styles.secondaryButton}>See how it works</a>
              </div>

              {/* Every claim here is checked against the code: 500 credits
                  at signup, one credit per grid point, and no card anywhere
                  in the signup flow. */}
              <ul className={styles.heroChecks}>
                <li><Check size={15} aria-hidden="true" /> 500 free credits</li>
                <li><Check size={15} aria-hidden="true" /> No credit card</li>
                <li><Check size={15} aria-hidden="true" /> One credit per grid point</li>
              </ul>
            </div>

            {/* The real product, not an illustration of it. The asset
                arrives already cropped and redacted -- no sidebar, no
                account chip, customer name and address blurred -- so
                nothing is trimmed here. The dimensions must match the
                file: they set the ratio the browser reserves, and a
                wrong pair squashes the image rather than failing. */}
            <div className={styles.heroPanel}>
              <Image
                src="/screenshots/heatmap-hero-20260908.png"
                alt="A GridBeacon heatmap of air duct cleaning across San Antonio: a 21 by 21 grid over a 10 mile radius, ranking first near the business and falling into the twenties at the edges of the city. Visibility 54 percent, average rank 10.9, top three at 13 percent."
                width={1536}
                height={1024}
                priority
                sizes="(min-width: 1080px) 760px, 92vw"
              />
            </div>
          </div>
        </section>

        <section className={styles.assurances} aria-label="What every plan includes">
          <div className={`${styles.container} ${styles.assuranceGrid}`}>
            {assurances.map(([Icon, title, detail]) => (
              <div key={title} className={styles.assurance}>
                <Icon size={20} aria-hidden="true" />
                <div>
                  <p>{title}</p>
                  <span>{detail}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.productBand} id="product" aria-labelledby="product-heading">
          <div className={styles.container}>
            <div className={styles.productIntro}>
              <div>
                <p className={styles.eyebrow}>THE GRIDBEACON PLATFORM</p>
                <h2 id="product-heading" className={styles.sectionHeading}>
                  Your local advantage.<br /><span className={styles.productAccent}>In full view.</span>
                </h2>
              </div>
              <div className={styles.productIntroAside}>
                <p>Find your strongest streets. Understand your competition. Show clients exactly where they stand.</p>
                <Link href="/signup" className={styles.productLink}>Explore your first grid <ArrowUpRight size={18} aria-hidden="true" /></Link>
              </div>
            </div>
            <ScreenshotGallery />
            <ul className={styles.featureGrid}>
              {platformFeatures.map(([Icon, name, detail]) => (
                <li key={name}>
                  <Icon size={19} aria-hidden="true" />
                  <div>
                    <p>{name}</p>
                    <span>{detail}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <HomeExplainer />
        <RankHistoryShowcase />

        <section className={styles.band}>
          <div className={`${styles.container} ${styles.split}`}>
            <div>
              <p className={styles.eyebrow}>Precision without the waste</p>
              <h2 className={styles.sectionHeading}>Your territory.<br />Your terms.</h2>
              <p className={styles.heroDescription}>
                Scan the ground that matters to your business. Preview your
                grid, remove the points you don&rsquo;t need, and see the cost
                before you run it.
              </p>
              <Link className={styles.textLink} href="/features">
                Explore all features <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <div className={styles.creditCard}>
              <div className={styles.creditEquation}>
                <span>1</span>
                <p>grid point<span>= one scan credit</span></p>
              </div>
              <ul className={styles.creditList}>
                <li><Check size={16} aria-hidden="true" /> Flexible grids from 3 × 3 to 21 × 21</li>
                <li><Check size={16} aria-hidden="true" /> Remove points outside your service area</li>
                <li><Check size={16} aria-hidden="true" /> Review your credit cost before scanning</li>
              </ul>
              <Link href="/pricing">
                Find your plan <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className={`${styles.container} ${styles.section}`} id="how-it-works">
          <div className={styles.sectionTop}>
            <p className={styles.eyebrow}>From search to insight</p>
            <Link href="/how-it-works" className={styles.textLink}>
              How it works <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <h2 className={styles.sectionHeading}>
            Big-picture clarity.<br /><span className={styles.quiet}>Point-by-point detail.</span>
          </h2>
          <div className={styles.steps}>
            {steps.map(([number, title, description]) => (
              <div className={styles.step} key={number}>
                <span className={styles.stepNumber}>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.band}>
          <div className={`${styles.container} ${styles.split}`}>
            <div>
              <p className={styles.eyebrow}>Built around the way you work</p>
              <h2 className={styles.sectionHeading}>
                Local ambition.<br /><span className={styles.quiet}>A clearer direction.</span>
              </h2>
            </div>
            <div className={styles.audienceArticles}>
              <article>
                <h3>For agencies.</h3>
                <p>
                  Bring your clients&rsquo; local rankings into focus. Compare
                  the competition and deliver reports that make performance
                  easy to understand.
                </p>
              </article>
              <article>
                <h3>For your business.</h3>
                <p>
                  See where nearby customers can find you, where competitors
                  are ahead, and how your visibility changes over time.
                </p>
              </article>
            </div>
          </div>
        </section>

        <Testimonials />

        <section className={styles.band} id="faq" aria-labelledby="faq-heading">
          <div className={styles.container}>
            <div className={styles.sectionTop}>
              <p className={styles.eyebrow}>Before you start</p>
              <Link href="/pricing" className={styles.textLink}>
                See pricing <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <h2 id="faq-heading" className={styles.sectionHeading}>
              Questions,<br /><span className={styles.quiet}>answered plainly.</span>
            </h2>
            {/* Native details/summary rather than a scripted
                accordion: it opens without JavaScript, it is
                keyboard-operable for free, and a search engine can
                read every answer whether or not it is expanded. */}
            <div className={styles.faqList}>
              {HOME_FAQS.map(([question, answer]) => (
                <details key={question} className={styles.faqItem}>
                  <summary>{question}<span aria-hidden="true" /></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={`${styles.container} ${styles.finalInner}`}>
            <div>
              <p className={styles.eyebrow}>Your next move starts here</p>
              <h2>Get a better view.<br />Make a better move.</h2>
              <p className={styles.finalNote}>500 free scan credits &middot; No credit card required</p>
            </div>
            <Link href="/signup" className={styles.finalButton}>
              Start tracking <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>

      </main>
      <MarketingFooter />
    </div>
  );
}
