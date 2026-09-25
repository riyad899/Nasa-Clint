"use client";

import React, { useState } from "react";
import { Caveat } from "next/font/google";
import {
  Lightbulb,
  CloudRain,
  Thermometer,
  Droplet,
  Leaf,
  Info,
  Satellite,
  BarChart3,
  Cog,
  Sprout,
  Target,
  Calendar,
  Quote,
  ArrowRight,
} from "lucide-react";
import { DashboardHeaderSlot } from "../../header-context";
import FilterBar from "@/Components/modules/Dashboord/FilterBar";
import AskAiBar from "@/Components/modules/Dashboord/AskAiBar";
import { MiniBarChart, MiniLineChart, ChartLegend } from "@/Components/modules/Dashboord/MiniCharts";

// Handwritten font — same one used across the app for consistency
const script = Caveat({ subsets: ["latin"], weight: ["500", "600"] });

const rainfall = { hist: [40, 85, 215, 210, 140, 65], recent: [55, 110, 185, 180, 110, 55] };
const temperature = { hist: [27, 29, 31, 32, 31, 28], recent: [31, 33, 35, 36, 35, 32] };
const soilMoisture = { hist: [0.18, 0.22, 0.28, 0.3, 0.26, 0.2], recent: [0.22, 0.26, 0.32, 0.34, 0.3, 0.24] };
const ndvi = { hist: [0.45, 0.55, 0.65, 0.7, 0.62, 0.5], recent: [0.5, 0.6, 0.72, 0.78, 0.68, 0.55] };

const metrics = [
  {
    label: "Rainfall", value: "+11 days", icon: CloudRain, tone: "bg-sky-100 text-sky-600",
    desc: "Rainfall onset is now 11 days later compared to 2001–2012.",
    note: "Later rainfall means the best planting time shifts to mid-late July.", noteBg: "bg-sky-50 text-sky-800",
    light: "#bfdbfe", dark: "#1d4ed8", type: "bar" as const, data: rainfall, min: 0, max: 250,
  },
  {
    label: "Temperature", value: "+0.8°C", icon: Thermometer, tone: "bg-rose-100 text-rose-600",
    desc: "Growing season temperatures are higher than in the past.",
    note: "Higher temperatures can affect germination and crop development, so slightly later planting helps.", noteBg: "bg-rose-50 text-rose-800",
    light: "#fecaca", dark: "#dc2626", type: "line" as const, data: temperature, min: 20, max: 40,
  },
  {
    label: "Soil Moisture", value: "Moderate", icon: Droplet, tone: "bg-indigo-100 text-indigo-600",
    desc: "Current soil moisture levels are sufficient for transplanting soon.",
    note: "Soil moisture is improving, supporting the recommended planting window.", noteBg: "bg-slate-50 text-slate-600",
    light: "#c7d2fe", dark: "#4f46e5", type: "line" as const, data: soilMoisture, min: 0, max: 0.4,
  },
  {
    label: "Vegetation Index (NDVI)", value: "Stable", icon: Leaf, tone: "bg-emerald-100 text-emerald-600",
    desc: "Vegetation conditions in your area are generally healthy.",
    note: "Healthy vegetation indicates favorable growing conditions for Aman rice.", noteBg: "bg-primary-50 text-primary-800",
    light: "#b8dfc4", dark: "#1c5439", type: "line" as const, data: ndvi, min: 0, max: 0.8,
  },
];

const steps = [
  { title: "1. NASA Data", desc: "We collect satellite data on rainfall, temperature, soil moisture and NDVI.", icon: Satellite },
  { title: "2. Trend Analysis", desc: "We compare recent data (2013–2025) with historical data (2001–2012).", icon: BarChart3 },
  { title: "3. AI Analysis", desc: "Our model analyzes climate patterns and crop requirements.", icon: Cog },
  { title: "4. Recommendation", desc: "We generate practical, location-specific advice for your farm.", icon: Sprout },
];

