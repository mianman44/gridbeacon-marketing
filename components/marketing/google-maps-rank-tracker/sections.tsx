import Image from "next/image";
import Link from "next/link";
import { MobileNavigation } from "./mobile-navigation";

// Server-rendered sections adapted from the supplied code.html reference.
// Mockup numbers are illustrative; product claims follow the local implementation.

export function AdsLandingHeader() {
  return (
<header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

<Link href="/" className="ads-logo" aria-label="GridBeacon home" prefetch={false}><Image src="/branding/gridbeacon-logo-tagline.png" alt="GridBeacon — Google Maps Rank Intelligence" width={1200} height={339} className="ads-logo-image" sizes="240px" loading="eager" /></Link>

<nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600" aria-label="Landing page navigation">
<a href="#features" className="hover:text-blue-600 transition">Features</a>
<a href="#how-it-works" className="hover:text-blue-600 transition">How It Works</a>
<a href="#competitors" className="hover:text-blue-600 transition">Competitor Radar</a>
<a href="#agencies" className="hover:text-blue-600 transition">For Agencies</a>
<Link href="/pricing" className="hover:text-blue-600 transition" prefetch={false}>Pricing</Link>
</nav>

<div className="flex items-center gap-3">
<MobileNavigation />
<Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-[#0b1329] px-3 py-2 transition" prefetch={false}>
          Log In
        </Link>
<Link href="/signup" className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-lg shadow-sm shadow-blue-600/30 transition-all" prefetch={false}>
<span>Start Free</span>
<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
</Link>
</div>
</div>
</header>
  );
}

export function HeroSection() {
  return (
<section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-white via-[#f8faff] to-slate-50 border-b border-slate-200/60">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

<div className="lg:col-span-6 space-y-6">

<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wide shadow-sm">
<span className="w-2 h-2 rounded-full bg-blue-600 "></span>
<span>Google Maps Rank Intelligence</span>
<span className="text-blue-300">•</span>
<span className="text-slate-600 font-normal">Coordinate-Based Rank Tracking</span>
</div>

<h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-[#060c1c] tracking-tight leading-[1.12]">
            See Exactly <span className="text-blue-600 relative inline-block">Where You Rank<svg className="absolute -bottom-1.5 left-0 w-full text-blue-200/70 -z-10" height="8" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 7C20 2 40 2 60 4C80 6 95 3 100 2" stroke="currentColor" strokeWidth="4" fill="none"></path></svg></span> on Google Maps.
          </h1>

<p className="text-lg text-slate-600 leading-relaxed max-w-xl">
            Google Maps rankings change from street to street. GridBeacon scans <strong className="text-[#0b1329] font-semibold">3×3 to 21×21 geo-grids</strong> across your entire service area to reveal where you dominate the local 3-pack and where competitors outrank your business.
          </p>

<div className="pt-2 space-y-3.5">
<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
<Link href="/signup" className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 transition-all group" prefetch={false}>
<span>Start Your Free Scan</span>
<svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</Link>
<a href="#how-it-works" className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300/80 rounded-xl shadow-sm transition">
<svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
<span>See How It Works</span>
</a>
</div>

<div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-semibold text-slate-500 pt-1">
<span className="inline-flex items-center gap-1.5 text-slate-700">
<svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                500 Free Scan Credits
              </span>
<span className="inline-flex items-center gap-1.5 text-slate-700">
<svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                No credit card required
              </span>
<span className="inline-flex items-center gap-1.5 text-slate-700">
<svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                Simple guided setup
              </span>
</div>
</div>
</div>

<div className="lg:col-span-6 relative">

<div className="absolute -inset-4 bg-gradient-to-r from-blue-500/15 via-blue-500/10 to-indigo-500/15 rounded-3xl blur-2xl -z-10 pointer-events-none"></div>

<div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xl shadow-[#0b1329]/10 overflow-hidden ring-1 ring-[#0b1329]/5">

<div className="bg-[#0b1329] px-4 py-3 flex items-center justify-between border-b border-slate-800">
<div className="flex items-center gap-2">
<div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
<div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
<div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
<span className="ml-2 text-xs font-mono text-slate-400">GridBeacon / Austin demo heatmap</span>
</div>
<div className="flex items-center gap-3 text-xs text-slate-300">
<span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
<span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Example Scan
                </span>
</div>
</div>

<div className="bg-slate-50/90 border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
<div className="flex items-center gap-2">
<span className="font-bold text-slate-800 bg-white px-2.5 py-1 rounded border border-slate-200 shadow-2xs">Austin Garage Door Repair</span>
<span className="text-slate-400">|</span>
<span className="text-slate-600 bg-white px-2 py-1 rounded border border-slate-200 font-mono">&quot;garage door repair near me&quot;</span>
</div>
<div className="flex items-center gap-2 font-medium">
<span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">5 × 5 Grid (25 Pts)</span>
<span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">5.0 mi radius</span>
</div>
</div>

<div className="relative p-6 map-base-pattern min-h-[380px] flex items-center justify-center overflow-hidden">

<svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
<path d="M-20 80 Q 150 120 450 60 T 900 140" stroke="#94a3b8" strokeWidth="4" fill="none"></path>
<path d="M120 -20 Q 180 200 240 450" stroke="#cbd5e1" strokeWidth="3" fill="none"></path>
<path d="M380 -20 Q 320 220 360 450" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" fill="none"></path>
<circle cx="280" cy="190" r="140" fill="rgba(37, 99, 235, 0.04)" stroke="rgba(37, 99, 235, 0.25)" strokeDasharray="3 3"></circle>
</svg>

<div className="absolute z-20 flex flex-col items-center pointer-events-none" style={{"top": "calc(50% - 24px)", "left": "calc(50% - 16px)"}}>
<div className="w-8 h-8 rounded-full bg-[#0b1329] border-2 border-white shadow-lg flex items-center justify-center text-white text-xs">
<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
</div>
<span className="mt-1 px-1.5 py-0.5 bg-[#0b1329]/90 text-white text-[10px] font-bold rounded shadow-xs whitespace-nowrap">Your Business HQ</span>
</div>

<div className="relative z-10 grid grid-cols-5 gap-4 sm:gap-6 p-4 bg-white/60 backdrop-blur-2xs rounded-xl border border-slate-300/60 shadow-inner">

<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white">14</div>
<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500 text-[#060c1c] font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white">7</div>
<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500 text-[#060c1c] font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white">5</div>
<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500 text-[#060c1c] font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white">4</div>
<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white">20+</div>

<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500 text-[#060c1c] font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white">6</div>
<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white">2</div>
<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white">1</div>
<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white">3</div>
<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500 text-[#060c1c] font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white">8</div>

<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500 text-[#060c1c] font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white">5</div>
<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white">1</div>
<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white ring-offset-2 ring-blue-500">1</div>
<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white">2</div>
<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500 text-[#060c1c] font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white">9</div>

<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500 text-[#060c1c] font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white">7</div>
<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white">3</div>
<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white">2</div>
<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white">3</div>
<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white">12</div>

<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white">16</div>
<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500 text-[#060c1c] font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white">10</div>
<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500 text-[#060c1c] font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white">6</div>
<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white">11</div>
<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-white">20+</div>
</div>

<div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-slate-200/90 shadow-lg text-xs flex items-center gap-3">
<div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold">
                  ✓
                </div>
<div>
<div className="font-bold text-slate-800">Downtown 3-Pack Winner</div>
<div className="text-[11px] text-slate-500">Example: strong rankings near your location</div>
</div>
</div>

<div className="absolute top-4 right-4 z-20 bg-[#0b1329]/95 backdrop-blur-md rounded-xl p-3 border border-slate-700 shadow-xl text-xs text-white max-w-[190px]">
<div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[11px] mb-0.5">
<span className="w-2 h-2 rounded-full bg-amber-400"></span> Northeast Vulnerability
                </div>
<div className="text-[11px] text-slate-300 leading-tight">Competitor ranks #2 here while you rank #14.</div>
</div>
</div>

<div className="bg-white border-t border-slate-200 p-4 grid grid-cols-3 gap-2 text-center divide-x divide-slate-100">
<div>
<div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Local Visibility</div>
<div className="text-xl font-extrabold text-[#0b1329]">74%</div>
<div className="text-[10px] text-emerald-600 font-bold">↑ +14% vs 30d ago</div>
</div>
<div>
<div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Average Rank</div>
<div className="text-xl font-extrabold text-blue-600">4.6</div>
<div className="text-[10px] text-slate-500">Across 25 GPS Points</div>
</div>
<div>
<div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Top 3 Dominance</div>
<div className="text-xl font-extrabold text-emerald-600">62%</div>
<div className="text-[10px] text-slate-500">Google 3-Pack Area</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
  );
}

export function ValueStrip() {
  return (
<section className="py-8 bg-white border-b border-slate-200/80">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="text-center mb-6">
<p className="text-xs font-bold uppercase tracking-widest text-slate-400">Understand your Google Maps visibility at a glance</p>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

<div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200/60">
<div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600">
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
</div>
<div>
<p className="text-sm font-bold text-[#0b1329]">Geo-Grid Tracking</p>
<p className="text-xs text-slate-500 mt-0.5 leading-relaxed">See rankings across your entire service area from real GPS coordinates.</p>
</div>
</div>

<div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200/60">
<div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 flex-shrink-0 flex items-center justify-center text-amber-600">
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
</div>
<div>
<p className="text-sm font-bold text-[#0b1329]">Competitor Intelligence</p>
<p className="text-xs text-slate-500 mt-0.5 leading-relaxed">Discover exactly where competitors outrank you across your service area.</p>
</div>
</div>

<div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200/60">
<div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex-shrink-0 flex items-center justify-center text-indigo-600">
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
</div>
<div>
<p className="text-sm font-bold text-[#0b1329]">AI Insights</p>
<p className="text-xs text-slate-500 mt-0.5 leading-relaxed">Plain-English summaries that turn raw coordinate numbers into action.</p>
</div>
</div>

<div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200/60">
<div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex-shrink-0 flex items-center justify-center text-emerald-600">
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
</div>
<div>
<p className="text-sm font-bold text-[#0b1329]">Rank History</p>
<p className="text-xs text-slate-500 mt-0.5 leading-relaxed">Track whether your GBP optimization work is actually improving results.</p>
</div>
</div>
</div>
</div>
</section>
  );
}

export function ProximitySection() {
  return (
<section className="py-20 bg-slate-50/70 border-b border-slate-200/70">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

<div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
<div className="inline-block px-3 py-1 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold uppercase tracking-wider">
          The Proximity Illusion
        </div>
<h2 className="text-3xl sm:text-4xl font-extrabold text-[#060c1c] tracking-tight">
          A Single Ranking Position Doesn&apos;t Tell the Whole Story.
        </h2>
<p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Google Maps rankings change dramatically depending on where the customer searches from. Checking your rank from your office desk guarantees blind spots across your entire market.
        </p>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">

<div className="bg-white rounded-2xl p-7 border border-rose-200 shadow-sm flex flex-col justify-between relative overflow-hidden">
<div className="absolute top-0 right-0 px-3 py-1 bg-rose-100 text-rose-800 text-[11px] font-bold rounded-bl-lg">
            Traditional Rank Checker (Blind)
          </div>
<div className="space-y-4 pt-3">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 font-bold">
                ✕
              </div>
<div>
<h3 className="font-bold text-[#0b1329] text-lg">Single-Coordinate Check</h3>
<p className="text-xs text-slate-500">Query evaluated from 1 fixed IP address or zip code</p>
</div>
</div>

<div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-2">
<span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Reported Google Maps Rank</span>
<div className="text-5xl font-black text-[#0b1329]">#3</div>
<div className="inline-flex items-center gap-1.5 text-xs text-rose-700 bg-rose-50 px-2.5 py-1 rounded font-medium border border-rose-200">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                Invisible 2 miles away in north &amp; east suburbs
              </div>
</div>
<p className="text-xs text-slate-500 leading-relaxed">
              Standard tools tell you: <em className="text-slate-700">&quot;Congratulations, you are #3!&quot;</em> But in reality, you might be completely unranked across 80% of your customer base.
            </p>
</div>
<div className="pt-5 mt-6 border-t border-slate-100 text-xs font-semibold text-rose-600 flex items-center gap-2">
<span>Result:</span>
<span className="text-slate-700 font-normal">Looks great on vanity reports — but misses where calls are actually lost.</span>
</div>
</div>

<div className="bg-white rounded-2xl p-7 border-2 border-blue-500 shadow-elevated flex flex-col justify-between relative overflow-hidden">
<div className="absolute top-0 right-0 px-3.5 py-1 bg-blue-600 text-white text-[11px] font-bold rounded-bl-lg">
            GridBeacon Solution
          </div>
<div className="space-y-4 pt-3">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                ✓
              </div>
<div>
<h3 className="font-bold text-[#0b1329] text-lg">Multi-Point Geo-Telemetry</h3>
<p className="text-xs text-slate-500">9 to 441 coordinate checks across your city</p>
</div>
</div>

<div className="p-4 bg-blue-50/40 rounded-xl border border-blue-200">
<div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-3">
<span>Real Geographic Service Area</span>
<span className="text-blue-700 font-mono">Example Grid</span>
</div>
<div className="grid grid-cols-5 gap-2 text-center text-xs font-bold">
<div className="p-1 rounded bg-rose-600 text-white">20+</div>
<div className="p-1 rounded bg-rose-600 text-white">16</div>
<div className="p-1 rounded bg-amber-500 text-[#060c1c]">9</div>
<div className="p-1 rounded bg-amber-500 text-[#060c1c]">5</div>
<div className="p-1 rounded bg-rose-600 text-white">18</div>
<div className="p-1 rounded bg-amber-500 text-[#060c1c]">7</div>
<div className="p-1 rounded bg-emerald-600 text-white">2</div>
<div className="p-1 rounded bg-emerald-600 text-white">1</div>
<div className="p-1 rounded bg-emerald-600 text-white">3</div>
<div className="p-1 rounded bg-amber-500 text-[#060c1c]">8</div>
<div className="p-1 rounded bg-amber-500 text-[#060c1c]">6</div>
<div className="p-1 rounded bg-emerald-600 text-white">1</div>
<div className="p-1 rounded bg-emerald-600 text-white">1</div>
<div className="p-1 rounded bg-emerald-600 text-white">2</div>
<div className="p-1 rounded bg-rose-600 text-white">12</div>
</div>
</div>
<p className="text-xs text-slate-600 leading-relaxed">
              GridBeacon shows the full truth: you dominate downtown (#1-#3), but rank #18 just four miles away where your competitor has stronger visibility.
            </p>
</div>
<div className="pt-5 mt-6 border-t border-slate-100 text-xs font-semibold text-blue-700 flex items-center gap-2">
<span>Result:</span>
<span className="text-slate-800 font-normal">See the complete picture across your market and take targeted action.</span>
</div>
</div>
</div>
</div>
</section>
  );
}

export function HeatmapSection() {
  return (
<section id="features" className="py-20 bg-white border-b border-slate-200/80">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

<div className="lg:col-span-5 space-y-6">
<div className="inline-block px-3 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider">
            Geo-Grid Rank Tracking
          </div>
<h2 className="text-3xl sm:text-4xl font-extrabold text-[#060c1c] tracking-tight leading-tight">
            Turn Google Maps Rankings Into a Visual Heatmap.
          </h2>
<p className="text-slate-600 leading-relaxed text-base">
            Scan a city, neighborhood, or service area from selected coordinates. See exactly where your Google Business Profile ranks #1, where it stays in the local 3-pack, and where customers can&apos;t find you.
          </p>

<div className="space-y-3 pt-2">
<h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Illustrative Rank Bands</h3>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
<div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-start gap-2.5">
<span className="w-3.5 h-3.5 rounded-full bg-emerald-600 mt-0.5 flex-shrink-0"></span>
<div>
<div className="text-xs font-bold text-emerald-950">1 – 3 • Dominant</div>
<div className="text-[11px] text-emerald-800">Top three positions at the scanned coordinate.</div>
</div>
</div>
<div className="p-3 rounded-xl border border-amber-200 bg-amber-50/50 flex items-start gap-2.5">
<span className="w-3.5 h-3.5 rounded-full bg-amber-500 mt-0.5 flex-shrink-0"></span>
<div>
<div className="text-xs font-bold text-amber-950">4 – 10 • Opportunity</div>
<div className="text-[11px] text-amber-800">Below the top three; room to improve.</div>
</div>
</div>
<div className="p-3 rounded-xl border border-orange-200 bg-orange-50/50 flex items-start gap-2.5">
<span className="w-3.5 h-3.5 rounded-full bg-orange-500 mt-0.5 flex-shrink-0"></span>
<div>
<div className="text-xs font-bold text-orange-950">11 – 20 • Weak</div>
<div className="text-[11px] text-orange-800">Lower positions in the scanned results.</div>
</div>
</div>
<div className="p-3 rounded-xl border border-rose-200 bg-rose-50/50 flex items-start gap-2.5">
<span className="w-3.5 h-3.5 rounded-full bg-rose-600 mt-0.5 flex-shrink-0"></span>
<div>
<div className="text-xs font-bold text-rose-950">20+ • Not Visible</div>
<div className="text-[11px] text-rose-800">Outside the top 20 at this coordinate.</div>
</div>
</div>
</div>
</div>

<div className="pt-4">
<Link href="/signup" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-md shadow-blue-600/20 transition" prefetch={false}>
<span>Run Your First Scan</span>
<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</Link>
</div>
</div>

<div className="lg:col-span-7">
<div className="bg-[#0b1329] rounded-2xl p-2 sm:p-3 shadow-2xl border border-slate-800">

<div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 text-xs text-slate-400">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-rose-500"></span>
<span className="w-2 h-2 rounded-full bg-amber-500"></span>
<span className="w-2 h-2 rounded-full bg-emerald-500"></span>
<span className="text-slate-300 font-mono text-[11px] ml-2">GridBeacon Heatmap • Product Preview</span>
</div>
<div className="flex items-center gap-2 text-[11px]">
<span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded font-mono">21×21 • 10.0 mi</span>
</div>
</div>

<div className="relative rounded-xl overflow-hidden border border-slate-700/80 mt-2">
<Image src="/marketing/google-maps-rank-tracker/geo-grid-heatmap.webp" alt="GridBeacon geo-grid heatmap with coordinate rankings" className="w-full h-auto object-cover max-h-[460px] rounded-lg ads-product-image" width={1536} height={1024} sizes="(max-width: 1023px) 100vw, 720px" loading="lazy" />

<div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200/90 shadow-sm text-xs flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-emerald-500"></span>
<span className="font-bold text-slate-800">Local Rank Heatmap</span>
<span className="text-slate-400 font-normal">| 441 Coordinates</span>
</div>

<div className="absolute bottom-3 right-3 bg-[#060c1c]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-white text-[11px] flex items-center gap-3">
<span>Avg Rank: <strong className="text-blue-400 font-mono">10.9</strong></span>
<span>•</span>
<span>Visibility: <strong className="text-emerald-400 font-mono">54%</strong></span>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
  );
}

export function CompetitorSection() {
  return (
<section id="competitors" className="py-20 bg-slate-50/60 border-b border-slate-200/80">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

<div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
<div className="inline-block px-3 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold uppercase tracking-wider">
          Competitor Radar
        </div>
<h2 className="text-3xl sm:text-4xl font-extrabold text-[#060c1c] tracking-tight">
          Find Exactly Where Competitors Are Beating You.
        </h2>
<p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          See where competitors have stronger Google Maps visibility. Compare your geographic rankings head-to-head across the same exact coordinates to locate immediate ranking opportunities.
        </p>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">

<div className="lg:col-span-8 bg-white p-3 rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
<div className="flex items-center justify-between pb-3 px-2 border-b border-slate-100 text-xs">
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-blue-600 flex items-center justify-center text-[8px] text-white font-bold">1</span>
<span className="font-bold text-slate-800">Example Business</span>
<span className="text-slate-400 font-semibold text-[11px] bg-slate-100 px-2 py-0.5 rounded">Austin Garage Door Repair</span>
</div>
<div className="text-slate-400 font-mono text-xs">vs.</div>
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-rose-600 flex items-center justify-center text-[8px] text-white font-bold">2</span>
<span className="font-bold text-slate-800">Top Competitor</span>
<span className="text-slate-400 font-semibold text-[11px] bg-slate-100 px-2 py-0.5 rounded">Precision Overhead Door</span>
</div>
</div>
<div className="mt-3 relative rounded-xl overflow-hidden border border-slate-200">
<Image src="/marketing/google-maps-rank-tracker/competitor-gap.webp" alt="GridBeacon competitor rankings on the same geographic grid" className="w-full h-auto object-cover max-h-[420px] ads-product-image" width={1672} height={941} sizes="(max-width: 1023px) 100vw, 720px" loading="lazy" />

<div className="absolute bottom-4 left-4 bg-[#0b1329]/90 backdrop-blur-md text-white px-3.5 py-2 rounded-xl text-xs border border-slate-700 shadow-lg">
<div className="text-emerald-400 font-bold">+2 to +8 Rank Advantage in Central Metro</div>
<div className="text-slate-300 text-[11px]">Competitor dominates northern perimeter (-4 to -7 gap)</div>
</div>
</div>
</div>

<div className="lg:col-span-4 space-y-4">
<div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-3">
<div className="flex items-center justify-between">
<h3 className="text-sm font-bold text-[#0b1329]">Biggest Ranking Gaps</h3>
<span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Action Required</span>
</div>
<div className="space-y-2.5 pt-1">

<div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
<div>
<div className="font-bold text-slate-800">North Austin</div>
<div className="text-[11px] text-slate-500">Mopac Expy Corridor</div>
</div>
<div className="text-right">
<div className="text-slate-500 font-mono">You: <span className="text-rose-600 font-bold">#11</span></div>
<div className="text-slate-800 font-mono">Rival: <span className="text-emerald-600 font-bold">#2</span></div>
</div>
</div>

<div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
<div>
<div className="font-bold text-slate-800">Pflugerville East</div>
<div className="text-[11px] text-slate-500">FM 685 Radius</div>
</div>
<div className="text-right">
<div className="text-slate-500 font-mono">You: <span className="text-rose-600 font-bold">#8</span></div>
<div className="text-slate-800 font-mono">Rival: <span className="text-emerald-600 font-bold">#1</span></div>
</div>
</div>

<div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
<div>
<div className="font-bold text-slate-800">Round Rock</div>
<div className="text-[11px] text-slate-500">I-35 North Outer Ring</div>
</div>
<div className="text-right">
<div className="text-slate-500 font-mono">You: <span className="text-rose-600 font-bold">#14</span></div>
<div className="text-slate-800 font-mono">Rival: <span className="text-emerald-600 font-bold">#4</span></div>
</div>
</div>
</div>
<div className="pt-2">
<Link href="/signup" className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-[#0b1329] bg-amber-400 hover:bg-amber-300 rounded-xl transition shadow-sm" prefetch={false}>
<span>Find Competitor Gaps Free</span>
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</Link>
</div>
</div>

<div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-blue-950 space-y-1">
<div className="font-bold flex items-center gap-1.5 text-blue-800">
<svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
              Included in Every Scan at $0 Extra
            </div>
<p className="text-blue-800/90 leading-relaxed text-[11px]">
              Review the competitors returned at each scanned coordinate. Comparing saved competitor results does not run another scan.
            </p>
</div>
</div>
</div>
</div>
</section>
  );
}

export function AISection() {
  return (
<section className="py-20 bg-white border-b border-slate-200/80">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

<div className="lg:col-span-5 space-y-6">
<div className="inline-block px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold uppercase tracking-wider">
            GridBeacon AI
          </div>
<h2 className="text-3xl sm:text-4xl font-extrabold text-[#060c1c] tracking-tight leading-tight">
            Turn Raw Coordinate Data Into Clear Action.
          </h2>
<p className="text-slate-600 text-base leading-relaxed">
            Don&apos;t waste hours trying to manually analyze 400 separate grid pins. GridBeacon AI synthesizes geographic movements, flags competitor incursions, and drafts step-by-step local SEO playbooks.
          </p>

<div className="space-y-3 pt-1 text-sm text-slate-700">
<div className="flex items-start gap-3">
<div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">✓</div>
<span><strong className="text-[#0b1329]">Geographic Ranking Analysis:</strong> Highlights stronger and weaker areas in your scan.</span>
</div>
<div className="flex items-start gap-3">
<div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">✓</div>
<span><strong className="text-[#0b1329]">Competitor Analysis:</strong> Summarizes competitors and ranking gaps from scan evidence.</span>
</div>
<div className="flex items-start gap-3">
<div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">✓</div>
<span><strong className="text-[#0b1329]">Prioritized Recommendations:</strong> Evidence-based priorities to guide your next local SEO steps.</span>
</div>
</div>
<div className="pt-3 flex flex-wrap items-center gap-3">
<Link href="/signup" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-sm" prefetch={false}>
<span>Explore AI Reports</span>
<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</Link>
<span className="text-xs text-slate-500">Paid plans · 100 credits per AI report</span>
</div>
</div>

<div className="lg:col-span-7">
<div className="bg-gradient-to-br from-[#0b1329] to-[#060c1c] rounded-2xl p-6 text-white border border-slate-800 shadow-2xl space-y-5">

<div className="flex items-center justify-between pb-4 border-b border-slate-800">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-400">
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
</div>
<div>
<div className="text-sm font-bold text-white">AI Local Visibility Report • Example</div>
<div className="text-xs text-slate-400 font-mono">Austin Service Radius • garage door repair</div>
</div>
</div>
<span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                +14% Visibility Gain
              </span>
</div>

<div className="space-y-3 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 text-xs">
<div className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Executive Diagnosis
              </div>
<p className="text-slate-300 leading-relaxed">
                Your business retains complete <span className="text-emerald-400 font-bold">#1–#3 dominance</span> within a 2.8-mile core. However, proximity decay accelerates sharply northeast of Hwy 183 where rival <em className="text-amber-300">Precision Overhead</em> captured positions #2–#4.
              </p>
</div>

<div className="space-y-2">
<div className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Prioritized Action Plan</div>
<div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50 flex items-start gap-3 text-xs">
<span className="w-5 h-5 rounded bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">01</span>
<div>
<div className="font-bold text-slate-200">Review Your Northeast Ranking Gaps</div>
<div className="text-slate-400 text-[11px] mt-0.5">Compare the weaker coordinates and check nearby competitor profiles.</div>
</div>
</div>
<div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50 flex items-start gap-3 text-xs">
<span className="w-5 h-5 rounded bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">02</span>
<div>
<div className="font-bold text-slate-200">Review Your Business Profile Information</div>
<div className="text-slate-400 text-[11px] mt-0.5">Check your service details and compare your next scan with this baseline.</div>
</div>
</div>
</div>

<div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
<span>Illustrative report • Results vary</span>
<Link className="text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center gap-1" href="/signup" prefetch={false}>
<span>Explore AI Reports</span>
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
</Link>
</div>
</div>
</div>
</div>
</div>
</section>
  );
}

export function HistorySection() {
  return (
<section className="py-20 bg-slate-50/70 border-b border-slate-200/80">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

<div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
<div className="inline-block px-3 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
          Rank History &amp; ROI Proof
        </div>
<h2 className="text-3xl sm:text-4xl font-extrabold text-[#060c1c] tracking-tight">
          Know Whether Your Local SEO Is Actually Working.
        </h2>
<p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Compare saved scans over time. Show clients and stakeholders how visibility changes alongside your local SEO work. Example results below illustrate a comparison, not a guaranteed outcome.
        </p>
</div>

<div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl max-w-5xl mx-auto space-y-8">

<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-slate-100 text-center">
<div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
<span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overall Visibility</span>
<div className="flex items-center justify-center gap-2 mt-1">
<span className="text-lg font-bold text-slate-400 line-through">48%</span>
<span className="text-2xl font-black text-emerald-600">72%</span>
</div>
<span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">+24 percentage points</span>
</div>
<div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
<span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Average Position</span>
<div className="flex items-center justify-center gap-2 mt-1">
<span className="text-lg font-bold text-slate-400 line-through">9.4</span>
<span className="text-2xl font-black text-blue-600">5.1</span>
</div>
<span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">↑ +4.3 Spots Gained</span>
</div>
<div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
<span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Top 3 Dominance</span>
<div className="flex items-center justify-center gap-2 mt-1">
<span className="text-lg font-bold text-slate-400 line-through">22%</span>
<span className="text-2xl font-black text-emerald-600">51%</span>
</div>
<span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">+29 percentage points</span>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

<div className="space-y-3">
<div className="flex items-center justify-between text-xs font-bold">
<span className="text-rose-700 bg-rose-50 px-2.5 py-1 rounded border border-rose-200">Day 1 • Baseline Scan</span>
<span className="text-slate-500 font-mono">Aug 12</span>
</div>
<div className="p-4 rounded-xl bg-rose-50/30 border border-rose-200/80">
<div className="grid grid-cols-5 gap-2 text-center text-xs font-bold">
<div className="p-2 rounded bg-rose-600 text-white">20+</div>
<div className="p-2 rounded bg-rose-600 text-white">18</div>
<div className="p-2 rounded bg-amber-500 text-[#060c1c]">10</div>
<div className="p-2 rounded bg-rose-600 text-white">14</div>
<div className="p-2 rounded bg-rose-600 text-white">20+</div>
<div className="p-2 rounded bg-rose-600 text-white">17</div>
<div className="p-2 rounded bg-amber-500 text-[#060c1c]">8</div>
<div className="p-2 rounded bg-emerald-600 text-white">3</div>
<div className="p-2 rounded bg-amber-500 text-[#060c1c]">9</div>
<div className="p-2 rounded bg-rose-600 text-white">16</div>
<div className="p-2 rounded bg-rose-600 text-white">15</div>
<div className="p-2 rounded bg-emerald-600 text-white">2</div>
<div className="p-2 rounded bg-emerald-600 text-white">1</div>
<div className="p-2 rounded bg-amber-500 text-[#060c1c]">7</div>
<div className="p-2 rounded bg-rose-600 text-white">19</div>
</div>
<p className="text-center text-xs text-rose-700 font-medium mt-3">High proximity blackout beyond 1.2 miles</p>
</div>
</div>

<div className="space-y-3">
<div className="flex items-center justify-between text-xs font-bold">
<span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">Day 30 • Post-Optimization</span>
<span className="text-slate-500 font-mono">Sep 11</span>
</div>
<div className="p-4 rounded-xl bg-emerald-50/30 border border-emerald-200/80">
<div className="grid grid-cols-5 gap-2 text-center text-xs font-bold">
<div className="p-2 rounded bg-amber-500 text-[#060c1c]">6</div>
<div className="p-2 rounded bg-emerald-600 text-white">3</div>
<div className="p-2 rounded bg-emerald-600 text-white">2</div>
<div className="p-2 rounded bg-emerald-600 text-white">3</div>
<div className="p-2 rounded bg-amber-500 text-[#060c1c]">7</div>
<div className="p-2 rounded bg-emerald-600 text-white">3</div>
<div className="p-2 rounded bg-emerald-600 text-white">1</div>
<div className="p-2 rounded bg-emerald-600 text-white">1</div>
<div className="p-2 rounded bg-emerald-600 text-white">1</div>
<div className="p-2 rounded bg-emerald-600 text-white">2</div>
<div className="p-2 rounded bg-amber-500 text-[#060c1c]">4</div>
<div className="p-2 rounded bg-emerald-600 text-white">1</div>
<div className="p-2 rounded bg-emerald-600 text-white">1</div>
<div className="p-2 rounded bg-emerald-600 text-white">1</div>
<div className="p-2 rounded bg-amber-500 text-[#060c1c]">5</div>
</div>
<p className="text-center text-xs text-emerald-700 font-medium mt-3">Expanded 3-Pack capture across 4.8-mile radius</p>
</div>
</div>
</div>
</div>
</div>
</section>
  );
}

export function AgencySection() {
  return (
<section id="agencies" className="py-20 bg-[#0b1329] text-white relative overflow-hidden">

<div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none"></div>
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

<div className="lg:col-span-5 space-y-6">
<div className="inline-block px-3 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
            Built for Local SEO Agencies
          </div>
<h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Track Every Client From One Unified Workspace.
          </h2>
<p className="text-slate-300 text-base leading-relaxed">
            Organize client locations, schedule recurring keyword scans, and export ranking reports from one workspace. Multiple businesses, team access and AI reports require a paid plan.
          </p>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
<div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
<div className="text-sm font-bold text-white mb-1">PDF Reports</div>
<div className="text-xs text-slate-400 leading-relaxed">Export scan results and AI reports for client discussions.</div>
</div>
<div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
<div className="text-sm font-bold text-white mb-1">Saved Scan History</div>
<div className="text-xs text-slate-400 leading-relaxed">Revisit past scans and compare ranking changes over time.</div>
</div>
<div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
<div className="text-sm font-bold text-white mb-1">Recurring Scan Scheduling</div>
<div className="text-xs text-slate-400 leading-relaxed">Schedule keyword scans to monitor visibility on a recurring basis.</div>
</div>
<div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
<div className="text-sm font-bold text-white mb-1">Workspace Team Members</div>
<div className="text-xs text-slate-400 leading-relaxed">Invite team members with supported workspace roles on paid plans.</div>
</div>
</div>
<div className="pt-4">
<Link href="/signup" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-[#0b1329] bg-blue-400 hover:bg-blue-300 rounded-xl transition shadow-lg shadow-blue-400/20" prefetch={false}>
<span>Start Your Agency Workspace</span>
<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</Link>
</div>
</div>

<div className="lg:col-span-7">
<div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 shadow-2xl space-y-3">
<div className="flex items-center justify-between px-2 pb-2 border-b border-slate-700 text-xs">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
<span className="font-bold text-white">Agency Client Roster • Example</span>
</div>
<span className="text-slate-400 font-mono text-[11px]">Latest scan: 2 hrs ago</span>
</div>

<div className="space-y-2 text-xs">

<div className="p-3 rounded-xl bg-[#0b1329]/90 border border-slate-700/80 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 font-bold flex items-center justify-center">AG</div>
<div>
<div className="font-bold text-white">Austin Garage Door Repair</div>
<div className="text-[11px] text-slate-400">17 Keywords • 5x5 Grid</div>
</div>
</div>
<div className="flex items-center gap-4">
<div className="text-right">
<div className="text-emerald-400 font-bold">74% Visibility</div>
<div className="text-[10px] text-slate-400">Avg #4.6</div>
</div>
<span className="px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">Preview</span>
</div>
</div>

<div className="p-3 rounded-xl bg-[#0b1329]/90 border border-slate-700/80 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center">DR</div>
<div>
<div className="font-bold text-white">Dallas Roofing Experts</div>
<div className="text-[11px] text-slate-400">24 Keywords • 9x9 Grid</div>
</div>
</div>
<div className="flex items-center gap-4">
<div className="text-right">
<div className="text-emerald-400 font-bold">88% Visibility</div>
<div className="text-[10px] text-slate-400">Avg #2.8</div>
</div>
<span className="px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">Preview</span>
</div>
</div>

<div className="p-3 rounded-xl bg-[#0b1329]/90 border border-slate-700/80 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center">MD</div>
<div>
<div className="font-bold text-white">Miami Dental Studio</div>
<div className="text-[11px] text-slate-400">12 Keywords • 5x5 Grid</div>
</div>
</div>
<div className="flex items-center gap-4">
<div className="text-right">
<div className="text-amber-400 font-bold">58% Visibility</div>
<div className="text-[10px] text-slate-400">Avg #6.4</div>
</div>
<span className="px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">Preview</span>
</div>
</div>

<div className="p-3 rounded-xl bg-[#0b1329]/90 border border-slate-700/80 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center">CH</div>
<div>
<div className="font-bold text-white">Chicago HVAC Pros</div>
<div className="text-[11px] text-slate-400">31 Keywords • 13x13 Grid</div>
</div>
</div>
<div className="flex items-center gap-4">
<div className="text-right">
<div className="text-emerald-400 font-bold">91% Visibility</div>
<div className="text-[10px] text-slate-400">Avg #1.9</div>
</div>
<span className="px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">Preview</span>
</div>
</div>
</div>

<div className="pt-2 text-center text-slate-400 text-[11px]">
              Showing 4 of 24 client profiles • Instant search across Google Business Profiles
            </div>
</div>
</div>
</div>
</div>
</section>
  );
}

export function WorkflowSection() {
  return (
<section id="how-it-works" className="py-20 bg-white border-b border-slate-200/80">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
<div className="inline-block px-3 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider">
          Frictionless Setup
        </div>
<h2 className="text-3xl sm:text-4xl font-extrabold text-[#060c1c] tracking-tight">
          From Business Search to Ranking Intelligence in Minutes.
        </h2>
<p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          No complicated API setups, browser extensions, or proxy configurations required. Connect directly to Google Maps ranking data in four simple steps.
        </p>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">

<div className="bg-[#f8faff] rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col justify-between relative group hover:border-blue-300 transition">
<div className="space-y-3">
<span className="text-3xl font-black text-blue-600/30 group-hover:text-blue-600 transition">01</span>
<h3 className="text-base font-bold text-[#0b1329]">Find Your Business</h3>
<p className="text-xs text-slate-500 leading-relaxed">
              Search for your exact Google Business Profile name. No Google Account authorization or passwords needed.
            </p>
</div>
<div className="mt-6 pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-blue-700 flex items-center gap-1">
<span>Instant GBP Autocomplete</span>
</div>
</div>

<div className="bg-[#f8faff] rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col justify-between relative group hover:border-blue-300 transition">
<div className="space-y-3">
<span className="text-3xl font-black text-blue-600/30 group-hover:text-blue-600 transition">02</span>
<h3 className="text-base font-bold text-[#0b1329]">Choose a Keyword</h3>
<p className="text-xs text-slate-500 leading-relaxed">
              Enter target search phrases like <em className="text-slate-700">&quot;emergency plumber&quot;</em> or <em className="text-slate-700">&quot;garage door repair near me&quot;</em>.
            </p>
</div>
<div className="mt-6 pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-blue-700 flex items-center gap-1">
<span>Track Your Target Keywords</span>
</div>
</div>

<div className="bg-[#f8faff] rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col justify-between relative group hover:border-blue-300 transition">
<div className="space-y-3">
<span className="text-3xl font-black text-blue-600/30 group-hover:text-blue-600 transition">03</span>
<h3 className="text-base font-bold text-[#0b1329]">Run Geo-Grid Scan</h3>
<p className="text-xs text-slate-500 leading-relaxed">
              Select your grid matrix (3×3 to 21×21) and radius. GridBeacon checks rankings at the selected coordinates.
            </p>
</div>
<div className="mt-6 pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-blue-700 flex items-center gap-1">
<span>Coordinate-Based Ranking Checks</span>
</div>
</div>

<div className="bg-[#f8faff] rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col justify-between relative group hover:border-blue-300 transition">
<div className="space-y-3">
<span className="text-3xl font-black text-blue-600/30 group-hover:text-blue-600 transition">04</span>
<h3 className="text-base font-bold text-[#0b1329]">Analyze Results</h3>
<p className="text-xs text-slate-500 leading-relaxed">
              Instantly inspect ranking gaps, competitor dominance, and trigger plain-English AI action plans.
            </p>
</div>
<div className="mt-6 pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-blue-700 flex items-center gap-1">
<span>1-Click PDF Report Export</span>
</div>
</div>
</div>
</div>
</section>
  );
}

export function AudienceSection() {
  return (
<section className="py-20 bg-slate-50/70 border-b border-slate-200/80">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
<h2 className="text-3xl sm:text-4xl font-extrabold text-[#060c1c] tracking-tight">
          Built for Anyone Serious About Google Maps Visibility.
        </h2>
<p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          From single service contractors to 50-person local SEO agencies and national franchise networks.
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">

<div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-card space-y-4">
<div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
</div>
<h3 className="text-xl font-bold text-[#0b1329]">Local Businesses</h3>
<p className="text-xs text-slate-600 leading-relaxed">
            See exactly where nearby customers can — and cannot — find your business. Stop wasting ad spend on areas where you already dominate organically.
          </p>
<div className="pt-2 text-xs font-semibold text-slate-500 space-y-1.5 border-t border-slate-100">
<div className="text-slate-400 font-normal uppercase text-[10px] tracking-wider">Perfect For:</div>
<div className="text-slate-700">Garage Door Companies • Plumbers • Roofers • HVAC • Dentists • Law Firms</div>
</div>
</div>

<div className="bg-white rounded-2xl p-7 border-2 border-blue-500 shadow-elevated space-y-4 relative">
<span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-extrabold uppercase">For Agencies</span>
<div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
</div>
<h3 className="text-xl font-bold text-[#0b1329]">SEO Agencies &amp; Pros</h3>
<p className="text-xs text-slate-600 leading-relaxed">
            Show prospects visual ranking gaps and help clients understand their local visibility with scan results and PDF reports.
          </p>
<div className="pt-2 text-xs font-semibold text-slate-500 space-y-1.5 border-t border-slate-100">
<div className="text-slate-400 font-normal uppercase text-[10px] tracking-wider">Key Benefits:</div>
<div className="text-slate-700">PDF Reports • Client Businesses • Team Members • Scheduled Scans</div>
</div>
</div>

<div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-card space-y-4">
<div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
</div>
<h3 className="text-xl font-bold text-[#0b1329]">Multi-Location Brands</h3>
<p className="text-xs text-slate-600 leading-relaxed">
            Monitor Google Maps visibility across your business locations on a paid plan. Review each location and identify areas with weaker rankings.
          </p>
<div className="pt-2 text-xs font-semibold text-slate-500 space-y-1.5 border-t border-slate-100">
<div className="text-slate-400 font-normal uppercase text-[10px] tracking-wider">Key Benefits:</div>
<div className="text-slate-700">Multiple Locations • Keyword Tracking • Saved Scan History</div>
</div>
</div>
</div>
</div>
</section>
  );
}

export function ComparisonSection() {
  return (
<section className="py-20 bg-white border-b border-slate-200/80">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
<div className="inline-block px-3 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold uppercase tracking-wider">
          Feature Comparison
        </div>
<h2 className="text-3xl sm:text-4xl font-extrabold text-[#060c1c] tracking-tight">
          More Than Just a Ranking Number.
        </h2>
<p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Compare a single-point check with a geographic view of your rankings. Basic checker capabilities vary by provider.
        </p>
</div>

<div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
<table className="w-full text-left border-collapse text-xs sm:text-sm">
<thead>
<tr className="bg-slate-50 border-b border-slate-200">
<th className="p-4 sm:p-5 font-bold text-[#0b1329] w-1/2" scope="col">Capability</th>
<th className="p-4 sm:p-5 font-bold text-slate-500 w-1/4 text-center" scope="col">Basic Rank Checker</th>
<th className="p-4 sm:p-5 font-extrabold text-blue-600 w-1/4 text-center bg-blue-50/50" scope="col">GridBeacon</th>
</tr>
</thead>
<tbody className="divide-y divide-slate-100">

<tr className="hover:bg-slate-50/60 transition">
<td className="p-4 sm:p-5 font-semibold text-slate-800">
<div>Single location check</div>
<div className="text-slate-400 font-normal text-xs">Track rankings for one business location</div>
</td>
<td className="p-4 sm:p-5 text-center text-slate-700 font-semibold">Yes</td>
<td className="p-4 sm:p-5 text-center font-bold text-blue-700 bg-blue-50/30">Yes</td>
</tr>

<tr className="hover:bg-slate-50/60 transition">
<td className="p-4 sm:p-5 font-semibold text-slate-800">
<div>Geo-grid visibility (3x3 to 21x21)</div>
<div className="text-slate-400 font-normal text-xs">Rankings across selected geographic coordinates</div>
</td>
<td className="p-4 sm:p-5 text-center text-rose-500 font-bold">No</td>
<td className="p-4 sm:p-5 text-center font-bold text-blue-700 bg-blue-50/30">
<span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  Yes (Up to 441 Pts)
                </span>
</td>
</tr>

<tr className="hover:bg-slate-50/60 transition">
<td className="p-4 sm:p-5 font-semibold text-slate-800">
<div>Competitor gap analysis</div>
<div className="text-slate-400 font-normal text-xs">Side-by-side coordinate comparison at zero extra cost</div>
</td>
<td className="p-4 sm:p-5 text-center text-rose-500 font-bold">No</td>
<td className="p-4 sm:p-5 text-center font-bold text-emerald-600 bg-blue-50/30">Included Free</td>
</tr>

<tr className="hover:bg-slate-50/60 transition">
<td className="p-4 sm:p-5 font-semibold text-slate-800">
<div>Historical scan comparison</div>
<div className="text-slate-400 font-normal text-xs">Compare saved rankings and visibility over time</div>
</td>
<td className="p-4 sm:p-5 text-center text-slate-500">Limited / Graph Only</td>
<td className="p-4 sm:p-5 text-center font-bold text-emerald-600 bg-blue-50/30">Saved Scan Comparison</td>
</tr>

<tr className="hover:bg-slate-50/60 transition">
<td className="p-4 sm:p-5 font-semibold text-slate-800">
<div>AI ranking insights &amp; playbooks</div>
<div className="text-slate-400 font-normal text-xs">Plain-English executive summaries and prioritized tasks</div>
</td>
<td className="p-4 sm:p-5 text-center text-rose-500 font-bold">No</td>
<td className="p-4 sm:p-5 text-center font-bold text-emerald-600 bg-blue-50/30">Paid plans · 100 credits</td>
</tr>

<tr className="hover:bg-slate-50/60 transition">
<td className="p-4 sm:p-5 font-semibold text-slate-800">
<div>Professional PDF reports</div>
<div className="text-slate-400 font-normal text-xs">Export scan results and AI reports</div>
</td>
<td className="p-4 sm:p-5 text-center text-slate-500">Varies by provider</td>
<td className="p-4 sm:p-5 text-center font-bold text-emerald-600 bg-blue-50/30">PDF Export</td>
</tr>

<tr className="hover:bg-slate-50/60 transition">
<td className="p-4 sm:p-5 font-semibold text-slate-800">
<div>Multi-business workspace</div>
<div className="text-slate-400 font-normal text-xs">Organize and switch between client businesses</div>
</td>
<td className="p-4 sm:p-5 text-center text-slate-500">Separate Accounts</td>
<td className="p-4 sm:p-5 text-center font-bold text-emerald-600 bg-blue-50/30">Paid-Plan Workspace</td>
</tr>
</tbody>
</table>
</div>
</div>
</section>
  );
}

export function FAQSection() {
  return (
<section className="py-20 bg-slate-50/60 border-b border-slate-200/80">
<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="text-center space-y-3 mb-16">
<h2 className="text-3xl sm:text-4xl font-extrabold text-[#060c1c] tracking-tight">
          Frequently Asked Questions.
        </h2>
<p className="text-base sm:text-lg text-slate-600">
          Everything you need to know about Google Maps geo-grid scans, credits, and setup.
        </p>
</div>

<div className="space-y-4">

<details className="group bg-white rounded-2xl p-5 border border-slate-200 shadow-sm [&_svg]:open:-rotate-180 transition">
<summary className="flex items-center justify-between font-bold text-[#0b1329] cursor-pointer list-none text-base">
<span>What is a Google Maps geo-grid rank tracker?</span>
<svg className="w-5 h-5 text-slate-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
</summary>
<p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
            Google displays entirely different local search results based on the exact physical GPS coordinate of the phone or laptop searching. A geo-grid tracker samples Google Maps searches from an organized matrix of coordinates (such as a 5×5 or 9×9 grid) across your city, providing a visual heatmap showing where you hold the top 3-pack and where you are invisible.
          </p>
</details>

<details className="group bg-white rounded-2xl p-5 border border-slate-200 shadow-sm [&_svg]:open:-rotate-180 transition">
<summary className="flex items-center justify-between font-bold text-[#0b1329] cursor-pointer list-none text-base">
<span>How does GridBeacon check Google Maps rankings?</span>
<svg className="w-5 h-5 text-slate-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
</summary>
<p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">GridBeacon requests Google Maps results for your keyword at each selected coordinate and records your business position and the returned competitors. Results reflect the location and time of the scan.</p>
</details>

<details className="group bg-white rounded-2xl p-5 border border-slate-200 shadow-sm [&_svg]:open:-rotate-180 transition">
<summary className="flex items-center justify-between font-bold text-[#0b1329] cursor-pointer list-none text-base">
<span>Why do Google Maps rankings change by location?</span>
<svg className="w-5 h-5 text-slate-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
</summary>
<p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">Google Maps rankings depend in part on the search location. A business can rank highly near its address and lower farther away as nearby competitors and other relevance factors affect the results.</p>
</details>

<details className="group bg-white rounded-2xl p-5 border border-slate-200 shadow-sm [&_svg]:open:-rotate-180 transition">
<summary className="flex items-center justify-between font-bold text-[#0b1329] cursor-pointer list-none text-base">
<span>Can I track competitors on the same map?</span>
<svg className="w-5 h-5 text-slate-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
</summary>
<p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">Yes. You can inspect competitors returned in your scan and compare their rankings against your business at the same coordinates. Viewing saved competitor results does not consume additional scan credits.</p>
</details>

<details className="group bg-white rounded-2xl p-5 border border-slate-200 shadow-sm [&_svg]:open:-rotate-180 transition">
<summary className="flex items-center justify-between font-bold text-[#0b1329] cursor-pointer list-none text-base">
<span>Can SEO agencies manage multiple businesses and clients?</span>
<svg className="w-5 h-5 text-slate-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
</summary>
<p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">Yes. Paid workspaces support multiple businesses, recurring keyword scans and team members. Scan and AI-report PDF exports support client reporting; AI reports require a paid plan and credits.</p>
</details>

<details className="group bg-white rounded-2xl p-5 border border-slate-200 shadow-sm [&_svg]:open:-rotate-180 transition">
<summary className="flex items-center justify-between font-bold text-[#0b1329] cursor-pointer list-none text-base">
<span>Can I try GridBeacon for free?</span>
<svg className="w-5 h-5 text-slate-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
</summary>
<p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">Yes. New accounts receive 500 free scan credits, with no credit card required. The free plan includes one business and three keywords. At one credit per grid point, 500 credits cover twenty 5×5 scans or one 21×21 scan with 59 credits left. AI reports require a paid plan and 100 credits per report.</p>
</details>
</div>
</div>
</section>
  );
}

export function FinalCTASection() {
  return (
<section id="scan-cta" className="py-24 bg-[#060c1c] text-white relative overflow-hidden border-t border-slate-800">

<div className="absolute inset-0 bg-grid-dark opacity-50 pointer-events-none"></div>
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">

<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
<span className="w-2 h-2 rounded-full bg-blue-400 "></span>
<span>Google Maps Rank Intelligence</span>
</div>

<h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
        Stop Guessing Where You Rank on Google Maps.
      </h2>
<p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
        See your real local visibility, uncover competitor gaps, and start making data-backed local SEO decisions today.
      </p>

<div className="max-w-xl mx-auto space-y-4 pt-2">
<form className="flex flex-col sm:flex-row items-stretch gap-2.5 bg-[#0b1329]/90 p-2 rounded-2xl border border-slate-700/80 shadow-2xl backdrop-blur-md" action="/signup" method="get" aria-describedby="signup-context-note">
<input type="text" placeholder="Enter your Google Business Profile name..." className="flex-1 px-4 py-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required id="landing-business-name" aria-label="Google Business Profile name" maxLength={200} />
<button type="submit" className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95">
<span>Run Your First Scan Free</span>
<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</button>
</form><p id="signup-context-note" className="text-xs text-slate-300 leading-relaxed">Create your free account to continue. Select your business and scan settings after signup.</p>

<div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-2 font-medium">
<span className="flex items-center gap-1.5 text-slate-300">
<svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
            500 Free Scan Credits Included
          </span>
<span className="flex items-center gap-1.5 text-slate-300">
<svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
            No credit card required
          </span>
<span className="flex items-center gap-1.5 text-slate-300">
<svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
            Simple guided setup
          </span>
</div>
</div>
</div>
</section>
  );
}

export function AdsLandingFooter() {
  return (
<footer className="bg-[#060c1c] text-slate-400 border-t border-[#0b1329] py-12 text-xs">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex flex-col md:flex-row items-center justify-between gap-6">

<div className="flex items-center gap-3"><Link href="/" className="ads-logo" aria-label="GridBeacon home" prefetch={false}><Image src="/branding/gridbeacon-logo-tagline.png" alt="GridBeacon — Google Maps Rank Intelligence" width={1200} height={339} className="ads-logo-image" sizes="240px" /></Link></div>

<div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
<a href="#features" className="hover:text-white transition">Features</a>
<a href="#how-it-works" className="hover:text-white transition">How It Works</a>
<a href="#agencies" className="hover:text-white transition">Agencies</a>
<a href="#competitors" className="hover:text-white transition">Competitor Radar</a>
<Link href="/pricing" className="hover:text-white transition" prefetch={false}>Pricing</Link>
<Link href="/privacy" className="hover:text-white transition" prefetch={false}>Privacy Policy</Link>
<Link href="/terms" className="hover:text-white transition" prefetch={false}>Terms of Service</Link>
</div>

<div className="text-slate-500 text-center md:text-right">
          © 2026 GridBeacon. All rights reserved.
        </div>
</div>
</div>
</footer>
  );
}




