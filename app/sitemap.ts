import type { MetadataRoute } from "next";

import { BLOG_POSTS } from "@/lib/blog";

import { INDUSTRIES } from "@/lib/industries";

/* When each page's own content last changed. Move a date only with a real
   content edit: Google stops trusting lastmod that changes on every build. */
const INDUSTRY_PAGES_UPDATED = "2026-09-27";

const PAGES_UPDATED: Record<string, string> = {
  "/": "2026-11-01",
  "/about": "2026-09-24",
  "/automated-google-maps-rank-tracking": "2026-10-30",
  "/best-local-rank-trackers": "2026-11-02",
  "/blog": "2026-11-02",
  "/brightlocal-alternative": "2026-10-31",
  "/cancellation-policy": "2026-09-24",
  "/citation-audit": "2026-09-29",
  "/contact": "2026-09-24",
  "/features": "2026-11-02",
  "/gmb-rank-tracker": "2026-11-02",
  "/google-business-profile-monitoring": "2026-10-30",
  "/google-maps-rank-checker": "2026-11-01",
  "/google-maps-rank-tracker": "2026-11-02",
  "/how-gridbeacon-checks-rankings": "2026-11-02",
  "/google-review-analysis": "2026-10-30",
  "/how-it-works": "2026-11-02",
  "/local-falcon-alternative": "2026-10-31",
  "/local-rank-tracker-for-agencies": "2026-10-31",
  "/local-rank-tracking-by-industry": "2026-09-27",
  "/local-seo-competitor-analysis": "2026-10-31",
  "/local-seo-report": "2026-10-31",
  "/local-viking-alternative": "2026-11-02",
  "/multi-location-rank-tracking": "2026-10-30",
  "/pricing": "2026-10-24",
  "/privacy": "2026-09-25",
  "/rank-mri": "2026-10-31",
  "/refund-policy": "2026-09-24",
  "/security": "2026-11-02",
  "/service-area-business-rank-tracking": "2026-09-27",
  "/terms": "2026-09-25",
  "/tutorials": "2026-10-31",
  "/what-is-a-geo-grid": "2026-09-27",
  "/whitespark-alternative": "2026-10-31",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gridbeaconhq.com";

  const industryEntries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/local-rank-tracking-by-industry`, changeFrequency: "monthly", priority: 0.7 },
    ...INDUSTRIES.map((industry) => ({
      url: `${baseUrl}${industry.path}`,
      lastModified: INDUSTRY_PAGES_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const entries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...BLOG_POSTS.map(post => ({ url: `${baseUrl}/blog/${post.slug}`, lastModified: post.date, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...industryEntries,
    ...[
      "/google-review-analysis",
      "/google-business-profile-monitoring",
      "/multi-location-rank-tracking",
      "/automated-google-maps-rank-tracking",
    ].map((path) => ({ url: `${baseUrl}${path}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    {
      url: `${baseUrl}/tutorials`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/google-maps-rank-checker`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/google-maps-rank-tracker`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gmb-rank-tracker`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-gridbeacon-checks-rankings`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/local-falcon-alternative`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/brightlocal-alternative`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/whitespark-alternative`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/local-viking-alternative`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/best-local-rank-trackers`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/local-rank-tracker-for-agencies`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/local-seo-competitor-analysis`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/local-seo-report`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/citation-audit`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rank-mri`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/service-area-business-rank-tracking`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/what-is-a-geo-grid`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/features`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-it-works`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/security`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund-policy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cancellation-policy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  return entries.map((entry) => ({
    ...entry,
    lastModified: entry.lastModified ?? PAGES_UPDATED[entry.url.slice(baseUrl.length)],
  }));
}
