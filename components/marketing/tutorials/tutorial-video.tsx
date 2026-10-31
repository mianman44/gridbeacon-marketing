"use client";

import { useState } from "react";

import { clockLength, type Tutorial } from "@/lib/tutorials";

import styles from "./tutorials.module.css";

/*
 * A thumbnail until someone presses play. YouTube's player is heavy and
 * sets cookies, so a page of eighteen videos loads none of it up front,
 * and a played video uses the privacy-enhanced domain.
 */
export function TutorialVideo({
  tutorial,
  priority = false,
}: {
  tutorial: Pick<Tutorial, "id" | "title" | "seconds">;
  priority?: boolean;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className={styles.frame}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${tutorial.id}?autoplay=1&rel=0`}
          title={tutorial.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className={styles.frame}
      onClick={() => setPlaying(true)}
      aria-label={`Play ${tutorial.title}, ${clockLength(tutorial.seconds)}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- YouTube already sizes these, and the optimizer would only add a hop. */}
      <img
        src={`https://i.ytimg.com/vi/${tutorial.id}/hqdefault.jpg`}
        alt=""
        width={480}
        height={360}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
      <span className={styles.play} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
          <path d="M8 5.5v13l11-6.5z" />
        </svg>
      </span>
      <span className={styles.length}>{clockLength(tutorial.seconds)}</span>
    </button>
  );
}
