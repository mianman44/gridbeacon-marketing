import {
  FolderKanban,
  Search,
  Target,
  Trophy,
} from "lucide-react";

import { StatCard } from "./stat-card";

type DashboardStatsProps = {
  totalProjects: number;
  totalKeywords: number;
  averageRank: number | null;
  top10Rankings: number;
};

export default function DashboardStats({
  totalProjects,
  totalKeywords,
  averageRank,
  top10Rankings,
}: DashboardStatsProps) {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Projects"
        value={totalProjects}
        description="Active ranking projects"
        icon={FolderKanban}
        variant="blue"
      />

      <StatCard
        title="Total Keywords"
        value={totalKeywords}
        description="Keywords currently tracked"
        icon={Search}
        variant="green"
      />

      <StatCard
        title="Average Rank"
        value={averageRank ?? "-"}
        description="Across ranked keywords"
        icon={Target}
        variant="orange"
      />

      <StatCard
        title="Top 10 Rankings"
        value={top10Rankings}
        description="Keywords ranking in Top 10"
        icon={Trophy}
        variant="default"
      />
    </section>
  );
}