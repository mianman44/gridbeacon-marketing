"use client";

import Link from "next/link";

export function MobileNavigation() {
  return (
    <details
      className="ads-mobile-nav"
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) {
          event.currentTarget.open = false;
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.currentTarget.open = false;
          event.currentTarget.querySelector("summary")?.focus();
        }
      }}
    >
      <summary aria-label="Section menu">☰</summary>
      <div>
        <a href="#features">Features</a>
        <a href="#how-it-works">How It Works</a>
        <a href="#competitors">Competitor Radar</a>
        <a href="#agencies">For Agencies</a>
        <Link href="/pricing" prefetch={false}>Pricing</Link>
      </div>
    </details>
  );
}
