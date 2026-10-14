import React from "react";
import Link from "next/link";
import { Caveat } from "next/font/google";

import {
  Leaf,
  Sprout,
  Droplet,
  Users,
  Globe2,
  Sparkles,
  BarChart3,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

const script = Caveat({
  subsets: ["latin"],
  weight: ["500"],
});

const stages = [
  { label: "Healthier Crops", active: true },
  { label: "Stronger Communities", active: false },
  { label: "A Resilient Tomorrow", active: false },
];

const features = [
  { icon: Sprout, lines: ["Data-driven", "farming advice"] },
  { icon: Droplet, lines: ["Climate-resilient", "decisions"] },
  { icon: Users, lines: ["Support for", "healthier communities"] },
  { icon: Globe2, lines: ["Real impact", "from space to soil"] },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fbfcfa]">
      <section className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#f8fbfa] md:min-h-screen">
        {/* ================= BACKGROUND IMAGE ================= */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-bottom bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://i.ibb.co.com/HDzJ2h3N/Screenshot-2026-09-24-at-11-31-21-PM.png')",
            }}
          />

          {/* Desktop image fade */}
          <div className="absolute inset-x-0 top-0 hidden h-[55%]  md:block" />

          {/* Mobile top fade */}
          <div className="absolute inset-x-0 top-0 h-[58%] md:hidden" />

          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="relative z-10 flex min-h-[100svh] flex-1 flex-col px-5 md:min-h-screen">
          {/* LEFT TAGLINE (Desktop only) */}
          <div className="absolute left-10 top-[33%] z-10 hidden lg:block">
            <div className="mb-4 h-px w-6 bg-slate-400" />
            <p className="text-[15px] leading-6 text-slate-500">
              Same Land.
              <br />
              New Insights.
              <br />
              Stronger Futures.
            </p>
          </div>

          {/* RIGHT STAGES (Desktop only) */}
          <div className="absolute right-10 top-[27%] z-10 hidden lg:block">
            <div className="relative">
              <div className="absolute bottom-2 left-[5px] top-2 w-px bg-slate-200" />

              <div className="space-y-7">
                {stages.map((stage) => (
                  <div
                    key={stage.label}
                    className="relative flex items-start gap-3"
                  >
                    <span
                      className={`relative z-10 mt-0.5 h-3 w-3 flex-shrink-0 rounded-full ${
                        stage.active
                          ? "border-2 border-[#147a55] bg-[#147a55] ring-2 ring-white"
                          : "bg-slate-300 ring-2 ring-white"
                      }`}
                    />
                    <span
                      className={`w-24 text-[11px] leading-tight ${
                        stage.active
                          ? "font-medium text-slate-900"
                          : "text-slate-400"
                      }`}
                    >
                      {stage.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= HERO CONTENT ================= */}
          <div className="flex flex-1 flex-col items-center pt-20 text-center md:pt-24">
            {/* MOBILE ONLY: logo overlay (bg blended away) */}
            <img
              src="https://i.ibb.co.com/LzcYtL5j/Crop-Wise-Green-Agriculture-Logo.png"
              alt="CropWise - Same Land. New Possibilities."
              className="w-full max-w-[320px] object-contain mix-blend-multiply md:hidden"
            />

            {/* NASA label (Desktop only) */}
            <p className="hidden text-xs font-semibold tracking-[0.25em] text-[#527364] md:block">
              POWERED BY NASA EARTH DATA
            </p>

            {/* Main heading (Desktop only) */}
            <h1 className="mt-6 hidden text-5xl font-semibold leading-[1] tracking-[-1px] text-[#0b1a14] md:block lg:text-[58px]">
              Better Information <br />
              <span className="text-[#146b4b]">Brighter Harvests</span>
            </h1>

            {/* Description (Desktop only) */}
            <p className="mt-5 hidden max-w-lg text-[17px] leading-relaxed text-slate-500 md:block">
              CropWise AI turns satellite data into simple, practical insights
              so farmers can adapt, plan, and grow with confidence.
            </p>

            {/* DESKTOP SEARCH */}
            <form className="mt-7 hidden w-full max-w-[550px] items-center gap-3 rounded-full border border-slate-200 bg-white p-2 pl-2.5 shadow-[0_8px_30px_rgba(20,60,40,0.08)] md:flex">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#f2f6f3]">
                <Leaf className="h-4 w-4 text-[#147a55]" />
              </span>

              <input
                type="text"
                placeholder="What would you like to do today?"
                className="w-full bg-transparent text-sm text-slate-700 placeholder-slate-500 outline-none"
              />

              <button
                type="submit"
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#cfe3d9] text-[#0f3d2a] transition hover:bg-[#bcd8ca]"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {/* DESKTOP PHASE BUTTONS */}
            <div className="mt-6 hidden flex-col items-center gap-5 sm:flex-row sm:items-start md:flex">
              {/* Phase 1 */}
              <div className="flex w-[250px] flex-col items-center">
                <Link
                  href="/dashboard"
                  className="flex h-11 w-full items-center justify-center gap-2.5 rounded-full bg-[#106345] text-sm font-medium text-white shadow-sm transition hover:bg-[#0c5238]"
                >
                  <Sparkles className="h-4 w-4" />
                  Start Phase 1 Analysis
                </Link>
                <span className="mt-2 text-[11px] text-slate-500">
                  Quick insights for today
                </span>
              </div>

              <div className="mt-2.5 hidden h-8 w-px bg-slate-300 sm:block" />

              {/* Phase 2 */}
              <div className="flex w-[250px] flex-col items-center">
                <Link
                  href="/dashboard/climate-analysis"
                  className="flex h-11 w-full items-center justify-center gap-2.5 rounded-full border border-slate-200 bg-white text-sm font-medium text-slate-800 transition hover:bg-slate-50"
                >
                  <BarChart3 className="h-4 w-4 text-[#147a55]" />
                  Start Phase 2 Analysis
                </Link>
                <span className="mt-2 text-[11px] text-slate-500">
                  Advanced insights for long-term planning
                </span>
              </div>
            </div>

            {/* MOBILE BOTTOM: Get Started + dots */}
            <div className="mb-8 mt-auto flex w-full flex-col items-center md:hidden">
              <Link
                href="/dashboard"
                className="flex h-12 w-full max-w-[300px] items-center justify-center gap-2 rounded-full bg-[#0f4d36] text-sm font-medium text-white shadow-[0_6px_25px_rgba(0,0,0,0.25)] transition active:scale-[0.98]"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>

              
            </div>

            {/* FEATURES (Desktop only) */}
            <div className="mt-12 hidden flex-wrap items-center justify-center gap-y-4 sm:mt-14 md:flex">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.lines[0]}
                    className="flex items-center gap-3 px-6 text-left text-xs leading-tight text-slate-600 md:border-l md:border-slate-200 md:first:border-l-0"
                  >
                    <Icon className="h-5 w-5 flex-shrink-0 text-[#147a55]" />
                    <span>
                      {feature.lines[0]}
                      <br />
                      {feature.lines[1]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* HANDWRITTEN TEXT (Desktop only) */}
        <div
          className={`${script.className} absolute right-10 top-[61%] z-10 hidden -rotate-[14deg] text-[26px] leading-[1.05] text-[#173d2a] md:block lg:right-12`}
        >
          <p className="text-left">
            From
            <br />
            Space Data
            <br />
            to Stronger
            <br />
            Farms
          </p>
          <div className="mt-1 h-px w-24 origin-left rotate-[6deg] bg-[#173d2a]" />
        </div>

        {/* NASA BADGE (Desktop only) */}
        <div className="absolute bottom-6 right-6 z-10 hidden items-center gap-2.5 text-[11px] leading-tight text-white drop-shadow-md md:flex lg:right-10">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0b3d91] text-[10px] font-bold italic tracking-wide">
            NASA
          </span>
          <span>
            Powered by
            <br />
            NASA Earth Data
          </span>
        </div>

        {/* SCROLL HINT (Desktop only) */}
        <ChevronDown className="absolute bottom-3 left-1/2 z-10 hidden h-4 w-4 -translate-x-1/2 text-white/70 md:block" />
      </section>
    </main>
  );
}