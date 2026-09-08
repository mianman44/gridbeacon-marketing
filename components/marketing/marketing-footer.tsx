import Image from "next/image";
import Link from "next/link";
import styles from "./premium.module.css";

const groups = [
  { title: "Product", links: [["Features", "/features"], ["How it works", "/how-it-works"], ["Pricing", "/pricing"]] },
  { title: "Company", links: [["About", "/about"], ["Contact", "/contact"], ["Security", "/security"]] },
  { title: "Legal", links: [["Terms of Service", "/terms"], ["Privacy Policy", "/privacy"], ["Refund Policy", "/refund-policy"], ["Cancellation Policy", "/cancellation-policy"]] },
];

export function MarketingFooter() {
  return <footer className={styles.footer}><div className={styles.container}>
    <div className={styles.footerGrid}><div><Link href="/" className={styles.footerBrand} aria-label="GridBeacon home"><Image src="/branding/gridbeacon-lockup.png" alt="GridBeacon" width={1188} height={309} /></Link><p className={styles.footerIntro}>Local search visibility, clearly mapped. Built for businesses, SEO professionals and agencies.</p><div className={styles.footerCompany}><p>Operated by <a href="https://hustle-247.com" target="_blank" rel="noopener noreferrer">Hustle 24/7</a>.</p><p>Pasrur, Sialkot, Punjab, Pakistan</p><a href="mailto:support@gridbeaconhq.com">support@gridbeaconhq.com</a></div></div>{groups.map(group => <div key={group.title}><p className={styles.footerTitle}>{group.title}</p><nav className={styles.footerLinks} aria-label={`${group.title} links`}>{group.links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav></div>)}</div>
    <div className={styles.footerLegal}><p>© {new Date().getFullYear()} Hustle 24/7. GridBeacon. All rights reserved.</p><p>Your local advantage starts with a clearer view.</p></div>
  </div></footer>;
}
