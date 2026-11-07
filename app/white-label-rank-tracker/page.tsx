import type { Metadata } from "next";

import {
  Checklist,
  ComparisonTable,
  CtaBand,
  Faq,
  Hero,
  InlineCta,
  RelatedComparisons,
  Screenshot,
  Section,
  SeoLandingPage,
  Split,
  Steps,
  TextLink,
  Toc,
} from "@/components/marketing/seo-landing";
import { ProductPageStructuredData } from "@/components/marketing/structured-data";
import { GRIDBEACON } from "@/lib/competitors";
import { pageMetadata, SIGNUP_URL } from "@/lib/seo";

/*
 * White-label rank tracking, for agencies.
 *
 * What is built (Agency plan only, checked when saving AND rendering):
 * scan, keyword and location reports, online, as PDFs/ZIPs and through
 * /r/<token> share links, carry the workspace's logo (PNG/JPEG/WebP up
 * to 512 KB), header colour, phone, website and footer note. Share
 * links themselves work on any paid plan; the branding is Agency-only.
 *
 * What is NOT built, and the page says so: a client portal or client
 * logins, a custom domain, scheduled branded emails, white-label AI
 * Ranking Intelligence reports, an API. Do not add any of these to the
 * copy until they ship.
 */

const PATH = "/white-label-rank-tracker";
const IMAGES = "/marketing/google-maps-rank-tracker";
/* Real captures of scan 706 with the business and competitor names
   covered; see SCREENSHOT-SOURCES.md. They show GridBeacon's own
   header, so captions say what white label changes, never that these
   are branded. */
const WL = "/marketing/white-label";
const AGENCY = GRIDBEACON.plans[2];

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: "White Label Rank Tracker for Local SEO Agencies | GridBeacon",
  description:
    "White-label Google Maps rank tracking: geo-grid reports, PDFs and live client links with your logo, colours and contact details. Unlimited clients on the Agency plan.",
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
    "Does GridBeacon offer white-label rank tracking?",
    "Yes, on the Agency plan. Scan reports, keyword reports and location reports, whether viewed online, downloaded as PDFs or opened through a share link, show your agency's logo, header colour, phone number, website and footer note instead of GridBeacon's.",
  ],
  [
    "How much does the white-label plan cost?",
    `White label is part of the Agency plan: ${AGENCY[1]} a month, or ${AGENCY[2]} a month billed annually, with ${AGENCY[3]} scan credits a month and unlimited businesses, keywords and team members. There is no separate white-label fee and no per-client charge.`,
  ],
  [
    "Can clients see their reports without logging in?",
    "Yes. Create a share link for any scan, keyword or location report and send it to the client. They open it in a browser without an account and can print or save it as a PDF. Keyword and location report links always show the latest scans, a scan report link shows that scan, and you can revoke any link at any time. On the Agency plan the shared report carries your branding and nothing on it names GridBeacon.",
  ],
  [
    "Is there a client portal or client logins?",
    "No. Clients see their results through branded share links and PDFs, not through logins of their own. There is no client portal and no custom domain at the moment.",
  ],
  [
    "Are AI reports white-label too?",
    "Not yet. The AI Ranking Intelligence PDF still carries GridBeacon's branding. Scan, keyword and location reports are fully white-label on the Agency plan.",
  ],
  [
    "What happens to my branding if I change plan?",
    "Branding applies only while the workspace is on the Agency plan. If you move to a smaller plan, reports go back to GridBeacon's branding automatically, and your saved logo and colours come back if you return to Agency.",
  ],
  [
    "What can I brand?",
    "Your logo (PNG, JPEG or WebP, up to 512 KB; a wide logo on a transparent background works best), agency name, website, contact email, phone, a footer note and the header colour. Google's map attribution always stays on the map.",
  ],
];

