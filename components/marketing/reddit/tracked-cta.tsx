"use client";

import { useSyncExternalStore, type ReactNode } from "react";

import { trackEvent, trackingParams, withTrackingParams } from "@/lib/tracking";

import styles from "./reddit.module.css";

const neverChanges = () => () => {};

/*
 * A call-to-action link that keeps the ad's campaign parameters and
 * records the click.
 *
 * The server renders the plain URL, so the link works before (and
 * without) JavaScript; after hydration the href gains the page's
 * utm_* and rdt_cid values. Read through useSyncExternalStore so the
 * first client render matches the server's and hydration is clean.
 */
export function TrackedCta({
  href,
  event,
  location,
  signup = false,
  variant = "primary",
  size = "default",
  children,
}: {
  href: string;
  event: "reddit_primary_cta_click" | "reddit_secondary_cta_click";
  /* Where on the page the button sits, sent with the event. */
  location: string;
  /* Also records reddit_signup_click: the button opens signup. */
  signup?: boolean;
  variant?: "primary" | "secondary";
  size?: "default" | "small" | "large";
  children: ReactNode;
}) {
  const search = useSyncExternalStore(
    neverChanges,
    () => window.location.search,
    () => "",
  );
  const target = href.startsWith("#") ? href : withTrackingParams(href, search);

  const className = [
    styles.cta,
    variant === "primary" ? styles.ctaPrimary : styles.ctaSecondary,
    size === "small" ? styles.ctaSmall : size === "large" ? styles.ctaLarge : "",
  ].join(" ");

  function handleClick() {
    const params = { cta_location: location, ...trackingParams(window.location.search) };
    trackEvent(event, params);
    if (signup) trackEvent("reddit_signup_click", params);
  }

  return (
    <a className={className} href={target} onClick={handleClick}>
      {children}
    </a>
  );
}
