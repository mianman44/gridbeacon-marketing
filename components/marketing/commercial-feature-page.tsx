import { Cards, ComparisonTable, CtaBand, Faq, Hero, InlineCta, Note, Section, SeoLandingPage, Steps, TextLink, Toc } from "@/components/marketing/seo-landing";
import { ProductPageStructuredData } from "@/components/marketing/structured-data";
import { SIGNUP_URL } from "@/lib/seo";
import styles from "./commercial-feature-page.module.css";

export interface CommercialPageContent {
  path: string;
  name: string;
  title: string;
  description: string;
  lede: string;
  facts: string[];
  access: string;
  preview: { heading: string; rows: [string, string][]; caption: string };
  features: { title: string; body: string }[];
  workflow: { title: string; body: string }[];
  budget: { intro: string; columns: string[]; rows: [string, ...string[]][]; caption: string };
  applications: { title: string; body: string }[];
  limits: string;
  faqs: [string, string][];
  closing: { title: string; body: string };
  related: [string, string][];
}

export function CommercialFeaturePage({ content: c }: { content: CommercialPageContent }) {
  return <SeoLandingPage>
    <ProductPageStructuredData name={c.name} path={c.path} faqs={c.faqs} />
    <Hero eyebrow={c.name} title={c.title} lede={c.lede}
      primary={{ label: "Start Free", href: SIGNUP_URL }}
      primaryNote={c.access} secondary={{ label: "See the Workflow", href: "#workflow" }} facts={c.facts}
      media={<figure className={styles.preview}>
        <div className={styles.previewTop}><span className={styles.brand}>GridBeacon</span><span className={styles.badge}>Workflow overview</span></div>
        <h2>{c.preview.heading}</h2>
        <dl>{c.preview.rows.map(([label, value], index) => <div key={label}><dt><span className={styles.number} aria-hidden="true">{index + 1}</span>{label}</dt><dd>{value}</dd></div>)}</dl>
        <figcaption>{c.preview.caption}</figcaption>
      </figure>} />
    <Section id="features" eyebrow="What you can do" title={`Put ${c.name} to Work`}>
      <Cards items={c.features} />
      <Toc items={[["Your workflow", "workflow"], ["Plans and credit costs", "credits"], ["Who it helps", "use-cases"], ["Questions", "faq"]]} />
    </Section>
    <Section id="workflow" tone="tint" eyebrow="Step by step" title="From Setup to Your Next Decision">
      <Steps items={c.workflow} />
    </Section>
    <Section id="credits" eyebrow="Plan your usage" title="Know the Credit Cost Before You Start" intro={<p>{c.budget.intro}</p>}>
      <ComparisonTable label={`${c.name} credit costs`} columns={c.budget.columns} rows={c.budget.rows} caption={c.budget.caption} />
      <InlineCta><TextLink href="/pricing">Compare plans and credit allowances</TextLink></InlineCta>
    </Section>
    <Section id="use-cases" tone="tint" eyebrow="Built around your work" title="A Clearer Picture for Owners and Agencies">
      <Cards items={c.applications} />
      <Note>{c.limits}</Note>
    </Section>
    <Section id="faq" eyebrow="Straight answers" title={`${c.name}: Questions`}>
      <Faq items={c.faqs.map(([q, a]) => [q, <p key={q}>{a}</p>])} />
      <InlineCta>{c.related.map(([label, href], i) => <span key={href}>{i > 0 && " · "}<TextLink href={href}>{label}</TextLink></span>)}</InlineCta>
    </Section>
    <CtaBand title={c.closing.title} body={c.closing.body} primary={{ label: "Start Free", href: SIGNUP_URL }}
      note={c.access} secondary={{ label: "View Paid Plans", href: "/pricing" }} />
  </SeoLandingPage>;
}
