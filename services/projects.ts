import api from "./api";

export interface ProjectOverviewHistoryPoint {
  scan_job_id: number;
  keyword_id: number;
  keyword: string;
  completed_at: string;
  average_rank: number | null;
  visibility: number;
  top_3_rankings: number;
  ranked_points: number;
  total_points: number;
}

export interface ProjectRecentActivity {
  scan_job_id: number;
  status: string;
  keyword: string | null;
  business_name: string | null;
  grid_size: number | null;
  radius_miles: number | null;
  created_at: string;
  finished_at: string | null;
}

export interface ProjectOverview {
  business_count: number;
  keyword_count: number;
  completed_scans: number;
  average_rank: number | null;
  top_3_rankings: number;
  visibility: number;
  ranked_points: number;
  total_points: number;
  latest_scan_id: number | null;
  ranking_history: ProjectOverviewHistoryPoint[];
  recent_activity: ProjectRecentActivity[];
}

export async function getProjects() {
  const response = await api.get("/projects");
  return response.data;
}

export async function getProject(id: number) {
  const response = await api.get(
    `/projects/${id}`
  );

  return response.data;
}

export async function getProjectOverview(
  id: number
): Promise<ProjectOverview> {
  const response = await api.get(
    `/projects/${id}/overview`
  );

  return response.data.overview;
}

export async function createProject(data: {
  name: string;
  city: string;
  keyword: string;
}) {
  const response = await api.post(
    "/projects",
    data
  );

  return response.data;
}

export async function deleteProject(
  id: number
): Promise<{
  success: boolean;
  message: string;
  project_id: number;
}> {
  const response = await api.delete(
    `/projects/${id}`
  );

  return response.data;
}

export interface ProjectCompetitorKeyword {
  id: number;
  keyword: string;
  latest_scan_id: number | null;
  latest_scan_at: string | null;
}

export interface ProjectCompetitor {
  id: number;
  business_name: string;
  place_id: string | null;
  rating: number | null;
  reviews: number | null;
  website: string | null;
  maps_url: string | null;
  average_position: number;
  best_position: number;
  appearances: number;
  top_3_appearances: number;
  top_10_appearances: number;
  total_grid_points: number;
  coverage_percentage: number;
  keyword_ids: number[];
  keywords: string[];
  latest_scan_id: number;
  latest_scan_at: string | null;
}

export interface ProjectCompetitors {
  project_id: number;
  selected_keyword_id: number | null;
  keywords: ProjectCompetitorKeyword[];
  scans_analyzed: number;
  total_grid_points: number;
  total_competitors: number;
  competitors: ProjectCompetitor[];
}

export async function getProjectCompetitors(
  projectId: number,
  keywordId?: number
): Promise<ProjectCompetitors> {
  const response = await api.get(
    `/projects/${projectId}/competitors`,
    {
      params: keywordId
        ? {
            keyword_id: keywordId,
          }
        : undefined,
    }
  );

  return response.data.data;
}

export interface ProjectDetails {
  id: number;
  name: string;
  city: string;
  keyword: string;
  keyword_id: number | null;
}

export interface ProjectUpdatePayload {
  name: string;
  city: string;
  keyword: string;
}

export async function updateProject(
  id: number,
  data: ProjectUpdatePayload
): Promise<{
  success: boolean;
  message: string;
  project: ProjectDetails;
}> {
  const response = await api.patch(
    `/projects/${id}`,
    data
  );

  return response.data;
}

