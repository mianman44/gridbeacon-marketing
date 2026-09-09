import Image from "next/image";
import Link from "next/link";
import styles from "./stitch-footer.module.css";

const groups = [
  { title: "Product", links: [["Geo-Grid Heatmaps", "/features#deep-dive-grid"], ["Interactive Scan Matrix", "/#live-grid-preview"], ["How Scans Work", "/how-it-works"], ["White-Label Portal", "/#agency-solutions"], ["Credit Pricing", "/pricing"]] },
  { title: "Comparisons", links: [["vs Local Falcon", "/features#comparison-table"], ["vs BrightLocal", "/features#comparison-table"], ["vs Whitespark", "/features#comparison-table"], ["vs Semrush Map Ranker", "/features#comparison-table"]] },
  { title: "Company & Legal", links: [["Local SEO Glossary", "/#local-seo-glossary"], ["Agency Partner Program", "/#agency-solutions"], ["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"], ["Security & Compliance", "/security"]] },
];

export function MarketingFooter() {
  return <footer className={styles.footer}>
    <div className={styles.inner}>
      <div className={styles.grid}>
        <div className={styles.brandColumn}>
          <Link href="/" className={styles.brand} aria-label="GridBeacon home"><Image src="/features-assets/asset-3.jpg" alt="" width={32} height={32} /><span>Grid<span className={styles.blue}>Beacon</span></span></Link>
          <p className={styles.intro}>Local search visibility, clearly mapped for businesses and SEO agencies. Precision geo-coordinates, automated matrix scans, and white-label client telemetry.</p>
          <div className={styles.status}>Status: All Global Scanners Operational (99.98%)</div>
        </div>
        {groups.map(group => <div key={group.title}><h4 className={styles.title}>{group.title}</h4><nav className={styles.links} aria-label={`${group.title} footer links`}>{group.links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</nav></div>)}
      </div>
      <div className={styles.bottom}><p>© {new Date().getFullYear()} GridBeacon. All rights reserved.</p><nav aria-label="Footer utility links"><Link href="/contact">Status Console</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav></div>
    </div>
  </footer>;
}
