import type { LucideIcon } from "lucide-react";
import {
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

type StatCardVariant =
  | "default"
  | "blue"
  | "green"
  | "orange"
  | "red";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: string;
    direction: "up" | "down";
  };
  variant?: StatCardVariant;
  progress?: number;
}

const variantStyles: Record<
  StatCardVariant,
  {
    icon: string;
    value: string;
    accent: string;
    progress: string;
  }
> = {
  default: {
    icon: "bg-slate-100 text-slate-700",
    value: "text-slate-950",
    accent: "from-slate-400 to-slate-700",
    progress: "bg-slate-900",
  },
  blue: {
    icon: "bg-blue-50 text-blue-700",
    value: "text-blue-700",
    accent: "from-blue-400 to-blue-700",
    progress: "bg-blue-600",
  },
  green: {
    icon: "bg-emerald-50 text-emerald-700",
    value: "text-emerald-700",
    accent: "from-emerald-400 to-emerald-700",
    progress: "bg-emerald-600",
  },
  orange: {
    icon: "bg-orange-50 text-orange-700",
    value: "text-orange-700",
    accent: "from-orange-400 to-orange-700",
    progress: "bg-orange-600",
  },
  red: {
    icon: "bg-red-50 text-red-700",
    value: "text-red-700",
    accent: "from-red-400 to-red-700",
    progress: "bg-red-600",
  },
};

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = "default",
  progress,
}: StatCardProps) {
  const styles = variantStyles[variant];

  const TrendIcon =
    trend?.direction === "up"
      ? ArrowUpRight
      : ArrowDownRight;

  const safeProgress =
    progress === undefined
      ? undefined
      : Math.min(100, Math.max(0, progress));

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${styles.accent}`}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p
            className={`mt-3 text-3xl font-bold tracking-tight ${styles.value}`}
          >
            {value}
          </p>
        </div>

        {Icon && (
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${styles.icon}`}
          >
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>

      {safeProgress !== undefined && (
        <div className="mt-4">
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full transition-all duration-500 ${styles.progress}`}
              style={{
                width: `${safeProgress}%`,
              }}
            />
          </div>
        </div>
      )}

      {(description || trend) && (
        <div className="mt-4 flex items-center justify-between gap-3">
          {description && (
            <p className="text-xs leading-5 text-slate-500">
              {description}
            </p>
          )}

          {trend && (
            <div
              className={[
                "flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
                trend.direction === "up"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-700",
              ].join(" ")}
            >
              <TrendIcon className="h-3.5 w-3.5" />
              {trend.value}
            </div>
          )}
        </div>
      )}
    </div>
  );
}