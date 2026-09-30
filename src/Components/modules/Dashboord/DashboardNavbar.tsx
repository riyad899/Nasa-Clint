"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bell, ChevronDown, LogOut } from "lucide-react";
import { useAuth, initials } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";

interface DashboardNavbarProps {
  onToggleSidebar?: () => void;
  children?: React.ReactNode;
  /** When true the navbar floats above content with a transparent background */
  transparent?: boolean;
}

export default function DashboardNavbar({
  children,
  transparent,
}: DashboardNavbarProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const displayName = user?.name || t("guest");

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    router.push("/");
  };

  const handleBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/dashboard");
  };

  // ── Style tokens (solid ↔ transparent) ──
  const headerCls = transparent
    ? "absolute inset-x-0 top-0 z-20 flex h-16 items-center justify-between gap-3 border-none bg-transparent px-4 sm:px-6"
    : "relative flex h-16 items-center justify-between gap-3 border-b border-primary-100 bg-white px-4 sm:px-6";

  const iconBtn = transparent
    ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white/90 hover:bg-white/20 md:hidden"
    : "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 md:hidden";

  const langWrap = transparent ? "bg-white/20" : "bg-slate-100";
  const enCls =
    lang === "EN"
      ? "bg-white text-slate-800 shadow-sm"
      : transparent
      ? "text-white/70"
      : "text-slate-400";
  const bnCls =
    lang === "BN"
      ? transparent
        ? "bg-white/90 text-primary-800 shadow-sm"
        : "bg-primary-700 text-white shadow-sm"
      : transparent
      ? "text-white/70"
      : "text-slate-400";

  const bellCls = transparent
    ? "flex h-9 w-9 items-center justify-center rounded-full text-white/90 hover:bg-white/20"
    : "flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100";

  const avatarBtn = transparent
    ? "flex h-9 items-center gap-2 rounded-full pl-0.5 pr-1.5 hover:bg-white/10"
    : "flex h-9 items-center gap-2 rounded-full pl-0.5 pr-1.5 hover:bg-slate-100";

  const nameCls = transparent
    ? "hidden text-sm font-medium text-white sm:block"
    : "hidden text-sm font-medium text-slate-700 sm:block";
  const chevCls = transparent
    ? "hidden h-3.5 w-3.5 text-white/60 sm:block"
    : "hidden h-3.5 w-3.5 text-slate-400 sm:block";

  return (
    <header className={headerCls}>
      {/* LEFT: back button + slot content */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button onClick={handleBack} className={iconBtn} aria-label="Go back">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">{children}</div>
      </div>

      {/* RIGHT: lang switcher, bell, avatar */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        {/* Language toggle */}
        <div
          className={`flex h-9 items-center rounded-full p-1 text-xs font-semibold ${langWrap}`}
        >
          <button
            onClick={() => setLang("EN")}
            className={`flex h-full items-center rounded-full px-2.5 transition sm:px-3 ${enCls}`}
          >
            EN
          </button>
          <button
            onClick={() => setLang("BN")}
            className={`flex h-full items-center rounded-full px-2.5 transition sm:px-3 ${bnCls}`}
          >
            BN
          </button>
        </div>

        {/* Bell */}
        <button className={bellCls} aria-label={t("notifications")}>
          <Bell className="h-5 w-5" />
        </button>

        {/* Avatar / user menu */}
        <div className="relative">
          <button onClick={() => setMenuOpen((v) => !v)} className={avatarBtn}>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-800 text-xs font-semibold text-white">
              {initials(displayName)}
            </span>
            <span className={nameCls}>{displayName}</span>
            <ChevronDown className={chevCls} />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-xl border border-slate-100 bg-white p-1.5 shadow-lg">
                <div className="px-2.5 py-2">
                  <p className="text-sm font-semibold text-slate-800">
                    {displayName}
                  </p>
                  {user?.email && (
                    <p className="truncate text-xs text-slate-400">
                      {user.email}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="h-4 w-4" /> {t("logout")}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}