import {
  Activity,
  Eye,
  Medal,
  TrendingDown,
} from "lucide-react";

type ScanSummaryProps = {
  averageRank: string | number;
  bestRank: string | number;
  worstRank: string | number;
  visibility: number;
};

type SummaryCardProps = {
  title: string;
  value: string | number;
  description: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  accentClass: string;
  iconWrapClass: string;
};

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  accentClass,
  iconWrapClass,
}: SummaryCardProps) {
  return (
    <div
      className={`group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`}
    >
      <div className={`h-1.5 w-full ${accentClass}`} />

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">
              {title}
            </p>

            <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
              {value}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              {description}
            </p>
          </div>

          <div
            className={`rounded-2xl p-3 shadow-sm ${iconWrapClass}`}
          >
            <Icon className="h-5 w-5 text-slate-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ScanSummary({
  averageRank,
  bestRank,
  worstRank,
  visibility,
}: ScanSummaryProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Average Rank"
        value={averageRank}
        description="Across all scanned grid points"
        icon={Activity}
        accentClass="bg-blue-500"
        iconWrapClass="bg-blue-50"
      />

      <SummaryCard
        title="Best Rank"
        value={bestRank}
        description="Highest ranking position found"
        icon={Medal}
        accentClass="bg-emerald-500"
        iconWrapClass="bg-emerald-50"
      />

      <SummaryCard
        title="Worst Rank"
        value={worstRank}
        description="Lowest ranking position found"
        icon={TrendingDown}
        accentClass="bg-orange-500"
        iconWrapClass="bg-orange-50"
      />

      <SummaryCard
        title="Visibility"
        value={`${visibility}%`}
        description="Top 10 grid coverage"
        icon={Eye}
        accentClass="bg-violet-500"
        iconWrapClass="bg-violet-50"
      />
    </section>
  );
}