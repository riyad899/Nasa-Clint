"use client";

import React, { createContext, useContext, useState } from "react";

interface DashboardHeaderContextValue {
  header: React.ReactNode;
  setHeader: (node: React.ReactNode) => void;
}

const DashboardHeaderContext = createContext<DashboardHeaderContextValue | null>(null);

export function DashboardHeaderProvider({ children }: { children: React.ReactNode }) {
  const [header, setHeader] = useState<React.ReactNode>(null);
  return (
    <DashboardHeaderContext.Provider value={{ header, setHeader }}>
      {children}
    </DashboardHeaderContext.Provider>
  );
}

export function useDashboardHeader() {
  const ctx = useContext(DashboardHeaderContext);
  if (!ctx) throw new Error("useDashboardHeader must be used within DashboardHeaderProvider");
  return ctx;
}

/** Drop this inside any dashboard page to render content into the shared top navbar row. */
export function DashboardHeaderSlot({ children }: { children: React.ReactNode }) {
  const { setHeader } = useDashboardHeader();
  React.useEffect(() => {
    setHeader(children);
    return () => setHeader(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);
  return null;
}
