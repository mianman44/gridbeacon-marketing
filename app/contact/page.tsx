import type { Metadata } from "next";

import { ArrowUpRight } from "lucide-react";

import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import styles from "@/components/marketing/premium.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact GridBeacon support for help with your account, scans, subscription, billing or credits.",
};

export default function ContactPage() {
  return (
    <div className={styles.site}>
      <MarketingHeader />

      <main id="main-content">
        <section className={`${styles.container} ${styles.pageHero}`}>
          <p className={styles.eyebrow}>Contact / 01</p>
          <h1>
            Talk to
            <br />
            <span>a human.</span>
          </h1>
          <p className={styles.pageLede}>
            Questions about your account, a scan, your subscription,
            billing or credits &mdash; all of it reaches the same
            inbox, and a person reads it.
          </p>

          <a
            href="mailto:support@gridbeaconhq.com"
            className={styles.splitButton}
            style={{ marginTop: "34px" }}
          >
            support@gridbeaconhq.com
            <span>
              <ArrowUpRight size={22} aria-hidden="true" />
            </span>
          </a>
        </section>

        <section className={styles.band}>
          <div className={styles.container}>
            <div className={styles.splitPanel}>
              <div>
                <p className={styles.eyebrow}>
                  Getting a faster answer / 02
                </p>
                <h2>
                  Tell us
                  <br />
                  <span className={styles.quiet}>
                    what you saw.
                  </span>
                </h2>
                <p className={styles.pageLede}>
                  Include the email address on your GridBeacon
                  account and a clear description of what happened.
                  If it involves a scan, the keyword and the date
                  are usually enough for us to find it.
                </p>
              </div>

              <dl className={styles.infoPanel}>
                <dt>Email support</dt>
                <dd>
                  <a href="mailto:support@gridbeaconhq.com">
                    support@gridbeaconhq.com
                  </a>
                </dd>

                <dt>Business location</dt>
                <dd>
                  Hustle 24/7
                  <br />
                  Pasrur, Sialkot
                  <br />
                  Punjab, Pakistan
                </dd>

                <dt>Billing and refunds</dt>
                <dd>
                  Write to the same address. Payments taken through
                  Paddle can also be managed through Paddle&rsquo;s
                  own buyer support.
                </dd>
              </dl>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
