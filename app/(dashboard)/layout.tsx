import type {
  ReactNode,
} from "react";

import {
  Sidebar,
} from "@/components/layout/sidebar";

import {
  DashboardHeader,
} from "@/components/layout/dashboard-header";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8faff_0%,#f8fafc_45%,#f5f3ff_100%)]">
      <Sidebar />

      <div className="lg:pl-64">
        <DashboardHeader />

        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
