/*
 * What every paid plan includes.
 *
 * Mirrors PAID_PLAN_FEATURES on the app's billing page, and every
 * limit here was checked against the backend rather than copied
 * across: the grid ceiling comes from ALLOWED_SCAN_GRID_SIZES, the
 * radius from MAX_SCAN_RADIUS_MILES, and the review depth from
 * MAX_REVIEW_LIMIT.
 *
 * The list lives in one file because the pricing page and the
 * features page both render it, and two copies of a feature list
 * drift within a release.
 */

export type FeatureGroup = {
  title: string;
  blurb: string;
  features: string[];
};

export const PLAN_FEATURE_GROUPS: FeatureGroup[] = [
  {
    title: "Measure",
    blurb:
      "The scan itself, and how much ground you can put under it.",
    features: [
      "Geo-grid rank tracking across your service area",
      "Grid scans up to 21 × 21 — 441 points",
      "Scan radius up to 100 miles",
      "Custom scan areas with points you exclude",
      "Unlimited business profiles",
      "Unlimited tracked keywords",
    ],
  },
  {
    title: "Understand",
    blurb:
      "Turning a few hundred positions into something you can act on.",
    features: [
      "Interactive rank heatmaps",
      "Competitor grids from the same scan",
      "Current rank, best rank and visibility",
      "Full scan history archive",
      "Local keyword discovery",
    ],
  },
  {
    title: "Explain",
    blurb:
      "The part you send to a client, or read on a Monday morning.",
    features: [
      "AI Ranking Intelligence Report (PDF)",
      "AI-powered scan reports",
      "AI Action Plan",
      "GBP Activity monitoring",
      "Review Intelligence, up to 500 reviews",
      "Automated scheduled scans",
      "Automated email scan alerts",
    ],
  },
];

/** Flattened, for places that want one list rather than three. */
export const PLAN_FEATURES: string[] =
  PLAN_FEATURE_GROUPS.flatMap((group) => group.features);
