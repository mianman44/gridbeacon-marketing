import Link from "next/link";
import { BlogArticle } from "@/components/marketing/blog-article";
import styles from "@/components/marketing/blog.module.css";
import { BLOG_POSTS } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

const post = BLOG_POSTS[0];
const baseMetadata = pageMetadata({ path: `/blog/${post.slug}`, title: post.title, description: post.description, image: { url: post.image, width: 1498, height: 1050, alt: post.imageAlt } });
export const metadata = { ...baseMetadata, openGraph: { ...baseMetadata.openGraph, type: "article" as const, publishedTime: post.date, modifiedTime: post.date } };

export default function CheckGoogleMapsRankingPage() {
  return <BlogArticle post={post}>
    <p>To check your Google Maps ranking across a city, run the same keyword search from multiple locations around your business. A geo-grid scan does this for you and displays the results on a map. One search from your office only shows one location; it does not tell you how visible you are across your service area.</p>
    <p>This walkthrough creates a baseline you can repeat. You will need your business’s Google Maps link, one service keyword and an idea of where your customers come from.</p>
    <nav className={styles.toc} aria-label="On this page"><strong>In this walkthrough</strong><ol><li><a href="#listing">Choose the right listing</a></li><li><a href="#keyword">Pick one keyword</a></li><li><a href="#settings">Set the scan area</a></li><li><a href="#read">Read the results</a></li><li><a href="#investigate">Investigate weak areas</a></li><li><a href="#repeat">Repeat consistently</a></li></ol></nav>
    <h2 id="listing">1. Choose the exact business listing</h2>
    <p>Open your business in Google Maps and copy its share link. Add the business in GridBeacon using that link, then confirm you have the correct listing. Check the name, location and other identifying details before spending credits. Similar business names can otherwise lead you to track the wrong company.</p>
    <p>For a business that travels to customers and hides its address, use the listing’s location as your starting point. Do not assume the centre of the city is the right scan centre. See the <Link href="/service-area-business-rank-tracking">service-area business guide</Link> for that setup.</p>
    <h2 id="keyword">2. Pick one service keyword</h2>
    <p>Start with a phrase a customer might use when they need your service, such as “garage door repair” or “emergency plumber”. A search for your business name answers a different question: whether someone who already knows you can find you.</p>
    <p>Keep the wording unchanged for later comparisons. “Plumber”, “emergency plumber” and “plumber in Austin” can produce different results. Add more keywords after you have learned how to interpret the first one.</p>
    <h2 id="settings">3. Set a useful scan area</h2>
    <p>Begin with a 5 × 5 square grid around the listing and a radius that covers the nearby area you want to inspect. A two-mile radius is a manageable illustrative starting point for a neighborhood business; it is not a universal recommendation. Choose your actual customer area and check your plan’s available settings.</p>
    <ul><li><strong>Centre:</strong> the geographic point the grid surrounds.</li><li><strong>Radius:</strong> how far the grid extends from its centre along each axis.</li><li><strong>Grid size:</strong> the number of points per side. A 5 × 5 grid checks 25 locations.</li></ul>
    <p>In this example, a two-mile radius spans four miles across each axis. With five points per side, adjacent points are one mile apart. That spacing matters: widening the radius without adding points gives you less detail between neighborhoods.</p>
    <p>Review the credit cost before running the scan. At one credit per point, a full 5 × 5 scan uses 25 credits. Check <Link href="/pricing">current plan limits</Link> before selecting larger grids or additional features.</p>
    <h2 id="read">4. Read the pattern before the summary</h2>
    <p>When the scan finishes, inspect the positions at individual points. Look for a strong centre, weaker edges or a particular direction where visibility drops. Then use the summary metrics to describe that pattern.</p>
    <ul><li><strong>Top-three coverage:</strong> the share of scanned points where the business ranks in positions 1–3.</li><li><strong>Visibility:</strong> the share of scanned points where the business ranks in the top 10.</li><li><strong>Not found:</strong> the business was not returned within the results captured at that point. It does not prove the listing has disappeared from Google.</li></ul>
    <p>For example, if you rank in the top 10 at 15 of 25 scanned points, visibility is 60%. If five points are in the top three, top-three coverage is 20%. These are illustrative calculations, not results from the screenshot above.</p>
    <p>A ranking map measures search visibility. It does not directly measure calls, leads, revenue or your share of actual search traffic. Keep those outcomes separate in your reporting.</p>
    <h2 id="investigate">5. Investigate one weak area</h2>
    <p>Open a point where you rank poorly and inspect the businesses ahead of you. Compare several nearby points before deciding whether the pattern is consistent. Record what you see and what you still need to check.</p>
    <p>Google describes local ranking in terms of relevance, distance and prominence in its <a href="https://support.google.com/business/answer/7091">local ranking guidance</a>. A weak area may reflect several factors. A heatmap alone cannot establish that reviews, a category or a website change caused the result.</p>
    <p>Choose a specific follow-up, such as checking that your profile accurately lists the relevant service or reviewing a competitor that appears across several points. Use the <Link href="/local-seo-competitor-analysis">competitor comparison tools</Link> to make that investigation easier.</p>
    <h2 id="repeat">6. Save the baseline and repeat consistently</h2>
    <p>Record the scan date, business, exact keyword, centre, radius, grid size and any excluded points. Keep these settings fixed when comparing later scans. If you expand the area, treat that as a new baseline.</p>
    <p>A weekly check is a practical starting cadence during active SEO work, adjusted to your budget and needs. Compare several scans before describing a trend. Note profile and website changes alongside the dates, but do not assume a change caused a ranking movement just because it happened first.</p>
    <h2>Your first-scan checklist</h2>
    <ul><li>Confirm the correct Google Maps listing.</li><li>Use one relevant service keyword.</li><li>Choose a clear centre, grid size and radius.</li><li>Review the scan cost.</li><li>Inspect individual points and one competitor pattern.</li><li>Save the settings for your next comparison.</li></ul>
  </BlogArticle>;
}
