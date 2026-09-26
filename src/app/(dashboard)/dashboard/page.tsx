"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Caveat } from "next/font/google";
import {
  ArrowLeft,
  Sprout,
  MessageCircle,
  BookOpen,
  BarChart3,
  ChevronRight,
  Satellite,
  Cog,
  ArrowRight,
} from "lucide-react";
import { TransparentNavSlot } from "../header-context";
import FilterBar from "@/Components/modules/Dashboord/FilterBar";
import AskAiBar from "@/Components/modules/Dashboord/AskAiBar";
import { useRouter } from "next/navigation";

// Handwritten font — same one used on the landing page for consistency
const script = Caveat({ subsets: ["latin"], weight: ["500", "600"] });

const quickActions = [
  {
    title: "Analyze My Farm",
    desc: "Get climate insights for your location",
    icon: Sprout,
    tone: "bg-primary-100 text-primary-700",
    href: "/dashboard/climate-analysis",
  },
  {
    title: "Ask FieldShift AI",
    desc: "Get answers to your farming questions",
    icon: MessageCircle,
    tone: "bg-sky-100 text-sky-600",
    href: "/dashboard/ask-ai",
  },
  {
    title: "Learn Something New",
    desc: "Simple guides for smarter farming",
    icon: BookOpen,
    tone: "bg-amber-100 text-amber-600",
    href: "/dashboard/learn",
  },
  {
    title: "See Example Results",
    desc: "Explore sample analysis and recommendations",
    icon: BarChart3,
    tone: "bg-violet-100 text-violet-600",
    href: "/dashboard/recommendations",
  },
];

const recentAnalyses = [
  { location: "Rajshahi", crop: "Aman Rice", tag: "Save Water", date: "Sep 12, 2025", icon: "🌾" },
  { location: "Mymensingh", crop: "Boro Rice", tag: "Maximize Yield", date: "Aug 28, 2025", icon: "🌱" },
  { location: "Rangpur", crop: "Maize", tag: "Climate Resilience", date: "Aug 10, 2025", icon: "🌽" },
];

const steps = [
  {
    title: "1. NASA Data",
    desc: "We use satellite data on rainfall, temperature, soil moisture and more.",
    icon: Satellite,
    filled: true,
  },
  {
    title: "2. Smart Analysis",
    desc: "Our system analyzes climate trends for your location and crop.",
    icon: Cog,
    filled: false,
  },
  {
    title: "3. Actionable Insights",
    desc: "You get simple, practical recommendations for a resilient tomorrow.",
    icon: Sprout,
    filled: false,
  },
];

export default function DashboardHomePage() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [crop, setCrop] = useState("");
  const [priority, setPriority] = useState("");

  const handleAnalyze = () => {
    router.push(`/dashboard/climate-analysis?location=${location}&crop=${crop}&priority=${priority}`);
  };

  return (
    <div className="pb-8">
      <TransparentNavSlot />

      {/* ── HERO ─────────────────────────────────────────────────────────────
          Full-bleed photo behind transparent navbar; smoky fade into page bg */}
      <section className="relative overflow-hidden bg-[#fbfcfa]" style={{ minHeight: 320 }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-[center_60%]"
            style={{
              backgroundImage:
                "url('https://i.ibb.co.com/HDzJ2h3N/Screenshot-2026-09-24-at-11-31-21-PM.png')",
            }}
          />
          {/* Minimal left fade so heading text is legible */}
          <div className="absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-[#fbfcfa]/100 to-transparent" />
          {/* Top fade for readable navbar */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/20 to-transparent" />
          {/* Smoky bottom blend into #f5f7f5 */}
          <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-[#f5f7f5]/90 to-transparent" />
          <div className="absolute bottom-0 right-0 h-[30%] w-[20%] bg-gradient-to-tl from-[#f5f7f5]/90 to-transparent" />
        </div>

        {/* Text content */}
        <div className="relative px-6 pb-20 pt-20 sm:px-10 sm:pb-24 sm:pt-24">
          <div className="max-w-md">
            <h1 className="flex items-center gap-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Let&apos;s grow a stronger tomorrow
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              FieldShift uses NASA Earth observations to help you make better farming
              decisions — simple, practical, and tailored to your land.
            </p>
          </div>

          <p
            className={`${script.className} absolute right-6 top-20 hidden -rotate-2 text-2xl leading-6 text-white drop-shadow sm:right-10 sm:block sm:top-24`}
          >
            Same Land.
            <br />
            New Possibilities.
          </p>
        </div>
      </section>

      {/* ── FILTER CARD ────────────────────────────────────────────────────────
          -mt-12 pulls the card UP to overlap the bottom of the hero photo */}
      <div className="relative -mt-12 z-10 mb-8 px-4 sm:px-6">
        <FilterBar
          variant="card"
          location={location}
          crop={crop}
          priority={priority}
          onLocationChange={setLocation}
          onCropChange={setCrop}
          onPriorityChange={setPriority}
          onSubmit={handleAnalyze}
        />

        <p className="mt-3 flex flex-wrap items-center justify-between gap-2 px-2 text-xs text-slate-500">
          <span>💡 Not sure? Ask FieldShift AI or explore our learning section!</span>
          <span>Your data is analyzed using NASA Earth observations.</span>
        </p>
      </div>

      {/* Main page content */}
      <div className="space-y-6 px-4 sm:px-6">

      {/* Quick actions */}
      <section>
        <h2 className="text-base font-semibold text-slate-900">Quick Actions</h2>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4  rounded-2xl">
          {quickActions.map((a) => (
            <Link
              key={a.title}
              href={a.href}
              className="rounded-2xl border border-slate-100 bg-white p-4 transition hover:shadow-sm"
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-full ${a.tone}`}>
                <a.icon className="h-5 w-5" />
              </span>
              <p className="mt-3 text-sm font-semibold text-slate-900">{a.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">{a.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent + How it works */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Recent Analyses</h2>
            <Link href="/dashboard/climate-analysis" className="flex items-center gap-1 text-xs font-semibold text-primary-700">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-3 divide-y divide-slate-100">
            {recentAnalyses.map((r) => (
              <Link
                key={r.location}
                href="/dashboard/recommendations"
                className="flex items-center justify-between py-3 hover:bg-slate-50/60"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{r.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {r.location} · {r.crop}
                    </p>
                    <p className="text-xs text-slate-400">{r.tag}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  {r.date}
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">How FieldShift Works</h2>
            <Link href="/dashboard/about" className="flex items-center gap-1 text-xs font-semibold text-primary-700">
              Learn more <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-5 flex items-start justify-between gap-2">
            {steps.map((s, i) => (
              <React.Fragment key={s.title}>
                <div className="flex-1 text-center">
                  <span
                    className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
                      s.filled
                        ? "bg-[#0f3d2a] text-white"
                        : "bg-primary-50 text-primary-700"
                    }`}
                  >
                    <s.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-2 text-xs font-semibold text-slate-800">{s.title}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-400">{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight className="mt-5 h-4 w-4 flex-shrink-0 text-slate-300" />
                )}
              </React.Fragment>
            ))}
          </div>
          <p className={`${script.className} mt-4 -rotate-1 text-center text-lg text-primary-700`}>
            Healthy Fields. Brighter Tomorrows.
          </p>
        </div>
      </section>

      <AskAiBar />
      </div>
    </div>
  );
}