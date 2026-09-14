import Image from "next/image";
import Link from "next/link";

import { LOGIN_URL, SIGNUP_URL } from "@/lib/seo";

import { TrackedCta } from "./tracked-cta";
import styles from "./reddit.module.css";

const LOGO = "/branding/gridbeacon-logo-tagline-424.webp";

/* Paid traffic gets one decision to make, so the header carries the
   logo, a way back in for existing users and the signup button --
   no site navigation. The logo is not a link for the same reason. */
export function RedditHeader() {
  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.headerInner}`}>
        <Image
          src={LOGO}
          alt="GridBeacon"
          width={424}
          height={120}
          className={styles.logo}
          loading="eager"
        />
        <nav aria-label="Account" className={styles.headerActions}>
          <a className={styles.login} href={LOGIN_URL}>Log in</a>
          <TrackedCta
            href={SIGNUP_URL}
            event="reddit_primary_cta_click"
            location="header"
            signup
            size="small"
          >
            Start Free
          </TrackedCta>
        </nav>
      </div>
    </header>
  );
}

export function RedditFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles.footerInner}`}>
        <Image src={LOGO} alt="GridBeacon" width={424} height={120} className={styles.footerLogo} />
        <nav aria-label="Legal and contact">
          <ul className={styles.footerLinks}>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
        <p className={styles.copyright}>© {new Date().getFullYear()} GridBeacon. All rights reserved.</p>
      </div>
    </footer>
  );
}
