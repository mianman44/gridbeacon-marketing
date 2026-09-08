"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getAccountCredits,
  type AccountCredits,
} from "@/services/account";

export function useCredits() {
  const [credits, setCredits] =
    useState<AccountCredits | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadCredits =
    useCallback(async () => {
      const token =
        window.localStorage.getItem(
          "access_token"
        );

      if (!token) {
        setCredits(null);
        setLoading(false);
        return;
      }

      try {
        setError(null);

        const response =
          await getAccountCredits();

        setCredits(
          response.credits
        );
      } catch (requestError) {
        console.error(
          "Failed to load credits:",
          requestError
        );

        setError(
          "Unable to load credits."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    void loadCredits();
  }, [loadCredits]);

  return {
    credits,
    loading,
    error,
    reloadCredits: loadCredits,
  };
}
