"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Maximize2,
  Minimize2,
} from "lucide-react";
import MapHeatmap from "./MapHeatmap";
import GridDetailsPanel from "./GridDetailsPanel";

import {
  getGridPointDetails,
  GridPointDetails,
} from "@/services/scans";

type HeatmapPoint = {
  grid_row: number;
  grid_col: number;
  latitude: number;
  longitude: number;
  rank: number | null;
};

type HeatmapProps = {
  scanJobId: number;
  businessName: string;
  points: HeatmapPoint[];
};

function LegendItem({
  colorClass,
  label,
}: {
  colorClass: string;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
      <span
        className={`h-3.5 w-3.5 rounded-full ${colorClass}`}
      />
      <span className="text-sm font-medium text-slate-700">
        {label}
      </span>
    </div>
  );
}

export default function Heatmap({
  scanJobId,
  businessName,
  points,
}: HeatmapProps) {
  const [selectedPoint, setSelectedPoint] =
    useState<HeatmapPoint | null>(null);

  const [pointDetails, setPointDetails] =
    useState<GridPointDetails | null>(null);

  const [detailsLoading, setDetailsLoading] =
    useState(false);

  const [expanded, setExpanded] =
    useState(false);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        setExpanded(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [expanded]);

  async function handlePointClick(
    point: HeatmapPoint
  ) {
    try {
      setSelectedPoint(point);
      setPointDetails(null);
      setDetailsLoading(true);

      const details = await getGridPointDetails(
        scanJobId,
        point.grid_row,
        point.grid_col
      );

      setPointDetails(details);
    } catch (error) {
      console.error(
        "Failed to load grid point details:",
        error
      );
    } finally {
      setDetailsLoading(false);
    }
  }

  return (
    <div
      className={[
        "overflow-hidden border border-slate-200 bg-white shadow-sm",
        expanded
          ? "fixed inset-x-0 bottom-0 top-16 z-20 flex flex-col rounded-none border-0 lg:left-64"
          : "rounded-2xl",
      ].join(" ")}
    >
      <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 via-white to-slate-50 px-6 py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                Grid Ranking
              </h2>

              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-200">
                Interactive Map
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Ranking position for{" "}
              <span className="font-semibold text-slate-700">
                {businessName}
              </span>{" "}
              across all selected grid locations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setExpanded(
                  (current) => !current
                )
              }
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              {expanded ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}

              {expanded
                ? "Close full screen"
                : "Expand map"}
            </button>

            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Grid Points
              </div>
              <div className="mt-1 text-lg font-semibold text-slate-900">
                {points.length}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Selected
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                {selectedPoint
                  ? `Row ${selectedPoint.grid_row} • Col ${selectedPoint.grid_col}`
                  : "None"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={[
          "p-6",
          expanded
            ? "flex min-h-0 flex-1 flex-col"
            : "",
        ].join(" ")}
      >
        <div className="mb-5 flex shrink-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm text-slate-500">
            Click any grid point to inspect the exact
            businesses returned at that location.
          </p>

          <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500 ring-1 ring-inset ring-slate-200">
            Lower rank number = better visibility
          </div>
        </div>

        <div
          className={
            expanded
              ? "min-h-0 flex-1"
              : ""
          }
        >
          <MapHeatmap
            points={points}
            onPointClick={handlePointClick}
            selectedPoint={selectedPoint}
            expanded={expanded}
          />
        </div>

        <div className="mt-6 flex shrink-0 flex-wrap items-center justify-center gap-3">
          <LegendItem
            colorClass="bg-green-400"
            label="Top 3"
          />

          <LegendItem
            colorClass="bg-yellow-400"
            label="4–10"
          />

          <LegendItem
            colorClass="bg-orange-400"
            label="11–20"
          />

          <LegendItem
            colorClass="bg-red-400"
            label="20+"
          />

          <LegendItem
            colorClass="bg-slate-400"
            label="Not ranked"
          />
        </div>
      </div>

      <GridDetailsPanel
        open={selectedPoint !== null}
        onClose={() => {
          setSelectedPoint(null);
          setPointDetails(null);
        }}
        row={selectedPoint?.grid_row ?? 0}
        col={selectedPoint?.grid_col ?? 0}
        latitude={
          pointDetails?.latitude ??
          selectedPoint?.latitude ??
          0
        }
        longitude={
          pointDetails?.longitude ??
          selectedPoint?.longitude ??
          0
        }
        rank={
          pointDetails?.rank ??
          selectedPoint?.rank ??
          null
        }
        businesses={pointDetails?.businesses ?? []}
        loading={detailsLoading}
      />
    </div>
  );
}