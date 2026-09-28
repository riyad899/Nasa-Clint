"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
  AlertCircle,
  CheckCircle2,
  Database,
  Download,
  Loader2,
} from "lucide-react";
import { TransparentNavSlot } from "../../header-context";
import FilterBar from "@/Components/modules/Dashboord/FilterBar";
import AskAiBar from "@/Components/modules/Dashboord/AskAiBar";
import { MiniBarChart, MiniLineChart, ChartLegend } from "@/Components/modules/Dashboord/MiniCharts";
import {
  getAnalysisObservations,
  getAnalysisTransparency,
  ObservationsResponse,
  TransparencyResponse,
} from "@/lib/apis/analyzeAi";

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
  const searchParams = useSearchParams();
  const [location, setLocation] = useState("Rajshahi");
  const [crop, setCrop] = useState("Aman Rice");
  const [priority, setPriority] = useState("Save Water");
  const [analysisId, setAnalysisId] = useState("");
  const [transparency, setTransparency] = useState<TransparencyResponse["data"]>(null);
  const [observations, setObservations] = useState<ObservationsResponse["data"]>(null);
  const [observationPage, setObservationPage] = useState(1);
  const [transparencyLoading, setTransparencyLoading] = useState(false);
  const [transparencyError, setTransparencyError] = useState<string | null>(null);

  useEffect(() => {
    const requestedId = searchParams.get("analysisId");
    const storedId = window.localStorage.getItem("fieldshift:last-analysis-id");
    const nextAnalysisId = requestedId || storedId || "";
    setAnalysisId(nextAnalysisId);

    if (!nextAnalysisId) return;

    let cancelled = false;
    setTransparencyLoading(true);
    setTransparencyError(null);

    Promise.all([
      getAnalysisTransparency(nextAnalysisId),
      getAnalysisObservations(nextAnalysisId),
    ])
      .then(([analysisResponse, observationsResponse]) => {
        if (cancelled) return;
        if (!analysisResponse.success || !analysisResponse.data) {
          setTransparencyError(analysisResponse.error || analysisResponse.message || "Analysis not found");
          setTransparency(null);
          setObservations(null);
          return;
        }
        setTransparency(analysisResponse.data);
        setObservations(observationsResponse.data);
        setLocation(analysisResponse.data.location.district);
        setCrop("Aman Rice");
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setTransparencyError(error instanceof Error ? error.message : "Unable to load analysis transparency");
        }
      })
      .finally(() => {
        if (!cancelled) setTransparencyLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  useEffect(() => {
    if (!analysisId || observationPage === 1) return;
    getAnalysisObservations(analysisId, observationPage)
      .then((response) => {
        if (response.success && response.data) setObservations(response.data);
      })
      .catch(() => {
        setTransparencyError("Unable to load this observation page");
      });
  }, [analysisId, observationPage]);

  const openObservationsCsv = () => {
    if (!analysisId) return;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5007";
    window.open(
      `${apiUrl.replace(/\/$/, "")}/api/v1/analyses/${encodeURIComponent(analysisId)}/observations.csv?source=POWER&variable=PRECTOTCORR`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="pb-8">
      <TransparentNavSlot />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#fbfcfa]" style={{ minHeight: 320 }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-[center_60%]"
            style={{
              backgroundImage:
                "url('https://i.ibb.co.com/tp4x9fn8/Chat-GPT-Image-Sep-24-2026-11-33-05-PM.png')",
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
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Why This Result?
            </h1>
            <p className="mt-1 text-lg font-semibold text-[#173d2a]">
              {location} · {crop}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Understand how NASA Earth data and AI analysis lead to this recommendation.
            </p>
          </div>

          <p
            className={`${script.className} absolute right-6 top-20 hidden -rotate-2 text-2xl leading-6 text-white drop-shadow sm:right-10 sm:block sm:top-24`}
          >
            Data Drives
            <br />
            Better Decisions.
          </p>
        </div>
      </section>

      {/* Floating FilterBar card */}
      <div className="relative -mt-12 z-10 mb-8 px-4 sm:px-6">
        <FilterBar
          variant="card"
          location={location}
          crop={crop}
          priority={priority}
          onLocationChange={setLocation}
          onCropChange={setCrop}
          onPriorityChange={setPriority}
          onSubmit={() => {}}
          hasResult
        />
      </div>

      {/* Content wrapper */}
      <div className="space-y-6 px-4 sm:px-6">

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

      {/* ================= TRANSPARENCY ================= */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">Analysis transparency</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">See exactly how this result was produced</h2>
            <p className="mt-1 text-sm text-slate-500">Method, source data, calculations, explanation, and audit history for this analysis.</p>
          </div>
          {transparency && (
            <button onClick={openObservationsCsv} className="flex items-center gap-2 rounded-lg border border-primary-200 bg-white px-3 py-2 text-xs font-semibold text-primary-800 shadow-sm hover:bg-primary-50">
              <Download className="h-4 w-4" /> Download observations CSV
            </button>
          )}
        </div>

        {transparencyLoading && (
          <div className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-white p-5 text-sm text-slate-600 shadow-sm">
            <Loader2 className="h-4 w-4 animate-spin text-primary-700" /> Loading analysis transparency...
          </div>
        )}

        {!transparencyLoading && !analysisId && (
          <div className="rounded-2xl border border-sky-100 bg-sky-50 p-5 text-sm leading-relaxed text-sky-900">
            Run an analysis from the Climate Analysis page first. Its analysis ID will appear here automatically. You can also open this page with <code className="rounded bg-white px-1.5 py-0.5 text-xs">?analysisId=...</code>.
          </div>
        )}

        {!transparencyLoading && transparencyError && (
          <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-800">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-600" />
            <div><p className="font-semibold">Unable to load transparency</p><p className="mt-1">{transparencyError}</p><p className="mt-2 text-xs">Analysis ID: {analysisId}</p></div>
          </div>
        )}

        {transparency && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"><p className="text-xs text-slate-500">Analysis ID</p><p className="mt-2 break-all font-mono text-sm font-semibold text-slate-800">{transparency.id}</p><p className="mt-2 text-xs text-slate-500">Algorithm: {transparency.algorithmVersion}</p></div>
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"><p className="text-xs text-slate-500">Status</p><p className="mt-2 flex items-center gap-2 text-lg font-semibold capitalize text-emerald-700"><CheckCircle2 className="h-5 w-5" /> {transparency.status}</p><p className="mt-2 text-xs text-slate-500">Completed {new Date(transparency.completedAt).toLocaleString()}</p></div>
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"><p className="text-xs text-slate-500">Location</p><p className="mt-2 text-lg font-semibold text-slate-800">{transparency.location.district}</p><p className="mt-2 text-xs text-slate-500">{transparency.location.latitude}, {transparency.location.longitude}</p></div>
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"><p className="text-xs text-slate-500">Crop and method</p><p className="mt-2 text-lg font-semibold text-slate-800">Aman rice</p><p className="mt-2 text-xs text-slate-500">{transparency.crop.farmingMethod}</p></div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-primary-100 bg-primary-50 p-6">
                <h3 className="flex items-center gap-2 text-base font-semibold text-primary-900"><Lightbulb className="h-5 w-5" /> AI explanation</h3>
                <p className="mt-4 text-sm leading-7 text-slate-700">{transparency.aiExplanation.explanation}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs"><span className="rounded-full bg-white px-3 py-1 text-slate-700">Source: {transparency.aiExplanation.source}</span><span className="rounded-full bg-white px-3 py-1 text-slate-700">Fallback: {transparency.aiExplanation.fallback ? "Yes" : "No"}</span></div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="flex items-center gap-2 text-base font-semibold text-slate-900"><Cog className="h-5 w-5 text-primary-700" /> Methodology</h3>
                <p className="mt-4 text-sm leading-6 text-slate-700">{transparency.methodology.rule}</p>
                <dl className="mt-4 grid grid-cols-1 gap-3 text-xs sm:grid-cols-2"><div><dt className="text-slate-500">Shift formula</dt><dd className="mt-1 font-mono text-slate-800">{transparency.methodology.formulas.shift}</dd></div><div><dt className="text-slate-500">Percentiles</dt><dd className="mt-1 font-mono text-slate-800">{transparency.methodology.formulas.percentiles}</dd></div><div><dt className="text-slate-500">Baseline period</dt><dd className="mt-1 font-medium text-slate-800">{transparency.baselinePeriod.startYear}-{transparency.baselinePeriod.endYear}</dd></div><div><dt className="text-slate-500">Recent period</dt><dd className="mt-1 font-medium text-slate-800">{transparency.recentPeriod.startYear}-{transparency.recentPeriod.endYear}</dd></div></dl>
                <p className="mt-4 text-xs text-slate-500">Uncertainty: {transparency.methodology.uncertaintyMethod}</p>
              </div>
            </div>

            {transparency.sources.map((source) => (
              <div key={source.id} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="flex items-center gap-2 text-base font-semibold text-slate-900"><Database className="h-5 w-5 text-primary-700" /> {source.provider} {source.source}</h3><p className="mt-1 text-xs text-slate-500">{source.dataset} · {source.sourceVersion} · {source.fetchStatus}</p></div><a href={source.sourceLink} target="_blank" rel="noreferrer" className="text-xs font-semibold text-primary-700 hover:underline">Open source</a></div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4"><div><p className="text-slate-500">Variable</p><p className="mt-1 font-medium text-slate-800">{source.variables.join(", ")}</p></div><div><p className="text-slate-500">Units</p><p className="mt-1 font-medium text-slate-800">{Object.values(source.units).join(", ")}</p></div><div><p className="text-slate-500">Records</p><p className="mt-1 font-medium text-slate-800">{source.recordCount}</p></div><div><p className="text-slate-500">Requested range</p><p className="mt-1 font-medium text-slate-800">{source.requestedStart} to {source.requestedEnd}</p></div></div>
                <details className="mt-4 rounded-xl bg-slate-50 p-3 text-xs"><summary className="cursor-pointer font-semibold text-slate-700">View request parameters and endpoint</summary><p className="mt-2 break-all font-mono text-slate-600">{source.endpoint}</p><pre className="mt-2 overflow-x-auto text-slate-600">{JSON.stringify(source.requestParameters, null, 2)}</pre></details>
              </div>
            ))}

            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="text-base font-semibold text-slate-900">Yearly calculations</h3><span className="text-xs text-slate-500">{transparency.yearlyCalculations.length} records returned</span></div>
              <div className="mt-4 overflow-x-auto"><table className="w-full text-left text-xs"><thead className="bg-slate-50 text-slate-500"><tr><th className="px-3 py-2 font-medium">Period</th><th className="px-3 py-2 font-medium">Year</th><th className="px-3 py-2 font-medium">Onset</th><th className="px-3 py-2 font-medium">Day</th><th className="px-3 py-2 font-medium">Rainfall</th><th className="px-3 py-2 font-medium">Quality</th></tr></thead><tbody>{transparency.yearlyCalculations.map((row) => <tr key={row.id} className="border-t border-slate-100"><td className="px-3 py-2 capitalize text-slate-600">{row.periodType}</td><td className="px-3 py-2 font-semibold text-slate-800">{row.year}</td><td className="px-3 py-2 text-slate-600">{row.onsetDate}</td><td className="px-3 py-2 text-slate-600">{row.dayOfYear}</td><td className="px-3 py-2 text-slate-600">{row.rainfallTotal} mm</td><td className="px-3 py-2"><span className={row.valid ? "text-emerald-700" : "text-rose-700"}>{row.valid ? "Valid" : "Invalid"} · {row.confidence}</span></td></tr>)}</tbody></table></div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"><div className="flex flex-wrap items-center justify-between gap-3"><h3 className="text-base font-semibold text-slate-900">Raw observations</h3><span className="text-xs text-slate-500">{observations?.pagination.total ?? 0} total · page {observations?.pagination.page ?? 1} of {observations?.pagination.totalPages ?? 1}</span></div><div className="mt-4 overflow-x-auto"><table className="w-full text-left text-xs"><thead className="bg-slate-50 text-slate-500"><tr><th className="px-3 py-2 font-medium">Observed</th><th className="px-3 py-2 font-medium">Variable</th><th className="px-3 py-2 font-medium">Value</th><th className="px-3 py-2 font-medium">Quality</th></tr></thead><tbody>{observations?.items.map((item) => <tr key={item.id} className="border-t border-slate-100"><td className="px-3 py-2 text-slate-600">{new Date(item.observedAt).toLocaleDateString()}</td><td className="px-3 py-2 font-mono text-slate-700">{item.variable}</td><td className="px-3 py-2 text-slate-700">{item.value} {item.unit}</td><td className="px-3 py-2 text-emerald-700">{item.isValid ? "Valid" : item.qualityNote || "Invalid"}</td></tr>)}</tbody></table></div><div className="mt-4 flex items-center justify-end gap-2"><button disabled={(observations?.pagination.page ?? 1) <= 1} onClick={() => setObservationPage((page) => Math.max(1, page - 1))} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-40">Previous</button><button disabled={(observations?.pagination.page ?? 1) >= (observations?.pagination.totalPages ?? 1)} onClick={() => setObservationPage((page) => page + 1)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-40">Next</button></div></div>

            {transparency.warnings.length > 0 && <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900"><p className="font-semibold">Warnings</p><ul className="mt-2 list-disc space-y-1 pl-5">{transparency.warnings.map((warning) => <li key={warning}>{warning}</li>)}</ul></div>}
          </div>
        )}
      </section>

      <AskAiBar
        title="Still have questions? Ask CropWise AI"
        subtitle="Get simple explanations in Bangla or English. Learn more about the data or ask anything about your farm."
        placeholder="e.g. Why is rainfall delayed this year in Rajshahi?"
      />
      </div>
    </div>
  );
}