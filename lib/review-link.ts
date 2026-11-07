/*
 * The free Google review link generator.
 *
 * The business search is the free rank checker's public endpoint
 * (POST /free-rank-check/businesses: Google Places, rate-limited per
 * IP on the API). Everything after the visitor picks a business is
 * built in the browser from its place ID, so the tool costs one Places
 * search per lookup and nothing per link, QR code or copy.
 */

import { trackEvent } from "@/lib/tracking";

/* Opens the Google review form for the place. The visitor's customer
   must be signed in to Google to post. */
export function writeReviewUrl(placeId: string) {
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;
}

/* The place's existing reviews, for checking the link points at the
   right business. */
export function readReviewsUrl(placeId: string) {
  return `https://search.google.com/local/reviews?placeid=${encodeURIComponent(placeId)}`;
}

export function mapsUrl(placeId: string) {
  return `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(placeId)}`;
}

export function fileSlug(name: string) {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "business"
  );
}

/* Ready-to-send requests. Neutral on purpose: Google's policy forbids
   incentives and asking only happy customers, so the wording asks
   every customer for an honest review and offers nothing for it. */
export function messageTemplates(name: string, link: string) {
  return {
    sms: `Hi, thanks for choosing ${name}! If you have a minute, we'd really appreciate an honest Google review: ${link}`,
    email: `Subject: How did we do?

Hi,

Thank you for choosing ${name}. We'd love to hear how it went. If you have a minute, please leave us an honest review on Google:

${link}

It helps other people find us, and we read every review.

Thank you,
${name}`,
  };
}

export const REVIEW_EVENTS = {
  searched: "review_link_search",
  generated: "review_link_generated",
  copied: "review_link_copied",
  qrDownloaded: "review_qr_downloaded",
  rankCheckClick: "review_link_rank_check_click",
} as const;

export function trackReviewTool(name: string, params: Record<string, string> = {}) {
  trackEvent(name, { tool: "review_link_generator", ...params });
}
