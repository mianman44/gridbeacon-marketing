"use client";

import Link from "next/link";
import {
  Coins,
  Mail,
  Settings,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

import {
  useAccount,
} from "@/hooks/use-account";

import {
  useCredits,
} from "@/hooks/use-credits";

export default function AccountPage() {
  const {
    account,
    loading,
  } = useAccount();

  const {
    credits,
    loading: creditsLoading,
  } = useCredits();

  const displayName =
    account?.full_name
    || (
      loading
        ? "Loading account..."
        : "Account Owner"
    );

  const initials =
    displayName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) =>
        part.charAt(0)
      )
      .join("")
      .toUpperCase()
    || "A";

  return (
    <div className="relative isolate min-h-full overflow-hidden p-6 lg:p-8">
      <div className="pointer-events-none absolute -left-24 top-20 -z-10 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />

      <div className="mx-auto max-w-5xl space-y-6">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 p-7 text-white shadow-[0_24px_70px_rgba(79,70,229,0.22)] sm:p-9">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-white/15 bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-400 text-2xl font-extrabold shadow-xl">
                {initials}
              </div>

              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-indigo-100">
                  <Sparkles className="h-3.5 w-3.5" />
                  Account profile
                </div>

                <h1 className="mt-3 text-3xl font-bold tracking-tight">
                  {displayName}
                </h1>

                <p className="mt-1 text-sm text-indigo-100/75">
                  {account?.email
                    || "Your GridBeacon account"}
                </p>
              </div>
            </div>

            <Link
              href="/account/settings"
              className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-xl bg-white px-4 text-sm font-bold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50 sm:self-auto"
            >
              <Settings className="h-4 w-4" />
              Edit settings
            </Link>
          </div>
        </section>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl border border-indigo-100 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.07)]">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <UserRound className="h-5 w-5" />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-indigo-500">
              Full name
            </p>

            <p className="mt-2 break-words text-base font-bold text-slate-950">
              {account?.full_name || "—"}
            </p>
          </article>

          <article className="rounded-3xl border border-indigo-100 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.07)]">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
              <Mail className="h-5 w-5" />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-violet-500">
              Email address
            </p>

            <p className="mt-2 break-words text-base font-bold text-slate-950">
              {account?.email || "—"}
            </p>
          </article>

          <article className="rounded-3xl border border-indigo-100 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.07)]">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-600">
              Current plan
            </p>

            <p className="mt-2 text-base font-bold text-slate-950">
              {account?.plan || "Professional"} plan
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
              {creditsLoading
                ? "?"
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
              {" ? "}
              Purchased{" "}
              {(
                credits?.purchased
                ?? 0
              ).toLocaleString()}
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
