"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  type BillingPlan,
  type BillingStatusResponse,
  getBillingPlans,
  getBillingStatus,
} from "@/services/billing";


export function useBilling() {
  const [plans, setPlans] =
    useState<BillingPlan[]>([]);

  const [billing, setBilling] =
    useState<
      BillingStatusResponse["billing"]
      | null
    >(null);

  const [credits, setCredits] =
    useState<
      BillingStatusResponse["credits"]
      | null
    >(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadBilling =
    useCallback(async () => {
      setLoading(true);
      setError(null);

      try {
        const [
          plansResponse,
          statusResponse,
        ] = await Promise.all([
          getBillingPlans(),
          getBillingStatus(),
        ]);

        setPlans(
          plansResponse.plans
        );

        setBilling(
          statusResponse.billing
        );

        setCredits(
          statusResponse.credits
        );
      } catch (loadError) {
        console.error(
          "Unable to load billing:",
          loadError
        );

        setError(
          "Unable to load billing information."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    void loadBilling();
  }, [loadBilling]);

  useEffect(() => {
    const handleBillingUpdated = () => {
      void loadBilling();
    };

    window.addEventListener(
      "gridbeacon:billing-updated",
      handleBillingUpdated,
    );

    return () => {
      window.removeEventListener(
        "gridbeacon:billing-updated",
        handleBillingUpdated,
      );
    };
  }, [loadBilling]);

  return {
    plans,
    billing,
    credits,
    loading,
    error,
    refresh: loadBilling,
  };
}
