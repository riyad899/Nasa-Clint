"use client";

import React, { useState, useEffect, Suspense, Fragment } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
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
  Loader2,
  AlertCircle,
  CheckCircle2,
  Cpu,
  Database,
  RefreshCw,
} from "lucide-react";
import { TransparentNavSlot } from "../../header-context";
import FilterBar from "@/Components/modules/Dashboord/FilterBar";
import AskAiBar from "@/Components/modules/Dashboord/AskAiBar";
import {
  analyzeClimateData,
  AnalyzeRequest,
  OnsetAnalysisData,
} from "@/lib/apis/analyzeAi";
import { useLanguage } from "@/lib/language-context";
import { MONTH_NAMES } from "@/lib/translations/dictionaries";

// Mapbox is browser-only — disable SSR
const LocationMapSection = dynamic(
  () => import("@/Components/modules/Dashboord/LocationMapSection"),
  { ssr: false, loading: () => <div className="h-[360px] rounded-2xl bg-slate-100 animate-pulse" /> }
);

// Handwritten font — same one used across the app for consistency
const script = Caveat({ subsets: ["latin"], weight: ["500", "600"] });

// Shared spacing token so every section lines up with the same left/right
// margins as the rest of the dashboard (Quick Actions, Recent Analyses, etc).
const SECTION_X = "px-6 sm:px-10";

const LOCATION_COORDINATES: Record<string, { latitude: number; longitude: number }> = {
  Mymensingh: { latitude: 24.75, longitude: 90.40 },
  Rajshahi: { latitude: 24.37, longitude: 88.60 },
  Rangpur: { latitude: 25.75, longitude: 89.25 },
  Dhaka: { latitude: 23.81, longitude: 90.41 },
  Chittagong: { latitude: 22.36, longitude: 91.78 },
  Sylhet: { latitude: 24.89, longitude: 91.87 },
  Khulna: { latitude: 22.85, longitude: 89.54 },
  Barisal: { latitude: 22.70, longitude: 90.35 },
  Dinajpur: { latitude: 25.62, longitude: 88.64 },
  Bogura: { latitude: 24.85, longitude: 89.38 },
  Comilla: { latitude: 23.46, longitude: 91.18 },
  Jessore: { latitude: 23.17, longitude: 89.21 },
  Pabna: { latitude: 24.01, longitude: 89.25 },
  Tangail: { latitude: 24.25, longitude: 89.92 },
  Kushtia: { latitude: 23.90, longitude: 89.12 },
  Sirajganj: { latitude: 24.45, longitude: 89.70 },
  Faridpur: { latitude: 23.61, longitude: 89.84 },
  Natore: { latitude: 24.41, longitude: 88.98 },
};

function formatPlantingDate(dateStr: string, isBn = false): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = d.getDate();
    const monthEn = d.toLocaleString("en-US", { month: "short" });
    const monthFormatted = isBn ? (MONTH_NAMES[monthEn]?.bn || monthEn) : monthEn.toUpperCase();
    return `${day} ${monthFormatted}`;
  } catch {
    return dateStr;
  }
}

function buildAnalyzeRequest(loc: string, crp: string): AnalyzeRequest {
  const coords = LOCATION_COORDINATES[loc] || { latitude: 24.35, longitude: 90.42 };

  return {
    location: {
      ...coords,
      district: loc,
    },
    crop: {
      cropType: "aman_rice",
      farmingMethod: "rainfed",
    },
    analysis: {
      type: "usable_rain_onset_shift",
      baselineStartYear: 2001,
      baselineEndYear: 2010,
      recentStartYear: 2016,
      recentEndYear: 2025,
    },
    language: "bn",
  };
}

const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const rainfall = { hist: [40, 85, 215, 210, 140, 65], recent: [55, 110, 185, 180, 110, 55] };
const temperature = { hist: [27, 29, 31, 32, 31, 28], recent: [31, 33, 35, 36, 35, 32] };

// ================= CHARTS =================

function RainfallChart() {
  const { lang, monthName } = useLanguage();
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
        {lang === "BN" ? "বৃষ্টিপাত (মিমি)" : "Rainfall (mm)"}
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
              {monthName(m)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function TemperatureChart() {
  const { lang, monthName } = useLanguage();
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
        {lang === "BN" ? "তাপমাত্রা (°সে)" : "Temperature (°C)"}
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
          {monthName(m)}
        </text>
      ))}
    </svg>
  );
}

