import Link from "next/link";
import { BlogArticle } from "@/components/marketing/blog-article";
import styles from "@/components/marketing/blog.module.css";
import { BLOG_POSTS } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

const post = BLOG_POSTS[2];
const base = pageMetadata({ path: `/blog/${post.slug}`, title: post.title, description: post.description, image: { url: post.image, width: post.imageWidth, height: post.imageHeight, alt: post.imageAlt } });
export const metadata = { ...base, openGraph: { ...base.openGraph, type: "article" as const, publishedTime: post.date, modifiedTime: post.date } };

export default function RankingDropGuide() {
  return <BlogArticle post={post}>
    <p>A lower Google Maps ranking can reflect a real visibility change, a different measurement setup or an issue with the listing or scan. Start by confirming that you are comparing the same business, keyword and geographic points. Then check the profile and competitors before deciding what to change.</p>
    <p>This checklist is designed to help you narrow the explanation. It does not promise recovery or identify an algorithm update from one disappointing scan. If you need a baseline first, follow <Link href="/blog/how-to-check-google-maps-ranking">our Google Maps ranking walkthrough</Link>.</p>
    <nav className={styles.toc} aria-label="On this page"><strong>Diagnosis order</strong><ol><li><a href="#comparison">Check the comparison</a></li><li><a href="#scan">Confirm the scan completed</a></li><li><a href="#profile">Check the listing directly</a></li><li><a href="#changes">Review recent changes</a></li><li><a href="#competitors">Inspect competitors</a></li><li><a href="#followup">Choose a measured follow-up</a></li></ol></nav>
    <h2 id="comparison">1. Make sure the comparison is fair</h2>
    <p>Open the earlier and later scans and compare their settings. A wider radius or a shifted centre can lower the summary score simply because the new scan includes harder locations. A change from a square grid to rings also changes the sample.</p>
    <ul><li>Same Google Maps listing, including the correct branch?</li><li>Exact same keyword, not a city-modified or “near me” variation?</li><li>Same centre, radius, layout and point count?</li><li>Same excluded points and available language settings?</li><li>Similar timing and the same tracking method?</li></ul>
    <p><strong>Example:</strong> a scan with 20 of 25 points in the top 10 has 80% visibility. A wider scan with 30 of 61 points in the top 10 has about 49%. Those illustrative figures do not prove that the business lost positions at the original 25 points. You need a like-for-like comparison to establish that.</p>
    <h2 id="scan">2. Confirm that the scan completed</h2>
    <p>Check the scan status and date before treating missing results as a ranking loss. A failed or incomplete scan is a measurement problem. A completed scan where your listing was not returned at particular points is a different observation.</p>
    <p>If the result looks inconsistent, record the scan details and repeat the same setup once, after checking the cost. Avoid repeatedly spending credits on identical checks without a clear reason. If the issue persists, contact support with the keyword, date and affected scan.</p>
    <p>Look at the actual ranks as well as the average. A summary can hide whether the change affects a few edge points or the entire customer area. The <Link href="/blog/how-to-read-google-maps-ranking-heatmap">heatmap guide</Link> shows how to distinguish low numeric ranks from beyond-depth markers.</p>
    <h2 id="profile">3. Check the Business Profile directly</h2>
    <p>Open the exact listing in Google Maps and, if you manage it, review its status in Google Business Profile. Confirm the business identity and look for notices about verification, restrictions, closure or duplicate listings. A branded search can help check findability, but it does not replace tracking service keywords.</p>
    <p>If Google explicitly says the profile is suspended or disabled, follow its <a href="https://support.google.com/business/answer/4569145">official reinstatement and appeals guidance</a>. Google advises against creating a new profile for the same business as a workaround. A red heatmap alone is not evidence of suspension.</p>
    <p>If the profile is accessible and the problem only appears for one keyword or part of the map, continue with the narrower investigation below.</p>
    <h2 id="changes">4. Review changes around the first affected scan</h2>
    <p>Create a short timeline of known changes: categories, services, address or map pin, hours, website URL, site availability and important service-page edits. Record the date and what changed. Check for inaccurate information and correct verified errors.</p>
    <p>Google’s <a href="https://support.google.com/business/answer/7091">local ranking guidance</a> emphasizes relevance, distance and prominence, alongside complete and accurate profile information. It does not provide a checklist that guarantees a position.</p>
    <p>A change happening before a drop is a clue, not proof of causation. Avoid undoing every recent edit at once: you may remove accurate information and make the next result harder to interpret. Do not add locations, services or business-name keywords that misrepresent the business.</p>
    <h2 id="competitors">5. Inspect the places where competitors gained</h2>
    <p>Choose several affected points and inspect the businesses ranking above you. Is the same competitor appearing across the area, or do different businesses win in different neighborhoods? Compare unchanged points too; they can reveal whether the movement is localized.</p>
    <p>Record observable differences such as location, category, review count and rating. These are context, not a formula for explaining the ranking. More reviews alone cannot prove why one listing wins at a particular point.</p>
    <p>Use <Link href="/local-seo-competitor-analysis">GridBeacon’s competitor views</Link> to organize the investigation. Keep the original settings while you compare scans. If several keywords and locations change at once, broaden your investigation, but do not label the event an algorithm update without independent evidence.</p>
    <p>On paid plans, <Link href="/rank-mri">Rank MRI</Link> does much of this comparison for you. Click an affected point to see who is ahead, what differs and how the point has moved across comparable scans. It only compares scans that used the same settings, and it presents differences as evidence to check, not as the reason for a drop.</p>
    <h2 id="followup">6. Choose one follow-up and a review date</h2>
    <p>Your next action should follow the evidence. Fix a confirmed listing error, investigate a failed scan, address an inaccessible service page or monitor comparable scans when no clear problem is established. Record what you did and when.</p>
    <p>Use a consistent follow-up cadence that suits the business and scan budget. Review multiple comparable observations rather than promising a recovery date. Track calls and other business outcomes separately; a ranking change does not tell you how many leads were gained or lost.</p>
    <aside className={styles.note}><strong>A useful investigation note</strong><p>“The keyword and grid are unchanged. Six eastern points moved from positions 4–10 to 11–20, while the centre remained stable. The listing is accessible. We will inspect the competitors at those six points and compare the same setup at the next scheduled check.”</p><p>This is an illustrative note, not a claim about the screenshot above.</p></aside>
    <h2>Copy this ranking-drop checklist</h2>
    <ul><li>Record the first affected scan and the last comparable scan.</li><li>Confirm the exact listing, keyword and geographic settings.</li><li>Check completion status and individual point results.</li><li>Review the profile directly for explicit status notices.</li><li>List recent profile and website changes with dates.</li><li>Inspect competitors at affected and unaffected points.</li><li>Choose a specific action or monitoring step.</li><li>Save the action date and next review date.</li></ul>
    <p>The goal is a defensible explanation and a useful next step. When the evidence is incomplete, record what remains uncertain instead of presenting a guess as the cause.</p>
  </BlogArticle>;
}
