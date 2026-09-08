/*
 * Structured data for the home page.
 *
 * Three types, and deliberately not a fourth. Organization and
 * SoftwareApplication describe the company and the product;
 * FAQPage marks up questions that are already visible on the page,
 * which is the condition Google sets for using it.
 *
 * There is no Review or AggregateRating here on purpose. A
 * business publishing machine-readable star ratings about itself
 * is self-serving markup, which Google's guidelines exclude and
 * which is ignored at best. The testimonials are rendered for
 * readers, not for crawlers.
 */

const SITE = "https://gridbeaconhq.com";

/* Kept in step with the FAQ rendered on the page. Marking up an
   answer a visitor cannot see is exactly what the guidance
   forbids, so these strings must match. */
export const HOME_FAQS: Array<[string, string]> = [
  [
    "What is a geo-grid scan?",
    "Google shows different results depending on where the searcher is standing. A geo-grid scan checks your ranking from a grid of points across your service area, so instead of one number you get a map: the streets where you come up first, and the ones where you do not appear at all.",
  ],
  [
    "How much does a scan cost?",
    "One credit per grid point. A 5 × 5 grid is 25 credits, a 9 × 9 is 81. You can see the exact cost before you run it, and remove any points outside your service area to bring it down.",
  ],
  [
    "What do I get for free?",
    "500 scan credits when you create an account, with no card required. That covers a 21 × 21 scan, or twenty 5 × 5 scans, or anything in between. The free plan tracks one business and three keywords.",
  ],
  [
    "How large can a grid be?",
    "From 3 × 3 up to 21 × 21, at any radius from a tenth of a mile to a hundred miles. Larger grids show more detail near the edges of your service area; smaller ones cost less and scan faster.",
  ],
  [
    "Can I see what competitors rank for?",
    "Yes. Every scan already records the whole local pack at each point, so competitor grids come from the scan you have already run. Opening one costs nothing extra.",
  ],
  [
    "Do you work outside the United States?",
    "Yes. Scans are run against Google Maps results for the coordinates you choose, so any location Google covers will work.",
  ],
];

export function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        name: "GridBeacon",
        url: SITE,
        logo: `${SITE}/branding/gridbeacon-mark.png`,
        description:
          "GridBeacon is a local search rank tracking platform that maps Google Business Profile rankings across geographic grids.",
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
          url: `${SITE}/contact`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: SITE,
        name: "GridBeacon",
        publisher: { "@id": `${SITE}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE}/#software`,
        name: "GridBeacon",
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Local SEO rank tracking",
        operatingSystem: "Web browser",
        url: SITE,
        publisher: { "@id": `${SITE}/#organization` },
        description:
          "Geo-grid rank tracking for Google Business Profiles. GridBeacon checks local search position at every point across a service area and reports the result as a heatmap, with competitor grids, scan history and client-ready reports.",
        featureList: [
          "Geo-grid rank tracking up to 21 x 21",
          "Interactive ranking heatmaps",
          "Competitor grid comparison",
          "Scan history and trend tracking",
          "AI ranking intelligence reports",
          "Automated scheduled scans",
        ],
        /* Prices are the ones on /pricing. A stale offer here is
           worse than none, so these move whenever plans do. */
        offers: [
          {
            "@type": "Offer",
            name: "Starter",
            price: "19.99",
            priceCurrency: "USD",
            url: `${SITE}/pricing`,
          },
          {
            "@type": "Offer",
            name: "Professional",
            price: "34.99",
            priceCurrency: "USD",
            url: `${SITE}/pricing`,
          },
          {
            "@type": "Offer",
            name: "Agency",
            price: "69.99",
            priceCurrency: "USD",
            url: `${SITE}/pricing`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE}/#faq`,
        mainEntity: HOME_FAQS.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Serialised rather than templated: JSON.stringify escapes
      // anything in the copy that would otherwise break out of
      // the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph),
      }}
    />
  );
}
