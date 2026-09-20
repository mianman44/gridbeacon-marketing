"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { APP_URL } from "@/lib/seo";
import {
  GA_MEASUREMENT_ID,
  debugEnabled,
  isProductionHost,
  loadGoogleAdsTag,
  loadGoogleAnalytics,
  rememberTrackingParams,
  trackingDiagnostics,
  withVisitParams,
} from "@/lib/tracking";

/* Inlined at build time; empty means no Google Ads tag. */
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() || "";

/*
 * GA4 for the whole marketing site.
 *
 * It used to load on /google-ads and /reddit only. An ad click that
 * landed anywhere else (home, /pricing, /google-maps-rank-tracker...)
 * was therefore never measured here: no gclid was recorded, no GA4
 * cookie was written, and the app saw the reader for the first time as
 * a fresh session referred by gridbeaconhq.com -- which is why those
 * signups reported Session campaign "(not set)".
 *
 * Two things keep the campaign attached now:
 *
 *  - the tag runs on every page, so the click starts one GA4 session on
 *    the marketing domain. The app loads the same property, and the
 *    cookies live on .gridbeaconhq.com, so the session continues into
 *    app.gridbeaconhq.com and the signup belongs to it;
 *  - every link to the app carries the visit's campaign parameters, so
 *    even a session that GA4 never saw here arrives with the gclid.
 *
 * It sends no events of its own: sign_up still comes from the app
 * (frontend/lib/analytics.ts), and the paid landing pages keep their
 * own extra events.
 */
export function SiteAnalytics() {
  const pathname = usePathname();
  const firstPath = useRef(true);

  useEffect(() => {
    rememberTrackingParams(window.location.search);

    /* Hand-checking a test journey: __gridbeaconTracking() in the
       console prints the client id, session id and campaign. */
    window.__gridbeaconTracking = () => trackingDiagnostics();

    if (isProductionHost()) {
      loadGoogleAnalytics(GA_MEASUREMENT_ID, { debug: debugEnabled() });
      if (GOOGLE_ADS_ID) loadGoogleAdsTag(GOOGLE_ADS_ID);
    }

    /* The first page view comes from the tag itself. Moving between
       pages here is a client-side navigation, which the tag cannot
       see, so record those. Same session, so the campaign is kept. */
    if (firstPath.current) {
      firstPath.current = false;
    } else {
      window.gtag?.("event", "page_view", {
        page_location: window.location.href,
        page_title: document.title,
      });
    }

    /* Links present now: also covers opening one in a new tab, where
       no click handler of ours would run. */
    for (const link of document.querySelectorAll<HTMLAnchorElement>(
      `a[href^="${APP_URL}"]`,
    )) {
      link.href = withVisitParams(link.href);
    }

    /* Links rendered later, and any the loop above missed. Capture
       phase, so the address is right before the browser follows it. */
    function handleClick(event: MouseEvent) {
      const link =
        event.target instanceof Element ? event.target.closest("a") : null;

      if (!link || !link.href.startsWith(APP_URL)) return;

      link.href = withVisitParams(link.href);
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname]);

  return null;
}
