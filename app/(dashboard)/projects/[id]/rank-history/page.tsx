"use client";

import {
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  Eye,
  History,
  Minus,
  RotateCw,
  ScanLine,
  Trophy,
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
import { useProjectOverview } from "@/hooks/use-projects";

type RangeDays = 7 | 30;
type KeywordFilter = "all" | number;

function formatRank(
  rank: number | null | undefined
) {
  if (rank === null || rank === undefined) {
    return "—";
  }

  return Number(rank).toFixed(1);
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

export default function RankHistoryPage() {
  const params = useParams<{
    id: string;
  }>();

  const projectId = Number(params.id);

  const [rangeDays, setRangeDays] =
    useState<RangeDays>(30);

  const [
    selectedKeyword,
    setSelectedKeyword,
  ] = useState<KeywordFilter>("all");

  const {
    data: overview,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useProjectOverview(projectId);

  const history =
    overview?.ranking_history ?? [];

  const keywordOptions = useMemo(() => {
    const keywords = new Map<
      number,
      string
    >();

    for (const item of history) {
      keywords.set(
        item.keyword_id,
        item.keyword
      );
    }

    return Array.from(
      keywords.entries()
    )
      .map(([id, keyword]) => ({
        id,
        keyword,
      }))
      .sort((a, b) =>
        a.keyword.localeCompare(
          b.keyword
        )
      );
  }, [history]);

  const filteredHistory = useMemo(() => {
    const cutoff =
      Date.now()
      - rangeDays
      * 24
      * 60
      * 60
      * 1000;

    return history
      .filter((item) => {
        if (!item.completed_at) {
          return false;
        }

        const timestamp = new Date(
          item.completed_at
        ).getTime();

        if (
          Number.isNaN(timestamp)
          || timestamp < cutoff
        ) {
          return false;
        }

        if (
          selectedKeyword !== "all"
          && item.keyword_id
          !== selectedKeyword
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        return (
          new Date(
            a.completed_at
          ).getTime()
          - new Date(
            b.completed_at
          ).getTime()
        );
      });
  }, [
    history,
    rangeDays,
    selectedKeyword,
  ]);

  const chartData = useMemo(() => {
    return filteredHistory
      .filter(
        (item) =>
          item.average_rank !== null
          && item.average_rank !== undefined
          && item.completed_at
      )
      .map((item) => {
        const date = new Date(
          item.completed_at
        );

        return {
          timestamp: date.getTime(),
          date: date.toLocaleString(
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
              item.average_rank
            ).toFixed(1)
          ),
        };
      })
      .sort(
        (a, b) =>
          a.timestamp - b.timestamp
      );
  }, [filteredHistory]);

  const metrics = useMemo(() => {
    const rankedRows =
      filteredHistory.filter(
        (item) =>
          item.average_rank !== null
          && item.average_rank
          !== undefined
      );

    const first =
      rankedRows.length > 0
        ? rankedRows[0]
        : null;

    const latest =
      rankedRows.length > 0
        ? rankedRows[
            rankedRows.length - 1
          ]
        : null;

    const currentRank =
      latest?.average_rank ?? null;

    const bestRank =
      rankedRows.length > 0
        ? Math.min(
            ...rankedRows.map(
              (item) =>
                Number(
                  item.average_rank
                )
            )
          )
        : null;

    const rankChange =
      first?.average_rank !== null
      && first?.average_rank
        !== undefined
      && currentRank !== null
      && currentRank !== undefined
        ? Number(
            (
              Number(
                first.average_rank
              )
              - Number(currentRank)
            ).toFixed(1)
          )
        : null;

    return {
      totalScans:
        filteredHistory.length,
      currentRank,
      bestRank,
      rankChange,
      visibility:
        latest?.visibility ?? null,
      top3:
        latest?.top_3_rankings ?? 0,
      rankedPoints:
        latest?.ranked_points ?? 0,
      totalPoints:
        latest?.total_points ?? 0,
    };
  }, [filteredHistory]);

  const tableRows = useMemo(
    () =>
      [...filteredHistory].sort(
        (a, b) =>
          new Date(
            b.completed_at
          ).getTime()
          - new Date(
            a.completed_at
          ).getTime()
      ),
    [filteredHistory]
  );

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (isError || !overview) {
    return (
      <div className="space-y-5 px-4 pb-6 sm:px-5 lg:px-6">
        <Link
          href={`/projects/${projectId}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to project
        </Link>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="font-medium text-red-800">
            Rank history could not be loaded.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 px-4 pb-6 sm:px-5 lg:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
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
              <History className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-950">
                Rank History
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Track ranking movement across completed grid scans.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RotateCw
            className={`h-4 w-4 ${
              isFetching
                ? "animate-spin"
                : ""
            }`}
          />
          Refresh
        </button>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">
              Keyword
            </span>

            <select
              value={selectedKeyword}
              onChange={(event) => {
                const value =
                  event.target.value;

                setSelectedKeyword(
                  value === "all"
                    ? "all"
                    : Number(value)
                );
              }}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">
                All keywords
              </option>

              {keywordOptions.map(
                (item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.keyword}
                  </option>
                )
              )}
            </select>
          </label>

          <div className="space-y-2">
            <span className="text-sm font-medium text-slate-700">
              Date range
            </span>

            <div className="flex h-11 rounded-xl border border-slate-200 bg-slate-50 p-1">
              {[7, 30].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() =>
                    setRangeDays(
                      days as RangeDays
                    )
                  }
                  className={`flex-1 rounded-lg text-sm font-medium transition ${
                    rangeDays === days
                      ? "bg-white text-slate-950 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Last {days} days
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Completed Scans"
          value={String(
            metrics.totalScans
          )}
          description={`Last ${rangeDays} days`}
          icon={
            <ScanLine className="h-5 w-5" />
          }
        />

        <MetricCard
          title="Current Avg. Rank"
          value={formatRank(
            metrics.currentRank
          )}
          description={
            metrics.rankChange === null
              ? "No comparison available"
              : metrics.rankChange > 0
                ? `${metrics.rankChange.toFixed(1)} positions improved`
                : metrics.rankChange < 0
                  ? `${Math.abs(
                      metrics.rankChange
                    ).toFixed(1)} positions declined`
                  : "No rank movement"
          }
          icon={
            metrics.rankChange === null
            || metrics.rankChange === 0
              ? (
                <Minus className="h-5 w-5" />
              )
              : metrics.rankChange > 0
                ? (
                  <ArrowUpRight className="h-5 w-5" />
                )
                : (
                  <ArrowDownRight className="h-5 w-5" />
                )
          }
        />

        <MetricCard
          title="Best Avg. Rank"
          value={formatRank(
            metrics.bestRank
          )}
          description={`Top 3 points: ${metrics.top3}`}
          icon={
            <Trophy className="h-5 w-5" />
          }
        />

        <MetricCard
          title="Visibility"
          value={
            metrics.visibility === null
            || metrics.visibility
              === undefined
              ? "—"
              : `${Number(
                  metrics.visibility
                ).toFixed(1)}%`
          }
          description={`${metrics.rankedPoints} of ${metrics.totalPoints} grid points ranked`}
          icon={
            <Eye className="h-5 w-5" />
          }
        />
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <History className="h-5 w-5" />
          </div>

          <div>
            <h2 className="font-semibold text-slate-950">
              Average Rank Trend
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Lower ranking numbers indicate better performance.
            </p>
          </div>
        </div>

        <div className="mt-6 h-80">
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
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                />

                <YAxis
                  reversed
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  width={35}
                  fontSize={12}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="rank"
                  name="Average rank"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
              <div className="text-center">
                <History className="mx-auto h-8 w-8 text-slate-400" />

                <p className="mt-3 font-medium text-slate-700">
                  No ranking history found
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Complete a scan to start tracking movement.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-950">
            Scan History
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Review the ranking metrics from each completed scan.
          </p>
        </div>

        {tableRows.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  {[
                    "Date",
                    "Keyword",
                    "Avg. Rank",
                    "Visibility",
                    "Top 3",
                    "Ranked Points",
                    "",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {tableRows.map(
                  (item) => (
                    <tr
                      key={
                        item.scan_job_id
                      }
                      className="hover:bg-slate-50"
                    >
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                        {formatDate(
                          item.completed_at
                        )}
                      </td>

                      <td className="max-w-xs px-5 py-4">
                        <p className="truncate text-sm font-medium text-slate-900">
                          {item.keyword}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-900">
                        {formatRank(
                          item.average_rank
                        )}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                        {Number(
                          item.visibility ?? 0
                        ).toFixed(1)}
                        %
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                        {
                          item.top_3_rankings
                        }
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                        {item.ranked_points}
                        /
                        {item.total_points}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-right">
                        <Link
                          href={`/projects/${projectId}/scans/${item.scan_job_id}`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                          View scan
                        </Link>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-14 text-center">
            <p className="font-medium text-slate-700">
              No completed scans match these filters.
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Try another keyword or date range.
            </p>
          </div>
        )}
      </section>
    </div>
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
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          {icon}
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        {description}
      </p>
    </article>
  );
}
