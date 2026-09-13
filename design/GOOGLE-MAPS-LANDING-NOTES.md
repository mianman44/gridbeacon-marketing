# Google Maps rank tracker landing page

Implemented locally on 13 September 2026 and deployed to gridbeaconhq.com on 14 September 2026. No backend changes, account creation or scans were performed.

## Route and scope

- Local preview: http://127.0.0.1:3001/google-maps-rank-tracker
- Canonical: https://gridbeaconhq.com/google-maps-rank-tracker
- Existing `marketing` app: Next.js 16.2.12, React 19.2.4, App Router, Tailwind 4.
- Port 3000 belongs to the existing product stack; marketing preview uses 3001.
- Marketing git status was clean before implementation.
- Homepage, dashboard, authentication, API, scanner, billing and database files were not modified.
- All 15 reference blocks are retained: header, 13 main sections, footer.
- The page uses server-rendered JSX, with a small client component only for closing the mobile navigation on selection or Escape. FAQs and the signup fallback use native HTML behavior.
- No packages, analytics integrations, remote fonts or CDN scripts were added.

## Files created

- `app/google-maps-rank-tracker/page.tsx`: route, scoped local font, metadata and SoftwareApplication JSON-LD.
- `components/marketing/google-maps-rank-tracker/sections.tsx`: the 15 reference sections as React components.
- `components/marketing/google-maps-rank-tracker/mobile-navigation.tsx`: compact accessible mobile section menu.
- `components/marketing/google-maps-rank-tracker/landing.css`: scoped reference palette, patterns, shadows, responsive corrections and focus styles.
- `public/marketing/google-maps-rank-tracker/geo-grid-heatmap.webp`: optimized existing product screenshot, 1536 × 1024, 244,976 bytes.
- `public/marketing/google-maps-rank-tracker/competitor-gap.webp`: optimized existing competitor screenshot, 1672 × 941, 239,912 bytes.
- `design/GOOGLE-MAPS-LANDING-NOTES.md`: this report.

## Files modified

- `app/sitemap.ts`: added the new canonical route.

## Existing assets and infrastructure reused

- Official `public/branding/gridbeacon-logo-tagline.png` in header (200 px wide, 140 px on phones) and footer (226 px), the same logo as the rest of the marketing site.
- Existing Plus Jakarta Sans files `public/features-assets/font-1.ttf` through `font-5.ttf`, loaded with `next/font/local` only for this route.
- Existing screenshots `public/screenshots/heatmap-hero-20260908.png` and `competitor-insights-20260908.png`, optimized into the new asset directory.
- Existing root layout, query provider, Tailwind build, metadata conventions, Next Image and Next Link.
- Existing `/signup`, `/login`, `/pricing`, `/privacy` and `/terms` routes.
- Existing shared button/card/header/footer components were inspected. Their layouts differ from the supplied reference, so the dedicated page preserves the reference markup and styling instead of importing those components.

## CTA destinations

| Control | Destination |
| --- | --- |
| Start Free | `/signup` |
| Start Your Free Scan | `/signup` |
| Run Your First Scan | `/signup` |
| Find Competitor Gaps Free | `/signup` |
| Explore AI Reports, including report preview link | `/signup` |
| Start Your Agency Workspace | `/signup` |
| Final Run Your First Scan Free form | `/signup` through native GET navigation |
| Log In | `/login` |
| See How It Works | `#how-it-works` |
| Features, Competitor Radar, For Agencies | `#features`, `#competitors`, `#agencies` |
| Pricing | `/pricing` |
| Footer legal links | `/privacy`, `/terms` |
| Official logos | `/` |

The existing signup form does not accept a business-name context. The final form uses the explicitly permitted signup fallback: it requires a name, then opens signup without sending that name to an API or placing it in the URL. Its explanatory text tells visitors to select their business and scan settings after signup. No second business-search or scanner backend was introduced.

## Product claim corrections

