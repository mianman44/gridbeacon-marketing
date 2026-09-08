export function DataTablePagination() {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
      <p className="text-sm text-slate-500">
        Showing 1–10 of 24 results
      </p>

      <div className="flex gap-2">
        <button className="rounded border px-3 py-1">
          Previous
        </button>

        <button className="rounded border px-3 py-1">
          Next
        </button>
      </div>
    </div>
  );
}