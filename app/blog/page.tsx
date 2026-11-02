import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import { SeoLandingPage } from "@/components/marketing/seo-landing";
import { BlogStructuredData } from "@/components/marketing/structured-data";
import styles from "@/components/marketing/blog.module.css";

export const metadata = pageMetadata({ path: "/blog", title: "Local SEO & Google Maps Ranking Guides", description: "Practical GridBeacon guides to checking Google Maps rankings, reading geo-grid heatmaps, choosing a grid and measuring local visibility." });
export default function BlogPage() {
  return <SeoLandingPage><div className={styles.wrap}>
    <BlogStructuredData posts={BLOG_POSTS} />
    <p className={styles.eyebrow}>The GridBeacon blog</p><h1 className={styles.title}>Local SEO Guides for Google Maps Rankings</h1>
    <p className={styles.intro}>Practical walkthroughs for the people growing a local business or explaining results to a client. Each guide uses real GridBeacon scans: how to check where you rank across a city, how to read a ranking heatmap, how to choose a grid size and radius, how to measure share of local voice and what to do when rankings drop.</p>
    {BLOG_POSTS.map(post => <article className={styles.card} key={post.slug}>
      <Image src={post.image} alt={post.imageAlt} width={post.imageWidth} height={post.imageHeight} sizes="(max-width: 700px) 100vw, 540px" />
      <div className={styles.cardBody}><p className={styles.eyebrow}>{post.category}</p><h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.description}</p><p>By {post.author} · <time dateTime={post.date}>{new Date(`${post.date}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}</time></p><Link href={`/blog/${post.slug}`}>Read the guide to {post.anchor} →</Link></div>
    </article>)}
    <aside className={styles.related}><h2>New to geo-grids?</h2><p><Link href="/what-is-a-geo-grid">Read the geo-grid introduction</Link> for definitions, see <Link href="/google-maps-rank-tracker">how the Google Maps rank tracker works</Link>, or <Link href="/google-maps-rank-checker">try the free Google Maps rank checker</Link>.</p></aside>
  </div></SeoLandingPage>;
}
