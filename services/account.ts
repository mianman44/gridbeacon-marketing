import api from "./api";

export type AccountUser = {
  id: number;
  full_name: string;
  email: string;
  plan: string;
};

export type AccountResponse = {
  success: boolean;
  user: AccountUser;
};

export type AccountCredits = {
  available: number;
  monthly: number;
  purchased: number;
  reserved: number;
  monthly_allowance: number;
  cycle_started_at: string | null;
  cycle_ends_at: string | null;
};

export type AccountCreditsResponse = {
  success: boolean;
  credits: AccountCredits;
};

export async function getAccount():
Promise<AccountResponse> {
  const response = await api.get(
    "/account/me"
  );

  return response.data;
}

export async function getAccountCredits():
Promise<AccountCreditsResponse> {
  const response = await api.get(
    "/account/credits"
  );

  return response.data;
}

export async function updateAccountProfile(
  payload: {
    full_name: string;
    email: string;
  }
): Promise<
  AccountResponse & {
    message: string;
  }
> {
  const response = await api.patch(
    "/account/profile",
    payload
  );

  return response.data;
}

export async function changeAccountPassword(
  payload: {
    current_password: string;
    new_password: string;
  }
): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await api.post(
    "/account/change-password",
    payload
  );

  return response.data;
}
