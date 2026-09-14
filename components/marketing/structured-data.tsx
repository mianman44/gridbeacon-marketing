/*
 * Structured data for the public pages.
 *
 * Only what the pages themselves show. Organization, WebSite and
 * SoftwareApplication describe the company and the product; the
 * offers are the plan prices printed on /pricing and move whenever
 * those do. BreadcrumbList gives inner pages their place under the
 * home page.
 *
 * There is no Review, AggregateRating or FAQPage here on purpose.
 * Ratings a business publishes about itself are self-serving markup
 * that Google's guidelines exclude, and FAQ markup has to match
 * answers a visitor can read on the same page word for word.
 */

import { SITE_URL } from "@/lib/seo";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

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
            address: {
              "@type": "PostalAddress",
              addressLocality: "Pasrur, Sialkot",
              addressRegion: "Punjab",
              addressCountry: "PK",
            },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer support",
              email: "support@gridbeaconhq.com",
              url: `${SITE_URL}/contact`,
            },
          },
          {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: "GridBeacon",
            publisher: { "@id": ORGANIZATION_ID },
            inLanguage: "en",
          },
          {
            "@type": "SoftwareApplication",
            "@id": `${SITE_URL}/#software`,
            name: "GridBeacon",
            applicationCategory: "BusinessApplication",
            applicationSubCategory: "Local SEO rank tracking",
            operatingSystem: "Web browser",
            url: SITE_URL,
            publisher: { "@id": ORGANIZATION_ID },
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
          },
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
      }}
    />
  );
}
