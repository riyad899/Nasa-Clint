"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, Bell, ChevronDown, LogOut } from "lucide-react";
import { useAuth, initials } from "@/lib/auth-context";

interface DashboardNavbarProps {
  onToggleSidebar: () => void;
  children?: React.ReactNode;
}

export default function DashboardNavbar({ onToggleSidebar, children }: DashboardNavbarProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [lang, setLang] = useState<"EN" | "BN">("BN");
  const [menuOpen, setMenuOpen] = useState(false);

  const displayName = user?.name || "Guest";

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <header className="relative flex flex-col gap-4 border-b border-primary-100 bg-white px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden"
          aria-label="Toggle navigation drawer"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex-1">{children}</div>
      </div>

      <div className="flex flex-shrink-0 items-center gap-3 self-end md:self-auto">
        <div className="flex items-center rounded-full bg-slate-100 p-1 text-xs font-semibold">
          <button
            onClick={() => setLang("EN")}
            className={`rounded-full px-3 py-1 transition ${lang === "EN" ? "bg-white text-slate-800 shadow-sm" : "text-slate-400"}`}
          >
            EN
          </button>
          <button
            onClick={() => setLang("BN")}
            className={`rounded-full px-3 py-1 transition ${lang === "BN" ? "bg-primary-700 text-white shadow-sm" : "text-slate-400"}`}
          >
            BN
          </button>
        </div>

        <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </button>

        <div className="relative">
          <button onClick={() => setMenuOpen((v) => !v)} className="flex items-center gap-2 rounded-full pl-1 pr-1.5 hover:bg-slate-50">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-800 text-xs font-semibold text-white">
              {initials(displayName)}
            </span>
            <span className="hidden text-sm font-medium text-slate-700 sm:block">{displayName}</span>
            <ChevronDown className="hidden h-3.5 w-3.5 text-slate-400 sm:block" />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-11 z-20 w-48 rounded-xl border border-slate-100 bg-white p-1.5 shadow-lg">
                <div className="px-2.5 py-2">
                  <p className="text-sm font-semibold text-slate-800">{displayName}</p>
                  {user?.email && <p className="truncate text-xs text-slate-400">{user.email}</p>}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="h-4 w-4" /> Log out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
