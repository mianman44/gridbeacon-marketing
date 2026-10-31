"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  MapPin,
  Radar,
  Users,
} from "lucide-react";

import { SIGNUP_URL } from "@/lib/seo";
import {
  EVENTS,
  trackChecker,
  type CheckResult,
} from "@/lib/free-rank-checker";
import styles from "./rank-checker.module.css";

/* The same bands the app uses: 1-3 green, 4-10 amber, 11+ red, and a
   neutral state when the business did not appear at that point. */
function rankClass(rank: number | null) {
  if (rank === null || rank === undefined) return styles.missing;
  if (rank <= 3) return styles.good;
  if (rank <= 10) return styles.medium;
  return styles.weak;
}

/* "3120 Palm Way #110, Austin, TX 78758, USA" -> "Austin, TX".
   The header only needs the locality; the full street address stays
   out of it. Anything that does not look like a postal address is
   returned as it came. */
export function shortLocation(address: string | null): string | null {
  if (!address) return null;

  const parts = address
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length < 3) return address;

  const region = parts[parts.length - 2].replace(/\s+\d[\d-]*$/, "");
  const city = parts[parts.length - 3];

  return region ? `${city}, ${region}` : city;
}

/* Grid points ranking in the top ten. The same points the heatmap
   draws and the same band the legend shows -- no second formula. */
export function topTenCoverage(result: CheckResult): number | null {
  if (!result.points.length) return null;

  return result.points.filter(
    (point) => point.rank !== null && point.rank <= 10,
  ).length;
}

/* The sign-up prompt's opening line, built from this scan alone. It uses
   the business's name because the report can be shared with anyone. */
function scanFinding(result: CheckResult, totalPoints: number) {
  const top3 = result.metrics?.top3_count ?? 0;
  const outside = totalPoints - top3;

  const rival = result.competitors.reduce<
    CheckResult["competitors"][number] | null
  >(
    (best, competitor) =>
      (competitor.points_ahead_of_you ?? 0)
      > (best?.points_ahead_of_you ?? 0)
        ? competitor
        : best,
    null,
  );

  return {
    title:
      outside > 0
        ? `Outside the top 3 at ${outside} of ${totalPoints} points`
        : `In the top 3 at all ${totalPoints} points`,
    detail:
      rival?.points_ahead_of_you && rival.business_name
        ? `${rival.business_name} ranks above ${result.business_name} at ${rival.points_ahead_of_you} of ${totalPoints} points.`
        : outside > 0
          ? `See which businesses take those points, and where.`
          : `This keyword looks strong. Check your other keywords before you relax.`,
  };
}

/* Each size drawn at its real point count, so the difference can be seen. */
const SCAN_SIZES = [
  { size: 3, label: "This scan", detail: "9 points" },
  { size: 5, label: "5×5", detail: "25 points · 25 credits" },
  { size: 9, label: "9×9", detail: "81 points · 81 credits" },
];

