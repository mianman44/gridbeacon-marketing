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

import { SITE_URL } from "@/lib/seo";
import { homeFaqSchema } from "@/components/marketing/home-faqs";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/* The company's official profiles, for Organization.sameAs. Add real
   URLs only -- each must be a profile GridBeacon actually controls. */
const SOCIAL_PROFILES: string[] = [
  // "https://www.linkedin.com/company/<gridbeacon>",
  // "https://x.com/<gridbeacon>",
  // "https://www.youtube.com/@<gridbeacon>",
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
      url: `${SITE_URL}/pricing`,
    })),
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
          },
          {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: "GridBeacon",
            publisher: { "@id": ORGANIZATION_ID },
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
   SoftwareApplication node plus its breadcrumb. */
export function ProductPageStructuredData({
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
        "@graph": [softwareApplication(), breadcrumb(name, path)],
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
