"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  usePathname,
  useRouter,
} from "next/navigation";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  Coins,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  UserRound,
} from "lucide-react";

import {
  useAccount,
} from "@/hooks/use-account";

import {
  useCredits,
} from "@/hooks/use-credits";

import {
  useBilling,
} from "@/hooks/use-billing";

function formatSegment(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(
      /\b\w/g,
      (letter) => letter.toUpperCase()
    );
}

function buildBreadcrumbs(pathname: string) {
  const segments =
    pathname.split("/").filter(Boolean);

  return segments.map(
    (segment, index) => {
      const href =
        `/${segments
          .slice(0, index + 1)
          .join("/")}`;

      const isProjectId =
        segments[index - 1] ===
          "projects" &&
        /^\d+$/.test(segment);

      return {
        label: isProjectId
          ? `Project ${segment}`
          : formatSegment(segment),
        href,
      };
    }
  );
}

export function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const breadcrumbs =
    buildBreadcrumbs(pathname);

  const {
    account,
    loading: accountLoading,
  } = useAccount();

  const {
    credits,
    loading: creditsLoading,
  } = useCredits();

  const {
    billing,
  } = useBilling();

  const [
    accountMenuOpen,
    setAccountMenuOpen,
  ] = useState(false);

  const accountMenuRef =
    useRef<HTMLDivElement | null>(
      null
    );

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent
    ) {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(
          event.target as Node
        )
      ) {
        setAccountMenuOpen(false);
      }
    }

    function handleEscape(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        setAccountMenuOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  function signOut() {
    window.localStorage.removeItem(
      "access_token"
    );

    setAccountMenuOpen(false);

    router.push("/login");
    router.refresh();
  }

  const displayName =
    account?.full_name ||
    (
      accountLoading
        ? "Loading..."
        : "Account Owner"
    );

  const displayEmail =
    account?.email ||
    "Signed-in account";

  const initials =
    displayName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) =>
        part.charAt(0)
      )
      .join("")
      .toUpperCase() ||
    "A";

  return (
    <header className="sticky top-0 z-30 overflow-visible border-b border-indigo-100/80 bg-white/85 shadow-[0_8px_30px_rgba(79,70,229,0.05)] backdrop-blur-xl after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-indigo-400/50 after:to-transparent after:content-['']">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(
              new Event(
                "gridbeacon:open-mobile-navigation"
              )
            );
          }}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-100 bg-white text-slate-600 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1 overflow-hidden"
          >
            {breadcrumbs.map(
              (item, index) => {
                const isLast =
                  index ===
                  breadcrumbs.length - 1;

                return (
                  <div
                    key={item.href}
                    className="flex min-w-0 items-center"
                  >
                    {index > 0 && (
                      <ChevronRight className="mx-1 h-4 w-4 shrink-0 text-indigo-200" />
                    )}

                    {isLast ? (
                      <span className="truncate text-sm font-bold text-slate-950">
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className="truncate text-sm font-medium text-slate-500 transition hover:text-indigo-700"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              }
            )}
          </nav>
        </div>

        <div className="hidden w-full max-w-sm md:block">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-400" />

            <input
              type="search"
              placeholder="Search projects, businesses, keywords..."
              className="h-10 w-full rounded-xl border border-indigo-100 bg-gradient-to-r from-slate-50 to-indigo-50/60 pl-10 pr-4 text-sm text-slate-900 shadow-inner outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <button
          type="button"
          className="hidden h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/30 active:translate-y-0 active:scale-[0.98] sm:flex"
        >
          <Plus className="h-4 w-4" />
          New
        </button>

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-100 bg-white text-slate-600 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-2 top-2 h-2 w-2 animate-pulse rounded-full bg-gradient-to-br from-rose-400 to-red-600 ring-2 ring-white shadow-sm shadow-red-500/50" />
        </button>

        <div
          ref={accountMenuRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() =>
              setAccountMenuOpen(
                (current) => !current
              )
            }
            aria-haspopup="menu"
            aria-expanded={
              accountMenuOpen
            }
            className="flex items-center gap-3 rounded-xl p-1.5 transition hover:bg-indigo-50/80"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white shadow-md shadow-indigo-500/25 ring-2 ring-indigo-50">
              {initials}
            </div>

            <div className="hidden min-w-0 text-left xl:block">
              <p className="max-w-40 truncate text-sm font-semibold text-slate-900">
                {displayName}
              </p>

              <p className="mt-0.5 inline-flex rounded-full bg-gradient-to-r from-indigo-50 to-violet-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-600 ring-1 ring-indigo-100">
                {billing?.plan_name
                  || account?.plan
                  || "Free"}{" "}
                plan
              </p>
            </div>

            <ChevronDown
              className={[
                "hidden h-4 w-4 text-indigo-400 transition-transform xl:block",
                accountMenuOpen
                  ? "rotate-180"
                  : "",
              ].join(" ")}
            />
          </button>

          {accountMenuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] ring-1 ring-slate-950/5"
            >
              <div className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/25">
                    {initials}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-950">
                      {displayName}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      {displayEmail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-y border-indigo-100 bg-indigo-50/60 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-100">
                    <Coins className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Credits available
                    </p>

                    <p className="text-base font-extrabold text-slate-950">
                      {creditsLoading
                        ? "Loading..."
                        : (
                            credits?.available
                            ?? 0
                          ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <Link
                  href="/account"
                  role="menuitem"
                  onClick={() =>
                    setAccountMenuOpen(
                      false
                    )
                  }
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700"
                >
                  <UserRound className="h-4 w-4" />
                  My account
                </Link>

                <Link
                  href="/account/settings"
                  role="menuitem"
                  onClick={() =>
                    setAccountMenuOpen(
                      false
                    )
                  }
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700"
                >
                  <Settings className="h-4 w-4" />
                  Account settings
                </Link>
              </div>

              <div className="border-t border-slate-100 p-2">
                <button
                  type="button"
                  role="menuitem"
                  onClick={signOut}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
