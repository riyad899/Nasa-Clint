import React from "react";
import Link from "next/link";
import { Leaf, ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // In Auth Layout: strictly NO navbar and NO footer, only page content
  return (
    <div className="relative flex min-h-screen flex-col justify-between bg-[#fbfaf7] text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary-100 via-[#fbfaf7] to-[#fbfaf7]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between p-4 sm:p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-700 text-white">
            <Leaf className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-slate-900">FieldShift</span>
        </div>
      </div>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-md">{children}</div>
      </main>

      <div className="relative z-10 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} FieldShift. Same Land. New Insights. Stronger Futures.
      </div>
    </div>
  );
}