function ScanSizes() {
  return (
    <section className={styles.scanSizes} aria-labelledby="scan-sizes-heading">
      <div>
        <h3 id="scan-sizes-heading">9 Points Is a Sample of Your Area</h3>
        <p>
          A larger scan shows the streets between these points. Your 500 free
          credits cover 20 more 5×5 scans, in a square or in rings around your
          business.
        </p>
      </div>

      <ul>
        {SCAN_SIZES.map(({ size, label, detail }) => (
          <li key={size}>
            <span
              className={styles.scanDots}
              style={{ "--dots": size } as React.CSSProperties}
              aria-hidden="true"
            >
              {Array.from({ length: size * size }).map((_, index) => (
                <i key={index} />
              ))}
            </span>
            <strong>{label}</strong>
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Heatmap({ result }: { result: CheckResult }) {
  const size = result.grid_size || 3;
  const byCell = new Map<string, number | null>();

  for (const point of result.points) {
    byCell.set(`${point.grid_row}:${point.grid_col}`, point.rank);
  }

  const cells = [];

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      const rank = byCell.get(`${row}:${col}`) ?? null;
      const centre =
        row === Math.floor(size / 2) && col === Math.floor(size / 2);

      cells.push(
        <div className={styles.nodeCell} key={`${row}-${col}`}>
          <span
            className={`${styles.rankNode} ${rankClass(rank)} ${
              centre ? styles.centerNode : ""
            }`}
          >
            {rank === null ? "—" : `#${rank}`}
          </span>
        </div>,
      );
    }
  }

  return (
    <div
      className={styles.liveMap}
      style={{ "--grid-size": size } as React.CSSProperties}
      role="img"
      aria-label={`Ranking heatmap of ${result.points.length} scan points for ${result.keyword}.`}
    >
      {/* Decorative only: an abstract street pattern drawn in CSS and
          SVG, never a map tile from a provider. */}
      <svg
        className={styles.liveMapArt}
        viewBox="0 0 800 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect width="800" height="600" fill="#f1f5f9" />
        <path
          d="M60 40h150v120H60Z M560 90h180v110H560Z M120 430h170v130H120Z M470 400h210v150H470Z"
          fill="#e7eef5"
        />
        <path d="M300 250h120v90H300Z M640 260h90v80h-90Z" fill="#e3efe6" />
        <g stroke="#ffffff" strokeWidth="14" fill="none">
          <path d="M0 150h800 M0 320h800 M0 470h800 M170 0v600 M400 0v600 M620 0v600" />
        </g>
        <g stroke="#e2e8f0" strokeWidth="1.5" fill="none">
          <path d="M0 80h800 M0 240h800 M0 395h800 M0 545h800 M85 0v600 M285 0v600 M510 0v600 M720 0v600" />
        </g>
        <path
          d="M-20 520 Q220 470 430 540 T820 500"
          fill="none"
          stroke="#dbeafe"
          strokeWidth="26"
        />
      </svg>

      <div className={styles.liveMapNodes}>{cells}</div>
    </div>
  );
}

export function RankCheckResult({
  result,
  resultUrl,
  onSignupClick,
}: {
  result: CheckResult;
  resultUrl?: string;
  onSignupClick?: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const metrics = result.metrics;
  const location = shortLocation(result.formatted_address);
  const topTen = topTenCoverage(result);
  const totalPoints = metrics?.total_points ?? result.points.length;
  const finding = scanFinding(result, totalPoints);

  const tiles = [
    {
      label: "Average Rank",
      value: metrics?.average_rank != null ? `#${metrics.average_rank}` : "—",
      note: `Across ${totalPoints} grid points`,
    },
    {
      label: "Visibility Score",
      value: metrics?.visibility != null ? `${metrics.visibility}%` : "—",
      note: "Share of points in the top ten",
    },
    {
      label: "Top 3 Coverage",
      value:
        metrics?.top3_count != null
          ? `${metrics.top3_count} / ${totalPoints}`
          : "—",
      note: "Points in the local 3-pack",
    },
    {
      label: "Top 10 Coverage",
      value: topTen != null ? `${topTen} / ${totalPoints}` : "—",
      note: "Points on the first page",
    },
    {
      label: "Scan Radius",
      value: `${result.radius_miles} mi`,
      note: "Around the business",
    },
  ];

  /* Older browsers, and any page not served over https, have no
     clipboard API. Fall back to a hidden selection copy, and say
     nothing at all if even that is refused rather than claiming a
     copy that never happened. */
  function legacyCopy(text: string): boolean {
    try {
      const field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();

      const copied = document.execCommand("copy");
      document.body.removeChild(field);

      return copied;
    } catch {
      return false;
    }
  }

  async function copyLink() {
    if (!resultUrl) return;

    let done = false;

    try {
      await navigator.clipboard.writeText(resultUrl);
      done = true;
    } catch {
      done = legacyCopy(resultUrl);
    }

    if (!done) return;

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className={styles.liveResult}>
      <header className={styles.resultHeader}>
        <div>
          <h2 className={styles.resultTitle}>
            Your Google Maps Rank Check Is Ready
          </h2>
          <p className={styles.resultBusiness}>{result.business_name}</p>
          <p className={styles.resultMeta}>
            <span>“{result.keyword}”</span>
            {location ? (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  <MapPin size={13} aria-hidden="true" /> {location}
                </span>
              </>
            ) : null}
          </p>
        </div>

        <div className={styles.resultHeaderActions}>
          <span className={styles.completeBadge}>
            <CheckCircle2 size={14} aria-hidden="true" /> Scan Complete
          </span>

          {resultUrl ? (
            <button
              type="button"
              className={styles.secondaryAction}
              onClick={copyLink}
            >
              {copied ? (
                <Check size={15} aria-hidden="true" />
              ) : (
                <Copy size={15} aria-hidden="true" />
              )}
              {copied ? "Link Copied" : "Share This Report"}
            </button>
          ) : null}

          <span aria-live="polite" className={styles.visuallyHidden}>
            {copied ? "Report link copied to clipboard" : ""}
          </span>
        </div>
      </header>

      <div className={styles.liveMetrics}>
        {tiles.map(({ label, value, note }) => (
          <div className={styles.liveMetric} key={label}>
            <span className={styles.liveMetricLabel}>{label}</span>
            <strong>{value}</strong>
            <p>{note}</p>
          </div>
        ))}
      </div>

      <div className={styles.liveGrid}>
        <section className={styles.liveHeatmapCard} aria-label="Ranking heatmap">
          <div className={styles.liveHeatmapHeader}>
            <div>
              <h3>Google Maps Ranking Heatmap</h3>
              <span className={styles.badge}>
                {result.grid_size}×{result.grid_size} Grid
              </span>
            </div>
            <ul className={styles.legend}>
              <li>
                <i className={styles.good} />
                #1–3
              </li>
              <li>
                <i className={styles.medium} />
                #4–10
              </li>
              <li>
                <i className={styles.weak} />
                #11+
              </li>
              <li>
                <i className={styles.missing} />
                Not found
              </li>
            </ul>
          </div>

          <Heatmap result={result} />

          <div className={styles.mapFooter}>
            <span>
              <MapPin size={13} aria-hidden="true" /> Business at the centre
            </span>
            <span>{result.points.length} scanned points</span>
          </div>
        </section>

        <aside className={styles.liveSidebar} aria-label="Competitors and insight">
          {result.competitors.length ? (
            <section className={styles.liveCompetitors}>
              <div className={styles.liveCompetitorHead}>
                <h3>
                  <Users size={15} aria-hidden="true" /> Top Local Competitors
                </h3>
              </div>
              <ol>
                {result.competitors.map((competitor, index) => (
                  <li key={`${competitor.business_name}-${index}`}>
                    <span className={styles.competitorPosition}>
                      {index + 1}
                    </span>
                    <div>
                      <strong>{competitor.business_name}</strong>
                      <span className={styles.competitorStats}>
                        <span>
                          Appears at {competitor.points_covered ?? 0} grid
                          points
                        </span>
                        {competitor.average_position != null ? (
                          <b>Avg. #{competitor.average_position}</b>
                        ) : null}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {result.insight ? (
            <section className={styles.liveInsight}>
              <span className={styles.liveInsightTitle}>
                <Radar size={15} aria-hidden="true" /> GridBeacon Insight
              </span>
              <p>{result.insight}</p>
            </section>
          ) : null}

          <section className={styles.liveConvert}>
            <h3>{finding.title}</h3>
            <p>{finding.detail}</p>
            <p className={styles.convertOffer}>
              A free account includes:
            </p>
            <ul>
              {[
                "500 credits, enough for 20 more 5×5 scans",
                "Competitor grids and the Gap view",
                "Your ranking history",
                "This scan, saved to your account",
              ].map((benefit) => (
                <li key={benefit}>
                  <Check size={13} aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
            <a
              className={styles.convertCta}
              href={SIGNUP_URL}
              onClick={() => {
                trackChecker(EVENTS.signupClicked);
                onSignupClick?.();
              }}
            >
              See Who&apos;s Beating You
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <p className={styles.convertNote}>
              Free, with no credit card. Sign up with this email and this scan
              appears in your account. Paid plans add Rank MRI, AI reports and
              scheduled scans.
            </p>
          </section>
        </aside>
      </div>

      <ScanSizes />

      <p className={styles.resultHelp}>
        New to heatmaps?{" "}
        <a href="/tutorials#reading-results">
          Watch how to read your results
        </a>
      </p>

      <div className={styles.resultStatusBar}>
        <span>
          {result.grid_size}×{result.grid_size} Local Ranking Grid
        </span>
        <span>Real Google Maps Results · One Free Scan Per Day</span>
      </div>
    </div>
  );
}
