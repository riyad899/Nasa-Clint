"use client";

import DashboardNavbar from "@/Components/modules/Dashboord/DashboardNavbar";
import DashboardSidebar from "@/Components/modules/Dashboord/DashboardSidebar";
import React, { useState } from "react";
import { DashboardHeaderProvider, useDashboardHeader } from "./header-context";

function Shell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { header } = useDashboardHeader();

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f7f5]">
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardNavbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)}>
          {header}
        </DashboardNavbar>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function RootDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardHeaderProvider>
      <Shell>{children}</Shell>
    </DashboardHeaderProvider>
  );
}
