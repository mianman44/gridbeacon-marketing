"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getProject,
  getProjectCompetitors,
  getProjectOverview,
  getProjects,
} from "@/services/projects";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
}

export function useProject(id: number) {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => getProject(id),
    enabled:
      Number.isFinite(id) && id > 0,
  });
}

export function useProjectOverview(
  id: number
) {
  return useQuery({
    queryKey: [
      "project-overview",
      id,
    ],
    queryFn: () =>
      getProjectOverview(id),
    enabled:
      Number.isFinite(id) && id > 0,
    refetchInterval: 15_000,
  });
}

export function useProjectCompetitors(
  projectId: number,
  keywordId?: number
) {
  return useQuery({
    queryKey: [
      "project-competitors",
      projectId,
      keywordId ?? "all",
    ],
    queryFn: () =>
      getProjectCompetitors(
        projectId,
        keywordId
      ),
    enabled:
      Number.isFinite(projectId)
      && projectId > 0,
    refetchInterval: 30_000,
  });
}
