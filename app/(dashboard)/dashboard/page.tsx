"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import type {
  LucideIcon,
} from "lucide-react";
import {
  ArrowUpRight,
  Building2,
  FolderKanban,
  KeyRound,
  LayoutDashboard,
  Radar,
  Sparkles,
} from "lucide-react";

import PageSkeleton from "@/components/ui/PageSkeleton";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RankingTrend from "@/components/dashboard/RankingTrend";
import RecentScans from "@/components/dashboard/RecentScans";

import {
  getDashboardSummary,
  getWorkspaceRankingHistory,
  type DashboardSummary,
  type WorkspaceRankingHistoryPoint,
} from "@/services/dashboard";

import {
  getRecentScans,
  type RecentScan,
} from "@/services/scans";

export default function DashboardPage() {
  const [summary, setSummary] =
    useState<DashboardSummary | null>(null);

  const [recentScans, setRecentScans] =
    useState<RecentScan[]>([]);

  const [history, setHistory] =
    useState<WorkspaceRankingHistoryPoint[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const [
          summaryData,
          scansData,
          historyData,
        ] = await Promise.all([
          getDashboardSummary(),
          getRecentScans(10),
          getWorkspaceRankingHistory(30),
        ]);

        setSummary(summaryData);
        setRecentScans(scansData);
        setHistory(historyData);
      } catch (loadError) {
        console.error(
          "Failed to load dashboard:",
          loadError
        );

        setError(
          "Failed to load dashboard."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const completedRecentScans =
    useMemo(
      () =>
        recentScans.filter(
          (scan) =>
            scan.status === "completed"
        ).length,
      [recentScans]
    );

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <PageSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 lg:p-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm font-medium text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate overflow-hidden p-6 lg:p-8">
      <div className="pointer-events-none absolute -left-32 top-20 -z-10 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 top-96 -z-10 h-96 w-96 rounded-full bg-violet-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-[1600px] space-y-6">
        <section className="relative overflow-hidden rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 px-6 py-7 text-white shadow-[0_24px_70px_rgba(79,70,229,0.22)] sm:px-8 sm:py-8">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />

          <div className="pointer-events-none absolute bottom-0 left-1/3 h-36 w-72 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_35%)]" />

          <div className="relative flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-indigo-100 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" />
                Workspace intelligence
              </div>

              <div className="mt-5 flex items-start gap-4">
                <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-xl backdrop-blur sm:flex">
                  <LayoutDashboard className="h-7 w-7" />
                </div>

                <div>
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Performance command center
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-indigo-100/80 sm:text-base">
                    Monitor your projects, keyword rankings,
                    scan activity and local search visibility
                    from one premium workspace.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
                <p className="text-xs font-medium uppercase tracking-wider text-indigo-200">
                  Recent activity
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  {completedRecentScans} completed scans
                </p>
              </div>

              <Link
                href="/projects"
                className="inline-flex h-12 items-center gap-2 rounded-2xl bg-white px-5 text-sm font-bold text-indigo-700 shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:bg-indigo-50"
              >
                Open projects
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <DashboardStats
          totalProjects={
            summary?.total_projects ?? 0
          }
          totalKeywords={
            summary?.total_keywords ?? 0
          }
          averageRank={
            summary?.average_rank ?? null
          }
          top10Rankings={
            summary?.top_10_rankings ?? 0
          }
        />

        <RankingTrend history={history} />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(360px,0.8fr)]">
          <section className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)] backdrop-blur">
            <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-indigo-200/30 blur-3xl" />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-500">
                  Shortcuts
                </p>

                <h2 className="mt-2 text-xl font-bold text-slate-950">
                  Quick Actions
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Jump directly into your most common workflows.
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>

            <div className="relative mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <QuickActionCard
                href="/projects"
                title="Projects"
                description="Manage ranking projects"
                icon={FolderKanban}
                tone="blue"
              />

              <QuickActionCard
                href="/projects"
                title="Businesses"
                description="Manage business profiles"
                icon={Building2}
                tone="green"
              />

              <QuickActionCard
                href="/projects"
                title="Keywords"
                description="Manage tracked searches"
                icon={KeyRound}
                tone="amber"
              />

              <QuickActionCard
                href="/projects"
                title="Scans"
                description="Run ranking scans"
                icon={Radar}
                tone="violet"
              />
            </div>
          </section>

          <RecentScans scans={recentScans} />
        </div>
      </div>
    </div>
  );
}

type QuickActionTone =
  | "blue"
  | "green"
  | "amber"
  | "violet";

const quickActionStyles: Record<
  QuickActionTone,
  {
    icon: string;
    glow: string;
  }
> = {
  blue: {
    icon:
      "from-blue-500 to-indigo-600",
    glow:
      "group-hover:bg-blue-300/25",
  },
  green: {
    icon:
      "from-emerald-500 to-teal-600",
    glow:
      "group-hover:bg-emerald-300/25",
  },
  amber: {
    icon:
      "from-amber-400 to-orange-600",
    glow:
      "group-hover:bg-amber-300/25",
  },
  violet: {
    icon:
      "from-violet-500 to-fuchsia-600",
    glow:
      "group-hover:bg-violet-300/25",
  },
};

function QuickActionCard({
  href,
  title,
  description,
  icon: Icon,
  tone,
}: {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tone: QuickActionTone;
}) {
  const styles =
    quickActionStyles[tone];

  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10"
    >
      <div
        className={[
          "pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-transparent blur-2xl transition",
          styles.glow,
        ].join(" ")}
      />

      <div
        className={[
          "relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110",
          styles.icon,
        ].join(" ")}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="relative mt-5 flex items-end justify-between gap-3">
        <div>
          <h3 className="font-bold text-slate-950">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-5 text-slate-500">
            {description}
          </p>
        </div>

        <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-600" />
      </div>
    </Link>
  );
}
