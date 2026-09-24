"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CloudRain, Thermometer, Droplet, Leaf, Info, Satellite, MapPin, BarChart3, Calendar, Sprout } from "lucide-react";
import { DashboardHeaderSlot } from "../../header-context";
import FilterBar from "@/Components/modules/Dashboord/FilterBar";
import AskAiBar from "@/Components/modules/Dashboord/AskAiBar";

const metrics = [
  { label: "Rainfall Onset", value: "+11 days", note: "Compared to 2001–2012", desc: "Rainy season now starts later in recent years.", icon: CloudRain, tone: "bg-sky-100 text-sky-600" },
  { label: "Temperature", value: "+0.8°C", note: "During growing season", desc: "Higher temperatures may affect crop development.", icon: Thermometer, tone: "bg-rose-100 text-rose-600" },
  { label: "Soil Moisture", value: "Moderate", note: "Current condition", desc: "Soil moisture is sufficient for transplanting soon.", icon: Droplet, tone: "bg-indigo-100 text-indigo-600" },
  { label: "Vegetation Index (NDVI)", value: "Stable", note: "Recent trend", desc: "Vegetation condition looks healthy for the season.", icon: Leaf, tone: "bg-emerald-100 text-emerald-600" },
];

const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const rainfall = { hist: [40, 85, 215, 210, 140, 65], recent: [55, 110, 185, 180, 110, 55] };
const temperature = { hist: [27, 29, 31, 32, 31, 28], recent: [31, 33, 35, 36, 35, 32] };

function BarChart() {
  const max = 250;
  return (
    <svg viewBox="0 0 300 140" className="w-full">
      {months.map((m, i) => {
        const x = i * 50 + 10;
        const hHist = (rainfall.hist[i] / max) * 110;
        const hRecent = (rainfall.recent[i] / max) * 110;
        return (
          <g key={m}>
            <rect x={x} y={120 - hHist} width="14" height={hHist} rx="2" fill="#b8dfc4" />
            <rect x={x + 16} y={120 - hRecent} width="14" height={hRecent} rx="2" fill="#1c5439" />
            <text x={x + 15} y="134" fontSize="9" textAnchor="middle" fill="#94a3b8">{m}</text>
          </g>
        );
      })}
    </svg>
  );
}

function LineChart() {
  const min = 20, max = 40;
  const toPoints = (arr: number[]) =>
    arr.map((v, i) => `${i * 60 + 10},${120 - ((v - min) / (max - min)) * 110}`).join(" ");
  return (
    <svg viewBox="0 0 300 140" className="w-full">
      <polyline points={toPoints(temperature.hist)} fill="none" stroke="#b8dfc4" strokeWidth="2.5" />
      <polyline points={toPoints(temperature.recent)} fill="none" stroke="#1c5439" strokeWidth="2.5" />
      {months.map((m, i) => (
        <text key={m} x={i * 60 + 10} y="134" fontSize="9" textAnchor="middle" fill="#94a3b8">{m}</text>
      ))}
    </svg>
  );
}

