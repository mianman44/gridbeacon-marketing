/*
 * Structured data for the public pages.
 *
 * Only what the pages themselves show. Organization and WebSite
 * describe the company and live on the home page; SoftwareApplication
 * describes the product and is shared, with the same @id, by the
 * home page and the product landing pages, so search engines see one
 * product rather than several. Its offers are the plan prices
 * printed on /pricing and move whenever those do. BreadcrumbList
 * gives inner pages their place under the home page.
 *
 * There is no Review or AggregateRating here on purpose: ratings a
 * business publishes about itself are self-serving markup that
 * Google's guidelines exclude. The home page carries a FAQPage built
 * from the same list as its visible FAQ (home-faqs.ts). Google only
 * shows FAQ rich results for a few authoritative sites now, but the
 * markup is valid and other engines still read it.
 */

import { ALL_TUTORIALS, isoLength } from "@/lib/tutorials";
import { SITE_URL } from "@/lib/seo";
import { homeFaqSchema } from "@/components/marketing/home-faqs";
import { TEAM, type TeamMember } from "@/lib/team";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/* The company's official profiles, for Organization.sameAs. Add real
   URLs only -- each must be a profile GridBeacon actually controls. */
const SOCIAL_PROFILES: string[] = [
  // "https://www.linkedin.com/company/<gridbeacon>",
  // "https://x.com/<gridbeacon>",
  "https://www.youtube.com/@GridBeacon",
];

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Serialised rather than templated, and "<" escaped, so
      // nothing in the copy can close the script tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/* A landing page's FAQ, built from the visible accordion so the two
   cannot drift apart. */
export function FaqStructuredData({ items }: { items: [string, string][] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      }}
    />
  );
}

/* The question/answer pairs of a Stitch page's FAQ section, read from
   the same markup string the page renders, so the FAQPage schema
   always matches what visitors see. The section starts at its
   "Frequently asked questions" heading; each question is an h3/h4 and
   its answer the next .faq-answer div or paragraph. */
export function faqsFromMarkup(html: string): [string, string][] {
  const start = html.search(/Frequently Asked Questions/i);
  if (start < 0) return [];
  const section = html.slice(start, html.indexOf("</section>", start));
  const text = (fragment: string) => fragment.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return [...section.matchAll(/<h[34][^>]*>([\s\S]*?)<\/h[34]>[\s\S]*?<(?:div class="faq-answer[^"]*"|p[^>]*)>([\s\S]*?)<\/(?:div|p)>/g)]
    .map(([, question, answer]) => [text(question), text(answer)]);
}

function softwareApplication() {
  return {
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: "GridBeacon",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Local SEO rank tracking",
    operatingSystem: "Web browser",
    url: SITE_URL,
    publisher: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "GridBeacon",
      url: SITE_URL,
    },
    description:
      "Geo-grid rank tracking for Google Business Profiles. GridBeacon checks Google Maps positions at every point of a grid across a service area and shows the result as a heatmap, with competitor grids and scan history.",
    featureList: [
      "Geo-grid scans from 3 x 3 up to 21 x 21",
      "Google Maps ranking heatmaps",
      "Competitor grids from the same scan",
      "Scan history",
      "Scheduled scans on paid plans",
      "AI Ranking Intelligence reports on paid plans",
      "Rank MRI point-by-point ranking investigation on paid plans",
    ],
    offers: [
      ["Free", "0"],
      ["Starter", "19.99"],
      ["Professional", "34.99"],
      ["Agency", "69.99"],
    ].map(([name, price]) => ({
      "@type": "Offer",
      name,
      price,
      priceCurrency: "USD",
      // Every price but Free is per month.
      ...(price === "0" ? {} : {
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price,
          priceCurrency: "USD",
          unitCode: "MON",
          unitText: "month",
        },
      }),
      url: `${SITE_URL}/pricing`,
    })),
  };
}

/* A founder as a Person, tied to the company by @id. */
function person(member: TeamMember) {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/about#${member.name.toLowerCase().replace(/[^a-z]+/g, "-")}`,
    name: member.name,
    jobTitle: member.role,
    ...(member.photo ? { image: `${SITE_URL}${member.photo.src}` } : {}),
    ...(member.profiles.length ? { sameAs: member.profiles.map(({ url }) => url) } : {}),
    worksFor: { "@type": "Organization", "@id": ORGANIZATION_ID, name: "GridBeacon" },
  };
}

function breadcrumb(name: string, path: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: `${SITE_URL}${path}`,
      },
    ],
  };
}

