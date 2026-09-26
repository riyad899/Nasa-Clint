"use client";

import React, { useState, useEffect, Suspense, Fragment } from "react";
import { useSearchParams } from "next/navigation";
import { Caveat } from "next/font/google";
import {
  CloudRain,
  Thermometer,
  Droplet,
  Leaf,
  Info,
  Satellite,
  MapPin,
  BarChart3,
  Calendar,
  Sprout,
  Quote,
  ArrowRight,
} from "lucide-react";
import { TransparentNavSlot } from "../../header-context";
import FilterBar from "@/Components/modules/Dashboord/FilterBar";
import AskAiBar from "@/Components/modules/Dashboord/AskAiBar";
import { useRouter } from "next/navigation";

// Handwritten font — same one used across the app for consistency
const script = Caveat({ subsets: ["latin"], weight: ["500", "600"] });

// Shared spacing token so every section lines up with the same left/right
// margins as the rest of the dashboard (Quick Actions, Recent Analyses, etc).
const SECTION_X = "px-6 sm:px-10";

const metrics = [
  {
    label: "Rainfall Onset",
    value: "+11 days",
    note: "Compared to 2001–2012",
    desc: "Rainy season now starts later in recent years.",
    icon: CloudRain,
    card: "bg-sky-50 border-sky-100",
    iconBg: "bg-white text-sky-600",
    valueColor: "text-sky-900",
  },
  {
    label: "Temperature",
    value: "+0.8°C",
    note: "During growing season",
    desc: "Higher temperatures may affect crop development.",
    icon: Thermometer,
    card: "bg-rose-50 border-rose-100",
    iconBg: "bg-white text-rose-600",
    valueColor: "text-rose-600",
  },
  {
    label: "Soil Moisture",
    value: "Moderate",
    note: "Current condition",
    desc: "Soil moisture is sufficient for transplanting soon.",
    icon: Droplet,
    card: "bg-violet-50 border-violet-100",
    iconBg: "bg-white text-violet-600",
    valueColor: "text-violet-700",
  },
  {
    label: "Vegetation Index (NDVI)",
    value: "Stable",
    note: "Recent trend",
    desc: "Vegetation condition looks healthy for the season.",
    icon: Leaf,
    card: "bg-emerald-50 border-emerald-100",
    iconBg: "bg-white text-emerald-600",
    valueColor: "text-emerald-700",
  },
];

const onboardingSteps = [
  { n: 1, title: "Choose your farm", desc: "Select your location, crop and priority.", icon: MapPin },
  { n: 2, title: "Analyze NASA data", desc: "We process real satellite data and climate trends.", icon: Satellite },
  { n: 3, title: "Get actionable insights", desc: "Receive personalized recommendations for a more resilient tomorrow.", icon: BarChart3 },
];

const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const rainfall = { hist: [40, 85, 215, 210, 140, 65], recent: [55, 110, 185, 180, 110, 55] };
const temperature = { hist: [27, 29, 31, 32, 31, 28], recent: [31, 33, 35, 36, 35, 32] };

// ================= CHARTS =================

