import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Crosshair,
  Eye,
  FolderKanban,
  History,
  Layers,
  Mail,
  Target,
  Users,
} from "lucide-react";

import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import styles from "@/components/marketing/company.module.css";
import { BreadcrumbStructuredData } from "@/components/marketing/structured-data";
import { pageMetadata, SIGNUP_URL } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/about",
  title: "About",
  description:
    "GridBeacon is a local search visibility platform for monitoring Google Business Profile rankings across geographic grids. Operated by Hustle 24/7.",
});

const workflow = [
  {
    icon: FolderKanban,
    title: "Organise",
    text: "Keep each business and the local keywords that matter to it in one workspace, whether that is one shop or a hundred client accounts.",
  },
  {
    icon: Crosshair,
    title: "Scan",
    text: "Check the Google Maps ranking from every point of a grid laid over the service area, not from one server location.",
  },
  {
    icon: Eye,
    title: "Read",
    text: "See the rank at each point on a heatmap, then open any point to see the businesses ranking around you there.",
  },
  {
    icon: History,
    title: "Track",
    text: "Keep every scan, schedule the next one and follow how visibility moves over time.",
  },
] as const;

const principles = [
  {
    icon: Target,
    title: "Geographic insight",
    text: "Ranking performance changes across a local market. Measuring one point hides that; measuring many shows it.",
  },
  {
    icon: Layers,
    title: "Focused tracking",
    text: "Monitor the businesses and the local search keywords that matter to each project, and nothing else.",
  },
  {
    icon: Users,
    title: "Built for both",
    text: "Whether you run one business or a hundred client accounts, the work is organised the same way.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <link rel="stylesheet" href="/stitch-fonts.css" />
      <BreadcrumbStructuredData name="About" path="/about" />
      <MarketingHeader />

      <main id="main-content">
        <section className={styles.hero}>
          <div className={styles.glowA} aria-hidden="true" />
          <div className={styles.glowB} aria-hidden="true" />
          <div className={styles.container}>
            <span className={styles.pill}>
              <span className={styles.pillDot} aria-hidden="true" />
              About GridBeacon
            </span>
            <h1 className={styles.heroTitle}>
              Local search, <span>made legible.</span>
            </h1>
            <p className={styles.lede}>
              GridBeacon is a platform for monitoring Google Business Profile
              visibility across geographic grids, built for the people who
              have to explain local rankings to somebody else.
            </p>
            <div className={styles.actions}>
              <a href={SIGNUP_URL} className={styles.btnPrimary}>
                Start free
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <Link href="/how-it-works" className={styles.btnSecondary}>
                See how it works
              </Link>
            </div>

            <figure className={styles.frame}>
              <div className={styles.frameBar} aria-hidden="true">
                <i />
                <i />
                <i />
                <span>app.gridbeacon.com/heatmap-explorer</span>
              </div>
              <Image
                src="/stitch/asset-1.webp"
                alt="GridBeacon heatmap showing the Google Maps rank at every point of a grid, with the business card and competitor list open"
                width={1600}
                height={900}
                sizes="(min-width: 1080px) 1016px, 94vw"
                priority
              />
            </figure>
          </div>
        </section>

        <section className={styles.sectionTinted}>
          <div className={`${styles.container} ${styles.split}`}>
            <div>
              <p className={styles.eyebrow}>Why GridBeacon</p>
              <h2 className={styles.h2}>
                A clearer view <span>of local rankings.</span>
              </h2>
            </div>
            <div className={styles.prose}>
              <p>
                A local ranking depends on where the search happens.
                GridBeacon measures positions across{" "}
                <strong>many geographic points</strong>, so a business or an
                agency can see how visibility changes across a service area
                rather than inferring it.
              </p>
              <p>
                Organise businesses and keywords, run geographic scans, read
                the heatmap and keep the history.{" "}
                <strong>That is the whole product.</strong>
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>What it does</p>
              <h2 className={styles.h2}>Four steps, one clear picture.</h2>
            </div>
            <ol className={styles.grid4} style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {workflow.map(({ icon: Icon, title, text }, index) => (
                <li className={`${styles.card} ${styles.cardHover}`} key={title}>
                  <div className={styles.cardTop}>
                    <span className={styles.icon}>
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <span className={styles.step}>0{index + 1}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.sectionTinted}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>What we optimise for</p>
              <h2 className={styles.h2}>
                Fewer numbers. <span>More understanding.</span>
              </h2>
            </div>
            <div className={styles.grid3}>
              {principles.map(({ icon: Icon, title, text }) => (
                <div className={styles.card} key={title}>
                  <div className={styles.cardTop}>
                    <span className={`${styles.icon} ${styles.iconGreen}`}>
                      <Icon size={22} aria-hidden="true" />
                    </span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={`${styles.container} ${styles.split}`}>
            <div>
              <p className={styles.eyebrow}>Company information</p>
              <h2 className={styles.h2}>Hustle 24/7.</h2>
              <div className={styles.prose} style={{ marginTop: 16 }}>
                <p>GridBeacon is a software product operated by Hustle 24/7.</p>
              </div>
            </div>

            <dl className={styles.info}>
              <div className={styles.infoRow}>
                <span className={styles.icon}>
                  <Building2 size={20} aria-hidden="true" />
                </span>
                <div>
                  <dt>Business</dt>
                  <dd>Hustle 24/7</dd>
                </div>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.icon}>
                  <Mail size={20} aria-hidden="true" />
                </span>
                <div>
                  <dt>Support</dt>
                  <dd>
                    <a href="mailto:founder@gridbeaconhq.com">
                      founder@gridbeaconhq.com
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </section>

        <section className={styles.section} style={{ paddingTop: 0 }}>
          <div className={styles.container}>
            <div className={styles.cta}>
              <span className={styles.ctaBadge}>Ready to map your rankings?</span>
              <h2>See where you actually stand.</h2>
              <p>
                Run your first geo-grid scan and see exactly where nearby
                customers can find you, and where competitors hold ground.
              </p>
              <div className={styles.actions}>
                <a href={SIGNUP_URL} className={styles.btnPrimary}>
                  Start tracking free
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
                <Link href="/pricing" className={styles.btnGhost}>
                  See credit plans
                </Link>
              </div>
              <div className={styles.ctaChecks}>
                <span>
                  <CheckCircle2 size={15} aria-hidden="true" /> 500 free credits
                </span>
                <span>
                  <CheckCircle2 size={15} aria-hidden="true" /> No credit card
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
