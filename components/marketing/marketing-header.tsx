"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import styles from "./premium.module.css";

const navigation = [
  { href: "/features", label: "Features" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function MarketingHeader() {
  const [open, setOpen] = useState(false);
  return <header className={styles.header} onKeyDown={event => { if (event.key === "Escape") { setOpen(false); document.getElementById("marketing-menu-button")?.focus(); } }}>
    <div className={styles.headerInner}>
      <Link href="/" className={styles.brand} onClick={() => setOpen(false)}><Image src="/branding/gridbeacon-mark.png" alt="" width={352} height={352} />GridBeacon</Link>
      <nav className={styles.navigation} aria-label="Main navigation">{navigation.map(item => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav>
      <div className={styles.accountLinks}><Link href="/login">Sign in</Link><Link href="/signup" className={styles.navCta}>Get started</Link></div>
      <button type="button" className={styles.menuButton} id="marketing-menu-button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="marketing-mobile-menu" onClick={() => setOpen(!open)}>{open ? <X size={23} /> : <Menu size={23} />}</button>
    </div>
    <nav id="marketing-mobile-menu" className={styles.mobileMenu} aria-label="Mobile navigation" hidden={!open}>{navigation.map(item => <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}<Link href="/login" onClick={() => setOpen(false)}>Sign in</Link><Link href="/signup" className={styles.navCta} onClick={() => setOpen(false)}>Get started</Link></nav>
  </header>;
}
