import type { Metadata } from "next";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import styles from "@/components/marketing/premium.module.css";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How GridBeacon runs a geo-grid scan: create a project, add keywords, choose a grid and radius, scan, and read the heatmap. One credit per grid point.",
};

const steps = [
  ["01", "Create a project", "Set up a project for the business or location you want to track, and add its details."],
  ["02", "Add your keywords", "Choose the local search terms customers actually use when looking for what you sell."],
  ["03", "Choose the scan area", "Pick a grid size and radius. GridBeacon lays geographic points around the business."],
  ["04", "Run the scan", "Each point is checked against Google Maps and the position recorded where you appear."],
  ["05", "Read the heatmap", "Positions are drawn across the grid, so stronger and weaker areas are obvious at a glance."],
  ["06", "Track the movement", "Scan again over time and compare against history, best rank and visibility."],
] as const;

/* Costs are the grid squared. Stated as examples rather than a
   formula because "9 × 9 is 81 credits" is a thing a reader can
   check against their own wallet. */
const credits = [
  ["3 × 3", "9 grid points", "9 credits"],
  ["5 × 5", "25 grid points", "25 credits"],
  ["9 × 9", "81 grid points", "81 credits"],
] as const;

export default function HowItWorksPage() {
  return (
    <div className={styles.site}>
      <MarketingHeader />

      <main id="main-content">
        <section className={`${styles.container} ${styles.pageHero}`}>
          <p className={styles.eyebrow}>How it works / 01</p>
          <h1>
            Turn local searches
            <br />
            <span>into a visibility map.</span>
          </h1>
          <p className={styles.pageLede}>
            GridBeacon checks your ranking at many locations around
            your business and arranges the answers into a grid you
            can read in a second.
          </p>
        </section>

        <section className={styles.band}>
          <div className={styles.container}>
            <div className={styles.sectionTop}>
              <p className={styles.eyebrow}>
                Six steps, start to finish / 02
              </p>
              <Link href="/features" className={styles.textLink}>
                See all features{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>

            <div className={styles.cards}>
              {steps.map(([index, title, description]) => (
                <div className={styles.card} key={index}>
                  <span className={styles.cardIndex}>{index}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.container} ${styles.section}`}>
          <p className={styles.eyebrow}>
            What a scan costs / 03
          </p>
          <h2>
            One point.
            <br />
            <span className={styles.quiet}>One credit.</span>
          </h2>

          <div className={styles.creditTable}>
            {credits.map(([grid, points, cost]) => (
              <div className={styles.creditCell} key={grid}>
                <strong>{grid}</strong>
                <span>
                  {points} &middot; {cost}
                </span>
              </div>
            ))}
          </div>

          <p className={styles.note}>
            Credits are settled against the points that actually
            processed, so a scan that fails or is cancelled part
            way through does not charge you for work that never
            happened. You can also remove points from the grid
            before scanning and pay for the smaller area.
          </p>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.container}>
            <p className={styles.eyebrow}>
              Ready to see your local visibility?
            </p>
            <div className={styles.finalInner}>
              <h2>
                Your first scan
                <br />
                is on us.
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
