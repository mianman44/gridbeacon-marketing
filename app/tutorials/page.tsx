import type { Metadata } from "next";

import {
  CtaBand,
  Hero,
  InlineCta,
  Section,
  SeoLandingPage,
  TextLink,
  Toc,
} from "@/components/marketing/seo-landing";
import { TutorialsStructuredData } from "@/components/marketing/structured-data";
import { TutorialVideo } from "@/components/marketing/tutorials/tutorial-video";
import styles from "@/components/marketing/tutorials/tutorials.module.css";
import { pageMetadata, SIGNUP_URL } from "@/lib/seo";
import {
  ALL_TUTORIALS,
  TUTORIAL_GROUPS,
  YOUTUBE_CHANNEL_URL,
} from "@/lib/tutorials";

export const metadata: Metadata = pageMetadata({
  path: "/tutorials",
  title: "GridBeacon Tutorials: Learn Google Maps Rank Tracking",
  description:
    "Short video tutorials for GridBeacon: run your first scan, read a heatmap, analyze competitors, track ranking changes and create client reports.",
  absoluteTitle: true,
});

const FIRST = TUTORIAL_GROUPS[0].tutorials[0];

export default function TutorialsPage() {
  return (
    <SeoLandingPage>
      <TutorialsStructuredData />

      <Hero
        eyebrow="Tutorials"
        title="Learn GridBeacon in a Few Minutes"
        lede={
          <>
            Short, step-by-step videos that take you from your first scan to
            client-ready reports. Start at the beginning or jump to the topic
            you need.
          </>
        }
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        primaryNote="No credit card required. New accounts get 500 free scan credits."
        secondary={{ label: "Watch on YouTube", href: YOUTUBE_CHANNEL_URL }}
        facts={[`${ALL_TUTORIALS.length} tutorials`, "Most under 4 minutes"]}
        media={
          <div className={styles.featured}>
            <TutorialVideo tutorial={FIRST} priority />
          </div>
        }
      />

      <Section id="topics" eyebrow="Browse" title="Find a Tutorial">
        <Toc items={TUTORIAL_GROUPS.map((group) => [group.title, group.id])} />
      </Section>

      {TUTORIAL_GROUPS.map((group, index) => (
        <Section
          key={group.id}
          id={group.id}
          tone={index % 2 === 0 ? "tint" : "white"}
          title={group.title}
          intro={<p>{group.intro}</p>}
        >
          <ul className={styles.grid}>
            {group.tutorials.map((tutorial) => (
              <li key={tutorial.id} className={styles.card}>
                <TutorialVideo tutorial={tutorial} />
                <div className={styles.body}>
                  <h3 className={styles.title}>{tutorial.title}</h3>
                  <p className={styles.summary}>{tutorial.summary}</p>
                  {tutorial.paid && (
                    <span className={styles.tag}>Paid plans</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <Section id="more" title="More Ways to Learn">
        <InlineCta>
          <TextLink href="/how-it-works">How GridBeacon works</TextLink>
          {" · "}
          <TextLink href="/features">All features</TextLink>
          {" · "}
          <TextLink href="/blog">Blog</TextLink>
          {" · "}
          <TextLink href={YOUTUBE_CHANNEL_URL}>YouTube channel</TextLink>
        </InlineCta>
      </Section>

      <CtaBand
        title="Ready to Run Your First Scan?"
        body="See where your business ranks across your service area."
        primary={{ label: "Start Free", href: SIGNUP_URL }}
        note="No credit card required."
        secondary={{ label: "View Pricing", href: "/pricing" }}
      />
    </SeoLandingPage>
  );
}
