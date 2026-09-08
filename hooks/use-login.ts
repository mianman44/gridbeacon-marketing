"use client";

import { useState } from "react";
import { login } from "@/services/auth";

export function useLogin() {
  const [loading, setLoading] = useState(false);

  async function signIn(email: string, password: string) {
    try {
      setLoading(true);

      const response = await login(email, password);

      localStorage.setItem(
        "access_token",
        response.access_token
      );

      return true;

    } catch (error) {
      console.error(error);
      return false;

    } finally {
      setLoading(false);
    }
  }

  return {
    signIn,
    loading,
  };
}