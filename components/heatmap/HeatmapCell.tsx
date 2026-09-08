"use client";

import { useState } from "react";
import HeatmapTooltip from "./HeatmapTooltip";

type HeatmapCellProps = {
  rank: number | null;
  row: number;
  col: number;
  latitude: number;
  longitude: number;
  isCenter?: boolean;
  onClick?: () => void;
};

function getColor(rank: number | null) {
  if (rank === null) {
    return "bg-gray-50 border-gray-300";
  }

  if (rank <= 3) {
    return "bg-green-100 border-green-500";
  }

  if (rank <= 10) {
    return "bg-yellow-100 border-yellow-500";
  }

  if (rank <= 20) {
    return "bg-orange-100 border-orange-500";
  }

  return "bg-red-100 border-red-500";
}

export default function HeatmapCell({
  rank,
  row,
  col,
  latitude,
  longitude,
  isCenter = false,
  onClick,
}: HeatmapCellProps) {
  const [hover, setHover] = useState(false);

  return (
    <div className="relative">
      {hover && (
        <HeatmapTooltip
          rank={rank}
          row={row}
          col={col}
          latitude={latitude}
          longitude={longitude}
        />
      )}

      <button
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`
          ${getColor(rank)}
          aspect-square
          w-full
          rounded-2xl
          border-2
          p-4
          flex
          flex-col
          items-center
          justify-center
          transition-all
          duration-300
          hover:scale-105
          hover:-translate-y-1
          hover:shadow-2xl
          active:scale-95
          cursor-pointer
        `}
      >
        <div className="text-5xl font-bold text-slate-900">
          {rank ?? "-"}
        </div>

        {isCenter ? (
          <>
            <div className="mt-3 text-2xl">📍</div>

            <div className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Search Center
            </div>
          </>
        ) : (
          <>
            <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Row {row + 1}
            </div>

            <div className="text-xs text-slate-400">
              Col {col + 1}
            </div>
          </>
        )}
      </button>
    </div>
  );
}