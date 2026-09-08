import api from "./api";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  export type ScanJobResponse = {
  id?: number;
  job_id?: number;
  keyword_id?: number;
  status: string;
  radius_miles?: number | null;
  grid_size?: number | null;
  created_at?: string | null;
  started_at?: string | null;
  finished_at?: string | null;
  error?: string | null;
};

export type ScanResult = {
  id: number;
  keyword_id: number;
  scan_job_id: number;
  position: number;
  business_name: string;
  rating: number | null;
  reviews: number | null;
  place_id: string | null;
  maps_url: string | null;
  website: string | null;
  scanned_at: string;
};

export type ScanJob = {
  id: number;
  keyword_id: number;
  status: string;
  started_at: string | null;
  finished_at: string | null;
  error: string | null;
  created_at: string;
};

export type StartScanResponse = {
  success: boolean;
  job: {
    job_id: number;
    status: string;
    radius_miles: number;
    grid_size: number;
    total_points: number;
  };
};

export type GridPoint = {
  grid_row: number;
  grid_col: number;
  latitude: number | null;
  longitude: number | null;
  rank: number | null;
};

export type ScanGridResponse = {
  success: boolean;
  scan_job_id: number;
  grid_size: number;
  business: {
    id: number;
    business_name: string;
    place_id: string;
  };
  points: GridPoint[];
};

export async function startScan(
  keywordId: number,
  radiusMiles: number = 1,
  gridSize: number = 3
): Promise<StartScanResponse> {
  try {
    const response = await api.post(
      `/scan/${keywordId}`,
      null,
      {
        params: {
          radius_miles: radiusMiles,
          grid_size: gridSize,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    const detail =
      error?.response?.data?.detail;

    if (typeof detail === "string") {
      throw new Error(detail);
    }

    if (
      detail &&
      typeof detail.message === "string"
    ) {
      throw new Error(detail.message);
    }

    throw new Error(
      "Failed to start scan"
    );
  }
}

export async function getScanJob(
  jobId: number
): Promise<ScanJobResponse> {
  const response = await fetch(
    `${API_URL}/scan-jobs/${jobId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load scan job");
  }

  return response.json();
}

export async function getScanGrid(
  jobId: number
): Promise<ScanGridResponse> {
  const response = await fetch(
    `${API_URL}/scan-jobs/${jobId}/grid`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load grid");
  }

  return response.json();
}

export async function getGridPointDetails(
  jobId: number,
  row: number,
  col: number
): Promise<GridPointDetails> {
  const response = await fetch(
    `${API_URL}/scan-jobs/${jobId}/grid/${row}/${col}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load grid point");
  }

  return response.json();
}

export async function getKeywordScanHistory(
  keywordId: number
) {
  const response = await fetch(
    `${API_URL}/keywords/${keywordId}/scan-history`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load scan history");
  }

  return response.json();
}

export type GridPointDetails = {
  success: boolean;
  scan_job_id: number;
  grid_row: number;
  grid_col: number;
  latitude: number;
  longitude: number;
  rank: number | null;

  tracked_business: {
    id: number;
    business_name: string;
    place_id: string;
  };

  businesses: {
    id: number;
    position: number;
    business_name: string;
    rating: number | null;
    reviews: number | null;
    website: string | null;
    maps_url: string | null;
    is_tracked_business: boolean;
  }[];
};

export type RecentScan = {
  id: number;
  project: string;
  business: string;
  keyword: string;
  status: string;
  created_at: string;
  finished_at: string | null;
};

export async function getRecentScans(
  limit = 10
): Promise<RecentScan[]> {
  const response = await fetch(
    `${API_URL}/scan-jobs/recent?limit=${limit}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load recent scans");
  }

  const data = await response.json();

  return data.items;
}
export type KeywordHistoryPoint = {
  id: number;
  keyword_id: number;
  rank: number | null;
  scanned_at: string;
};

export async function getKeywordHistory(
  keywordId: number
): Promise<KeywordHistoryPoint[]> {
  const response = await fetch(
    `${API_URL}/keywords/${keywordId}/scan-history`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load keyword history");
  }

  const data = await response.json();

  return data.history;
}

export type CancelScanResponse = {
  success: boolean;
  job_id: number;
  status: string;
  credit_status?: string;
  message: string;
};

export async function cancelScan(
  jobId: number,
): Promise<CancelScanResponse> {
  try {
    const response =
      await api.post<CancelScanResponse>(
        `/scan-jobs/${jobId}/cancel`,
      );

    return response.data;
  } catch (error: any) {
    const detail =
      error?.response?.data?.detail;

    if (typeof detail === "string") {
      throw new Error(detail);
    }

    throw new Error(
      "Failed to cancel scan",
    );
  }
}

