import Link from "next/link";
import { ArrowRight, Check, ChartNoAxesCombined, Crosshair, Eye, Grid3X3, Lightbulb, MapPin, Radar, Target, Trophy, Users } from "lucide-react";
import { Faq } from "@/components/marketing/seo-landing";
import { SIGNUP_URL } from "@/lib/seo";
import { RankCheckerTool } from "./rank-checker-tool";
import styles from "./rank-checker.module.css";

const ranks = [4, 2, 3, 5, 1, 8, 7, 12, 16];
const positions = ["Northwest", "North", "Northeast", "West", "Business center", "East", "Southwest", "South", "Southeast"];

function RankHeatmapPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${styles.map} ${compact ? styles.compactMap : ""}`} role="img" aria-label={`Illustrative 3 by 3 ranking heatmap. ${ranks.map((rank, index) => `${positions[index]}: rank ${rank}`).join(". ")}. Not a live map.`}>
      <svg className={styles.mapArtwork} viewBox="0 0 720 440" preserveAspectRatio="none" aria-hidden="true">
        <rect width="720" height="440" fill="#edf1f4" />
        <path d="M0 310 Q140 245 280 330 T720 335" fill="none" stroke="#c9dfe7" strokeWidth="48" />
        <path d="M82 36H199V126H82Z M490 200H590V273H490Z M330 353H428V430H330Z" fill="#dce9df" />
        <g stroke="#fff" strokeWidth="11" fill="none"><path d="M0 73H720 M0 167H720 M0 263H720 M0 382H720 M113 0V440 M256 0V440 M418 0V440 M563 0V440 M677 0V440" /><path d="M180 0L227 440 M0 413L720 301" /></g>
        <g stroke="#d1dbe3" strokeWidth="1" fill="none"><path d="M0 67H720 M0 79H720 M0 161H720 M0 173H720 M0 257H720 M0 269H720 M0 376H720 M0 388H720 M107 0V440 M119 0V440 M250 0V440 M262 0V440 M412 0V440 M424 0V440 M557 0V440 M569 0V440 M671 0V440 M683 0V440" /></g>
        <path d="M340 0L372 440" stroke="#fff" strokeWidth="14" /><path d="M340 0L372 440" stroke="#e8cf9e" strokeWidth="3" />
      </svg>
      <span className={styles.mapLabel}>AUSTIN · ILLUSTRATIVE MAP</span>
      <div className={styles.mapNodes} aria-hidden="true">{ranks.map((rank, index) => <div key={index} className={styles.nodeCell}><span className={`${styles.rankNode} ${rank <= 3 ? styles.good : rank <= 10 ? styles.medium : styles.weak} ${index === 4 ? styles.centerNode : ""}`}>#{rank}</span>{index === 4 && !compact && <span className={styles.businessLabel}>Apex Dental Studio</span>}</div>)}</div>
      <span className={styles.mapCaption}>SAMPLE DATA · 9 POINTS</span>
    </div>
  );
}

function RankCheckerHero() {
  return <section className={styles.hero} aria-labelledby="hero-heading"><div className={`${styles.container} ${styles.heroGrid}`}>
    <div><span className={styles.eyebrow}><Radar size={14} aria-hidden="true" /> FREE GOOGLE MAPS TOOL</span><h1 id="hero-heading">Check Your <span>Google Maps Rankings</span> in Seconds</h1><p className={styles.heroDescription}>See how your business ranks across real neighborhood coordinates with a geo-grid heatmap, visibility score, and local competitor insights.</p><div className={styles.actions}><a className={styles.primary} href="#rank-checker">Check Rankings Free <ArrowRight size={17} aria-hidden="true" /></a><a className={styles.outline} href="#sample-results"><Eye size={17} aria-hidden="true" /> See Sample Report</a></div><ul className={styles.trust}>{["Free rank check", "No credit card required", "Local geo-grid results"].map(text => <li key={text}><Check size={14} aria-hidden="true" />{text}</li>)}</ul><p className={styles.heroNote}>Preview mode · Explore a sample report below.</p></div>
    <div className={`${styles.card} ${styles.heroPreview}`}><div className={styles.previewHeader}><span><span className={styles.statusDot} /> GEO-GRID PREVIEW</span><span>SAMPLE RESULT</span></div><RankHeatmapPreview compact /><div className={styles.previewMetrics}><div><span>Average Rank</span><strong>#5.7</strong></div><div><span>Visibility</span><strong>68<span>%</span></strong></div><Radar size={26} aria-hidden="true" /></div></div>
  </div></section>;
}

function SampleResults() {
  const metrics = [
    { label: "Average Rank", value: "#5.7", note: "Across 9 grid points", Icon: ChartNoAxesCombined },
    { label: "Visibility Score", value: "68%", note: "Illustrative visibility metric", Icon: Eye },
    { label: "Top 3 Coverage", value: "3 / 9", note: "Grid points in the local top 3", Icon: Trophy },
    { label: "Scan Radius", value: "3.0 mi", note: "Around the business location", Icon: Crosshair },
  ];
  return <section id="sample-results" className={styles.results} aria-labelledby="results-heading"><div className={styles.container}>
    <div className={styles.resultIntro}><div><span className={styles.eyebrow}>READ THE NEIGHBORHOOD, NOT JUST A NUMBER</span><h2 id="results-heading">See What a Local Ranking Scan Reveals</h2></div><span className={styles.badge}>SAMPLE RESULT</span></div>
    <div className={styles.sampleBusiness}><h3>Apex Dental Studio</h3><span>“emergency dentist”</span><span><MapPin size={14} aria-hidden="true" /> Austin, TX</span></div><p className={styles.sampleNote}>Demonstration data only. All businesses, rankings and summary metrics below are illustrative; summary values are independent examples.</p>
    <div className={styles.metrics}>{metrics.map(({ label, value, note, Icon }) => <div className={`${styles.card} ${styles.metric}`} key={label}><div><span>{label}</span><Icon size={16} aria-hidden="true" /></div><strong>{value}</strong><p>{note}</p></div>)}</div>
    <div className={styles.resultsGrid}><div className={`${styles.card} ${styles.heatmapPanel}`}><div className={styles.heatmapHeader}><div><h3>Google Maps Ranking Heatmap</h3><span className={styles.badge}>3×3 Grid</span></div><ul className={styles.legend}><li><i className={styles.good} />#1–3</li><li><i className={styles.medium} />#4–10</li><li><i className={styles.weak} />#11+</li></ul></div><RankHeatmapPreview /><div className={styles.mapFooter}><span><MapPin size={13} aria-hidden="true" /> Business at the center</span><span>Original abstract map · Sample ranks</span></div></div>
    <aside className={styles.sidebar} aria-label="Sample competitor insights"><div className={`${styles.card} ${styles.competitors}`}><div className={styles.competitorTitle}><h3><Users size={16} aria-hidden="true" />Top Competitors</h3><span>SAMPLE</span></div><ol>{[["Apex Central Dental", 82], ["Austin Dental Spa", 74], ["South River Dentistry", 61], ["Downtown Dental", 55]].map(([name, visibility], index) => <li key={name}><span className={styles.competitorPosition}>{index + 1}</span><div><strong>{name}</strong><span>Visibility <b>{visibility}%</b></span><div className={styles.competitorBar} aria-hidden="true"><i style={{ width: `${visibility}%` }} /></div></div></li>)}</ol></div>
    <div className={styles.insight}><span className={styles.eyebrow}><Lightbulb size={15} aria-hidden="true" /> GRIDBEACON INSIGHT</span><h3>Visibility has a neighborhood.</h3><p>In this example, your strongest visibility is around the business location, while rankings weaken toward the outer grid points.</p><p>The full GridBeacon platform can help compare these weak areas against competitors and track ranking movement over time.</p></div></aside></div>
  </div></section>;
}

function RankCheckerEducation() {
  const cards = [
    { Icon: MapPin, title: "True Spatial Proximity", text: "A search near your front door can look very different from one a few streets away. See the location behind the ranking.", label: "Location matters" },
    { Icon: Grid3X3, title: "Geo-Grid Heatmaps", text: "Turn individual ranking points into a clear picture of your local coverage, across the area you want to reach.", label: "See the whole area" },
    { Icon: Target, title: "Find Weak Ranking Areas", text: "Spot the neighborhoods where your business is harder to find and focus your local SEO efforts with context.", label: "Find opportunities" },
    { Icon: Users, title: "Competitor Comparison", text: "Understand which nearby businesses appear across your target area and where their visibility is stronger.", label: "Know your competition" },
  ];
  return <section className={styles.education} aria-labelledby="education-heading"><div className={styles.container}><div className={styles.sectionHeading}><span className={styles.eyebrow}>A WIDER VIEW OF LOCAL SEARCH</span><h2 id="education-heading">Why Single-Point Rank Checkers<br className={styles.desktopBreak} /> Can Be Misleading</h2><p>Google Maps rankings can change from one street or neighborhood to another. A geo-grid shows how visible a business is across the entire target area.</p></div><div className={styles.educationGrid}>{cards.map(({ Icon, title, text, label }) => <article className={`${styles.card} ${styles.educationCard}`} key={title}><span className={styles.iconBox}><Icon size={20} aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p><span className={styles.cardLabel}>{label} <ArrowRight size={12} aria-hidden="true" /></span></article>)}</div></div></section>;
}

function HowItWorks() {
  return <section className={styles.how} aria-labelledby="how-heading"><div className={styles.container}><div className={styles.sectionHeading}><span className={styles.eyebrow}>FROM SEARCH TO LOCAL INSIGHT</span><h2 id="how-heading">How GridBeacon Scans Local Rankings</h2><p>A clearer view of the places where your customers are searching.</p></div><div className={styles.steps}>{[["Enter Business & Keyword", "Choose the Google Business Profile and keyword you want to measure."], ["Scan Multiple Locations", "GridBeacon checks rankings from multiple geographic coordinates."], ["Analyze the Heatmap", "See where visibility is strong, weak, or being captured by competitors."]].map(([title, text], index) => <article key={title}><span className={styles.stepNumber}>STEP 0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>;
}

function UpgradeCTA() {
  return <section className={styles.upgrade} aria-labelledby="upgrade-heading"><div className={`${styles.container} ${styles.upgradeGrid}`}><div><span className={styles.eyebrow}><Radar size={15} aria-hidden="true" /> THE FULL GRIDBEACON PLATFORM</span><h2 id="upgrade-heading">Go Beyond a Free Rank Check</h2><p>Track rankings over time, compare competitors and understand where your Google Maps visibility is being won or lost.</p><ul className={styles.featureList}>{["Larger geo-grid scans", "Scheduled rank tracking", "Competitor Grid", "Gap Grid analysis", "Rank history", "AI Reports", "GBP activity tracking", "Shareable reports"].map(feature => <li key={feature}><Check size={15} aria-hidden="true" />{feature}</li>)}</ul><div className={styles.actions}><a href={SIGNUP_URL} className={styles.primary}>Create Free GridBeacon Account <ArrowRight size={16} aria-hidden="true" /></a><Link href="/features" className={styles.secondary}>View GridBeacon Features</Link></div></div><div className={styles.comparison}><div><span className={styles.comparisonLabel}>FREE RANK CHECKER</span><h3>A snapshot of local visibility</h3><ul>{["3×3 preview", "Single keyword", "Sample insights"].map(item => <li key={item}><Check size={14} aria-hidden="true" />{item}</li>)}</ul><span className={styles.comparisonNote}>Currently available as a demo preview</span></div><div><span className={styles.comparisonLabel}><Radar size={14} aria-hidden="true" /> GRIDBEACON</span><h3>The bigger picture. Over time.</h3><ul>{["Larger grids", "Tracking history", "Competitor analysis", "Gap Grid", "AI Reports", "Scheduled scans"].map(item => <li key={item}><Check size={14} aria-hidden="true" />{item}</li>)}</ul><span className={styles.comparisonNote}>Feature availability depends on your plan.</span></div></div></div></section>;
}

function RankCheckerFAQ() {
  const items: [string, string][] = [
    ["What is a Google Maps Rank Checker?", "A Google Maps rank checker helps you understand where a business appears for a keyword when someone searches from a particular location. A geo-grid compares those positions across multiple locations."],
    ["Why can Google Maps rankings change by location?", "Search results can vary with the searcher's proximity to a business, along with relevance and prominence. A result near your business may differ from a result in another neighborhood."],
    ["What is a geo-grid ranking scan?", "A geo-grid scan checks the same business and keyword from multiple geographic points. Each point shows a ranking, creating a heatmap of local search visibility."],
    ["Is the GridBeacon rank checker free?", "This page is a free demo preview. You can explore the controls and a clearly labeled sample report without a credit card. Live business search and rank scanning are not connected on this page yet."],
    ["What is the difference between this tool and GridBeacon?", "This tool currently demonstrates a single 3×3 local ranking preview. The full GridBeacon platform supports larger grids, competitor comparisons, ranking history and additional analysis, with features depending on your plan."],
    ["Can I track rankings over time?", "The full GridBeacon platform lets you compare scan history and use scheduled rank tracking on supported plans. This demo preview does not save or track rankings."],
  ];
  return <section className={styles.faqSection} aria-labelledby="faq-heading"><div className={styles.container}><div className={styles.sectionHeading}><span className={styles.eyebrow}>A LITTLE MORE CLARITY</span><h2 id="faq-heading">Frequently Asked Questions</h2><p>Understanding your Google Maps rankings, one question at a time.</p></div><div className={styles.faqWrap}><Faq items={items} /></div></div></section>;
}

export function GoogleMapsRankCheckerPage() {
  return <main id="main-content" className={styles.page}>
    <div className={styles.telemetry}><div className={styles.container}><span><Radar size={13} aria-hidden="true" /> Google Maps Rank Intelligence</span><span>3×3 LOCAL RANKING GRID</span></div></div>
    <RankCheckerHero />
    <RankCheckerTool />
    <SampleResults />
    <RankCheckerEducation />
    <HowItWorks />
    <UpgradeCTA />
    <RankCheckerFAQ />
    <section className={styles.finalSection} aria-labelledby="final-heading"><div className={styles.container}><div className={`${styles.card} ${styles.finalCard}`}><span className={styles.finalIcon}><Radar size={25} aria-hidden="true" /></span><h2 id="final-heading">Start Tracking Your Google Maps Rankings Smarter</h2><p>Run a free local rank check, then use GridBeacon to monitor rankings, competitors and visibility over time.</p><div className={styles.actions}><a className={styles.primary} href="#rank-checker">Run Free Rank Check <ArrowRight size={16} aria-hidden="true" /></a><a className={styles.secondary} href={SIGNUP_URL}>Create Free Account</a></div><span className={styles.finalNote}>Free tool in demo preview · No credit card required</span></div></div></section>
  </main>;
}
