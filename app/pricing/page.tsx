import type { Metadata } from "next";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { PricingPlans } from "@/components/marketing/pricing-plans";
import styles from "@/components/marketing/premium.module.css";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "GridBeacon pricing: Starter, Professional and Agency plans with monthly scan credits, 20% off annual, and one-time credit top-ups. One credit per grid point.",
};

/* Unchanged by the plan repricing -- these are separate Paddle
   products and their figures come from CREDIT_PACK_CONFIG. */
const topups = [
  ["2,000", "$9.99"],
  ["5,000", "$19.99"],
  ["10,000", "$34.99"],
] as const;

export default function PricingPage() {
  return (
    <div className={styles.site}>
      <MarketingHeader />

      <main id="main-content">
        <section className={`${styles.container} ${styles.pageHero}`}>
          <p className={styles.eyebrow}>Pricing / 01</p>
          <h1>
            Pay for the ground
            <br />
            <span>you actually scan.</span>
          </h1>
          <p className={styles.pageLede}>
            One credit per grid point, on every plan. No feature is
            locked behind a higher tier &mdash; the only thing that
            changes is how much ground you can cover.
          </p>
        </section>

        <section
          className={`${styles.container} ${styles.section}`}
          style={{ paddingTop: 0 }}
        >
          <PricingPlans />

          {/* The home page promises 500 free credits, so the
              pricing page has to say where they come from. */}
          <div className={styles.freeNote}>
            <div>
              <h3>Start free, no card</h3>
              <p>
                Every new account gets 500 scan credits &mdash;
                enough for a full 21 &times; 21 scan, or twenty
                5 &times; 5 scans. The free plan tracks one
                business and three keywords, and never asks for a
                card.
              </p>
            </div>

            <Link href="/signup" className={styles.splitButton}>
              Create an account
              <span>
                <ArrowUpRight size={22} aria-hidden="true" />
              </span>
            </Link>
          </div>

          <p className={styles.note}>
            Subscription credits refresh each billing cycle and do
            not roll over. Annual plans receive all twelve months
            of credits upfront. Prices are in USD; applicable taxes
            are added at checkout.
          </p>
        </section>

        <section className={styles.band}>
          <div className={styles.container}>
            <div className={styles.sectionTop}>
              <p className={styles.eyebrow}>Need more? / 02</p>
              <span className={styles.sectionAside}>
                One-time purchases, no plan change.
              </span>
            </div>

            <h2>
              Top up
              <br />
              <span className={styles.quiet}>
                whenever you need to.
              </span>
            </h2>

            <div className={styles.topups}>
              {topups.map(([credits, price]) => (
                <div className={styles.topup} key={credits}>
                  <strong>{price}</strong>
                  <span>
                    {credits} scan credits &middot; one-time
                  </span>
                </div>
              ))}
            </div>

            <p className={styles.note}>
              Top-up credits sit alongside your monthly allowance
              and are spent only once the monthly credits run out.
            </p>
          </div>
        </section>

        <section className={`${styles.container} ${styles.section}`}>
          <div className={styles.splitPanel}>
            <div>
              <p className={styles.eyebrow}>
                What a credit buys / 03
              </p>
              <h2>
                One point.
                <br />
                <span className={styles.quiet}>One credit.</span>
              </h2>
              <p className={styles.pageLede}>
                A 5 &times; 5 grid costs 25 credits, a 9 &times; 9
                costs 81. You see the exact cost before a scan
                runs, and can remove points outside your service
                area to bring it down.
              </p>
            </div>

            <dl className={styles.infoPanel}>
              <dt>Settlement</dt>
              <dd>
                Credits are charged against the points that
                actually processed, so a cancelled or failed scan
                does not bill you for work that never happened.
              </dd>

              <dt>Managing your plan</dt>
              <dd>
                Subscription, remaining credits, billing cycle and
                payment details are all managed from the billing
                area inside GridBeacon.
              </dd>
            </dl>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.container}>
            <p className={styles.eyebrow}>
              Your next move starts here.
            </p>
            <div className={styles.finalInner}>
              <h2>
                Find out where
                <br />
                you really rank.
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
