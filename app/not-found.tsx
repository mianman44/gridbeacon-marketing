import Link from "next/link";

import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import styles from "@/components/marketing/premium.module.css";
import { LOGIN_URL, SIGNUP_URL } from "@/lib/seo";

/* Next answers unmatched URLs with this page and a 404 status, and
   marks it noindex itself. It only has to get the reader somewhere
   useful: the pages people most often came for. */
const destinations = [
  ["01", "Home", "What GridBeacon does and how a geo-grid scan reads.", "/"],
  ["02", "Features", "Heatmaps, competitor grids, scan history and reports.", "/features"],
  ["03", "Pricing", "Plans, scan credits and top-up packs.", "/pricing"],
] as const;

export default function NotFound() {
  return (
    <div className={styles.site}>
      <MarketingHeader />

      <main id="main-content">
        <section className={`${styles.container} ${styles.pageHero}`}>
          <p className={styles.eyebrow}>Error / 404</p>
          <h1>
            This page
            <br />
            <span>does not exist.</span>
          </h1>
          <p className={styles.pageLede}>
            The link may be out of date, or the address may have a
            typo. These will get you back on track.
          </p>

          <div className={styles.cards} style={{ marginTop: "52px" }}>
            {destinations.map(([index, title, description, href]) => (
              <Link className={styles.card} href={href} key={href}>
                <span className={styles.cardIndex}>{index}</span>
                <h2>{title}</h2>
                <p>{description}</p>
              </Link>
            ))}
          </div>

          <p className={styles.pageLede}>
            Already have an account?{" "}
            <a className={styles.textLink} href={LOGIN_URL}>Sign in</a>
            {" "}or{" "}
            <a className={styles.textLink} href={SIGNUP_URL}>start free with 500 credits</a>.
          </p>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
