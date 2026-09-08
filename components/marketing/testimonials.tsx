import { Star } from "lucide-react";

import styles from "@/components/marketing/home.module.css";

/*
 * Customer quotes, exactly as supplied.
 *
 * Rendered for a reader and deliberately NOT marked up as
 * schema.org Review or AggregateRating. Self-serving review
 * markup -- a business publishing structured ratings about
 * itself -- is against Google's own guidance and is ignored at
 * best. The stars below are presentation; nothing here claims a
 * machine-readable score.
 */

const testimonials = [
  {
    quote:
      "GridBeacon makes local rankings incredibly easy to understand. The heatmaps show exactly where our visibility is strong and where we need to improve. It saves us a huge amount of time compared with checking rankings manually.",
    attribution: "Local Business Owner",
  },
  {
    quote:
      "The competitor comparison is one of my favorite features. We can see exactly where other businesses are outranking us and focus our efforts on the areas that matter most. The reports are clear and easy to share.",
    attribution: "SEO Agency Owner",
  },
  {
    quote:
      "GridBeacon gives us more than just ranking numbers. The heatmaps, historical tracking, and AI insights help turn the data into actual decisions. It has become a very useful part of our local SEO workflow.",
    attribution: "Local SEO Specialist",
  },
];

export function Testimonials() {
  return (
    <section
      className={styles.bandDark}
      aria-labelledby="testimonials-heading"
    >
      <div className={styles.container}>
        <div className={styles.sectionTop}>
          <p className={styles.eyebrow}>In their words</p>
          <span className={styles.sectionAside}>
            Businesses and agencies using GridBeacon.
          </span>
        </div>

        <h2 id="testimonials-heading">
          Built for the people
          <br />
          <span>who have to explain it.</span>
        </h2>

        <div className={styles.quotes}>
          {testimonials.map((item) => (
            <figure className={styles.quote} key={item.attribution}>
              <div
                className={styles.stars}
                role="img"
                aria-label="Rated five out of five"
              >
                {[0, 1, 2, 3, 4].map((n) => (
                  <Star
                    key={n}
                    size={15}
                    aria-hidden="true"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                ))}
              </div>

              <blockquote>{item.quote}</blockquote>

              <figcaption>{item.attribution}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
