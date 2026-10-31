"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

import styles from "./rank-checker.module.css";

/* Phones only. Once the tool has scrolled out of view, this brings the
   reader back to it. It stays hidden while the tool is on screen. */
export function RankCheckerStickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const tool = document.getElementById("rank-checker");

    if (!tool || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      setShow(!entry.isIntersecting);
    });

    observer.observe(tool);

    return () => observer.disconnect();
  }, []);

  if (!show) return null;

  return (
    <div className={styles.stickyCta}>
      <a href="#rank-checker">
        Run Free Check <ArrowRight size={16} aria-hidden="true" />
      </a>
    </div>
  );
}
