"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Maximize2, X } from "lucide-react";
import styles from "./home.module.css";

const views = [
  { title: "Revisit your scans", text: "Browse saved scans by keyword and date. Review grid settings, heatmap previews, and ranking changes in one place.", src: "/screenshots/rank-history-20260908.png", width: 2074, height: 1221, alt: "GridBeacon saved scans for Infinity Garage Door, showing keywords, scan dates, heatmap previews and ranking change columns", caption: "Your scan history keeps earlier results within reach, so you can follow changes across completed scans." },
  { title: "See movement on the map", text: "Trend arrows beside grid points show where rankings improved or declined. Select a point to see its previous position and current rank.", src: "/screenshots/rank-movement-20260908.png", width: 2066, height: 1217, alt: "Garage door repair heatmap with green upward and red downward trend arrows; the selected point fell from rank 8 on August 31 to rank 10 in the September 2 scan", caption: "In this example, the selected point moved from #8 on August 31 to #10 on September 2—a decline of two positions." },
];

export function RankHistoryShowcase() {
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const view = views[active];
  return (
    <section className={styles.band} id="rank-history" aria-labelledby="history-heading">
      <div className={styles.container}>
        <div className={styles.walkIntro}>
          <p className={styles.eyebrow}>Track your progress</p>
          <h2 id="history-heading">See what changed.<br /><span className={styles.quiet}>Right down to the street.</span></h2>
          <p>A single scan shows where you stand. Your scan history shows how that picture changes. Revisit saved results, then look at the arrows on your heatmap to find the locations moving up or down.</p>
        </div>
        <div className={`${styles.walkSteps} ${styles.historyChoices}`} aria-label="Explore scan history and ranking movement">
          {views.map((item, index) => <button key={item.title} type="button" aria-pressed={active === index} aria-controls="history-preview" onClick={() => setActive(index)}><span className={styles.walkNumber}>{index + 1}</span><span><strong>{item.title}</strong><span className={styles.walkStepText}>{item.text}</span></span></button>)}
        </div>
        <div className={styles.historyLegend}><span><b className={styles.historyUp}>▲</b> Ranking improved</span><span><b className={styles.historyDown}>▼</b> Ranking declined</span><span>Lower rank numbers are better: #3 is ahead of #8.</span></div>
        <figure className={styles.walkFigure} id="history-preview">
          <div className={styles.walkToolbar}><span>{view.title}<span> / Infinity Garage Door · Austin area</span></span><button type="button" onClick={() => dialog.current?.showModal()}><Maximize2 size={15} aria-hidden="true" /> Enlarge screenshot</button></div>
          <div className={styles.walkImage}><Image src={view.src} alt={view.alt} width={view.width} height={view.height} sizes="(min-width: 1440px) 1312px, 92vw" /></div>
          <figcaption aria-live="polite">{view.caption}</figcaption>
        </figure>
        <p className={styles.historyNote}>For a consistent comparison, track the same keyword with the same grid and radius across scans.</p>
        <dialog ref={dialog} className={styles.imageDialog} aria-label="Scan history screenshot" onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
          <div className={styles.dialogHeader}><span>{view.title}</span><button type="button" aria-label="Close scan history screenshot" onClick={() => dialog.current?.close()}><X size={22} /></button></div>
          <Image src={view.src} alt={view.alt} width={view.width} height={view.height} sizes="96vw" className={styles.screenImage} />
        </dialog>
      </div>
    </section>
  );
}
