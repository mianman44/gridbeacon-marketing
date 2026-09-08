"use client";

import {
  useMemo,
  useState,
} from "react";
import {
  Activity,
  ChartNoAxesCombined,
  Trophy,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type HistoryPoint = {
  rank: number | null;
  scanned_at: string;
};

type Props = {
  history: HistoryPoint[];
};

type RangeDays = 7 | 30;

export default function RankingTrend({
  history,
}: Props) {
  const [rangeDays, setRangeDays] =
    useState<RangeDays>(30);

  const data = useMemo(() => {
    const cutoff =
      Date.now()
      - rangeDays
      * 24
      * 60
      * 60
      * 1000;

    return history
      .filter((item) => {
        if (item.rank === null) {
          return false;
        }

        const timestamp =
          new Date(
            item.scanned_at
          ).getTime();

        return (
          !Number.isNaN(timestamp)
          && timestamp >= cutoff
        );
      })
      .sort(
        (first, second) =>
          new Date(
            first.scanned_at
          ).getTime()
          - new Date(
            second.scanned_at
          ).getTime()
      )
      .map((item) => {
        const date =
          new Date(
            item.scanned_at
          );

        return {
          rank: item.rank!,
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
        };
      });
  }, [
    history,
    rangeDays,
  ]);

  const latestRank =
    data.length > 0
      ? data[data.length - 1].rank
      : null;

  const bestRank =
    data.length > 0
      ? Math.min(
          ...data.map(
            (item) => item.rank
          )
        )
      : null;

  const movement =
    data.length > 1
      ? data[0].rank
        - data[data.length - 1].rank
      : null;

  const maxRank =
    data.length > 0
      ? Math.max(
          ...data.map(
            (item) => item.rank
          ),
          10
        )
      : 10;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-white/90 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.07)] backdrop-blur">
      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-indigo-300/20 blur-3xl" />

      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-500 text-white shadow-lg shadow-indigo-500/25">
            <ChartNoAxesCombined className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-500">
              Performance
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-950">
              Ranking Trend
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Lower ranking numbers indicate stronger performance.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <ChartMetric
            label="Current"
            value={
              latestRank === null
                ? "—"
                : `#${latestRank}`
            }
            icon={Activity}
          />

          <ChartMetric
            label="Best"
            value={
              bestRank === null
                ? "—"
                : `#${bestRank}`
            }
            icon={Trophy}
          />

          <div className="flex rounded-xl border border-indigo-100 bg-indigo-50/70 p-1">
            {[7, 30].map((days) => (
              <button
                key={days}
                type="button"
                onClick={() =>
                  setRangeDays(
                    days as RangeDays
                  )
                }
                className={[
                  "rounded-lg px-3 py-1.5 text-xs font-bold transition",
                  rangeDays === days
                    ? "bg-white text-indigo-700 shadow-sm"
                    : "text-slate-500 hover:text-indigo-700",
                ].join(" ")}
              >
                {days}D
              </button>
            ))}
          </div>
        </div>
      </div>

      {movement !== null && (
        <div
          className={[
            "relative mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold",
            movement > 0
              ? "bg-emerald-50 text-emerald-700"
              : movement < 0
                ? "bg-red-50 text-red-700"
                : "bg-slate-100 text-slate-600",
          ].join(" ")}
        >
          {movement > 0 ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}

          {movement === 0
            ? "Ranking remained stable"
            : movement > 0
              ? `${movement.toFixed(1)} positions improved`
              : `${Math.abs(
                  movement
                ).toFixed(1)} positions declined`}
        </div>
      )}

      <div className="relative mt-6 h-80">
        {data.length > 0 ? (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart
              data={data}
              margin={{
                top: 12,
                right: 12,
                bottom: 4,
                left: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="dashboardRankGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#6366f1"
                    stopOpacity={0.3}
                  />

                  <stop
                    offset="95%"
                    stopColor="#8b5cf6"
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                minTickGap={50}
                fontSize={11}
                stroke="#64748b"
              />

              <YAxis
                reversed
                domain={[
                  1,
                  Math.ceil(maxRank),
                ]}
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                width={36}
                fontSize={11}
                stroke="#64748b"
              />

              <Tooltip
                contentStyle={{
                  borderRadius: 16,
                  border:
                    "1px solid #e0e7ff",
                  boxShadow:
                    "0 18px 45px rgba(79,70,229,0.15)",
                }}
                labelStyle={{
                  color: "#64748b",
                  fontSize: 12,
                }}
              />

              <Area
                type="monotone"
                dataKey="rank"
                name="Rank"
                stroke="#6366f1"
                strokeWidth={3}
                fill="url(#dashboardRankGradient)"
                dot={{
                  r: 4,
                  fill: "#ffffff",
                  stroke: "#6366f1",
                  strokeWidth: 3,
                }}
                activeDot={{
                  r: 7,
                  fill: "#8b5cf6",
                  stroke: "#ffffff",
                  strokeWidth: 3,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-indigo-200 bg-gradient-to-br from-indigo-50/70 to-violet-50/50">
            <div className="text-center">
              <ChartNoAxesCombined className="mx-auto h-9 w-9 text-indigo-300" />

              <p className="mt-3 text-sm font-bold text-slate-700">
                No ranking history available
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Complete a scan to generate your ranking chart.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ChartMetric({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof Activity;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        <Icon className="h-4 w-4" />
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className="text-sm font-extrabold text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}
