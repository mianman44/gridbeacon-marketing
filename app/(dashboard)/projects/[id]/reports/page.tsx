"use client";

import {
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Download,
  Eye,
  FileText,
  MapPinned,
  ScanLine,
  Trophy,
  Users,
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

import PageSkeleton from "@/components/ui/PageSkeleton";
import {
  useProject,
  useProjectCompetitors,
  useProjectOverview,
} from "@/hooks/use-projects";

type ReportRange = 7 | 30;
type KeywordFilter = "all" | number;

function formatRank(
  value: number | null | undefined
) {
  if (
    value === null
    || value === undefined
  ) {
    return "—";
  }

  return Number(value).toFixed(1);
}

function formatPercentage(
  value: number | null | undefined
) {
  if (
    value === null
    || value === undefined
  ) {
    return "—";
  }

  return `${Number(value).toFixed(1)}%`;
}

function formatDate(
  value: string | null | undefined
) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function ReportsPage() {
  const params = useParams<{
    id: string;
  }>();

  const projectId = Number(params.id);

  const [rangeDays, setRangeDays] =
    useState<ReportRange>(30);

  const [
    selectedKeyword,
    setSelectedKeyword,
  ] = useState<KeywordFilter>("all");

  const keywordId =
    selectedKeyword === "all"
      ? undefined
      : selectedKeyword;

  const projectQuery =
    useProject(projectId);

  const overviewQuery =
    useProjectOverview(projectId);

  const competitorsQuery =
    useProjectCompetitors(
      projectId,
      keywordId
    );

  const history = useMemo(() => {
    const rows =
      overviewQuery.data
        ?.ranking_history ?? [];

    const cutoff =
      Date.now()
      - rangeDays
      * 24
      * 60
      * 60
      * 1000;

    return rows
      .filter((row) => {
        if (!row.completed_at) {
          return false;
        }

        const timestamp = new Date(
          row.completed_at
        ).getTime();

        if (
          Number.isNaN(timestamp)
          || timestamp < cutoff
        ) {
          return false;
        }

        if (
          selectedKeyword !== "all"
          && row.keyword_id
          !== selectedKeyword
        ) {
          return false;
        }

        return true;
      })
      .sort(
        (a, b) =>
          new Date(
            a.completed_at
          ).getTime()
          - new Date(
            b.completed_at
          ).getTime()
      );
  }, [
    overviewQuery.data,
    rangeDays,
    selectedKeyword,
  ]);

  const latestKeywordRows =
    useMemo(() => {
      const latest = new Map<
        number,
        (typeof history)[number]
      >();

      for (const row of history) {
        latest.set(
          row.keyword_id,
          row
        );
      }

      return Array.from(
        latest.values()
      ).sort((a, b) =>
        a.keyword.localeCompare(
          b.keyword
        )
      );
    }, [history]);

  const metrics = useMemo(() => {
    let weightedRankTotal = 0;
    let rankWeight = 0;
    let rankedPoints = 0;
    let totalPoints = 0;
    let top3 = 0;

    for (
      const row
      of latestKeywordRows
    ) {
      const weight = Math.max(
        Number(
          row.ranked_points ?? 0
        ),
        1
      );

      if (
        row.average_rank !== null
        && row.average_rank
        !== undefined
      ) {
        weightedRankTotal +=
          Number(row.average_rank)
          * weight;

        rankWeight += weight;
      }

      rankedPoints += Number(
        row.ranked_points ?? 0
      );

      totalPoints += Number(
        row.total_points ?? 0
      );

      top3 += Number(
        row.top_3_rankings ?? 0
      );
    }

    const averageRank =
      rankWeight > 0
        ? weightedRankTotal
          / rankWeight
        : null;

    const visibility =
      totalPoints > 0
        ? (
            rankedPoints
            / totalPoints
          )
          * 100
        : null;

    const rankedHistory =
      history.filter(
        (row) =>
          row.average_rank !== null
          && row.average_rank
          !== undefined
      );

    const bestRank =
      rankedHistory.length > 0
        ? Math.min(
            ...rankedHistory.map(
              (row) =>
                Number(
                  row.average_rank
                )
            )
          )
        : null;

    return {
      completedScans:
        history.length,
      averageRank,
      bestRank,
      visibility,
      top3,
      rankedPoints,
      totalPoints,
    };
  }, [
    history,
    latestKeywordRows,
  ]);

  const chartData = useMemo(
    () =>
      history
        .filter(
          (row) =>
            row.average_rank
            !== null
            && row.average_rank
            !== undefined
        )
        .map((row) => {
          const date = new Date(
            row.completed_at
          );

          return {
            timestamp:
              date.getTime(),
            label:
              date.toLocaleString(
                undefined,
                {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                }
              ),
            rank: Number(
              Number(
                row.average_rank
              ).toFixed(1)
            ),
            keyword: row.keyword,
          };
        }),
    [history]
  );

  const keywordOptions =
    competitorsQuery.data
      ?.keywords ?? [];

  const selectedKeywordLabel =
    selectedKeyword === "all"
      ? "All keywords"
      : keywordOptions.find(
          (item) =>
            item.id
            === selectedKeyword
        )?.keyword
        ?? "Selected keyword";

  const topCompetitors =
    competitorsQuery.data
      ?.competitors
      .slice(0, 8)
      ?? [];

  const recentActivity =
    overviewQuery.data
      ?.recent_activity
      .slice(0, 6)
      ?? [];

  const loading =
    projectQuery.isLoading
    || overviewQuery.isLoading
    || competitorsQuery.isLoading;

  const failed =
    projectQuery.isError
    || overviewQuery.isError
    || competitorsQuery.isError;

  if (loading) {
    return <PageSkeleton />;
  }

  if (
    failed
    || !projectQuery.data
    || !overviewQuery.data
    || !competitorsQuery.data
  ) {
    return (
      <div className="space-y-5 px-4 pb-6 sm:px-5 lg:px-6">
        <Link
          href={`/projects/${projectId}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to project
        </Link>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          The report could not be loaded.
        </div>
      </div>
    );
  }

  const project =
    projectQuery.data;

  const generatedAt =
    new Date().toLocaleString(
      undefined,
      {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }
    );

  return (
    <>
      <style>{`
        @media print {
          aside,
          header {
            display: none !important;
          }

          body {
            background: white !important;
          }

          main {
            margin-left: 0 !important;
            padding: 0 !important;
          }

          .report-actions {
            display: none !important;
          }

          .report-shell {
            padding: 0 !important;
          }

          .report-document {
            border: 0 !important;
            box-shadow: none !important;
          }

          a {
            color: inherit !important;
            text-decoration: none !important;
          }
        }
      `}</style>

      <div className="report-shell space-y-5 px-4 pb-6 sm:px-5 lg:px-6">
        <div className="report-actions flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link
              href={`/projects/${projectId}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to project
            </Link>

            <div className="mt-3 flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-500 text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/40">
                <FileText className="h-5 w-5" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-950">
                  Reports
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Review and export a performance report for this project.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              window.print()
            }
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            <Download className="h-4 w-4" />
            Print / Save PDF
          </button>
        </div>

        <section className="report-actions rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Keyword
              </span>

              <select
                value={
                  selectedKeyword
                }
                onChange={(event) => {
                  const value =
                    event.target.value;

                  setSelectedKeyword(
                    value === "all"
                      ? "all"
                      : Number(value)
                  );
                }}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="all">
                  All keywords
                </option>

                {keywordOptions.map(
                  (keyword) => (
                    <option
                      key={keyword.id}
                      value={keyword.id}
                    >
                      {keyword.keyword}
                    </option>
                  )
                )}
              </select>
            </label>

            <div className="space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Reporting period
              </span>

              <div className="flex h-11 rounded-xl border border-slate-200 bg-slate-50 p-1">
                {[7, 30].map(
                  (days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() =>
                        setRangeDays(
                          days as ReportRange
                        )
                      }
                      className={`flex-1 rounded-lg text-sm font-medium transition ${
                        rangeDays
                        === days
                          ? "bg-white text-slate-950 shadow-sm"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Last {days} days
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        <article className="report-document space-y-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <header className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <FileText className="h-6 w-6" />
              </div>

              <div>
                <p className="text-sm font-semibold text-blue-600">
                  GridBeacon
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-950">
                  Local Ranking Report
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {project.name}
                </p>
              </div>
            </div>

            <div className="text-sm text-slate-500 sm:text-right">
              <p>
                <span className="font-medium text-slate-700">
                  Location:
                </span>{" "}
                {project.city || "—"}
              </p>

              <p className="mt-1">
                <span className="font-medium text-slate-700">
                  Keyword:
                </span>{" "}
                {selectedKeywordLabel}
              </p>

              <p className="mt-1">
                <span className="font-medium text-slate-700">
                  Period:
                </span>{" "}
                Last {rangeDays} days
              </p>

              <p className="mt-1">
                <span className="font-medium text-slate-700">
                  Generated:
                </span>{" "}
                {generatedAt}
              </p>
            </div>
          </header>

          <section>
            <div className="mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-slate-500" />

              <h3 className="font-semibold text-slate-950">
                Performance Summary
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                title="Average Rank"
                value={formatRank(
                  metrics.averageRank
                )}
                description={`Best: ${formatRank(
                  metrics.bestRank
                )}`}
                icon={
                  <MapPinned className="h-5 w-5" />
                }
              />

              <MetricCard
                title="Visibility"
                value={formatPercentage(
                  metrics.visibility
                )}
                description={`${metrics.rankedPoints}/${metrics.totalPoints} ranked points`}
                icon={
                  <Eye className="h-5 w-5" />
                }
              />

              <MetricCard
                title="Top 3 Rankings"
                value={String(
                  metrics.top3
                )}
                description="Latest keyword scans"
                icon={
                  <Trophy className="h-5 w-5" />
                }
              />

              <MetricCard
                title="Completed Scans"
                value={String(
                  metrics.completedScans
                )}
                description={`Last ${rangeDays} days`}
                icon={
                  <ScanLine className="h-5 w-5" />
                }
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <CalendarDays className="h-5 w-5" />
              </div>

              <div>
                <h3 className="font-semibold text-slate-950">
                  Ranking Trend
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Lower ranking numbers indicate better performance.
                </p>
              </div>
            </div>

            <div className="mt-5 h-72">
              {chartData.length > 0 ? (
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 10,
                      right: 15,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="label"
                      tickLine={false}
                      axisLine={false}
                      minTickGap={30}
                      fontSize={11}
                    />

                    <YAxis
                      reversed
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                      width={35}
                      fontSize={11}
                    />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="rank"
                      name="Average rank"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
                  No ranking history found for this period.
                </div>
              )}
            </div>
          </section>

          <ReportTable
            title="Keyword Performance"
            description="Latest completed ranking result for each keyword."
            headers={[
              "Keyword",
              "Average Rank",
              "Visibility",
              "Top 3",
              "Ranked Points",
              "Completed",
            ]}
          >
            {latestKeywordRows.length > 0 ? (
              latestKeywordRows.map(
                (row) => (
                  <tr
                    key={row.keyword_id}
                    className="border-t border-slate-100"
                  >
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {row.keyword}
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                      {formatRank(
                        row.average_rank
                      )}
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                      {formatPercentage(
                        row.visibility
                      )}
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                      {
                        row.top_3_rankings
                      }
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                      {row.ranked_points}/
                      {row.total_points}
                    </td>

                    <td className="px-4 py-3 text-slate-500">
                      {formatDate(
                        row.completed_at
                      )}
                    </td>
                  </tr>
                )
              )
            ) : (
              <EmptyTableRow
                columns={6}
                message="No keyword performance data found."
              />
            )}
          </ReportTable>

          <ReportTable
            title="Top Competitors"
            description="Strongest competitors found across the selected latest scans."
            headers={[
              "#",
              "Business",
              "Average Position",
              "Best",
              "Coverage",
              "Reviews",
            ]}
          >
            {topCompetitors.length > 0 ? (
              topCompetitors.map(
                (
                  competitor,
                  index
                ) => (
                  <tr
                    key={
                      competitor.place_id
                      ?? competitor.id
                    }
                    className="border-t border-slate-100"
                  >
                    <td className="px-4 py-3 font-semibold text-slate-500">
                      {index + 1}
                    </td>

                    <td className="px-4 py-3 font-medium text-slate-900">
                      {
                        competitor.business_name
                      }
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                      {
                        competitor.average_position
                      }
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                      #
                      {
                        competitor.best_position
                      }
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                      {
                        competitor.coverage_percentage
                      }
                      %
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                      {
                        competitor.reviews
                        ?? "—"
                      }
                    </td>
                  </tr>
                )
              )
            ) : (
              <EmptyTableRow
                columns={6}
                message="No competitor data found."
              />
            )}
          </ReportTable>

          <ReportTable
            title="Recent Scan Activity"
            description="Latest scan jobs recorded for this project."
            headers={[
              "Scan",
              "Keyword",
              "Status",
              "Grid",
              "Radius",
              "Date",
            ]}
          >
            {recentActivity.length > 0 ? (
              recentActivity.map(
                (activity) => (
                  <tr
                    key={
                      activity.scan_job_id
                    }
                    className="border-t border-slate-100"
                  >
                    <td className="px-4 py-3 font-medium text-slate-900">
                      #
                      {
                        activity.scan_job_id
                      }
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                      {activity.keyword
                        ?? "—"}
                    </td>

                    <td className="px-4 py-3 capitalize text-slate-700">
                      {
                        activity.status
                      }
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                      {activity.grid_size
                        ? `${activity.grid_size}×${activity.grid_size}`
                        : "—"}
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                      {activity.radius_miles
                        ?? "—"}{" "}
                      miles
                    </td>

                    <td className="px-4 py-3 text-slate-500">
                      {formatDate(
                        activity.finished_at
                        ?? activity.created_at
                      )}
                    </td>
                  </tr>
                )
              )
            ) : (
              <EmptyTableRow
                columns={6}
                message="No recent scans found."
              />
            )}
          </ReportTable>

          <footer className="flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Generated by GridBeacon Local Rank Intelligence.
            </p>

            <p>
              Project ID: {projectId}
            </p>
          </footer>
        </article>
      </div>
    </>
  );
}

function MetricCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-950">
            {value}
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm">
          {icon}
        </div>
      </div>

      <p className="mt-2 text-xs text-slate-500">
        {description}
      </p>
    </div>
  );
}

function ReportTable({
  title,
  description,
  headers,
  children,
}: {
  title: string;
  description: string;
  headers: string[];
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200">
      <div className="px-5 py-4">
        <h3 className="font-semibold text-slate-950">
          {title}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {headers.map(
                (header) => (
                  <th
                    key={header}
                    className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>{children}</tbody>
        </table>
      </div>
    </section>
  );
}

function EmptyTableRow({
  columns,
  message,
}: {
  columns: number;
  message: string;
}) {
  return (
    <tr className="border-t border-slate-100">
      <td
        colSpan={columns}
        className="px-5 py-10 text-center text-sm text-slate-500"
      >
        {message}
      </td>
    </tr>
  );
}
