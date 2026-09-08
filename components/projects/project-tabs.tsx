"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Overview", slug: "" },
  { label: "Businesses", slug: "businesses" },
  { label: "Keywords", slug: "keywords" },
  { label: "Scans", slug: "scans" },
  { label: "Heatmaps", slug: "heatmaps" },
  { label: "Reports", slug: "reports" },
  { label: "Settings", slug: "settings" },
];

interface Props {
  projectId: number;
}

export default function ProjectTabs({
  projectId,
}: Props) {
  const pathname = usePathname();

  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        {tabs.map((tab) => {
          const href = tab.slug
            ? `/projects/${projectId}/${tab.slug}`
            : `/projects/${projectId}`;

          const active = pathname === href;

          return (
            <Link
              key={tab.label}
              href={href}
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-medium transition-all",
                active
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}