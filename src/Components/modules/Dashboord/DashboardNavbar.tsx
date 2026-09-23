"use client";

import React from "react";
import Link from "next/link";
import { 
  Menu, 
  Search, 
  Bell, 
  ExternalLink,
  ChevronDown,
  Sparkles,
  ShieldCheck
} from "lucide-react";

interface DashboardNavbarProps {
  onToggleSidebar: () => void;
}

export default function DashboardNavbar({ onToggleSidebar }: DashboardNavbarProps) {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white px-4 sm:px-6">
      {/* Left: Mobile hamburger & search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 md:hidden"
          aria-label="Toggle navigation drawer"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Global Search Bar */}
        <div className="relative hidden sm:block w-64 md:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search orders, SKU, customers..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-3 text-sm text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Right: Actions, Notifications, Store Link, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Link back to public site */}
        <Link
          href="/"
          className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
          Storefront
        </Link>

        {/* Status Pill */}
        <div className="hidden lg:flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-200/60">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live Cloud API
        </div>

        {/* Notification Bell */}
        <button
          className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
          aria-label="View notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600"></span>
          </span>
        </button>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
            JD
          </div>
          <div className="hidden md:block text-left text-xs">
            <p className="font-semibold text-slate-900 leading-tight">John Doe</p>
            <p className="text-[10px] text-slate-400">Store Manager</p>
          </div>
          <ChevronDown className="hidden md:block h-3.5 w-3.5 text-slate-400" />
        </div>
      </div>
    </header>
  );
}
