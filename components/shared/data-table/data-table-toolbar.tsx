"use client";

import { Search, Plus } from "lucide-react";

interface ToolbarProps {
  title?: string;
}

export function DataTableToolbar({
  title,
}: ToolbarProps) {
  return (
    <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        {title && (
          <h2 className="text-xl font-bold text-slate-900">
            {title}
          </h2>
        )}

        <p className="text-sm text-slate-500">
          Search, filter and manage your data.
        </p>
      </div>

      <div className="flex gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

          <input
            placeholder="Search..."
            className="h-10 w-64 rounded-lg border border-slate-200 pl-10 pr-3 text-sm"
          />
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 text-white">
          <Plus size={16} />
          Add
        </button>
      </div>
    </div>
  );
}