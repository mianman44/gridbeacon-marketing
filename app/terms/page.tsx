import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  LegalDocument,
} from "@/components/marketing/legal-document";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for GridBeacon, operated by Hustle 24/7.",
};

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Terms of Service"
      description="These Terms govern access to and use of GridBeacon, a software service operated by Hustle 24/7."
      updated="August 10, 2026"
      sections={[
        {
          title: "1. About GridBeacon",
          content: (
            <>
              <p>
                GridBeacon is a software-as-a-service
                product operated by Hustle 24/7, Pasrur,
                Sialkot, Punjab, Pakistan. GridBeacon
                provides local search ranking tools,
                geographic grid scans, ranking history,
                visibility information and related
                software features.
              </p>

              <p>
                References to “GridBeacon,” “we,” “us” or
                “our” in these Terms refer to the
                GridBeacon service operated by Hustle
                24/7.
              </p>
            </>
          ),
        },
        {
          title: "2. Acceptance of these Terms",
          content: (
            <p>
              By creating an account, accessing GridBeacon
              or purchasing a subscription or credit pack,
              you agree to these Terms. If you do not agree
              to them, you must not use the service.
            </p>
          ),
        },
        {
          title: "3. Accounts",
          content: (
            <>
              <p>
                You must provide accurate account
                information and keep your login credentials
                secure. You are responsible for activity
                performed through your account unless you
                promptly notify us of unauthorized access.
              </p>

              <p>
                You may not use another person's account
                without permission or create accounts for
                unlawful, fraudulent or abusive purposes.
              </p>
            </>
          ),
        },
        {
          title: "4. The service",
          content: (
            <>
              <p>
                GridBeacon provides tools that collect,
                organize and display local search ranking
                information. Ranking information may vary
                based on location, search engine behavior,
                third-party data availability and other
                factors outside our control.
              </p>

              <p>
                GridBeacon does not guarantee any specific
                Google ranking, search visibility,
                customer lead volume, revenue or SEO
                outcome.
              </p>
            </>
          ),
        },
        {
          title: "5. Subscriptions and scan credits",
          content: (
            <>
              <p>
                Paid plans include a stated quantity of
                scan credits for each billing cycle.
                Grid-based scans consume credits according
                to the number of successfully processed
                grid points or other usage rules displayed
                within GridBeacon.
              </p>

              <p>
                Subscription credits refresh according to
                the applicable billing cycle. Unused
                subscription credits may expire when a new
                subscription cycle begins. One-time credit
                purchases are accounted for separately
                from recurring subscription allowances.
              </p>

              <p>
                We may update plan limits, features or
                credit requirements in the future. Changes
                that materially affect an existing paid
                subscription will be communicated where
                required.
              </p>
            </>
          ),
        },
        {
          title: "6. Pricing, payments and taxes",
          content: (
            <>
              <p>
                Current pricing is displayed on the{" "}
                <Link
                  href="/pricing"
                  className="font-bold text-indigo-600"
                >
                  GridBeacon pricing page
                </Link>
                . Prices are shown in USD unless otherwise
                stated.
              </p>

              <p>
                Paid transactions may be processed by
                Paddle, which acts as Merchant of Record
                for transactions processed through its
                checkout. Applicable taxes may be
                calculated and collected during checkout.
              </p>

              <p>
                Transactions processed by Paddle may also
                be subject to Paddle's applicable buyer
                terms presented during purchase.
              </p>
            </>
          ),
        },
        {
          title: "7. Renewals and cancellation",
          content: (
            <>
              <p>
                Recurring subscriptions renew according to
                the billing interval shown at checkout
                until cancelled.
              </p>

              <p>
                You may cancel an eligible subscription
                through the available billing controls.
                Unless otherwise required by law,
                cancellation normally takes effect at the
                end of the current paid billing period.
              </p>

              <p>
                See our{" "}
                <Link
                  href="/cancellation-policy"
                  className="font-bold text-indigo-600"
                >
                  Cancellation Policy
                </Link>{" "}
                for additional information.
              </p>
            </>
          ),
        },
        {
          title: "8. Refunds",
          content: (
            <>
              <p>
                Refund eligibility depends on the
                circumstances of the transaction,
                applicable law, service usage and the
                payment processor's requirements.
              </p>

              <p>
                See our{" "}
                <Link
                  href="/refund-policy"
                  className="font-bold text-indigo-600"
                >
                  Refund Policy
                </Link>{" "}
                for details. Nothing in these Terms removes
                rights that cannot legally be excluded.
              </p>
            </>
          ),
        },
        {
          title: "9. Acceptable use",
          content: (
            <>
              <p>
                You may not use GridBeacon to violate
                applicable law, interfere with the service,
                gain unauthorized access to systems,
                distribute malicious software, abuse
                third-party services or misrepresent your
                identity.
              </p>

              <p>
                You may not attempt to reverse engineer,
                resell, copy or exploit GridBeacon except
                where expressly authorized by us or
                permitted by applicable law.
              </p>
            </>
          ),
        },
        {
          title: "10. Third-party services and data",
          content: (
            <p>
              GridBeacon may depend on third-party
              infrastructure, data providers, mapping
              services, payment services and search
              platforms. Those services may change,
              experience outages or impose limitations
              outside our control.
            </p>
          ),
        },
        {
          title: "11. Intellectual property",
          content: (
            <>
              <p>
                GridBeacon's software, branding, website,
                interfaces and original content are owned
                by or licensed to Hustle 24/7 and are
                protected by applicable intellectual
                property laws.
              </p>

              <p>
                You retain ownership of information you
                lawfully submit to the service. You grant
                us the limited rights needed to process
                that information to operate and support
                GridBeacon.
              </p>
            </>
          ),
        },
        {
          title: "12. Availability and changes",
          content: (
            <p>
              We work to keep GridBeacon available and
              reliable, but uninterrupted or error-free
              operation is not guaranteed. We may maintain,
              update, modify or discontinue features when
              reasonably necessary.
            </p>
          ),
        },
        {
          title: "13. Disclaimer",
          content: (
            <p>
              GridBeacon provides ranking and visibility
              information for analysis purposes. It is not
              a guarantee of search engine performance,
              advertising results, business revenue or
              future ranking positions. To the extent
              permitted by law, the service is provided
              without warranties beyond those expressly
              stated in these Terms.
            </p>
          ),
        },
        {
          title: "14. Limitation of liability",
          content: (
            <p>
              To the maximum extent permitted by applicable
              law, Hustle 24/7 will not be liable for
              indirect, incidental, special or
              consequential losses arising from use of
              GridBeacon, including lost profits, lost
              business opportunities or losses caused by
              third-party service interruptions. Nothing
              in these Terms limits liability that cannot
              legally be limited.
            </p>
          ),
        },
        {
          title: "15. Suspension and termination",
          content: (
            <p>
              We may suspend or terminate access where
              reasonably necessary to address fraud,
              security threats, non-payment, serious
              violations of these Terms or unlawful use.
              You may stop using GridBeacon at any time.
            </p>
          ),
        },
        {
          title: "16. Privacy",
          content: (
            <p>
              Our handling of personal information is
              described in the{" "}
              <Link
                href="/privacy"
                className="font-bold text-indigo-600"
              >
                GridBeacon Privacy Policy
              </Link>
              .
            </p>
          ),
        },
        {
          title: "17. Changes to these Terms",
          content: (
            <p>
              We may update these Terms as GridBeacon
              evolves or legal requirements change. The
              updated version will be posted on this page
              with a revised date. Where required, we will
              provide additional notice of material
              changes.
            </p>
          ),
        },
        {
          title: "18. Applicable law",
          content: (
            <p>
              These Terms are subject to applicable law in
              Pakistan and any mandatory consumer
              protections that apply to a particular
              customer or transaction.
            </p>
          ),
        },
        {
          title: "19. Contact",
          content: (
            <p>
              Questions about these Terms may be sent to{" "}
              <a
                href="mailto:support@gridbeaconhq.com"
                className="font-bold text-indigo-600"
              >
                support@gridbeaconhq.com
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
