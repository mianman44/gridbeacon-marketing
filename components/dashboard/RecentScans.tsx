import type {
  LucideIcon,
} from "lucide-react";
import {
  CheckCircle2,
  Clock3,
  LoaderCircle,
  Radar,
  XCircle,
} from "lucide-react";

type RecentScan = {
  id: number;
  project: string;
  business: string;
  keyword: string;
  status: string;
  created_at: string;
  finished_at: string | null;
};

type Props = {
  scans: RecentScan[];
};

type StatusDisplay = {
  label: string;
  badge: string;
  iconBox: string;
  accent: string;
  icon: LucideIcon;
};

function getStatusDisplay(
  status: string
): StatusDisplay {
  switch (status) {
    case "completed":
      return {
        label: "Completed",
        badge:
          "bg-emerald-50 text-emerald-700 ring-emerald-100",
        iconBox:
          "bg-emerald-50 text-emerald-600",
        accent:
          "bg-emerald-500",
        icon:
          CheckCircle2,
      };

    case "running":
      return {
        label: "Running",
        badge:
          "bg-indigo-50 text-indigo-700 ring-indigo-100",
        iconBox:
          "bg-indigo-50 text-indigo-600",
        accent:
          "bg-indigo-500",
        icon:
          LoaderCircle,
      };

    case "failed":
      return {
        label: "Failed",
        badge:
          "bg-red-50 text-red-700 ring-red-100",
        iconBox:
          "bg-red-50 text-red-600",
        accent:
          "bg-red-500",
        icon:
          XCircle,
      };

    default:
      return {
        label: "Queued",
        badge:
          "bg-amber-50 text-amber-700 ring-amber-100",
        iconBox:
          "bg-amber-50 text-amber-600",
        accent:
          "bg-amber-500",
        icon:
          Clock3,
      };
  }
}

function formatDate(
  value: string
) {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return value;
  }

  return date.toLocaleString(
    undefined,
    {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }
  );
}

export default function RecentScans({
  scans,
}: Props) {
  const visibleScans =
    scans.slice(0, 6);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-white/90 shadow-[0_18px_50px_rgba(15,23,42,0.07)] backdrop-blur">
      <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-violet-300/20 blur-3xl" />

      <div className="relative border-b border-indigo-100/70 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-500">
              Activity
            </p>

            <h2 className="mt-2 text-xl font-bold text-slate-950">
              Recent Scans
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest jobs across your workspace.
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/25">
            <Radar className="h-5 w-5" />
          </div>
        </div>
      </div>

      {visibleScans.length > 0 ? (
        <div className="relative divide-y divide-slate-100">
          {visibleScans.map((scan) => {
            const status =
              getStatusDisplay(
                scan.status
              );

            const StatusIcon =
              status.icon;

            return (
              <article
                key={scan.id}
                className="group relative overflow-hidden p-5 transition hover:bg-gradient-to-r hover:from-indigo-50/60 hover:to-transparent"
              >
                <div
                  className={[
                    "absolute inset-y-4 left-0 w-1 rounded-r-full",
                    status.accent,
                  ].join(" ")}
                />

                <div className="flex items-start gap-3">
                  <div
                    className={[
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105",
                      status.iconBox,
                    ].join(" ")}
                  >
                    <StatusIcon
                      className={[
                        "h-5 w-5",
                        scan.status
                          === "running"
                          ? "animate-spin"
                          : "",
                      ].join(" ")}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate font-bold text-slate-900">
                          {scan.project}
                        </h3>

                        <p className="mt-1 truncate text-sm font-medium text-slate-500">
                          {scan.keyword}
                        </p>
                      </div>

                      <span
                        className={[
                          "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ring-1",
                          status.badge,
                        ].join(" ")}
                      >
                        {status.label}
                      </span>
                    </div>

                    {scan.business && (
                      <p className="mt-2 truncate text-xs text-slate-400">
                        {scan.business}
                      </p>
                    )}

                    <p className="mt-2 text-[11px] font-medium text-slate-400">
                      {formatDate(
                        scan.created_at
                      )}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="relative p-6">
          <div className="flex min-h-56 items-center justify-center rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/40">
            <div className="text-center">
              <Radar className="mx-auto h-9 w-9 text-indigo-300" />

              <p className="mt-3 text-sm font-bold text-slate-700">
                No recent scans
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Your latest scan activity will appear here.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
