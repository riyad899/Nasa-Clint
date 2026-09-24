"use client";

import React, { useState } from "react";
import { Calendar, Info, RefreshCw, Sprout, Droplet, TrendingUp, ShieldCheck, AlertTriangle, ChevronRight, CheckCircle2 } from "lucide-react";
import { DashboardHeaderSlot } from "../../header-context";
import FilterBar from "@/Components/modules/Dashboord/FilterBar";
import AskAiBar from "@/Components/modules/Dashboord/AskAiBar";

const rotation = [
  { icon: "🌾", name: "Aman Rice", season: "Kharif Season", window: "Jul – Nov", points: ["Main crop", "Good climate suitability", "Moderate water need"] },
  { icon: "🔴", name: "Lentil", season: "Rabi Season", window: "Nov – Feb", points: ["Improves soil health", "Low water requirement", "Good market value"] },
  { icon: "🌾", name: "Boro Rice", season: "Pre-summer", window: "Feb – May", points: ["Utilizes residual moisture", "Higher yield potential", "Suitable with proper water management"] },
];

const alternatives = [
  { icon: "🌽", name: "Maize", window: "Mar – Jun", tag: "Low water need", points: ["Good for dry conditions", "Can be an alternative if water is limited"] },
  { icon: "🫘", name: "Mung Bean", window: "Mar – May", tag: "Very low water need", points: ["Improves soil nitrogen", "Good short-term option"] },
];

const benefits = [
  { label: "Better water\nmanagement", icon: Droplet, tone: "bg-sky-100 text-sky-600" },
  { label: "Healthier\nsoil", icon: Sprout, tone: "bg-primary-100 text-primary-700" },
  { label: "More stable\nyield", icon: TrendingUp, tone: "bg-emerald-100 text-emerald-600" },
  { label: "Higher climate\nresilience", icon: ShieldCheck, tone: "bg-violet-100 text-violet-600" },
];

export default function RecommendationsPage() {
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

      <section
  className="relative min-h-[300px] overflow-hidden rounded-2xl bg-cover bg-center"
  style={{
    backgroundImage: `url("https://i.ibb.co.com/23cWFG8j/Chat-GPT-Image-Sep-24-2026-05-53-43-PM.png")`,
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#fdf3e0] via-[#f3e0bd]/75 to-transparent" />

  <div className="relative z-10 flex min-h-[300px] flex-col justify-center px-6 py-8 sm:px-10">
    <h1 className="text-3xl font-semibold text-slate-900">
      Recommendations
    </h1>

    <p className="mt-2 max-w-md text-sm leading-6 text-slate-700">
      Actionable farming recommendations based on NASA Earth observations
      and AI analysis.
    </p>

    <p className="mt-5 font-serif text-sm italic text-[#36543d]">
      Better Choices
      <br />
      Greener Tomorrows.
    </p>
  </div>
</section>

      <section className="grid grid-cols-1 gap-6 rounded-2xl bg-primary-50 p-6 sm:p-8 lg:grid-cols-2">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-primary-700">
            <Sprout className="h-4 w-4" /> Recommended for You
          </p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">Optimal Planting Window</h3>
          <p className="text-sm font-medium text-slate-600">{crop} · {location}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Based on recent climate trends, the best time to transplant {crop} in your area is 15 – 25 July.
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
        <div
          className="relative min-h-[300px] flex flex-col justify-between overflow-hidden rounded-2xl bg-cover bg-center p-5 text-white"
  style={{
    backgroundImage:
      "url('https://i.ibb.co.com/PG31PycM/Chat-GPT-Image-Sep-24-2026-05-42-01-PM.png')",
            }}
               >
               {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-emerald-950/35 to-emerald-950/70" />

               {/* Content */}
                <div className="relative z-10">
                 <p className="text-3xl font-bold">15 – 25</p>
                 <p className="text-3xl font-bold">JULY</p>
                  <p className="mt-1 text-xs text-white/80">
                  Recommended planting window
                 </p>
               </div>
 
                 <p className="relative z-10 text-sm italic text-white/90">
                  &ldquo;Plant at the right time, for a more resilient harvest.&rdquo;
                 </p>
          </div>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900">
            <RefreshCw className="h-4 w-4 text-primary-600" /> Suggested Crop Rotation
          </h2>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-stretch">
            {rotation.map((r, i) => (
              <React.Fragment key={r.name}>
                <div className="flex-1 rounded-xl border border-slate-100 p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{r.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{i + 1}. {r.name}</p>
                      <p className="text-[11px] text-slate-400">{r.season}</p>
                    </div>
                  </div>
                  <span className="mt-2 inline-block rounded-full bg-primary-50 px-2.5 py-0.5 text-[11px] font-semibold text-primary-700">{r.window}</span>
                  <ul className="mt-3 space-y-1.5">
                    {r.points.map((p) => (
                      <li key={p} className="flex items-start gap-1.5 text-xs text-slate-500">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary-500" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                {i < rotation.length - 1 && <ChevronRight className="hidden h-5 w-5 flex-shrink-0 self-center text-slate-300 sm:block" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900">
            <Sprout className="h-4 w-4 text-primary-600" /> Alternative Options
          </h2>
          <div className="mt-4 space-y-3">
            {alternatives.map((a) => (
              <div key={a.name} className="flex items-start gap-3 rounded-xl border border-slate-100 p-3">
                <span className="text-xl">{a.icon}</span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900">{a.name}</p>
                    <span className="text-xs text-slate-400">{a.window}</span>
                    <span className="rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-semibold text-primary-700">{a.tag}</span>
                  </div>
                  <ul className="mt-1.5 space-y-1">
                    {a.points.map((p) => (
                      <li key={p} className="flex items-start gap-1.5 text-xs text-slate-500">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary-500" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <ChevronRight className="h-4 w-4 flex-shrink-0 text-slate-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-slate-100 bg-white p-5">
          <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900">
            <TrendingUp className="h-4 w-4 text-primary-600" /> Key Benefits
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.label} className="rounded-xl border border-slate-100 p-4 text-center">
                <span className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full ${b.tone}`}>
                  <b.icon className="h-4.5 w-4.5" />
                </span>
                <p className="mt-2 whitespace-pre-line text-xs font-medium text-slate-700">{b.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-amber-800">
            <AlertTriangle className="h-4 w-4" /> Important Notes
          </h2>
          <ul className="mt-3 space-y-2 text-xs leading-relaxed text-amber-800">
            <li>• Recommendations may vary based on local soil conditions.</li>
            <li>• Monitor local weather updates during the season.</li>
            <li>• Consider your available resources and market demand.</li>
          </ul>
        </div>
      </section>

      <AskAiBar title="Have questions? Ask FieldShift AI" subtitle="Get simple explanations, farming tips, and more insights in Bangla or English." placeholder="e.g. Can I plant earlier than 15 July?" />
    </div>
  );
}
