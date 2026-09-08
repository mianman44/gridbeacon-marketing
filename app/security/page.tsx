import type { Metadata } from "next";

import {
  ArrowUpRight,
  CreditCard,
  KeyRound,
  ServerCog,
  ShieldCheck,
} from "lucide-react";

import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import styles from "@/components/marketing/premium.module.css";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How GridBeacon protects customer accounts, application data and billing workflows, and how to report a security concern.",
};

/* Deliberately describes controls that exist rather than claiming
   certifications. A security page that overstates is worse than a
   short one. */
const controls = [
  [KeyRound, "Authenticated accounts", "Access to private application data and billing features is gated behind an authenticated account."],
  [ServerCog, "Protected infrastructure", "Technical and operational safeguards are in place to reduce unauthorised access and protect availability."],
  [ShieldCheck, "Data access controls", "Access is scoped to authenticated users and project ownership rather than exposing account data publicly."],
  [CreditCard, "Payment processing", "Payments are handled through Paddle, so GridBeacon does not store full payment-card details."],
] as const;

export default function SecurityPage() {
  return (
    <div className={styles.site}>
      <MarketingHeader />

      <main id="main-content">
        <section className={`${styles.container} ${styles.pageHero}`}>
          <p className={styles.eyebrow}>Security / 01</p>
          <h1>
            Practical controls,
            <br />
            <span>plainly described.</span>
          </h1>
          <p className={styles.pageLede}>
            GridBeacon is built with controls intended to protect
            customer accounts, application data and billing
            workflows. What follows is what we actually do.
          </p>
        </section>

        <section className={styles.bandDark}>
          <div className={styles.container}>
            <div className={styles.sectionTop}>
              <p className={styles.eyebrow}>
                How your account is protected / 02
              </p>
            </div>

            <div className={styles.cards2}>
              {controls.map(([Icon, title, description]) => (
                <div className={styles.card} key={title}>
                  <Icon
                    size={20}
                    aria-hidden="true"
                    className={styles.cardIcon}
                  />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.container} ${styles.section}`}>
          <div className={styles.splitPanel}>
            <div>
              <p className={styles.eyebrow}>
                Responsible disclosure / 03
              </p>
              <h2>
                Found something?
                <br />
                <span className={styles.quiet}>Tell us privately.</span>
              </h2>
              <p className={styles.pageLede}>
                If you believe you have found a security issue in
                GridBeacon, report it to us directly rather than
                publicly, and include enough detail for us to
                reproduce and investigate it.
              </p>

              <a
                href="mailto:support@gridbeaconhq.com"
                className={styles.splitButton}
                style={{ marginTop: "30px" }}
              >
                Report a security concern
                <span>
                  <ArrowUpRight size={22} aria-hidden="true" />
                </span>
              </a>
            </div>

            <dl className={styles.infoPanel}>
              <dt>What helps</dt>
              <dd>
                Steps to reproduce, the account or page involved,
                and roughly when you saw it.
              </dd>

              <dt>Where to send it</dt>
              <dd>
                <a href="mailto:support@gridbeaconhq.com">
                  support@gridbeaconhq.com
                </a>
              </dd>
            </dl>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
