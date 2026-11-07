import type { Metadata } from "next";

import {
  Cards,
  Checklist,
  CtaBand,
  Faq,
  Hero,
  InlineCta,
  Note,
  Section,
  SeoLandingPage,
  Split,
  Steps,
  TextLink,
} from "@/components/marketing/seo-landing";
import { ReviewLinkTool } from "@/components/marketing/review-link/review-link-tool";
import { ReviewLinkGeneratorStructuredData } from "@/components/marketing/structured-data";
import { pageMetadata, SIGNUP_URL } from "@/lib/seo";

/*
 * Free Google review link generator.
 *
 * A top-of-funnel tool for local business owners and agencies: find the
 * profile, get the direct review link, a QR code and message templates,
 * then hand off to the free rank checker. The policy section quotes
 * Google's own rules (no incentives, no asking only happy customers);
 * keep the templates neutral for the same reason.
 */

const PATH = "/google-review-link-generator";
const GOOGLE_REVIEW_TIPS = "https://support.google.com/business/answer/3474122";
const GOOGLE_REVIEW_POLICY = "https://support.google.com/contributionpolicy/answer/7400114";
const GOOGLE_LOCAL_RANKING = "https://support.google.com/business/answer/7091";

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: "Free Google Review Link Generator (+ QR Code)",
  description:
    "Free Google review link generator: find your business and get a direct link to your Google review form, a printable QR code and ready-to-send messages. No account needed.",
});

const FAQS: [string, string][] = [
  [
    "What is a Google review link?",
    "A link that opens the Write a review form for one specific Google Business Profile. Customers tap it, sign in to Google if they aren't already, pick a star rating and post their review, without having to search for your business first.",
  ],
  [
    "Is this review link generator free?",
    "Yes. Search for your business, copy the link and download the QR code as often as you need. No account, email or card is required.",
  ],
  [
    "Does the review link expire?",
    "No. The link is built from your profile's Google place ID, which stays the same as long as the listing exists. If the listing is removed or merged into another one, generate a new link.",
  ],
  [
    "Is this the same as the link in my Google Business Profile?",
    "It opens the same review form. Google also gives profile owners a short link and QR code under Ask for reviews in the Business Profile. This tool builds the link from the public listing, so it works without signing in to the profile, and it works for clients' businesses too.",
  ],
  [
    "Do customers need a Google account to leave a review?",
    "Yes. Google asks people to sign in before they post a review, so customers without a Google account will be asked to sign in or create one.",
  ],
  [
    "Can I make review links for my clients?",
    "Yes. Search for any business listed on Google Maps. Agencies often add the link and QR code to client onboarding packs, email signatures and printed materials.",
  ],
  [
    "Why can't I find my business?",
    "Type the business name and city exactly as they appear on Google Maps. The business needs a Google Business Profile that is visible on Maps; a new or suspended listing may not show up. Service-area businesses with a hidden address can still be found by name.",
  ],
  [
    "Can I offer a discount for a review?",
    "No. Google's policy prohibits offering incentives such as discounts, free products or payment in exchange for reviews, and reviews posted because of an incentive can be removed. Ask every customer for an honest review instead.",
  ],
];

