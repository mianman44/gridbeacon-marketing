export function DataTableLoading() {
  return (
    <div className="space-y-3 p-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="h-12 animate-pulse rounded-lg bg-slate-100"
        />
      ))}
    </div>
  );
}