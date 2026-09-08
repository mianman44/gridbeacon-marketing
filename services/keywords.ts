const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export interface Keyword {
  id: number;
  business_id: number;
  business_name: string | null;
  keyword: string;
  current_rank: number | null;
  best_rank: number | null;
  scan_status: string | null;
  last_scan: string | null;
  latest_scan_job_id: number | null;
  active_scan_job_id: number | null;
  active_scan_status: string | null;
  scan_completed_points: number | null;
  scan_total_points: number | null;
  scan_progress_percentage: number | null;
}

export interface CreateKeywordPayload {
  business_id: number;
  keyword: string;
}

export async function getProjectKeywords(
  projectId: number
): Promise<Keyword[]> {
  const response = await fetch(
    `${API_URL}/keywords/project/${projectId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load keywords");
  }

  return response.json();
}

export async function createKeyword(
  payload: CreateKeywordPayload
): Promise<{ message: string; id: number }> {
  const response = await fetch(
    `${API_URL}/keywords`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(
      error?.detail || "Failed to create keyword"
    );
  }

  return response.json();
}

export async function deleteKeyword(
  keywordId: number
): Promise<{
  success: boolean;
  message: string;
  keyword_id: number;
}> {
  const response = await fetch(
    `${API_URL}/keywords/${keywordId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(
      error?.detail || "Failed to delete keyword"
    );
  }

  return response.json();
}
