import type { Metadata } from "next";

import {
  Cards,
  Checklist,
  ComparisonTable,
  CtaBand,
  Faq,
  Hero,
  InlineCta,
  Note,
  Screenshot,
  ScreenshotPair,
  Section,
  SeoLandingPage,
  Split,
  Steps,
  TextLink,
  Toc,
} from "@/components/marketing/seo-landing";
import { ProductPageStructuredData } from "@/components/marketing/structured-data";
import { pageMetadata, SIGNUP_URL } from "@/lib/seo";

/*
 * Local SEO reports.
 *
 * Two different reports, and the page keeps them apart the way the app
 * does: the standard scan report (frontend components/scan-report,
 * backend api/scan_reports.py -- no model, no credits) and the AI
 * Ranking Intelligence report (AI_REPORT_CREDITS = 100, paid plans via
 * enforce_ai_report_access). Section names are the ones each report
 * prints. Neither is white-label; the page says so.
 */

const PATH = "/local-seo-report";
const IMAGES = "/marketing/google-maps-rank-tracker";

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: "Local SEO Report for Google Maps Rankings | GridBeacon",
  description:
    "Create local SEO reports clients understand: geo-grid heatmaps, competitor tables and AI-written action plans as PDFs. Plus a monthly report template to follow.",
  absoluteTitle: true,
  image: {
    url: `${IMAGES}/og-google-maps-rank-tracker.jpg`,
    width: 1200,
    height: 630,
    alt: "A GridBeacon geo-grid scan showing a business's Google Maps rankings at 25 points across Dallas",
  },
});

const FAQS: [string, string][] = [
  [
    "What should a local SEO report include?",
    "A short summary of what changed, Google Maps visibility across the service area (ideally a geo-grid heatmap compared with last month), the competitors that rank above the business and where, the work done this month, and the plan for next month. Keep raw data in an appendix; lead with what it means.",
  ],
  [
    "How do I create a local SEO report in GridBeacon?",
    "Run a scan, then open its report and download it as a PDF. That standard scan report is free and uses no credits. On paid plans you can also generate an AI Ranking Intelligence report for 100 credits, which explains the results in plain language and lists prioritised actions.",
  ],
  [
    "What is the difference between the scan report and the AI report?",
    "The standard scan report presents the scan's data: the heatmap, visibility, average rank, strongest and weakest zones, rank by distance and a competitor table. The AI Ranking Intelligence report interprets it: why the business is winning or losing, confirmed facts versus likely causes, prioritised actions and a client-ready summary.",
  ],
  [
    "Are GridBeacon reports white-label?",
    "No. Both reports carry GridBeacon's branding. You can send them to clients as they are, but not under your agency's own logo. If white-label reporting is essential, tools such as Local Falcon, BrightLocal and Local Viking offer it.",
  ],
  [
    "Can reports be sent to clients automatically?",
    "Not yet. Scans can run on a schedule and GridBeacon emails you when each one is ready, but you download and send the report yourself.",
  ],
  [
    "Can I export the data behind a report?",
    "Yes. You can export the grid points of a scan and your rank history as CSV files to use in your own spreadsheets or reporting tools.",
  ],
];

