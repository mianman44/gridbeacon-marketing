import Link from "next/link";
import { BlogArticle } from "@/components/marketing/blog-article";
import styles from "@/components/marketing/blog.module.css";
import { BLOG_POSTS } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

/* Spacing follows the backend: points are radius / ((size - 1) / 2)
   miles apart. Credits are one per active point. */
const post = BLOG_POSTS[3];
const base = pageMetadata({ path: `/blog/${post.slug}`, title: post.seoTitle, absoluteTitle: true, description: post.description, image: { url: post.image, width: post.imageWidth, height: post.imageHeight, alt: post.imageAlt } });
export const metadata = { ...base, openGraph: { ...base.openGraph, type: "article" as const, publishedTime: post.date, modifiedTime: post.date } };

export default function GridSizeGuide() {
  return <BlogArticle post={post}>
    <p>The right geo-grid covers the area your customers search from, with points close enough together to show where your ranking changes. Too small and you miss the edges of your market. Too sparse and you miss what happens between neighborhoods. Too large and you spend credits measuring places no customer would call you from.</p>
    <p>This guide gives you a way to choose a grid size and radius, the spacing and credit cost of common settings, and starting points for different kinds of business. If you are new to grids, start with <Link href="/what-is-a-geo-grid">what a geo-grid is</Link>.</p>
    <nav className={styles.toc} aria-label="On this page"><strong>In this guide</strong><ol><li><a href="#terms">Size, radius and spacing</a></li><li><a href="#radius">Choose the radius first</a></li><li><a href="#size">Then choose the grid size</a></li><li><a href="#table">Common settings compared</a></li><li><a href="#types">Starting points by business type</a></li><li><a href="#budget">Fit it to your credit budget</a></li></ol></nav>
    <h2 id="terms">1. Size, radius and spacing</h2>
    <ul><li><strong>Grid size</strong> is the number of points per side. A 9 × 9 grid has 81 points.</li><li><strong>Radius</strong> is how far the grid reaches from its centre along each axis. A 4-mile radius covers 8 miles from edge to edge.</li><li><strong>Spacing</strong> is the distance between neighbouring points: the radius divided by half of one less than the size.</li></ul>
    <p>So a 9 × 9 grid with a 4-mile radius puts points 4 ÷ ((9 − 1) ÷ 2) = 1 mile apart. Spacing is the setting people forget, and it decides how much detail you get. Widening the radius without adding points spreads the same number of searches over a bigger area.</p>
    <h2 id="radius">2. Choose the radius first</h2>
    <p>Start from where your customers are, not from a default number. Ask how far people realistically travel to you, or how far you travel to them, and set the radius to reach a little past that edge. You want to see where your ranking fades, so the grid should extend just beyond it.</p>
    <ul><li><strong>Customers come to you</strong> (dentist, restaurant, retail): the distance most customers will drive or walk, often a few miles in a city.</li><li><strong>You go to customers</strong> (plumber, roofer, HVAC): your real service area, which is often much wider.</li><li><strong>Dense city vs. rural area:</strong> a mile in a dense downtown can cross several neighbourhoods with different competitors; in a rural area one mile may contain no competitors at all. Dense areas usually need tighter spacing.</li></ul>
    <p>Service-area businesses that hide their address need to place the centre themselves. The <Link href="/service-area-business-rank-tracking">service-area business guide</Link> covers how.</p>
    <h2 id="size">3. Then choose the grid size</h2>
    <p>With the radius fixed, pick the size that gives useful spacing. About one mile between points is a practical starting point for most metro areas; tighter spacing for dense downtowns, wider for rural service areas. Larger grids give more detail but cost more per scan, and the cost repeats every time you rescan.</p>
    <h2 id="table">4. Common settings compared</h2>
    <div className={styles.tableWrap}><table><caption>Point spacing and credit cost for common geo-grid settings (one credit per point)</caption><thead><tr><th>Grid</th><th>Radius</th><th>Spacing</th><th>Points / credits</th></tr></thead><tbody>
      <tr><td>3 × 3</td><td>1 mile</td><td>1 mile</td><td>9</td></tr>
      <tr><td>5 × 5</td><td>2 miles</td><td>1 mile</td><td>25</td></tr>
      <tr><td>7 × 7</td><td>3 miles</td><td>1 mile</td><td>49</td></tr>
      <tr><td>9 × 9</td><td>4 miles</td><td>1 mile</td><td>81</td></tr>
      <tr><td>9 × 9</td><td>10 miles</td><td>2.5 miles</td><td>81</td></tr>
      <tr><td>13 × 13</td><td>6 miles</td><td>1 mile</td><td>169</td></tr>
      <tr><td>21 × 21</td><td>10 miles</td><td>1 mile</td><td>441</td></tr>
    </tbody></table></div>
    <p>Notice the two 9 × 9 rows. Both cost 81 credits, but at a 10-mile radius each point stands for a much larger patch of the map. If your ranking changes within a couple of miles, that grid can skip right over it.</p>
    <h2 id="types">5. Starting points by business type</h2>
    <p>These are starting points to adjust, not rules. Run one scan, look at where the ranking fades, and widen or tighten from there.</p>
    <ul><li><strong>Neighbourhood storefront</strong> (café, salon, dentist in a city): 5 × 5 or 7 × 7, 1–3 miles.</li><li><strong>Destination storefront</strong> (specialist clinic, law firm, car dealer): 7 × 7 or 9 × 9, 3–8 miles.</li><li><strong>City-wide service business</strong> (plumber, HVAC, electrician): 9 × 9 to 13 × 13, roughly 6–15 miles depending on how far you travel.</li><li><strong>Metro or regional service area</strong> (roofer, restoration): 13 × 13 or larger over a wide radius, or several smaller grids centred on the areas that matter most.</li></ul>
    <p>The <Link href="/local-rank-tracking-by-industry">industry guides</Link> give trade-specific settings, such as the grid and radius we suggest for <Link href="/local-rank-tracking-for-hvac">HVAC companies</Link> or <Link href="/local-rank-tracking-for-dentists">dental practices</Link>.</p>
    <p>If part of the grid falls over water, a neighbouring city you do not serve or empty land, exclude those points. Excluded points are not searched and not charged, and they stop meaningless results from dragging down your averages.</p>
    <h2 id="budget">6. Fit it to your credit budget</h2>
    <p>Monthly credits are points × keywords × scans per month × locations. Three keywords on a 9 × 9 grid scanned weekly is about 3 × 81 × 4.33 ≈ 1,050 credits a month for one location. The same three keywords on a 13 × 13 grid is about 2,200.</p>
    <p>If the budget is tight, keep the grid that answers your question and scan less often, rather than shrinking the grid until it no longer covers your market. A consistent monthly scan is more useful than a weekly one that keeps changing shape. Check <Link href="/pricing">plan credit allowances</Link> before committing to a routine.</p>
    <aside className={styles.note}><strong>Keep the settings fixed</strong><p>Once you choose a centre, grid and radius, keep them for every scan you want to compare. Changing any of them changes which locations are measured, so the summary figures move even when nothing about your ranking did. If you need a bigger area, treat it as a new baseline.</p></aside>
    <h2>Quick checklist</h2>
    <ul><li>Set the radius to reach just past your real customer area.</li><li>Pick a size that gives about a mile between points in a metro area.</li><li>Exclude points you do not serve.</li><li>Check the credit cost × keywords × scans per month.</li><li>Run one scan, see where the ranking fades, and adjust once.</li><li>Then keep the settings fixed.</li></ul>
    <p>To try it without an account, the <Link href="/google-maps-rank-checker">free Google Maps rank checker</Link> runs a 3 × 3 grid around any business. To see how each point is searched, read <Link href="/how-gridbeacon-checks-rankings">how GridBeacon checks rankings</Link>.</p>
  </BlogArticle>;
}
