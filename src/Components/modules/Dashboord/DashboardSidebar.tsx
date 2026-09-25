"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CloudSun,
  ClipboardCheck,
  HelpCircle,
  Bot,
  Package,
  Info,
  X,
  Leaf,
} from "lucide-react";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Climate Analysis", href: "/dashboard/climate-analysis", icon: CloudSun },
  { label: "Recommendations", href: "/dashboard/recommendations", icon: ClipboardCheck },
  { label: "Why This Result?", href: "/dashboard/why-this-result", icon: HelpCircle },
  { label: "Ask FieldShift AI", href: "/dashboard/ask-ai", icon: Bot },
  { label: "Learn", href: "/dashboard/learn", icon: Package },
  { label: "About", href: "/dashboard/about", icon: Info },
];

export default function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-primary-100 bg-white transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-primary-100 px-5">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-700 text-white">
              <Leaf className="h-4.5 w-4.5" />
            </span>
            <span>
              <span className="block text-[17px] font-semibold leading-none text-slate-900">FieldShift</span>
              <span className="block text-[11px] leading-none text-primary-600 mt-1">Adapting Farms with NASA Data</span>
            </span>
          </Link>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 md:hidden" aria-label="Close sidebar">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => window.innerWidth < 768 && onClose()}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? "bg-primary-800 text-white" : "text-slate-600 hover:bg-primary-50"
                }`}
              >
                <Icon className={`h-[18px] w-[18px] ${isActive ? "text-white" : "text-slate-400"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-primary-100 p-5">
          <Leaf className="h-6 w-6 text-primary-600" />
          <p className="mt-2 text-sm font-semibold leading-snug text-slate-900">
            A Climate-Resilient Future for Farmers
          </p>
          <p className="mt-1 text-xs leading-relaxed text-slate-400">
            Earth data. Local impact. Stronger farms.
          </p>
        </div>
      </aside>
    </>
  );
}
