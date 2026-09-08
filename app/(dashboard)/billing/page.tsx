"use client";

import {
  CalendarDays,
  Check,
  Coins,
  CreditCard,
  ExternalLink,
  Loader2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  cancelBillingSubscription,
  resumeBillingSubscription,
  changeBillingPlan,
  createBillingPortal,
  getBillingCheckoutConfig,
  getBillingStatus,
  getCreditPacks,
  getCreditPackCheckoutConfig,
  type BillingPlan,
  type CreditPack,
} from "@/services/billing";

import {
  getPaddle,
} from "@/services/paddle";

import {
  useBilling,
} from "@/hooks/use-billing";

import {
  useAccount,
} from "@/hooks/use-account";


function formatDate(
  value: string | null
) {
  if (!value) {
    return "Not available";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  ).format(
    new Date(value)
  );
}


const PLAN_PRICES: Record<string, string> = {
  free: "$0",
  starter: "$14.99",
  professional: "$29.99",
  agency: "$59.99",
};


function formatPlanPrice(
  planCode: string
) {
  return PLAN_PRICES[planCode] ?? "—";
}


function formatPlanCredits(
  plan: BillingPlan
) {
  if (
    plan.code === "free"
    && plan.monthly_credits === 0
  ) {
    return "No monthly subscription credits";
  }

  if (plan.monthly_credits <= 0) {
    return "Credit allowance not configured yet";
  }

  return (
    `${plan.monthly_credits.toLocaleString()} credits / month`
  );
}


