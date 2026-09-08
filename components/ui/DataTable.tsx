import type { ReactNode } from "react";

type DataTableColumn<T> = {
  key: string;
  header: ReactNode;
  className?: string;
  render: (item: T, index: number) => ReactNode;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowKey: (item: T, index: number) => string | number;
  emptyMessage?: string;
  loading?: boolean;
  loadingRows?: number;
  onRowClick?: (item: T) => void;
};

export default function DataTable<T>({
  columns,
  data,
  getRowKey,
  emptyMessage = "No records found.",
  loading = false,
  loadingRows = 5,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50/80">
            <tr className="border-b border-slate-200">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={[
                    "whitespace-nowrap px-5 py-3.5 text-left",
                    "text-xs font-semibold uppercase tracking-wide text-slate-500",
                    column.className ?? "",
                  ].join(" ")}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading ? (
              Array.from({ length: loadingRows }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-5 py-4"
                    >
                      <div className="h-4 animate-pulse rounded bg-slate-100" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={getRowKey(item, index)}
                  onClick={() => onRowClick?.(item)}
                  className={[
                    "transition-colors",
                    onRowClick
                      ? "cursor-pointer hover:bg-slate-50"
                      : "hover:bg-slate-50/70",
                  ].join(" ")}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={[
                        "px-5 py-4 align-middle text-slate-700",
                        column.className ?? "",
                      ].join(" ")}
                    >
                      {column.render(item, index)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-14 text-center"
                >
                  <div className="mx-auto max-w-sm">
                    <p className="font-medium text-slate-700">
                      Nothing to show
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {emptyMessage}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export type {
  DataTableColumn,
  DataTableProps,
};