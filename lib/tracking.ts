/*
 * Client-side tracking for paid landing pages (/reddit, /google-ads).
 *
 * - Analytics reuses the SaaS app's GA4 property (the same ID the app
 *   loads in frontend/app/layout.tsx), so a visit and the signup that
 *   follows land in one place.
 * - The Reddit Pixel and the Google Ads tag load only when their IDs
 *   are set at build time (NEXT_PUBLIC_REDDIT_PIXEL_ID,
 *   NEXT_PUBLIC_GOOGLE_ADS_ID); without them nothing is loaded and
 *   nothing breaks.
 * - Third-party scripts load only when trackingAllowed(): the build
 *   flag NEXT_PUBLIC_ANALYTICS_ENABLED=true, the production host, and
 *   a browser not marked internal (the gb_internal cookie the app sets
 *   for platform admins on .gridbeaconhq.com, or ?gb_internal=1). Local,
 *   preview and staff visits never send anything. Events are still
 *   recorded on window.__gridbeaconEvents everywhere, which is how they
 *   are checked locally.
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
  // Ad click IDs, kept so a signup can still be credited to the click
  // after the hop from the marketing domain to the app.
  "rdt_cid",
  "gclid",
  "gbraid",
  "wbraid",
  // Turns on GA4 DebugView for a test journey; it has to travel with
  // the click because sessionStorage is not shared across subdomains.
  "ga_debug",
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
    __gridbeaconTracking?: () => ReturnType<typeof trackingDiagnostics>;
  }
}

export const INTERNAL_COOKIE = "gb_internal";
const INTERNAL_MAX_AGE_S = 400 * 24 * 60 * 60; // browsers cap at 400 days

export function isInternalBrowser(cookieString: string): boolean {
  return cookieString.split(/;\s*/).some((entry) => entry === `${INTERNAL_COOKIE}=1`);
}

/* ?gb_internal=1 marks a staff browser (shared with the app through the
   parent domain), ?gb_internal=0 unmarks it. A measurement opt-out
   only: it is never sent anywhere. */
export function applyInternalParam(search: string, hostname: string): void {
  const value = new URLSearchParams(search).get(INTERNAL_COOKIE);
  if (value !== "1" && value !== "0") return;

  const onSite = hostname === PRODUCTION_HOST || hostname.endsWith(`.${PRODUCTION_HOST}`);
  const domain = onSite ? `; domain=.${PRODUCTION_HOST}` : "";
  const secure = window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie =
    value === "1"
      ? `${INTERNAL_COOKIE}=1; path=/; max-age=${INTERNAL_MAX_AGE_S}; SameSite=Lax${secure}${domain}`
      : `${INTERNAL_COOKIE}=; path=/; max-age=0; SameSite=Lax${domain}`;
}

/* The build flag and the host, both required; the flag is inlined at
   build time and unset means off. */
export function analyticsEnvironmentEnabled(flag: string | undefined, hostname: string): boolean {
  return flag?.trim().toLowerCase() === "true" && hostname === PRODUCTION_HOST;
}

let internalParamApplied = false;

/* Whether GA4, the Google Ads tag and the Reddit Pixel may load here. */
export function trackingAllowed(): boolean {
  if (typeof window === "undefined") return false;

  if (!internalParamApplied) {
    internalParamApplied = true;
    try {
      applyInternalParam(window.location.search, window.location.hostname);
    } catch {
      // no cookies: nothing to remember
    }
  }

  return (
    analyticsEnvironmentEnabled(process.env.NEXT_PUBLIC_ANALYTICS_ENABLED, window.location.hostname) &&
    !isInternalBrowser(document.cookie)
  );
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

/* The campaign that brought this visit, kept for the whole visit so a
   reader who lands on one page and signs up from another still hands
   the click ids to the app. Last click wins, as Google Ads does. */
export const VISIT_PARAMS_KEY = "gridbeacon_campaign";

function visitStore(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.sessionStorage;
  } catch {
    return null;
  }
}

export function rememberTrackingParams(search: string): Record<string, string> {
  const store = visitStore();
  const remembered = rememberedTrackingParams();
  const merged = { ...remembered, ...trackingParams(search) };

  try {
    if (Object.keys(merged).length) {
      store?.setItem(VISIT_PARAMS_KEY, JSON.stringify(merged));
    }
  } catch {
    // A visit without storage still works; it just forwards less.
  }

  return merged;
}

