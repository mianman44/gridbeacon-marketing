import api from "./api";

export async function login(
  email: string,
  password: string
) {
  const form =
    new URLSearchParams();

  form.append(
    "username",
    email
  );

  form.append(
    "password",
    password
  );

  const response =
    await api.post(
      "/login",
      form,
      {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
      }
    );

  return response.data;
}

export type RegisterPayload = {
  full_name: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  success: boolean;
  message: string;
  id: number;
};

export async function register(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const response =
    await api.post(
      "/register",
      payload
    );

  return response.data;
}
