import Image from "next/image";
import Link from "next/link";
import { BlogArticle } from "@/components/marketing/blog-article";
import styles from "@/components/marketing/blog.module.css";
import { BLOG_POSTS } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

const post = BLOG_POSTS[1];
const base = pageMetadata({ path: `/blog/${post.slug}`, title: post.title, description: post.description, image: { url: post.image, width: post.imageWidth, height: post.imageHeight, alt: post.imageAlt } });
export const metadata = { ...base, openGraph: { ...base.openGraph, type: "article" as const, publishedTime: post.date, modifiedTime: post.date } };

export default function HeatmapGuide() {
  return <BlogArticle post={post}>
    <p>A Google Maps ranking heatmap shows your position at sampled locations for one keyword. Read it by checking the settings, inspecting individual ranks and then looking for geographic patterns. The summary score helps describe the map, but it cannot explain every neighborhood or tell you why a competitor ranks higher.</p>
    <p>Below are five worked readings from three historical GridBeacon scans. The figures are visible in the screenshots; the suggested next steps are investigations, not proven explanations of these businesses’ rankings. If you have not run a scan yet, start with <Link href="/blog/how-to-check-google-maps-ranking">the first-scan walkthrough</Link>.</p>
    <nav className={styles.toc} aria-label="On this page"><strong>Five ways to read the map</strong><ol><li><a href="#strong">Strong coverage everywhere sampled</a></li><li><a href="#coverage">Top-ten coverage versus top-three coverage</a></li><li><a href="#direction">A weaker side of the map</a></li><li><a href="#limited">Limited coverage over a wide area</a></li><li><a href="#not-found">Beyond the captured result depth</a></li></ol></nav>
    <h2>First, check what you are measuring</h2>
    <p>Read the keyword, date, centre, radius and layout before interpreting any colours. A ring layout and a square grid sample different locations. A wider radius also changes the question: you are checking a larger territory, not necessarily losing visibility at the original points.</p>
    <ul><li><strong>Visibility:</strong> percentage of scanned points ranking in the top 10.</li><li><strong>Top three:</strong> percentage of points ranking in positions 1–3.</li><li><strong>Individual rank:</strong> the position returned for that sampled coordinate.</li></ul>
    <p>Always read the numbers and legend as well as the colours. Points are samples, not measurements of every street or of how many people search there.</p>
    <h2 id="strong">1. Strong coverage everywhere sampled</h2>
    <p>The Austin insulation scan above shows 61 of 61 points in the top three, 100% visibility and an average rank of 1.3. Its four rings cover a seven-mile radius. The map is consistently green across the sampled area, rather than being strong only beside the business.</p>
    <p><strong>What you can say:</strong> this business had strong sampled coverage for “attic insulation austin” at the time of the scan.</p>
    <p><strong>What you cannot say:</strong> it dominates every insulation query, gets every local lead or ranks equally well beyond the scanned boundary. The result applies to this keyword, time and set of coordinates.</p>
    <p><strong>Next step:</strong> retain this scan as a baseline. If you need to test a wider area or a different service keyword, create a separate baseline rather than mixing it into the original comparison.</p>
    <h2 id="coverage">2. Top-ten coverage is not top-three coverage</h2>
    <figure className={styles.figure}><Image src="/marketing/google-maps-rank-tracker/ac-repair-grid-daphne-20261006.png" alt="Daphne ac repair scan: 18 points in positions 1–3, 34 in positions 4–10 and nine in positions 11–20" width={1498} height={1050} sizes="(max-width: 800px) 100vw, 760px" /><figcaption>Historical Daphne scan, October 5, 2026. Four rings, five-mile radius and 61 points. Business name obscured.</figcaption></figure>
    <p>This “ac repair” scan shows 18 points in positions 1–3, 34 in positions 4–10 and nine in positions 11–20. Adding the first two groups gives 52 points in the top 10.</p>
    <p>The arithmetic is 52 ÷ 61 × 100 = approximately 85% visibility. Top-three coverage is 18 ÷ 61 × 100 = approximately 30%. Both summaries can be correct at the same time: the listing appears within the top 10 broadly, but reaches the top three at fewer points.</p>
    <p><strong>Next step:</strong> inspect points ranked 4–10 and compare the businesses above you. Prioritize locations relevant to your customers. Do not describe 85% visibility as 85% of customer traffic or calls.</p>
    <h2 id="direction">3. One side of the map is weaker</h2>
    <p>In the same Daphne screenshot, several green points sit west and southwest of the business marker. More blue and orange points appear toward the east and northeast, including ranks 11–15. The overall score hides this directional difference.</p>
    <p><strong>What you can say:</strong> results vary across the sampled directions. You cannot infer from that pattern alone whether distance, competitors or relevance caused it. Notice that some sampled points are over water; geographic coverage is not the same as commercially useful coverage.</p>
    <p><strong>Next step:</strong> open several weak points where customers actually live or work. Record which competitors recur. If you change the area or remove irrelevant points, save that configuration as a new baseline so the next comparison uses the same sample.</p>
    <h2 id="limited">4. Limited coverage across a wide area</h2>
    <figure className={styles.figure}><Image src="/marketing/google-maps-rank-tracker/jeweler-grid-new-york-20261006.png" alt="New York jeweler scan showing two top-three points, eight points ranked 4–10 and many weaker points" width={1498} height={1050} sizes="(max-width: 800px) 100vw, 760px" /><figcaption>Historical New York scan, October 4, 2026. Four rings, seven-mile radius and 61 points. This is a single snapshot, not a before-and-after comparison.</figcaption></figure>
    <p>The “jeweler new york” scan shows two top-three points and eight points ranked 4–10. Together, 10 of 61 points are in the top 10: approximately 16%, matching the displayed visibility. Top-three coverage rounds to 3%.</p>
    <p>The map crosses a broad area of New York and neighboring New Jersey. That is a very different sample from a few blocks around a shop. The red and orange points show limited coverage for this chosen query and territory; they do not, by themselves, show that the business lost rankings.</p>
    <p><strong>Next step:</strong> check whether this radius matches the business’s actual customer area and whether the keyword reflects what it sells. A narrower diagnostic scan may help you understand nearby performance, but it must remain separate from the wider baseline.</p>
    <h2 id="not-found">5. A numeric low rank and “not found” are different</h2>
    <p>The New York image also contains numeric positions such as 21, 27 and 40, alongside grey “40+” markers. Its legend combines “21+ / Unranked” into one summary group. Inspect the individual point before treating everything in that group as the same outcome.</p>
    <p>A numeric rank means the listing was returned at that position. A beyond-depth or not-found marker means you do not have an exact rank within the results captured there. It is not proof that the Business Profile was removed or that nobody can find it anywhere.</p>
    <p><strong>Next step:</strong> confirm the exact listing and keyword, inspect nearby points and check the profile directly in Google Maps if absence is unexpected. For a sudden change, use the <Link href="/blog/why-google-maps-rankings-dropped">ranking-drop checklist</Link> before editing the profile.</p>
    <h2>Turn the reading into one useful action</h2>
    <p>Write down the observation, its limit and your next check. For example: “Top-ten coverage is broad, but the eastern customer area has fewer top-three points. I will inspect recurring competitors there and compare the same points next week.” That is more actionable than “the map needs to be greener”.</p>
    <p>On paid plans, <Link href="/rank-mri">Rank MRI</Link> takes the next step from the map: click any point to see who outranks you and what is different, and weak areas are grouped into one issue instead of dozens of red pins.</p>
    <p>Google’s <a href="https://support.google.com/business/answer/7091">local ranking guidance</a> describes relevance, distance and prominence. Use those as a framework for investigation, not a way to diagnose a specific cause from a coloured map alone.</p>
  </BlogArticle>;
}