export function rememberedTrackingParams(): Record<string, string> {
  try {
    const raw = visitStore()?.getItem(VISIT_PARAMS_KEY);
    const parsed = raw ? (JSON.parse(raw) as Record<string, string>) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

/* An app link with this visit's campaign parameters added. */
export function withVisitParams(href: string): string {
  const params = rememberedTrackingParams();

  if (!Object.keys(params).length || !/^https?:\/\//.test(href)) return href;

  const url = new URL(href);

  for (const [key, value] of Object.entries(params)) {
    if (!url.searchParams.has(key)) url.searchParams.set(key, value);
  }

  return url.toString();
}

/* GA4 DebugView for a test journey: ?ga_debug=1 anywhere in the flow. */
export function debugEnabled(): boolean {
  return rememberedTrackingParams().ga_debug === "1";
}

/* What GA4 is doing right now, for checking a test journey by hand:
   the client id and session id both domains should share, and the
   campaign this visit is carrying. Exposed as
   window.__gridbeaconTracking() by SiteAnalytics. */
export function trackingDiagnostics(measurementId = GA_MEASUREMENT_ID) {
  const cookie = (name: string) =>
    document.cookie
      .split("; ")
      .find((entry) => entry.startsWith(name + "="))
      ?.slice(name.length + 1) || null;

  const ga = cookie("_ga");
  const session = cookie("_ga_" + measurementId.replace("G-", ""));

  return {
    host: window.location.hostname,
    measurementId,
    // GA1.1.<client id>
    clientId: ga ? ga.split(".").slice(2).join(".") : null,
    // GS2.1.s<session id>$o<session count>...
    sessionId: session?.match(/s(\d+)/)?.[1] || null,
    sessionCount: session?.match(/\$o(\d+)/)?.[1] || null,
    campaign: rememberedTrackingParams(),
    debugMode: debugEnabled(),
    gtagLoaded: typeof window.gtag === "function",
  };
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

/* GA4's session cookie: GS2.1.s<session id>$o<count>... Read, never written. */
export function gaSessionId(cookieString: string, measurementId = GA_MEASUREMENT_ID): string | null {
  const name = `_ga_${measurementId.replace("G-", "")}=`;
  const value = cookieString
    .split(/;\s*/)
    .find((entry) => entry.startsWith(name))
    ?.slice(name.length);

  return value?.match(/^GS\d\.\d\.s?(\d+)/)?.[1] ?? null;
}

/*
 * acquisition_entry: "this GA4 session began on the marketing site".
 *
 * GA4's landing page is session-scoped but has no hostname, and the
 * hostname dimension belongs to each event, so neither can tell a
 * session that started on gridbeaconhq.com from one that started in
 * the app -- which is how /admin ended up in the organic landing
 * report. This event marks the first kind, once per GA4 session, with
 * GA4's own session semantics: the session id the tag reports after
 * this page's hit is compared with the one in its cookie before it
 * (or after the previous page). A different id means GA4 has just
 * started a session here. Nothing is stored by us -- no permanent
 * flag, no per-tab copy.
 *
 * Report: sessions that include acquisition_entry, by Session source /
 * medium and Landing page, with sign_up and first_scan_completed as
 * the outcomes (see frontend/ANALYTICS.md in the app repo).
 */
let lastSessionId: string | null | undefined;

function noteSession(measurementId: string, before: string | null): void {
  window.gtag?.("get", measurementId, "session_id", (sessionId: unknown) => {
    const current = sessionId === undefined || sessionId === null ? null : String(sessionId);
    lastSessionId = current;

    if (current && current !== before) {
      trackEvent("acquisition_entry", {
        entry_surface: "marketing",
        landing_path: window.location.pathname,
      });
    }
  });
}

/* After a client-side navigation: Enhanced Measurement has queued its
   page view for the new page, so a session that timed out while the
   tab sat idle restarts here and is marked like a fresh landing. */
export function noteSessionAfterNavigation(measurementId = GA_MEASUREMENT_ID): void {
  if (lastSessionId === undefined || typeof window.gtag !== "function") return;
  noteSession(measurementId, lastSessionId);
}

export function loadGoogleAnalytics(id: string, options: { debug?: boolean } = {}) {
  if (window.gtag) return;

  // Before the tag touches the cookie.
  const sessionBefore = gaSessionId(document.cookie, id);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js reads the Arguments object itself; an array is ignored.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag(
    "config",
    id,
    // Same property and cookie domain as the app, so a visit here and
    // the signup that follows stay in one GA4 session.
    options.debug ? { debug_mode: true } : {},
  );
  noteSession(id, sessionBefore);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}

/* The Google Ads tag shares gtag.js with GA4: one more config target
   (an "AW-..." ID) once loadGoogleAnalytics has run. */
export function loadGoogleAdsTag(id: string) {
  window.gtag?.("config", id);
}

/* A Google Ads conversion, sent to "AW-.../label". */
export function trackAdsConversion(sendTo: string) {
  try {
    window.gtag?.("event", "conversion", { send_to: sendTo });
  } catch {
    // As above: never block the click.
  }
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
