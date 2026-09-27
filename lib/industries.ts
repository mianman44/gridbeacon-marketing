import type { ReactNode } from "react";

/*
 * The industry pages (Tier 3), one entry per trade.
 *
 * Each trade's copy is its own: the searches its customers make, how
 * it is set up on Google, who it competes with and what tends to go
 * wrong. Nothing here is a statistic; where a claim is general local
 * SEO knowledge it is worded as such. GridBeacon facts (grid sizes,
 * credits, features) match the backend.
 *
 * `scan` is a real GridBeacon scan of a business in that trade, with
 * names and addresses blurred; record each capture's source in
 * SCREENSHOT-SOURCES.md. Until a trade has its own, exampleScan() shows
 * the shared Dallas garage door scan and SAYS so -- the section is then
 * an "example scan", never presented as that trade's own.
 */

export interface ScanImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface IndustryScan {
  /* Hero image: the heatmap with its visibility / rank / top-3 panel. */
  heatmap: ScanImage;
  caption: string;
  /* The same scan with a point selected and its competitors listed. */
  detail: ScanImage;
  detailCaption: string;
  title: string;
  intro: string;
  findings: ReactNode[];
  takeaway: string;
}

interface CardItem {
  title: string;
  body: string;
  tag?: string;
}

export interface Industry {
  slug: string;
  path: string;
  /* "plumbers" -- used in running text. */
  plural: string;
  /* "Plumbers" -- used in headings and links. */
  titleNoun: string;
  breadcrumb: string;
  model: "sab" | "storefront" | "mixed";
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lede: string;
  facts: string[];
  /* One line for the industries hub. */
  summary: string;
  searches: {
    title: string;
    intro: string;
    rows: [string, string, string][];
    caption: string;
  };
  setup: {
    title: string;
    intro: string;
    cards: CardItem[];
    budget: string;
  };
  landscape: {
    toc: string;
    eyebrow: string;
    title: string;
    intro: string;
    cards: CardItem[];
  };
  extra?: {
    id: string;
    toc: string;
    eyebrow: string;
    title: string;
    intro: string;
    cards: CardItem[];
  };
  problems: [string, string, string][];
  faqs: [string, string][];
  cta: { title: string; body: string };
  related: string[];
  scan?: IndustryScan;
}

const IMAGES = "/marketing/google-maps-rank-tracker";

/* The scan a trade's page shows: its own when it has one, otherwise
   the shared example, labelled as a garage door scan from Dallas.
   `ownScan` tells the page which wording to use. */
export function exampleScan(industry: Industry): IndustryScan & { ownScan: boolean } {
  if (industry.scan) return { ...industry.scan, ownScan: true };
  const garageDoor = industry.slug === "garage-door";
  return {
    ownScan: false,
    heatmap: {
      src: `${IMAGES}/geo-grid-scan-dallas-20260919.webp`,
      width: 1600,
      height: 780,
      alt: "GridBeacon geo-grid heatmap of a garage door repair company's Google Maps rankings at 25 points across Dallas",
    },
    caption: garageDoor
      ? "A real 5 × 5 GridBeacon scan for \u201cgarage door repair\u201d in Dallas."
      : "Example: a real 5 × 5 GridBeacon scan for \u201cgarage door repair\u201d in Dallas.",
    detail: {
      src: `${IMAGES}/grid-point-competitors-20260919.webp`,
      width: 1600,
      height: 772,
      alt: "GridBeacon heatmap with one grid point selected and the businesses Google Maps ranked there listed in order",
    },
    detailCaption: "A real GridBeacon scan with one point selected: every business ranked there, in order.",
    title: garageDoor
      ? "What a Garage Door Scan Shows"
      : `Reading a Geo-Grid Scan: What ${industry.titleNoun} Should Look For`,
    intro: garageDoor
      ? "The screenshots are real GridBeacon scans. Here is what to look for when you scan your own garage door business:"
      : "The screenshots are real GridBeacon scans of other businesses, shown as examples. When you scan your own business, look for these:",
    findings: [
      "Where the green stops: the edge of the area where customers see you in the top three.",
      "Which direction fades fastest: often where a strong competitor is based.",
      "Who holds the points you lose: select a point to see every business ranked there.",
      "Whether each keyword tells the same story: run the searches in the table above separately.",
    ],
    takeaway:
      "Run the same scan again in a week or a month, with the same centre, grid and radius, and the trend arrows show what moved.",
  };
}

/* Credits a month for a keyword set scanned weekly (4.33 scans). */
const weekly = (keywords: number, points: number) =>
  Math.round((keywords * points * 4.33) / 10) * 10;