export function HomeStructuredData() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": ORGANIZATION_ID,
            name: "GridBeacon",
            url: SITE_URL,
            logo: `${SITE_URL}/branding/gridbeacon-mark.png`,
            description:
              "GridBeacon is a Google Maps geo-grid rank tracking platform for Google Business Profiles.",
            parentOrganization: {
              "@type": "Organization",
              name: "Hustle 24/7",
            },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer support",
              email: "founder@gridbeaconhq.com",
              url: `${SITE_URL}/contact`,
            },
            sameAs: SOCIAL_PROFILES,
            founder: TEAM.map(person),
          },
          {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: "GridBeacon",
            publisher: { "@type": "Organization", "@id": ORGANIZATION_ID, name: "GridBeacon", url: SITE_URL },
            inLanguage: "en",
          },
          softwareApplication(),
          {
            ...homeFaqSchema(),
            "@id": `${SITE_URL}/#faq`,
          },
        ],
      }}
    />
  );
}

/* A commercial landing page for the product: the shared
   SoftwareApplication node plus its breadcrumb. The page's FAQPage
   comes from the visible <Faq> accordion, so it is not repeated here. */
export function ProductPageStructuredData({
  name,
  path,
  article,
}: {
  name: string;
  path: string;
  /* For explainer pages: an Article node naming GridBeacon as author
     and publisher. dateModified should move with real edits only. */
  article?: { headline: string; description: string; dateModified: string };
}) {
  const graph: object[] = [softwareApplication(), breadcrumb(name, path)];
  if (article) {
    graph.push({
      "@type": "Article",
      "@id": `${SITE_URL}${path}#article`,
      headline: article.headline,
      description: article.description,
      dateModified: article.dateModified,
      mainEntityOfPage: `${SITE_URL}${path}`,
      inLanguage: "en",
      author: { "@type": "Organization", "@id": ORGANIZATION_ID, name: "GridBeacon", url: SITE_URL },
      publisher: { "@type": "Organization", "@id": ORGANIZATION_ID, name: "GridBeacon", url: SITE_URL },
      about: { "@id": `${SITE_URL}/#software` },
    });
  }

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": graph,
      }}
    />
  );
}

/* The tutorial library, so each video can appear in video results. */
export function TutorialsStructuredData() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          breadcrumb("Tutorials", "/tutorials"),
          {
            "@type": "ItemList",
            name: "GridBeacon Tutorials",
            itemListElement: ALL_TUTORIALS.map((tutorial, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "VideoObject",
                name: tutorial.title,
                description: tutorial.summary,
                thumbnailUrl: `https://i.ytimg.com/vi/${tutorial.id}/hqdefault.jpg`,
                uploadDate: tutorial.uploadDate,
                duration: isoLength(tutorial.seconds),
                contentUrl: `https://www.youtube.com/watch?v=${tutorial.id}`,
                embedUrl: `https://www.youtube-nocookie.com/embed/${tutorial.id}`,
              },
            })),
          },
        ],
      }}
    />
  );
}

/* The blog index: a Blog node listing every post. */
export function BlogStructuredData({
  posts,
}: {
  posts: readonly { slug: string; title: string; description: string; date: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          breadcrumb("Blog", "/blog"),
          {
            "@type": "Blog",
            "@id": `${SITE_URL}/blog#blog`,
            name: "GridBeacon Blog",
            url: `${SITE_URL}/blog`,
            inLanguage: "en",
            publisher: { "@type": "Organization", "@id": ORGANIZATION_ID, name: "GridBeacon", url: SITE_URL },
            blogPost: posts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              description: post.description,
              datePublished: post.date,
              url: `${SITE_URL}/blog/${post.slug}`,
            })),
          },
        ],
      }}
    />
  );
}

/* The free rank checker: a tool anyone can use without an account. */
export function FreeRankCheckerStructuredData() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          breadcrumb("Google Maps Rank Checker", "/google-maps-rank-checker"),
          {
            "@type": "WebApplication",
            "@id": `${SITE_URL}/google-maps-rank-checker#tool`,
            name: "Free Google Maps Rank Checker",
            url: `${SITE_URL}/google-maps-rank-checker`,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web browser",
            isAccessibleForFree: true,
            description:
              "Checks a business's Google Maps position at 9 points (a 3 × 3 grid) around it for one keyword, free and without an account.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            provider: { "@type": "Organization", "@id": ORGANIZATION_ID, name: "GridBeacon", url: SITE_URL },
          },
        ],
      }}
    />
  );
}

/* /about: the page, its place under home, and the founders. */
export function AboutStructuredData() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          breadcrumb("About", "/about"),
          {
            "@type": "AboutPage",
            "@id": `${SITE_URL}/about#page`,
            url: `${SITE_URL}/about`,
            name: "About GridBeacon",
            about: { "@id": ORGANIZATION_ID },
          },
          ...TEAM.map(person),
        ],
      }}
    />
  );
}

export function BreadcrumbStructuredData({
  name,
  path,
}: {
  name: string;
  path: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        ...breadcrumb(name, path),
      }}
    />
  );
}
