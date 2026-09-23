import React from "react";
import Link from "next/link";
import { Laptop, LogIn, UserPlus, KeyRound, Shield, CheckCircle2 } from "lucide-react";

export default function AuthHubPage() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
          <Shield className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">
          TechSpace Authentication Hub
        </h2>
        <p className="mt-1.5 text-xs text-slate-400">
          Select an access method to enter the store and administration portal
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <Link
          href="/signin"
          className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800/80 p-4 transition hover:border-blue-500 hover:bg-slate-800"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <LogIn className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Sign In to Existing Account</h3>
              <p className="text-xs text-slate-400">Access saved rigs, orders, and warranty</p>
            </div>
          </div>
        </Link>

        <Link
          href="/signup"
          className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800/80 p-4 transition hover:border-blue-500 hover:bg-slate-800"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Create New Account</h3>
              <p className="text-xs text-slate-400">Register as a builder, gamer, or client</p>
            </div>
          </div>
        </Link>

        <Link
          href="/verify-email"
          className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800/80 p-4 transition hover:border-blue-500 hover:bg-slate-800"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Verify Account Email</h3>
              <p className="text-xs text-slate-400">Enter 6-digit verification code</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-8 border-t border-slate-800 pt-4 text-center">
        <Link
          href="/"
          className="text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          Return to Storefront
        </Link>
      </div>
    </div>
  );
}
