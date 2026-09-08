import type {
  ReactNode,
} from "react";

import {
  MarketingFooter,
} from "@/components/marketing/marketing-footer";

import {
  MarketingHeader,
} from "@/components/marketing/marketing-header";

type LegalSection = {
  title: string;
  content: ReactNode;
};

interface LegalDocumentProps {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
}

export function LegalDocument({
  eyebrow,
  title,
  description,
  updated,
  sections,
}: LegalDocumentProps) {
  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader />

      <main>
        <section className="border-b border-slate-100 bg-gradient-to-b from-indigo-50/80 to-white">
          <div className="mx-auto max-w-4xl px-5 py-20 sm:px-6 lg:px-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-indigo-600">
              {eyebrow}
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
              {title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              {description}
            </p>

            <p className="mt-6 text-xs font-semibold text-slate-400">
              Last updated: {updated}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-16 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-black tracking-tight text-slate-950">
                  {section.title}
                </h2>

                <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 rounded-3xl border border-indigo-100 bg-indigo-50 p-6">
            <p className="font-extrabold text-slate-950">
              GridBeacon
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              GridBeacon is operated by Hustle 24/7,
              Pasrur, Sialkot, Punjab, Pakistan.
            </p>

            <a
              href="mailto:support@gridbeaconhq.com"
              className="mt-3 inline-block text-sm font-bold text-indigo-600 hover:text-indigo-700"
            >
              support@gridbeaconhq.com
            </a>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
