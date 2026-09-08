"use client";

import { useEffect, useMemo } from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";

type HeatmapPoint = {
  grid_row: number;
  grid_col: number;
  latitude: number;
  longitude: number;
  rank: number | null;
};

type MapHeatmapProps = {
  points: HeatmapPoint[];
  onPointClick: (point: HeatmapPoint) => void;
  selectedPoint?: HeatmapPoint | null;
  expanded?: boolean;
};

function getPointKey(point: HeatmapPoint) {
  return `${point.grid_row}-${point.grid_col}`;
}

function getRankCategory(rank: number | null) {
  if (rank === null) {
    return "not-ranked";
  }

  if (rank <= 3) {
    return "top-three";
  }

  if (rank <= 10) {
    return "top-ten";
  }

  if (rank <= 20) {
    return "top-twenty";
  }

  return "twenty-plus";
}

function getRankDescription(rank: number | null) {
  if (rank === null) {
    return "Not ranked";
  }

  return `Rank ${rank}`;
}

function createRankMarkerIcon({
  point,
  selected,
  center,
  density,
}: {
  point: HeatmapPoint;
  selected: boolean;
  center: boolean;
  density: "normal" | "compact" | "dense";
}) {
  const category = getRankCategory(point.rank);

  const html = `
    <button
      type="button"
      class="
        leaflet-grid-marker
        ${category}
        density-${density}
        ${selected ? "is-selected" : ""}
        ${center ? "is-center" : ""}
      "
      aria-label="${getRankDescription(point.rank)}"
    >
      ${
        center
          ? `
            <span
              class="leaflet-grid-center-target"
              aria-hidden="true"
            ></span>
          `
          : ""
      }

      <span
        class="leaflet-grid-marker-pulse"
        aria-hidden="true"
      ></span>

      <span class="leaflet-grid-marker-core">
        ${point.rank ?? "–"}
      </span>
    </button>
  `;

  const size =
    density === "dense"
      ? 30
      : density === "compact"
        ? 42
        : 58;

  return L.divIcon({
    html,
    className: "leaflet-grid-icon",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function FitMapToPoints({
  points,
  expanded,
}: {
  points: HeatmapPoint[];
  expanded: boolean;
}) {
  const map = useMap();

  useEffect(() => {
    if (points.length === 0) {
      return;
    }

    const timer = window.setTimeout(
      () => {
        map.invalidateSize({
          pan: false,
        });

        if (points.length === 1) {
          map.setView(
            [
              points[0].latitude,
              points[0].longitude,
            ],
            15,
            {
              animate: true,
            }
          );

          return;
        }

        const bounds = L.latLngBounds(
          points.map((point) => [
            point.latitude,
            point.longitude,
          ])
        );

        map.fitBounds(bounds, {
          padding: expanded
            ? [100, 100]
            : [70, 70],
          maxZoom: 15,
          animate: true,
          duration: 0.8,
        });
      },
      expanded ? 150 : 50
    );

    return () => {
      window.clearTimeout(timer);
    };
  }, [expanded, map, points]);

  return null;
}

function ResizeMap({
  expanded,
}: {
  expanded: boolean;
}) {
  const map = useMap();

  useEffect(() => {
    const container =
      map.getContainer();

    let animationFrame = 0;

    function resizeMap() {
      window.cancelAnimationFrame(
        animationFrame
      );

      animationFrame =
        window.requestAnimationFrame(
          () => {
            map.invalidateSize({
              pan: false,
            });
          }
        );
    }

    resizeMap();

    const resizeObserver =
      new ResizeObserver(
        resizeMap
      );

    resizeObserver.observe(
      container
    );

    const firstTimer =
      window.setTimeout(
        resizeMap,
        100
      );

    const secondTimer =
      window.setTimeout(
        resizeMap,
        350
      );

    window.addEventListener(
      "resize",
      resizeMap
    );

    return () => {
      window.cancelAnimationFrame(
        animationFrame
      );

      window.clearTimeout(
        firstTimer
      );

      window.clearTimeout(
        secondTimer
      );

      resizeObserver.disconnect();

      window.removeEventListener(
        "resize",
        resizeMap
      );
    };
  }, [expanded, map]);

  return null;
}


export default function MapHeatmap({
  points,
  onPointClick,
  selectedPoint = null,
  expanded = false,
}: MapHeatmapProps) {
  const validPoints = useMemo(
    () =>
      points.filter(
        (point) =>
          Number.isFinite(point.latitude) &&
          Number.isFinite(point.longitude)
      ),
    [points]
  );

  const centerPoint = useMemo(() => {
    if (validPoints.length === 0) {
      return null;
    }

    const maximumRow = Math.max(
      ...validPoints.map(
        (point) => point.grid_row
      )
    );

    const maximumColumn = Math.max(
      ...validPoints.map(
        (point) => point.grid_col
      )
    );

    const centerRow = Math.floor(
      maximumRow / 2
    );

    const centerColumn = Math.floor(
      maximumColumn / 2
    );

    return (
      validPoints.find(
        (point) =>
          point.grid_row === centerRow &&
          point.grid_col === centerColumn
      ) ?? validPoints[0]
    );
  }, [validPoints]);

  const markerDensity = useMemo(() => {
    if (validPoints.length > 100) {
      return "dense" as const;
    }

    if (validPoints.length > 25) {
      return "compact" as const;
    }

    return "normal" as const;
  }, [validPoints.length]);

  if (
    validPoints.length === 0 ||
    !centerPoint
  ) {
    return (
      <div
        className={[
          "flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-500",
          expanded
            ? "h-full min-h-[420px]"
            : "h-[620px]",
        ].join(" ")}
      >
        Map coordinates are unavailable.
      </div>
    );
  }

  const selectedKey = selectedPoint
    ? getPointKey(selectedPoint)
    : null;

  const centerKey =
    getPointKey(centerPoint);

  const gridDimension = Math.round(
    Math.sqrt(validPoints.length)
  );

  return (
    <>
      <div
        className={[
          "relative overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-md",
          expanded
            ? "h-full min-h-0"
            : "",
        ].join(" ")}
      >
        <MapContainer
          key={
            expanded
              ? "expanded-map"
              : "inline-map"
          }
          center={[
            centerPoint.latitude,
            centerPoint.longitude,
          ]}
          zoom={12}
          scrollWheelZoom
          zoomControl
          className={
            expanded
              ? "absolute inset-0 w-full"
              : "w-full"
          }
          style={{
            height: expanded
              ? "100%"
              : "620px",
            minHeight: expanded
              ? "100%"
              : "620px",
          }}
        >
          <ResizeMap
            expanded={expanded}
          />

          <FitMapToPoints
            points={validPoints}
            expanded={expanded}
          />

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
            opacity={1}
            className="strong-map-tiles"
          />

          {validPoints.map((point) => {
            const pointKey =
              getPointKey(point);

            const selected =
              pointKey === selectedKey;

            const center =
              pointKey === centerKey;

            return (
              <Marker
                key={pointKey}
                position={[
                  point.latitude,
                  point.longitude,
                ]}
                icon={createRankMarkerIcon({
                  point,
                  selected,
                  center,
                  density: markerDensity,
                })}
                zIndexOffset={
                  selected
                    ? 1000
                    : center
                      ? 900
                      : 100
                }
                eventHandlers={{
                  click: () =>
                    onPointClick(point),
                }}
              >
                <Tooltip
                  direction="top"
                  offset={[0, -18]}
                  opacity={1}
                  className="grid-rank-tooltip"
                >
                  <div className="space-y-1">
                    <p className="font-semibold text-slate-900">
                      {getRankDescription(
                        point.rank
                      )}
                    </p>

                    <p className="text-xs text-slate-500">
                      Row{" "}
                      {point.grid_row + 1} •
                      Column{" "}
                      {point.grid_col + 1}
                    </p>
                  </div>
                </Tooltip>
              </Marker>
            );
          })}
        </MapContainer>

        <div className="pointer-events-none absolute bottom-5 left-1/2 z-[500] flex -translate-x-1/2 items-center gap-2">
          <div className="rounded-lg bg-slate-900/90 px-4 py-2 text-sm font-semibold text-white shadow-xl backdrop-blur">
            {gridDimension}×
            {gridDimension} grid
          </div>

          <div className="rounded-lg bg-white/95 px-4 py-2 text-sm font-semibold text-slate-800 shadow-xl ring-1 ring-slate-200 backdrop-blur">
            {validPoints.length} points
          </div>
        </div>
      </div>

      <style jsx global>{`
        .leaflet-container {
          background: #eaf1f7;
          font-family: inherit;
        }

        .strong-map-tiles {
          filter:
            saturate(1.22)
            contrast(1.08)
            brightness(0.99);
        }

        .leaflet-control-zoom {
          border: none !important;
          border-radius: 12px !important;
          box-shadow:
            0 10px 25px
            rgba(15, 23, 42, 0.16) !important;
          overflow: hidden;
        }

        .leaflet-control-zoom a {
          width: 38px !important;
          height: 38px !important;
          line-height: 38px !important;
          border-bottom:
            1px solid #e2e8f0 !important;
          background: #ffffff !important;
          color: #0f172a !important;
        }

        .leaflet-control-zoom a:hover {
          background: #f8fafc !important;
        }

        .leaflet-control-attribution {
          border-radius: 8px 0 0 0;
          background:
            rgba(
              255,
              255,
              255,
              0.88
            ) !important;
          padding:
            4px 8px !important;
          color: #64748b !important;
        }

        .leaflet-grid-icon {
          border: none !important;
          background: transparent !important;
        }

        .leaflet-grid-marker {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 0;
          padding: 0;
          background: transparent;
          cursor: pointer;
          transform-origin: center;
          transition:
            transform 180ms ease,
            filter 180ms ease;
        }

        .leaflet-grid-marker:hover {
          transform: scale(1.13);
          filter: brightness(0.98);
        }

        .leaflet-grid-marker-core {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid;
          border-radius: 9999px;
          background:
            rgba(
              255,
              255,
              255,
              0.97
            );
          font-weight: 800;
          letter-spacing: -0.03em;
          box-shadow:
            0 3px 8px
              rgba(
                15,
                23,
                42,
                0.2
              ),
            0 12px 25px
              rgba(
                15,
                23,
                42,
                0.13
              );
          transition:
            transform 180ms ease,
            box-shadow 180ms ease;
        }

        .leaflet-grid-marker-pulse {
          position: absolute;
          z-index: 1;
          border-radius: 9999px;
          opacity: 0.16;
          animation:
            leaflet-grid-pulse
            2.4s ease-in-out
            infinite;
        }

        .leaflet-grid-marker.is-selected
          .leaflet-grid-marker-core {
          transform: scale(1.16);
          box-shadow:
            0 0 0 5px
              rgba(
                37,
                99,
                235,
                0.2
              ),
            0 16px 30px
              rgba(
                15,
                23,
                42,
                0.22
              );
        }

        .leaflet-grid-marker.is-selected
          .leaflet-grid-marker-pulse {
          opacity: 0.3;
          animation-duration: 1.25s;
        }

        .leaflet-grid-center-target {
          position: absolute;
          z-index: 0;
          border: 3px solid #ef4444;
          border-radius: 9999px;
          background:
            radial-gradient(
              circle,
              #ef4444 0 3px,
              #ffffff 4px 7px,
              #ef4444 8px 10px,
              transparent 11px
            );
          box-shadow:
            0 0 0 4px
              rgba(
                239,
                68,
                68,
                0.16
              );
          animation:
            center-target-pulse
            1.8s ease-out infinite;
        }

        .density-normal {
          width: 58px;
          height: 58px;
        }

        .density-normal
          .leaflet-grid-marker-core {
          width: 44px;
          height: 44px;
          font-size: 16px;
        }

        .density-normal
          .leaflet-grid-marker-pulse {
          width: 56px;
          height: 56px;
        }

        .density-normal
          .leaflet-grid-center-target {
          width: 66px;
          height: 66px;
        }

        .density-compact {
          width: 42px;
          height: 42px;
        }

        .density-compact
          .leaflet-grid-marker-core {
          width: 32px;
          height: 32px;
          border-width: 2px;
          font-size: 12px;
        }

        .density-compact
          .leaflet-grid-marker-pulse {
          width: 42px;
          height: 42px;
        }

        .density-compact
          .leaflet-grid-center-target {
          width: 50px;
          height: 50px;
          border-width: 2px;
        }

        .density-dense {
          width: 30px;
          height: 30px;
        }

        .density-dense
          .leaflet-grid-marker-core {
          width: 23px;
          height: 23px;
          border-width: 2px;
          font-size: 9px;
        }

        .density-dense
          .leaflet-grid-marker-pulse {
          width: 30px;
          height: 30px;
        }

        .density-dense
          .leaflet-grid-center-target {
          width: 38px;
          height: 38px;
          border-width: 2px;
        }

        .leaflet-grid-marker.top-three
          .leaflet-grid-marker-core {
          border-color: #16a34a;
          color: #166534;
        }

        .leaflet-grid-marker.top-three
          .leaflet-grid-marker-pulse {
          background: #22c55e;
        }

        .leaflet-grid-marker.top-ten
          .leaflet-grid-marker-core {
          border-color: #eab308;
          color: #854d0e;
        }

        .leaflet-grid-marker.top-ten
          .leaflet-grid-marker-pulse {
          background: #facc15;
        }

        .leaflet-grid-marker.top-twenty
          .leaflet-grid-marker-core {
          border-color: #f97316;
          color: #9a3412;
        }

        .leaflet-grid-marker.top-twenty
          .leaflet-grid-marker-pulse {
          background: #fb923c;
        }

        .leaflet-grid-marker.twenty-plus
          .leaflet-grid-marker-core {
          border-color: #ef4444;
          color: #991b1b;
        }

        .leaflet-grid-marker.twenty-plus
          .leaflet-grid-marker-pulse {
          background: #f87171;
        }

        .leaflet-grid-marker.not-ranked
          .leaflet-grid-marker-core {
          border-color: #64748b;
          color: #475569;
        }

        .leaflet-grid-marker.not-ranked
          .leaflet-grid-marker-pulse {
          background: #94a3b8;
        }

        .grid-rank-tooltip {
          border:
            1px solid #e2e8f0 !important;
          border-radius:
            12px !important;
          background:
            #ffffff !important;
          box-shadow:
            0 14px 30px
            rgba(
              15,
              23,
              42,
              0.16
            ) !important;
          padding:
            10px 12px !important;
          color:
            #0f172a !important;
        }

        @keyframes leaflet-grid-pulse {
          0%,
          100% {
            transform: scale(0.86);
            opacity: 0.16;
          }

          50% {
            transform: scale(1.08);
            opacity: 0.04;
          }
        }

        @keyframes center-target-pulse {
          0% {
            transform: scale(0.9);
            opacity: 1;
          }

          75%,
          100% {
            transform: scale(1.2);
            opacity: 0.35;
          }
        }
      `}</style>
    </>
  );
}