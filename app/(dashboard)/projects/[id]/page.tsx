"use client";

import Link from "next/link";
﻿
import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  Building2,
  ChartNoAxesCombined,
  KeyRound,
  Play,
  Radar,
  Trophy,
  LayoutDashboard,
} from "lucide-react";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  useProject,
  useProjectOverview,
} from "@/hooks/use-projects";

import type {
  ProjectRecentActivity,
} from "@/services/projects";

import ProjectPageHeader from "@/components/projects/project-page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import ProjectTabs from "@/components/projects/project-tabs";


export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();

  const projectId = Number(
    params.id
  );

  const projectQuery =
    useProject(projectId);

  const overviewQuery =
    useProjectOverview(projectId);

  const isLoading =
    projectQuery.isLoading
    || overviewQuery.isLoading;

  const hasError =
    projectQuery.error
    || overviewQuery.error;

  const project =
    projectQuery.data;

  const overview =
    overviewQuery.data;

  if (isLoading) {
    return (
      <main className="p-6 lg:p-8">
        <p className="text-sm text-slate-500">
          Loading project dashboard...
        </p>
      </main>
    );
  }

  if (
    hasError
    || !project
    || !overview
  ) {
    return (
      <main className="p-6 lg:p-8">
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-700">
            Unable to load this
            project overview.
          </p>

          <button
            type="button"
            onClick={() => {
              projectQuery.refetch();
              overviewQuery.refetch();
            }}
            className="mt-2 text-xs font-semibold text-red-700 underline"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  const chartData =
    overview.ranking_history
      .filter(
        (item) =>
          item.average_rank
          !== null
      )
      .map((item) => ({
        scanJobId:
          item.scan_job_id,
        date: formatShortDate(
          item.completed_at
        ),
        averageRank:
          item.average_rank,
        visibility:
          item.visibility,
        keyword:
          item.keyword,
      }));

  return (
    <main className="p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <ProjectPageHeader
          icon={LayoutDashboard}
          title={project.name}
          description={`${project.city} • Tracking performance for "${project.keyword}"`}
          actions={
            <Button
              className="gap-2"
              onClick={() =>
                router.push(
                  `/projects/${projectId}/scans`
                )
              }
            >
              <Play className="h-4 w-4" />
              Run Scan
            </Button>
          }
        />

        <ProjectTabs
          projectId={projectId}
        />

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            title="Businesses"
            value={
              overview.business_count
            }
            description={
              overview.business_count === 1
                ? "Active business profile"
                : "Active business profiles"
            }
            icon={Building2}
            variant="blue"
          />

          <StatCard
            title="Keywords"
            value={
              overview.keyword_count
            }
            description="Keywords currently tracked"
            icon={KeyRound}
            variant="default"
          />

          <StatCard
            title="Completed Scans"
            value={
              overview.completed_scans
            }
            description={
              overview.completed_scans > 0
                ? "Successfully completed scans"
                : "No scans completed yet"
            }
            icon={Radar}
            variant="orange"
          />

          <StatCard
            title="Average Rank"
            value={
              overview.average_rank
              ?? "—"
            }
            description={
              overview.average_rank
              === null
                ? "Run a scan to calculate"
                : "Across the latest keyword grids"
            }
            icon={
              ChartNoAxesCombined
            }
            variant="blue"
          />

          <StatCard
            title="Top 3 Rankings"
            value={
              overview.top_3_rankings
            }
            description="Latest grid points ranking in the top 3"
            icon={Trophy}
            variant="green"
          />

          <StatCard
            title="Visibility"
            value={`${formatNumber(
              overview.visibility
            )}%`}
            description={
              overview.total_points > 0
                ? `${overview.ranked_points}/${overview.total_points} latest grid points ranked`
                : "No ranking coverage yet"
            }
            icon={
              ChartNoAxesCombined
            }
            variant="green"
            progress={
              overview.visibility
            }
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">
                  Ranking Performance
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Average grid rank over
                  the last 30 days
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {chartData.length}{" "}
                  {chartData.length === 1
                    ? "scan"
                    : "scans"}
                </span>

                {overview.latest_scan_id && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      router.push(
                        `/projects/${projectId}/scans/${overview.latest_scan_id}`
                      )
                    }
                  >
                    Latest scan
                  </Button>
                )}
              </div>
            </div>

            {chartData.length > 0 ? (
              <div className="mt-6 h-72 w-full">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 10,
                      right: 20,
                      bottom: 5,
                      left: 0,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      fontSize={12}
                    />

                    <YAxis
                      reversed
                      domain={[1, "auto"]}
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                      width={35}
                      fontSize={12}
                    />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="averageRank"
                      name="Average Rank"
                      stroke="#0f172a"
                      strokeWidth={3}
                      dot={{
                        r: 4,
                        fill: "#0f172a",
                      }}
                      activeDot={{
                        r: 6,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="mt-6 flex min-h-72 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
                <div className="text-center">
                  <ChartNoAxesCombined className="mx-auto h-8 w-8 text-slate-300" />

                  <p className="mt-3 text-sm font-medium text-slate-700">
                    No ranking data yet
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Complete a scan to
                    generate the performance
                    chart.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">
              Recent Activity
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest scans for this project
            </p>

            {overview.recent_activity.length > 0 ? (
              <div className="mt-6 space-y-5">
                {overview.recent_activity.map(
                  (item) => (
                    <ActivityItem
                      key={
                        item.scan_job_id
                      }
                      item={item}
                      projectId={
                        projectId
                      }
                    />
                  )
                )}
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center">
                <p className="text-sm font-medium text-slate-700">
                  No scan activity yet
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Start a scan to begin
                  collecting project data.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}


function ActivityItem({
  item,
  projectId,
}: {
  item: ProjectRecentActivity;
  projectId: number;
}) {
  const activity =
    getActivityDisplay(item);

  const content = (
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-semibold text-slate-900">
          {activity.title}
        </p>

        <span
          className={[
            "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
            activity.badgeClass,
          ].join(" ")}
        >
          {item.status}
        </span>
      </div>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {activity.description}
      </p>

      <p className="mt-1 text-[11px] text-slate-400">
        {formatDateTime(
          item.finished_at
          ?? item.created_at
        )}
      </p>
    </div>
  );

  return (
    <div className="flex gap-3">
      <div
        className={[
          "mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full",
          activity.dotClass,
        ].join(" ")}
      />

      {item.status === "completed" ? (
        <Link
          href={`/projects/${projectId}/scans/${item.scan_job_id}`}
          className="min-w-0 transition-opacity hover:opacity-70"
        >
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
}


function getActivityDisplay(
  item: ProjectRecentActivity
) {
  const gridText =
    item.grid_size
      ? `${item.grid_size}×${item.grid_size}`
      : "Grid";

  const radiusText =
    item.radius_miles !== null
    && item.radius_miles !== undefined
      ? `${item.radius_miles} ${
          item.radius_miles === 1
            ? "mile"
            : "miles"
        }`
      : "Unknown radius";

  const subject =
    item.business_name
    ?? item.keyword
    ?? "Project scan";

  if (item.status === "completed") {
    return {
      title:
        `Scan #${item.scan_job_id} completed`,
      description:
        `${subject} • ${gridText} • ${radiusText}`,
      dotClass:
        "bg-emerald-500",
      badgeClass:
        "bg-emerald-50 text-emerald-700",
    };
  }

  if (item.status === "running") {
    return {
      title:
        `Scan #${item.scan_job_id} is running`,
      description:
        `${subject} • ${gridText} • ${radiusText}`,
      dotClass:
        "bg-blue-500",
      badgeClass:
        "bg-blue-50 text-blue-700",
    };
  }

  if (item.status === "queued") {
    return {
      title:
        `Scan #${item.scan_job_id} is queued`,
      description:
        `${subject} • ${gridText} • ${radiusText}`,
      dotClass:
        "bg-amber-500",
      badgeClass:
        "bg-amber-50 text-amber-700",
    };
  }

  return {
    title:
      `Scan #${item.scan_job_id} failed`,
    description:
      `${subject} • ${gridText} • ${radiusText}`,
    dotClass:
      "bg-red-500",
    badgeClass:
      "bg-red-50 text-red-700",
  };
}


function formatShortDate(
  value: string
) {
  const date = new Date(value);

  if (
    Number.isNaN(date.getTime())
  ) {
    return value;
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric",
    }
  ).format(date);
}


function formatDateTime(
  value: string
) {
  const date = new Date(value);

  if (
    Number.isNaN(date.getTime())
  ) {
    return value;
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }
  ).format(date);
}


function formatNumber(
  value: number
) {
  return Number.isInteger(value)
    ? value.toString()
    : value.toFixed(1);
}
