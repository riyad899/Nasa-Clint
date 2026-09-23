import React from "react";
import Link from "next/link";
import { Laptop, ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // In Auth Layout: strictly NO navbar and NO footer, only page content
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />

      {/* Top minimal bar with back link */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between p-4 sm:p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Store
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Laptop className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold tracking-tight text-white">
            Tech<span className="text-blue-500">Space</span>
          </span>
        </div>
      </div>

      {/* Main Auth Content (NO Navbar, NO Footer) */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Minimal copyright notice */}
      <div className="relative z-10 py-4 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} TechSpace Security & Auth Portal
      </div>
    </div>
  );
}
