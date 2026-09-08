import type { ReactNode } from "react";

interface DataTableProps {
  headers: ReactNode;
  children: ReactNode;
}

export function DataTable({
  headers,
  children,
}: DataTableProps) {
  return (
    <div className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto overflow-y-visible">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            {headers}
          </thead>

          <tbody className="divide-y divide-slate-200">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}