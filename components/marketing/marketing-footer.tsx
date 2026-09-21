import Image from "next/image";
import Link from "next/link";
import styles from "./stitch-footer.module.css";

/* Every public page is reachable from here, which is what keeps
   /about, /contact, the billing policies and the Google Maps landing
   page from being orphans that only the sitemap knows about.

   Competitor links point only at real comparison pages. Four
   competitor names once all pointed at one generic table, promising
   pages that did not exist; add a name here only once its page does. */
const groups = [
  { title: "Product", links: [["Features", "/features"], ["How It Works", "/how-it-works"], ["Pricing", "/pricing"], ["Google Maps Rank Tracker", "/google-maps-rank-tracker"], ["Free Google Maps Rank Checker", "/google-maps-rank-checker"], ["Local SEO Glossary", "/#local-seo-glossary"]] },
  { title: "Company", links: [["About", "/about"], ["Contact", "/contact"], ["Security", "/security"], ["Local Falcon Alternative", "/local-falcon-alternative"]] },
  { title: "Legal", links: [["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"], ["Refund Policy", "/refund-policy"], ["Cancellation Policy", "/cancellation-policy"]] },
];

export function MarketingFooter() {
  return <footer className={styles.footer}>
    <div className={styles.inner}>
      <div className={styles.grid}>
        <div className={styles.brandColumn}>
          <Link href="/" className={styles.brand} aria-label="GridBeacon home"><Image src="/branding/gridbeacon-logo-tagline.png" alt="GridBeacon — Google Maps Rank Intelligence" width={1200} height={339} sizes="240px" /></Link>
          <p className={styles.intro}>Local search visibility, clearly mapped for businesses and SEO agencies. Geo-grid scans, competitor grids and client-ready reports for Google Business Profiles.</p>
        </div>
        {groups.map(group => <div key={group.title}><h2 className={styles.title}>{group.title}</h2><nav className={styles.links} aria-label={`${group.title} footer links`}>{group.links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</nav></div>)}
      </div>
      <div className={styles.bottom}><p>© {new Date().getFullYear()} GridBeacon. All rights reserved.</p><nav aria-label="Footer utility links"><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav></div>
    </div>
  </footer>;
}
