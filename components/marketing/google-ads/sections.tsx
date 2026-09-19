import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { LOGIN_URL, SIGNUP_URL } from "@/lib/seo";

/*
 * /google-ads -- the paid-traffic landing page.
 *
 * One job: Google Ad -> this page -> free signup -> first scan. The
 * header has no site navigation, every primary button goes to the app's
 * signup page, and nothing here pretends a scan can start before an
 * account exists.
 *
 * Product facts follow the backend: 1 credit per grid point, 500 free
 * credits at signup, no card; heatmap reports and competitor results on
 * every plan; AI reports on paid plans only (100 credits). Mockup
 * numbers are sample data and are labelled as such.
 */

const PRIMARY_CTA = "Start Free — Get 500 Credits";
const SECONDARY_CTA = "Run My First Scan Free";

/* --- small shared pieces -------------------------------------------- */

function ArrowIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}

function CheckIcon({ className = "w-4 h-4 text-emerald-600" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}

function SignupButton({
  children,
  className = "",
  size = "lg",
}: {
  children: ReactNode;
  className?: string;
  size?: "lg" | "md";
}) {
  const sizing = size === "lg" ? "px-7 py-4 text-base" : "px-6 py-3.5 text-sm";

  return (
    <Link
      href={SIGNUP_URL}
      prefetch={false}
      className={`ads-cta inline-flex min-h-[48px] items-center justify-center gap-2.5 ${sizing} font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-xl shadow-lg shadow-blue-600/25 transition-all group ${className}`}
    >
      <span>{children}</span>
      <ArrowIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  );
}

function SectionLabel({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "rose" | "slate" | "emerald" }) {
  const tones = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    rose: "bg-rose-50 text-rose-700 border-rose-200",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  return (
    <div className={`inline-block px-3 py-1 rounded-md border text-xs font-bold uppercase tracking-wider ${tones[tone]}`}>
      {children}
    </div>
  );
}

/* --- header ----------------------------------------------------------- */

export function AdsLandingHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* No site navigation on the paid landing page: the only ways on
            are logging in or starting free. */}
        <span className="ads-logo">
          <Image src="/branding/gridbeacon-logo-tagline.png" alt="GridBeacon — Google Maps Rank Intelligence" width={1200} height={339} className="ads-logo-image" sizes="240px" loading="eager" />
        </span>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href={LOGIN_URL} className="inline-flex min-h-[44px] items-center text-sm font-semibold text-slate-600 hover:text-[#0b1329] px-3 transition" prefetch={false}>
            Log In
          </Link>
          <Link href={SIGNUP_URL} className="inline-flex min-h-[44px] items-center justify-center gap-1.5 px-4 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-lg shadow-sm shadow-blue-600/30 transition-all" prefetch={false}>
            <span>Start Free</span>
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </header>
  );
}

/* --- 1. hero ----------------------------------------------------------- */

/* Sample 5x5 scan shown in the hero. The metrics under it are computed
   from these same numbers, so the mockup never contradicts itself. */
const SAMPLE_GRID: (number | null)[] = [
  14, 7, 5, 4, null,
  6, 2, 1, 3, 8,
  5, 1, 1, 2, 9,
  7, 3, 2, 3, 12,
  16, 10, 6, 11, null,
];
const SAMPLE_RANKED = SAMPLE_GRID.filter((rank): rank is number => rank !== null);
const SAMPLE_AVERAGE = (SAMPLE_RANKED.reduce((sum, rank) => sum + rank, 0) / SAMPLE_RANKED.length).toFixed(1);
const SAMPLE_VISIBILITY = Math.round((SAMPLE_RANKED.length / SAMPLE_GRID.length) * 100);
const SAMPLE_TOP3 = SAMPLE_RANKED.filter((rank) => rank <= 3).length;

function rankDot(rank: number | null) {
  if (rank === null) return "bg-rose-600 text-white";
  if (rank <= 3) return "bg-emerald-600 text-white";
  if (rank <= 10) return "bg-blue-600 text-white";
  if (rank <= 20) return "bg-amber-500 text-[#060c1c]";
  return "bg-rose-600 text-white";
}

