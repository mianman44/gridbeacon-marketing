"use client";

import { useEffect } from "react";

import { SIGNUP_URL } from "@/lib/seo";
import {
  GA_MEASUREMENT_ID,
  isProductionHost,
  loadGoogleAdsTag,
  loadGoogleAnalytics,
  trackAdsConversion,
  trackEvent,
  trackingParams,
  withTrackingParams,
} from "@/lib/tracking";

/* Inlined at build time. Empty means no Ads tag / no click conversion:
   see .env.example. */
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() || "";
const SIGNUP_CONVERSION_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_SIGNUP_LABEL?.trim() || "";

// React runs effects twice in development; count the view once.
let viewTracked = false;

/*
 * Campaign plumbing for /google-ads, added around the page's restored
 * server-rendered sections without editing each call to action:
 *
 * - loads GA4 and, when configured, the Google Ads tag -- production
 *   host only, after hydration;
 * - appends the ad's allow-listed parameters (utm_*, gclid, gbraid,
 *   wbraid) to every signup link inside the page, so the app can still
 *   credit the click;
 * - records google_ads_landing_view and CTA clicks, plus a Google Ads
 *   conversion on signup clicks when a conversion label is set.
 */
export function CampaignParams({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;

    if (isProductionHost()) {
      loadGoogleAnalytics(GA_MEASUREMENT_ID);
      if (GOOGLE_ADS_ID) loadGoogleAdsTag(GOOGLE_ADS_ID);
    }

    const search = window.location.search;
    const params = trackingParams(search);

    if (!viewTracked) {
      viewTracked = true;
      trackEvent("google_ads_landing_view", params);
    }

    for (const link of root.querySelectorAll<HTMLAnchorElement>("a[href]")) {
      if (link.href.startsWith(SIGNUP_URL)) link.href = withTrackingParams(link.href, search);
    }

    function handleClick(event: MouseEvent) {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link || !root?.contains(link)) return;

      const area = link.closest("header, footer, section");
      const detail = {
        cta_location: area?.id || area?.tagName.toLowerCase() || "page",
        ...params,
      };

      if (link.href.startsWith(SIGNUP_URL)) {
        trackEvent("google_ads_primary_cta_click", detail);
        trackEvent("google_ads_signup_click", detail);
        if (GOOGLE_ADS_ID && SIGNUP_CONVERSION_LABEL) {
          trackAdsConversion(`${GOOGLE_ADS_ID}/${SIGNUP_CONVERSION_LABEL}`);
        }
      } else if (link.getAttribute("href")?.startsWith("#")) {
        trackEvent("google_ads_secondary_cta_click", { ...detail, target: link.getAttribute("href") || "" });
      }
    }

    root.addEventListener("click", handleClick);
    return () => root.removeEventListener("click", handleClick);
  }, [rootId]);

  return null;
}
