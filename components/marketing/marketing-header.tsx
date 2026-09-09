"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./stitch-header.module.css";

const links = [
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
        <Link href="/" className={styles.brand} aria-label="GridBeacon home"><span className={styles.logoFrame}><img src="/branding/gridbeacon-transparent.webp" alt="GridBeacon" width="256" height="256" /></span></Link>
        <nav className={styles.navigation} aria-label="Main navigation">{navigation}</nav>
      </div>
      <div className={styles.actions}>
        <Link className={styles.signin} href="/login">Sign in</Link>
        <Link className={styles.cta} href="/signup"><span>Start Free — 500 Credits</span><span className={styles.noCard}>No CC required</span></Link><Link className={styles.account} href="/login" aria-label="Your account"><span className={styles.person} aria-hidden="true">person</span></Link>
        <button id="marketing-menu-button" className={styles.toggle} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="marketing-mobile-menu" onClick={() => setOpen(!open)}>{open ? "✕" : "☰"}</button>
      </div>
    </div>
    <nav id="marketing-mobile-menu" className={styles.mobile} aria-label="Mobile navigation" hidden={!open}>{navigation}<Link href="/login">Sign In</Link></nav>
  </header></>;
}