| Prototype claim | Final treatment and evidence |
| --- | --- |
| 500 free signup credits | Retained. `backend/app/services/plan_entitlements.py` sets 500, and the local signup-credit configuration is also 500. |
| 3×3 to 21×21 grids | Retained. `backend/app/services/scan_options.py` allows odd grid sizes from 3 through 21. |
| Free AI reports | Changed to Explore AI Reports, with paid-plan and 100-credit qualification. Enforced in `plan_entitlements.py`; price is `AI_REPORT_CREDITS = 100` in `feature_credit_service.py`. AI and PDF flags are enabled locally. |
| Free multi-client workspace | Agency CTA changed to Start Your Agency Workspace. Copy states that multiple businesses and team access require a paid plan. Free entitlements are one business, three keywords and zero additional team members. |
| 500 credits cover two 21×21 scans | Corrected: one 21×21 scan uses 441 credits, leaving 59. Twenty 5×5 scans use 500. |
| Measured shares of phone calls, all leads going to rivals | Removed. Scanned ranking positions do not measure calls or revenue. |
| Guaranteed 60-second setup or scans finishing in seconds | Replaced with simple guided setup and coordinate-based checks. |
| Continuous live telemetry and synchronized precise GPS guarantees | Replaced with coordinate-based tracking and explicitly illustrative scan labels. The scanner does not provide the prototype's ±1.8 m guarantee. |
| Always returns 40 competitors, authentic mobile scanners and no scraped approximations | Replaced with accurate wording about returned Google Maps results at selected coordinates. Existing DataForSEO integration and returned result counts do not support the original universal claims. |
| Competitor comparisons at no extra scan credits | Retained for viewing saved scan results; no new scan is requested. |
| Exact AI proximity thresholds, review-momentum exploits, EXIF photo geotagging and scripted customer review requests | Replaced with geographic analysis, competitor evidence and prioritized recommendations supported by existing AI report services. Example action steps now use scan comparison and profile review. |
| Automatic weekly report dispatch and a fixed four-page PDF | Replaced with an illustrative report label and a working Explore AI Reports link. Report generation/PDF export exist; the prototype's dispatch and page-count promises were not established. |
| White-label PDF branding and public client heatmap links | Replaced by PDF Reports and Saved Scan History. No live implementation of the claimed branded public portal was found. |
| Batch scans and granular assignments to client rosters | Changed to recurring keyword scan scheduling and supported workspace team roles, matching `scan_schedules.py` and `team.py`. |
| Unlimited exports, 100+ workspaces and large-scale guarantees | Removed or qualified; not demonstrated by the local implementation. |
| Franchise rollup reports, overlap audits and customer API integration | Replaced with multiple locations, keyword tracking and saved history. |
| AI keyword suggestions | Replaced with tracking target keywords, without making an unverified AI claim. |
| Most Popular audience | Changed to For Agencies while preserving the highlighted card; no popularity evidence was available. |
| Before/after figures prove causation | Explicitly labeled as example results, not guaranteed outcomes or proof that an optimization caused the change. Percentage-point arithmetic corrected. |
| Competitor tool pricing/capability claims | Framed as a basic single-point comparison, with provider variation disclosed and unsupported extra-fee claims removed. |

## Visual fidelity and intentional differences

The supplied `code.html` is the structural and styling reference. `screen.png` is only 210 × 1600 pixels, so fine pixel-level verification is limited by its resolution. Desktop review retained the reference max widths, section order, two-column layouts, card grids, navy sections, comparison table and FAQ treatment.

Intentional differences are the official logo, truthful copy, locally available product screenshots in the two image panels, usable mobile menu, accessible focus/contrast corrections and functioning destinations. The prototype heatmap, AI report and agency roster remain rendered UI mockups. The real product screenshots have their own current ranking colors; the adjacent prototype color legend is explicitly labeled illustrative.

Refinement included matching Tailwind 3 palette values inside the Tailwind 4 page scope, neutralizing inherited paragraph leading, improving narrow-screen grid/form/table layout, fixing sticky-header anchor offsets, closing the mobile menu after navigation, and supplying correctly sized logo image hints.

## Validation

- Production build: passed; route is statically prerendered.
- TypeScript: passed with `node node_modules/typescript/bin/tsc --noEmit --incremental false`; also checked by the production build.
- Targeted ESLint on the new route/components and sitemap: passed.
- Whole-site `npm run lint`: 46 pre-existing errors and 14 warnings in unchanged dashboard, service, script and marketing files. No new landing-page lint findings. Existing issues include explicit `any`, CommonJS import lint rules and effect state updates.
- Responsive widths checked: 1440, 1366, 1280, 1024, 768, 430, 390, 375 and 320 pixels. No document-level horizontal overflow.
- Desktop full-page and section screenshots visually reviewed; mobile/tablet hero, product panels, agency section, table, FAQ and final form reviewed.
- Major signup CTAs clicked successfully; login opens `/login`.
- Final form rejects an empty value and routes to existing signup for a filled value.
- All six FAQs opened and closed with the keyboard.
- Mobile menu closes after selection; workflow anchor resolves below the sticky header.
- All anchor targets exist; one H1; canonical/title verified in the rendered document.
- Local images loaded successfully; no external prototype image dependencies.
- No landing-page JavaScript/hydration errors observed. During development, jumping to a lazy-loaded below-fold image produced a Next Image LCP warning; it is not an above-fold hero image and remains lazy-loaded as requested.

## Remaining limitations

- Whole-site lint remains blocked by unrelated existing findings.
- Business-name handoff is not supported by existing signup; the authorized signup fallback is used.
- The provided low-resolution screenshot cannot establish exact pixel equivalence, and the authorized real screenshot replacements differ from the prototype images.
- Deployed with `scripts/deploy-vps.sh`; see the git log for the release commit.
