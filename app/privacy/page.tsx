import type {
  Metadata,
} from "next";

import {
  LegalDocument,
} from "@/components/marketing/legal-document";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for GridBeacon, operated by Hustle 24/7.",
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Privacy Policy"
      description="This Privacy Policy explains how GridBeacon, operated by Hustle 24/7, collects, uses and protects information associated with the service."
      updated="August 10, 2026"
      sections={[
        {
          title: "1. Who operates GridBeacon",
          content: (
            <p>
              GridBeacon is operated by Hustle 24/7,
              Pasrur, Sialkot, Punjab, Pakistan. For
              privacy questions, contact
              support@gridbeaconhq.com.
            </p>
          ),
        },
        {
          title: "2. Information we collect",
          content: (
            <>
              <p>
                We may collect account information such as
                your name, email address, account
                identifiers and authentication-related
                information.
              </p>

              <p>
                We collect information you enter into
                GridBeacon, including projects, business
                information, keywords, scan settings and
                related local ranking data.
              </p>

              <p>
                We may collect technical and usage
                information such as IP address, device or
                browser information, timestamps,
                application logs, feature usage and
                diagnostic data.
              </p>
            </>
          ),
        },
        {
          title: "3. Billing information",
          content: (
            <p>
              Subscription and payment transactions may be
              processed by Paddle. GridBeacon may receive
              transaction identifiers, customer
              identifiers, subscription status, plan
              information, billing-cycle information and
              other payment metadata needed to manage your
              account. We do not need to store your full
              payment-card number in order to operate
              GridBeacon.
            </p>
          ),
        },
        {
          title: "4. How we use information",
          content: (
            <>
              <p>
                We use information to provide and maintain
                GridBeacon, authenticate accounts, run
                ranking scans, manage credits and
                subscriptions, provide support, protect
                the service against abuse and improve
                reliability.
              </p>

              <p>
                We may also use information to comply with
                legal obligations, enforce our Terms and
                investigate security or billing issues.
              </p>
            </>
          ),
        },
        {
          title: "5. Service providers",
          content: (
            <p>
              We may share information with service
              providers that help us operate GridBeacon,
              such as hosting providers, database and
              infrastructure providers, payment processors,
              analytics or monitoring providers, mapping
              services and search-data providers. They
              receive information only as reasonably
              necessary for the relevant service or legal
              obligation.
            </p>
          ),
        },
        {
          title: "6. Legal disclosures",
          content: (
            <p>
              We may disclose information when reasonably
              necessary to comply with law, legal process
              or regulatory requirements; protect
              GridBeacon, Hustle 24/7, our users or the
              public; investigate fraud or security
              issues; or establish or defend legal claims.
            </p>
          ),
        },
        {
          title: "7. Data retention",
          content: (
            <p>
              We retain information for as long as
              reasonably necessary to operate the service,
              maintain account and transaction records,
              resolve disputes, meet legal requirements
              and protect against fraud or abuse. Different
              categories of information may be retained
              for different periods.
            </p>
          ),
        },
        {
          title: "8. Data security",
          content: (
            <p>
              We use reasonable technical and
              organizational measures intended to protect
              information against unauthorized access,
              alteration, loss or misuse. No internet
              service or storage system can guarantee
              absolute security.
            </p>
          ),
        },
        {
          title: "9. International processing",
          content: (
            <p>
              GridBeacon and its service providers may
              process information in countries other than
              the country where you live. Where required,
              we take reasonable steps to handle such
              information in accordance with applicable
              privacy requirements.
            </p>
          ),
        },
        {
          title: "10. Your choices and rights",
          content: (
            <p>
              Depending on your location and applicable
              law, you may have rights relating to access,
              correction, deletion or other processing of
              personal information. You may contact
              support@gridbeaconhq.com to submit a privacy
              request. We may need to verify your identity
              before fulfilling certain requests.
            </p>
          ),
        },
        {
          title: "11. Cookies and similar technologies",
          content: (
            <p>
              GridBeacon may use cookies, local storage or
              similar technologies that are necessary for
              authentication, security, preferences and
              application functionality. Additional
              analytics technologies may be used where
              appropriate and subject to applicable
              requirements.
            </p>
          ),
        },
        {
          title: "12. Children's privacy",
          content: (
            <p>
              GridBeacon is a business software service and
              is not intended for children. We do not
              knowingly design the service for children
              who are below the age at which they may
              independently consent to use an online
              service under applicable law.
            </p>
          ),
        },
        {
          title: "13. Changes to this policy",
          content: (
            <p>
              We may update this Privacy Policy as our
              service or legal obligations change. The
              current version will be published on this
              page together with its effective date.
            </p>
          ),
        },
        {
          title: "14. Contact us",
          content: (
            <p>
              Privacy questions or requests may be sent to
              support@gridbeaconhq.com.
            </p>
          ),
        },
      ]}
    />
  );
}
