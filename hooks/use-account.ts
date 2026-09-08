"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getAccount,
  type AccountUser,
} from "@/services/account";

const ACCOUNT_UPDATED_EVENT =
  "gridbeacon:account-updated";

export function useAccount() {
  const [account, setAccountState] =
    useState<AccountUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  const loadAccount =
    useCallback(async () => {
      const token =
        window.localStorage.getItem(
          "access_token"
        );

      if (!token) {
        setAccountState(null);
        setLoading(false);
        return;
      }

      try {
        const response =
          await getAccount();

        setAccountState(
          response.user
        );
      } catch (error) {
        console.error(
          "Failed to load account:",
          error
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    void loadAccount();
  }, [loadAccount]);

  useEffect(() => {
    function handleAccountUpdated(
      event: Event
    ) {
      const customEvent =
        event as CustomEvent<AccountUser>;

      setAccountState(
        customEvent.detail
      );
    }

    window.addEventListener(
      ACCOUNT_UPDATED_EVENT,
      handleAccountUpdated
    );

    return () => {
      window.removeEventListener(
        ACCOUNT_UPDATED_EVENT,
        handleAccountUpdated
      );
    };
  }, []);

  function setAccount(
    nextAccount: AccountUser
  ) {
    setAccountState(nextAccount);

    window.dispatchEvent(
      new CustomEvent(
        ACCOUNT_UPDATED_EVENT,
        {
          detail: nextAccount,
        }
      )
    );
  }

  return {
    account,
    loading,
    setAccount,
    reloadAccount: loadAccount,
  };
}
