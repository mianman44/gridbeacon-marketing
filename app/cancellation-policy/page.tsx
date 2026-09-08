import type {
  Metadata,
} from "next";

import {
  LegalDocument,
} from "@/components/marketing/legal-document";

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description:
    "GridBeacon subscription cancellation policy.",
};

export default function CancellationPolicyPage() {
  return (
    <LegalDocument
      eyebrow="Billing"
      title="Cancellation Policy"
      description="This policy explains how recurring GridBeacon subscriptions can be cancelled."
      updated="August 10, 2026"
      sections={[
        {
          title: "1. Cancelling your subscription",
          content: (
            <p>
              You may cancel an eligible recurring
              GridBeacon subscription using the available
              billing controls in your account or by
              contacting support@gridbeaconhq.com if you
              need assistance.
            </p>
          ),
        },
        {
          title: "2. When cancellation takes effect",
          content: (
            <p>
              Unless otherwise stated during cancellation
              or required by applicable law, cancellation
              is scheduled for the end of the current
              billing period. This prevents the
              subscription from renewing for another
              billing cycle.
            </p>
          ),
        },
        {
          title: "3. Access after cancellation",
          content: (
            <p>
              Where cancellation is scheduled for the end
              of a paid billing period, subscription
              access ordinarily remains available until
              that period ends, subject to account
              standing, security restrictions and
              applicable service rules.
            </p>
          ),
        },
        {
          title: "4. Subscription credits",
          content: (
            <p>
              Monthly subscription credits are tied to the
              applicable billing cycle. Unused recurring
              subscription credits may expire when the
              billing cycle or subscription entitlement
              ends.
            </p>
          ),
        },
        {
          title: "5. Refunds and cancellation are different",
          content: (
            <p>
              Cancelling future renewal does not
              automatically refund an already completed
              payment. Refund requests are handled
              separately under the GridBeacon Refund
              Policy and applicable law.
            </p>
          ),
        },
        {
          title: "6. Resuming a scheduled cancellation",
          content: (
            <p>
              If GridBeacon provides a resume option and
              your subscription has not yet reached its
              cancellation date, you may be able to remove
              the scheduled cancellation before the
              current billing period ends.
            </p>
          ),
        },
        {
          title: "7. Billing support",
          content: (
            <p>
              If you cannot cancel through your account or
              have a question about the effective
              cancellation date, contact
              support@gridbeaconhq.com.
            </p>
          ),
        },
      ]}
    />
  );
}
