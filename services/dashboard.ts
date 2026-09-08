import api from "./api";

export interface DashboardSummary {
  total_projects: number;
  total_keywords: number;
  average_rank: number | null;
  top_10_rankings: number;
}

export interface WorkspaceRankingHistoryPoint {
  id: number;
  keyword_id: number;
  rank: number;
  scanned_at: string;
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const response = await api.get(
    "/dashboard/summary"
  );

  return response.data.summary;
}

export async function getWorkspaceRankingHistory(
  days = 30
): Promise<WorkspaceRankingHistoryPoint[]> {
  const response = await api.get(
    "/dashboard/ranking-history",
    {
      params: {
        days,
      },
    }
  );

  return response.data.history;
}
