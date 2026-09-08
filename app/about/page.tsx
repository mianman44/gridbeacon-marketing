import type { Metadata } from "next";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import styles from "@/components/marketing/premium.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "GridBeacon is a local search visibility platform for monitoring Google Business Profile rankings across geographic grids. Operated by Hustle 24/7.",
};

const principles = [
  ["01", "Geographic insight", "Ranking performance changes across a local market. Measuring one point hides that; measuring many shows it."],
  ["02", "Focused tracking", "Monitor the businesses and the local search keywords that matter to each project, and nothing else."],
  ["03", "Built for both", "Whether you run one business or a hundred client accounts, the work is organised the same way."],
] as const;

export default function AboutPage() {
  return (
    <div className={styles.site}>
      <MarketingHeader />

      <main id="main-content">
        <section className={`${styles.container} ${styles.pageHero}`}>
          <p className={styles.eyebrow}>About / 01</p>
          <h1>
            Local search,
            <br />
            <span>made legible.</span>
          </h1>
          <p className={styles.pageLede}>
            GridBeacon is a platform for monitoring Google Business
            Profile visibility across geographic grids &mdash; built
            for the people who have to explain local rankings to
            somebody else.
          </p>
        </section>

        <section className={styles.bandDark}>
          <div className={styles.container}>
            <div className={styles.splitPanel}>
              <div>
                <p className={styles.eyebrow}>Our product / 02</p>
                <h2>
                  A clearer view
                  <br />
                  <span>of local rankings.</span>
                </h2>
              </div>

              <div>
                <p
                  className={styles.pageLede}
                  style={{ color: "#b1b7ac", marginTop: 0 }}
                >
                  A local ranking depends on where the search
                  happens. GridBeacon measures positions across
                  many geographic points, so a business or an
                  agency can see how visibility changes across a
                  service area rather than inferring it.
                </p>

                <p
                  className={styles.pageLede}
                  style={{ color: "#b1b7ac", marginTop: "22px" }}
                >
                  Organise businesses and keywords, run geographic
                  scans, read the heatmap and keep the history.
                  That is the whole product.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.container} ${styles.section}`}>
          <p className={styles.eyebrow}>
            What we optimise for / 03
          </p>
          <h2>
            Fewer numbers.
            <br />
            <span className={styles.quiet}>More understanding.</span>
          </h2>

          <div className={styles.cards} style={{ marginTop: "52px" }}>
            {principles.map(([index, title, description]) => (
              <div className={styles.card} key={index}>
                <span className={styles.cardIndex}>{index}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.band}>
          <div className={styles.container}>
            <div className={styles.splitPanel}>
              <div>
                <p className={styles.eyebrow}>
                  Company information / 04
                </p>
                <h2>
                  Hustle 24/7.
                </h2>
                <p className={styles.pageLede}>
                  GridBeacon is a software product operated by
                  Hustle 24/7.
                </p>
              </div>

              <dl className={styles.infoPanel}>
                <dt>Business</dt>
                <dd>Hustle 24/7</dd>

                <dt>Location</dt>
                <dd>Pasrur, Sialkot, Punjab, Pakistan</dd>

                <dt>Support</dt>
                <dd>
                  <a href="mailto:support@gridbeaconhq.com">
                    support@gridbeaconhq.com
                  </a>
                </dd>
              </dl>
            </div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.container}>
            <p className={styles.eyebrow}>
              Ready to map your local rankings?
            </p>
            <div className={styles.finalInner}>
              <h2>
                See where you
                <br />
                actually stand.
              </h2>
              <Link href="/signup" className={styles.splitButton}>
                Create an account
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