function ClimateAnalysisContent() {
  const params = useSearchParams();
  const [location, setLocation] = useState(params.get("location") || "");
  const [crop, setCrop] = useState(params.get("crop") || "");
  const [priority, setPriority] = useState(params.get("priority") || "");
  const [hasResult, setHasResult] = useState(false);

  useEffect(() => {
    if (params.get("location") && params.get("crop") && params.get("priority")) {
      setHasResult(true);
    }
  }, [params]);

  return (
    <div className="space-y-6">
      <DashboardHeaderSlot>
        <FilterBar
          variant="bar"
          location={location}
          crop={crop}
          priority={priority}
          onLocationChange={setLocation}
          onCropChange={setCrop}
          onPriorityChange={setPriority}
          onSubmit={() => setHasResult(true)}
          hasResult={hasResult}
        />
      </DashboardHeaderSlot>

      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#fdf3e0] via-[#f3e0bd] to-[#2f4f38] px-6 py-8 sm:px-10">
        <h1 className="text-3xl font-semibold text-slate-900">Climate Analysis</h1>
        {hasResult ? (
          <p className="mt-1 text-lg font-medium text-slate-800">{location} · {crop}</p>
        ) : null}
        <p className="mt-2 max-w-md text-sm text-slate-700">
          Insights from NASA Earth observations to help you make better farming decisions.
        </p>
        <p className="mt-4 hidden -rotate-2 font-serif text-sm italic text-[#f4ead2] sm:block">
          Healthy Fields
          <br />
          Brighter Tomorrows
        </p>
      </section>

      {hasResult ? (
        <>
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-2xl border border-slate-100 bg-white p-4">
                <div className="flex items-center gap-2">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full ${m.tone}`}>
                    <m.icon className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-medium text-slate-500">{m.label}</span>
                </div>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{m.value}</p>
                <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
                  {m.note} <Info className="h-3 w-3" />
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{m.desc}</p>
              </div>
            ))}
          </section>

          <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">Rainfall Pattern Comparison</h2>
                <Info className="h-4 w-4 text-slate-300" />
              </div>
              <div className="mt-2 flex gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary-200" /> 2001–2012 (Historical)</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary-800" /> 2013–2025 (Recent)</span>
              </div>
              <BarChart />
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">Temperature Trend</h2>
                <Info className="h-4 w-4 text-slate-300" />
              </div>
              <div className="mt-2 flex gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary-200" /> 2001–2012 (Historical)</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary-800" /> 2013–2025 (Recent)</span>
              </div>
              <LineChart />
            </div>
          </section>

          <section className="grid grid-cols-1 gap-6 rounded-2xl bg-primary-50 p-6 sm:p-8 lg:grid-cols-2">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-primary-700">
                <Sprout className="h-4 w-4" /> Recommended Planting Window
              </p>
              <h3 className="mt-2 text-4xl font-bold text-primary-900">15 – 25 JULY</h3>
              <span className="mt-3 inline-block rounded-full bg-clay-100 px-3 py-1 text-xs font-semibold text-clay-600">
                ↗ 11 days later
              </span>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Based on NASA climate data analysis, the suitable transplanting window for {crop || "your crop"} in {location || "your area"} may need to shift approximately 11 days later due to changes in rainfall patterns and temperature.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button className="flex items-center gap-2 rounded-lg bg-primary-800 px-4 py-2.5 text-sm font-semibold text-white">
                  <Calendar className="h-4 w-4" /> View Details
                </button>
                <button className="flex items-center gap-2 rounded-lg border border-primary-200 bg-white px-4 py-2.5 text-sm font-semibold text-primary-800">
                  <Info className="h-4 w-4" /> Why this recommendation?
                </button>
              </div>
            </div>
            <div className="relative flex items-end overflow-hidden rounded-2xl bg-gradient-to-b from-emerald-200 to-emerald-800 p-5">
              <p className="text-sm italic text-white/90">
                &ldquo;Adapting today for a more secure tomorrow.&rdquo;
              </p>
            </div>
          </section>
        </>
      ) : (
        <section className="rounded-2xl border border-slate-100 bg-white px-6 py-12 text-center">
          <Satellite className="mx-auto h-14 w-14 text-primary-300" />
          <h2 className="mt-5 text-2xl font-semibold text-slate-900">Ready to analyze your farm?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            Select your location, crop, and farming priority to begin your NASA-powered analysis.
          </p>
          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { n: 1, title: "Choose your farm", desc: "Select your location, crop and priority.", icon: MapPin },
              { n: 2, title: "Analyze NASA data", desc: "We process real satellite data and climate trends.", icon: Satellite },
              { n: 3, title: "Get actionable insights", desc: "Receive personalized recommendations for a more resilient tomorrow.", icon: BarChart3 },
            ].map((s) => (
              <div key={s.n}>
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                  <s.icon className="h-6 w-6" />
                </span>
                <p className="mt-3 text-sm font-semibold text-slate-900">{s.n}. {s.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 -rotate-1 font-serif text-base italic text-primary-700">Same Land. New Possibilities.</p>
        </section>
      )}

      <AskAiBar title="Need help? Ask FieldShift AI" subtitle="Get simple explanations, farming tips, or learn how it works in Bangla or English." placeholder="Ask how FieldShift works..." />
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