export default function WhyThisResultPage() {
  const [location, setLocation] = useState("Rajshahi");
  const [crop, setCrop] = useState("Aman Rice");
  const [priority, setPriority] = useState("Save Water");

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
          onSubmit={() => {}}
          hasResult
        />
      </DashboardHeaderSlot>

      {/* ================= HERO =================
          Light background with a photo bleeding off the right edge, fading
          into the page background — same treatment as the other dashboard
          pages, not a full dark-overlay banner. */}
      <section className="relative min-h-[170px] overflow-hidden rounded-2xl bg-[#fbfcfa] px-6 py-8 sm:px-10">
        <div className="absolute inset-y-0 right-0 w-[58%] sm:w-1/2">
          <div
            className="absolute inset-0 bg-cover bg-[center_60%]"
            style={{
              backgroundImage:
                "url('https://i.ibb.co.com/tp4x9fn8/Chat-GPT-Image-Sep-24-2026-11-33-05-PM.png')",
            }}
          />
          <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-[#fbfcfa] to-transparent" />
        </div>

        <div className="relative max-w-md">
          <h1 className="text-3xl font-semibold text-slate-900">Why This Result?</h1>

          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Understand how NASA Earth data and AI analysis lead to this recommendation.
          </p>
        </div>

        <p
          className={`${script.className} absolute right-6 top-7 hidden -rotate-2 text-2xl leading-6 text-white sm:right-10 sm:block`}
        >
          Data Drives
          <br />
          Better Decisions.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="flex items-start gap-3 rounded-2xl border border-primary-100 bg-primary-50 p-5">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-700 text-white">
            <Lightbulb className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-base font-semibold text-slate-900">Our recommendation is based on real changes in your local climate.</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              We analyze NASA satellite data (rainfall, temperature, soil moisture, and vegetation) and compare recent trends with historical patterns to find the best time and strategy for your crop.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center rounded-2xl border border-primary-100 bg-primary-50 p-5">
          <Quote className="h-5 w-5 -rotate-1 text-primary-400" />
          <p className={`${script.className} -mt-1 -rotate-1 text-xl leading-snug text-primary-800`}>
            Smarter insights today, stronger harvests tomorrow.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="flex flex-col rounded-2xl border border-slate-100 bg-white p-4">
            <div className="flex items-center gap-2">
              <span className={`flex h-8 w-8 items-center justify-center rounded-full ${m.tone}`}>
                <m.icon className="h-4 w-4" />
              </span>
              <span className="text-xs font-medium text-slate-500">{m.label}</span>
              <Info className="ml-auto h-3.5 w-3.5 text-slate-300" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{m.value}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">{m.desc}</p>

            <div className="mt-3">
              <ChartLegend lightColor={m.light} darkColor={m.dark} />
              {m.type === "bar" ? (
                <MiniBarChart hist={m.data.hist} recent={m.data.recent} max={m.max} lightColor={m.light} darkColor={m.dark} />
              ) : (
                <MiniLineChart hist={m.data.hist} recent={m.data.recent} min={m.min} max={m.max} lightColor={m.light} darkColor={m.dark} />
              )}
            </div>

            <p className={`mt-auto rounded-xl p-3 text-xs leading-relaxed ${m.noteBg}`}>{m.note}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <h2 className="text-base font-semibold text-slate-900">How We Arrive at the Recommendation</h2>
          <div className="mt-5 flex items-start justify-between gap-2 overflow-x-auto">
            {steps.map((s, i) => (
              <React.Fragment key={s.title}>
                <div className="w-28 flex-shrink-0 text-center sm:w-auto sm:flex-1">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <p className="mt-2 text-xs font-semibold text-slate-800">{s.title}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-400">{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight className="mt-7 h-4 w-4 flex-shrink-0 text-slate-300" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-primary-100 bg-primary-50 p-5">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-700 text-white">
              <Target className="h-4.5 w-4.5" />
            </span>
            <h2 className="text-sm font-semibold text-primary-800">Key Takeaway</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            The combination of later rainfall, higher temperatures, and adequate soil moisture suggests that the optimal planting window for {crop} in {location} is:
          </p>
          <span className="mt-3 flex items-center gap-2 rounded-lg bg-primary-800 px-4 py-2.5 text-sm font-bold text-white w-fit">
            <Calendar className="h-4 w-4" /> 15 – 25 JULY
          </span>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">
            This timing helps reduce climate risks and improves the chance of a healthy harvest.
          </p>
        </div>
      </section>

      <AskAiBar
        title="Still have questions? Ask FieldShift AI"
        subtitle="Get simple explanations in Bangla or English. Learn more about the data or ask anything about your farm."
        placeholder="e.g. Why is rainfall delayed this year in Rajshahi?"
      />
    </div>
  );
}