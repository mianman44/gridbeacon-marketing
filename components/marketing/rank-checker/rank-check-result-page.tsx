"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

import {
  EVENTS,
  readResult,
  trackChecker,
  type CheckResult,
} from "@/lib/free-rank-checker";
import { RankCheckResult } from "./rank-check-result";
import styles from "./rank-checker.module.css";

const POLL_MS = 8000;

/*
 * The emailed result link. The token is the only key; it shows this one
 * rank check and nothing else about the account or the visitor.
 *
 * A scan that is still running keeps its stages up to date here too, so
 * somebody who opens the link early is not staring at an empty page.
 */
export function RankCheckResultPage({ token }: { token: string }) {
  const [result, setResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState("");
  const viewed = useRef(false);

  const load = useCallback(async () => {
    try {
      const latest = await readResult(token);
      setResult(latest);

      if (latest.status === "completed" && !viewed.current) {
        viewed.current = true;
        trackChecker(EVENTS.resultViewed);
      }

      return latest.status === "completed" || latest.status === "failed";
    } catch {
      setError("This rank check link is not valid or has expired.");
      return true;
    }
  }, [token]);

  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout>;

    async function tick() {
      const done = await load();
      if (!active || done) return;
      timer = setTimeout(tick, POLL_MS);
    }

    tick();

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [load]);

  return (
    /* The page class carries the rank-checker palette and fonts as CSS
       variables; without it this route renders unstyled navy panels. */
    <div className={styles.page}>
      <section className={styles.scannerSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>YOUR RANK CHECK</span>
          <h2>Google Maps rank check</h2>
        </div>

        <div
          className={`${styles.card} ${styles.scanner} ${
            result?.status === "completed" ? styles.resultCard : ""
          }`}
        >
          {error ? (
            <div className={styles.form}>
              <div className={styles.failure}>
                <h3>We could not open this rank check</h3>
                <p>{error}</p>
              </div>
            </div>
          ) : null}

          {!error && !result ? (
            <div className={styles.form}>
              <p className={styles.accountNote}>
                <Loader2 size={15} className={styles.spin} /> Loading your
                rank check…
              </p>
            </div>
          ) : null}

          {result && result.status === "completed" ? (
            <div className={styles.resultBody}>
              <RankCheckResult
                result={result}
                resultUrl={
                  typeof window === "undefined"
                    ? undefined
                    : window.location.href
                }
              />
            </div>
          ) : null}

          {result && result.status === "failed" ? (
            <div className={styles.form}>
              <div className={styles.failure}>
                <h3>That scan did not finish</h3>
                <p>
                  Something went wrong while checking the rankings. Run
                  another free check from the rank checker page.
                </p>
              </div>
            </div>
          ) : null}

          {result &&
          result.status !== "completed" &&
          result.status !== "failed" ? (
            <div className={styles.form}>
              <div className={styles.progress}>
                <h3>
                  <Loader2 size={18} className={styles.spin} /> Scanning
                  Google Maps rankings…
                </h3>
                <ul className={styles.stages}>
                  {result.stages.map((stage) => (
                    <li key={stage.key} data-state={stage.state}>
                      <span aria-hidden="true">
                        {stage.state === "done"
                          ? "✓"
                          : stage.state === "active"
                            ? "●"
                            : "○"}
                      </span>
                      {stage.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
        </div>
      </section>
    </div>
  );
}
