import type { MetadataRoute } from "next";

import { INDUSTRIES } from "@/lib/industries";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gridbeaconhq.com";

  const industryEntries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/local-rank-tracking-by-industry`, changeFrequency: "monthly", priority: 0.7 },
    ...INDUSTRIES.map((industry) => ({
      url: `${baseUrl}${industry.path}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [
    ...industryEntries,
    ...[
      "/google-review-analysis",
      "/google-business-profile-monitoring",
      "/multi-location-rank-tracking",
      "/automated-google-maps-rank-tracking",
    ].map((path) => ({ url: `${baseUrl}${path}`, changeFrequency: "monthly" as const, priority: 0.8 })),
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
}
