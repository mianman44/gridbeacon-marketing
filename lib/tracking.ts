/*
 * Client-side tracking for paid landing pages.
 *
 * - Analytics reuses the SaaS app's GA4 property (the same ID the app
 *   loads in frontend/app/layout.tsx), so a visit and the signup that
 *   follows land in one place.
 * - The Reddit Pixel loads only when NEXT_PUBLIC_REDDIT_PIXEL_ID is set
 *   at build time; without it nothing is loaded and nothing breaks.
 * - Third-party scripts load only on the production host, so local and
 *   preview builds never send test traffic to real analytics. Events
 *   are still recorded on window.__gridbeaconEvents everywhere, which
 *   is how they are checked locally.
 * - Only an allow-list of campaign parameters is forwarded to the app.
 *   The signup page acts on `next` (where to go after signup), so
 *   forwarding arbitrary parameters would let anyone craft an ad URL
 *   that redirects new accounts somewhere else.
 */

export const GA_MEASUREMENT_ID = "G-3GR5ZT15NG";
export const PRODUCTION_HOST = "gridbeaconhq.com";

const FORWARDED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  // Reddit's click ID, kept for a later server-side conversion.
  "rdt_cid",
] as const;

type Command = (...args: unknown[]) => void;

type RedditPixel = Command & {
  callQueue: unknown[];
  sendEvent?: Command;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Command;
    rdt?: RedditPixel;
    __gridbeaconEvents?: { name: string; params: Record<string, string> }[];
  }
}

export function isProductionHost() {
  return typeof window !== "undefined" && window.location.hostname === PRODUCTION_HOST;
}

/* The allow-listed campaign parameters present in a query string. */
export function trackingParams(search: string): Record<string, string> {
  const incoming = new URLSearchParams(search);
  const params: Record<string, string> = {};

  for (const key of FORWARDED_PARAMS) {
    const value = incoming.get(key)?.trim();
    if (value) params[key] = value.slice(0, 200);
  }

  return params;
}

/* An absolute URL with the page's campaign parameters added, keeping
   any the URL already carries. Anything else is returned untouched. */
export function withTrackingParams(href: string, search: string): string {
  const params = trackingParams(search);

  if (!Object.keys(params).length || !/^https?:\/\//.test(href)) {
    return href;
  }

  const url = new URL(href);

  for (const [key, value] of Object.entries(params)) {
    if (!url.searchParams.has(key)) url.searchParams.set(key, value);
  }

  return url.toString();
}

export function trackEvent(name: string, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;

  (window.__gridbeaconEvents ??= []).push({ name, params });

  try {
    window.gtag?.("event", name, params);
  } catch {
    // Analytics must never get in the way of a click.
  }
}

export function loadGoogleAnalytics(id: string) {
  if (window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js reads the Arguments object itself; an array is ignored.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", id);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}

/* Reddit's published base code, written out rather than pasted as a
   string: queue calls until pixel.js arrives, then init and PageVisit
   (Reddit's name for a page view). */
export function loadRedditPixel(id: string) {
  if (window.rdt) return;

  const pixel = function (...args: unknown[]) {
    if (pixel.sendEvent) pixel.sendEvent(...args);
    else pixel.callQueue.push(args);
  } as RedditPixel;
  pixel.callQueue = [];
  window.rdt = pixel;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.redditstatic.com/ads/pixel.js";
  document.head.appendChild(script);

  pixel("init", id);
  pixel("track", "PageVisit");
}
