/*
 * Building blocks for GridBeacon's commercial SEO landing pages.
 *
 * Each page composes these with its own copy: one H1 in the hero, an
 * H2 per section, H3 for cards, steps and FAQ questions. They are
 * server components styled by one CSS module, so a landing page adds
 * no client JavaScript of its own. The shared site header and footer
 * wrap every page, so these read as part of gridbeaconhq.com rather
 * than a microsite.
 */

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { MarketingHeader } from "@/components/marketing/marketing-header";

import styles from "./seo-landing.module.css";

export interface LinkTarget {
  label: string;
  href: string;
}

const leavesPage = (href: string) =>
  /^(https?:|mailto:)/.test(href) || href.startsWith("#");

export function SeoLandingPage({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <MarketingHeader />
      <main id="main-content">{children}</main>
      <MarketingFooter />
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "onDark";
}) {
  const className = `${styles.button} ${
    variant === "primary"
      ? styles.buttonPrimary
      : variant === "secondary"
        ? styles.buttonSecondary
        : styles.buttonOnDark
  }`;

  // The app and in-page anchors are plain links; site pages go
  // through next/link.
  return leavesPage(href)
    ? <a className={className} href={href}>{children}</a>
    : <Link className={className} href={href}>{children}</Link>;
}

export function TextLink({
  href,
  children,
  rel,
}: {
  href: string;
  children: ReactNode;
  /* e.g. "nofollow noopener" for a source link to another company. */
  rel?: string;
}) {
  return leavesPage(href)
    ? <a className={styles.textLink} href={href} rel={rel}>{children}</a>
    : <Link className={styles.textLink} href={href}>{children}</Link>;
}

/* A side-by-side comparison. The first data column is GridBeacon and
   is tinted; row labels are row headers so screen readers announce
   them with each cell. On narrow screens the table scrolls sideways
   inside its own frame rather than widening the page. */
