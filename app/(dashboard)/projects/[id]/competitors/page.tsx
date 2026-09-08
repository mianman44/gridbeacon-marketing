"use client";

import {
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Eye,
  MapPinned,
  RotateCw,
  ScanLine,
  Search,
  Star,
  Trophy,
  Users,
} from "lucide-react";

import PageSkeleton from "@/components/ui/PageSkeleton";
import { useProjectCompetitors } from "@/hooks/use-projects";

type KeywordFilter = "all" | number;

function formatNumber(
  value: number | null | undefined
) {
  if (
    value === null
    || value === undefined
  ) {
    return "—";
  }

  return new Intl.NumberFormat().format(
    value
  );
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

export default function CompetitorsPage() {
  const params = useParams<{
    id: string;
  }>();

  const projectId = Number(params.id);

  const [
    selectedKeyword,
    setSelectedKeyword,
  ] = useState<KeywordFilter>("all");

  const [search, setSearch] =
    useState("");

  const keywordId =
    selectedKeyword === "all"
      ? undefined
      : selectedKeyword;

  const {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useProjectCompetitors(
    projectId,
    keywordId
  );

  const filteredCompetitors =
    useMemo(() => {
      const competitors =
        data?.competitors ?? [];

      const query = search
        .trim()
        .toLowerCase();

      if (!query) {
        return competitors;
      }

      return competitors.filter(
        (competitor) =>
          competitor.business_name
            ?.toLowerCase()
            .includes(query)
          || competitor.keywords.some(
            (keyword) =>
              keyword
                .toLowerCase()
                .includes(query)
          )
      );
    }, [data, search]);

  const top3Appearances = useMemo(
    () =>
      (data?.competitors ?? [])
        .reduce(
          (total, competitor) =>
            total
            + competitor
              .top_3_appearances,
          0
        ),
    [data]
  );

  const strongestCompetitor =
    data?.competitors?.[0] ?? null;

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (isError || !data) {
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
            Competitor data could not be loaded.
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
              <Users className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-950">
                Competitors
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Compare businesses found in the latest completed grid scans.
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

              {data.keywords.map(
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

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">
              Search competitors
            </span>

            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Business or keyword"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </label>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Competitors Found"
          value={formatNumber(
            data.total_competitors
          )}
          description="Unique businesses detected"
          icon={
            <Users className="h-5 w-5" />
          }
        />

        <MetricCard
          title="Scans Analyzed"
          value={formatNumber(
            data.scans_analyzed
          )}
          description="Latest completed scan per keyword"
          icon={
            <ScanLine className="h-5 w-5" />
          }
        />

        <MetricCard
          title="Grid Points"
          value={formatNumber(
            data.total_grid_points
          )}
          description="Total locations analyzed"
          icon={
            <MapPinned className="h-5 w-5" />
          }
        />

        <MetricCard
          title="Top 3 Appearances"
          value={formatNumber(
            top3Appearances
          )}
          description={
            strongestCompetitor
              ? `Leader: ${strongestCompetitor.business_name}`
              : "No competitor data"
          }
          icon={
            <Trophy className="h-5 w-5" />
          }
        />
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-slate-950">
              Competitor Rankings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Lower average-position numbers indicate stronger rankings.
              Your tracked business is excluded from this list.
            </p>
          </div>

          <p className="text-xs text-slate-500">
            Showing{" "}
            {filteredCompetitors.length} of{" "}
            {data.total_competitors}
          </p>
        </div>

        {filteredCompetitors.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  {[
                    "#",
                    "Business",
                    "Avg. Position",
                    "Best",
                    "Coverage",
                    "Top 3",
                    "Top 10",
                    "Keywords",
                    "Latest Scan",
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
                {filteredCompetitors.map(
                  (
                    competitor,
                    index
                  ) => (
                    <tr
                      key={
                        competitor.place_id
                        ?? competitor.id
                      }
                      className="hover:bg-slate-50"
                    >
                      <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-500">
                        {index + 1}
                      </td>

                      <td className="min-w-72 px-5 py-4">
                        <p className="font-semibold text-slate-900">
                          {
                            competitor.business_name
                          }
                        </p>

                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                          <span className="inline-flex items-center gap-1">
                            <Star className="h-3.5 w-3.5" />
                            {competitor.rating
                              ?? "—"}
                          </span>

                          <span>
                            {formatNumber(
                              competitor.reviews
                            )}{" "}
                            reviews
                          </span>

                          {competitor.website && (
                            <a
                              href={
                                competitor.website
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700"
                            >
                              Website
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}

                          {competitor.maps_url && (
                            <a
                              href={
                                competitor.maps_url
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700"
                            >
                              Maps
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        <PositionBadge
                          value={
                            competitor.average_position
                          }
                        />
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-900">
                        #
                        {
                          competitor.best_position
                        }
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-slate-400" />

                          <span className="text-sm font-medium text-slate-700">
                            {
                              competitor.coverage_percentage
                            }
                            %
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-slate-400">
                          {
                            competitor.appearances
                          }
                          /
                          {
                            competitor.total_grid_points
                          }{" "}
                          points
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">
                        {
                          competitor.top_3_appearances
                        }
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">
                        {
                          competitor.top_10_appearances
                        }
                      </td>

                      <td className="max-w-64 px-5 py-4">
                        <p className="truncate text-sm text-slate-600">
                          {competitor.keywords.join(
                            ", "
                          )}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        <p className="text-sm text-slate-600">
                          {formatDate(
                            competitor.latest_scan_at
                          )}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-right">
                        <Link
                          href={`/projects/${projectId}/scans/${competitor.latest_scan_id}`}
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
          <div className="px-6 py-16 text-center">
            <Users className="mx-auto h-9 w-9 text-slate-300" />

            <p className="mt-3 font-medium text-slate-700">
              No competitors found
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Complete a scan or try another keyword.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function PositionBadge({
  value,
}: {
  value: number;
}) {
  const className =
    value <= 3
      ? "bg-emerald-50 text-emerald-700"
      : value <= 10
        ? "bg-amber-50 text-amber-700"
        : "bg-slate-100 text-slate-700";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-sm font-semibold ${className}`}
    >
      {value.toFixed(1)}
    </span>
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
  icon: ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
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

      <p className="mt-3 truncate text-xs text-slate-500">
        {description}
      </p>
    </article>
  );
}
