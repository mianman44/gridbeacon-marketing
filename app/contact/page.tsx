import type { Metadata } from "next";
import Link from "next/link";

import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  CreditCard,
  LifeBuoy,
  Mail,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";

import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import styles from "@/components/marketing/company.module.css";
import { BreadcrumbStructuredData } from "@/components/marketing/structured-data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/contact",
  title: "Contact",
  description:
    "Contact GridBeacon support for help with your account, scans, subscription, billing or credits.",
});

const SUPPORT_EMAIL = "founder@gridbeaconhq.com";

const resources = [
  {
    icon: BookOpen,
    title: "How it works",
    text: "How a geo-grid scan runs, what it costs in credits and how to read the results.",
    href: "/how-it-works",
  },
  {
    icon: CreditCard,
    title: "Pricing and credits",
    text: "Plans, credit top-ups and how credits map to the points in a scan.",
    href: "/pricing",
  },
  {
    icon: ReceiptText,
    title: "Refund policy",
    text: "When a payment can be refunded and how to ask for it.",
    href: "/refund-policy",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    text: "How your account and your data are protected.",
    href: "/security",
  },
] as const;

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <link rel="stylesheet" href="/stitch-fonts.css" />
      <BreadcrumbStructuredData name="Contact" path="/contact" />
      <MarketingHeader />

      <main id="main-content">
        <section className={styles.hero}>
          <div className={styles.glowA} aria-hidden="true" />
          <div className={styles.glowB} aria-hidden="true" />
          <div className={styles.container}>
            <span className={styles.pill}>
              <span className={styles.pillDot} aria-hidden="true" />
              Contact
            </span>
            <h1 className={styles.heroTitle}>
              Talk to <span>a human.</span>
            </h1>
            <p className={styles.lede}>
              Questions about your account, a scan, your subscription,
              billing or credits all reach the same inbox, and a person reads
              it.
            </p>
            <div className={styles.actions}>
              <a href={`mailto:${SUPPORT_EMAIL}`} className={styles.btnPrimary}>
                <Mail size={18} aria-hidden="true" />
                Email support
              </a>
            </div>
            <div className={styles.chips}>
              <span className={styles.chip}>
                <CheckCircle2 size={14} aria-hidden="true" /> Account and sign-in
              </span>
              <span className={styles.chip}>
                <CheckCircle2 size={14} aria-hidden="true" /> Scans and results
              </span>
              <span className={styles.chip}>
                <CheckCircle2 size={14} aria-hidden="true" /> Billing and credits
              </span>
            </div>
          </div>
        </section>

        <section className={styles.section} style={{ paddingTop: 16 }}>
          <div className={`${styles.container} ${styles.split}`}>
            <div className={styles.mailCard}>
              <span className={styles.icon}>
                <LifeBuoy size={22} aria-hidden="true" />
              </span>
              <h2>Email support</h2>
              <p>One address for everything. Write to us and a person will reply.</p>
              <div className={styles.address}>
                <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
              </div>

              <p className={styles.checklistTitle}>For a faster answer, include</p>
              <ul className={styles.checklist}>
                <li>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>
                    The <strong>email address on your GridBeacon account</strong>.
                  </span>
                </li>
                <li>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>
                    A <strong>clear description</strong> of what happened.
                  </span>
                </li>
                <li>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>
                    If it involves a scan, <strong>the keyword and the date</strong>.
                    That is usually enough for us to find it.
                  </span>
                </li>
              </ul>
            </div>

            <dl className={styles.info}>
              <div className={styles.infoRow}>
                <span className={styles.icon}>
                  <Mail size={20} aria-hidden="true" />
                </span>
                <div>
                  <dt>Email support</dt>
                  <dd>
                    <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
                  </dd>
                </div>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.icon}>
                  <Building2 size={20} aria-hidden="true" />
                </span>
                <div>
                  <dt>Operated by</dt>
                  <dd>Hustle 24/7</dd>
                </div>
              </div>
              <div className={styles.infoRow}>
                <span className={`${styles.icon} ${styles.iconGreen}`}>
                  <CreditCard size={20} aria-hidden="true" />
                </span>
                <div>
                  <dt>Billing and refunds</dt>
                  <dd>
                    Write to the same address.
                    <span className={styles.infoNote}>
                      Payments taken through Paddle can also be managed
                      through Paddle&rsquo;s own buyer support.
                    </span>
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </section>

        <section className={styles.sectionTinted}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>Before you write</p>
              <h2 className={styles.h2}>
                The answer may <span>already be here.</span>
              </h2>
            </div>
            <div className={styles.grid4}>
              {resources.map(({ icon: Icon, title, text, href }) => (
                <Link className={styles.card} href={href} key={href}>
                  <div className={styles.cardTop}>
                    <span className={styles.icon}>
                      <Icon size={22} aria-hidden="true" />
                    </span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span className={styles.cardLink}>
                    Read more <ArrowRight size={15} aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
