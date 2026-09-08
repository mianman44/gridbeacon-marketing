"use client";

import { useEffect, useState } from "react";
import {
  FolderKanban,
  Search,
  Target,
  Trophy,
} from "lucide-react";

import {
  getDashboardSummary,
  DashboardSummary,
} from "@/services/dashboard";

import { useProjects } from "@/hooks/use-projects";

import { CreateProjectDialog } from "@/components/projects/create-project-dialog";
import { ProjectCard } from "@/components/projects/project-card";
import { StatCard } from "@/components/dashboard/stat-card";

import PageHeader from "@/components/ui/PageHeader";
import PageSkeleton from "@/components/ui/PageSkeleton";
import EmptyState from "@/components/ui/EmptyState";

export default function ProjectsPage() {
  const {
    data = [],
    isLoading,
    error,
  } = useProjects();

  const [summary, setSummary] =
    useState<DashboardSummary | null>(null);
const [search, setSearch] =
  useState("");
  useEffect(() => {
    async function loadSummary() {
      try {
        const summaryData =
          await getDashboardSummary();

        setSummary(summaryData);
      } catch (error) {
        console.error(
          "Failed to load dashboard summary:",
          error
        );
      }
    }

    loadSummary();
  }, []);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl p-8">
        <PageSkeleton />
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-7xl p-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          Error loading projects.
        </div>
      </main>
    );
  }

  const validProjects = data.filter(
  (project: any) => project.name
);

const filteredProjects =
  validProjects.filter((project: any) =>
    project.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="mx-auto max-w-7xl p-8">
      <PageHeader
        title="Projects"
        description="Manage all Google Business Profile projects."
        actions={<CreateProjectDialog />}
      />

      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Projects"
          value={
            summary?.total_projects ??
            validProjects.length
          }
          icon={FolderKanban}
          variant="blue"
        />

        <StatCard
          title="Keywords"
          value={summary?.total_keywords ?? 0}
          icon={Search}
          variant="green"
        />

        <StatCard
          title="Average Rank"
          value={summary?.average_rank ?? "-"}
          icon={Target}
          variant="orange"
        />

        <StatCard
          title="Top 10 Rankings"
          value={summary?.top_10_rankings ?? 0}
          icon={Trophy}
          variant="default"
        />
      </div>
<div className="mb-8">
  <input
    type="text"
    placeholder="Search projects..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
  />
</div>
      {filteredProjects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Create your first project to start tracking Google Business Profile rankings."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project: any) => (
            <ProjectCard
  key={project.id}
  id={project.id}
  name={project.name}
  city={project.city}
  keyword={project.keyword}
  businessCount={project.business_count ?? 0}
  keywordCount={project.keyword_count ?? 0}
/>
          ))}
        </div>
      )}
    </main>
  );
}