export const INDUSTRIES: Industry[] = [
  {
    slug: "plumbers",
    path: "/local-rank-tracking-for-plumbers",
    plural: "plumbers",
    titleNoun: "Plumbers",
    breadcrumb: "Rank Tracking for Plumbers",
    model: "sab",
    title: "Google Maps Rank Tracking for Plumbers | GridBeacon",
    description:
      "See where your plumbing business ranks on Google Maps across your whole service area, for every job type, and which plumbers take the calls where you don't.",
    eyebrow: "Rank tracking for plumbers",
    h1: "Google Maps Rank Tracking for Plumbers",
    lede:
      "A plumber can rank first for “plumber” at the shop and be invisible for “water heater repair” five miles away. GridBeacon checks your Google Maps position from every point of your service area, for each job you want calls for, and shows which plumbers take those calls where you don't.",
    facts: ["Track each job type separately", "Grids up to 21 × 21"],
    summary: "Emergency, drain and water heater searches across a whole service area.",
    searches: {
      title: "The Searches That Bring Plumbers Calls",
      intro:
        "Plumbing customers search by problem as often as by trade, and each search can produce a different map pack. Track the general terms and the jobs that pay best.",
      rows: [
        ["plumber", "The broadest search, and the most competitive map pack.", "Your overall reach across the service area."],
        ["emergency plumber", "Urgent, high-value calls where the caller rings the first result.", "Whether you win the searches that turn into same-day jobs."],
        ["water heater repair / replacement", "A high-ticket job with its own set of competitors.", "Whether Google connects your profile to this service."],
        ["drain cleaning", "Frequent, repeat work that often starts a customer relationship.", "Reach for routine jobs, often against drain specialists."],
        ["leak detection", "A specialist service fewer plumbers target.", "An easier map to win, and a gap to exploit."],
        ["sewer line repair", "Big jobs, searched less often.", "Whether you appear for your most valuable work."],
      ],
      caption:
        "“Near me” versions behave much like the base search, because Google already uses the searcher's location; a geo-grid measures that effect directly.",
    },
    setup: {
      title: "How to Set Up Rank Tracking for a Plumbing Business",
      intro:
        "Most plumbers hide their address on Google because they work at the customer's home, so the grid needs a deliberate centre and enough reach to cover the area you drive to.",
      cards: [
        { title: "Centre", body: "Where Google places your listing. GridBeacon can look it up from your Maps link." },
        { title: "Grid", body: "9 × 9 to 13 × 13. Wide enough to see where your ranking fades." },
        { title: "Radius", body: "5–10 miles for one city; wider if you cover suburbs." },
        { title: "Schedule", body: "Weekly while you work on the profile, then monthly." },
      ],
      budget: `Budget: 5 keywords on a 9 × 9 grid scanned weekly is about ${weekly(5, 81).toLocaleString("en-US")} credits a month, well inside the Starter plan's 8,000.`,
    },
    landscape: {
      toc: "Who plumbers compete with",
      eyebrow: "The competition",
      title: "Who Plumbers Compete With on Google Maps",
      intro:
        "The map pack for plumbing is rarely just other independent plumbers. Expect these kinds of listings in your grid:",
      cards: [
        { title: "Franchise brands", body: "National plumbing brands with a listing in every territory, often with large review counts." },
        { title: "Drain and sewer specialists", body: "Businesses that focus on one job and can outrank general plumbers for it." },
        { title: "Local Services Ads", body: "Google's own ads often sit above the map pack for plumbing searches. They don't change your map rank, but they take clicks." },
        { title: "Lead-generation listings", body: "Listings that pass calls on to other plumbers. Worth checking if an unfamiliar name holds large parts of your grid." },
        { title: "Neighbouring towns", body: "Plumbers based just outside your area whose listing sits closer to part of your grid than yours does." },
        { title: "Multi-trade companies", body: "Plumbing, heating and air businesses that compete across several of your keywords at once." },
      ],
    },
    problems: [
      ["Strong near the listing, gone after a few miles", "Distance: Google ranks you mostly from where it places the listing", "Prominence: reviews and local links, to push the edge outward"],
      ["Good for “plumber”, weak for one job type", "The profile doesn't signal that service clearly", "Services list, secondary categories, and pages on your site for that job"],
      ["Almost nothing anywhere", "Grid centred away from the listing, or a suspended or filtered profile", "Centre on the listing's location and check the profile shows on Maps"],
      ["One side of town taken by a single competitor", "A competitor based on that side", "Their review count and pace; focus effort where you can win"],
      ["Rankings swing between scans", "Normal local volatility, or recent profile edits", "Judge trends over several scans, not two"],
    ],
    faqs: [
      ["How do I check my plumbing company's Google Maps ranking?", "Search from one spot and you only see one result. A geo-grid scan checks your rank from dozens of points across your service area at once. GridBeacon's free rank checker runs a 3 × 3 grid, and a free account includes 500 credits for larger grids."],
      ["Why don't I show up on Google Maps outside my town?", "Google weighs how far each business is from the searcher. Plumbers who hide their address still rank from the point where Google places their listing, so visibility usually fades with distance from that point. More reviews, a well-matched profile and local links can push that edge further out."],
      ["Which keywords should a plumber track?", "The general term (plumber), your urgent term (emergency plumber), and the two or three jobs that bring the most profit, such as water heater replacement or drain cleaning. Each can have a different map pack."],
      ["How often should a plumber scan their rankings?", "Weekly while you're actively improving your profile or after big changes, then monthly. Keep the same grid, radius and centre so scans compare."],
      ["Do Local Services Ads affect my map ranking?", "They are ads shown above the results, so they don't move your position in the map pack. They do take a share of clicks, which is one more reason to rank in the top three below them."],
    ],
    cta: { title: "See Where Your Plumbing Business Gets Calls", body: "Scan your main plumbing keywords across your whole service area with 500 free credits." },
    related: ["hvac", "electricians", "garage-door"],
  },

  {
    slug: "hvac",
    path: "/local-rank-tracking-for-hvac",
    plural: "HVAC companies",
    titleNoun: "HVAC Companies",
    breadcrumb: "Rank Tracking for HVAC Companies",
    model: "sab",
    title: "Google Maps Rank Tracking for HVAC Companies | GridBeacon",
    description:
      "Track your HVAC company's Google Maps rankings for AC repair, furnace repair and installs across your service area, season by season, against local competitors.",
    eyebrow: "Rank tracking for HVAC",
    h1: "Google Maps Rank Tracking for HVAC Companies",
    lede:
      "HVAC demand flips with the weather: air conditioning searches in the heat, furnace searches in the cold. GridBeacon tracks where your company ranks on Google Maps for each of them, across your whole service area, so you're visible before the season peaks rather than after.",
    facts: ["Cooling and heating keywords", "Scheduled scans"],
    summary: "Cooling and heating searches that peak with the seasons.",
    searches: {
      title: "The Searches That Bring HVAC Companies Work",
      intro:
        "HVAC customers search for the symptom or the job, and the two halves of the year bring different searches. Track both sets.",
      rows: [
        ["ac repair", "The peak summer search, often urgent.", "Whether you win cooling calls when they matter most."],
        ["furnace repair / heating repair", "The winter equivalent, just as urgent.", "Your reach for heating work before the first cold snap."],
        ["hvac contractor", "The general trade term.", "Your overall visibility across the area."],
        ["ac installation / replacement", "High-ticket jobs with longer decisions.", "Whether you show up for the most valuable work."],
        ["heat pump installation", "A growing service many competitors don't target yet.", "An opportunity to own a map pack early."],
        ["hvac maintenance", "Service plans and tune-ups that build repeat business.", "Reach for recurring revenue work."],
      ],
      caption: "Track cooling and heating terms all year: rankings built in the off-season carry into the peak.",
    },
    setup: {
      title: "How to Set Up Rank Tracking for an HVAC Company",
      intro:
        "HVAC companies usually serve customers at home and cover a wide area, so treat the business as a service-area business and size the grid to the area your technicians drive.",
      cards: [
        { title: "Centre", body: "Where Google places your listing, looked up from its Maps link." },
        { title: "Grid", body: "9 × 9 to 13 × 13 for a city and its suburbs." },
        { title: "Radius", body: "6–15 miles, depending on how far you'll travel for a job." },
        { title: "Schedule", body: "Weekly in the run-up to and during peak season; monthly otherwise." },
      ],
      budget: `Budget: 6 keywords on a 9 × 9 grid scanned weekly is about ${weekly(6, 81).toLocaleString("en-US")} credits a month, inside the Starter plan's 8,000.`,
    },
    landscape: {
      toc: "Who HVAC companies compete with",
      eyebrow: "The competition",
      title: "Who HVAC Companies Compete With on Google Maps",
      intro: "Expect a mix of these in an HVAC map pack:",
      cards: [
        { title: "Multi-trade home services", body: "Heating, cooling and plumbing companies competing across all your keywords." },
        { title: "Franchise networks", body: "Brands with a listing in each territory and the review volume that comes with scale." },
        { title: "Local Services Ads", body: "Google's ads above the map pack for many HVAC searches. They take clicks but don't change your map rank." },
        { title: "Equipment dealers", body: "Businesses listed around a manufacturer brand that compete for installation searches." },
        { title: "Seasonal pop-ups", body: "Newer or smaller operators that push hard in peak season. Watch the Biggest Competitor Changes list." },
        { title: "Neighbouring towns", body: "Companies based outside your area whose listing sits nearer to part of your grid." },
      ],
    },
    extra: {
      id: "seasons",
      toc: "Tracking through the seasons",
      eyebrow: "Seasonality",
      title: "Tracking HVAC Rankings Through the Seasons",
      intro:
        "Rankings don't reset each season, but attention does. A simple rhythm keeps you ready for both peaks:",
      cards: [
        { title: "Before summer", body: "Scan cooling keywords weekly from late spring, while there's still time to act on weak areas." },
        { title: "Before winter", body: "Switch the weekly focus to heating keywords in early autumn." },
        { title: "Off-season", body: "Monthly scans on everything, and time to work on reviews, photos and service pages." },
        { title: "After a heatwave or cold snap", body: "Run an extra scan to see who gained ground while demand was high." },
      ],
    },
    problems: [
      ["Strong for AC, weak for heating (or the reverse)", "The profile and site lean toward one service", "Services list, categories and service pages for the weaker side"],
      ["Visibility shrinks in peak season", "Competitors gaining reviews and activity faster", "Biggest Competitor Changes and review pace"],
      ["Only visible near the office", "Distance from where Google places the listing", "Prominence: reviews, local links, service-area content"],
      ["Install searches much weaker than repair", "Fewer signals about installation work", "Installation services, photos of installs, dedicated pages"],
      ["Nothing on the grid", "Grid centred away from the listing", "Centre on the listing's location"],
    ],
    faqs: [
      ["How do I track my HVAC company's Google Maps rankings?", "Run a geo-grid scan for each main keyword, such as ac repair and furnace repair, centred where Google places your listing. GridBeacon shows your rank at every point of your service area and who ranks above you."],
      ["Should HVAC companies track heating keywords in summer?", "Yes. Rankings built in the off-season carry into the peak. Scan both sets all year, and scan the in-season set more often."],
      ["What grid size suits an HVAC company?", "Usually 9 × 9 to 13 × 13 with a 6–15 mile radius, depending on how far you travel. The aim is to see where your ranking fades, so the grid should reach past it."],
      ["Why do we rank well for AC repair but not furnace repair?", "Google matches each search to what your profile and website say you do. If most of your content, photos and reviews are about cooling, heating searches may favour competitors who signal heating more clearly."],
      ["Do Local Services Ads change HVAC map rankings?", "No. They are ads above the results and don't move your map pack position, though they do take a share of the clicks."],
    ],
    cta: { title: "Be Visible Before the Season Peaks", body: "Scan your cooling and heating keywords across your service area with 500 free credits." },
    related: ["plumbers", "electricians", "roofers"],
  },

  {
    slug: "dentists",
    path: "/local-rank-tracking-for-dentists",
    plural: "dentists",
    titleNoun: "Dentists",
    breadcrumb: "Rank Tracking for Dentists",
    model: "storefront",
    title: "Google Maps Rank Tracking for Dentists | GridBeacon",
    description:
      "See where your dental practice ranks on Google Maps street by street, for general and cosmetic treatments, and which nearby practices patients find first.",
    eyebrow: "Rank tracking for dentists",
    h1: "Google Maps Rank Tracking for Dental Practices",
    lede:
      "Patients choose a dentist close to home or work, and in most towns there are several practices within a mile. That makes dental rankings change street by street. GridBeacon shows where your practice appears in the map pack across your catchment, treatment by treatment, and which practices patients see instead.",
    facts: ["Treatment-level keywords", "Tight, dense grids"],
    summary: "Dense, proximity-driven map packs, treatment by treatment.",
    searches: {
      title: "The Searches That Bring Dental Patients",
      intro:
        "General searches bring check-up patients; treatment searches bring the higher-value work. Track both, because the practices that win each are often different.",
      rows: [
        ["dentist", "The core search for new patients.", "How far your everyday visibility reaches."],
        ["emergency dentist", "Urgent visits that often become regular patients.", "Whether you're found when someone is in pain today."],
        ["dental implants", "One of the highest-value treatments.", "Whether Google links your practice to implant work."],
        ["cosmetic dentist", "Veneers, whitening and smile makeovers.", "Reach for elective, higher-margin treatments."],
        ["pediatric dentist / family dentist", "Parents search specifically.", "Whether families find you, often against specialists."],
        ["invisalign dentist / teeth straightening", "A treatment searched by name.", "Visibility for clear-aligner patients."],
      ],
      caption: "A practice that ranks well for “dentist” can still be absent for implants or cosmetic work; track the treatments you want more of.",
    },
    setup: {
      title: "How to Set Up Rank Tracking for a Dental Practice",
      intro:
        "Dental practices are storefronts with a public address, and patients rarely travel far. Use a tight grid so each point represents a real neighbourhood.",
      cards: [
        { title: "Centre", body: "Your practice address, where Google places the listing." },
        { title: "Grid", body: "7 × 7 is a good default; 9 × 9 for a larger town." },
        { title: "Radius", body: "1–3 miles in a city; 3–5 miles in suburbs or small towns." },
        { title: "Schedule", body: "Weekly while growing, monthly once stable." },
      ],
      budget: `Budget: 6 treatments on a 7 × 7 grid scanned weekly is about ${weekly(6, 49).toLocaleString("en-US")} credits a month, inside the Starter plan's 8,000.`,
    },
    landscape: {
      toc: "Who dentists compete with",
      eyebrow: "The competition",
      title: "Who Dental Practices Compete With on Google Maps",
      intro: "Dental map packs are crowded and local. These are the listings that usually share your grid:",
      cards: [
        { title: "Practices on the next street", body: "In dense areas several practices sit within a mile, so a small move in distance changes who ranks." },
        { title: "Group practices", body: "Multi-location dental groups with consistent branding and strong review programmes." },
        { title: "Specialists", body: "Orthodontists, pediatric dentists and implant centres that compete for treatment searches." },
        { title: "Practitioner listings", body: "Individual dentists can have their own profiles, which may compete with the practice listing." },
        { title: "New practices", body: "Recently opened practices pushing for reviews. Watch who gains ground between scans." },
        { title: "Clinics outside your town", body: "Practices patients will travel to for a specific treatment such as implants." },
      ],
    },
    extra: {
      id: "practitioners",
      toc: "Practice and practitioner listings",
      eyebrow: "Multiple dentists",
      title: "Practice Listings, Practitioner Listings and Multiple Locations",
      intro:
        "Dental practices often have more than one listing in play. Track them deliberately so you know which one Google is showing:",
      cards: [
        { title: "Track the practice listing first", body: "It's usually the one you want patients to find. Add it by pasting its Maps link." },
        { title: "Check practitioner listings", body: "If an individual dentist's listing appears in your grid, you'll see it in the point inspector alongside the practice." },
        { title: "One business per location", body: "Each location is its own listing with its own grid; paid plans have no limit on businesses." },
        { title: "Compare locations", body: "Use the same keywords, grid and radius at each location so you can compare them fairly." },
      ],
    },
    problems: [
      ["Strong outside the door, weak a mile away", "Dense competition: another practice is closer to those patients", "Reviews and treatment content to compete beyond your immediate area"],
      ["Visible for “dentist”, absent for implants or cosmetic", "The profile doesn't signal those treatments", "Services, relevant secondary categories, before-and-after photos, treatment pages"],
      ["A specialist wins most treatment searches", "Their profile matches the treatment more closely", "Whether that treatment is worth a dedicated push"],
      ["Two of your own listings in the results", "Practice and practitioner listings both showing", "Which listing ranks where, using the point inspector"],
      ["Sudden drop across the grid", "Profile edits, a category change or a suspended listing", "Recent changes to the profile and its status on Maps"],
    ],
    faqs: [
      ["How do I check my dental practice's ranking on Google Maps?", "A geo-grid scan checks your ranking from many points around the practice at once. GridBeacon's free checker runs a 3 × 3 grid; a free account includes 500 credits for a 7 × 7 or larger grid."],
      ["What grid size should a dentist use?", "A 7 × 7 grid with a 1–3 mile radius in a city, or 3–5 miles in a suburb. Patients rarely travel far for routine care, so a tight grid shows the real picture."],
      ["Should a dentist track treatments separately?", "Yes. Implants, cosmetic dentistry and emergency care each produce their own map pack, often led by different practices. Track the treatments you want more patients for."],
      ["Why does another practice outrank us when we have more reviews?", "Reviews are one part of prominence. Relevance (how well the profile matches the search) and distance from the searcher matter too. The grid shows where it happens; the profile comparison helps show why."],
      ["Can I track several practice locations?", "Yes. Each location is a separate business in GridBeacon, and paid plans have no limit on businesses or keywords."],
    ],
    cta: { title: "See Which Practices Patients Find First", body: "Scan your practice and its main treatments street by street with 500 free credits." },
    related: ["chiropractors", "med-spas", "lawyers"],
  },

  {
    slug: "lawyers",
    path: "/local-rank-tracking-for-lawyers",
    plural: "law firms",
    titleNoun: "Law Firms",
    breadcrumb: "Rank Tracking for Law Firms",
    model: "storefront",
    title: "Google Maps Rank Tracking for Lawyers | GridBeacon",
    description:
      "Track your law firm's Google Maps rankings by practice area, lawyer and attorney wording, across your city, and see which firms clients find instead of you.",
    eyebrow: "Rank tracking for lawyers",
    h1: "Google Maps Rank Tracking for Law Firms",
    lede:
      "Legal searches are among the most competitive on Google Maps, and every practice area has its own map pack. A firm can own “divorce lawyer” downtown and barely appear for “DUI attorney” across the river. GridBeacon shows where your firm ranks for each practice area across your city, and which firms take those clients.",
    facts: ["Practice-area keywords", "Lawyer and attorney variants"],
    summary: "Practice-area map packs in one of the most competitive categories.",
    searches: {
      title: "The Searches That Bring Law Firms Clients",
      intro:
        "People search by their problem, and often use “lawyer” and “attorney” interchangeably. The two wordings can return different map packs, so track both for your main practice areas.",
      rows: [
        ["personal injury lawyer", "High-value cases in a fiercely contested map pack.", "Your reach in the most competitive practice area."],
        ["car accident lawyer / attorney", "A specific, urgent search within personal injury.", "Whether you win the case type, not just the category."],
        ["divorce lawyer / family law attorney", "Clients comparing a few local firms.", "Visibility for family matters across the city."],
        ["criminal defense attorney", "Urgent, often searched late in the day.", "Whether you're found when someone needs help now."],
        ["DUI lawyer", "A narrow, high-intent search.", "Reach for a specific offence type."],
        ["estate planning attorney", "Planned, lower-urgency work.", "An often less crowded map pack to win."],
      ],
      caption: "Track each practice area you want cases from, and the lawyer and attorney versions of your most important one.",
    },
    setup: {
      title: "How to Set Up Rank Tracking for a Law Firm",
      intro:
        "Law firms are usually storefronts with a public office, and clients will travel further than for a dentist, but not across a whole region. Size the grid to the part of the city you want cases from.",
      cards: [
        { title: "Centre", body: "Your office address, as Google places it." },
        { title: "Grid", body: "7 × 7 for downtown, 9 × 9 for a wider metro." },
        { title: "Radius", body: "2–5 miles in a city; wider in smaller markets." },
        { title: "Schedule", body: "Weekly for your main practice area, monthly for the rest." },
      ],
      budget: `Budget: 6 practice-area keywords on a 7 × 7 grid scanned weekly is about ${weekly(6, 49).toLocaleString("en-US")} credits a month, inside the Starter plan's 8,000.`,
    },
    landscape: {
      toc: "Who law firms compete with",
      eyebrow: "The competition",
      title: "Who Law Firms Compete With on Google Maps",
      intro: "Legal map packs are crowded with more than just rival firms:",
      cards: [
        { title: "Firms with many offices", body: "Large firms with listings across the metro and heavy review programmes." },
        { title: "Individual attorney listings", body: "Attorneys can have their own profiles, which may rank alongside or instead of the firm." },
        { title: "Local Services Ads", body: "Google's ads for legal services often sit above the map pack. They take clicks but don't change your map rank." },
        { title: "Specialist firms", body: "Firms focused on one practice area, which often outrank general practices for it." },
        { title: "Suspicious listings", body: "Some competitive legal markets have listings at virtual offices or doubtful addresses. The point inspector shows who they are." },
        { title: "Referral networks", body: "Listings that pass enquiries to other firms and compete for the same searches." },
      ],
    },
    extra: {
      id: "practice-areas",
      toc: "Practice areas and categories",
      eyebrow: "Practice areas",
      title: "Tracking Each Practice Area on Its Own Map",
      intro:
        "Google treats a divorce search and an injury search as different questions. How you set up tracking should reflect that:",
      cards: [
        { title: "One keyword per practice area", body: "Each practice area has its own map pack and its own leaders. Track them separately." },
        { title: "Lawyer and attorney", body: "The two wordings can rank differently. Track both for your main practice area." },
        { title: "Categories matter", body: "Your primary Google category signals your main practice area; secondary categories cover the rest." },
        { title: "Firm and attorney listings", body: "If attorneys have their own profiles, check which listing appears at each point." },
      ],
    },
    problems: [
      ["Strong for one practice area, invisible for another", "Categories and content focus on the main area", "Secondary categories, practice-area pages and reviews that mention the work"],
      ["“Lawyer” ranks, “attorney” doesn't (or the reverse)", "Different wording, different map pack", "Use both terms naturally across the profile and site"],
      ["A firm across town wins your neighbourhood", "Their prominence outweighs your distance advantage", "Their review count and pace, links and practice-area focus"],
      ["Unfamiliar listings hold part of your grid", "Possible virtual-office or doubtful listings", "Google's business redressal complaint process for listings that break its guidelines"],
      ["Rankings drop after an office move", "The listing's location changed", "Re-centre scans on the new address and compare from there"],
    ],
    faqs: [
      ["How do law firms track Google Maps rankings?", "With a geo-grid scan for each practice area, centred on the office. GridBeacon checks your rank from every point of the grid and shows which firms rank above you at each one."],
      ["Should we track “lawyer” and “attorney” separately?", "For your main practice area, yes. The two wordings can return different map packs, and clients use both."],
      ["Why is our firm visible downtown but not in the suburbs?", "Google weighs distance from the searcher. A firm is strongest near its office; beyond that, prominence (reviews, links, reputation) decides how far the visibility reaches."],
      ["What grid size should a law firm use?", "A 7 × 7 grid over 2–5 miles suits a city office. Use a 9 × 9 grid or a wider radius if you take cases from across a metro area."],
      ["Do Local Services Ads affect law firm map rankings?", "No. They appear above the results as ads and don't change your position in the map pack."],
    ],
    cta: { title: "See Which Firms Clients Find First", body: "Scan your practice areas across the city with 500 free credits." },
    related: ["dentists", "chiropractors", "med-spas"],
  },

  {
    slug: "roofers",
    path: "/local-rank-tracking-for-roofers",
    plural: "roofers",
    titleNoun: "Roofers",
    breadcrumb: "Rank Tracking for Roofers",
    model: "sab",
    title: "Google Maps Rank Tracking for Roofers | GridBeacon",
    description:
      "Track your roofing company's Google Maps rankings across a whole metro, for repair, replacement and storm work, and see which roofers win the jobs you don't.",
    eyebrow: "Rank tracking for roofers",
    h1: "Google Maps Rank Tracking for Roofing Companies",
    lede:
      "Roofers cover big areas and win big jobs, so a gap in visibility on one side of the metro can cost a lot of work. GridBeacon checks your Google Maps ranking from every point of a wide grid, for repair, replacement and storm work, and shows which roofers take those searches where you don't.",
    facts: ["Metro-wide grids", "Up to a 100-mile radius"],
    summary: "Metro-wide grids for high-value repair, replacement and storm work.",
    searches: {
      title: "The Searches That Bring Roofers Jobs",
      intro:
        "Roofing searches split between urgent repairs and planned replacements, with storm-related searches spiking after bad weather.",
      rows: [
        ["roofing contractor / roofer", "The general searches, both worth tracking.", "Your overall reach across the metro."],
        ["roof repair", "Frequent, often urgent work.", "Whether you win the calls after a leak appears."],
        ["roof replacement", "The highest-value jobs.", "Visibility where the big contracts come from."],
        ["storm damage roof repair", "Demand that surges after storms.", "Whether you're found when demand spikes."],
        ["metal roofing", "A specialist material some roofers focus on.", "An opportunity if you offer it."],
        ["commercial roofing", "A different customer and set of competitors.", "Reach for commercial work, if you do it."],
      ],
      caption: "Roofing map packs can differ a lot between repair and replacement; track both.",
    },
    setup: {
      title: "How to Set Up Rank Tracking for a Roofing Company",
      intro:
        "Most roofers work across a metro area or region and hide their address. Use a large grid to see how far your visibility reaches and where it drops.",
      cards: [
        { title: "Centre", body: "Where Google places your listing, looked up from its Maps link." },
        { title: "Grid", body: "13 × 13 or larger for a metro." },
        { title: "Radius", body: "10–25 miles, or more in rural regions." },
        { title: "Schedule", body: "Monthly, plus an extra scan after major storms." },
      ],
      budget: `Budget: 5 keywords on a 13 × 13 grid scanned monthly is ${(5 * 169).toLocaleString("en-US")} credits; scanned weekly, about ${weekly(5, 169).toLocaleString("en-US")}, inside the Starter plan's 8,000.`,
    },
    landscape: {
      toc: "Who roofers compete with",
      eyebrow: "The competition",
      title: "Who Roofers Compete With on Google Maps",
      intro: "A roofing map pack across a metro usually includes:",
      cards: [
        { title: "Established local roofers", body: "Long-standing companies with deep review histories in their home area." },
        { title: "Contractors from other towns", body: "Roofers who arrive after major storms and push for visibility while demand is high." },
        { title: "General contractors", body: "Builders and remodelers who list roofing among many services." },
        { title: "Local Services Ads", body: "Google's ads above the map pack for roofing searches, which take clicks without changing map rank." },
        { title: "Material specialists", body: "Metal, tile or flat-roof specialists who can lead their niche." },
        { title: "Lead-generation listings", body: "Listings that pass jobs on to other roofers. Check any unfamiliar name holding large areas." },
      ],
    },
    extra: {
      id: "storms",
      toc: "Rankings after storms",
      eyebrow: "Storm season",
      title: "Tracking Roofing Rankings Around Storm Season",
      intro: "Storms change who is searching and who is competing. Use scans to see it happen:",
      cards: [
        { title: "Before the season", body: "Scan your full keyword set so you have a baseline to compare against." },
        { title: "After a major storm", body: "Run an extra scan for repair and storm-damage keywords to see who gained ground." },
        { title: "Watch new names", body: "Biggest Competitor Changes shows businesses that climbed quickly." },
        { title: "Afterwards", body: "Compare with the baseline to see what held and what faded." },
      ],
    },
    problems: [
      ["Visible in the home suburb, not across the metro", "Distance from where Google places the listing", "Prominence: reviews across the area, local links, project content"],
      ["Repair ranks, replacement doesn't", "The profile signals small jobs more than big ones", "Replacement services, project photos and pages"],
      ["A new name suddenly takes large areas", "A contractor pushing hard after a storm", "Biggest Competitor Changes and their review pace"],
      ["Grid is nearly empty", "Grid centred on the city rather than the listing", "Centre on the listing's location"],
      ["Paying for points in lakes or farmland", "A wide radius over empty ground", "Exclude those points; excluded points use no credits"],
    ],
    faqs: [
      ["How do roofers track Google Maps rankings across a whole metro?", "With a large geo-grid, such as 13 × 13 over a 10–25 mile radius, centred where Google places the listing. It shows exactly where your visibility reaches and where competitors take over."],
      ["How often should a roofing company scan?", "Monthly is usually enough, plus an extra scan after major storms when demand and competition change quickly."],
      ["Why do we rank for roof repair but not roof replacement?", "Google matches searches to what your profile and site show. If most of it is about repairs, replacement searches may favour roofers who show more replacement work."],
      ["Is a big grid expensive?", "A 13 × 13 grid is 169 credits per keyword. Five keywords monthly is 845 credits, and excluding points over water or empty land lowers it further."],
      ["Do storm chasers affect our map rankings?", "Contractors who move in after storms add competition for a while. A scan after the storm shows who gained ground and where."],
    ],
    cta: { title: "See How Far Your Roofing Visibility Reaches", body: "Scan your metro on a large grid with 500 free credits." },
    related: ["hvac", "garage-door", "plumbers"],
  },

  {
    slug: "garage-door",
    path: "/local-rank-tracking-for-garage-door-companies",
    plural: "garage door companies",
    titleNoun: "Garage Door Companies",
    breadcrumb: "Rank Tracking for Garage Door Companies",
    model: "sab",
    title: "Rank Tracking for Garage Door Companies | GridBeacon",
    description:
      "Track your garage door company's Google Maps rankings for repair, springs, openers and installs across your area, and spot the listings crowding your map pack.",
    eyebrow: "Rank tracking for garage door companies",
    h1: "Google Maps Rank Tracking for Garage Door Companies",
    lede:
      "Garage door repair is one of the most crowded map packs on Google, and not every listing in it is a real local business. GridBeacon shows where your company ranks across your service area for each type of job, and names every business ranked at every point, so you can see exactly who you're up against.",
    facts: ["Every listing at every point", "Grids up to 21 × 21"],
    summary: "A crowded, spam-prone category where seeing every listing matters.",
    searches: {
      title: "The Searches That Bring Garage Door Jobs",
      intro:
        "Garage door customers usually search for the part that broke or the job they need, often urgently.",
      rows: [
        ["garage door repair", "The core search, and the most crowded map pack.", "Your overall reach across the area."],
        ["garage door spring repair", "A very common, urgent failure.", "Whether you win the most frequent emergency job."],
        ["garage door opener repair / installation", "A separate job with its own competitors.", "Visibility for opener work."],
        ["garage door installation / replacement", "Higher-value, planned jobs.", "Reach for the biggest tickets."],
        ["emergency garage door repair", "Doors stuck open or shut, at any hour.", "Whether you're found when it's urgent."],
        ["commercial garage door repair", "A different customer, often less crowded.", "An opportunity if you do commercial work."],
      ],
      caption: "Track the jobs you want most; spring and opener searches can rank quite differently from general repair.",
    },
    setup: {
      title: "How to Set Up Rank Tracking for a Garage Door Company",
      intro:
        "Most garage door companies work at the customer's home and hide their address, so treat the business as a service-area business.",
      cards: [
        { title: "Centre", body: "Where Google places your listing, looked up from its Maps link." },
        { title: "Grid", body: "9 × 9 to 13 × 13 across your service area." },
        { title: "Radius", body: "5–15 miles depending on how far you travel." },
        { title: "Schedule", body: "Weekly, since this category moves quickly." },
      ],
      budget: `Budget: 5 keywords on a 9 × 9 grid scanned weekly is about ${weekly(5, 81).toLocaleString("en-US")} credits a month, inside the Starter plan's 8,000.`,
    },
    landscape: {
      toc: "Who garage door companies compete with",
      eyebrow: "The competition",
      title: "Who Garage Door Companies Compete With on Google Maps",
      intro: "Expect a wide mix in a garage door map pack:",
      cards: [
        { title: "Independent local companies", body: "Owner-operated businesses with a strong local reputation." },
        { title: "Franchise brands", body: "National names with a listing in each territory." },
        { title: "Keyword-named listings", body: "Listings whose name is little more than the search term and a city. Some are legitimate, some are not." },
        { title: "Lead-generation operations", body: "Listings that route calls to whichever technician is available." },
        { title: "Door and opener dealers", body: "Showrooms and dealers that compete for installation searches." },
        { title: "Handyman services", body: "General repair businesses that include garage doors." },
      ],
    },
    extra: {
      id: "spam",
      toc: "Spotting suspicious listings",
      eyebrow: "Suspicious listings",
      title: "Spotting Suspicious Listings in Your Grid",
      intro:
        "Garage door repair is known for listings that break Google's guidelines. A geo-grid makes them easier to see:",
      cards: [
        { title: "Look at every point", body: "The point inspector lists every business ranked there. Note names you don't recognise." },
        { title: "Check the pattern", body: "Several near-identical names spread evenly across a grid can be a warning sign." },
        { title: "Report through Google", body: "Google's business redressal complaint form is the route for listings that break its guidelines." },
        { title: "Re-scan afterwards", body: "Compare later scans to see whether removed listings changed the map." },
      ],
    },
    problems: [
      ["Unfamiliar names hold large parts of the grid", "Keyword-named or doubtful listings", "The point inspector, then Google's redressal process if they break guidelines"],
      ["Good for “garage door repair”, weak for springs or openers", "The profile doesn't signal those jobs", "Services list, photos of those jobs, pages on your site"],
      ["Visible near the listing only", "Distance from where Google places the listing", "Reviews and local links to extend reach"],
      ["Big swings from week to week", "A volatile category with listings appearing and disappearing", "Trends over several scans"],
      ["Nothing on the grid", "Grid centred away from the listing", "Centre on the listing's location"],
    ],
    faqs: [
      ["Why is garage door repair so hard to rank for on Google Maps?", "It's a crowded category with franchises, independents, lead-generation listings and some listings that break Google's guidelines. A geo-grid shows exactly who ranks at each point so you know what you're up against."],
      ["How can I see which listings are in my map pack?", "Click any point in a GridBeacon scan to see every business Google Maps ranked there, in order."],
      ["What should I do about fake listings?", "Google provides a business redressal complaint form for reporting listings that break its guidelines. Track your grid before and after to see the effect."],
      ["Which keywords should a garage door company track?", "Garage door repair, spring repair, opener repair, installation and emergency repair cover most jobs. Each can have a different map pack."],
      ["How often should I scan?", "Weekly is sensible in this category, because listings come and go and rankings move more than in most trades."],
    ],
    cta: { title: "See Every Listing in Your Map Pack", body: "Scan your garage door keywords across your area with 500 free credits." },
    related: ["plumbers", "roofers", "electricians"],
  },

  {
    slug: "electricians",
    path: "/local-rank-tracking-for-electricians",
    plural: "electricians",
    titleNoun: "Electricians",
    breadcrumb: "Rank Tracking for Electricians",
    model: "sab",
    title: "Google Maps Rank Tracking for Electricians | GridBeacon",
    description:
      "Track your electrical business's Google Maps rankings for emergency work, panel upgrades and EV chargers across your service area, against local competitors.",
    eyebrow: "Rank tracking for electricians",
    h1: "Google Maps Rank Tracking for Electricians",
    lede:
      "Electricians win work from urgent callouts and from newer, higher-value jobs like EV charger and panel upgrades. Each has its own map pack. GridBeacon shows where your business ranks across your service area for every one of them, and which electricians are found instead.",
    facts: ["Emergency and specialist jobs", "Service-area grids"],
    summary: "Emergency callouts plus growing specialist jobs like EV chargers.",
    searches: {
      title: "The Searches That Bring Electricians Work",
      intro:
        "Electrical customers search by urgency or by the specific job. Newer services are often less contested than the general term.",
      rows: [
        ["electrician", "The general search, and the most crowded.", "Your overall visibility across the area."],
        ["emergency electrician", "Urgent callouts, often out of hours.", "Whether you're found when power's out."],
        ["electrical panel upgrade", "A high-value job with fewer specialists.", "Reach for bigger residential work."],
        ["ev charger installation", "A fast-growing service.", "A map pack you may be able to lead early."],
        ["generator installation", "Demand that rises around outages and storms.", "Visibility for a specialist service."],
        ["commercial electrician", "Different customers and competitors.", "Reach for commercial contracts, if you do them."],
      ],
      caption: "Specialist jobs are often easier to rank for than “electrician”; track the ones you want to grow.",
    },
    setup: {
      title: "How to Set Up Rank Tracking for an Electrical Business",
      intro:
        "Electricians usually work at the customer's site and hide their address, so set the business up as a service-area business.",
      cards: [
        { title: "Centre", body: "Where Google places your listing, looked up from its Maps link." },
        { title: "Grid", body: "9 × 9 to 13 × 13 across your service area." },
        { title: "Radius", body: "5–12 miles, depending on how far you travel." },
        { title: "Schedule", body: "Weekly while you build visibility, then monthly." },
      ],
      budget: `Budget: 6 keywords on a 9 × 9 grid scanned weekly is about ${weekly(6, 81).toLocaleString("en-US")} credits a month, inside the Starter plan's 8,000.`,
    },
    landscape: {
      toc: "Who electricians compete with",
      eyebrow: "The competition",
      title: "Who Electricians Compete With on Google Maps",
      intro: "An electrician's map pack usually mixes:",
      cards: [
        { title: "Independent electricians", body: "Local businesses with strong word-of-mouth and reviews." },
        { title: "Multi-trade companies", body: "Plumbing, HVAC and electrical companies competing across several trades." },
        { title: "Franchise networks", body: "National brands with local territories." },
        { title: "EV and solar installers", body: "Specialists who can lead charger and generator searches." },
        { title: "Local Services Ads", body: "Google's ads above the map pack for many electrical searches, taking clicks without changing map rank." },
        { title: "Commercial contractors", body: "Larger firms that rank for commercial terms." },
      ],
    },
    problems: [
      ["Strong for “electrician”, absent for EV chargers", "The profile doesn't mention the service", "Services list, photos of installs, a page for the service"],
      ["Visible near the listing only", "Distance from where Google places the listing", "Reviews and local links to extend reach"],
      ["A specialist wins specialist searches", "Their profile matches the job more closely", "Whether the job is worth a dedicated push"],
      ["Emergency searches weaker than general", "Hours or content don't signal urgent work", "Opening hours and emergency service information"],
      ["Nothing on the grid", "Grid centred away from the listing", "Centre on the listing's location"],
    ],
    faqs: [
      ["How do electricians check their Google Maps rankings?", "A geo-grid scan checks your ranking from many points across your service area at once. GridBeacon's free checker runs a 3 × 3 grid; a free account includes 500 credits for larger grids."],
      ["Which keywords should an electrician track?", "The general term, emergency electrician, and the specialist jobs you want more of, such as panel upgrades, EV charger installation or generators."],
      ["Why don't we rank for EV charger installation?", "Google matches searches to what your profile and site show. If EV work isn't listed as a service or shown in photos and content, specialists who do show it may rank first."],
      ["What grid size suits an electrician?", "9 × 9 to 13 × 13 with a 5–12 mile radius, centred where Google places your listing."],
      ["Is it worth tracking commercial electrical work separately?", "If you want commercial jobs, yes. Commercial searches often have a different set of competitors from residential ones."],
    ],
    cta: { title: "See Where Electrical Customers Find You", body: "Scan your main and specialist keywords across your service area with 500 free credits." },
    related: ["plumbers", "hvac", "roofers"],
  },

  {
    slug: "pest-control",
    path: "/local-rank-tracking-for-pest-control",
    plural: "pest control companies",
    titleNoun: "Pest Control Companies",
    breadcrumb: "Rank Tracking for Pest Control",
    model: "sab",
    title: "Google Maps Rank Tracking for Pest Control | GridBeacon",
    description:
      "Track your pest control company's Google Maps rankings for exterminator, termite, rodent and bed bug searches, season by season, against national chains.",
    eyebrow: "Rank tracking for pest control",
    h1: "Google Maps Rank Tracking for Pest Control Companies",
    lede:
      "Pest control customers search for the pest in front of them, and national chains have a branch in almost every town. GridBeacon tracks where your company ranks on Google Maps for each pest and service across your area, so you can see where you beat the chains and where they win.",
    facts: ["Pest-by-pest keywords", "Seasonal tracking"],
    summary: "Pest-by-pest searches against national chains, with seasonal peaks.",
    searches: {
      title: "The Searches That Bring Pest Control Customers",
      intro:
        "People search for the pest, the service or the trade, and “exterminator” and “pest control” can return different map packs.",
      rows: [
        ["pest control", "The general search.", "Your overall reach across the area."],
        ["exterminator", "A common alternative wording.", "Whether the other wording ranks you differently."],
        ["termite inspection / treatment", "High-value work, often tied to property sales.", "Visibility for your most valuable service."],
        ["bed bug treatment", "Urgent and specialised.", "Whether you win a high-stress, high-value search."],
        ["rodent control", "Common, year-round work.", "Reach for routine callouts."],
        ["mosquito control", "Seasonal, often recurring treatments.", "Visibility when the season starts."],
      ],
      caption: "Track both “pest control” and “exterminator”, plus the pests that bring you the most work.",
    },
    setup: {
      title: "How to Set Up Rank Tracking for a Pest Control Company",
      intro:
        "Pest control technicians work at the customer's property and often cover wide areas, so set the business up as a service-area business.",
      cards: [
        { title: "Centre", body: "Where Google places your listing, looked up from its Maps link." },
        { title: "Grid", body: "9 × 9 to 13 × 13 across your service area." },
        { title: "Radius", body: "8–15 miles for a city and its suburbs." },
        { title: "Schedule", body: "Weekly as seasonal pests appear, monthly otherwise." },
      ],
      budget: `Budget: 6 keywords on a 9 × 9 grid scanned weekly is about ${weekly(6, 81).toLocaleString("en-US")} credits a month, inside the Starter plan's 8,000.`,
    },
    landscape: {
      toc: "Who pest control companies compete with",
      eyebrow: "The competition",
      title: "Who Pest Control Companies Compete With on Google Maps",
      intro: "In most pest control grids you'll find:",
      cards: [
        { title: "National chains", body: "Large brands with a local branch listing in most areas and big review counts." },
        { title: "Regional companies", body: "Multi-branch firms that dominate a state or region." },
        { title: "Pest specialists", body: "Termite, bed bug or wildlife specialists that lead their niche." },
        { title: "Lawn and mosquito services", body: "Businesses competing for seasonal outdoor treatments." },
        { title: "Local Services Ads", body: "Google's ads above the map pack for pest control searches, which take clicks without changing map rank." },
        { title: "Neighbouring towns", body: "Companies whose listing sits nearer to part of your grid." },
      ],
    },
    extra: {
      id: "seasons",
      toc: "Tracking through the seasons",
      eyebrow: "Seasonality",
      title: "Tracking Pest Control Rankings Through the Year",
      intro: "Different pests peak at different times. Match your scanning to the season:",
      cards: [
        { title: "Spring", body: "Scan termite, ant and general keywords weekly as activity starts." },
        { title: "Summer", body: "Add mosquito and stinging-insect keywords to the weekly set." },
        { title: "Autumn and winter", body: "Rodent searches rise as pests move indoors." },
        { title: "All year", body: "Keep bed bug and general keywords on a monthly scan." },
      ],
    },
    problems: [
      ["A national chain wins most of the grid", "Prominence: review volume and brand strength", "Where you do win; review pace; the pests the chain doesn't focus on"],
      ["“Pest control” ranks, “exterminator” doesn't", "Different wording, different map pack", "Use both terms naturally across the profile and site"],
      ["Weak for one pest", "The profile doesn't signal that service", "Services list, photos and a page for that pest"],
      ["Visible near the listing only", "Distance from where Google places the listing", "Reviews and local links to extend reach"],
      ["Seasonal rankings slip each year", "Competitors more active when the season starts", "Scanning and profile activity ahead of the season"],
    ],
    faqs: [
      ["How can a local pest control company compete with national chains on Google Maps?", "A geo-grid shows exactly where the chains win and where you do. Many independents lead near their base and for specific pests; the grid shows where to focus."],
      ["Should I track “exterminator” and “pest control” separately?", "Yes. They can return different map packs, and customers use both."],
      ["Which pest keywords are worth tracking?", "The services that bring the most revenue, such as termite treatment or bed bugs, plus the seasonal pests common in your area."],
      ["What grid size suits a pest control company?", "9 × 9 to 13 × 13 with an 8–15 mile radius, centred where Google places your listing."],
      ["How often should pest control rankings be scanned?", "Weekly for the pests in season, monthly for the rest."],
    ],
    cta: { title: "See Where You Beat the Chains", body: "Scan your pest control keywords across your area with 500 free credits." },
    related: ["plumbers", "roofers", "hvac"],
  },

  {
    slug: "med-spas",
    path: "/local-rank-tracking-for-med-spas",
    plural: "med spas",
    titleNoun: "Med Spas",
    breadcrumb: "Rank Tracking for Med Spas",
    model: "storefront",
    title: "Google Maps Rank Tracking for Med Spas | GridBeacon",
    description:
      "Track your med spa's Google Maps rankings treatment by treatment, from botox to laser hair removal, and see which clinics, dermatologists and spas win instead.",
    eyebrow: "Rank tracking for med spas",
    h1: "Google Maps Rank Tracking for Med Spas",
    lede:
      "Med spa clients search for the treatment, not the business type, and they compete for attention with dermatologists, plastic surgeons and day spas. GridBeacon shows where your med spa ranks on Google Maps for each treatment across the area your clients come from, and who they find instead.",
    facts: ["Treatment-level keywords", "Clinic and spa competitors"],
    summary: "Treatment-level searches against clinics, surgeons and day spas.",
    searches: {
      title: "The Searches That Bring Med Spa Clients",
      intro:
        "Clients search by treatment far more than by “med spa”. Each treatment has its own map pack and its own leaders.",
      rows: [
        ["med spa", "The category search.", "Your overall visibility."],
        ["botox", "One of the most searched treatments.", "Whether you win the treatment that fills the calendar."],
        ["lip filler / dermal fillers", "High-value injectable work.", "Visibility for filler clients."],
        ["laser hair removal", "Courses of treatment and repeat visits.", "Reach for recurring revenue."],
        ["microneedling / chemical peel", "Skin treatments offered by many businesses.", "How you compare with facial and skincare competitors."],
        ["body contouring", "High-ticket treatments with fewer providers.", "An opportunity to lead a smaller map pack."],
      ],
      caption: "Track the treatments that bring the most revenue; a med spa can lead one and be invisible for another.",
    },
    setup: {
      title: "How to Set Up Rank Tracking for a Med Spa",
      intro:
        "Med spas are storefronts, and clients will travel further for aesthetic treatments than for a haircut, but usually not across a whole region.",
      cards: [
        { title: "Centre", body: "Your clinic address, where Google places the listing." },
        { title: "Grid", body: "7 × 7, or 9 × 9 in a larger metro." },
        { title: "Radius", body: "3–8 miles, depending on how far clients travel." },
        { title: "Schedule", body: "Weekly while promoting a treatment, monthly otherwise." },
      ],
      budget: `Budget: 6 treatments on a 7 × 7 grid scanned weekly is about ${weekly(6, 49).toLocaleString("en-US")} credits a month, inside the Starter plan's 8,000.`,
    },
    landscape: {
      toc: "Who med spas compete with",
      eyebrow: "The competition",
      title: "Who Med Spas Compete With on Google Maps",
      intro: "Treatment searches bring a wider set of competitors than other med spas:",
      cards: [
        { title: "Other med spas", body: "Independent and chain med spas across your area." },
        { title: "Dermatologists", body: "Medical practices that rank strongly for skin and injectable treatments." },
        { title: "Plastic surgeons", body: "Surgical practices that also offer injectables and body treatments." },
        { title: "Day spas and salons", body: "Businesses competing for facials, peels and laser hair removal." },
        { title: "Laser clinics", body: "Specialists that can lead laser treatment searches." },
        { title: "Injector practitioners", body: "Individual injectors with their own listings." },
      ],
    },
    problems: [
      ["Strong for “med spa”, weak for key treatments", "The profile doesn't signal those treatments", "Services list, treatment photos and pages for each treatment"],
      ["Dermatologists win the injectable searches", "Their profile and prominence match medical searches", "Whether to focus on treatments where you can lead"],
      ["Visible nearby only", "Distance and dense competition", "Reviews that mention treatments, local links"],
      ["A new clinic climbs quickly", "An active launch with fast review growth", "Biggest Competitor Changes and their review pace"],
      ["Drop after a category change", "The primary category signals relevance", "Your primary and secondary categories"],
    ],
    faqs: [
      ["How do med spas track Google Maps rankings?", "Run a geo-grid scan for each main treatment, centred on the clinic. GridBeacon shows your rank at every point and which businesses rank above you."],
      ["Which keywords should a med spa track?", "The treatments that bring the most revenue, such as botox, fillers and laser hair removal, plus “med spa” itself."],
      ["Why do dermatologists outrank our med spa?", "For medical-sounding searches, their profiles often match more closely and carry more prominence. Many med spas do better focusing on treatments where they're the specialist."],
      ["What grid size suits a med spa?", "A 7 × 7 grid with a 3–8 mile radius, or 9 × 9 in a large metro."],
      ["Does GridBeacon handle clinics with several locations?", "Yes. Each location is a separate business, and paid plans have no limit on businesses or keywords."],
    ],
    cta: { title: "See Where Clients Find Your Treatments", body: "Scan your main treatments across your area with 500 free credits." },
    related: ["dentists", "chiropractors", "lawyers"],
  },

  {
    slug: "chiropractors",
    path: "/local-rank-tracking-for-chiropractors",
    plural: "chiropractors",
    titleNoun: "Chiropractors",
    breadcrumb: "Rank Tracking for Chiropractors",
    model: "storefront",
    title: "Google Maps Rank Tracking for Chiropractors | GridBeacon",
    description:
      "Track your chiropractic clinic's Google Maps rankings street by street, for chiropractor and symptom searches, against other clinics and physical therapists.",
    eyebrow: "Rank tracking for chiropractors",
    h1: "Google Maps Rank Tracking for Chiropractors",
    lede:
      "Chiropractic patients want a clinic close by, so rankings change within a mile or two, and many searches start with a symptom rather than “chiropractor”. GridBeacon shows where your clinic ranks across your neighbourhood for each search, and which clinics and therapists patients find first.",
    facts: ["Symptom and treatment keywords", "Tight, dense grids"],
    summary: "Highly local, symptom-led searches in a dense field.",
    searches: {
      title: "The Searches That Bring Chiropractic Patients",
      intro:
        "Patients search for a chiropractor, a symptom or a type of care. Symptom searches bring in physical therapists and massage therapists too.",
      rows: [
        ["chiropractor", "The core search.", "How far your everyday visibility reaches."],
        ["back pain treatment / neck pain", "Symptom-led searches.", "Whether you compete with therapists for patients in pain."],
        ["sports chiropractor", "A specific audience.", "Reach for athletes and active patients."],
        ["prenatal chiropractor / pediatric chiropractor", "Specialist care.", "Visibility in smaller, less crowded map packs."],
        ["spinal decompression", "A specific treatment.", "Whether Google links you to the treatment."],
        ["auto accident chiropractor", "Injury patients, often referred.", "Reach for injury care, if you offer it."],
      ],
      caption: "Symptom searches often favour physical therapists; track them to see where you stand.",
    },
    setup: {
      title: "How to Set Up Rank Tracking for a Chiropractic Clinic",
      intro:
        "Chiropractic clinics are storefronts, and patients rarely travel far for regular visits, so use a tight grid.",
      cards: [
        { title: "Centre", body: "Your clinic address, where Google places the listing." },
        { title: "Grid", body: "7 × 7 as a default." },
        { title: "Radius", body: "1–3 miles in a city; up to 5 miles in suburbs." },
        { title: "Schedule", body: "Weekly while growing, monthly once stable." },
      ],
      budget: `Budget: 6 keywords on a 7 × 7 grid scanned weekly is about ${weekly(6, 49).toLocaleString("en-US")} credits a month, inside the Starter plan's 8,000.`,
    },
    landscape: {
      toc: "Who chiropractors compete with",
      eyebrow: "The competition",
      title: "Who Chiropractors Compete With on Google Maps",
      intro: "A chiropractic map pack is usually dense and mixed:",
      cards: [
        { title: "Nearby clinics", body: "In many areas several clinics sit within a mile, so distance decides a lot." },
        { title: "Physical therapists", body: "They often rank for symptom searches like back pain." },
        { title: "Massage and wellness", body: "Wellness businesses competing for pain-relief searches." },
        { title: "Multi-location groups", body: "Chains and franchises with consistent branding and review programmes." },
        { title: "Practitioner listings", body: "Individual chiropractors with their own profiles." },
        { title: "Injury clinics", body: "Clinics focused on auto accident and injury care." },
      ],
    },
    problems: [
      ["Strong near the clinic, gone a mile away", "Dense competition: another clinic is closer to those patients", "Reviews and content to compete beyond the immediate area"],
      ["Visible for “chiropractor”, absent for symptoms", "Symptom searches favour therapists", "Pages and services for the conditions you treat"],
      ["Your practitioner listing outranks the clinic", "Two of your own listings compete", "Which listing appears where, using the point inspector"],
      ["A chain wins most of the grid", "Prominence from review volume", "Review pace, and where you still lead"],
      ["Sudden drop", "Profile edits or category change", "Recent changes to the profile"],
    ],
    faqs: [
      ["How do chiropractors check their Google Maps rankings?", "A geo-grid scan checks your ranking from many points around the clinic at once. GridBeacon's free checker runs a 3 × 3 grid; a free account includes 500 credits for larger grids."],
      ["What grid size should a chiropractor use?", "A 7 × 7 grid with a 1–3 mile radius in a city, or up to 5 miles in suburbs."],
      ["Should chiropractors track symptom searches?", "Yes. Many patients search for the problem, such as back pain, and those map packs often include physical therapists. Tracking them shows where you compete."],
      ["Why does a clinic with fewer reviews outrank us?", "Distance and relevance matter as well as reviews. A clinic nearer the searcher, or with a profile that matches the search more closely, can rank higher."],
      ["Can I track several clinic locations?", "Yes. Each location is a separate business in GridBeacon, and paid plans have no limit on businesses."],
    ],
    cta: { title: "See Which Clinics Patients Find First", body: "Scan your clinic's main searches neighbourhood by neighbourhood with 500 free credits." },
    related: ["dentists", "med-spas", "lawyers"],
  },
];

export const industryBySlug = (slug: string) => {
  const industry = INDUSTRIES.find((item) => item.slug === slug);
  if (!industry) throw new Error(`Unknown industry: ${slug}`);
  return industry;
};