export function ComparisonTable({
  label,
  caption,
  columns,
  rows,
}: {
  label: string;
  caption: ReactNode;
  columns: [string, string, string];
  rows: [string, ReactNode, ReactNode][];
}) {
  return (
    <div className={styles.tableWrap} role="region" aria-label={label} tabIndex={0}>
      <table className={styles.table}>
        <caption className={styles.tableCaption}>{caption}</caption>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={column} scope="col" className={index === 1 ? styles.tableHighlight : undefined}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([heading, ours, theirs]) => (
            <tr key={heading}>
              <th scope="row">{heading}</th>
              <td className={styles.tableHighlight}>{ours}</td>
              <td>{theirs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Hero({
  eyebrow,
  title,
  lede,
  primary,
  primaryNote,
  secondary,
  facts,
  media,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  primary: LinkTarget;
  primaryNote?: string;
  secondary?: LinkTarget;
  facts?: string[];
  media: ReactNode;
}) {
  return (
    <section className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 className={styles.heroTitle}>{title}</h1>
          <p className={styles.heroLede}>{lede}</p>
          <div className={styles.actions}>
            <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} variant="secondary">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
          {primaryNote && <p className={styles.actionNote}>{primaryNote}</p>}
          {facts && (
            <ul className={styles.facts} aria-label="At a glance">
              {facts.map((fact) => <li key={fact}>{fact}</li>)}
            </ul>
          )}
        </div>
        <div>{media}</div>
      </div>
    </section>
  );
}

export function Section({
  id,
  tone = "white",
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  tone?: "white" | "tint";
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`${styles.section} ${tone === "tint" ? styles.toneTint : styles.toneWhite}`}
      aria-labelledby={`${id}-title`}
    >
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h2 id={`${id}-title`} className={styles.sectionTitle}>{title}</h2>
          {intro && <div className={styles.sectionIntro}>{intro}</div>}
        </div>
        {children}
      </div>
    </section>
  );
}

export function Split({
  media,
  children,
  reverse = false,
}: {
  media: ReactNode;
  children: ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className={`${styles.split} ${reverse ? styles.splitReverse : ""}`}>
      <div className={`${styles.splitCopy} ${styles.prose}`}>{children}</div>
      <div className={styles.splitMedia}>{media}</div>
    </div>
  );
}

export function Stack({ children }: { children: ReactNode }) {
  return <div className={styles.stack}>{children}</div>;
}

export function InlineCta({ children }: { children: ReactNode }) {
  return <div className={styles.inlineCta}>{children}</div>;
}

export function Note({ children }: { children: ReactNode }) {
  return <p className={styles.note}>{children}</p>;
}

export function Screenshot({
  src,
  alt,
  width,
  height,
  caption,
  eager = false,
  sizes = "(min-width: 1240px) 640px, (min-width: 1024px) 52vw, 100vw",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: ReactNode;
  /* For the one image above the fold: fetched first, not lazily. */
  eager?: boolean;
  sizes?: string;
}) {
  return (
    <figure className={styles.shot}>
      <div className={styles.shotFrame}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className={styles.shotImage}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
        />
      </div>
      {caption && <figcaption className={styles.shotCaption}>{caption}</figcaption>}
    </figure>
  );
}

export function ScreenshotPair({ children }: { children: ReactNode }) {
  return <div className={styles.shotPair}>{children}</div>;
}

export function Checklist({ items }: { items: ReactNode[] }) {
  return (
    <ul className={styles.checklist}>
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  );
}

export function Compare({
  before,
  after,
}: {
  before: { label: string; title: string; items: string[] };
  after: { label: string; title: string; items: string[] };
}) {
  return (
    <div className={styles.compare}>
      <div className={styles.compareCard}>
        <p className={styles.compareLabel}>{before.label}</p>
        <h3 className={styles.cardTitle}>{before.title}</h3>
        <ul className={styles.crossList}>
          {before.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
      <div className={`${styles.compareCard} ${styles.compareHighlight}`}>
        <p className={styles.compareLabel}>{after.label}</p>
        <h3 className={styles.cardTitle}>{after.title}</h3>
        <ul className={styles.checklist}>
          {after.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
}

export function Cards({
  items,
  columns = 3,
}: {
  items: { title: string; body: ReactNode; tag?: string }[];
  columns?: 2 | 3 | 4;
}) {
  const grid = columns === 2 ? styles.cols2 : columns === 4 ? styles.cols4 : styles.cols3;

  return (
    <div className={`${styles.cards} ${grid}`}>
      {items.map((item) => (
        <div className={styles.card} key={item.title}>
          {item.tag && <span className={styles.tag}>{item.tag}</span>}
          <h3 className={styles.cardTitle}>{item.title}</h3>
          <p className={styles.cardBody}>{item.body}</p>
        </div>
      ))}
    </div>
  );
}

export function Steps({
  items,
}: {
  items: { title: string; body: ReactNode }[];
}) {
  return (
    <ol className={styles.steps}>
      {items.map((step, index) => (
        <li className={styles.step} key={step.title}>
          <span className={styles.stepNumber} aria-hidden="true">{index + 1}</span>
          <h3 className={styles.cardTitle}>{step.title}</h3>
          <p className={styles.cardBody}>{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

/* The colours GridBeacon's heatmap uses for each rank band. */
const RANK_BANDS = [
  [styles.dotTop3, "1–3", "In the map pack: the top three results"],
  [styles.dotTop10, "4–10", "Still on the first page of results"],
  [styles.dotTop20, "11–20", "Visible, but only if someone scrolls"],
  [styles.dotLow, "21+", "Rarely seen by searchers"],
  [styles.dotNone, "–", "Not in the results at that point"],
] as const;

export function RankKey({
  title,
  metrics,
}: {
  title: string;
  metrics?: [string, string][];
}) {
  return (
    <div className={styles.panel}>
      <h3 className={styles.panelTitle}>{title}</h3>
      <ul className={styles.legend}>
        {RANK_BANDS.map(([dot, label, meaning]) => (
          <li key={label}>
            <span className={`${styles.legendDot} ${dot}`} aria-hidden="true">{label}</span>
            <span><strong>{label === "–" ? "Not ranked" : `Rank ${label}`}:</strong> {meaning}</span>
          </li>
        ))}
      </ul>
      {metrics && (
        <dl className={styles.metrics}>
          {metrics.map(([term, definition]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{definition}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

export function Faq({ items }: { items: [string, ReactNode][] }) {
  return (
    <div className={styles.faq}>
      {items.map(([question, answer]) => (
        <details className={styles.faqItem} key={question}>
          <summary className={styles.faqQuestion}>
            <h3>{question}</h3>
          </summary>
          <div className={styles.faqAnswer}>{answer}</div>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({
  title,
  body,
  primary,
  note,
  secondary,
}: {
  title: string;
  body: ReactNode;
  primary: LinkTarget;
  note?: string;
  secondary?: LinkTarget;
}) {
  return (
    <section className={styles.ctaBand} aria-labelledby="closing-cta-title">
      <div className={styles.container}>
        <div className={styles.ctaInner}>
          <h2 id="closing-cta-title" className={styles.ctaTitle}>{title}</h2>
          <p className={styles.ctaBody}>{body}</p>
          <div className={styles.actions}>
            <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} variant="onDark">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
          {note && <p className={styles.ctaNote}>{note}</p>}
        </div>
      </div>
    </section>
  );
}