export default function LocalSeoReportPage() {
  return (
    <SeoLandingPage>
      <ProductPageStructuredData name="Local SEO Report" path={PATH} faqs={FAQS} />

      <Hero
        eyebrow="Local SEO reports"
        title="Local SEO Reports That Show Where You Rank on the Map"
        lede={
          <>
            A table of positions tells a client very little. A map of their
            service area, coloured by where they rank, tells them everything
            at a glance. GridBeacon turns every scan into a PDF report, and on
            paid plans an AI-written report that explains what is happening
            and what to do about it.
          </>
        }
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        primaryNote="No credit card required. Scan reports are free on every plan."
        secondary={{ label: "See the Report Template", href: "#template" }}
        facts={["Free scan report PDF", "AI report: 100 credits", "CSV exports"]}
        media={
          <ScreenshotPair>
            <Screenshot
              src={`${IMAGES}/ai-report-summary-20260919.webp`}
              width={778}
              height={1000}
              eager
              sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 100vw"
              alt="First page of a GridBeacon AI Ranking Intelligence report: the ranking story in one page"
            />
            <Screenshot
              src={`${IMAGES}/ai-report-geographic.webp`}
              width={837}
              height={1074}
              sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 100vw"
              alt="GridBeacon AI report page showing the shape of the business's visibility across its area"
            />
          </ScreenshotPair>
        }
      />

      <Section
        id="template"
        eyebrow="Report template"
        title="A Monthly Local SEO Report Template"
        intro={
          <p>
            Whatever tool you use, a local SEO report clients read has the
            same backbone. Use this order and keep each part short:
          </p>
        }
      >
        <Steps
          items={[
            { title: "The headline", body: "Two or three sentences: did map visibility go up or down, and why." },
            { title: "Visibility on the map", body: "This month's heatmap next to last month's, with visibility, average rank and map pack share." },
            { title: "The competition", body: "Who ranks above the business, where, and whether they gained or lost ground." },
            { title: "Work done and next steps", body: "What you changed this month, and the two or three priorities for next month." },
          ]}
        />
        <Note>
          Report the same keywords with the same grid, centre and radius every
          month. Otherwise the heatmaps change because the settings changed,
          not the rankings.
        </Note>
        <Toc
          items={[
            ["The standard scan report", "scan-report"],
            ["The AI Ranking Intelligence report", "ai-report"],
            ["Which report to send", "compare"],
            ["Reporting workflow", "workflow"],
            ["FAQ", "faq"],
          ]}
        />
      </Section>

      <Section
        id="scan-report"
        tone="tint"
        eyebrow="Free on every plan"
        title="The Standard Scan Report"
        intro={
          <p>
            Every completed scan has a report you can open in the browser or
            download as a PDF. It presents the data without interpretation and
            uses no credits.
          </p>
        }
      >
        <Split
          reverse
          media={
            <Screenshot
              src={`${IMAGES}/geo-grid-scan-dallas-20260919.webp`}
              width={1600}
              height={780}
              alt="A GridBeacon geo-grid heatmap of the kind shown in the standard scan report"
              caption="The heatmap at the centre of every scan report."
            />
          }
        >
          <Checklist
            items={[
              <><strong>Summary:</strong> keyword, scan date, grid setup, grid visibility, average rank, Google 3-pack share and best rank.</>,
              <><strong>Heatmap</strong> of the business&apos;s rank at every point.</>,
              <><strong>Rank tier distribution:</strong> how many points rank 1–3, 4–10, 11–20, 21+ or not at all.</>,
              <><strong>Proximity radius analysis:</strong> how rank changes with distance from the centre.</>,
              <><strong>Strongest and weakest grid zones.</strong></>,
              <><strong>Competitor overlap:</strong> each competitor&apos;s average rank, top-3 points, appearances, points ahead of you, reviews and strongest zone.</>,
            ]}
          />
        </Split>
      </Section>

      <Section
        id="ai-report"
        eyebrow="Paid plans · 100 credits"
        title="The AI Ranking Intelligence Report"
        intro={
          <p>
            For clients who want to know what the grid means, not just what it
            shows. The AI report reads the scan data and writes a report around
            evidence from it.
          </p>
        }
      >
        <Cards
          items={[
            { title: "Your ranking story in one page", body: "An executive summary a client can read in a minute." },
            { title: "The shape of your visibility", body: "Where the business is strong and weak across its area." },
            { title: "Who controls the local market?", body: "The competitors that matter, and why the business is losing where it is." },
            { title: "Facts, causes and unknowns", body: "Confirmed facts kept apart from likely causes and from what the data can't tell." },
            { title: "Prioritised actions with evidence", body: "What to do next, in order, each tied to something in the scan." },
            { title: "Results and proof", body: "Before, action, after: whether earlier work moved the rankings, plus a summary for the client." },
          ]}
        />
      </Section>

      <Section
        id="compare"
        tone="tint"
        eyebrow="Which one?"
        title="Scan Report vs AI Report"
      >
        <ComparisonTable
          label="GridBeacon's standard scan report compared with the AI Ranking Intelligence report"
          columns={["", "Standard scan report", "AI Ranking Intelligence report"]}
          rows={[
            ["Cost", "Free, no credits", "100 credits"],
            ["Plans", "Every plan", "Paid plans"],
            ["What it does", "Presents the scan's data", "Interprets the data and recommends actions"],
            ["Best for", "Your own analysis, data-minded clients", "Client meetings, monthly summaries, owners"],
            ["Format", "Browser view and PDF", "PDF"],
            ["Branding", "GridBeacon", "GridBeacon"],
          ]}
          caption="Neither report is white-label today."
        />
      </Section>

      <Section
        id="workflow"
        eyebrow="Workflow"
        title="A Local SEO Reporting Workflow That Runs Itself"
      >
        <Cards
          columns={2}
          items={[
            { title: "Schedule the scans", body: "Set each keyword to scan daily, weekly, biweekly or monthly. GridBeacon emails you when a scan is ready." },
            { title: "Check what moved", body: "Trend arrows show which points rose or fell, and scan history lets you compare any two dates." },
            { title: "Pick the report", body: "Download the free scan report, or generate an AI report when the client needs the story told." },
            { title: "Export the data", body: "CSV exports of grid points and rank history feed your own spreadsheets or dashboards." },
          ]}
        />
        <InlineCta>
          <TextLink href="/local-rank-tracker-for-agencies">GridBeacon for agencies</TextLink>
          {" · "}
          <TextLink href="/local-seo-competitor-analysis">Competitor analysis</TextLink>
          {" · "}
          <TextLink href="/what-is-a-geo-grid">What is a geo-grid?</TextLink>
        </InlineCta>
      </Section>

      <Section id="faq" tone="tint" eyebrow="FAQ" title="Local SEO Report Questions">
        <Faq items={FAQS.map(([question, answer]) => [question, <p key="a">{answer}</p>])} />
      </Section>

      <CtaBand
        title="Build Your First Local SEO Report"
        body="Scan a keyword on 500 free credits and download the report in minutes."
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        note="No credit card required."
        secondary={{ label: "View Pricing", href: "/pricing" }}
      />
    </SeoLandingPage>
  );
}
