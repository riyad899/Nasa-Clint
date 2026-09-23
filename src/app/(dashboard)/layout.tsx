"use client";

import DashboardNavbar from "@/Components/modules/Dashboord/DashboardNavbar";
import DashboardSidebar from "@/Components/modules/Dashboord/DashboardSidebar";
import React, { useState } from "react";

const RootDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "#F5F5F5" }}
    >
      {/* Sidebar */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Right column */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        <DashboardNavbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        {/* Page content */}
        <main
          className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6"
          style={{ background: "#F5F5F5" }}
        >
          <div
            className="min-h-full rounded-xl p-3 sm:p-4 md:p-6"
            style={{
              background: "#FFFFFF",
              border: "1px solid #ebeaea",
            }}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RootDashboardLayout;
