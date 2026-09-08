import { Database } from "lucide-react";

export function DataTableEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <Database className="h-12 w-12 text-slate-300" />

      <h3 className="mt-5 text-lg font-semibold">
        No records found
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        Create your first record to get started.
      </p>
    </div>
  );
}