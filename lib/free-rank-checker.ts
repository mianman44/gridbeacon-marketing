/*
 * Client for the free Google Maps rank checker.
 *
 * The backend owns every decision that matters: it resolves the
 * business, verifies the email, enforces the 3x3 grid and the daily
 * limit, and decides that the scan is marketing-funded. This file only
 * carries the request and reports what came back.
 */

import { rememberedTrackingParams, trackEvent } from "@/lib/tracking";

export const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "https://api.gridbeaconhq.com"
).replace(/\/$/, "");

export const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || "";

export const RADIUS_OPTIONS = [1, 3, 5] as const;
export const GRID_SIZE = 3;

/* Explicit states, so the UI never has to guess from a pile of
   booleans what the visitor is looking at. */
export type CheckerState =
  | "CONFIGURING"
  | "EMAIL_REQUIRED"
  | "VERIFYING_EMAIL"
  | "READY_TO_SCAN"
  | "CREATING_SCAN"
  | "SCANNING"
  | "COMPLETED"
  | "FAILED"
  | "LIMIT_REACHED";

export type BusinessCandidate = {
  place_id: string;
  business_name: string;
  formatted_address?: string | null;
  category?: string | null;
  rating?: number | null;
  reviews?: number | null;
};

export type ResultStage = {
  key: string;
  label: string;
  state: "done" | "active" | "waiting";
  completed_points?: number;
  total_points?: number;
};

export type ResultMetrics = {
  average_rank: number | null;
  visibility: number | null;
  top3_count: number | null;
  top3_percentage: number | null;
  total_points: number | null;
  ranked_points: number | null;
  best_rank: number | null;
  worst_rank: number | null;
  radius_miles: number | null;
};

export type ResultPoint = {
  grid_row: number;
  grid_col: number;
  latitude: number | null;
  longitude: number | null;
  rank: number | null;
};

export type Competitor = {
  business_name: string | null;
  average_position: number | null;
  points_covered: number | null;
  points_ahead_of_you: number | null;
  rating: number | null;
  reviews: number | null;
};

export type CheckResult = {
  token: string;
  status: string;
  scan_status?: string;
  business_name: string;
  formatted_address: string | null;
  keyword: string;
  radius_miles: number;
  grid_size: number;
  stages: ResultStage[];
  metrics: ResultMetrics | null;
  points: ResultPoint[];
  competitors: Competitor[];
  insight: string | null;
  failure_reason: string | null;
};

export class CheckerError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers || {}),
      },
    });
  } catch {
    throw new CheckerError(
      "network",
      "We could not reach GridBeacon. Check your connection and try again.",
    );
  }

  let body: unknown = null;

  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok) {
    const detail = (body as { detail?: unknown } | null)?.detail;

    if (detail && typeof detail === "object") {
      const { code, message } = detail as { code?: string; message?: string };
      throw new CheckerError(
        code || "error",
        message || "Something went wrong. Please try again.",
      );
    }

    throw new CheckerError(
      "error",
      typeof detail === "string"
        ? detail
        : "Something went wrong. Please try again.",
    );
  }

  return body as T;
}

export function searchBusinesses(query: string) {
  return call<{ businesses: BusinessCandidate[] }>(
    "/free-rank-check/businesses",
    {
      method: "POST",
      body: JSON.stringify({ query }),
    },
  );
}

export function startCheck(input: {
  query: string;
  place_id: string;
  keyword: string;
  radius_miles: number;
  email: string;
  marketing_consent: boolean;
  turnstile_token?: string;
}) {
  // Attribution comes from the visit the marketing site already
  // remembers, so a signup can be credited to the campaign.
  const campaign = rememberedTrackingParams();

  return call<{
    token: string;
    status: string;
    business_name: string;
    keyword: string;
    radius_miles: number;
    grid_size: number;
    code_expires_in_minutes: number;
  }>("/free-rank-check", {
    method: "POST",
    body: JSON.stringify({
      ...input,
      utm_source: campaign.utm_source,
      utm_medium: campaign.utm_medium,
      utm_campaign: campaign.utm_campaign,
      utm_term: campaign.utm_term,
      utm_content: campaign.utm_content,
      gclid: campaign.gclid,
      referrer:
        typeof document === "undefined" ? undefined : document.referrer,
      landing_page:
        typeof window === "undefined" ? undefined : window.location.href,
    }),
  });
}

export function verifyCheck(token: string, code: string) {
  return call<{
    token: string;
    status: string;
    scan_queued: boolean;
    has_account: boolean;
  }>("/free-rank-check/verify", {
    method: "POST",
    body: JSON.stringify({ token, code }),
  });
}

export function resendCode(token: string) {
  return call<{ success: boolean }>("/free-rank-check/resend", {
    method: "POST",
    body: JSON.stringify({ token }),
  });
}

export function readResult(token: string) {
  return call<CheckResult>(
    `/free-rank-check/result/${encodeURIComponent(token)}`,
    { method: "GET" },
  );
}

/*
 * Analytics. Names are fixed and the payloads carry no personal data:
 * no email, no street address, no verification code. Keyword and
 * business name are deliberately left out too -- the funnel only needs
 * counts and the campaign, which GA4 already has from the session.
 */
export const EVENTS = {
  view: "free_rank_checker_view",
  businessSelected: "free_rank_business_selected",
  formCompleted: "free_rank_form_completed",
  emailSubmitted: "free_rank_email_submitted",
  emailVerified: "free_rank_email_verified",
  scanStarted: "free_rank_scan_started",
  scanCompleted: "free_rank_scan_completed",
  scanFailed: "free_rank_scan_failed",
  resultViewed: "free_rank_result_viewed",
  signupClicked: "free_rank_signup_clicked",
  signupCompleted: "free_rank_signup_completed",
} as const;

type EventParams = { radius_miles?: number; grid_size?: number; reason?: string };

export function trackChecker(
  name: (typeof EVENTS)[keyof typeof EVENTS],
  params: EventParams = {},
) {
  const safe: Record<string, string> = {};

  // An allow-list, so nothing personal can be added by accident.
  if (params.radius_miles !== undefined) {
    safe.radius_miles = String(params.radius_miles);
  }
  if (params.grid_size !== undefined) {
    safe.grid_size = String(params.grid_size);
  }
  if (params.reason) {
    safe.reason = params.reason.slice(0, 60);
  }

  trackEvent(name, safe);
}
