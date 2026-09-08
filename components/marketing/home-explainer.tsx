import Link from "next/link";
import { GridWalkthrough } from "./grid-walkthrough";
import { ArrowUpRight } from "lucide-react";

import styles from "@/components/marketing/home.module.css";

/*
 * The explanatory half of the home page.
 *
 * A landing page made of display headlines reads well and ranks
 * badly: there is nothing on it for someone who does not already
 * know what a geo-grid is. These two sections are the part that
 * explains the category before selling the product, which is both
 * what a first-time visitor needs and what a search engine has to
 * work with.
 *
 * Every claim about how local results behave is limited to what
 * Google publishes about its own ranking -- relevance, distance
 * and prominence -- plus what is directly observable. Nothing here
 * speculates about the algorithm.
 */

const bands = [
  ["1 – 3", "The top three. On a phone, this is what a searcher sees without scrolling.", "#00b341"],
  ["4 – 10", "On the first page of results, but below the fold for most people.", "#2563eb"],
  ["11 – 20", "Findable, but only by someone who is already looking for you.", "#f59e0b"],
  ["21+", "Effectively invisible for that search, at that location.", "#dc2626"],
  ["Not ranked", "You did not appear in the results returned for that point at all.", "#94a3b8"],
] as const;

const glossary = [
  [
    "Geo-grid",
    "A lattice of points laid over a service area. Each one is a separate search, run as if the customer were standing there.",
  ],
  [
    "Local pack",
    "The map and three business listings Google shows above the ordinary results for a local search.",
  ],
  [
    "Google Business Profile",
    "The free listing that puts a business on Google Maps — its name, hours, photos and reviews. Formerly Google My Business.",
  ],
  [
    "Visibility",
    "The share of your grid points where you rank in the top ten. One number for the whole map.",
  ],
  [
    "Average rank",
    "The mean position across every point where you appeared. Lower is better.",
  ],
  [
    "Scan credit",
    "What one grid point costs to check. A 9 × 9 scan spends 81 of them.",
  ],
] as const;

export function HomeExplainer() {
  return (
    <>
      <GridWalkthrough />

      <section className={styles.band} aria-labelledby="reading-heading">
        <div className={styles.container}>
          <div className={styles.sectionTop}>
            <p className={styles.eyebrow}>Reading the map</p>
            <Link href="/how-it-works" className={styles.textLink}>
              See the full walkthrough{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <h2 id="reading-heading">
            Every point is
            <br />
            <span className={styles.quiet}>a real search.</span>
          </h2>

          <div className={styles.prose}>
            <p>
              Each dot on a GridBeacon heatmap carries the position
              your business held in the results for that exact
              coordinate. The colour is the position, so a scan is
              legible before you read a single figure — green where
              you win, red where you do not.
            </p>
          </div>

          <dl className={styles.bandKey}>
            {bands.map(([label, meaning, colour]) => (
              <div key={label} className={styles.bandRow}>
                <dt>
                  <span
                    className={styles.bandSwatch}
                    style={{ backgroundColor: colour }}
                    aria-hidden="true"
                  />
                  {label}
                </dt>
                <dd>{meaning}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.prose}>
            <p>
              Above the map, three figures summarise it.{" "}
              <strong>Visibility</strong> is the share of points
              where you placed in the top ten.{" "}
              <strong>Average rank</strong> is your mean position
              across the points where you appeared at all.{" "}
              <strong>Top 3</strong> is the share of points where
              you made the local pack — the only result most people
              on a phone will ever see.
            </p>

            <p>
              Scan the same keyword again next month and every
              point carries an arrow showing which way it moved.
              That is the difference between believing your local
              SEO worked and being able to show which streets it
              worked on.
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.section}`} aria-labelledby="glossary-heading">
        <div className={styles.sectionTop}><p className={styles.eyebrow}>The words on screen</p></div>
        <h2 id="glossary-heading">Plain definitions.</h2>
        <dl className={styles.glossary}>
          {glossary.map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}
        </dl>
      </section>
    </>
  );
}

