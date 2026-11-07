import { BLOG_POSTS } from "@/lib/blog";
import { GRIDBEACON } from "@/lib/competitors";
import { INDUSTRIES } from "@/lib/industries";
import { SIGNUP_URL, SITE_URL } from "@/lib/seo";

/*
 * /llms.txt: a plain-text summary of GridBeacon for AI assistants
 * (format from llmstxt.org). Plans, grid limits, blog posts and trade
 * pages come from the same data the pages use, so it cannot drift from
 * them. Time-limited offers are left out on purpose: this file is
 * cached and quoted long after a deadline passes.
 */

export const dynamic = "force-static";

const link = (path: string, title: string, note: string) => `- [${title}](${SITE_URL}${path}): ${note}`;

export function GET() {
  const plans = GRIDBEACON.plans
    .map(([name, monthly, annual, credits]) => `- ${name}: ${monthly}/month (${annual}/month billed annually), ${credits} credits a month`)
    .join("\n");

  const body = `# GridBeacon

> GridBeacon is a Google Maps geo-grid rank tracker for Google Business Profiles (formerly Google My Business). It searches a keyword on Google Maps from every point of a grid around a business and shows the rank the business holds at each point as a heatmap, along with every competitor ranked there. It is used by local SEO agencies, SEO consultants, multi-location brands and local business owners.

Key facts:

- Pricing is credit-based: 1 credit per grid point scanned. A 9 × 9 scan uses 81 credits.
- Grids from ${GRIDBEACON.grids}; radius ${GRIDBEACON.radius}; square or ring layouts; points can be excluded and are not charged.
- Free plan: ${GRIDBEACON.freeCredits} one-time credits, 1 business, 3 keywords, no card required.
${plans}
- Top-up credit packs: ${GRIDBEACON.topUps}.
- Paid plans include unlimited businesses, keywords and team members, scheduled scans (daily, weekly, every two weeks or monthly) with email alerts, AI Ranking Intelligence reports, Rank MRI, Review Intelligence, GBP Activity monitoring and Citation Audit. White-label reports are on the Agency plan.
- Competitor grids come from the same scan at no extra cost; rankings are matched by Google place ID.
- No Google Business Profile login is needed: GridBeacon reads public Google Maps results, so any business can be tracked.
- Metrics: ARP (average rank where the business ranks), ATRP (average over every point, unranked counts as 21), SoLV (share of points in the top 3) and visibility (share of points in the top 10).
- Free tools: a 3 × 3 Google Maps rank checker and a Google review link generator (link, QR code, message templates), both with no account needed.
- Sign up: ${SIGNUP_URL}. Contact: founder@gridbeaconhq.com.

## Product

${[
    link("/google-maps-rank-tracker", "Google Maps Rank Tracker", "the main product page: geo-grid scans, heatmaps, competitors, history and reports"),
    link("/gmb-rank-tracker", "GMB Rank Tracker", "tracking a Google Business Profile's rankings across an area"),
    link("/google-maps-rank-checker", "Free Google Maps Rank Checker", "free 3 × 3 rank check, no account"),
    link("/google-review-link-generator", "Free Google Review Link Generator", "direct Google review link, QR code and message templates for any business, no account"),
    link("/pricing", "Pricing", "plans, credits and top-ups"),
    link("/features", "Features", "every feature by plan"),
    link("/how-it-works", "How It Works", "from setting up a grid to reading the results"),
    link("/how-gridbeacon-checks-rankings", "How GridBeacon Checks Rankings", "methodology: how each point is searched and how ARP, ATRP and SoLV are calculated"),
    link("/rank-mri", "Rank MRI", "point-by-point investigation of weak rankings"),
    link("/local-seo-competitor-analysis", "Local SEO Competitor Analysis", "who outranks a business and where"),
    link("/local-seo-report", "Local SEO Reports", "scan, keyword and location reports, online and as PDFs"),
    link("/citation-audit", "Citation Audit", "business listing consistency across 60+ US directories"),
    link("/google-review-analysis", "Google Review Analysis", "analysis of up to 500 public Google reviews"),
    link("/google-business-profile-monitoring", "GBP Monitoring", "a timeline of detected profile changes"),
    link("/automated-google-maps-rank-tracking", "Automated Rank Tracking", "scheduled scans and alerts"),
    link("/multi-location-rank-tracking", "Multi-Location Rank Tracking", "tracking many branches in one workspace"),
    link("/service-area-business-rank-tracking", "Service-Area Businesses", "tracking businesses with a hidden address"),
    link("/local-rank-tracker-for-agencies", "For Agencies", "how agencies use GridBeacon"),
    link("/white-label-rank-tracker", "White-Label Rank Tracker", "branded reports, PDFs and client links on the Agency plan"),
    link("/rank-tracking-by-city-and-zip-code", "Rank Tracking by City and ZIP Code", "covering a city or ZIP code with a geo-grid"),
  ].join("\n")}

## Comparisons

${[
    link("/best-local-rank-trackers", "Best Local Rank Trackers", "GridBeacon compared with other local rank trackers, with sourced pricing"),
    link("/local-falcon-alternative", "Local Falcon Alternative", "GridBeacon vs Local Falcon"),
    link("/brightlocal-alternative", "BrightLocal Alternative", "GridBeacon vs BrightLocal"),
    link("/whitespark-alternative", "Whitespark Alternative", "GridBeacon vs Whitespark"),
    link("/local-viking-alternative", "Local Viking Alternative", "GridBeacon vs Local Viking (Local Optics)"),
    link("/promapranker-alternative", "ProMapRanker Alternative", "GridBeacon vs ProMapRanker"),
  ].join("\n")}

## Guides

${[
    link("/what-is-a-geo-grid", "What Is a Geo-Grid?", "how local rank grids work"),
    ...BLOG_POSTS.map((post) => link(`/blog/${post.slug}`, post.title, post.description)),
    link("/tutorials", "Tutorials", "short videos on using GridBeacon"),
  ].join("\n")}

## Industries

${[
    link("/local-rank-tracking-by-industry", "Rank Tracking by Industry", "all trades"),
    ...INDUSTRIES.map((industry) => link(industry.path, `Google Maps rank tracking for ${industry.plural}`, industry.summary)),
  ].join("\n")}

## Optional

${[
    link("/about", "About", "the company"),
    link("/contact", "Contact", "support by email"),
    link("/security", "Security", "how accounts and data are protected"),
    link("/terms", "Terms of Service", "terms"),
    link("/privacy", "Privacy Policy", "privacy"),
  ].join("\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