function ChartLegend() {
  const { t } = useLanguage();
  return (
    <div className="mt-2 flex gap-4 text-xs text-slate-500">
      <span className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-primary-200" /> {t("chart_hist_legend")}
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-primary-800" /> {t("chart_recent_legend")}
      </span>
    </div>
  );
}

function ClimateAnalysisContent() {
  const params = useSearchParams();
  const router = useRouter();
  const {
    t,
    lang,
    locName,
    cropName,
    termName,
    translateDynamicSync,
  } = useLanguage();

  const [location, setLocation] = useState(params.get("location") || "");
  const [crop, setCrop] = useState(params.get("crop") || "");
  const [priority, setPriority] = useState(params.get("priority") || "");
  const [hasResult, setHasResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<OnsetAnalysisData | null>(null);

  const executeAnalysis = async (targetLoc: string, targetCrop: string, targetPri: string) => {
    if (!targetLoc || !targetCrop || !targetPri) return;

    setIsLoading(true);
    setError(null);

    try {
      const payload = buildAnalyzeRequest(targetLoc, targetCrop);
      const res = await analyzeClimateData(payload);

      if (res && res.success && res.data) {
        setAnalysisData(res.data);
        setHasResult(true);
        window.localStorage.setItem("fieldshift:last-analysis-id", res.data.analysisId);
      } else {
        setError(res?.message || "Failed to analyze climate data. Please try again.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to connect to the analysis server.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const locParam = params.get("location");
    const cropParam = params.get("crop");
    const priParam = params.get("priority");

    if (locParam && cropParam && priParam) {
      setLocation(locParam);
      setCrop(cropParam);
      setPriority(priParam);
      executeAnalysis(locParam, cropParam, priParam);
    }
  }, [params]);

  const handleAnalyze = () => {
    router.push(
      `/dashboard/climate-analysis?location=${encodeURIComponent(location)}&crop=${encodeURIComponent(crop)}&priority=${encodeURIComponent(priority)}`
    );
    executeAnalysis(location, crop, priority);
  };

  const isBn = lang === "BN";
  const startDateFormatted = analysisData ? formatPlantingDate(analysisData.transplantingWindow.start, isBn) : "";
  const endDateFormatted = analysisData ? formatPlantingDate(analysisData.transplantingWindow.end, isBn) : "";

  const onboardingSteps = [
    { n: 1, title: t("step1_title"), desc: t("step1_desc"), icon: MapPin },
    { n: 2, title: t("step2_title"), desc: t("step2_desc"), icon: Satellite },
    { n: 3, title: t("step3_title"), desc: t("step3_desc"), icon: BarChart3 },
  ];

  return (
    <div className="pb-6">
      {/* Tell the layout to make the navbar transparent/overlay */}
      <TransparentNavSlot />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#fbfcfa]" style={{ minHeight: 320 }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-[center_65%]"
            style={{
              backgroundImage: "url('/analysisBG.png')",
            }}
          />
          {/* Minimal left fade */}
          <div className="absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-[#fbfcfa]/100 to-transparent" />
          {/* Top fade */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/20 to-transparent" />
          {/* Smoky bottom blend */}
          <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-[#f5f7f5]/90 to-transparent" />
          <div className="absolute bottom-0 right-0 h-[30%] w-[20%] bg-gradient-to-tl from-[#f5f7f5]/90 to-transparent" />
        </div>

        {/* Text content */}
        <div className="relative px-6 pb-20 pt-20 sm:px-10 sm:pb-24 sm:pt-24">
          <div className="max-w-sm">
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              {t("hero_title")}
            </h1>

            {hasResult && (
              <p className="mt-1 text-lg font-semibold text-[#173d2a]">
                {locName(location)} · {cropName(crop)}
              </p>
            )}

            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {t("hero_desc")}
            </p>
          </div>

          {/* Handwritten quote — top-right */}
          <p
            className={`${script.className} absolute right-[-24px] pr-[200px] -rotate-[19deg] text-2xl leading-6 text-white drop-shadow sm:right-10 sm:block sm:top-24 whitespace-pre-line`}
          >
            {isBn ? "সুস্থ মাঠ\nউজ্জ্বল ভবিষ্যৎ" : "Healthy Fields\nBrighter Tomorrows"}
          </p>
        </div>
      </section>

      {/* ── FILTER CARD ──────────────────────────────────────────────────────── */}
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
          <span>{t("filter_hint_ai")}</span>
          <span>{t("filter_hint_nasa")}</span>
        </p>
      </div>

      {/* ── ERROR STATE ──────────────────────────────────────────────────────── */}
      {error && (
        <section className={`mb-6 ${SECTION_X}`}>
          <div className="flex items-start justify-between rounded-2xl border border-rose-200 bg-rose-50/90 p-5 text-rose-800 shadow-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-600" />
              <div>
                <h4 className="font-semibold text-rose-900">{t("error_title")}</h4>
                <p className="mt-1 text-sm text-rose-700">{error}</p>
                <p className="mt-2 text-xs text-rose-600">
                  {t("error_host_hint")}{" "}
                  <code className="rounded bg-rose-100 px-1 py-0.5 font-mono text-[11px]">
                    {process.env.NEXT_PUBLIC_API_URL || "http://localhost:5007"}
                  </code>
                </p>
              </div>
            </div>
            <button
              onClick={handleAnalyze}
              className="flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-700"
            >
              <RefreshCw className="h-3.5 w-3.5" /> {t("retry")}
            </button>
          </div>
        </section>
      )}

      {/* ── LOADING STATE ────────────────────────────────────────────────────── */}
      {isLoading && (
        <section className={`mb-8 ${SECTION_X}`}>
          <div className="rounded-2xl border border-primary-100 bg-white/90 p-8 text-center shadow-sm backdrop-blur">
            <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
              <div className="absolute inset-0 animate-ping rounded-full bg-primary-100 opacity-75" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary-800 text-white shadow-md">
                <Satellite className="h-6 w-6 animate-pulse" />
              </div>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              {t("loading_title")}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              {t("loading_desc")} {locName(location) || (isBn ? "আপনার খামার" : "your farm")}...
            </p>
            <div className="mx-auto mt-4 flex items-center justify-center gap-2 text-xs text-primary-700 font-medium">
              <Loader2 className="h-4 w-4 animate-spin" /> {t("loading_status")}
            </div>
          </div>
        </section>
      )}

      {/* ── RESULTS ──────────────────────────────────────────────────────────── */}
      {hasResult && !isLoading ? (
        <div className="space-y-8">
          {/* Onset summary */}
          {analysisData && (
            <section className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ${SECTION_X}`}>
              {[
                { label: isBn ? "মধ্যম onset পরিবর্তন" : "Median onset shift", value: `${analysisData.shift.medianDays > 0 ? "+" : ""}${analysisData.shift.medianDays} days`, icon: CloudRain, tone: "bg-sky-50 border-sky-100 text-sky-800" },
                { label: isBn ? "পুরনো সময়ের median" : "Baseline median", value: `Day ${analysisData.baseline.medianDayOfYear}`, icon: Calendar, tone: "bg-slate-50 border-slate-200 text-slate-800" },
                { label: isBn ? "সাম্প্রতিক সময়ের median" : "Recent median", value: `Day ${analysisData.recent.medianDayOfYear}`, icon: BarChart3, tone: "bg-emerald-50 border-emerald-100 text-emerald-800" },
                { label: isBn ? "প্রস্তাবিত transplanting window" : "Transplanting window", value: `${startDateFormatted} - ${endDateFormatted}`, icon: Sprout, tone: "bg-amber-50 border-amber-100 text-amber-800" },
              ].map((metric) => (
                <div key={metric.label} className={`rounded-2xl border p-5 shadow-sm ${metric.tone}`}>
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <metric.icon className="h-4 w-4" /> {metric.label}
                  </div>
                  <p className="mt-3 text-2xl font-bold">{metric.value}</p>
                  <p className="mt-2 text-xs leading-relaxed opacity-75">
                    {metric.label.includes("shift") || metric.label.includes("পরিবর্তন") ? analysisData.shift.direction : analysisData.shift.p25ToP75Days ? `${analysisData.shift.p25ToP75Days.lower} to ${analysisData.shift.p25ToP75Days.upper} days range` : ""}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Annual onset records */}
          {analysisData && (
            <section className={`grid grid-cols-1 gap-4 lg:grid-cols-2 ${SECTION_X}`}>
              {[{ title: isBn ? "Baseline onset records" : "Baseline onset records", period: analysisData.baseline }, { title: isBn ? "Recent onset records" : "Recent onset records", period: analysisData.recent }].map(({ title, period }) => (
                <div key={title} className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
                    <span className="text-xs text-slate-500">{period.startYear}-{period.endYear} · {period.validYears} valid years</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500"><tr><th className="px-5 py-3 font-medium">Year</th><th className="px-5 py-3 font-medium">Onset</th><th className="px-5 py-3 font-medium">Rainfall</th><th className="px-5 py-3 font-medium">Confidence</th></tr></thead>
                      <tbody>{period.annualOnsets.map((onset) => <tr key={onset.year} className="border-t border-slate-100"><td className="px-5 py-3 font-semibold text-slate-700">{onset.year}</td><td className="px-5 py-3 text-slate-600">{formatPlantingDate(onset.onsetDate, isBn)}</td><td className="px-5 py-3 text-slate-600">{onset.rainfallTotalMm} mm</td><td className="px-5 py-3"><span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-700">{onset.confidence}</span></td></tr>)}</tbody>
                    </table>
                  </div>
                  <p className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">P25: day {period.p25DayOfYear} · Median: day {period.medianDayOfYear} · P75: day {period.p75DayOfYear}</p>
                </div>
              ))}
            </section>
          )}

          {/* Location Map */}
          {analysisData?.location && (
            <section className={SECTION_X}>
              <LocationMapSection
                latitude={analysisData.location.latitude}
                longitude={analysisData.location.longitude}
                locationName={isBn ? `${locName(location) || "খামার"}, বাংলাদেশ` : `${location || "Farm"}, Bangladesh`}
                zoom={10}
              />
            </section>
          )}

          {/* Recommendation banner */}
          {analysisData && <section className={SECTION_X}>
            <div className="grid grid-cols-1 overflow-hidden rounded-2xl bg-primary-50 shadow-sm lg:grid-cols-2">
              <div className="p-6 sm:p-8 lg:p-10">
                <p className="flex items-center gap-2 text-sm font-semibold text-primary-700">
                  <Sprout className="h-4 w-4" /> {t("rec_badge")}
                </p>
                <h3 className="mt-2 text-4xl font-bold tracking-tight text-primary-900">
                  {startDateFormatted} – {endDateFormatted}
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-clay-100 px-3 py-1 text-xs font-semibold text-clay-600">
                    {t("rec_primary_crop")}: {cropName(analysisData.crop.cropType)}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                    {isBn ? "বিশ্বাসযোগ্যতা" : "Confidence"}: {analysisData.transplantingWindow.confidence}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                    {isBn ? "ধারা" : "Direction"}: {analysisData.shift.direction}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {isBn ? (
                    <>
                      নাসার স্যাটেলাইট পর্যবেক্ষণ ও ক্রপওয়াইজ এআই মডেল অনুসারে,{" "}
                      <strong className="text-slate-800">{locName(location) || "আপনার এলাকা"}</strong>-এ{" "}
                      <strong className="text-slate-800">{cropName(analysisData.crop.cropType)}</strong>{" "}
                      চাষের জন্য {startDateFormatted} থেকে {endDateFormatted} window ব্যবহার করুন। {analysisData.explanation}
                    </>
                  ) : (
                    <>
                      {analysisData.explanation} The transplanting window for {analysisData.crop.cropType} in {analysisData.location.district} is {startDateFormatted} to {endDateFormatted}.
                    </>
                  )}
                </p>

                <div className="mt-5 space-y-3 border-t border-primary-200/60 pt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary-900">{isBn ? "কেন এই ফলাফল" : "Why this result"}</p>
                  <p className="rounded-xl bg-white/80 p-4 text-sm leading-relaxed text-slate-700">{analysisData.explanation}</p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <p className="rounded-xl bg-primary-50 p-3 text-xs leading-relaxed text-slate-700">{isBn ? "পরিসংখ্যানের পরিসর" : "Observed shift range"}: {analysisData.shift.p25ToP75Days.lower} to {analysisData.shift.p25ToP75Days.upper} days</p>
                    <p className="rounded-xl bg-primary-50 p-3 text-xs leading-relaxed text-slate-700">{isBn ? "পদ্ধতি" : "Detection method"}: {analysisData.method.minimumAccumulatedRainfallMm} mm over {analysisData.method.accumulationDays} days; {analysisData.method.minimumConfirmationRainyDays} rainy days in {analysisData.method.confirmationWindowDays} days</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 rounded-xl bg-primary-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-900">
                    <Calendar className="h-4 w-4" /> {t("calendar")}
                  </button>
                  {analysisData?.analysisId && (
                    <span className="flex items-center text-xs font-mono text-primary-700 bg-white/70 px-3 py-2 rounded-xl border border-primary-200/50">
                      {t("analysis_id")}: {analysisData.analysisId}
                    </span>
                  )}
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
                <div className="absolute bottom-5 right-5 max-w-[220px] rounded-xl bg-[#0f3d2a]/95 p-4 text-white shadow-lg backdrop-blur-sm">
                  <Quote className="h-5 w-5 text-white/60" />
                  <p className="mt-2 text-sm italic leading-snug">
                    {t("quote_adapting")}
                  </p>
                  <div className="mt-3 h-px w-8 bg-white/40" />
                  <p className="mt-2 text-[10px] text-white/70">{analysisData.crop.cropType} · {analysisData.location.district}</p>
                </div>
              </div>
            </div>
          </section>}

          {/* Farmer Guidance */}
          {analysisData?.farmerGuidance && analysisData.farmerGuidance.length > 0 && (
            <section className={SECTION_X}>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 shadow-sm sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="flex items-center gap-2 text-base font-semibold text-slate-900">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" /> {isBn ? "কৃষকের করণীয়" : "Farmer guidance"}
                  </h3>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-emerald-700 shadow-sm">
                    {analysisData.farmerGuidance.length} {isBn ? "টি পরামর্শ" : "practical steps"}
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {analysisData.farmerGuidance.map((advice, idx) => (
                    <article key={idx} className="flex gap-4 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-sm font-bold text-white">{idx + 1}</span>
                      <p className="text-sm leading-7 text-slate-700">{advice}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Method, warnings, and data provenance */}
          {analysisData && (
            <section className={`grid grid-cols-1 gap-4 lg:grid-cols-2 ${SECTION_X}`}>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="flex items-center gap-2 text-base font-semibold text-slate-900"><Database className="h-5 w-5 text-primary-700" /> {isBn ? "বিশ্লেষণের পদ্ধতি" : "Analysis method"}</h3>
                <dl className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                  <div><dt className="text-xs text-slate-500">Season</dt><dd className="font-medium text-slate-800">{analysisData.method.season}</dd></div>
                  <div><dt className="text-xs text-slate-500">Crop / method</dt><dd className="font-medium text-slate-800">{analysisData.crop.cropType} / {analysisData.crop.farmingMethod}</dd></div>
                  <div><dt className="text-xs text-slate-500">Minimum accumulated rainfall</dt><dd className="font-medium text-slate-800">{analysisData.method.minimumAccumulatedRainfallMm} mm</dd></div>
                  <div><dt className="text-xs text-slate-500">Confirmation rule</dt><dd className="font-medium text-slate-800">{analysisData.method.minimumConfirmationRainyDays} rainy days / {analysisData.method.confirmationWindowDays} days</dd></div>
                </dl>
                <div className="mt-5 flex flex-wrap gap-2">{analysisData.dataSources.map((src) => <span key={src} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">{src}</span>)}</div>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6 shadow-sm">
                <h3 className="flex items-center gap-2 text-base font-semibold text-amber-950"><Info className="h-5 w-5 text-amber-700" /> {isBn ? "সতর্কতা" : "Warnings"}</h3>
                {analysisData.warnings.length > 0 ? <ul className="mt-4 space-y-3 text-sm leading-relaxed text-amber-900">{analysisData.warnings.map((warning) => <li key={warning} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-600" />{warning}</li>)}</ul> : <p className="mt-4 text-sm text-amber-900">{isBn ? "কোনো সতর্কতা নেই।" : "No warnings returned."}</p>}
              </div>
            </section>
          )}
        </div>
      ) : !isLoading ? (
        /* Empty state */
        <section className={SECTION_X}>
          <div className="rounded-2xl border border-slate-100 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
            <Satellite className="mx-auto h-14 w-14 text-primary-300" />
            <h2 className="mt-5 text-2xl font-semibold text-slate-900">{t("empty_title")}</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              {t("empty_desc")}
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
              {t("empty_slogan")}
            </p>
          </div>
        </section>
      ) : null}

      {/* AskAI bar */}
      <div className={`sticky bottom-0 z-10 bg-gradient-to-t from-[#f5f7f5] via-[#f5f7f5]/90 to-transparent pb-6 pt-6 ${SECTION_X}`}>
        <AskAiBar />
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