import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import { SeoLandingPage } from "@/components/marketing/seo-landing";
import styles from "@/components/marketing/blog.module.css";

export const metadata = pageMetadata({ path: "/blog", title: "Local SEO Guides & Google Maps Ranking Tutorials", description: "Practical GridBeacon guides to checking Google Maps rankings, reading geo-grid heatmaps and measuring local visibility." });
export default function BlogPage() {
  return <SeoLandingPage><div className={styles.wrap}>
    <p className={styles.eyebrow}>The GridBeacon blog</p><h1 className={styles.title}>Make sense of your local rankings.</h1>
    <p className={styles.intro}>Practical walkthroughs for the people growing a local business or explaining results to a client. Start with a scan. Learn what it tells you. Choose your next step.</p>
    {BLOG_POSTS.map(post => <article className={styles.card} key={post.slug}>
      <Image src={post.image} alt={post.imageAlt} width={post.imageWidth} height={post.imageHeight} sizes="(max-width: 700px) 100vw, 540px" />
      <div className={styles.cardBody}><p className={styles.eyebrow}>{post.category}</p><h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.description}</p><p>By {post.author} · <time dateTime={post.date}>{new Date(`${post.date}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}</time></p><Link href={`/blog/${post.slug}`}>Read the walkthrough →</Link></div>
    </article>)}
    <aside className={styles.related}><h2>New to geo-grids?</h2><p><Link href="/what-is-a-geo-grid">Read the geo-grid introduction</Link> for definitions, or <Link href="/google-maps-rank-checker">try the free Google Maps rank checker</Link>.</p></aside>
  </div></SeoLandingPage>;
}
