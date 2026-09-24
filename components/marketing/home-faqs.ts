/*
 * The home page FAQ: one list feeds both the visible accordion and the
 * FAQPage JSON-LD, so the two cannot drift apart.
 *
 * `answer` is an HTML fragment (plain text plus <a> links). The
 * accordion adds the link styling; the JSON-LD uses it as written.
 */

export type HomeFaq = {
  question: string;
  answer: string;
};

export const homeFaqs: HomeFaq[] = [
  {
    question: "What is a geo-grid scan?",
    answer:
      'Google shows different results depending on where the searcher is standing. A geo-grid scan checks your ranking from a grid of points across your service area, so instead of one number you get a map: the streets where you come up first, and the ones where you do not appear at all. <a href="/google-maps-rank-tracker">See how the Google Maps rank tracker works</a>.',
  },
  {
    question: "How much does a scan cost?",
    answer:
      "One credit per grid point. A 5 × 5 grid is 25 credits, a 9 × 9 is 81. You can see the exact cost before you run it, and remove any points outside your service area (e.g., lakes, parks, empty water bodies) to bring it down.",
  },
  {
    question: "What do I get for free?",
    answer:
      "500 scan credits when you create an account, with no credit card required. That covers a huge 21 × 21 scan, or twenty 5 × 5 scans, or anything in between. The free plan tracks one business and three keywords.",
  },
  {
    question: "Can I see what competitors rank for?",
    answer:
      "Yes. Every scan already records the whole local pack at each point, so competitor grids come from the scan you have already run. Opening competitor telemetry costs nothing extra.",
  },
  {
    question: "Do you work outside the United States?",
    answer:
      "Yes! Scans are run directly against Google Maps results for the exact coordinates you choose, so any country or city Google covers will work seamlessly.",
  },
  {
    question: "How do I check my Google Maps ranking in different locations?",
    answer:
      'Run a geo-grid scan. GridBeacon searches your keyword from every point of a grid across your service area and shows your position at each point as a heatmap, so you can see exactly where you rank in the Google map pack and where you drop out. You can try it with the <a href="/google-maps-rank-checker">free Google Maps rank checker</a>.',
  },
  {
    question: "Is GridBeacon a good Local Falcon alternative?",
    answer:
      'Yes. GridBeacon uses simple credit pricing (1 credit per grid point), gives you 500 free credits at signup, includes competitor grids from every scan at no extra cost, and supports grids up to 21×21. See the full comparison on our <a href="/local-falcon-alternative">Local Falcon alternative page</a>.',
  },
  {
    question: "Can I track GMB / GBP rankings for my clients?",
    answer:
      "Yes. Paid plans include unlimited Google Business Profiles and keywords, scheduled scans, team access and AI Ranking Intelligence PDF reports you can send to clients.",
  },
];

/* Where the accordion goes inside the Stitch home markup. */
export const HOME_FAQ_PLACEHOLDER = "<!--HOME_FAQ_LIST-->";

const LINK_STYLE =
  "color:#1d4ed8;font-weight:600;text-decoration:underline;text-underline-offset:3px";

const EXPAND_ICON =
  '<svg class="material-symbols-outlined text-on-surface-variant transition-transform" aria-hidden="true" focusable="false" width="1em" height="1em" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/></svg>';

function escapeText(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* The accordion markup, identical in structure and classes to the
   original Stitch export. */
export function renderHomeFaqList(faqs: HomeFaq[] = homeFaqs) {
  return faqs
    .map(
      ({ question, answer }) =>
        '<details open class="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">' +
        '<summary class="faq-toggle w-full p-space-lg flex items-center justify-between text-left gap-space-sm font-headline-sm text-body-lg font-bold text-on-surface hover:text-primary transition-colors">\n' +
        `<span>${escapeText(question)}</span>\n` +
        EXPAND_ICON +
        "\n</summary>" +
        '<div class="faq-content px-space-lg pb-space-lg pt-0 font-body-md text-body-md text-on-surface-variant">\n' +
        answer.replace(/<a href=/g, `<a style="${LINK_STYLE}" href=`) +
        "\n</div></details>",
    )
    .join("\n\n");
}

/* FAQPage node for the home page's JSON-LD graph. */
export function homeFaqSchema(faqs: HomeFaq[] = homeFaqs) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}
