"use client";

import React from "react";
import Link from "next/link";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Box,
  TrendingUp,
  Cpu,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const stats = [
  {
    title: "Monthly Revenue",
    value: "$124,590.00",
    change: "+14.6%",
    isPositive: true,
    icon: DollarSign,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    title: "Completed Builds",
    value: "84 Systems",
    change: "+8.2%",
    isPositive: true,
    icon: ShoppingCart,
    color: "text-blue-600 bg-blue-50",
  },
  {
    title: "Active Workstations",
    value: "312 Units",
    change: "-1.5%",
    isPositive: false,
    icon: Cpu,
    color: "text-purple-600 bg-purple-50",
  },
  {
    title: "Registered Builders",
    value: "1,420",
    change: "+22.4%",
    isPositive: true,
    icon: Users,
    color: "text-amber-600 bg-amber-50",
  },
];

const recentOrders = [
  {
    id: "TS-9042",
    customer: "Cyberdyne Systems",
    spec: "Apex Cyber Titan X9 (RTX 4090)",
    status: "Benchmarking",
    date: "10 mins ago",
    amount: "$3,499.00",
    statusColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    id: "TS-9041",
    customer: "Quantum Data Lab",
    spec: "Precision AI Studio Max (Dual RTX 6000)",
    status: "Assembled",
    date: "45 mins ago",
    amount: "$8,999.00",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "TS-9040",
    customer: "Dr. Elena Vance",
    spec: "Quantum Liquid Custom Loop (OC)",
    status: "Burn-in QA",
    date: "2 hours ago",
    amount: "$4,799.00",
    statusColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    id: "TS-9039",
    customer: "Valkyrie Esports",
    spec: "Valkyrie Stealth Blade 16 (x5)",
    status: "Dispatched",
    date: "5 hours ago",
    amount: "$11,495.00",
    statusColor: "bg-slate-100 text-slate-700 border-slate-200",
  },
];

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Operations Overview
            </h1>
            <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
              Live
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Welcome to the TechSpace Root Dashboard Layout.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Preview Storefront
          </Link>
          <button className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition">
            + New Build Order
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">{stat.title}</span>
                <div className={`rounded-xl p-2.5 ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs">
                {stat.isPositive ? (
                  <span className="flex items-center font-semibold text-emerald-600">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    {stat.change}
                  </span>
                ) : (
                  <span className="flex items-center font-semibold text-rose-600">
                    <ArrowDownRight className="h-3.5 w-3.5" />
                    {stat.change}
                  </span>
                )}
                <span className="text-slate-400">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Split: Orders & Assembly Telemetry */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Orders Table */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Build Orders</h2>
              <p className="text-xs text-slate-400">Hardware queue and testing states</p>
            </div>
            <button className="text-xs font-semibold text-blue-600 hover:underline">
              View all orders
            </button>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-100 text-[11px] font-semibold uppercase text-slate-400">
                <tr>
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Client</th>
                  <th className="pb-3">Specification</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 font-mono font-semibold text-slate-900">
                      {order.id}
                    </td>
                    <td className="py-3.5 text-slate-900 font-semibold">{order.customer}</td>
                    <td className="py-3.5 text-slate-500 max-w-xs truncate">{order.spec}</td>
                    <td className="py-3.5">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${order.statusColor}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right font-bold text-slate-900">
                      {order.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Production Lab Status */}
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold text-slate-900">Testing Lab Telemetry</h2>
            <p className="text-xs text-slate-400">Active stress racks & thermal chambers</p>

            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">Burn-in Bay 01 (RTX 4090 Rigs)</span>
                  <span className="text-blue-600">88% Capacity</span>
                </div>
                <div className="mt-1.5 h-2 w-full rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-blue-600" style={{ width: "88%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">Liquid Loop Pressure Chamber</span>
                  <span className="text-emerald-600">Optimal (0.8 Bar)</span>
                </div>
                <div className="mt-1.5 h-2 w-full rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: "95%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">Silicon Binning Diagnostic</span>
                  <span className="text-purple-600">Active</span>
                </div>
                <div className="mt-1.5 h-2 w-full rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-purple-500" style={{ width: "70%" }}></div>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-slate-50 p-3 border border-slate-100">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                All 6 Assembly Stations Operational
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Zero temperature faults detected in the last 48 hours.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white shadow-sm">
            <h3 className="text-sm font-bold">Layout Verification Note</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-blue-100">
              This screen is contained within the static sidebar and top-navbar dashboard layout structure requested.
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm hover:bg-blue-50 transition"
            >
              Test Common Layout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
