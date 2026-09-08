"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Loader2 } from "lucide-react";

type Business = {
  id?: number;
  position: number;
  business_name: string;
  rating?: number | null;
  reviews?: number | null;
  website?: string | null;
  maps_url?: string | null;
  is_tracked_business?: boolean;
};

type GridDetailsPanelProps = {
  open: boolean;
  onClose: () => void;
  row: number;
  col: number;
  latitude: number;
  longitude: number;
  rank: number | null;
  businesses?: Business[];
  loading?: boolean;
};

export default function GridDetailsPanel({
  open,
  onClose,
  row,
  col,
  latitude,
  longitude,
  rank,
  businesses = [],
  loading = false,
}: GridDetailsPanelProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[99999] isolate">
      <button
        type="button"
        aria-label="Close grid details"
        onClick={onClose}
        className="absolute inset-0 z-0 h-full w-full cursor-default bg-slate-950/50"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="grid-point-title"
        className="absolute inset-y-0 right-0 z-10 flex w-full max-w-[430px] flex-col overflow-hidden border-l border-slate-200 bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="z-20 flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
          <div>
            <h2
              id="grid-point-title"
              className="text-xl font-bold text-slate-950"
            >
              Grid Point
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Row {row + 1} • Col {col + 1}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close grid details"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-white p-6">
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-medium text-slate-500">
                Current Rank
              </div>

              <div className="mt-2 text-4xl font-bold text-slate-950">
                #{rank ?? "-"}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="font-semibold text-slate-950">Coordinates</h3>

              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Latitude
                  </div>

                  <div className="mt-1 font-mono text-slate-700">
                    {latitude.toFixed(6)}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Longitude
                  </div>

                  <div className="mt-1 font-mono text-slate-700">
                    {longitude.toFixed(6)}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-slate-950">
                  Nearby Businesses
                </h3>

                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {loading
                    ? "Loading..."
                    : `${businesses.length} results`}
                </span>
              </div>

              {loading ? (
                <div className="flex items-center justify-center gap-2 rounded-lg bg-slate-50 px-4 py-8 text-sm text-slate-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading grid-point results...
                </div>
              ) : businesses.length === 0 ? (
                <p className="rounded-lg bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                  No business results are available for this grid point.
                </p>
              ) : (
                <div className="space-y-3">
                  {businesses.map((business) => {
                    const positionClasses =
                      business.position === 1
                        ? "bg-amber-100 text-amber-700"
                        : business.position === 2
                          ? "bg-slate-200 text-slate-700"
                          : business.position === 3
                            ? "bg-orange-100 text-orange-700"
                            : business.position <= 10
                              ? "bg-blue-100 text-blue-700"
                              : "bg-slate-100 text-slate-600";

                    return (
                      <div
                        key={
                          business.id ??
                          `${business.position}-${business.business_name}`
                        }
                        className={`rounded-xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                          business.is_tracked_business
                            ? "border-green-500 bg-green-50"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`rounded-md px-2 py-1 text-xs font-bold ${positionClasses}`}
                              >
                                #{business.position}
                              </span>

                              {business.is_tracked_business && (
                                <span className="rounded-md bg-green-600 px-2 py-1 text-xs font-semibold text-white">
                                  Your Business
                                </span>
                              )}
                            </div>

                            <h4 className="mt-3 break-words font-semibold leading-5 text-slate-900">
                              {business.business_name}
                            </h4>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                          <span>⭐ {business.rating ?? "-"}</span>

                          <span>
                            📝 {(business.reviews ?? 0).toLocaleString()} reviews
                          </span>
                        </div>

                        {(business.website || business.maps_url) && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {business.website && (
                              <a
                                href={business.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                              >
                                🌐 Website
                              </a>
                            )}

                            {business.maps_url && (
                              <a
                                href={business.maps_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                              >
                                📍 Maps
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>,
    document.body
  );
}