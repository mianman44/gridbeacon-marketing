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
 * Rank MRI.
 *
 * Facts checked against the app (backend docs/RANK_MRI.md):
 * - Paid plans only (plan_entitlements.enforce_rank_mri_access).
 *   Analysis uses no credits. A rescan costs normal scan credits.
 * - AI explanations have a monthly allowance per plan. The numbers are
 *   deliberately not printed here until they are confirmed.
 * - White-label applies to its PDFs on the Agency plan.
 * - It writes nothing to a Google Business Profile or a website.
 * - Scans from before it launched have no competitor locations or
 *   categories, so those comparisons need a new scan.
 *
 * The wording is the product's own rule: evidence, never Google's
 * reasons. Nothing here says "why you rank", "the cause", "proven" or
 * "guaranteed", and experiments report what happened after a change,
 * not that the change caused it. Keep it that way in every edit.
 *
 * Screenshots are of a fictional demo business and are captioned so.
 */

const PATH = "/rank-mri";
const IMAGES = "/marketing/rank-mri";

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: "Rank MRI: Investigate Weak Google Maps Rankings | GridBeacon",
  description:
    "Click any point on your Google Maps heatmap to see who outranks you, what is different and what to check first. Group weak areas into tasks and track what changes.",
  absoluteTitle: true,
});

const FAQS: [string, string][] = [
  [
    "What is Rank MRI?",
    "Rank MRI is a way of investigating a completed GridBeacon scan. Click any point on the heatmap to see who ranks there, how you compare with them and what is worth checking. It also groups weak points into issues you can assign, and tracks what happens after you make a change.",
  ],
  [
    "Does Rank MRI tell me why I rank where I do?",
    "No tool outside Google can know that. Rank MRI shows what was observed, what it might mean, why it is not proof, and how to check. Every finding keeps those apart, and shows how strong the evidence is.",
  ],
  [
    "Does it use my scan credits?",
    "No. Rank MRI analyzes scans you have already run, on any paid plan, so opening a point or an issue uses no credits. If you run a new scan to check a change, that scan uses your normal credits.",
  ],
  [
    "Does GridBeacon change my Google Business Profile?",
    "No. Rank MRI is an analysis and planning tool, and it needs no access to your profile. Tasks record work your team plans to do. You make any changes yourself.",
  ],
  [
    "Will it work on my existing scans?",
    "Yes, with less detail. Rankings, competitors, reviews and ratings work on existing scans. Competitor distance and category comparisons need a scan run after Rank MRI launched, and it tells you when something could not be compared.",
  ],
  [
    "Why does a competitor show \"Distance unavailable\"?",
    "Distance needs a public address. Service-area businesses often hide theirs, and the map marker for a hidden address is not where the business is, so Rank MRI shows no number rather than a guess.",
  ],
  [
    "Can I compare two scans?",
    "Yes, when they asked the same question: the same keyword, grid, radius and search settings, at matching locations. If two scans differ, Rank MRI says how and shows no comparison, because the difference would not be a real change.",
  ],
  [
    "Does the AI write the findings?",
    "No. Every finding is calculated from your scan first, and works with no AI at all. AI can then explain the evidence in plain English. That explanation is checked against the evidence, and if it fails the calculated findings are shown instead.",
  ],
  [
    "Can I send the results to a client?",
    "Yes. You can download a PDF for a single point, one issue, or the whole scan, including completed work and experiment results. On the Agency plan, these reports carry your own branding.",
  ],
];

