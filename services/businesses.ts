import api from "@/services/api";

export interface Business {
  id: number;
  project_id: number;
  business_name: string;
  maps_url: string;
  place_id: string;
  latitude: string;
  longitude: string;
  category: string;
  full_address: string;
  rating: number | null;
  reviews: number;
  website: string;
  phone: string;
  profile_status:
    | "active"
    | "temporarily_closed"
    | "permanently_closed"
    | "unknown";
  last_scan: string | null;
  created_at?: string;
}

export interface CreateBusinessPayload {
  project_id: number;
  business_name: string;
  maps_url: string;
  place_id: string;
  latitude: string;
  longitude: string;
  category: string;
  full_address?: string;
  rating?: number | null;
  reviews?: number;
  website?: string;
  phone?: string;
  profile_status?:
    | "active"
    | "temporarily_closed"
    | "permanently_closed"
    | "unknown";
}

export interface BusinessLocationCandidate {
  place_id: string;
  business_name: string;
  category: string;
  formatted_address: string;
  rating: number | null;
  reviews: number;
  website: string;
  phone: string;
  profile_status:
    | "active"
    | "temporarily_closed"
    | "permanently_closed"
    | "unknown";
  maps_url: string;
  latitude: string;
  longitude: string;
  source: "google_places" | "maps_url";
  match_score: number;
  distance_miles: number | null;
}

export interface ResolveBusinessPayload {
  business_name: string;
  maps_url: string;
  category?: string;
}

export interface ResolveBusinessResponse {
  success: boolean;
  count: number;
  candidates: BusinessLocationCandidate[];
  warning?: string | null;
}

interface CreateBusinessResponse {
  message: string;
  id: number;
}

export async function getProjectBusinesses(
  projectId: number,
): Promise<Business[]> {
  const response = await api.get<Business[]>(
    `/businesses/project/${projectId}`,
  );

  return response.data;
}

export async function resolveBusinessLocation(
  payload: ResolveBusinessPayload,
): Promise<ResolveBusinessResponse> {
  const response =
    await api.post<ResolveBusinessResponse>(
      "/businesses/resolve",
      payload,
    );

  return response.data;
}

export async function createBusiness(
  payload: CreateBusinessPayload,
): Promise<CreateBusinessResponse> {
  const response =
    await api.post<CreateBusinessResponse>(
      "/businesses",
      payload,
    );

  return response.data;
}

export async function updateBusiness(
  businessId: number,
  payload: CreateBusinessPayload,
): Promise<Business> {
  const response = await api.put<{
    message: string;
    business: Business;
  }>(
    `/businesses/${businessId}`,
    payload,
  );

  return response.data.business;
}

export async function refreshBusinessProfile(
  businessId: number,
): Promise<Business> {
  const response = await api.post<{
    message: string;
    business: Business;
  }>(
    `/businesses/${businessId}/refresh-profile`,
  );

  return response.data.business;
}

export async function deleteBusiness(
  businessId: number,
): Promise<void> {
  await api.delete(
    `/businesses/${businessId}`,
  );
}
