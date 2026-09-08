import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  LegalDocument,
} from "@/components/marketing/legal-document";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "GridBeacon refund policy for subscriptions and credit purchases.",
};

export default function RefundPolicyPage() {
  return (
    <LegalDocument
      eyebrow="Billing"
      title="Refund Policy"
      description="This policy explains how refund requests for GridBeacon subscriptions and one-time credit purchases are handled."
      updated="August 10, 2026"
      sections={[
        {
          title: "1. Refund requests",
          content: (
            <p>
              If you believe a GridBeacon charge was made
              in error or you have another legitimate
              reason to request a refund, contact
              support@gridbeaconhq.com as soon as possible
              and include the email address associated
              with your account and relevant transaction
              information.
            </p>
          ),
        },
        {
          title: "2. Refund review",
          content: (
            <>
              <p>
                Refund requests are reviewed based on the
                circumstances of the purchase, service
                usage, credits already consumed, duplicate
                or mistaken charges, applicable consumer
                law and the requirements of our payment
                processor.
              </p>

              <p>
                Where a payment is processed through
                Paddle, any approved monetary refund is
                processed through Paddle rather than by a
                separate direct payment from GridBeacon.
              </p>
            </>
          ),
        },
        {
          title: "3. Subscription payments",
          content: (
            <p>
              Cancelling a subscription does not by itself
              create a refund for an already completed
              billing period. If you request a refund for
              a recent subscription charge, we will review
              the request together with relevant usage and
              applicable legal or payment-processor
              requirements.
            </p>
          ),
        },
        {
          title: "4. Used scan credits",
          content: (
            <p>
              Scan credits that have already been consumed
              by successfully processed scan work are
              generally considered used service. Refunds
              for fully or substantially consumed digital
              usage may be limited unless required by
              applicable law or approved under the
              payment processor's rules.
            </p>
          ),
        },
        {
          title: "5. One-time credit purchases",
          content: (
            <p>
              Refund requests for one-time credit packs
              will be reviewed based on whether the credits
              have been used and the circumstances of the
              transaction. Consumed credits may reduce or
              eliminate eligibility for a discretionary
              refund, subject to applicable law.
            </p>
          ),
        },
        {
          title: "6. Duplicate, fraudulent or incorrect charges",
          content: (
            <p>
              Please contact us promptly if you believe a
              payment was duplicated, unauthorized,
              fraudulent or otherwise incorrect. We will
              investigate the transaction and work with
              the payment processor where necessary.
            </p>
          ),
        },
        {
          title: "7. Statutory rights",
          content: (
            <p>
              Nothing in this Refund Policy limits any
              refund, cancellation or consumer rights that
              cannot be excluded under applicable law.
            </p>
          ),
        },
        {
          title: "8. Cancellation",
          content: (
            <p>
              For information about stopping future
              recurring charges, see the{" "}
              <Link
                href="/cancellation-policy"
                className="font-bold text-indigo-600"
              >
                GridBeacon Cancellation Policy
              </Link>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
