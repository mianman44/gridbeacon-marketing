"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";
import {
  usePathname,
  useRouter,
} from "next/navigation";
import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  CircleHelp,
  CreditCard,
  FileChartColumn,
  History,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Radar,
  Settings,
  Users,
  X,
} from "lucide-react";

import {
  useBilling,
} from "@/hooks/use-billing";

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ElementType;
  exact?: boolean;
}

function getProjectId(pathname: string) {
  const match = pathname.match(/^\/projects\/(\d+)/);

  return match?.[1] ?? null;
}

function isActiveRoute(
  pathname: string,
  href: string,
  exact = false,
) {
  if (exact) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavigationLink({
  item,
  pathname,
}: {
  item: NavigationItem;
  pathname: string;
}) {
  const Icon = item.icon;
  const active = isActiveRoute(
    pathname,
    item.href,
    item.exact,
  );

  return (
    <Link
      href={item.href}
      className={[
        "group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5",
        "text-sm font-medium transition-all duration-200",
        active
          ? "bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-400/20 before:absolute before:inset-y-2 before:left-0 before:w-1 before:rounded-r-full before:bg-white/90 before:content-[''] after:absolute after:-right-8 after:-top-8 after:h-20 after:w-20 after:rounded-full after:bg-white/10 after:content-['']"
          : "text-slate-600 hover:translate-x-0.5 hover:bg-indigo-50 hover:text-indigo-950",
      ].join(" ")}
    >
      <Icon
        className={[
          "relative z-10 h-4 w-4 shrink-0 transition",
          active
            ? "text-white"
            : "text-slate-400 group-hover:text-indigo-600",
        ].join(" ")}
      />

      <span className="relative z-10">
        {item.label}
      </span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  const {
    billing,
  } = useBilling();

  useEffect(() => {
    const openMobileNavigation = () => {
      setMobileOpen(true);
    };

    window.addEventListener(
      "gridbeacon:open-mobile-navigation",
      openMobileNavigation,
    );

    return () => {
      window.removeEventListener(
        "gridbeacon:open-mobile-navigation",
        openMobileNavigation,
      );
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [mobileOpen]);

  const projectId = getProjectId(pathname);

  const workspaceNavigation: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: BriefcaseBusiness,
    exact: true,
  },
];

  const projectNavigation: NavigationItem[] = projectId
    ? [
        {
          label: "Overview",
          href: `/projects/${projectId}`,
          icon: LayoutDashboard,
          exact: true,
        },
        {
          label: "Businesses",
          href: `/projects/${projectId}/businesses`,
          icon: Building2,
        },
        {
          label: "Keywords",
          href: `/projects/${projectId}/keywords`,
          icon: KeyRound,
        },
        {
          label: "Scans",
          href: `/projects/${projectId}/scans`,
          icon: Radar,
        },
        {
          label: "Rank History",
          href: `/projects/${projectId}/rank-history`,
          icon: History,
        },
        {
          label: "Competitors",
          href: `/projects/${projectId}/competitors`,
          icon: ChartNoAxesCombined,
        },
        {
          label: "Reports",
          href: `/projects/${projectId}/reports`,
          icon: FileChartColumn,
        },
        {
          label: "Project Settings",
          href: `/projects/${projectId}/settings`,
          icon: Settings,
        },
      ]
    : [];

  const workspaceSettings: NavigationItem[] = [
    {
      label: "Billing",
      href: "/billing",
      icon: CreditCard,
    },
    {
      label: "Team",
      href: "/settings/team",
      icon: Users,
    },
    {
      label: "Workspace Settings",
      href: "/settings",
      icon: Settings,
    },
    {
      label: "Help & Support",
      href: "/help",
      icon: CircleHelp,
    },
  ];

  function handleLogout() {
    localStorage.removeItem("access_token");
    router.push("/login");
  }

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => {
            setMobileOpen(false);
          }}
          className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col overflow-hidden",
          "border-r border-indigo-100/80",
          "bg-gradient-to-b from-white via-slate-50/80 to-indigo-50/60",
          "shadow-[8px_0_30px_rgba(79,70,229,0.10)]",
          "transition-transform duration-300 ease-out",
          "lg:z-40 lg:translate-x-0",
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full",
        ].join(" ")}
      >
      <div className="pointer-events-none absolute -left-20 top-28 h-48 w-48 rounded-full bg-indigo-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-32 h-56 w-56 rounded-full bg-violet-300/20 blur-3xl" />
      <div className="relative z-10 flex h-16 items-center border-b border-indigo-100/80 bg-white/80 px-5 backdrop-blur-xl">
        <Link
         href="/dashboard"
         className="flex min-w-0 items-center gap-3"
         >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-500 text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
            <BarChart3 className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="truncate bg-gradient-to-r from-indigo-700 via-violet-700 to-sky-600 bg-clip-text text-sm font-extrabold text-transparent">
              GridBeacon
            </p>

            <p className="truncate text-xs font-medium text-indigo-500">
              Local Rank Intelligence
            </p>
          </div>
        </Link>

        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => {
            setMobileOpen(false);
          }}
          className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-100 bg-white text-slate-600 shadow-sm transition hover:bg-indigo-50 hover:text-indigo-700 lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="relative z-10 flex-1 overflow-y-auto px-3 py-5">
        <NavigationSection title="Workspace">
          {workspaceNavigation.map((item) => (
            <NavigationLink
              key={item.href}
              item={item}
              pathname={pathname}
            />
          ))}
        </NavigationSection>

        {projectId && (
          <NavigationSection title="Current Project">
            {projectNavigation.map((item) => (
              <NavigationLink
                key={item.href}
                item={item}
                pathname={pathname}
              />
            ))}
          </NavigationSection>
        )}

        <NavigationSection title="Administration">
          {workspaceSettings.map((item) => (
            <NavigationLink
              key={item.href}
              item={item}
              pathname={pathname}
            />
          ))}
        </NavigationSection>
      </nav>

      <div className="relative z-10 border-t border-indigo-100/80 bg-white/60 p-3 backdrop-blur-xl">
        <div className="mb-2 flex items-center gap-3 rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-3 shadow-sm">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 ring-2 ring-white">
            A
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">
              Account Owner
            </p>

            <p className="truncate text-xs text-slate-500">
              {billing?.plan_name || "Free"} workspace
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </div>
      </aside>
    </>
  );
}

function NavigationSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-7">
      <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-indigo-400">
        {title}
      </p>

      <div className="space-y-1">{children}</div>
    </section>
  );
}