function HeroHeatmap() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xl shadow-[#0b1329]/10 overflow-hidden ring-1 ring-[#0b1329]/5">
      <div className="bg-[#0b1329] px-4 py-3 flex items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="ml-2 text-xs font-mono text-slate-400 truncate">GridBeacon geo-grid heatmap</span>
        </div>
        <span className="inline-flex items-center gap-1 text-emerald-400 font-medium text-xs whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Sample scan
        </span>
      </div>

      <div className="bg-slate-50/90 border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-slate-800 bg-white px-2.5 py-1 rounded border border-slate-200">Garage door company</span>
          <span className="text-slate-600 bg-white px-2 py-1 rounded border border-slate-200 font-mono">&quot;garage door repair near me&quot;</span>
        </div>
        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200 font-medium">5 × 5 grid · 5 mi radius</span>
      </div>

      <div className="relative p-6 map-base-pattern flex flex-col items-center justify-center overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
          <path d="M-20 80 Q 150 120 450 60 T 900 140" stroke="#94a3b8" strokeWidth="4" fill="none" />
          <path d="M120 -20 Q 180 200 240 450" stroke="#cbd5e1" strokeWidth="3" fill="none" />
          <circle cx="280" cy="190" r="140" fill="rgba(37, 99, 235, 0.04)" stroke="rgba(37, 99, 235, 0.25)" strokeDasharray="3 3" />
        </svg>

        <div
          className="relative z-10 grid grid-cols-5 gap-4 sm:gap-6 p-4 bg-white/60 rounded-xl border border-slate-300/60 shadow-inner"
          role="img"
          aria-label={`Sample 5 by 5 grid: the business ranks in the top 3 at ${SAMPLE_TOP3} of 25 points and is outside the top 20 at ${SAMPLE_GRID.length - SAMPLE_RANKED.length}.`}
        >
          {SAMPLE_GRID.map((rank, index) => (
            <div
              key={index}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white ${rankDot(rank)} ${index === 12 ? "ring-offset-2 ring-blue-500" : ""}`}
            >
              {rank ?? "20+"}
            </div>
          ))}
        </div>

        <div className="ads-hero-callouts relative z-20 mt-5 flex flex-wrap justify-center gap-3 text-xs">
          <div className="bg-white/95 rounded-xl px-3 py-2 border border-slate-200/90 shadow-lg flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold">✓</span>
            <span>
              <span className="block font-bold text-slate-800">Top 3 near the business</span>
              <span className="block text-[11px] text-slate-500">Each dot is one search location</span>
            </span>
          </div>
          <div className="bg-[#0b1329]/95 rounded-xl px-3 py-2 border border-slate-700 shadow-xl text-white flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <span>
              <span className="block font-semibold text-rose-400 text-[11px]">Outer-edge gaps</span>
              <span className="block text-[11px] text-slate-300">Outside the top 20 in two corners</span>
            </span>
          </div>
        </div>
      </div>

      <dl className="bg-white border-t border-slate-200 p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div>
          <dt className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Average rank</dt>
          <dd className="text-xl font-extrabold text-blue-600">{SAMPLE_AVERAGE}</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Visibility</dt>
          <dd className="text-xl font-extrabold text-[#0b1329]">{SAMPLE_VISIBILITY}%</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Grid size</dt>
          <dd className="text-xl font-extrabold text-[#0b1329]">5×5</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Locations checked</dt>
          <dd className="text-xl font-extrabold text-emerald-600">{SAMPLE_GRID.length}</dd>
        </div>
      </dl>
      <p className="px-4 pb-3 text-center text-[11px] text-slate-400">Illustrative sample data. Your results depend on your business, keyword and area.</p>
    </div>
  );
}

export function HeroSection() {
  return (
    <section id="hero" className="relative pt-8 pb-12 lg:pt-14 lg:pb-16 overflow-hidden bg-gradient-to-b from-white via-[#f8faff] to-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>Geo-grid Google Maps rank tracking</span>
            </div>

            <h1 className="ads-hero-title text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-[#060c1c] tracking-tight leading-[1.1]">
              Google Maps Rank Tracker That Shows <span className="text-blue-600">Exactly Where You Rank</span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Scan your Google Business Profile across your service area, uncover competitor gaps, and see exactly where customers can find you on Google Maps.
            </p>

            <div className="space-y-3">
              <SignupButton className="w-full sm:w-auto">{PRIMARY_CTA}</SignupButton>
              <p className="flex flex-wrap gap-x-2 gap-y-1 text-sm font-semibold text-slate-600">
                <span className="whitespace-nowrap">No credit card</span>
                <span className="text-slate-300" aria-hidden="true">•</span>
                <span className="whitespace-nowrap">Up to 20 free 5×5 scans</span>
                <span className="text-slate-300" aria-hidden="true">•</span>
                <span className="whitespace-nowrap">Setup in minutes</span>
              </p>
              <p className="text-xs text-slate-500 max-w-md">
                1 credit = 1 location checked. A 5×5 scan checks 25 locations, so 500 free credits cover twenty of them.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <HeroHeatmap />
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- free offer (used near the top and again lower down) ------------ */

const OFFER_ITEMS = [
  "500 free scan credits",
  "Up to 20 free 5×5 scans",
  "Geo-grid Google Maps rank tracking",
  "Competitor results",
  "Ranking heatmaps",
  "No credit card required",
];

const CREDIT_EXAMPLES = [
  { grid: "3×3", points: 9, scans: Math.floor(500 / 9) },
  { grid: "5×5", points: 25, scans: Math.floor(500 / 25) },
  { grid: "7×7", points: 49, scans: Math.floor(500 / 49) },
  { grid: "9×9", points: 81, scans: Math.floor(500 / 81) },
];

function OfferCard({ cta }: { cta: string }) {
  return (
    <div className="relative bg-white rounded-2xl border-2 border-blue-500 shadow-elevated p-6 sm:p-7">
      <div className="text-xs font-extrabold uppercase tracking-widest text-blue-700">Start free</div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-5xl font-black text-[#060c1c] tracking-tight">$0</span>
        <span className="text-base font-semibold text-slate-500">today</span>
      </div>
      <ul className="mt-5 space-y-2.5">
        {OFFER_ITEMS.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
            <CheckIcon className="w-5 h-5 text-emerald-600 mt-px" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <SignupButton size="md" className="mt-6 w-full">{cta}</SignupButton>
    </div>
  );
}

function CreditExplainer() {
  return (
    <div className="space-y-5">
      <SectionLabel tone="emerald">What 500 credits get you</SectionLabel>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-[#060c1c] tracking-tight leading-tight">
        One credit checks one location.
      </h2>
      <p className="text-base text-slate-600 leading-relaxed">
        A geo-grid scan searches Google Maps from every point in the grid. You choose the grid size, and the scan uses one credit per point, so you always know the cost before you run it.
      </p>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <th className="px-4 py-3 font-bold" scope="col">Grid</th>
              <th className="px-4 py-3 font-bold" scope="col">Locations checked</th>
              <th className="px-4 py-3 font-bold text-right" scope="col">Free scans</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {CREDIT_EXAMPLES.map((row) => (
              <tr key={row.grid} className={row.grid === "5×5" ? "bg-blue-50/50" : ""}>
                <td className="px-4 py-3 font-bold text-[#0b1329]">{row.grid}</td>
                <td className="px-4 py-3 text-slate-600">{row.points} credits</td>
                <td className="px-4 py-3 text-right font-bold text-blue-700">{row.scans}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500">Free scans with 500 credits if every scan uses that grid. Grids go up to 21×21.</p>
    </div>
  );
}

export function OfferSection() {
  return (
    <section id="free-offer" className="py-14 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <CreditExplainer />
        <div className="max-w-md w-full md:justify-self-end">
          <OfferCard cta="Start My Free Scan" />
        </div>
      </div>
    </section>
  );
}

/* --- 2. product heatmap ------------------------------------------------ */

export function HeatmapSection() {
  return (
    <section id="features" className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-6">
            <SectionLabel>The GridBeacon heatmap</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#060c1c] tracking-tight leading-tight">
              Every dot is a Google Maps search from a different location.
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              GridBeacon searches your keyword from each point in the grid and records where your business appears. Green is the top 3, blue is 4–10, and amber and red are where customers struggle to find you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                ["bg-emerald-600", "1 – 3", "Google 3-pack"],
                ["bg-blue-600", "4 – 10", "Close to the top"],
                ["bg-amber-500", "11 – 20", "Hard to find"],
                ["bg-rose-600", "21+", "Not visible"],
              ].map(([color, band, label]) => (
                <div key={band} className="p-3 rounded-xl border border-slate-200 bg-white flex items-center gap-2.5">
                  <span className={`w-3.5 h-3.5 rounded-full flex-shrink-0 ${color}`} />
                  <span className="text-xs font-bold text-slate-800">{band}</span>
                  <span className="text-xs text-slate-500">{label}</span>
                </div>
              ))}
            </div>

            <SignupButton size="md" className="w-full sm:w-auto">{SECONDARY_CTA}</SignupButton>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-[#0b1329] rounded-2xl p-2 sm:p-3 shadow-2xl border border-slate-800">
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-slate-300 font-mono text-[11px] ml-2">GridBeacon heatmap · product screenshot</span>
                </div>
                <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded font-mono text-[11px]">5×5 · 3.0 mi</span>
              </div>
              <div className="relative rounded-xl overflow-hidden border border-slate-700/80 mt-2">
                <Image src="/marketing/google-ads/heatmap-5x5.webp" alt="GridBeacon heatmap of a 5 by 5 Google Maps scan across the Dallas suburbs: each pin is the business's rank at that point" className="w-full h-auto object-cover rounded-lg ads-product-image" width={1600} height={780} sizes="(max-width: 1023px) 100vw, 720px" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- 3. why one number is misleading --------------------------------- */

export function ProximitySection() {
  return (
    <section id="why-geo-grid" className="py-16 sm:py-20 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <SectionLabel tone="rose">Why one ranking number misleads</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#060c1c] tracking-tight">
            Your Google Maps rank changes from street to street.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Google Maps results depend on where the customer searches from. A check from one spot can look great while customers a few miles away never see you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-rose-200 shadow-sm space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-700">Checking from one location</div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-2">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Reported rank</span>
              <div className="text-5xl font-black text-[#0b1329]">#3</div>
              <div className="text-xs text-rose-700 font-medium">…but only from where the check ran</div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">One number hides the areas where you are outranked, so it is hard to know where to focus.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-blue-500 shadow-elevated space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700">Checking with a GridBeacon geo-grid</div>
            <div className="p-4 bg-blue-50/40 rounded-xl border border-blue-200">
              <div className="grid grid-cols-5 gap-2 text-center text-xs font-bold">
                {["20+", "16", "9", "5", "18", "7", "2", "1", "3", "8", "6", "1", "1", "2", "12"].map((rank, index) => {
                  const value = rank === "20+" ? 21 : Number(rank);
                  const color = value <= 3 ? "bg-emerald-600 text-white" : value <= 10 ? "bg-blue-600 text-white" : value <= 20 ? "bg-amber-500 text-[#060c1c]" : "bg-rose-600 text-white";
                  return <div key={index} className={`p-1.5 rounded ${color}`}>{rank}</div>;
                })}
              </div>
              <div className="mt-2 text-center text-[11px] text-slate-500">Sample grid</div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">See where you hold the top 3, where you slip, and where competitors take the searches.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- 4. three core benefits ------------------------------------------ */

const BENEFITS = [
  {
    title: "Geo-Grid Rank Tracking",
    body: "See Google Maps rankings from multiple points around your business, from a 3×3 grid up to 21×21.",
    detail: "Heatmap, average rank and visibility for every scan.",
    iconTone: "bg-blue-50 border-blue-100 text-blue-600",
    icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
  },
  {
    title: "Competitor Gap Intelligence",
    body: "See which businesses outrank you at each point and find the areas where you are losing searches.",
    detail: "Competitor results are included with every scan.",
    iconTone: "bg-amber-50 border-amber-100 text-amber-600",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "AI Scan Analysis",
    body: "Turn scan data into clear findings and recommended next steps you can act on or share.",
    detail: "AI reports are on paid plans (100 credits each).",
    iconTone: "bg-indigo-50 border-indigo-100 text-indigo-600",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#060c1c] tracking-tight">
            Everything you need to see and grow your Google Maps visibility.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BENEFITS.map((benefit) => (
            <div key={benefit.title} className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-card space-y-3">
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${benefit.iconTone}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={benefit.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0b1329]">{benefit.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{benefit.body}</p>
              <p className="text-xs font-semibold text-slate-500 pt-2 border-t border-slate-100">{benefit.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 max-w-5xl mx-auto bg-white p-3 rounded-2xl border border-slate-200 shadow-xl">
          <div className="relative rounded-xl overflow-hidden border border-slate-200">
            <Image src="/marketing/google-ads/grid-point-competitors-20260919.webp" alt="GridBeacon heatmap with one grid point selected, listing the businesses Google Maps ranked at that location" className="w-full h-auto object-cover ads-product-image ads-competitor-image" width={1600} height={772} sizes="(max-width: 1023px) 100vw, 960px" loading="lazy" />
          </div>
          <p className="px-2 pt-3 pb-1 text-xs text-slate-500">Product screenshot: select any point to see every business Google Maps showed there, in order.</p>
        </div>
      </div>
    </section>
  );
}

/* --- comparison -------------------------------------------------------- */

const COMPARISON = [
  ["One search location", "Multiple geo-grid locations"],
  ["One ranking number", "Full ranking heatmap"],
  ["Limited competitor context", "Competitor gap analysis"],
  ["Manual interpretation", "AI-powered analysis (paid plans)"],
  ["Basic results", "Downloadable PDF reports"],
  ["Limited geographic insight", "Service-area visibility"],
];

export function ComparisonSection() {
  return (
    <section id="comparison" className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <SectionLabel tone="slate">Traditional rank check vs GridBeacon</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#060c1c] tracking-tight">
            More than a single ranking number.
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          <table className="ads-comparison w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 sm:p-5 font-bold text-slate-500 w-1/2" scope="col">Traditional rank check</th>
                <th className="p-4 sm:p-5 font-extrabold text-blue-600 w-1/2 bg-blue-50/50" scope="col">GridBeacon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {COMPARISON.map(([traditional, gridbeacon]) => (
                <tr key={traditional}>
                  <td className="p-4 sm:p-5 text-slate-600">{traditional}</td>
                  <td className="p-4 sm:p-5 font-semibold text-[#0b1329] bg-blue-50/30">
                    <span className="inline-flex items-start gap-2">
                      <CheckIcon className="w-4 h-4 text-emerald-600 mt-0.5" />
                      <span>{gridbeacon}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* --- 5. how it works --------------------------------------------------- */

const STEPS = [
  ["Add your business", "Add or select your Google Business Profile. No Google account access or passwords needed."],
  ["Choose a keyword and area", "Pick the search customers use, like “plumber near me”, then the grid size and radius."],
  ["Run the grid scan", "See your rankings, competitors, gaps and insights on the heatmap."],
];

export function WorkflowSection() {
  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#060c1c] tracking-tight">
            Your first heatmap in three steps.
          </h2>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map(([title, body], index) => (
            <li key={title} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-3">
              <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-blue-600 text-white font-black">{index + 1}</span>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-700">Step {index + 1}</div>
              <h3 className="text-lg font-bold text-[#0b1329]">{title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center space-y-2">
          <SignupButton className="w-full sm:w-auto">{SECONDARY_CTA}</SignupButton>
          <p className="text-xs text-slate-500">Create your free account first, then add your business and run the scan.</p>
        </div>
      </div>
    </section>
  );
}

/* --- 6. trust ----------------------------------------------------------- */

/*
 * Real customer quotes go here when there are some. Nothing is shown
 * until then -- never invent names, ratings or reviews.
 */
type Testimonial = { quote: string; name: string; role: string };
const TESTIMONIALS: Testimonial[] = [];

const TRUST_POINTS = [
  ["No credit card required", "Sign up and scan with free credits."],
  ["Transparent credit usage", "1 credit per location, shown before you scan."],
  ["Google Maps geo-grid tracking", "Grids from 3×3 up to 21×21."],
  ["AI-powered scan analysis", "Findings and next steps, on paid plans."],
  ["Downloadable reports", "Heatmap reports as PDF to share."],
];

export function TrustSection() {
  return (
    <section id="trust" className="py-14 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-[#060c1c] tracking-tight">
          Built for local SEO professionals &amp; local businesses
        </h2>

        {TESTIMONIALS.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <figure key={testimonial.name} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <blockquote className="text-sm text-slate-700 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 text-xs font-bold text-[#0b1329]">
                  {testimonial.name}
                  <span className="block font-normal text-slate-500">{testimonial.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {TRUST_POINTS.map(([title, body]) => (
            <li key={title} className="flex items-start gap-2.5 p-4 rounded-xl border border-slate-200 bg-slate-50/60">
              <CheckIcon className="w-5 h-5 text-emerald-600 mt-px" />
              <span>
                <span className="block text-sm font-bold text-[#0b1329]">{title}</span>
                <span className="block text-xs text-slate-500 mt-0.5">{body}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* --- 7. free signup offer --------------------------------------------- */

export function SignupOfferSection() {
  return (
    <section id="signup-offer" className="py-16 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#060c1c] tracking-tight leading-tight">
            Try it on your own business, free.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Create an account, add your Google Business Profile and run your first geo-grid scan with free credits. Upgrade only if you want more.
          </p>
        </div>
        <div className="max-w-md w-full md:justify-self-end">
          <OfferCard cta={PRIMARY_CTA} />
        </div>
      </div>
    </section>
  );
}

/* --- 8. FAQ --------------------------------------------------------------- */

const FAQS = [
  [
    "What is a Google Maps geo-grid rank tracker?",
    "Google shows different local results depending on where the search happens. A geo-grid tracker searches Google Maps from a grid of points across your area (for example 5×5 or 9×9) and shows the results as a heatmap: where you are in the top 3 and where you are hard to find.",
  ],
  [
    "How does GridBeacon check Google Maps rankings?",
    "GridBeacon requests Google Maps results for your keyword at each selected point and records your business's position and the competitors returned. Results reflect the location and time of the scan.",
  ],
  [
    "What does the free account include?",
    "New accounts receive 500 free scan credits with no credit card. One credit checks one location, so 500 credits cover twenty 5×5 scans or one 21×21 scan with 59 credits left. The free plan includes one business and three keywords. AI reports require a paid plan and 100 credits per report.",
  ],
  [
    "What happens after I sign up?",
    "You create your account, add your Google Business Profile, choose a keyword and scan area, and run the scan. Results appear on your heatmap when the scan finishes.",
  ],
  [
    "Can I see competitors on the same map?",
    "Yes. Each scan records the businesses Google Maps returned at every point, so you can compare competitors with your own rankings. Viewing saved competitor results does not use more credits.",
  ],
  [
    "Can agencies manage multiple businesses?",
    "Yes, on paid plans: multiple businesses, recurring scheduled scans and team members, plus PDF reports for clients.",
  ],
];

export function FAQSection() {
  return (
    <section id="faq" className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-[#060c1c] tracking-tight mb-10">
          Frequently asked questions
        </h2>
        <div className="space-y-3">
          {FAQS.map(([question, answer]) => (
            <details key={question} className="group bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <summary className="flex min-h-[44px] items-center justify-between gap-4 font-bold text-[#0b1329] cursor-pointer list-none text-base">
                <span>{question}</span>
                <svg className="w-5 h-5 text-slate-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- 9. final CTA ------------------------------------------------------ */

export function FinalCTASection() {
  return (
    <section id="final-cta" className="py-20 sm:py-24 bg-[#060c1c] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-50 pointer-events-none" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Ready to See Your Real Google Maps Visibility?
        </h2>
        <p className="text-lg text-slate-300 leading-relaxed">
          Create your free GridBeacon account and run your first geo-grid ranking scan.
        </p>
        <div className="pt-2">
          <SignupButton className="w-full sm:w-auto">Create Free Account &amp; Run Scan</SignupButton>
        </div>
        <p className="text-sm text-slate-300">500 free credits • No credit card required</p>
      </div>
    </section>
  );
}

/* --- footer ------------------------------------------------------------ */

export function AdsLandingFooter() {
  return (
    <footer className="bg-[#060c1c] text-slate-400 border-t border-[#0b1329] py-10 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="ads-logo">
          <Image src="/branding/gridbeacon-logo-tagline.png" alt="GridBeacon — Google Maps Rank Intelligence" width={1200} height={339} className="ads-logo-image" sizes="240px" />
        </span>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link href="/pricing" className="hover:text-white transition" prefetch={false}>Pricing</Link>
          <Link href="/privacy" className="hover:text-white transition" prefetch={false}>Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition" prefetch={false}>Terms of Service</Link>
        </div>
        <div className="text-slate-500 text-center md:text-right">© 2026 GridBeacon. All rights reserved.</div>
      </div>
    </footer>
  );
}