export default function BillingPage() {
  const {
    plans,
    billing,
    credits,
    loading,
    error,
    refresh,
  } = useBilling();

  const {
    account,
  } = useAccount();

  const [
    actionPlan,
    setActionPlan,
  ] = useState<string | null>(
    null
  );

  const [
    portalLoading,
    setPortalLoading,
  ] = useState(false);

  const [
    cancelLoading,
    setCancelLoading,
  ] = useState(false);

  const [
    resumeLoading,
    setResumeLoading,
  ] = useState(false);

  const [
    actionError,
    setActionError,
  ] = useState<string | null>(
    null
  );

  const [
    actionMessage,
    setActionMessage,
  ] = useState<string | null>(
    null
  );

  const [
    creditPacks,
    setCreditPacks,
  ] = useState<CreditPack[]>([]);

  const [
    creditPacksLoading,
    setCreditPacksLoading,
  ] = useState(true);

  const [
    actionPack,
    setActionPack,
  ] = useState<string | null>(
    null
  );
  const hasSubscription = Boolean(
    billing?.paddle_subscription_id
    && billing?.status
    && [
      "active",
      "trialing",
      "past_due",
    ].includes(billing.status)
  );

  const canManageSubscription =
    Boolean(
      billing?.paddle_customer_id
    );

  useEffect(() => {
    let active = true;

    const loadCreditPacks = async () => {
      setCreditPacksLoading(true);

      try {
        const response =
          await getCreditPacks();

        if (active) {
          setCreditPacks(
            response.packs
          );
        }
      } catch (packError) {
        console.error(
          "Unable to load credit packs:",
          packError
        );

        if (active) {
          setActionError(
            "Unable to load credit packs."
          );
        }
      } finally {
        if (active) {
          setCreditPacksLoading(false);
        }
      }
    };

    void loadCreditPacks();

    return () => {
      active = false;
    };
  }, []);

  const waitForBillingUpdate = async (
    predicate: (
      response: Awaited<
        ReturnType<typeof getBillingStatus>
      >
    ) => boolean
  ) => {
    for (let attempt = 0; attempt < 8; attempt += 1) {
      const response =
        await getBillingStatus();

      if (predicate(response)) {
        await refresh();
        return true;
      }

      await new Promise(
        (resolve) =>
          setTimeout(resolve, 1000)
      );
    }

    await refresh();
    return false;
  };

  const handleCheckout = async (
    plan: BillingPlan
  ) => {
    setActionError(null);
    setActionMessage(null);
    setActionPlan(plan.code);

    try {
      if (hasSubscription) {
        setActionError(
          "Use Manage billing to change an existing subscription."
        );
        return;
      }

      const checkoutResponse =
        await getBillingCheckoutConfig(
          plan.code
        );

      const paddle =
        await getPaddle();

      if (!paddle) {
        throw new Error(
          "Paddle sandbox client token is not configured."
        );
      }

      paddle.Checkout.open({
        items: [
          {
            priceId:
              checkoutResponse
                .checkout
                .price_id,
            quantity:
              checkoutResponse
                .checkout
                .quantity,
          },
        ],

        customData:
          checkoutResponse
            .checkout
            .custom_data,

        customer:
          account?.email
            ? {
                email:
                  account.email,
              }
            : undefined,

        settings: {
          displayMode: "overlay",
          theme: "light",
          locale: "en",
        },
      });
    } catch (checkoutError) {
      console.error(
        "Unable to open checkout:",
        checkoutError
      );

      setActionError(
        checkoutError
          instanceof Error
          ? checkoutError.message
          : "Unable to open Paddle checkout."
      );
    } finally {
      setActionPlan(null);
    }
  };


  const handleCreditPackCheckout = async (
    pack: CreditPack
  ) => {
    setActionError(null);
    setActionMessage(null);
    setActionPack(pack.code);

    try {
      const checkoutResponse =
        await getCreditPackCheckoutConfig(
          pack.code
        );

      const paddle =
        await getPaddle();

      if (!paddle) {
        throw new Error(
          "Paddle sandbox client token is not configured."
        );
      }

      paddle.Checkout.open({
        items: [
          {
            priceId:
              checkoutResponse
                .checkout
                .price_id,
            quantity:
              checkoutResponse
                .checkout
                .quantity,
          },
        ],

        customData:
          checkoutResponse
            .checkout
            .custom_data,

        customer:
          account?.email
            ? {
                email:
                  account.email,
              }
            : undefined,

        settings: {
          displayMode: "overlay",
          theme: "light",
          locale: "en",
        },
      });
    } catch (checkoutError) {
      console.error(
        "Unable to open credit checkout:",
        checkoutError
      );

      setActionError(
        checkoutError
          instanceof Error
          ? checkoutError.message
          : "Unable to open credit checkout."
      );
    } finally {
      setActionPack(null);
    }
  };

  const handlePlanChange = async (
    plan: BillingPlan
  ) => {
    const confirmed =
      window.confirm(
        `Change your plan to ${plan.name}? Paddle will apply any prorated charge or credit immediately.`
      );

    if (!confirmed) {
      return;
    }

    setActionPlan(plan.code);
    setActionError(null);
    setActionMessage(null);

    try {
      const response =
        await changeBillingPlan(
          plan.code
        );

      setActionMessage(
        response.message
      );

      await waitForBillingUpdate(
        (billingResponse) =>
          billingResponse.billing.plan_code
          === plan.code
      );

      window.dispatchEvent(
        new Event(
          "gridbeacon:billing-updated"
        )
      );
    } catch (planError) {
      console.error(
        "Unable to change plan:",
        planError
      );

      setActionError(
        "Unable to change subscription plan."
      );
    } finally {
      setActionPlan(null);
    }
  };

  const handlePortal = async () => {
    setPortalLoading(true);
    setActionError(null);
    setActionMessage(null);

    try {
      const response =
        await createBillingPortal();

      window.location.assign(
        response.portal_url
      );
    } catch (portalError) {
      console.error(
        "Unable to open billing portal:",
        portalError
      );

      setActionError(
        "Unable to open the customer portal."
      );
    } finally {
      setPortalLoading(false);
    }
  };


  const handleCancel = async () => {
    const confirmed =
      window.confirm(
        "Cancel your subscription at the end of the current billing period?"
      );

    if (!confirmed) {
      return;
    }

    setCancelLoading(true);
    setActionError(null);
    setActionMessage(null);

    try {
      const response =
        await cancelBillingSubscription();

      setActionMessage(
        response.message
      );

      await refresh();
    } catch (cancelError) {
      console.error(
        "Unable to cancel subscription:",
        cancelError
      );

      setActionError(
        "Unable to schedule subscription cancellation."
      );
    } finally {
      setCancelLoading(false);
    }
  };



  const handleResume = async () => {
    setResumeLoading(true);
    setActionError(null);
    setActionMessage(null);

    try {
      const response =
        await resumeBillingSubscription();

      setActionMessage(
        response.message
      );

      await waitForBillingUpdate(
        (billingResponse) =>
          billingResponse.billing.status
          === "active"
          && !billingResponse.billing.cancel_at_period_end
      );
    } catch (resumeError) {
      console.error(
        "Unable to resume subscription:",
        resumeError
      );

      setActionError(
        "Unable to resume subscription."
      );
    } finally {
      setResumeLoading(false);
    }
  };

  return (
    <div className="relative isolate min-h-full overflow-hidden p-6 lg:p-8">
      <div className="pointer-events-none absolute -left-24 top-20 -z-10 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 top-72 -z-10 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl" />

      <div className="mx-auto max-w-7xl space-y-7">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 p-7 text-white shadow-[0_24px_70px_rgba(79,70,229,0.22)] sm:p-9">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-indigo-100">
                <Sparkles className="h-3.5 w-3.5" />
                GridBeacon Billing
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Plans, credits & billing
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100/75">
                Manage your subscription,
                monthly scan credits,
                invoices and payment details
                from one place.
              </p>
            </div>

            {canManageSubscription && (
              <button
                type="button"
                onClick={
                  handlePortal
                }
                disabled={
                  portalLoading
                }
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {portalLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ExternalLink className="h-4 w-4" />
                )}

                Manage billing
              </button>
            )}
          </div>
        </section>

        {actionError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
            {actionError}
          </div>
        )}

        {actionMessage && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700">
            {actionMessage}
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-semibold text-amber-700">
            {error}
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl border border-indigo-100 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.07)]">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-indigo-500">
              Current plan
            </p>

            <p className="mt-2 text-xl font-extrabold text-slate-950">
              {loading
                ? "Loading..."
                : billing?.plan_name
                  || "Free"}
            </p>

            <p className="mt-1 text-xs font-semibold capitalize text-slate-500">
              {billing?.status
                || "inactive"}
            </p>
          </article>

          <article className="rounded-3xl border border-indigo-100 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.07)]">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <Coins className="h-5 w-5" />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-amber-600">
              Available credits
            </p>

            <p className="mt-2 text-2xl font-extrabold text-slate-950">
              {loading
                ? "..."
                : (
                    credits?.available
                    ?? 0
                  ).toLocaleString()}
            </p>

            <p className="mt-1 text-xs font-medium text-slate-500">
              Monthly{" "}
              {(
                credits?.monthly
                ?? 0
              ).toLocaleString()}
              {" · "}
              Purchased{" "}
              {(
                credits?.purchased
                ?? 0
              ).toLocaleString()}
            </p>
          </article>

          <article className="rounded-3xl border border-indigo-100 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.07)]">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
              <CalendarDays className="h-5 w-5" />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-violet-500">
              Next billing
            </p>

            <p className="mt-2 text-base font-bold text-slate-950">
              {formatDate(
                billing?.next_billed_at
                || null
              )}
            </p>

            <p className="mt-1 text-xs font-medium text-slate-500">
              Current cycle ends{" "}
              {formatDate(
                billing
                  ?.current_period_end
                || credits?.cycle_ends_at
                || null
              )}
            </p>
          </article>

          <article className="rounded-3xl border border-indigo-100 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.07)]">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <CreditCard className="h-5 w-5" />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-600">
              Monthly allowance
            </p>

            <p className="mt-2 text-2xl font-extrabold text-slate-950">
              {(
                credits
                  ?.monthly_allowance
                ?? 0
              ).toLocaleString()}
            </p>

            <p className="mt-1 text-xs font-medium text-slate-500">
              Subscription credits reset each billing cycle
            </p>
          </article>
        </div>

        {billing?.cancel_at_period_end && (
          <section className="flex flex-col gap-4 rounded-3xl border border-amber-200 bg-amber-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-bold text-amber-900">
                Cancellation scheduled
              </p>

              <p className="mt-1 text-sm text-amber-700">
                Your subscription remains
                active until{" "}
                {formatDate(
                  billing.current_period_end
                )}.
              </p>
            </div>

            <button
              type="button"
              onClick={handleResume}
              disabled={resumeLoading}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-900 px-4 text-sm font-bold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {resumeLoading && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}

              {resumeLoading
                ? "Resuming..."
                : "Resume subscription"}
            </button>
          </section>
        )}

        <section>
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-500">
              Subscription plans
            </p>

            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">
              Choose the right plan
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Paddle handles secure checkout,
              taxes, invoices and subscription
              payments.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan) => {
              const isCurrent =
                billing?.plan_code
                === plan.code;

              const isPaid =
                plan.code !== "free";

              const isConfigured =
                Boolean(
                  plan.price_id
                );

              const isBusy =
                actionPlan === plan.code;

              return (
                <article
                  key={plan.code}
                  className={`relative flex min-h-[340px] flex-col rounded-3xl border bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.07)] ${
                    isCurrent
                      ? "border-indigo-400 ring-2 ring-indigo-100"
                      : "border-slate-200"
                  }`}
                >
                  {isCurrent && (
                    <div className="absolute right-5 top-5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                      Current
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-extrabold text-slate-950">
                      {plan.name}
                    </h3>

                    <div className="mt-3 flex items-end gap-1">
                      <span className="text-3xl font-extrabold tracking-tight text-slate-950">
                        {formatPlanPrice(
                          plan.code
                        )}
                      </span>

                      <span className="pb-1 text-sm font-semibold text-slate-500">
                        / month
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-indigo-600">
                      {formatPlanCredits(
                        plan
                      )}
                    </p>
                  </div>

                  <div className="mt-6 space-y-3 text-sm text-slate-600">
                    <div className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      Grid rank tracking
                    </div>

                    <div className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      Scan history & visibility
                    </div>

                    {isPaid && (
                      <div className="flex gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        Monthly subscription credits
                      </div>
                    )}

                    {isPaid && (
                      <div className="flex gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        Paddle billing portal
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-7">
                    {isCurrent ? (
                      <button
                        type="button"
                        disabled
                        className="h-11 w-full rounded-xl bg-indigo-50 text-sm font-bold text-indigo-600"
                      >
                        Current plan
                      </button>
                    ) : !isPaid ? (
                      <button
                        type="button"
                        disabled
                        className="h-11 w-full rounded-xl bg-slate-100 text-sm font-bold text-slate-400"
                      >
                        Free plan
                      </button>
                    ) : hasSubscription ? (
                      <button
                        type="button"
                        onClick={() =>
                          handlePlanChange(
                            plan
                          )
                        }
                        disabled={
                          isBusy
                          || !isConfigured
                        }
                        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isBusy && (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        )}

                        Switch to {plan.name}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          handleCheckout(
                            plan
                          )
                        }
                        disabled={
                          isBusy
                          || !isConfigured
                        }
                        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                      >
                        {isBusy && (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        )}

                        {isConfigured
                          ? `Choose ${plan.name}`
                          : "Configure in Paddle"}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section>
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-600">
              Extra credits
            </p>

            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">
              Buy credits anytime
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              One-time credit purchases do not expire with your monthly billing cycle.
            </p>
          </div>

          {creditPacksLoading ? (
            <div className="flex min-h-[180px] items-center justify-center rounded-3xl border border-slate-200 bg-white">
              <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-3">
              {creditPacks.map((pack) => {
                const isBusy =
                  actionPack === pack.code;

                const isConfigured =
                  Boolean(pack.price_id);

                return (
                  <article
                    key={pack.code}
                    className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.07)]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                      <Coins className="h-6 w-6" />
                    </div>

                    <h3 className="mt-5 text-xl font-extrabold text-slate-950">
                      {pack.name}
                    </h3>

                    <p className="mt-2 text-3xl font-extrabold text-slate-950">
                      ${pack.price_usd}
                    </p>

                    <p className="mt-2 text-sm font-medium text-slate-500">
                      One-time purchase
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        handleCreditPackCheckout(
                          pack
                        )
                      }
                      disabled={
                        isBusy
                        || !isConfigured
                      }
                      className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-amber-500 text-sm font-bold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                      {isBusy && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}

                      {isConfigured
                        ? "Buy credits"
                        : "Configure in Paddle"}
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </section>
        {hasSubscription && (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.07)]">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-slate-950">
                  Subscription management
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update payment details
                  through Paddle or schedule
                  cancellation at the end of
                  your billing period.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {canManageSubscription && (
                  <button
                    type="button"
                    onClick={
                      handlePortal
                    }
                    disabled={
                      portalLoading
                    }
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Customer portal
                  </button>
                )}

                {!billing?.cancel_at_period_end && (
                  <button
                    type="button"
                    onClick={
                      handleCancel
                    }
                    disabled={
                      cancelLoading
                    }
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-red-200 px-4 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                  >
                    {cancelLoading && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}

                    Cancel subscription
                  </button>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
