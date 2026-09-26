/*
 * The upgrade promotion, as the marketing site shows it.
 *
 * Same Paddle discount as the app (frontend/lib/upgrade-offer.ts):
 * O7Z805R85Z, 20% off for 2 billing periods on the three MONTHLY plan
 * prices, ending Nov 26 2026 23:59 UTC. A visitor signs up free and the
 * app applies the code at checkout, so this site only tells them.
 * Keep the two files in step.
 */

export const UPGRADE_OFFER = {
  percentOff: 20,
  months: 2,
  endsAt: "2026-11-26T23:59:00Z",
} as const;

export function upgradeOfferIsLive(now: number = Date.now()): boolean {
  return now < Date.parse(UPGRADE_OFFER.endsAt);
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
