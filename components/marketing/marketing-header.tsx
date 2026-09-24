"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LOGIN_URL, SIGNUP_URL } from "@/lib/seo";
import styles from "./stitch-header.module.css";

const links = [
  ["/google-maps-rank-tracker", "Google Maps Rank Tracker"],
  ["/features", "Features"],
  ["/how-it-works", "How it Works"],
  ["/pricing", "Pricing"],
] as const;

export function MarketingHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navigation = links.map(([href, label]) => <Link key={href} href={href} className={pathname === href ? styles.active : undefined} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>);
  return <><div className={styles.spacer} aria-hidden="true" /><header className={styles.header} onKeyDown={event => { if (event.key === "Escape") { setOpen(false); document.getElementById("marketing-menu-button")?.focus(); } }}>
    <div className={styles.inner}>
      <div className={styles.left}>
        <Link href="/" className={styles.brand} aria-label="GridBeacon home"><img src="/branding/gridbeacon-logo-tagline-424.webp" alt="GridBeacon — Google Maps Rank Intelligence" width="424" height="120" fetchPriority="low" /></Link>
        <nav className={styles.navigation} aria-label="Main navigation">{navigation}</nav>
      </div>
      <div className={styles.actions}>
        {/* Sign-in and sign-up live on the app host. Plain anchors,
            because they leave this site. */}
        <a className={styles.signin} href={LOGIN_URL}>Sign in</a>
        <a className={styles.cta} href={SIGNUP_URL}><span>Start Free — 500 Credits</span><span className={styles.noCard}>No CC required</span></a><a className={styles.account} href={LOGIN_URL} aria-label="Sign in to your account"><span className={styles.person} aria-hidden="true">person</span></a>
        <button id="marketing-menu-button" className={styles.toggle} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="marketing-mobile-menu" onClick={() => setOpen(!open)}>{open ? "✕" : "☰"}</button>
      </div>
    </div>
    <nav id="marketing-mobile-menu" className={styles.mobile} aria-label="Mobile navigation" hidden={!open}>{navigation}<a href={LOGIN_URL}>Sign In</a></nav>
  </header></>;
}
