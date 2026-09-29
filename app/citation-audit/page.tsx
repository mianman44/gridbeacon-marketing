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
 * Citation Audit.
 *
 * Facts checked against the app (backend services/citation_*):
 * - 300 credits per audit (feature_credit_service.CITATION_AUDIT_CREDITS),
 *   paid plans only (plan_entitlements.enforce_citation_audit_access),
 *   refunded in full when an audit fails or is stopped.
 * - US only (app/data/citation_directories/us.json). A business is
 *   checked on the directories relevant to its trade: 62-72 of them
 *   (measured per category), hence "60+".
 * - It audits; it does not create, submit or sync listings. Where no
 *   listing is confidently found the result is "Not Detected", never
 *   "missing".
 * The hero visual is an illustration with a made-up business, labelled
 * as such, not a screenshot of a real audit.
 */

const PATH = "/citation-audit";

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: "Citation Audit: Find Business Listings With the Wrong Details | GridBeacon",
  description:
    "Audit your business listings on 60+ US directories. Find wrong phone numbers, old addresses and duplicate listings, with a Citation Health score. 300 credits per audit.",
  absoluteTitle: true,
});

const FAQS: [string, string][] = [
  [
    "What is a citation audit?",
    "A citation is any listing of your business name, address, phone number and website on another site: a directory, a map, a review site. A citation audit finds those listings and checks whether each one matches your correct details, so you know which to fix.",
  ],
  [
    "Which directories does GridBeacon check?",
    "60+ US directories, maps and review sites, chosen for your business's trade: Google, Apple Maps, Bing, Yelp, BBB, Facebook, YellowPages and MapQuest for every business, plus directories such as Angi and HomeAdvisor for home services, Avvo and FindLaw for lawyers, or Healthgrades and Zocdoc for healthcare.",
  ],
  [
    "How much does a Citation Audit cost?",
    "Each audit uses 300 credits from your plan's monthly credits, on any paid plan. If an audit cannot finish, or you stop it, the credits are refunded in full.",
  ],
  [
    "Does GridBeacon fix my listings?",
    "No. The audit shows which listings are wrong, what they show and what they should show, with a link to each one. You update them on each directory's own site, or with your listing provider. GridBeacon does not submit or sync listings.",
  ],
  [
    "What does Not Detected mean?",
    "That GridBeacon could not confidently find a listing for your business on that directory. It does not mean you have none; some sites are hard to search. Important directories where nothing was found are listed as opportunities to check.",
  ],
  [
    "How often should I run one?",
    "About once a month. Listings change slowly, so a monthly audit shows what changed, new duplicates included, without paying to see the same results twice. Every audit is kept in your history.",
  ],
  [
    "Does it work for service-area businesses?",
    "Yes. For a business that hides its address, listings are compared on name, phone, website and town, and are not marked down for hiding a street address.",
  ],
];

/* A labelled illustration: a made-up business and made-up results in the
   shape of the app's results screen. */
