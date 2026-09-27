/*
 * The upgrade promotion, as the marketing site shows it.
 *
 * Same Paddle discount as the app (frontend/lib/upgrade-offer.ts):
 * O7Z805R85Z, 20% off for 2 billing periods on the three MONTHLY plan
 * prices, ending Sep 30 2026 23:59 UTC (the Paddle expiry must match). A visitor signs up free and the
 * app applies the code at checkout, so this site only tells them.
 * Keep the two files in step.
 */

export const UPGRADE_OFFER = {
  percentOff: 20,
  months: 2,
  /* One deadline for everyone; the header bar counts down to it. */
  endsAt: "2026-09-30T23:59:00Z",
} as const;

export function upgradeOfferIsLive(now: number = Date.now()): boolean {
  return now < Date.parse(UPGRADE_OFFER.endsAt);
}

/* "3d 4h 12m", then "7h 42m", then "42m 10s" in the last hour. */
export function offerTimeLeft(now: number = Date.now()): { ms: number; text: string } {
  const ms = Math.max(0, Date.parse(UPGRADE_OFFER.endsAt) - now);
  const total = Math.floor(ms / 1000);
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const text = d > 0 ? `${d}d ${h}h ${m}m` : h > 0 ? `${h}h ${m}m` : `${m}m ${String(s).padStart(2, "0")}s`;
  return { ms, text };
}

/* "$19.99" -> "$15.99". */
export function offerPrice(price: string): string {
  const amount = Number(price.replace(/[^0-9.]/g, ""));

  if (!Number.isFinite(amount) || amount <= 0) return price;

  return `$${(Math.round(amount * (100 - UPGRADE_OFFER.percentOff)) / 100).toFixed(2)}`;
}

export function offerEndLabel(): string {
  return new Date(UPGRADE_OFFER.endsAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
