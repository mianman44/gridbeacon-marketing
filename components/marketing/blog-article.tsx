import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BLOG_POSTS, type BlogPost } from "@/lib/blog";
import { SITE_URL, SIGNUP_URL } from "@/lib/seo";
import { SeoLandingPage } from "./seo-landing";
import styles from "./blog.module.css";

export function BlogArticle({ post, children }: { post: BlogPost; children: ReactNode }) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const data = { "@context": "https://schema.org", "@graph": [
    { "@type": "BlogPosting", headline: post.title, description: post.description, datePublished: post.date,
      dateModified: post.date, mainEntityOfPage: url, image: `${SITE_URL}${post.image}`,
      author: { "@type": "Organization", name: post.author, url: `${SITE_URL}/about` },
      publisher: { "@type": "Organization", name: "GridBeacon", url: SITE_URL } },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ] },
  ] };
  return <SeoLandingPage><article className={styles.wrap}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
    <nav aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / <span>{post.category}</span></nav>
    <header><h1 className={styles.title}>{post.title}</h1><p className={styles.intro}>{post.description}</p>
      <div className={styles.meta}><Link href="/about">By {post.author}</Link><span>Updated <time dateTime={post.date}>{new Date(`${post.date}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}</time></span></div>
    </header>
    <figure className={styles.figure}><Image src={post.image} alt={post.imageAlt} width={post.imageWidth} height={post.imageHeight} sizes="(max-width: 1080px) 100vw, 1032px" priority />
      <figcaption>{post.caption}</figcaption>
    </figure>
    <div className={styles.body}>{children}
      <aside className={styles.note}><h2>Build your first ranking baseline</h2><p>Choose one business, one keyword and a consistent area. Save the scan so your next check has something meaningful to compare with.</p><a className={styles.cta} href={SIGNUP_URL}>Start with a free account</a><p><Link href="/pricing">Check current plan limits and scan credits</Link>.</p></aside>
      <aside className={styles.related}><h2>Keep learning</h2><ul>{BLOG_POSTS.filter(related => related.slug !== post.slug).map(related => <li key={related.slug}><Link href={`/blog/${related.slug}`}>{related.title}</Link></li>)}<li><Link href="/what-is-a-geo-grid">What is a geo-grid?</Link></li><li><Link href="/local-seo-competitor-analysis">Compare local competitors</Link></li><li><Link href="/service-area-business-rank-tracking">Tracking a service-area business</Link></li></ul></aside>
    </div>
  </article></SeoLandingPage>;
}
