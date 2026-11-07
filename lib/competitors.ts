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

/* ProMapRanker was added after the September check and read on its
   own date. Move this forward only after re-reading both its pages. */
export const PROMAPRANKER_CHECKED = "November 2026";

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
  proMapRankerPricing: "https://promapranker.com/pricing",
  proMapRankerFeatures: "https://promapranker.com/features",
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

/* One line per geo-grid tracker, shared by the roundup's quick picks
   and the "other alternatives" block on each comparison page. Same
   sources and check date as above. `anchor` is the tool's section id
   on /best-local-rank-trackers; `page` is its own comparison page. */
export const ROUNDUP_PICKS = [
  { id: "gridbeacon", name: "GridBeacon", tag: "Maps grids, lowest cost", body: "Most credits per dollar, grids to 21 × 21, unlimited businesses.", page: "/google-maps-rank-tracker" },
  { id: "local-falcon", name: "Local Falcon", tag: "Maps, Apple and AI search", body: "Tracks Apple Maps and AI answer engines too, with white label and an API.", page: "/local-falcon-alternative" },
  { id: "brightlocal", name: "BrightLocal", tag: "All-in-one local SEO", body: "Citations, listings, reviews and audits, with a geo-grid built in.", page: "/brightlocal-alternative" },
  { id: "whitespark", name: "Whitespark", tag: "Smallest budget", body: "Local Ranking Grids start at $10 a month for 2,000 credits.", page: "/whitespark-alternative" },
  { id: "local-viking", name: "Local Viking", tag: "GBP management", body: "Geo-grids plus scheduled Google Business Profile posts.", page: "/local-viking-alternative" },
  { id: "semrush-local", name: "Semrush Local", tag: "Semrush users", body: "Map Rank Tracker inside the Semrush platform, priced per location.", page: null },
  { id: "localo", name: "Localo", tag: "Guided optimization", body: "Position map with AI tasks and content publishing for owners.", page: null },
  { id: "promapranker", name: "ProMapRanker", tag: "Credits that roll over", body: "Paid credits never expire, and white label comes with paid plans.", page: "/promapranker-alternative" },
] as const;
