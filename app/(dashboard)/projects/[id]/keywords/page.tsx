"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Eye,
  XCircle,
  Loader2,
  Play,
  Search,
  Trash2,
  KeyRound,
  Building2,
} from "lucide-react";

import ProjectPageHeader from "@/components/projects/project-page-header";
import Link from "next/link";
import { useParams } from "next/navigation";

import { CreateKeywordDialog } from "@/components/keywords/create-keyword-dialog";
import { Input } from "@/components/ui/input";

import {
  deleteKeyword,
  getProjectKeywords,
  type Keyword,
} from "@/services/keywords";

import {
  cancelScan,
  startScan,
} from "@/services/scans";

export default function KeywordsPage() {
  const params = useParams();
  const projectId = Number(params.id);

  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [scanningKeywordId, setScanningKeywordId] =
    useState<number | null>(null);

  const [
    cancellingScanJobId,
    setCancellingScanJobId,
  ] = useState<number | null>(null);

  const [deletingKeywordId, setDeletingKeywordId] =
    useState<number | null>(null);

  const [keywordRadii, setKeywordRadii] = useState<
    Record<number, number>
  >({});

  const [keywordGridSizes, setKeywordGridSizes] = useState<
  Record<number, number>
>({});

  const loadKeywords = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProjectKeywords(projectId);
      setKeywords(data);

      setKeywordRadii((current) => {
        const updated = { ...current };

        data.forEach((keyword) => {
          if (updated[keyword.id] === undefined) {
            updated[keyword.id] = 1;
          }
        });

        return updated;
      });

      setKeywordGridSizes((current) => {
  const updated = { ...current };

  data.forEach((keyword) => {
    if (updated[keyword.id] === undefined) {
      updated[keyword.id] = 3;
    }
  });

  return updated;
});

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load keywords"
      );
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (
      projectId &&
      !Number.isNaN(projectId)
    ) {
      loadKeywords();
    }
  }, [loadKeywords, projectId]);

  const hasActiveScans = keywords.some(
    (keyword) =>
      keyword.active_scan_status === "queued"
      || keyword.active_scan_status === "running"
  );

  useEffect(() => {
    if (!hasActiveScans) {
      return;
    }

    const intervalId =
      window.setInterval(async () => {
        try {
          const updatedKeywords =
            await getProjectKeywords(
              projectId
            );

          setKeywords(
            updatedKeywords
          );
        } catch (pollError) {
          console.error(
            "Failed to refresh scan progress:",
            pollError
          );
        }
      }, 2000);

    return () => {
      window.clearInterval(
        intervalId
      );
    };
  }, [
    hasActiveScans,
    projectId,
  ]);

  async function handleScan(
  keywordId: number,
  radiusMiles: number,
  gridSize: number
) {
  try {
    setScanningKeywordId(keywordId);
    setError("");

    console.log(
      "Starting scan:",
      {
        keywordId,
        radiusMiles,
        gridSize,
        totalPoints: gridSize * gridSize,
      }
    );

    await startScan(
      keywordId,
      radiusMiles,
      gridSize
    );

    await loadKeywords();
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : "Failed to start scan"
    );
  } finally {
    setScanningKeywordId(null);
  }
}

  async function handleCancelScan(
    jobId: number,
    keywordName: string,
  ) {
    const confirmed = window.confirm(
      `Cancel the active scan for "${keywordName}"?\n\nReserved scan credits will be refunded.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setCancellingScanJobId(jobId);
      setError("");

      await cancelScan(jobId);
      await loadKeywords();

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to cancel scan",
      );

    } finally {
      setCancellingScanJobId(null);
    }
  }


  async function handleDelete(
    keywordId: number,
    keywordName: string
  ) {
    const confirmed = window.confirm(
      `Delete the keyword "${keywordName}"?\n\nThis will also delete its scan history and results.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingKeywordId(keywordId);
      setError("");

      await deleteKeyword(keywordId);
      await loadKeywords();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete keyword"
      );
    } finally {
      setDeletingKeywordId(null);
    }
  }

  const filteredKeywords = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return keywords;
    }

    return keywords.filter((item) => {
      const keywordMatches =
        item.keyword
          .toLowerCase()
          .includes(query);

      const businessMatches =
        (item.business_name ?? "")
          .toLowerCase()
          .includes(query);

      return (
        keywordMatches
        || businessMatches
      );
    });
  }, [keywords, search]);

  function getStatusClasses(
    status: string | null
  ) {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";

      case "running":
        return "bg-blue-50 text-blue-700 ring-blue-600/20";

      case "queued":
        return "bg-amber-50 text-amber-700 ring-amber-600/20";

      case "failed":
        return "bg-red-50 text-red-700 ring-red-600/20";

      case "cancelled":
        return "bg-slate-100 text-slate-600 ring-slate-500/20";

      default:
        return "bg-slate-50 text-slate-600 ring-slate-500/20";
    }
  }

  return (
    <div className="space-y-7 p-6 lg:p-8">
      <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
  <ProjectPageHeader
          icon={KeyRound}
          title="Keywords"
          description="Track local search rankings for your businesses."
        />

  <div className="shrink-0">
    <CreateKeywordDialog
      projectId={projectId}
      onCreated={loadKeywords}
    />
  </div>
</div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search keywords..."
              className="h-10 pl-9"
            />
          </div>

          <p className="whitespace-nowrap text-sm text-muted-foreground">
            {filteredKeywords.length}{" "}
            {filteredKeywords.length === 1
              ? "keyword"
              : "keywords"}
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-48 items-center justify-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading keywords...
          </div>
        ) : filteredKeywords.length === 0 ? (
          <div className="flex min-h-48 flex-col items-center justify-center px-6 text-center">
            <h3 className="font-semibold">
              No keywords found
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Add a keyword to begin tracking local rankings.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1070px] table-fixed">
              <colgroup>
                <col className="w-[260px]" />
                <col className="w-[75px]" />
                <col className="w-[75px]" />
                <col className="w-[90px]" />
                <col className="w-[150px]" />
                <col className="w-[420px]" />
              </colgroup>

              <thead>
                <tr className="border-b bg-slate-50/80 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-5 py-3 font-medium">
                    Keyword
                  </th>

                  <th className="px-4 py-3 font-medium">
                    Current rank
                  </th>

                  <th className="px-4 py-3 font-medium">
                    Best rank
                  </th>

                  <th className="px-4 py-3 font-medium">
                    Status
                  </th>

                  <th className="px-4 py-3 font-medium">
                    Last scan
                  </th>

                  <th className="px-3 py-3 text-center font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredKeywords.map((item) => {
                  const isStarting =
                    scanningKeywordId === item.id;

                  const activeScanStatus =
                    item.active_scan_status
                      ?.toLowerCase()
                      ?? null;

                  const hasActiveScan =
                    activeScanStatus === "queued"
                    || activeScanStatus === "running";

                  const isScanning =
                    isStarting
                    || hasActiveScan;

                  const completedPoints =
                    item.scan_completed_points
                    ?? 0;

                  const totalPoints =
                    item.scan_total_points
                    ?? (
                      (
                        keywordGridSizes[
                          item.id
                        ]
                        ?? 3
                      )
                      ** 2
                    );

                  const progressPercentage =
                    Math.min(
                      100,
                      Math.max(
                        0,
                        item.scan_progress_percentage
                        ?? (
                          totalPoints > 0
                            ? (
                                completedPoints
                                / totalPoints
                              )
                              * 100
                            : 0
                        )
                      )
                    );

                  const displayedStatus =
                    item.active_scan_status
                    ?? item.scan_status;

                  const isDeleting =
                    deletingKeywordId === item.id;

                  const isCancelling =
                    cancellingScanJobId !== null
                    && cancellingScanJobId
                    === item.active_scan_job_id;

                  const isBusy =
                    isScanning
                    || isDeleting
                    || isCancelling;

                  return (
                    <tr
                      key={item.id}
                      className="border-b transition-colors last:border-0 hover:bg-slate-50/60"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-900">
                          {item.keyword}
                        </p>

                        <div className="mt-1.5 inline-flex max-w-[250px] items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50/70 px-2 py-1 text-xs font-semibold text-indigo-600">
                          <Building2 className="h-3.5 w-3.5 shrink-0" />

                          <span className="truncate">
                            {item.business_name
                              || "Unknown business"}
                          </span>
                        </div>

                        {hasActiveScan && (
                          <div className="mt-3 w-full max-w-[280px] rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50 p-3">
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700">
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />

                                <span>
                                  {activeScanStatus === "queued"
                                    ? "Waiting for worker"
                                    : "Scanning grid points"}
                                </span>
                              </div>

                              <span className="text-xs font-bold tabular-nums text-indigo-700">
                                {completedPoints}/{totalPoints}
                                {" ? "}
                                {Math.round(
                                  progressPercentage
                                )}%
                              </span>
                            </div>

                            <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-white ring-1 ring-indigo-100">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 transition-all duration-700"
                                style={{
                                  width: `${
                                    activeScanStatus === "queued"
                                    && progressPercentage === 0
                                      ? 4
                                      : progressPercentage
                                  }%`,
                                }}
                              />
                            </div>

                            <p className="mt-2 text-[11px] font-medium text-indigo-500">
                              {activeScanStatus === "queued"
                                ? "Waiting for an available worker."
                                : `${Math.max(
                                    0,
                                    totalPoints
                                    - completedPoints
                                  )} grid points remaining`}
                            </p>
                          </div>
                        )}
                      </td>

                      <td className="px-4 py-4">
                        <span className="font-medium">
                          {item.current_rank &&
                          item.current_rank > 0
                            ? item.current_rank
                            : "-"}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span className="font-medium">
                          {item.best_rank &&
                          item.best_rank > 0
                            ? item.best_rank
                            : "-"}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset ${getStatusClasses(
                            displayedStatus
                          )}`}
                        >
                          {displayedStatus
                            ?? "pending"}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-sm text-muted-foreground">
                        {item.last_scan
                          ? new Date(
                              item.last_scan
                            ).toLocaleString()
                          : "Never"}
                      </td>

                      <td className="px-3 py-4 align-middle">
   <div className="grid grid-cols-[112px_76px_88px_92px_36px] items-center justify-end gap-2 whitespace-nowrap">
    {/* Grid size */}
    <select
      value={keywordGridSizes[item.id] ?? 3}
      onChange={(event) => {
        const gridSize = Number(
          event.target.value
        );

        setKeywordGridSizes(
          (current) => ({
            ...current,
            [item.id]: gridSize,
          })
        );
      }}
      title="Grid size"
      className="cursor-pointer h-9 w-full rounded-md border bg-white px-2 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <option value={3}>
        3×3 · 9
      </option>

      <option value={5}>
        5×5 · 25
      </option>

      <option value={7}>
        7×7 · 49
      </option>

      <option value={9}>
        9×9 · 81
      </option>

      <option value={15}>
        15×15 · 225
      </option>
    </select>

    {/* Radius */}
    <select
      value={keywordRadii[item.id] ?? 1}
      onChange={(event) => {
        const radius = Number(
          event.target.value
        );

        setKeywordRadii(
          (current) => ({
            ...current,
            [item.id]: radius,
          })
        );
      }}
      title="Scan radius"
      className="cursor-pointer h-9 w-full rounded-md border bg-white px-2 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <option value={0.5}>
        0.5 mi
      </option>

      <option value={1}>
        1 mi
      </option>

      <option value={2}>
        2 mi
      </option>

      <option value={3}>
        3 mi
      </option>

      <option value={5}>
        5 mi
      </option>

      <option value={10}>
        10 mi
      </option>
    </select>

    {/* Start or cancel scan */}
    {hasActiveScan
      && item.active_scan_job_id ? (
      <button
        type="button"
        onClick={() =>
          handleCancelScan(
            item.active_scan_job_id!,
            item.keyword,
          )
        }
        disabled={isCancelling}
        title="Cancel active scan"
        className="inline-flex h-9 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-red-200 bg-red-50 px-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isCancelling ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <XCircle className="h-4 w-4" />
        )}

        {isCancelling
          ? "..."
          : "Cancel"}
      </button>
    ) : (
      <button
        type="button"
        onClick={() =>
          handleScan(
            item.id,
            keywordRadii[item.id] ?? 1,
            keywordGridSizes[item.id] ?? 3,
          )
        }
        disabled={isBusy}
        title="Start scan"
        aria-label="Start scan"
        className="inline-flex h-9 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border bg-white px-2 text-sm font-semibold transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isStarting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Play className="h-4 w-4" />
        )}

        <span>
          {isStarting
            ? "..."
            : `${
                (
                  keywordGridSizes[item.id]
                  ?? 3
                ) ** 2
              } pts`}
        </span>
      </button>
    )}

    {item.latest_scan_job_id ? (
      <Link
        href={`/projects/${projectId}/scans/${item.latest_scan_job_id}`}
        title="Open latest completed scan"
        className="inline-flex h-9 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-violet-600 px-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
      >
        <Eye className="h-4 w-4" />
        View
      </Link>
    ) : (
      <div
        aria-hidden="true"
        className="h-9 w-full"
      />
    )}
    {/* Delete keyword */}
    <button
      type="button"
      onClick={() =>
        handleDelete(
          item.id,
          item.keyword
        )
      }
      disabled={isBusy}
      title="Delete keyword"
      aria-label="Delete keyword"
      className="inline-flex h-9 w-full items-center justify-center rounded-md border border-red-200 bg-white text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isDeleting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}

    </button>
  </div>
</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
