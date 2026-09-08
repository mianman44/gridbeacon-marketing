type HeatmapTooltipProps = {
  rank: number | null;
  row: number;
  col: number;
  latitude: number;
  longitude: number;
};

export default function HeatmapTooltip({
  rank,
  row,
  col,
  latitude,
  longitude,
}: HeatmapTooltipProps) {
  return (
    <div className="absolute left-1/2 top-0 z-50 w-64 -translate-x-1/2 -translate-y-[110%] rounded-xl border bg-white p-4 shadow-2xl">

      <h3 className="font-semibold text-slate-900">
        Grid Point
      </h3>

      <div className="mt-3 text-sm">
        <strong>Rank:</strong> #{rank ?? "-"}
      </div>

      <div className="mt-3 space-y-1 text-xs text-slate-600">
        <div>📍 Row {row + 1}</div>
        <div>📍 Column {col + 1}</div>
        {latitude != null ? latitude.toFixed(6) : "N/A"}
        {longitude != null ? longitude.toFixed(6) : "N/A"}
      </div>

      <div className="mt-4 border-t pt-3 text-xs font-medium text-blue-600">
        Click to inspect this location →
      </div>
    </div>
  );
}