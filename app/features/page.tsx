import type { Metadata } from "next";
import Link from "next/link";

import { ArrowUpRight, Check } from "lucide-react";

import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { PLAN_FEATURE_GROUPS } from "@/components/marketing/plan-features";
import styles from "@/components/marketing/premium.module.css";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Geo-grid rank tracking, ranking heatmaps, competitor grids, scan history and credit-based scanning. See what GridBeacon measures across your service area.",
};

const outcomes = [
  "See which areas of your market rank strongly",
  "Identify the weaker parts of a service area",
  "Measure what changed after local SEO work",
  "Keep a historical record of every scan",
  "Manage businesses and keywords together",
];

export default function FeaturesPage() {
  return (
    <div className={styles.site}>
      <MarketingHeader />

      <main id="main-content">
        <section className={`${styles.container} ${styles.pageHero}`}>
          <p className={styles.eyebrow}>Features / 01</p>
          <h1>
            Local ranking data
            <br />
            <span>you can actually see.</span>
          </h1>
          <p className={styles.pageLede}>
            GridBeacon measures search visibility across an entire
            service area, tracks how it moves, and shows you the
            gaps a single ranking number hides.
          </p>
        </section>

        <section className={styles.bandDark}>
          <div className={styles.container}>
            <div className={styles.sectionTop}>
              <p className={styles.eyebrow}>What you get / 02</p>
              <span className={styles.sectionAside}>
                Every feature on every paid plan.
              </span>
            </div>

            <h2>
              Everything,
              <br />
              <span>on every plan.</span>
            </h2>

            <div className={styles.featureGroups}>
              {PLAN_FEATURE_GROUPS.map((group) => (
                <div className={styles.featureGroup} key={group.title}>
                  <h3>{group.title}</h3>
                  <p className={styles.featureGroupBlurb}>
                    {group.blurb}
                  </p>
                  <ul>
                    {group.features.map((feature) => (
                      <li key={feature}>
                        <Check size={17} aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.container} ${styles.section}`}>
          <div className={styles.splitPanel}>
            <div>
              <p className={styles.eyebrow}>
                Designed for local SEO / 03
              </p>
              <h2>
                More context than
                <br />
                <span className={styles.quiet}>
                  a single rank number.
                </span>
              </h2>
              <p className={styles.pageLede}>
                Visibility can change from one part of a city to
                the next. GridBeacon measures many points at once,
                so that variation is something you can see rather
                than something you have to guess at.
              </p>
            </div>

            <ul className={styles.checkList}>
              {outcomes.map((item) => (
                <li key={item}>
                  <Check size={18} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.container}>
            <p className={styles.eyebrow}>
              Start building your ranking history.
            </p>
            <div className={styles.finalInner}>
              <h2>
                Run your first
                <br />
                geographic scan.
              </h2>
              <Link href="/signup" className={styles.splitButton}>
                Start free
                <span>
                  <ArrowUpRight size={25} aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