export default function RankMriPage() {
  return (
    <SeoLandingPage>
      <ProductPageStructuredData name="Rank MRI" path={PATH} faqs={FAQS} />

      <Hero
        eyebrow="Rank MRI"
        title="See What's Different Where You Rank Poorly"
        lede={
          <>
            A heatmap shows where you are weak. Rank MRI helps you work out what
            to look at next. Click any point to see who outranks you there and
            how you compare, then turn weak areas into a plan your team can
            work through.
          </>
        }
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        primaryNote="Rank MRI is included on every paid plan. It uses no credits."
        secondary={{ label: "See How It Works", href: "#how" }}
        facts={["Works from your existing scans", "No credits to analyze", "No profile access needed"]}
        media={
          <Screenshot
            src={`${IMAGES}/rank-mri-issues.webp`}
            width={1600}
            height={982}
            eager
            sizes="(min-width: 1240px) 700px, (min-width: 1024px) 56vw, 100vw"
            alt="GridBeacon heatmap with the Rank MRI panel open, one weak zone highlighted on the map and summary cards beside it"
            caption="Example data: a fictional business and competitors."
          />
        }
      />

      <Section
        id="what"
        eyebrow="What it shows"
        title="From a Red Pin to Something You Can Act On"
        intro={
          <p>
            Every finding is worked out from your scan before any AI is
            involved, and says how strong the evidence is.
          </p>
        }
      >
        <Cards
          items={[
            { title: "Every point, explained", body: "Your rank, who is ahead of you, their reviews, ratings and categories, and how the point has moved." },
            { title: "Issues, not 49 red pins", body: "Neighbouring points with the same pattern become one issue, so your team gets one job instead of dozens." },
            { title: "Next wins", body: "Points where you sit at #4-6, just outside the top 3, shown as candidates to investigate." },
            { title: "Competitor movement", body: "Which listings have moved ahead of you, and where, between two comparable scans." },
            { title: "Keyword gaps", body: "Places where you rank well for one keyword and poorly for a related one at the same location." },
            { title: "Evidence you can check", body: "Each finding shows what was observed, what it might mean, why it is not proof and how to verify it." },
          ]}
        />
        <Toc
          items={[
            ["How it works", "how"],
            ["Reading a finding", "findings"],
            ["Tasks and experiments", "work"],
            ["Client reports", "reports"],
            ["Heatmap or Rank MRI?", "compare"],
            ["FAQ", "faq"],
          ]}
        />
      </Section>

      <Section id="how" tone="tint" eyebrow="How it works" title="From Scan to Plan in Four Steps">
        <Steps
          items={[
            { title: "Open a completed scan", body: "Choose Rank MRI on the heatmap. The analysis is usually waiting for you, and it uses no credits." },
            { title: "Click a point or an issue", body: "See who ranks there and what is different, or start with the issues list, highest priority first." },
            { title: "Create a task", body: "Turn an issue into work with an owner, a due date, notes and files. Points in the same issue share one task." },
            { title: "Record the change, then rescan", body: "Log what you did and when. Later scans of the same grid are measured against how things looked before." },
          ]}
        />
      </Section>

      <Section
        id="findings"
        eyebrow="Reading a finding"
        title="Evidence First, Not a Black Box"
        intro={
          <p>
            Rankings have many causes, and nobody outside Google can see them.
            So Rank MRI never presents a guess as a fact.
          </p>
        }
      >
        <Split
          media={
            <ScreenshotPair>
              <Screenshot
                src={`${IMAGES}/rank-mri-why.webp`}
                width={780}
                height={1440}
                sizes="(min-width: 1024px) 26vw, 50vw"
                alt="Rank MRI finding with sections for observed evidence, possible interpretation, why this is not proof and recommended validation"
                caption="Example data: a fictional business."
              />
              <Screenshot
                src={`${IMAGES}/rank-mri-competitors.webp`}
                width={780}
                height={1440}
                sizes="(min-width: 1024px) 26vw, 50vw"
                alt="Rank MRI competitor list for one grid point, with rating, reviews, distance and movement since the last comparable scan"
                caption="Example data: fictional competitors."
              />
            </ScreenshotPair>
          }
        >
          <Checklist
            items={[
              <><strong>Observed evidence:</strong> the facts from your scan.</>,
              <><strong>Possible interpretation:</strong> what it might mean, in plain English.</>,
              <><strong>Why this is not proof:</strong> what the evidence cannot show.</>,
              <><strong>Recommended validation:</strong> how to check before you act.</>,
            ]}
          />
          <Note>
            &quot;Not found in top 40&quot; stays exactly that. Rank MRI never
            turns a missing result into a rank, and a failed point is reported
            as a measurement problem rather than a ranking one.
          </Note>
        </Split>
      </Section>

      <Section id="work" tone="tint" eyebrow="Tasks and experiments" title="Keep the Work and the Results Together">
        <Cards
          columns={2}
          items={[
            { title: "SEO tasks", body: "Assign an issue to a teammate with a priority, due date, comments and files. Every change is kept in an activity log." },
            { title: "Priorities you can edit", body: "Issues are ordered by a score you can open up and adjust. It shows what to look at first, not a chance of success." },
            { title: "Experiments", body: "Record what you changed and when, choose target points, and add comparison points you do not expect to move." },
            { title: "Before and after", body: "Later scans of the same grid are compared location by location, with a note of anything that weakens the comparison." },
          ]}
        />
        <Note>
          Experiments show what happened after a change, not that the change
          caused it. Rankings move for many reasons, so comparison points show
          whether the whole area moved anyway.
        </Note>
      </Section>

      <Section
        id="reports"
        eyebrow="Client reports"
        title="Evidence You Can Hand to a Client"
        intro={
          <p>
            Download a PDF for a single point, one issue or the whole scan, with
            the map, the findings, the work done and the limits of the evidence.
          </p>
        }
      >
        <Checklist
          items={[
            <>Point, issue and full-scan reports, each fixed at the moment you create it.</>,
            <>Your completed tasks and experiment results alongside the findings.</>,
            <>Your own logo and colours on the Agency plan, through <TextLink href="/local-seo-report">white-label reports</TextLink>.</>,
          ]}
        />
      </Section>

      <Section id="compare" tone="tint" eyebrow="Heatmap or Rank MRI?" title="What Rank MRI Adds to the Heatmap">
        <ComparisonTable
          label="What the GridBeacon heatmap shows compared with what Rank MRI adds"
          columns={["", "Heatmap", "Heatmap with Rank MRI"]}
          rows={[
            ["Question it answers", "Where do I rank?", "What is different here, and what should I check?"],
            ["At each point", "Your rank and the businesses in the results", "Adds findings, distance, category and movement comparisons"],
            ["Across the grid", "A map of positions", "Adds grouped issues, next wins and competitor movement"],
            ["After you act", "Compare with an earlier scan", "Adds tasks, recorded changes and before-and-after results"],
            ["Plans", "Every plan", "Paid plans"],
          ]}
          caption="Rank MRI adds to the heatmap and changes nothing about how scans work or what they cost."
        />
        <InlineCta>
          <TextLink href="/pricing">Pricing and credits</TextLink>
          {" · "}
          <TextLink href="/local-seo-competitor-analysis">Competitor analysis</TextLink>
          {" · "}
          <TextLink href="/blog/why-google-maps-rankings-dropped">Why rankings drop</TextLink>
        </InlineCta>
      </Section>

      <Section id="faq" eyebrow="FAQ" title="Rank MRI Questions">
        <Faq items={FAQS.map(([question, answer]) => [question, <p key="a">{answer}</p>])} />
      </Section>

      <CtaBand
        title="Stop Guessing What to Look at Next"
        body="Create a free account, run a scan, and open Rank MRI on any paid plan."
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        note="No credit card required to sign up."
        secondary={{ label: "View Pricing", href: "/pricing" }}
      />
    </SeoLandingPage>
  );
}
