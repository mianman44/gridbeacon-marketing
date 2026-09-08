const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export type StartScanResponse = {
  success: boolean;
  job: {
    job_id: number;
    status: string;
    radius_miles: number;
  };
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
  radius_miles: number;
  status: string;
  started_at: string | null;
  finished_at: string | null;
  error: string | null;
  created_at: string;
};

export type ScanJobResponse = {
  success: boolean;
  job: ScanJob;
  results: ScanResult[];
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

export async function startScan(
  keywordId: number,
  radiusMiles: number = 1
): Promise<StartScanResponse> {
  const response = await fetch(
    `${API_URL}/scan/${keywordId}?radius_miles=${radiusMiles}`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(
      error?.detail || "Failed to start scan"
    );
  }

  return response.json();
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