export default function GoogleReviewLinkGeneratorPage() {
  return (
    <SeoLandingPage>
      <ReviewLinkGeneratorStructuredData />

      <Hero
        crumb="Google Review Link Generator"
        eyebrow="Free tool"
        title="Free Google Review Link Generator"
        lede={
          <>
            Get a direct link to your Google review form in seconds. Find
            your business, copy the link, and download a QR code for your
            counter, receipts and invoices. Customers land straight on the
            star rating, without having to search for you first.
          </>
        }
        primary={{ label: "Get Your Review Link", href: "#review-tool" }}
        secondary={{ label: "Check Your Google Maps Rank", href: "/google-maps-rank-checker" }}
        facts={["No account needed", "QR code included", "Ready-to-send messages"]}
        media={<ReviewLinkTool />}
      />

      <Section id="how" eyebrow="How it works" title="How to Get Your Google Review Link">
        <Steps
          items={[
            {
              title: "Search for your business",
              body: "Type the name and city as they appear on Google Maps, then pick your listing from the results.",
            },
            {
              title: "Copy your link",
              body: "The tool builds the direct link to your review form. Use Test the link to check it opens your business.",
            },
            {
              title: "Download the QR code",
              body: "Save it as PNG for screens and documents, or SVG for print at any size.",
            },
            {
              title: "Send it to every customer",
              body: "Use the ready-made text message or email, or add the link wherever customers already hear from you.",
            },
          ]}
        />
      </Section>

      <Section
        id="where"
        tone="tint"
        eyebrow="Put it to work"
        title="Where to Share Your Google Review Link"
        intro={<p>The best time to ask is right after a good experience, while it is fresh.</p>}
      >
        <Cards
          items={[
            { title: "Text after the job", body: "A short text the same day gets more replies than an email a week later." },
            { title: "Follow-up email", body: "Add the link to your thank-you or job-complete email, with one clear button." },
            { title: "Invoices and receipts", body: "Print the QR code at the bottom, next to a one-line thank you." },
            { title: "Counter and table cards", body: "A small sign with the QR code where customers wait or pay." },
            { title: "Email signature", body: "A quiet “How did we do?” link under every email your team sends." },
            { title: "Website thank-you page", body: "Show the link after a booking or purchase is confirmed." },
          ]}
        />
      </Section>

      <Section
        id="rules"
        eyebrow="Stay within the rules"
        title="What Google Allows When You Ask for Reviews"
      >
        <Split
          media={
            <Note>
              Google removes reviews that break its policy, including
              reviews posted because of an incentive. Asking every customer
              for an honest review is always allowed.
            </Note>
          }
        >
          <Checklist
            items={[
              "Do ask every customer for a review, not only the ones you expect to be happy.",
              "Do make it easy: a direct link or QR code is fine.",
              "Don't offer discounts, gifts, entries or payment in exchange for a review.",
              "Don't screen customers first and send only happy ones to Google (review gating).",
              "Don't write reviews for your own business or ask staff and family to.",
              "Do reply to reviews, including the negative ones, politely and promptly.",
            ]}
          />
          <p>
            From Google&apos;s{" "}
            <TextLink href={GOOGLE_REVIEW_POLICY} rel="nofollow noopener">
              Maps content policy
            </TextLink>{" "}
            and{" "}
            <TextLink href={GOOGLE_REVIEW_TIPS} rel="nofollow noopener">
              tips to get more reviews
            </TextLink>
            .
          </p>
        </Split>
      </Section>

      <Section
        id="ranking"
        tone="tint"
        eyebrow="Reviews and rankings"
        title="Do Google Reviews Help You Rank on Google Maps?"
      >
        <Split
          media={
            <Note>
              Want to know where you rank today? The{" "}
              <TextLink href="/google-maps-rank-checker">free Google Maps rank checker</TextLink>{" "}
              shows your position at 9 points around your business, and who
              ranks above you.
            </Note>
          }
        >
          <p>
            Google says local results are based on relevance, distance and
            prominence, and that review count and rating count towards
            prominence. In its own{" "}
            <TextLink href={GOOGLE_LOCAL_RANKING} rel="nofollow noopener">
              local ranking guidance
            </TextLink>
            , it recommends replying to reviews and getting more of them.
          </p>
          <p>
            Reviews are one factor among several, so more reviews will not
            guarantee a higher position. Track your rank before and after a
            review campaign to see what changes in your area, and compare your
            review count with the businesses that outrank you.
          </p>
        </Split>
        <InlineCta>
          <TextLink href="/google-review-analysis">Analyse your reviews with GridBeacon</TextLink>
          {" · "}
          <TextLink href="/local-seo-competitor-analysis">See who outranks you</TextLink>
        </InlineCta>
      </Section>

      <Section id="faq" eyebrow="FAQ" title="Google Review Link Questions">
        <Faq items={FAQS.map(([question, answer]) => [question, <p key="a">{answer}</p>])} />
      </Section>

      <CtaBand
        title="Got Your Link? See Where You Rank Next"
        body="Run a free Google Maps rank check and see your position at 9 points around your business, plus who beats you."
        primary={{ label: "Check My Rank Free", href: "/google-maps-rank-checker" }}
        note="Free. No card, no account."
        secondary={{ label: "Start Tracking Free", href: SIGNUP_URL }}
      />
    </SeoLandingPage>
  );
}