export default function WhiteLabelRankTrackerPage() {
  return (
    <SeoLandingPage>
      <ProductPageStructuredData name="White Label Rank Tracker" path={PATH} />

      <Hero
        eyebrow="White-label rank tracking"
        title="A White-Label Rank Tracker for Local SEO Agencies"
        lede={
          <>
            Send clients Google Maps ranking reports that look like your
            agency made them. On the Agency plan, every geo-grid scan,
            keyword and location report, online, as a PDF or through a live
            link, carries your logo, colours and contact details. Unlimited
            clients, one flat price.
          </>
        }
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        primaryNote="No credit card required. New accounts get 500 free scan credits."
        secondary={{ label: "What Gets Branded", href: "#branded" }}
        facts={[`Agency plan from ${AGENCY[2]}/month`, "Unlimited clients", "Live client links"]}
        media={
          <Screenshot
            src={`${WL}/scan-report-page1-20261108.webp`}
            width={817}
            height={770}
            eager
            sizes="(min-width: 1240px) 600px, (min-width: 1024px) 50vw, 100vw"
            alt="Page one of a GridBeacon scan report for a Dallas coffee shop: header bar, visibility, average rank, 3-pack share and a 127-point ranking map"
            caption="A real scan report, business name hidden. On the Agency plan, your logo, name and colour replace the GridBeacon header bar."
          />
        }
      />

      <Section
        id="short-answer"
        eyebrow="The short answer"
        title="What White Label Means in GridBeacon"
      >
        <Split
          media={
            <Screenshot
              src={`${WL}/white-label-settings-20261108.webp`}
              width={857}
              height={874}
              sizes="(min-width: 1024px) 45vw, 100vw"
              alt="GridBeacon white-label settings: logo upload, agency name, website, contact email, phone, footer note, header colour and a live header preview"
              caption="The white-label settings, with a live preview of the report header."
            />
          }
        >
          <p>
            You run the scans; your clients see your brand. Upload a logo,
            enter your agency name, website, email and phone, pick a header
            colour and add a footer note once, and they appear on every scan, keyword and
            location report in the workspace.
          </p>
          <p>
            Clients get those reports as PDFs or as live links they open
            without an account. Because GridBeacon charges by scan credits,
            not by client, adding your twentieth client costs nothing extra
            beyond the scans you run for them.
          </p>
        </Split>
        <Toc
          items={[
            ["What gets branded", "branded"],
            ["How clients see reports", "sharing"],
            ["Agency plan", "pricing"],
            ["Set it up", "setup"],
            ["What is not included", "limits"],
            ["FAQ", "faq"],
          ]}
        />
      </Section>

      <Section
        id="branded"
        tone="tint"
        eyebrow="Your brand"
        title="What Carries Your Branding"
      >
        <ComparisonTable
          label="Which GridBeacon outputs are white-label on the Agency plan"
          columns={["", "White-label on Agency", "What it contains"]}
          rows={[
            ["Scan report", "Yes: online, PDF and share link", "The geo-grid heatmap, visibility, average rank, top-3 share and competitors"],
            ["Keyword report", "Yes: online, PDF and share link", "One keyword across every location, with change since the last scan"],
            ["Location report", "Yes: online, PDF and share link", "Every keyword for one business, with ARP, ATRP and SoLV"],
            ["Report ZIP downloads", "Yes", "Several scan reports at once"],
            ["AI Ranking Intelligence PDF", "No, GridBeacon-branded", "AI analysis of a scan"],
            ["Your dashboard", "No", "Your team's own workspace"],
          ]}
          caption={
            <>
              Branding fields: logo (PNG, JPEG or WebP up to 512 KB), agency
              name, website, contact email, phone, footer note and header
              colour. Google&apos;s map attribution always stays. See{" "}
              <TextLink href="/local-seo-report">the reports GridBeacon produces</TextLink>.
            </>
          }
        />
      </Section>

      <Section
        id="sharing"
        eyebrow="Client delivery"
        title="Two Ways Clients See Their Rankings"
      >
        <Split
          media={
            <Screenshot
              src={`${WL}/shared-report-link-20261108.webp`}
              width={850}
              height={1195}
              sizes="(min-width: 1024px) 40vw, 100vw"
              alt="A GridBeacon scan report opened from a share link, with a Print or save as PDF button above it"
              caption="A report opened from a share link, without white label. With it on, the bar reads Shared by and your agency name."
            />
          }
        >
          <p>
            <strong>Share links.</strong> Send a link to any scan, keyword or
            location report. The client opens it in a browser without an
            account and can print it or save it as a PDF. Keyword and
            location report links always show the latest scans; a scan
            report link shows that scan. You can revoke a link at any time.
            Share links work on every paid plan.
          </p>
          <p>
            <strong>White label on links.</strong>{" "}
            On the Agency plan the
            shared report carries your header, the bar above it reads
            &ldquo;Shared by&rdquo; and your agency name, and nothing on the
            page names GridBeacon.
          </p>
          <p>
            <strong>PDF reports.</strong> Download a branded PDF of a scan,
            keyword or location report to attach to your monthly client
            email, or a ZIP of several scans at once.
          </p>
        </Split>
      </Section>

      <Section
        id="pricing"
        tone="tint"
        eyebrow="Pricing"
        title="White Label Is Included in the Agency Plan"
        intro={
          <p>
            No setup fee, no per-client fee and no white-label add-on. You
            pay for scan credits, one per grid point.
          </p>
        }
      >
        <ComparisonTable
          label="GridBeacon plans and white label"
          columns={["", "Starter", "Professional", "Agency"]}
          rows={[
            ["Monthly price", GRIDBEACON.plans[0][1], GRIDBEACON.plans[1][1], AGENCY[1]],
            ["Billed annually", `${GRIDBEACON.plans[0][2]}/mo`, `${GRIDBEACON.plans[1][2]}/mo`, `${AGENCY[2]}/mo`],
            ["Credits a month", GRIDBEACON.plans[0][3], GRIDBEACON.plans[1][3], AGENCY[3]],
            ["Businesses and keywords", "Unlimited", "Unlimited", "Unlimited"],
            ["Client share links", "Yes, GridBeacon-branded", "Yes, GridBeacon-branded", "Yes, your branding"],
            ["White-label PDFs and reports", "No", "No", "Yes"],
          ]}
          caption={
            <>
              Prices in USD. Extra credits: {GRIDBEACON.topUps}. Full details
              on <TextLink href="/pricing">the pricing page</TextLink>.
            </>
          }
        />
        <p>
          What {AGENCY[3]} credits cover: a 7 × 7 grid uses 49 credits, so
          one keyword scanned weekly for a client uses about 210 credits a
          month. That is roughly 150 weekly keyword scans across your
          clients, before any top-ups.
        </p>
      </Section>

      <Section
        id="setup"
        eyebrow="Setup"
        title="Brand Your Reports in a Few Minutes"
      >
        <Steps
          items={[
            {
              title: "Choose the Agency plan",
              body: "Start free with 500 credits, then upgrade the workspace to Agency when you are ready to send branded reports.",
            },
            {
              title: "Add your brand",
              body: "In workspace settings, upload your logo and set your header colour, phone, website and footer note.",
            },
            {
              title: "Scan your clients",
              body: "Add each client's business from Google Maps and scan their keywords on the grid that fits their service area.",
            },
            {
              title: "Send the report",
              body: "Download a PDF or create a share link. Both show your branding, not GridBeacon's.",
            },
          ]}
        />
        <InlineCta>
          <TextLink href="/local-rank-tracker-for-agencies">GridBeacon for agencies</TextLink>
          {" · "}
          <TextLink href="/multi-location-rank-tracking">Multi-location tracking</TextLink>
        </InlineCta>
      </Section>

      <Section
        id="limits"
        tone="tint"
        eyebrow="Straight answer"
        title="What Is Not White-Label Yet"
        intro={<p>So there are no surprises after you upgrade:</p>}
      >
        <Split
          media={
            <Screenshot
              src={`${WL}/scan-report-competitors-20261108.webp`}
              width={812}
              height={548}
              alt="Page two of a GridBeacon scan report: a competitor table with average rank, top-3 points, appearances, points ahead and reviews"
              caption="Page two of every scan report: who holds the grid points. Names hidden here."
            />
          }
        >
          <Checklist
            items={[
              "No client portal or client logins: clients use share links and PDFs.",
              "No custom domain: share links open on GridBeacon's report address.",
              "No scheduled branded emails to clients yet: you send the PDF or link.",
              "AI Ranking Intelligence PDFs still carry GridBeacon's branding.",
              "No API for pulling ranking data into your own dashboards.",
            ]}
          />
        </Split>
        <RelatedComparisons current={PATH} />
      </Section>

      <Section id="faq" eyebrow="FAQ" title="White-Label Rank Tracking Questions">
        <Faq items={FAQS.map(([question, answer]) => [question, <p key="a">{answer}</p>])} />
      </Section>

      <CtaBand
        title="Send Rank Reports Under Your Own Brand"
        body="Start with 500 free credits, scan a client's business, and upgrade to Agency when you are ready to brand the reports."
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        note="No credit card required."
        secondary={{ label: "View Pricing", href: "/pricing" }}
      />
    </SeoLandingPage>
  );
}
