"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { PLAN_FEATURES } from "@/components/marketing/plan-features";
import styles from "@/components/marketing/premium.module.css";

/*
 * Plans, and the monthly/annual switch.
 *
 * A client component only because of the switch. The numbers
 * themselves are static and rendered on the server first, so the
 * page is readable and indexable before any JavaScript runs --
 * which matters more on a pricing page than on most.
 *
 * Annual is twelve months at 20% off, granted upfront rather than
 * monthly. That is the same arithmetic the billing code applies,
 * so the figures below are the ones a reader will actually be
 * charged.
 */

type Plan = {
  name: string;
  monthly: string;
  annual: string;
  annualEffective: string;
  monthlyCredits: string;
  annualCredits: string;
  description: string;
  featured: boolean;
  /* What the allowance buys, in the unit a reader actually
     thinks in. "8,000 credits" means nothing until it is
     "98 scans of a 9 x 9". */
  scale: string;
};

const plans: Plan[] = [
  {
    name: "Starter",
    monthly: "$19.99",
    annual: "$191.90",
    annualEffective: "$15.99",
    monthlyCredits: "8,000",
    annualCredits: "96,000",
    description:
      "For local businesses and independent SEO professionals getting started with geo-grid tracking.",
    featured: false,
    scale: "Around 98 scans of a 9 × 9 grid each month.",
  },
  {
    name: "Professional",
    monthly: "$34.99",
    annual: "$335.90",
    annualEffective: "$27.99",
    monthlyCredits: "15,000",
    annualCredits: "180,000",
    description:
      "For SEO professionals managing more locations, more keywords and recurring ranking work.",
    featured: true,
    scale: "Around 185 scans of a 9 × 9 grid each month.",
  },
  {
    name: "Agency",
    monthly: "$69.99",
    annual: "$671.90",
    annualEffective: "$55.99",
    monthlyCredits: "32,000",
    annualCredits: "384,000",
    description:
      "For agencies and high-volume users tracking local visibility across many client campaigns.",
    featured: false,
    scale: "Around 395 scans of a 9 × 9 grid each month.",
  },
];

export function PricingPlans() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <div className={styles.billingToggle} role="group" aria-label="Billing period">
        <button
          type="button"
          onClick={() => setAnnual(false)}
          aria-pressed={!annual}
          className={annual ? "" : styles.billingActive}
        >
          Monthly
        </button>

        <button
          type="button"
          onClick={() => setAnnual(true)}
          aria-pressed={annual}
          className={annual ? styles.billingActive : ""}
        >
          Annual
          <span>Save 20%</span>
        </button>
      </div>

      <div className={styles.planGrid}>
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`${styles.plan} ${
              plan.featured ? styles.planFeatured : ""
            }`}
          >
            {plan.featured && (
              <span className={styles.planFlag}>Most popular</span>
            )}

            <p className={styles.planName}>{plan.name}</p>

            <p className={styles.planPrice}>
              {annual ? plan.annual : plan.monthly}
              <span>{annual ? "/ year" : "/ month"}</span>
            </p>

            {/* Shown only on annual, because "$15.99/mo effective"
                next to a monthly price of $19.99 is the kind of
                thing that reads as a trick. */}
            <p className={styles.planSecondary}>
              {annual
                ? `${plan.annualEffective} a month, billed once`
                : `or ${plan.annual} a year, saving 20%`}
            </p>

            <p className={styles.planCredits}>
              <strong>
                {annual ? plan.annualCredits : plan.monthlyCredits}
              </strong>
              <span>
                scan credits
                {annual ? ", granted upfront" : " each month"}
              </span>
            </p>

            <p className={styles.planDescription}>
              {plan.description}
            </p>

            <p className={styles.planScale}>{plan.scale}</p>

            {/* The same list in every card, because nothing is
                gated by tier. Rendered from the shared source so
                the three cards cannot drift from each other or
                from the features page. */}
            <ul className={styles.planFeatures}>
              {PLAN_FEATURES.map((feature) => (
                <li key={feature}>
                  <Check size={15} aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>

            <Link href="/signup" className={styles.planCta}>
              Get started
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
