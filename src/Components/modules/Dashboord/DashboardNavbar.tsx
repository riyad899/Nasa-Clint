"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, Bell, ChevronDown, LogOut } from "lucide-react";
import { useAuth, initials } from "@/lib/auth-context";

interface DashboardNavbarProps {
  onToggleSidebar: () => void;
  children?: React.ReactNode;
  /** When true the navbar floats above content with a transparent background */
  transparent?: boolean;
}

export default function DashboardNavbar({
  onToggleSidebar,
  children,
  transparent,
}: DashboardNavbarProps) {
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

  // ── Style tokens that flip between solid ↔ transparent modes ──────────────
  const headerCls = transparent
    ? "absolute inset-x-0 top-0 z-20 flex flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between bg-transparent border-none"
    : "relative flex flex-col gap-4 border-b border-primary-100 bg-white px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between";

  const iconBtn  = transparent
    ? "rounded-lg p-2 text-white/90 hover:bg-white/20 md:hidden"
    : "rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden";
  const langWrap = transparent ? "bg-white/20" : "bg-slate-100";
  const enCls    = lang === "EN"
    ? "bg-white text-slate-800 shadow-sm"
    : transparent ? "text-white/70" : "text-slate-400";
  const bnCls    = lang === "BN"
    ? transparent ? "bg-white/90 text-primary-800 shadow-sm" : "bg-primary-700 text-white shadow-sm"
    : transparent ? "text-white/70" : "text-slate-400";
  const bellCls  = transparent
    ? "relative rounded-full p-2 text-white/90 hover:bg-white/20"
    : "relative rounded-full p-2 text-slate-500 hover:bg-slate-100";
  const nameCls  = transparent ? "hidden text-sm font-medium text-white sm:block"
                               : "hidden text-sm font-medium text-slate-700 sm:block";
  const chevCls  = transparent ? "hidden h-3.5 w-3.5 text-white/60 sm:block"
                               : "hidden h-3.5 w-3.5 text-slate-400 sm:block";

  return (
    <header className={headerCls}>
      {/* Left: sidebar toggle + slot content */}
      <div className="flex flex-1 items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className={iconBtn}
          aria-label="Toggle navigation drawer"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex-1">{children}</div>
      </div>

      {/* Right: lang switcher, bell, avatar */}
      <div className="flex flex-shrink-0 items-center gap-3 self-end md:self-auto">
        {/* Language toggle */}
        <div className={`flex items-center rounded-full p-1 text-xs font-semibold ${langWrap}`}>
          <button
            onClick={() => setLang("EN")}
            className={`rounded-full px-3 py-1 transition ${enCls}`}
          >
            EN
          </button>
          <button
            onClick={() => setLang("BN")}
            className={`rounded-full px-3 py-1 transition ${bnCls}`}
          >
            BN
          </button>
        </div>

        {/* Bell */}
        <button className={bellCls} aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </button>

        {/* Avatar / user menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full pl-1 pr-1.5 hover:bg-white/10"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-800 text-xs font-semibold text-white">
              {initials(displayName)}
            </span>
            <span className={nameCls}>{displayName}</span>
            <ChevronDown className={chevCls} />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-11 z-20 w-48 rounded-xl border border-slate-100 bg-white p-1.5 shadow-lg">
                <div className="px-2.5 py-2">
                  <p className="text-sm font-semibold text-slate-800">{displayName}</p>
                  {user?.email && (
                    <p className="truncate text-xs text-slate-400">{user.email}</p>
                  )}
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
