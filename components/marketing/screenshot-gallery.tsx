"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight, MapPinned, Users, FileText, Maximize2, X } from "lucide-react";
import styles from "./home.module.css";

const screenIcons = [MapPinned, Users, FileText];
const reportPages = Array.from({ length: 21 }, (_, index) => ({ width: 1273, height: 1800, alt: `Local Garage Door Pros AI Ranking Intelligence Report, page ${index + 1} of 21` }));

function ReportPreview() {
  return (
    <div className={styles.reportPages}>
      {reportPages.map((page, index) => (
        <Image key={page.alt} src={`/reports/garage-door-20260908/page-${String(index + 1).padStart(2, "0")}.jpg`} width={page.width} height={page.height} alt={page.alt} sizes="(min-width: 1080px) 940px, 92vw" />
      ))}
    </div>
  );
}
const screenDetails = [
  "Discover where you lead, and where your next opportunity starts.",
  "See which businesses show up beside you, street by street.",
  "Make your results easy to share, explain, and act on.",
];
const screens = [
  { id: "heatmap", label: "Ranking heatmaps", title: "Every ranking. A clearer picture.", description: "Local visibility, mapped across your service area.", src: "/screenshots/heatmap-hero-20260908.png", width: 1536, height: 1024, alt: "GridBeacon air duct cleaning heatmap across San Antonio, showing 54 percent visibility in a 21 by 21 ranking grid" },
  { id: "competitors", label: "Competitor insights", title: "See who is ahead. And where.", description: "Compare competing businesses from the same scan.", src: "/screenshots/competitor-insights-20260908.png", width: 1672, height: 941, alt: "GridBeacon competitor insights for air duct cleaning across San Antonio, with competing businesses beside a 21 by 21 ranking heatmap" },
  { id: "reports", label: "Client reports", title: "Turn a scan into a clear story.", description: "Give your clients a report they can understand and revisit.", src: "/screenshots/gridbeacon-report.png", width: 778, height: 1000, alt: "GridBeacon AI report executive summary for the saved scan, including visibility, average rank, top 3 coverage and geographic priorities" },
];

export function ScreenshotGallery() {
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const screen = screens[active];

  return (
    <div className={styles.gallery}>

      <div
        className={styles.galleryTabs}
        role="tablist"
        aria-orientation="vertical"
        aria-label="Explore GridBeacon screens"
      >
        {screens.map((item, index) => {
          const Icon = screenIcons[index];
          return (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`tab-${item.id}`}
            aria-controls="product-screen"
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              /* The list reads top to bottom now, so the vertical
                 arrows have to work; the horizontal pair is kept
                 because it costs nothing and the strip turns back
                 into a row on a phone. */
              let next = index;
              if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % screens.length;
              else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index + screens.length - 1) % screens.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = screens.length - 1;
              else return;
              event.preventDefault();
              setActive(next);
              document.getElementById(`tab-${screens[next].id}`)?.focus();
            }}
          >
            <span className={styles.tabIcon}><Icon size={21} aria-hidden="true" /></span>
            <span className={styles.tabCopy}>
              <span className={styles.tabLabel}>{item.label}</span>
              <span className={styles.tabDescription}>{screenDetails[index]}</span>
            </span>
            <ArrowUpRight className={styles.tabArrow} size={17} aria-hidden="true" />
          </button>
          );
        })}
      </div>

      <div
        id="product-screen"
        role="tabpanel"
        aria-labelledby={`tab-${screen.id}`}
        className={styles.screenStage}
        tabIndex={0}
      >
        <div className={styles.stageBar} aria-hidden="true">
          <span className={styles.stageDots}><i /><i /><i /></span>
          <span>GridBeacon <span className={styles.stageSlash}>/</span> {screen.label}</span>
          <span className={styles.stagePreview}>PRODUCT PREVIEW</span>
        </div>
        <div className={styles.screenHeading}>
          <div>
            <h3>{screen.title}</h3>
            <p>{screen.description}</p>
          </div>
          <button
            type="button"
            onClick={() => dialog.current?.showModal()}
            aria-label={`Enlarge ${screen.label.toLowerCase()}`}
          >
            <Maximize2 size={15} aria-hidden="true" />
            Full screen
          </button>
        </div>

        {screen.id === "reports" ? (
          <>
            <p className={styles.reportHint}>21 report pages · Scroll to explore · <a href="/reports/garage-door-20260908/report.pdf" target="_blank" rel="noopener noreferrer">Open PDF ↗</a></p>
            <div className={styles.reportViewport} tabIndex={0} role="region" aria-label="AI report preview, 21 pages. Scroll to read.">
              <ReportPreview />
            </div>
          </>
        ) : <button
          className={styles.screenImageButton}
          type="button"
          onClick={() => dialog.current?.showModal()}
          aria-label={`Enlarge ${screen.label.toLowerCase()} screenshot`}
        >
          <Image
            src={screen.src}
            alt={screen.alt}
            width={screen.width}
            height={screen.height}
            sizes="(min-width: 1080px) 860px, 92vw"
            className={styles.screenImage}
          />
        </button>}
      </div>

      <dialog
        ref={dialog}
        className={styles.imageDialog}
        aria-label={screen.label}
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}
      >
        <div className={styles.dialogHeader}>
          <span>{screen.label}</span>
          <button type="button" onClick={() => dialog.current?.close()} aria-label="Close full screen screenshot">
            <X size={22} />
          </button>
        </div>
        {screen.id === "reports" ? <ReportPreview /> : <Image src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} sizes="96vw" className={styles.screenImage} />}
      </dialog>

    </div>
  );
}