function CitationAuditIllustration() {
  const segments = [
    { label: "Accurate", count: 11, dot: "bg-emerald-500" },
    { label: "Issues", count: 3, dot: "bg-rose-500" },
    { label: "Duplicates", count: 1, dot: "bg-violet-500" },
    { label: "Not Detected", count: 57, dot: "bg-slate-300" },
  ];
  const rows = [
    { name: "Yelp", status: "Accurate", tone: "bg-emerald-50 text-emerald-700 border-emerald-200", detail: "Matches your information" },
    { name: "BBB", status: "Needs Attention", tone: "bg-amber-50 text-amber-700 border-amber-200", detail: "Address: 120 Oak St → 120 Oak St, Ste 4" },
    { name: "Nextdoor", status: "Major Inconsistency", tone: "bg-rose-50 text-rose-700 border-rose-200", detail: "Phone: (555) 010-4411 → (555) 010-2200" },
    { name: "Yelp", status: "Possible Duplicate", tone: "bg-violet-50 text-violet-700 border-violet-200", detail: "Second listing at an old address" },
  ];
  return (
    <figure className="m-0">
      <div
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]"
        aria-label="Illustration of a Citation Audit result for a made-up business"
        role="img"
      >
        <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-[7px] border-amber-400 border-l-slate-100">
            <span className="text-xl font-extrabold text-slate-900">
              68<span className="text-[10px] font-medium text-slate-400">/100</span>
            </span>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Northside Plumbing (example)</div>
            <div className="text-2xl font-extrabold text-slate-900">
              14 <span className="text-sm font-medium text-slate-500">of 72 directories listed</span>
            </div>
            <div className="text-xs font-semibold text-rose-600">3 listings need correcting</div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {segments.map((segment) => (
            <div key={segment.label}>
              <div className="flex items-center gap-1 text-[10px] font-medium text-slate-500">
                <span className={`h-2 w-2 rounded-full ${segment.dot}`} /> {segment.label}
              </div>
              <div className="pl-3 text-base font-bold text-slate-900">{segment.count}</div>
            </div>
          ))}
        </div>
        <ul className="mt-3 divide-y divide-slate-100 rounded-lg border border-slate-100">
          {rows.map((row) => (
            <li key={row.name + row.status} className="flex items-center gap-3 px-3 py-2">
              <span className="w-16 shrink-0 text-xs font-bold text-slate-900">{row.name}</span>
              <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${row.tone}`}>{row.status}</span>
              <span className="truncate text-[11px] text-slate-500">{row.detail}</span>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="mt-2 text-center text-xs text-slate-500">
        Illustration with a made-up business, not a real audit.
      </figcaption>
    </figure>
  );
}

export default function CitationAuditPage() {
  return (
    <SeoLandingPage>
      <ProductPageStructuredData name="Citation Audit" path={PATH} faqs={FAQS} />

      <Hero
        eyebrow="Citation Audit"
        title="Find Every Listing That Shows the Wrong Details"
        lede={
          <>
            Old phone numbers, a suite number left off, a business name from three years
            ago: listings drift, and customers end up at the wrong door.
            GridBeacon checks your business on 60+ US directories, maps and
            review sites, and shows exactly which listings are wrong, what they
            say and what they should say.
          </>
        }
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        primaryNote="Citation Audit is included on every paid plan: 300 credits per audit."
        secondary={{ label: "See What It Checks", href: "#checks" }}
        facts={["60+ US directories", "300 credits per audit", "Refunded if it can't finish"]}
        media={<CitationAuditIllustration />}
      />

      <Section
        id="checks"
        eyebrow="What it checks"
        title="Four Checks in Every Citation Audit"
        intro={
          <p>
            Each audit compares every listing it finds with the business details
            you confirm, and scores the result.
          </p>
        }
      >
        <Cards
          items={[
            { title: "Directory coverage", body: "Where your business is listed across the 60+ directories that matter for your trade." },
            { title: "NAP consistency", body: "Name, address, phone and website on each listing, compared with yours; each difference shown as listed versus correct." },
            { title: "Duplicate listings", body: "Places where a directory seems to list your business twice, often at an old address." },
            { title: "Citation opportunities", body: "Important directories where no listing for your business was confidently found." },
          ]}
        />
        <Note>
          Every audit ends with a Citation Health score out of 100, from how
          many important directories list you (coverage) and how accurate those
          listings are (accuracy).
        </Note>
        <Toc
          items={[
            ["How it works", "how"],
            ["Where it looks", "directories"],
            ["What the results mean", "results"],
            ["Audit or listing management?", "compare"],
            ["FAQ", "faq"],
          ]}
        />
      </Section>

      <Section id="how" tone="tint" eyebrow="How it works" title="From Confirmed Details to a Fix List in Minutes">
        <Steps
          items={[
            { title: "Confirm your details", body: "GridBeacon reads your Google Business Profile. Check the name, address, phone and website, edit anything that is out of date, and confirm." },
            { title: "Launch the audit", body: "It usually takes a few minutes. You can leave the page; you get a notification and an email when it is ready." },
            { title: "Review the results", body: "A health score, every directory with its status, issues ranked Critical, High and Medium, duplicates and opportunities." },
            { title: "Fix, then re-check", body: "Update each listing on its own site using the details shown, then run a new audit next month to confirm." },
          ]}
        />
      </Section>

      <Section
        id="directories"
        eyebrow="Where it looks"
        title="60+ Directories, Chosen for Your Trade"
        intro={
          <p>
            Every business is checked on the maps, review sites and general
            directories that matter everywhere, plus the ones for its industry.
          </p>
        }
      >
        <Split
          media={
            <Checklist
              items={[
                <><strong>Maps:</strong> Google Business Profile, Apple Maps, Bing Places, MapQuest, Foursquare.</>,
                <><strong>Reviews:</strong> Yelp, Better Business Bureau, Trustpilot, Birdeye.</>,
                <><strong>Social:</strong> Facebook, Nextdoor, LinkedIn, Instagram.</>,
                <><strong>Directories:</strong> YellowPages, Manta, ChamberofCommerce.com, Superpages and more.</>,
              ]}
            />
          }
        >
          <Checklist
            items={[
              <><strong>Home services:</strong> Angi, HomeAdvisor, Houzz, Thumbtack, Porch.</>,
              <><strong>Legal:</strong> Avvo, FindLaw, Justia, Martindale-Hubbell.</>,
              <><strong>Healthcare:</strong> Healthgrades, Zocdoc, Vitals.</>,
              <><strong>Restaurants, automotive, real estate</strong> and more have their own sets.</>,
            ]}
          />
        </Split>
        <Note>Citation Audit covers US businesses today.</Note>
      </Section>

      <Section id="results" tone="tint" eyebrow="Reading the results" title="What Each Result Means">
        <Cards
          columns={2}
          items={[
            { title: "Accurate", body: "The listing matches your confirmed details." },
            { title: "Needs Attention", body: "A detail differs, such as a suite number left off or a variation of your name." },
            { title: "Major Inconsistency", body: "A detail is clearly wrong, such as another phone number or an old address." },
            { title: "Possible Duplicate", body: "The directory seems to list your business more than once." },
            { title: "Not Detected", body: "No listing was confidently found. That does not mean there is none." },
            { title: "Unable to Verify", body: "A listing was found, but its details could not be read well enough to compare." },
          ]}
        />
      </Section>

      <Section id="compare" eyebrow="Audit or management?" title="Citation Audit vs Listing Management Tools">
        <ComparisonTable
          label="GridBeacon's Citation Audit compared with listing management tools"
          columns={["", "GridBeacon Citation Audit", "Listing management tools"]}
          rows={[
            ["What it does", "Finds your listings and explains what is wrong", "Pushes your details to partner directories"],
            ["Fixing listings", "You update each one; the audit shows where and what", "Automatic on the provider's network"],
            ["Pricing", "300 credits per audit, on your plan", "Usually a monthly fee per location"],
            ["Best for", "Knowing where you stand, and checking fixes stuck", "Hands-off updates across many sites"],
          ]}
          caption="Many teams use both: an audit shows what a listing service missed."
        />
        <InlineCta>
          <TextLink href="/pricing">Pricing and credits</TextLink>
          {" · "}
          <TextLink href="/local-seo-report">Local SEO reports</TextLink>
          {" · "}
          <TextLink href="/local-rank-tracker-for-agencies">GridBeacon for agencies</TextLink>
        </InlineCta>
      </Section>

      <Section id="faq" tone="tint" eyebrow="FAQ" title="Citation Audit Questions">
        <Faq items={FAQS.map(([question, answer]) => [question, <p key="a">{answer}</p>])} />
      </Section>

      <CtaBand
        title="See Which Listings Are Costing You Customers"
        body="Create a free account, pick a paid plan when you are ready, and run your first Citation Audit in minutes."
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        note="No credit card required to sign up."
        secondary={{ label: "View Pricing", href: "/pricing" }}
      />
    </SeoLandingPage>
  );
}
