/*
 * The tutorial library, published on https://www.youtube.com/@GridBeacon.
 *
 * Ids, lengths and dates come from YouTube. Summaries are written here,
 * not copied: YouTube descriptions can name the businesses in a recording.
 * Adding a tutorial means adding one line to a group.
 */

export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@GridBeacon";

export type Tutorial = {
  id: string;
  title: string;
  summary: string;
  seconds: number;
  uploadDate: string;
  paid?: boolean;
};

export type TutorialGroup = {
  id: string;
  title: string;
  intro: string;
  tutorials: Tutorial[];
};

export const TUTORIAL_GROUPS: TutorialGroup[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    intro: "Set up your business and run your first scan.",
    tutorials: [
      {
        id: "9aokku35aEE",
        title: "How to Run Your First Google Maps Ranking Scan",
        summary: "Go from a new account to your first ranking scan and see where your business ranks across your service area.",
        seconds: 248,
        uploadDate: "2026-10-29T08:36:14-07:00",
      },
      {
        id: "K4E1nJ7XxFw",
        title: "How to Add a Business and Keywords",
        summary: "Add a business from its Google Maps listing and choose the keywords it should rank for.",
        seconds: 225,
        uploadDate: "2026-10-29T09:29:19-07:00",
      },
      {
        id: "_zGxBfapTGk",
        title: "How to Add a Service-Area Business",
        summary: "Add a business with no storefront using its Google Maps share link, then set the area you serve.",
        seconds: 289,
        uploadDate: "2026-10-30T21:04:51-07:00",
      },
      {
        id: "KOrOeOMwpOU",
        title: "Grid Size and Radius Explained",
        summary: "What grid size and radius mean, how they change your results and how they affect credits.",
        seconds: 212,
        uploadDate: "2026-10-29T10:21:31-07:00",
      },
      {
        id: "0Rkc0Y3-0WA",
        title: "Rings vs Square Grids: Which Scan Should You Use?",
        summary: "The difference between the two scan shapes, and when to use each one.",
        seconds: 164,
        uploadDate: "2026-10-30T14:22:32-07:00",
      },
      {
        id: "qRcTKr9FGyw",
        title: "How to Add and Manage Tracked Keywords",
        summary: "Use the Keywords page to search, sort and manage the keywords you track for a business.",
        seconds: 147,
        uploadDate: "2026-10-30T20:04:41-07:00",
      },
    ],
  },
  {
    id: "reading-results",
    title: "Reading Your Results",
    intro: "Understand a scan and decide what to work on next.",
    tutorials: [
      {
        id: "N03Q_BaraxU",
        title: "How to Read the Heatmap",
        summary: "Rank colors, Visibility, Average Rank and Top 3, and how to spot your strong and weak areas.",
        seconds: 207,
        uploadDate: "2026-10-29T10:58:24-07:00",
      },
      {
        id: "hYirlvmgccI",
        title: "How to Analyze Your Google Maps Competitors",
        summary: "See who ranks around you, view a competitor's grid and compare them with your business.",
        seconds: 183,
        uploadDate: "2026-10-30T04:36:49-07:00",
      },
      {
        id: "Erqc2a77bXI",
        title: "How to Track Your Google Maps Ranking History",
        summary: "Step through past scans and see which points moved up or down.",
        seconds: 174,
        uploadDate: "2026-10-30T06:25:41-07:00",
      },
      {
        id: "zbW8rM0I7mM",
        title: "Find Striking Distance Opportunities (Ranks 4–10)",
        summary: "Find the points where you rank 4 to 10, close enough to reach the top 3.",
        seconds: 187,
        uploadDate: "2026-10-31T07:20:18-07:00",
      },
      {
        id: "fgKmQEOksmk",
        title: "Rescan and Compare Two Scans",
        summary: "Repeat a scan and compare the two side by side to see exactly what changed.",
        seconds: 175,
        uploadDate: "2026-10-30T23:34:05-07:00",
      },
    ],
  },
  {
    id: "keywords-credits",
    title: "Keywords and Credits",
    intro: "Choose what to track and plan what it costs.",
    tutorials: [
      {
        id: "-UlB4pfJ0QA",
        title: "Find the Right Keywords with Keyword Explorer",
        summary: "Find new keyword ideas and pick the ones worth tracking.",
        seconds: 206,
        uploadDate: "2026-10-31T06:37:06-07:00",
        paid: true,
      },
      {
        id: "3g5cfuF86LI",
        title: "Quick Scan: Run a Scan from Anywhere",
        summary: "Set up a scan for any keyword from one page and see what it costs before you run it.",
        seconds: 186,
        uploadDate: "2026-10-30T22:29:19-07:00",
      },
      {
        id: "05D8ZgxUPGc",
        title: "Understanding Credits and Budgeting Scans",
        summary: "How credits work and how to plan your scans before anything is spent.",
        seconds: 237,
        uploadDate: "2026-10-30T23:08:08-07:00",
      },
    ],
  },
  {
    id: "reports-automation",
    title: "Reports, Automation and Agencies",
    intro: "Share your results and keep tracking without extra work.",
    tutorials: [
      {
        id: "mZjG64AAepQ",
        title: "Turn a Scan into a Client-Ready PDF Report",
        summary: "Download a PDF report from any scan and see what it includes.",
        seconds: 148,
        uploadDate: "2026-10-30T15:23:43-07:00",
      },
      {
        id: "KS5RfZ0B4eE",
        title: "Keyword Reports, Location Reports and Heatmap Explorer",
        summary: "Compare a keyword across locations, a location across keywords, then inspect a single point.",
        seconds: 344,
        uploadDate: "2026-10-30T21:51:11-07:00",
      },
      {
        id: "lF6fjES1qog",
        title: "Automate Rank Tracking with Scheduled Scans",
        summary: "Set a keyword to scan on its own, and choose how often it runs.",
        seconds: 159,
        uploadDate: "2026-10-30T14:59:31-07:00",
        paid: true,
      },
      {
        id: "6HIIRaNH3o0",
        title: "GridBeacon for Local SEO Agencies",
        summary: "Keep every client in one workspace, from the Businesses list to reports and team access.",
        seconds: 224,
        uploadDate: "2026-10-30T18:49:07-07:00",
      },
    ],
  },
];

export const ALL_TUTORIALS = TUTORIAL_GROUPS.flatMap(
  (group) => group.tutorials,
);

export function clockLength(seconds: number) {
  const remainder = String(seconds % 60).padStart(2, "0");

  return `${Math.floor(seconds / 60)}:${remainder}`;
}

/* ISO 8601, as VideoObject.duration expects. */
export function isoLength(seconds: number) {
  return `PT${Math.floor(seconds / 60)}M${seconds % 60}S`;
}
