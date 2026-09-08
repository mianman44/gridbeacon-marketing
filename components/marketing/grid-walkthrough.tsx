"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight, Maximize2, X } from "lucide-react";
import styles from "./home.module.css";

const steps = [
  { title: "Every dot is a location checked", text: "The number shows where your business ranked for your chosen keyword at that spot. This 5 × 5 grid checks 25 locations across Dallas.", caption: "One business. One keyword. 25 locations checked.", x: "48.6%", y: "32%" },
  { title: "The colours show where you stand", text: "Green means the top three. Blue is positions 4–10, orange is 11–20, and red is 21 or lower. Grey means the business was not found in the returned results.", caption: "In this scan: 84% visibility, an average rank of 5.7, and 44% of points in the top three.", x: "21%", y: "47%" },
  { title: "Look closer at any location", text: "Select a dot in GridBeacon to see the businesses ranking there. In this example, the business ranks fourth—you can see the three businesses ahead of it.", caption: "The selected point ranks #4. Its results appear in the panel on the right.", x: "78%", y: "48%" },
];

export function GridWalkthrough() {
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const selected = active === 2;
  const src = `/screenshots/dallas-grid-${selected ? "point" : "overview"}-v2.png`;
  const alt = selected ? "Dallas garage door repair scan with a selected rank 4 point and the businesses ranking at that location" : "Supreme Garage Door Repair Dallas heatmap with 25 points, 84 percent visibility and ranks from 1 to 30";
  return (
    <section className={`${styles.container} ${styles.section}`} id="why-grids" aria-labelledby="why-grids-heading">
      <div className={styles.walkIntro}>
        <p className={styles.eyebrow}>Why location matters</p>
        <h2 id="why-grids-heading">See where nearby customers<br /><span className={styles.quiet}>can find you.</span></h2>
        <p>Your Google Maps ranking can change from one street to the next—even for the same search. GridBeacon checks your position at locations across your service area and brings the results together on one map.</p>
      </div>
      <div className={styles.walkSteps} aria-label="Explore the ranking map">
        {steps.map((step, index) => <button key={step.title} type="button" aria-pressed={active === index} aria-controls="walk-preview" onClick={() => setActive(index)}>
          <span className={styles.walkNumber}>{index + 1}</span><span><strong>{step.title}</strong><span className={styles.walkStepText}>{step.text}</span></span>
        </button>)}
      </div>
      <figure className={styles.walkFigure} id="walk-preview">
        <div className={styles.walkToolbar}><span>REAL SCAN <span> / Garage door repair · Dallas</span></span><button type="button" onClick={() => dialog.current?.showModal()}><Maximize2 size={15} aria-hidden="true" /> Enlarge screenshot</button></div>
        <div className={styles.walkImage}>
          <Image src={src} alt={alt} width={1672} height={941} sizes="(min-width: 1440px) 1312px, 92vw" />
          <span className={styles.walkMarker} style={{ left: steps[active].x, top: steps[active].y }} aria-hidden="true">{active + 1}</span>
        </div>
        <figcaption aria-live="polite">{steps[active].caption}</figcaption>
      </figure>
      <div className={styles.walkFooter}><p>Find the areas where you rank well—and the streets that need more attention.</p><Link href="/how-it-works" className={styles.textLink}>See how a scan works <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
      <dialog ref={dialog} className={styles.imageDialog} aria-label="Ranking map screenshot" onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className={styles.dialogHeader}><span>{steps[active].title}</span><button type="button" aria-label="Close ranking map screenshot" onClick={() => dialog.current?.close()}><X size={22} /></button></div>
        <Image src={src} alt={alt} width={1672} height={941} sizes="96vw" className={styles.screenImage} />
      </dialog>
    </section>
  );
}

