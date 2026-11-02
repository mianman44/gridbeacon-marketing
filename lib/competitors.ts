/*
 * What the comparison pages say about other rank trackers.
 *
 * Every figure here was read off the competitor's own website (pricing
 * page, product page or help centre) on the date in COMPETITORS_CHECKED,
 * not from review sites, which disagree with each other and lag behind
 * price changes. The comparison pages and the roundup all read from
 * this file, so a price that moves is corrected once.
 *
 * Re-check every source before editing any comparison page, and move
 * COMPETITORS_CHECKED forward only after doing so.
 */

export const COMPETITORS_CHECKED = "September 2026";

/* When the now-removed Local Viking help centre was read. Its grid
   size, point spacing and credit rollover figures can no longer be
   re-checked, so the pages say where and when they came from. */
export const LOCAL_VIKING_HELP_READ = "September 2026";

export const SOURCES = {
  localFalconPricing: "https://www.localfalcon.com/pricing",
  brightLocalPricing: "https://www.brightlocal.com/pricing/",
  brightLocalGrid: "https://www.brightlocal.com/local-seo-tools/rankings/local-search-grid/",
  whitesparkGrids: "https://whitespark.ca/local-ranking-grids/",
  whitesparkTracker: "https://whitespark.ca/local-rank-tracker/",
  localOpticsPricing: "https://app.localoptics.com/pricing",
  /* help.localviking.com was taken down in late 2026 and its articles
     now 404. Figures read there are dated by LOCAL_VIKING_HELP_READ and
     no longer linked; scheduling comes from the Local Optics knowledge base. */
  localOpticsSchedules: "https://clientportal.localoptics.com/knowledge-base/live-geogrids-vs-scheduled-geogrids-",
  semrushLocalPricing: "https://www.semrush.com/kb/1611-pricing-and-plans",
  semrushMapRankTracker: "https://www.semrush.com/kb/1399-map-rank-tracker",
  localoPricing: "https://localo.com/pricing",
} as const;

/* GridBeacon's own figures, from /pricing and the backend
   (ALLOWED_SCAN_GRID_SIZES, MAX_SCAN_RADIUS_MILES). */
export const GRIDBEACON = {
  freeCredits: "500",
  plans: [
    // name, monthly price, annual price per month, credits a month
    ["Starter", "$19.99", "$15.99", "8,000"],
    ["Professional", "$34.99", "$27.99", "15,000"],
    ["Agency", "$69.99", "$55.99", "32,000"],
  ],
  topUps: "2,000 for $9.99, 5,000 for $19.99, 10,000 for $34.99",
  grids: "3 × 3 to 21 × 21 (9 to 441 points)",
  radius: "0.1 to 100 miles",
} as const;
