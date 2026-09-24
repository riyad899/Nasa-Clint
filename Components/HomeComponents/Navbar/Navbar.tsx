"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Leaf, Globe, ChevronDown, Menu, X } from "lucide-react";
import { useAuth, initials } from "@/lib/auth-context";

const links = [
  { label: "Home", href: "/" },
  { label: "Crops", href: "/#crops" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Learn", href: "/#learn" },
  { label: "About", href: "/#about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-primary-100 bg-[#fbfaf7]/95 backdrop-blur">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-700 text-white">
            <Leaf className="h-4.5 w-4.5" />
          </span>
          <span>
            <span className="block text-lg font-semibold leading-none text-slate-900">FieldShift</span>
            <span className="block text-[11px] leading-none text-slate-400 mt-1">Farms Today. A Safer Tomorrow.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative text-[15px] font-medium transition-colors ${
                i === 0 ? "text-slate-900" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {l.label}
              {i === 0 && <span className="absolute -bottom-[26px] left-0 h-[2px] w-full bg-primary-700" />}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-2 text-sm text-slate-600 hover:bg-slate-50">
            <Globe className="h-4 w-4" />
            EN
            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          {user ? (
            <Link href="/dashboard" className="flex items-center gap-2 rounded-full border border-slate-200 py-1 pl-1 pr-3.5 hover:bg-slate-50">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-800 text-xs font-semibold text-white">
                {initials(user.name)}
              </span>
              <span className="text-sm font-medium text-slate-700">{user.name}</span>
            </Link>
          ) : (
            <Link href="/signin" className="rounded-full bg-primary-800 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-900">
              Sign In
            </Link>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="p-2 text-slate-700 md:hidden" aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-primary-100 bg-white px-5 py-4 md:hidden">
          <div className="space-y-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50">
                {l.label}
              </Link>
            ))}
          </div>
          {user ? (
            <Link href="/dashboard" onClick={() => setOpen(false)} className="mt-3 flex items-center justify-center gap-2 rounded-full bg-primary-700 py-2.5 text-sm font-semibold text-white">
              Go to Dashboard, {user.name}
            </Link>
          ) : (
            <Link href="/signin" onClick={() => setOpen(false)} className="mt-3 flex items-center justify-center gap-2 rounded-full bg-primary-700 py-2.5 text-sm font-semibold text-white">
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
