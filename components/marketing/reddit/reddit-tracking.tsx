"use client";

import { useEffect } from "react";

import {
  GA_MEASUREMENT_ID,
  debugEnabled,
  isProductionHost,
  loadGoogleAnalytics,
  rememberTrackingParams,
  loadRedditPixel,
  trackEvent,
  trackingParams,
} from "@/lib/tracking";

/* Inlined at build time. Empty means no pixel: see .env.example. */
const REDDIT_PIXEL_ID = process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID?.trim() || "";

// React runs effects twice in development; count the view once.
let viewTracked = false;

/* Loads analytics after hydration, so neither script sits in the way
   of the first paint, and records the landing view. */
export function RedditTracking() {
  useEffect(() => {
    rememberTrackingParams(window.location.search);

    if (isProductionHost()) {
      loadGoogleAnalytics(GA_MEASUREMENT_ID, { debug: debugEnabled() });
      if (REDDIT_PIXEL_ID) loadRedditPixel(REDDIT_PIXEL_ID);
    }

    if (!viewTracked) {
      viewTracked = true;
      trackEvent("reddit_landing_view", trackingParams(window.location.search));
    }
  }, []);

  return null;
}
