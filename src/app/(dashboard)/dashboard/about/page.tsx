"use client";

import React from "react";
import { Leaf, Satellite, LineChart, Brain, BarChart3, Cloud, Droplet, ArrowUpRight, Sprout, CloudSun, TrendingUp, Users } from "lucide-react";
import AskAiBar from "@/Components/modules/Dashboord/AskAiBar";

const steps = [
  { title: "1. NASA Data", desc: "We collect satellite data on rainfall, temperature, soil moisture, and vegetation.", icon: Satellite },
  { title: "2. Analysis", desc: "We analyze climate trends for your location and crop using advanced methods.", icon: LineChart },
  { title: "3. AI Interpretation", desc: "Our AI explains the results in simple language.", icon: Brain },
  { title: "4. Actionable Insights", desc: "You get practical recommendations for better farming decisions.", icon: BarChart3 },
];

const sources = [
  { name: "NASA POWER", desc: "Weather and climate data (temperature, rainfall, etc.)", icon: Cloud, tone: "bg-amber-100 text-amber-600" },
  { name: "GPM IMERG", desc: "Global precipitation data", icon: Droplet, tone: "bg-sky-100 text-sky-600" },
  { name: "SMAP", desc: "Soil moisture data", icon: Droplet, tone: "bg-indigo-100 text-indigo-600" },
  { name: "MODIS / VIIRS", desc: "Vegetation index (NDVI)", icon: Leaf, tone: "bg-primary-100 text-primary-700" },
];

const impact = [
  { title: "Empowering Farmers", desc: "Data-driven decisions for stronger communities.", icon: Sprout, tone: "bg-primary-100 text-primary-700" },
  { title: "Climate Resilience", desc: "Helping farms adapt to changing climate conditions.", icon: CloudSun, tone: "bg-sky-100 text-sky-600" },
  { title: "Sustainable Future", desc: "Healthier land, better yields, stronger food security.", icon: TrendingUp, tone: "bg-violet-100 text-violet-600" },
];

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#fdf3e0] via-[#f3e0bd] to-[#2f4f38] px-6 py-8 sm:px-10">
        <h1 className="text-3xl font-semibold text-slate-900">About FieldShift</h1>
        <p className="mt-1 text-lg font-medium text-slate-800">Adapting Farms with NASA Data</p>
        <p className="mt-2 max-w-md text-sm text-slate-700">
          FieldShift uses NASA Earth observations and AI analysis to help farmers make informed, climate-resilient decisions.
        </p>
        <p className="mt-4 hidden -rotate-2 font-serif text-sm italic text-[#f4ead2] sm:block">
          Healthy Fields
          <br />
          Brighter Tomorrows.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-primary-100 bg-primary-50 p-5">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-700 text-white">
              <Leaf className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-primary-800">Our Mission</h2>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                To empower farmers with simple, science-based insights from NASA data, helping them adapt to climate change and build a more resilient future.
              </p>
            </div>
          </div>
        </div>
        <div className="relative flex items-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-200 to-emerald-900 p-5">
          <p className="text-sm italic leading-relaxed text-white/90">
            &ldquo; data. Stronger farmers. A more resilient tomorrow.&rdquo;
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-5">
        <h2 className="text-base font-semibold text-slate-900">How FieldShift Works</h2>
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
              {i < steps.length - 1 && <div className="mt-7 h-px w-6 flex-shrink-0 bg-slate-200" />}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-white text-[10px] font-bold">NASA</span>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">NASA Data Sources</h2>
              <p className="text-xs text-slate-400">We use trusted NASA Earth observation datasets to provide accurate and reliable insights.</p>
            </div>
          </div>
          <a href="https://www.nasa.gov" target="_blank" rel="noreferrer" className="hidden flex-shrink-0 items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 sm:flex">
            Learn more about NASA <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {sources.map((s) => (
            <div key={s.name} className="rounded-xl border border-slate-100 p-3">
              <span className={`flex h-8 w-8 items-center justify-center rounded-full ${s.tone}`}>
                <s.icon className="h-4 w-4" />
              </span>
              <p className="mt-2 text-xs font-semibold text-slate-800">{s.name}</p>
              <p className="mt-0.5 text-[10px] leading-snug text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900">Our Impact</h2>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {impact.map((i) => (
            <div key={i.title} className="rounded-2xl border border-slate-100 bg-white p-4">
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${i.tone}`}>
                <i.icon className="h-4.5 w-4.5" />
              </span>
              <p className="mt-3 text-sm font-semibold text-slate-900">{i.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">{i.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <Users className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Our Team</h2>
            <p className="text-xs leading-relaxed text-slate-400">
              We are a team of students, innovators, and changemakers, using space technology for real-world impact in agriculture.
            </p>
          </div>
        </div>
        <button className="flex flex-shrink-0 items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
          Meet the Team <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </section>

      <AskAiBar title="Ask FieldShift AI" subtitle="Ask anything about our project, data sources, or how it works." placeholder="e.g. How does FieldShift use NASA data?" />
    </div>
  );
}