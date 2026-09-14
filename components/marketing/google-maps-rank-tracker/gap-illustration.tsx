import styles from "./gap-illustration.module.css";

/*
 * A drawn example of GridBeacon's Gap view, not a screenshot: the
 * product has no capture of it yet that is fit to publish. It is
 * labelled as an illustration on the page for that reason.
 *
 * Each value is the number of places between the business and one
 * competitor at a grid point: positive where the business ranks
 * higher, negative where the competitor does, 0 where they tie.
 * "home" marks the business's own location at the centre.
 */
const GAPS: (number | "home")[][] = [
  [2, 1, 0, -1, -3, -4, -5],
  [3, 2, 1, -1, -2, -4, -4],
  [3, 3, 2, 1, -1, -2, -3],
  [4, 3, 3, "home", 1, -1, -2],
  [3, 3, 2, 2, 1, 0, -1],
  [2, 2, 2, 1, 1, 1, 0],
  [1, 2, 1, 1, 0, 1, 1],
];

function label(value: number) {
  if (value === 0) return "=";
  return value > 0 ? `+${value}` : `−${Math.abs(value)}`;
}

export function GapIllustration() {
  return (
    <figure className={styles.figure}>
      <div className={styles.board}>
        <div
          className={styles.grid}
          role="img"
          aria-label="Illustration of a Gap view: the business leads at most points to the west and south of its location, while a competitor leads in the north-east."
        >
          {GAPS.flat().map((value, index) =>
            value === "home" ? (
              <span key={index} className={`${styles.dot} ${styles.home}`}>
                You
              </span>
            ) : (
              <span
                key={index}
                className={`${styles.dot} ${
                  value > 0 ? styles.lead : value < 0 ? styles.behind : styles.tie
                }`}
              >
                {label(value)}
              </span>
            ),
          )}
        </div>
        <ul className={styles.legend}>
          <li><span className={`${styles.swatch} ${styles.lead}`} aria-hidden="true" /> You rank higher</li>
          <li><span className={`${styles.swatch} ${styles.behind}`} aria-hidden="true" /> Competitor ranks higher</li>
          <li><span className={`${styles.swatch} ${styles.tie}`} aria-hidden="true" /> Level</li>
        </ul>
      </div>
      <figcaption className={styles.caption}>
        Illustration of the Gap view. Numbers show how many places separate
        you and the competitor at each point; in the app, every dot is a
        real grid point from your scan.
      </figcaption>
    </figure>
  );
}
