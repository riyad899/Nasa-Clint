"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Laptop, 
  Menu, 
  X, 
  Search, 
  ShoppingCart, 
  User, 
  LayoutDashboard,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20 transition-transform duration-200 group-hover:scale-105">
            <Laptop className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Tech<span className="text-blue-600">Space</span>
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-wider text-slate-400 -mt-1">
              Computers & Rigs
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/#featured"
            className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
          >
            Workstations
          </Link>
          <Link
            href="/#laptops"
            className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
          >
            Gaming Laptops
          </Link>
          <Link
            href="/#about"
            className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
          >
            About Store
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/signin"
            className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <User className="h-4 w-4 text-slate-500" />
            <span>Sign In</span>
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </Link>

          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 hover:border-slate-300 transition-all"
          >
            <LayoutDashboard className="h-4 w-4 text-blue-600" />
            <span>Dashboard</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/dashboard"
            className="rounded-lg bg-slate-100 p-2 text-slate-700"
            title="Dashboard"
          >
            <LayoutDashboard className="h-5 w-5 text-blue-600" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 pb-6 pt-2 md:hidden">
          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-medium text-slate-900 hover:bg-slate-50"
            >
              Home
            </Link>
            <Link
              href="/#featured"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-medium text-slate-900 hover:bg-slate-50"
            >
              Workstations
            </Link>
            <Link
              href="/#laptops"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-medium text-slate-900 hover:bg-slate-50"
            >
              Gaming Laptops
            </Link>
            <Link
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-medium text-slate-900 hover:bg-slate-50"
            >
              About Store
            </Link>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
            <Link
              href="/signin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Create Account
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 py-2.5 text-sm font-semibold text-white"
            >
              <LayoutDashboard className="h-4 w-4" />
              Open Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
