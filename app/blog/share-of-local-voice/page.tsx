import Link from "next/link";
import { BlogArticle } from "@/components/marketing/blog-article";
import styles from "@/components/marketing/blog.module.css";
import { BLOG_POSTS } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

/* Formulas match backend/app/services/keyword_report_service.py:
   SoLV = points in the top 3 / all points; ATRP counts unranked as 21. */
const post = BLOG_POSTS[4];
const base = pageMetadata({ path: `/blog/${post.slug}`, title: post.seoTitle, absoluteTitle: true, description: post.description, image: { url: post.image, width: post.imageWidth, height: post.imageHeight, alt: post.imageAlt } });
export const metadata = { ...base, openGraph: { ...base.openGraph, type: "article" as const, publishedTime: post.date, modifiedTime: post.date } };

export default function ShareOfLocalVoiceGuide() {
  return <BlogArticle post={post}>
    <p>Share of local voice (SoLV) is the percentage of points in a geo-grid scan where a business ranks in the top 3 on Google Maps. If you rank in the top 3 at 20 of 81 points, your SoLV is about 25%. It answers a simple question: across the area you scanned, how much of it puts you in the map pack?</p>
    <p>This guide covers the formula, worked examples, how SoLV differs from average rank, and how to use it in reporting without overstating what it means.</p>
    <nav className={styles.toc} aria-label="On this page"><strong>In this guide</strong><ol><li><a href="#formula">The formula</a></li><li><a href="#why-top-3">Why the top 3</a></li><li><a href="#vs-rank">SoLV vs ARP and ATRP</a></li><li><a href="#examples">Worked examples</a></li><li><a href="#use">Using SoLV in reports</a></li><li><a href="#limits">What SoLV does not measure</a></li></ol></nav>
    <h2 id="formula">1. The formula</h2>
    <p><strong>SoLV = points where the business ranks 1–3 ÷ all points scanned × 100.</strong></p>
    <p>Every point in the scan counts in the denominator, including points where the business does not appear at all. Excluded points, the ones you remove from a custom scan area, are not scanned and not counted.</p>
    <h2 id="why-top-3">2. Why the top 3</h2>
    <p>Google&apos;s local results in regular search usually show three businesses in the map pack before a &ldquo;more places&rdquo; link. Positions 1–3 are the ones a searcher sees without clicking further, so a top-3 share is a reasonable proxy for being visible where it matters most. Positions 4–10 still count for something, which is why GridBeacon also reports visibility: the share of points in the top 10.</p>
    <h2 id="vs-rank">3. SoLV vs ARP and ATRP</h2>
    <div className={styles.tableWrap}><table><caption>The three summary figures GridBeacon reports for a scan</caption><thead><tr><th>Metric</th><th>What it counts</th><th>Best for</th></tr></thead><tbody>
      <tr><td>ARP (Average Rank Position)</td><td>Mean rank over the points where the business ranks</td><td>How well you rank where you appear</td></tr>
      <tr><td>ATRP (Average Total Rank Position)</td><td>Mean rank over every point, counting each not-ranked point as 21</td><td>Overall position, including where you are missing</td></tr>
      <tr><td>SoLV (Share of Local Voice)</td><td>Percentage of all points in the top 3</td><td>How much of the area puts you in the map pack</td></tr>
    </tbody></table></div>
    <p>ARP can flatter a business. Rank #2 at five points and nowhere else, and ARP is 2.0 while most of the area never sees you. ATRP and SoLV both count every point, so they expose that. Read the three together, and check the heatmap to see where the numbers come from.</p>
    <h2 id="examples">4. Worked examples</h2>
    <p>These are illustrative numbers, not results from the screenshot above.</p>
    <ul><li><strong>Strong centre, weak edges.</strong> A 7 × 7 scan (49 points): top 3 at 18 points, ranked 4–10 at 15, not ranked at 16. SoLV = 18 ÷ 49 ≈ 37%. Visibility (top 10) = 33 ÷ 49 ≈ 67%.</li><li><strong>Everywhere, but rarely on top.</strong> Ranked 4–8 at all 49 points, top 3 at none. SoLV = 0%, even though the business appears at every point. The map pack goes to others.</li><li><strong>Same rank, different grid.</strong> The first business above rescanned on a 13 × 13 grid with a wider radius might drop to 20% SoLV without losing a single position near the office, because the new grid adds harder points at the edges.</li></ul>
    <p>The last example is why SoLV only compares between scans with the same keyword, centre, grid size, radius and excluded points.</p>
    <h2 id="use">5. Using SoLV in reports</h2>
    <ul><li><strong>Track it per keyword.</strong> SoLV for &ldquo;emergency plumber&rdquo; and for &ldquo;water heater installation&rdquo; are different stories. Average them only with care.</li><li><strong>Compare against a competitor on the same scan.</strong> Because every scan records every business at every point, you can compare a competitor&apos;s top-3 coverage with yours from the same searches. The <Link href="/local-seo-competitor-analysis">competitor analysis tools</Link> and Gap view show where each one leads.</li><li><strong>Report the trend, not one number.</strong> A move from 24% to 31% over several scans on fixed settings is meaningful. One scan&apos;s figure on its own says little.</li><li><strong>Across locations.</strong> GridBeacon&apos;s Keyword Reports and Location Reports show ARP, ATRP and SoLV for each location&apos;s latest scan, so you can see which branch needs attention. See <Link href="/local-seo-report">local SEO reports</Link>.</li></ul>
    <h2 id="limits">6. What SoLV does not measure</h2>
    <p>SoLV is a share of grid points, not a share of searches, clicks or calls. Points are evenly spaced, but customers are not: a point over a dense neighbourhood and one over an industrial park count the same. Use it to describe ranking coverage across your area, and keep calls, leads and revenue in separate measures.</p>
    <aside className={styles.note}><strong>A note on the name</strong><p>&ldquo;Share of local voice&rdquo; is widely used for this top-3 measure in local SEO. SoLV&reg; is a registered trademark of Local Falcon LLC; GridBeacon uses the term descriptively for the calculation above.</p></aside>
    <p>To see these numbers for your own business, the <Link href="/google-maps-rank-checker">free Google Maps rank checker</Link> runs a 3 × 3 grid. For the full method behind every figure, read <Link href="/how-gridbeacon-checks-rankings">how GridBeacon checks rankings</Link>, and for choosing the grid itself, see <Link href="/blog/geo-grid-size-and-radius">how to choose a geo-grid size and radius</Link>.</p>
  </BlogArticle>;
}
