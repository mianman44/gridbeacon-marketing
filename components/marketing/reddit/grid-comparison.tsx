import styles from "./reddit.module.css";

/*
 * Your grid, a competitor's grid and the Gap between them, drawn in
 * GridBeacon's heatmap colours. The numbers are example data, not a
 * scan -- the page labels it as an illustration -- chosen to show the
 * common pattern: strong near your own address, weak towards the side
 * of town where a competitor is based.
 *
 * Gap = competitor's rank minus yours at the same point: positive
 * where you rank higher, negative where they do.
 */
const YOURS = [
  [3, 4, 6, 9, 13, 17, 21],
  [2, 3, 4, 7, 11, 15, 19],
  [2, 2, 3, 5, 8, 12, 16],
  [1, 1, 2, 1, 5, 9, 14],
  [2, 1, 2, 3, 4, 7, 11],
  [3, 2, 3, 3, 4, 6, 9],
  [4, 3, 4, 4, 5, 6, 8],
];

const THEIRS = [
  [9, 7, 5, 3, 2, 1, 1],
  [10, 8, 6, 4, 2, 2, 1],
  [12, 10, 7, 5, 3, 2, 2],
  [14, 11, 9, 7, 5, 3, 3],
  [15, 12, 10, 8, 6, 4, 4],
  [17, 14, 12, 10, 8, 6, 5],
  [19, 16, 13, 12, 10, 8, 7],
];

const CENTRE = 3;

function rankClass(rank: number) {
  if (rank <= 3) return styles.cellTop3;
  if (rank <= 10) return styles.cellTop10;
  if (rank <= 20) return styles.cellTop20;
  return styles.cellLow;
}

function gapLabel(value: number) {
  if (value === 0) return "=";
  return value > 0 ? `+${value}` : `−${Math.abs(value)}`;
}

function RankGrid({ ranks, markHome, label }: { ranks: number[][]; markHome: boolean; label: string }) {
  return (
    <div className={styles.miniGrid} role="img" aria-label={label}>
      {ranks.flatMap((row, r) =>
        row.map((rank, c) =>
          markHome && r === CENTRE && c === CENTRE ? (
            <span key={`${r}-${c}`} className={`${styles.cell} ${styles.cellHome}`}>You</span>
          ) : (
            <span key={`${r}-${c}`} className={`${styles.cell} ${rankClass(rank)}`}>{rank}</span>
          ),
        ),
      )}
    </div>
  );
}

function GapGrid() {
  return (
    <div
      className={styles.miniGrid}
      role="img"
      aria-label="Example Gap grid: you rank higher across the west and south of the area, the competitor ranks higher in the north-east."
    >
      {YOURS.flatMap((row, r) =>
        row.map((yours, c) => {
          const gap = THEIRS[r][c] - yours;
          const tone = gap > 0 ? styles.cellLead : gap < 0 ? styles.cellBehind : styles.cellTie;
          return (
            <span key={`${r}-${c}`} className={`${styles.cell} ${tone}`}>
              {gapLabel(gap)}
            </span>
          );
        }),
      )}
    </div>
  );
}

export function GridComparison() {
  return (
    <figure className={styles.gridsFigure}>
      <div className={styles.grids}>
        <div className={styles.gridPanel}>
          <p className={styles.gridPanelTitle}>Your business grid</p>
          <p className={styles.gridPanelNote}>Your rank at each point</p>
          <RankGrid
            ranks={YOURS}
            markHome
            label="Example grid for your business: top-3 rankings around your location, dropping below 10 towards the north-east."
          />
        </div>
        <div className={styles.gridPanel}>
          <p className={styles.gridPanelTitle}>Competitor grid</p>
          <p className={styles.gridPanelNote}>Their rank at the same points</p>
          <RankGrid
            ranks={THEIRS}
            markHome={false}
            label="Example grid for a competitor: top-3 rankings in the north-east, weaker to the south-west."
          />
        </div>
        <div className={styles.gridPanel}>
          <p className={styles.gridPanelTitle}>Gap grid</p>
          <p className={styles.gridPanelNote}>
            <span className={styles.keyLead} aria-hidden="true" /> you rank higher
            {" · "}
            <span className={styles.keyBehind} aria-hidden="true" /> they do
          </p>
          <GapGrid />
        </div>
      </div>
      <figcaption className={styles.illustrationNote}>
        Illustration with example data, in GridBeacon&apos;s heatmap colours.
        In the app, every dot is a real point from your scan: pick a competitor
        on the heatmap and switch between your grid, theirs and the Gap view.
      </figcaption>
    </figure>
  );
}
