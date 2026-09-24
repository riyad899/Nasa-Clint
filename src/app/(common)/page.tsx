import React from "react";
import Link from "next/link";
import {
  Leaf,
  ArrowRight,
  Sparkles,
  BarChart3,
  Droplet,
  Users,
  Globe2,
} from "lucide-react";

const stages = [
  {
    label: "Healthier Crops",
    active: true,
  },
  {
    label: "Stronger Communities",
    active: false,
  },
  {
    label: "A Resilient Tomorrow",
    active: false,
  },
];

const features = [
  {
    icon: Leaf,
    text: "Data-driven farming advice",
  },
  {
    icon: Droplet,
    text: "Climate-resilient decisions",
  },
  {
    icon: Users,
    text: "Support for healthier communities",
  },
  {
    icon: Globe2,
    text: "Real impact from space to soil",
  },
];

export default function HomePage() {
  return (
    <main className="h-screen overflow-hidden bg-[#fbfaf7]">

      {/* ================================================= */}
      {/*                    HERO CONTENT                   */}
      {/* ================================================= */}

      <section className="mx-auto h-[58%] max-w-7xl px-5 pt-7 sm:px-8 lg:pt-8">

        <div className="grid h-full grid-cols-1 lg:grid-cols-[1fr_240px] lg:gap-8">

          {/* ================= MAIN CONTENT ================= */}

          <div className="flex flex-col items-center text-center">

            {/* NASA Label */}

            <p className="text-[10px] font-medium tracking-[0.2em] text-slate-400 sm:text-xs">
              POWERED BY NASA EARTH DATA
            </p>

            {/* Heading */}

            <h1 className="mt-2 text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Better Information
              <br />
              <span className="text-[#147a55]">
                Brighter Harvests
              </span>
            </h1>

            {/* Description */}

            <p className="mt-3 max-w-xl text-xs leading-relaxed text-slate-500 sm:text-sm">
              FieldShift turns satellite data into simple, practical insights
              so farmers can adapt, plan, and grow with confidence.
            </p>

            {/* ================= SEARCH ================= */}

            <form className="mt-5 flex w-full max-w-xl items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 pl-4 shadow-sm">

              <Leaf className="h-4 w-4 flex-shrink-0 text-[#147a55]" />

              <input
                type="text"
                placeholder="What would you like to do today?"
                className="w-full bg-transparent text-xs text-slate-700 placeholder-slate-400 outline-none sm:text-sm"
              />

              <button
                type="submit"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#e5f1eb] text-[#147a55] transition hover:bg-[#d4e9df]"
              >
                <ArrowRight className="h-4 w-4" />
              </button>

            </form>

            {/* ================= BUTTONS ================= */}

            <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row">

              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-full bg-[#147a55] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0f6345] sm:text-sm"
              >
                <Sparkles className="h-4 w-4" />
                Start Phase 1 Analysis
              </Link>

              <Link
                href="/dashboard/climate-analysis"
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 sm:text-sm"
              >
                <BarChart3 className="h-4 w-4" />
                Start Phase 2 Analysis
              </Link>

            </div>

            {/* Button Description */}

            <div className="mt-1 flex flex-col gap-0.5 text-[10px] text-slate-400 sm:flex-row sm:gap-8">
              <span>Quick insights for today</span>
              <span>Advanced insights for long-term planning</span>
            </div>


            {/* ================= FEATURES ================= */}

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-slate-100 pt-4 text-[11px] text-slate-600 sm:gap-x-8 sm:text-xs">

              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.text}
                    className="flex items-center gap-1.5"
                  >
                    <Icon className="h-3.5 w-3.5 text-[#147a55]" />
                    <span>{feature.text}</span>
                  </div>
                );
              })}

            </div>

          </div>


          {/* ================================================= */}
          {/*              RIGHT STAGES                         */}
          {/* ================================================= */}

          <div className="hidden items-center lg:flex">

            <div className="relative w-full pl-4">

              {/* Vertical Line */}

              <div className="absolute left-[19px] top-2 h-[calc(100%-16px)] w-px bg-slate-200" />

              <div className="space-y-6">

                {stages.map((stage) => (
                  <div
                    key={stage.label}
                    className="relative flex items-center gap-4"
                  >

                    <span
                      className={`relative z-10 h-3 w-3 flex-shrink-0 rounded-full border-2 ${
                        stage.active
                          ? "border-[#147a55] bg-[#147a55]"
                          : "border-slate-300 bg-[#fbfaf7]"
                      }`}
                    />

                    <span
                      className={`text-xs ${
                        stage.active
                          ? "font-semibold text-[#173d2a]"
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

        </div>

      </section>


      {/* ================================================= */}
      {/*              FULL WIDTH IMAGE                     */}
      {/* ================================================= */}

      <section className="relative h-[42%] min-h-[280px] w-full overflow-hidden">

        {/* Image */}

        <div
          className="absolute inset-0 bg-cover bg-[center_15%] bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://i.ibb.co.com/spZxWQ7q/Chat-GPT-Image-Sep-24-2026-06-05-14-PM.png')",
          }}
        />

        {/* Top Fade */}

        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#fbfaf7] via-[#fbfaf7]/40 to-transparent" />

        {/* Bottom Overlay */}

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#173d2a]/70 to-transparent" />


        {/* ================= IMAGE TEXT ================= */}

        <div className="absolute left-6 top-6 sm:left-10 sm:top-8 lg:left-14">

          <p className="font-serif text-sm italic leading-5 text-white drop-shadow-md sm:text-base">
            From Space Data
            <br />
            to Stronger Farms
          </p>

          <div className="mt-1.5 h-px w-20 bg-white/70" />

        </div>


        {/* ================= NASA BADGE ================= */}

        <div className="absolute bottom-4 right-5 flex items-center gap-2 rounded-full bg-[#0f2e20]/80 px-3 py-1.5 text-[10px] text-white backdrop-blur-md sm:bottom-5 sm:right-10 sm:text-xs">

          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[8px] font-bold text-[#0f2e20]">
            N
          </span>

          <span>
            Powered by NASA Earth Data
          </span>

        </div>

      </section>

    </main>
  );
}