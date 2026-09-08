"use client";

import {
  useEffect,
  useState,
} from "react";
import { useParams } from "next/navigation";
import { ScanLine } from "lucide-react";

import Heatmap from "@/components/heatmap/heatmap";
import ScanSummary from "@/components/scans/ScanSummary";
import CompetitorTable from "@/components/scans/CompetitorTable";

import {
  getScanGrid,
  getScanJob,
  type ScanGridResponse,
} from "@/services/scans";

import {
  getProjectBusinesses,
  type Business,
} from "@/services/businesses";

export default function ScanDetailsPage() {
  const params = useParams();

  const scanId = Number(
    params.scanId,
  );

  const projectId = Number(
    params.id,
  );

  const [scan, setScan] =
    useState<any>(null);

  const [grid, setGrid] =
    useState<ScanGridResponse | null>(
      null,
    );

  const [business, setBusiness] =
    useState<Business | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (
      !scanId
      || Number.isNaN(scanId)
      || !projectId
      || Number.isNaN(projectId)
    ) {
      return;
    }

    loadScan();
  }, [scanId, projectId]);

  async function loadScan() {
    try {
      setLoading(true);
      setError("");

      const [
        scanData,
        gridData,
        businesses,
      ] = await Promise.all([
        getScanJob(scanId),
        getScanGrid(scanId),
        getProjectBusinesses(
          projectId,
        ),
      ]);

      setScan(scanData);
      setGrid(gridData);

      const trackedBusiness =
        businesses.find(
          (item) =>
            item.id
            === gridData.business.id,
        )
        ?? businesses.find(
          (item) =>
            item.place_id
            === gridData.business
              .place_id,
        )
        ?? null;

      setBusiness(
        trackedBusiness,
      );
    } catch (loadError) {
      console.error(loadError);

      setError(
        "Failed to load scan details.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="m-6 rounded-xl border bg-white p-8 text-center text-sm text-slate-500 lg:m-8">
        Loading scan details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-6 rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 lg:m-8">
        {error}
      </div>
    );
  }

  const heatmapPoints =
    grid?.points.filter(
      (
        point,
      ): point is typeof point & {
        latitude: number;
        longitude: number;
      } =>
        typeof point.latitude === "number"
        && typeof point.longitude === "number",
    )
    ?? [];

  const rankedPoints =
    grid?.points
      .map(
        (point) => point.rank,
      )
      .filter(
        (
          rank,
        ): rank is number =>
          rank !== null,
      )
    ?? [];

  const averageRank =
    rankedPoints.length > 0
      ? (
          rankedPoints.reduce(
            (
              total,
              rank,
            ) => total + rank,
            0,
          )
          / rankedPoints.length
        ).toFixed(1)
      : "-";

  const bestRank =
    rankedPoints.length > 0
      ? Math.min(
          ...rankedPoints,
        )
      : "-";

  const worstRank =
    rankedPoints.length > 0
      ? Math.max(
          ...rankedPoints,
        )
      : "-";

  const top10Points =
    rankedPoints.filter(
      (rank) => rank <= 10,
    ).length;

  const visibility =
    grid
    && grid.points.length > 0
      ? Math.round(
          (
            top10Points
            / grid.points.length
          )
          * 100,
        )
      : 0;

  return (
    <div className="space-y-7 p-6 lg:p-8">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-500 text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/40">
          <ScanLine className="h-5 w-5" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-950">
            Scan #{scanId}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View grid rankings and competitor results for this scan.
          </p>
        </div>
      </div>

      {grid && (
        <>
          <ScanSummary
            averageRank={
              averageRank
            }
            bestRank={bestRank}
            worstRank={worstRank}
            visibility={
              visibility
            }
          />

          <Heatmap
            scanJobId={scanId}
            businessName={
              grid.business
                .business_name
            }
            points={heatmapPoints}
          />

          <CompetitorTable
            results={
              scan?.results ?? []
            }
            trackedPlaceId={
              business?.place_id
              ?? grid.business
                .place_id
            }
            trackedBusinessName={
              business?.business_name
              ?? grid.business
                .business_name
            }
          />
        </>
      )}
    </div>
  );
}