function RainfallChart() {
  const width = 320;
  const height = 180;
  const padL = 34;
  const padR = 6;
  const padT = 6;
  const padB = 22;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;
  const max = 250;
  const ticks = [0, 50, 100, 150, 200, 250];
  const groupW = chartW / months.length;
  const barW = 12;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      <text
        x={11}
        y={padT + chartH / 2}
        fontSize="8.5"
        fill="#94a3b8"
        textAnchor="middle"
        transform={`rotate(-90, 11, ${padT + chartH / 2})`}
      >
        Rainfall (mm)
      </text>

      {ticks.map((t) => {
        const y = padT + chartH - (t / max) * chartH;
        return (
          <g key={t}>
            <line x1={padL} x2={width - padR} y1={y} y2={y} stroke="#eef2f0" strokeWidth="1" />
            <text x={padL - 6} y={y + 3} fontSize="8" textAnchor="end" fill="#94a3b8">
              {t}
            </text>
          </g>
        );
      })}

      {months.map((m, i) => {
        const gx = padL + i * groupW;
        const hHist = (rainfall.hist[i] / max) * chartH;
        const hRecent = (rainfall.recent[i] / max) * chartH;
        return (
          <g key={m}>
            <rect x={gx + groupW / 2 - barW - 2} y={padT + chartH - hHist} width={barW} height={hHist} rx={2} fill="#b8dfc4" />
            <rect x={gx + groupW / 2 + 2} y={padT + chartH - hRecent} width={barW} height={hRecent} rx={2} fill="#1c5439" />
            <text x={gx + groupW / 2} y={height - 6} fontSize="9" textAnchor="middle" fill="#94a3b8">
              {m}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function TemperatureChart() {
  const width = 320;
  const height = 180;
  const padL = 34;
  const padR = 6;
  const padT = 6;
  const padB = 22;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;
  const min = 20;
  const max = 40;
  const ticks = [20, 25, 30, 35, 40];
  const stepX = chartW / (months.length - 1);

  const toXY = (arr: number[]) =>
    arr.map((v, i) => [padL + i * stepX, padT + chartH - ((v - min) / (max - min)) * chartH]);

  const histPts = toXY(temperature.hist);
  const recentPts = toXY(temperature.recent);
  const linePoints = (pts: number[][]) => pts.map(([x, y]) => `${x},${y}`).join(" ");
  const areaPath = (pts: number[][]) => {
    const top = pts.map(([x, y]) => `${x},${y}`).join(" L ");
    const baseY = padT + chartH;
    return `M ${pts[0][0]},${baseY} L ${top} L ${pts[pts.length - 1][0]},${baseY} Z`;
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      <defs>
        <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1c5439" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#1c5439" stopOpacity="0" />
        </linearGradient>
      </defs>

      <text
        x={11}
        y={padT + chartH / 2}
        fontSize="8.5"
        fill="#94a3b8"
        textAnchor="middle"
        transform={`rotate(-90, 11, ${padT + chartH / 2})`}
      >
        Temperature (°C)
      </text>

      {ticks.map((t) => {
        const y = padT + chartH - ((t - min) / (max - min)) * chartH;
        return (
          <g key={t}>
            <line x1={padL} x2={width - padR} y1={y} y2={y} stroke="#eef2f0" strokeWidth="1" />
            <text x={padL - 6} y={y + 3} fontSize="8" textAnchor="end" fill="#94a3b8">
              {t}
            </text>
          </g>
        );
      })}

      <path d={areaPath(recentPts)} fill="url(#tempFill)" />
      <polyline points={linePoints(histPts)} fill="none" stroke="#b8dfc4" strokeWidth="2.5" />
      <polyline points={linePoints(recentPts)} fill="none" stroke="#1c5439" strokeWidth="2.5" />

      {months.map((m, i) => (
        <text key={m} x={padL + i * stepX} y={height - 6} fontSize="9" textAnchor="middle" fill="#94a3b8">
          {m}
        </text>
      ))}
    </svg>
  );
}

function ChartLegend() {
  return (
    <div className="mt-2 flex gap-4 text-xs text-slate-500">
      <span className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-primary-200" /> 2001–2012 (Historical)
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-primary-800" /> 2013–2025 (Recent)
      </span>
    </div>
  );
}

function ClimateAnalysisContent() {
  const params = useSearchParams();
  const router = useRouter();
  const [location, setLocation] = useState(params.get("location") || "");
  const [crop, setCrop] = useState(params.get("crop") || "");
  const [priority, setPriority] = useState(params.get("priority") || "");
  const [hasResult, setHasResult] = useState(false);

  useEffect(() => {
    if (params.get("location") && params.get("crop") && params.get("priority")) {
      setHasResult(true);
    }
  }, [params]);

  const handleAnalyze = () => {
    router.push(
      `/dashboard/climate-analysis?location=${location}&crop=${crop}&priority=${priority}`
    );
    setHasResult(true);
  };

  return (
    <div className="pb-6">
      {/* Tell the layout to make the navbar transparent/overlay */}
      <TransparentNavSlot />

      {/* ── HERO ─────────────────────────────────────────────────────────────
          Full-bleed photo; starts at y=0 so it sits directly behind the
          transparent navbar. pt-16/pt-20 pushes the text below navbar height. */}
      {/* ── HERO ──────────────────────────────────────────────────────────────
          Extra pb-20 at the bottom creates the "bleed" space so the
          FilterBar card can overlap upward into the image. */}
      <section className="relative overflow-hidden bg-[#fbfcfa]" style={{ minHeight: 320 }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-[center_65%]"
            style={{
              backgroundImage: "url('/analysisBG.png')",
            }}
          />
          {/* Minimal left fade — only a narrow strip so the heading text is legible */}
          <div className="absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-[#fbfcfa]/100 to-transparent" />
          {/* Top fade — soft dark veil so the transparent navbar icons are readable */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/20 to-transparent" />
          {/* Smoky bottom blend — lighter + shorter so picture stays visible */}
          <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-[#f5f7f5]/90 to-transparent" />
            <div className="absolute bottom-0 right-0 h-[30%] w-[20%] bg-gradient-to-tl from-[#f5f7f5]/90 to-transparent" />

        </div>

        {/* Text content — pt accounts for the floating navbar (~64 px),
            pb-20 reserves room for the overlapping FilterBar card below */}
        <div className="relative px-6 pb-20 pt-20 sm:px-10 sm:pb-24 sm:pt-24">
          <div className="max-w-sm">
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Climate Analysis
            </h1>

            {hasResult && (
              <p className="mt-1 text-lg font-semibold text-[#173d2a]">
                {location} · {crop}
              </p>
            )}

            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Insights from NASA Earth observations to help you make better farming decisions.
            </p>
          </div>

          {/* Handwritten quote — top-right */}
          <p
            className={`${script.className} absolute right-[-24px] pr-[200px]  -rotate-[19deg] text-2xl leading-6 text-white drop-shadow sm:right-10 sm:block sm:top-24`}
          >
            Healthy Fields
            <br />
            Brighter Tomorrows
          </p>
        </div>
      </section>

      {/* ── FILTER CARD ────────────────────────────────────────────────────────
          -mt-12 pulls the card UP so it overlaps the bottom of the hero photo,
          z-10 keeps it above the image layers, and mb-8 adds spacing below
          before the results section starts. */}
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
          hasResult={hasResult}
        />

        <p className="mt-3 flex flex-wrap items-center justify-between gap-2 px-2 text-xs text-slate-500">
          <span>💡 Not sure? Ask FieldShift AI or explore our learning section!</span>
          <span>ⓘ Your data is analyzed using NASA Earth observations.</span>
        </p>
      </div>

      {/* ── RESULTS (only after analysis) ───────────────────────────────── */}
      {hasResult ? (
        <div className="space-y-8">
          {/* Metric cards */}
          <section className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ${SECTION_X}`}>
            {metrics.map((m) => (
              <div key={m.label} className={`rounded-2xl border p-5 shadow-sm ${m.card}`}>
                <div className="flex items-center gap-2">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-sm ${m.iconBg}`}>
                    <m.icon className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-medium text-slate-500">{m.label}</span>
                </div>
                <p className={`mt-3 text-2xl font-semibold ${m.valueColor}`}>{m.value}</p>
                <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
                  {m.note} <Info className="h-3 w-3" />
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{m.desc}</p>
              </div>
            ))}
          </section>

          {/* Charts */}
          <section className={`grid grid-cols-1 gap-4 lg:grid-cols-2 ${SECTION_X}`}>
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">Rainfall Pattern Comparison</h2>
                <Info className="h-4 w-4 text-slate-300" />
              </div>
              <ChartLegend />
              <RainfallChart />
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">Temperature Trend</h2>
                <Info className="h-4 w-4 text-slate-300" />
              </div>
              <ChartLegend />
              <TemperatureChart />
            </div>
          </section>

          {/* Recommendation banner */}
          <section className={SECTION_X}>
            <div className="grid grid-cols-1 overflow-hidden rounded-2xl bg-primary-50 shadow-sm lg:grid-cols-2">
              <div className="p-6 sm:p-8 lg:p-10">
                <p className="flex items-center gap-2 text-sm font-semibold text-primary-700">
                  <Sprout className="h-4 w-4" /> Recommended Planting Window
                </p>
                <h3 className="mt-2 text-4xl font-bold tracking-tight text-primary-900">15 – 25 JULY</h3>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-clay-100 px-3 py-1 text-xs font-semibold text-clay-600">
                    ↗ 11 days later
                  </span>
                  <span className="text-xs text-slate-500">Compared to historical period (2001–2012)</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Based on NASA climate data analysis, the suitable transplanting window for{" "}
                  {crop || "your crop"} in {location || "your area"} may need to shift approximately
                  11 days later due to changes in rainfall patterns and temperature.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 rounded-xl bg-primary-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-900">
                    <Calendar className="h-4 w-4" /> View Details
                  </button>
                  <button className="flex items-center gap-2 rounded-xl border border-primary-200 bg-white px-4 py-2.5 text-sm font-semibold text-primary-800 transition-colors hover:bg-primary-50">
                    <Info className="h-4 w-4" /> Why this recommendation?
                  </button>
                </div>
              </div>

              <div
                className="relative min-h-[280px] overflow-hidden bg-cover bg-center lg:min-h-full"
                style={{
                  backgroundImage:
                    "url('https://i.ibb.co.com/PG31PycM/Chat-GPT-Image-Sep-24-2026-05-42-01-PM.png')",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                <div className="absolute bottom-5 right-5 max-w-[190px] rounded-xl bg-[#0f3d2a]/90 p-4 text-white shadow-lg backdrop-blur-sm">
                  <Quote className="h-5 w-5 text-white/60" />
                  <p className="mt-2 text-sm italic leading-snug">
                    Adapting today for a more secure tomorrow.
                  </p>
                  <div className="mt-3 h-px w-8 bg-white/40" />
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        /* Empty state */
        <section className={SECTION_X}>
          <div className="rounded-2xl border border-slate-100 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
            <Satellite className="mx-auto h-14 w-14 text-primary-300" />
            <h2 className="mt-5 text-2xl font-semibold text-slate-900">Ready to analyze your farm?</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Select your location, crop, and farming priority to begin your NASA-powered analysis.
            </p>

            <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between">
              {onboardingSteps.map((s, i) => (
                <Fragment key={s.n}>
                  <div className="flex flex-col items-center text-center sm:w-36">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                      <s.icon className="h-6 w-6" />
                    </span>
                    <p className="mt-3 text-sm font-semibold text-slate-900">
                      {s.n}. {s.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{s.desc}</p>
                  </div>
                  {i < onboardingSteps.length - 1 ? (
                    <ArrowRight className="mt-6 hidden h-4 w-4 flex-shrink-0 text-slate-300 sm:block" />
                  ) : null}
                </Fragment>
              ))}
            </div>

            <p className={`${script.className} mt-10 -rotate-1 text-xl text-primary-700`}>
              Same Land. New Possibilities.
            </p>
          </div>
        </section>
      )}

      {/* AskAI bar */}
      <div className={`sticky bottom-0 z-10 bg-gradient-to-t from-[#f5f7f5] via-[#f5f7f5]/90 to-transparent pb-6 pt-6 ${SECTION_X}`}>
        <AskAiBar
          title="Need help? Ask FieldShift AI"
          subtitle="Get simple explanations, farming tips, or learn how it works in Bangla or English."
          placeholder="Ask how FieldShift works..."
        />
      </div>
    </div>
  );
}

export default function ClimateAnalysisPage() {
  return (
    <Suspense fallback={null}>
      <ClimateAnalysisContent />
    </Suspense>
  );
}