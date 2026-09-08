import DataTable, {
  type DataTableColumn,
} from "@/components/ui/DataTable";

import StatusBadge from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";

type CompetitorResult = {
  id?: number;
  position: number;
  best_position?: number;
  average_position?: number;
  appearances?: number;
  total_grid_points?: number;
  coverage_percentage?: number;
  previous_position?: number | null;
  previous_average_position?: number | null;
  change?: number | null;
  direction?: "up" | "down" | "same" | "new";
  business_name: string;
  rating?: number | null;
  reviews?: number | null;
  place_id?: string | null;
  website?: string | null;
  maps_url?: string | null;
};

type CompetitorTableProps = {
  results: CompetitorResult[];
  trackedPlaceId?: string | null;
  trackedBusinessName?: string | null;
  loading?: boolean;
};

function normalizeBusinessName(
  name?: string | null,
) {
  if (!name) {
    return "";
  }

  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function getPositionStatus(
  position: number,
) {
  if (position <= 3) {
    return "success" as const;
  }

  if (position <= 10) {
    return "warning" as const;
  }

  if (position <= 20) {
    return "info" as const;
  }

  return "neutral" as const;
}

function formatCoverage(
  result: CompetitorResult,
) {
  const appearances =
    result.appearances ?? 0;

  const total =
    result.total_grid_points ?? 0;

  const percentage =
    result.coverage_percentage ?? (
      total > 0
        ? (appearances / total) * 100
        : 0
    );

  return {
    appearances,
    total,
    percentage,
  };
}

export default function CompetitorTable({
  results,
  trackedPlaceId,
  trackedBusinessName,
  loading = false,
}: CompetitorTableProps) {
  const columns: DataTableColumn<CompetitorResult>[] = [
    {
      key: "best_position",
      header: "Best Rank",
      render: (result) => {
        const bestPosition =
          result.best_position
          ?? result.position;

        return (
          <StatusBadge
            status={getPositionStatus(
              bestPosition,
            )}
          >
            #{bestPosition}
          </StatusBadge>
        );
      },
    },
    {
      key: "average_position",
      header: "Average Rank",
      render: (result) => (
        <span className="font-semibold text-slate-800">
          {(
            result.average_position
            ?? result.position
          ).toFixed(1)}
        </span>
      ),
    },
    {
      key: "coverage",
      header: "Grid Coverage",
      render: (result) => {
        const {
          appearances,
          total,
          percentage,
        } = formatCoverage(result);

        return (
          <div className="min-w-[120px]">
            <p className="font-semibold text-slate-800">
              {percentage.toFixed(1)}%
            </p>

            <p className="mt-0.5 text-xs text-slate-500">
              {appearances}/{total} points
            </p>
          </div>
        );
      },
    },
    {
      key: "movement",
      header: "Avg. Movement",
      render: (result) => {
        if (result.direction === "up") {
          return (
            <span className="font-semibold text-emerald-600">
              ▲ {Math.abs(
                result.change ?? 0,
              ).toFixed(1)}
            </span>
          );
        }

        if (result.direction === "down") {
          return (
            <span className="font-semibold text-red-600">
              ▼ {Math.abs(
                result.change ?? 0,
              ).toFixed(1)}
            </span>
          );
        }

        if (result.direction === "new") {
          return (
            <StatusBadge status="info">
              New
            </StatusBadge>
          );
        }

        return (
          <span className="text-slate-400">
            —
          </span>
        );
      },
    },
    {
      key: "business",
      header: "Business",
      render: (result) => {
        const trackedPlaceIdValue =
          (trackedPlaceId ?? "").trim();

        const resultPlaceId =
          (result.place_id ?? "").trim();

        const placeIdMatches =
          Boolean(trackedPlaceIdValue)
          && resultPlaceId
            === trackedPlaceIdValue;

        const nameMatches =
          normalizeBusinessName(
            result.business_name,
          )
          === normalizeBusinessName(
            trackedBusinessName,
          );

        const isTrackedBusiness =
          placeIdMatches
          || (
            !trackedPlaceIdValue
            && nameMatches
          );

        return (
          <div className="flex min-w-[240px] items-center gap-2">
            <span className="font-semibold text-slate-900">
              {result.business_name
                || "Unknown business"}
            </span>

            {isTrackedBusiness && (
              <StatusBadge status="success">
                Your Business
              </StatusBadge>
            )}
          </div>
        );
      },
    },
    {
      key: "rating",
      header: "Rating",
      render: (result) => (
        <span className="whitespace-nowrap text-slate-700">
          ⭐ {result.rating ?? "-"}
        </span>
      ),
    },
    {
      key: "reviews",
      header: "Reviews",
      render: (result) => (
        <span className="whitespace-nowrap text-slate-700">
          {(result.reviews ?? 0).toLocaleString()}
        </span>
      ),
    },
    {
      key: "links",
      header: "Links",
      render: (result) => (
        <div className="flex flex-wrap gap-2">
          {result.website && (
            <Button
              variant="outline"
              size="xs"
              nativeButton={false}
              render={
                <a
                  href={result.website}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              Website
            </Button>
          )}

          {result.maps_url && (
            <Button
              variant="outline"
              size="xs"
              nativeButton={false}
              render={
                <a
                  href={result.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              Maps
            </Button>
          )}

          {!result.website
            && !result.maps_url && (
              <span className="text-slate-400">
                —
              </span>
            )}
        </div>
      ),
    },
  ];

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-950">
          Competitor Results
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Compare each business by best rank,
          average rank, and coverage across the
          scanned grid.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={results}
        loading={loading}
        emptyMessage="No competitor results were found for this scan."
        getRowKey={(result, index) =>
          result.place_id
          ?? result.id
          ?? `${result.business_name}-${index}`
        }
      />
    </section>
  );
}
