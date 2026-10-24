"use client";

import React, { useState } from "react";
import { Caveat } from "next/font/google";
import {
  Activity,
  Radio,
  BatteryCharging,
  Wifi,
  RefreshCw,
  Cpu,
  Droplets,
  Thermometer,
  Sun,
  Wind,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Satellite,
  Download,
  AlertTriangle,
} from "lucide-react";
import { TransparentNavSlot } from "../../header-context";
import { useLanguage } from "@/lib/language-context";

const script = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
});

interface SensorNode {
  id: string;
  name: string;
  type: string;
  sector: string;
  crop: string;
  status: "online" | "syncing" | "warning";
  battery: number;
  solarCharging: boolean;
  signalRssi: number;
  lastPing: string;
  metrics: { label: string; value: string; unit: string; icon: any }[];
}

const mockNodes: SensorNode[] = [
  {
    id: "NODE-SM-101",
    name: "Soil Moisture Probe A1",
    type: "Capacitive Soil Array",
    sector: "Sector 1 (East)",
    crop: "Aman Rice",
    status: "online",
    battery: 96,
    solarCharging: true,
    signalRssi: -68,
    lastPing: "Just now",
    metrics: [
      { label: "Topsoil (10cm)", value: "32.4", unit: "% VWC", icon: Droplets },
      { label: "Root Zone (30cm)", value: "36.8", unit: "% VWC", icon: Droplets },
      { label: "Soil Temp", value: "26.8", unit: "°C", icon: Thermometer },
    ],
  },
  {
    id: "NODE-WS-204",
    name: "Micro Weather Station W2",
    type: "Solar Weather Node",
    sector: "Central Station",
    crop: "Field Perimeter",
    status: "online",
    battery: 92,
    solarCharging: true,
    signalRssi: -62,
    lastPing: "1m ago",
    metrics: [
      { label: "Ambient Temp", value: "30.5", unit: "°C", icon: Thermometer },
      { label: "Relative Humidity", value: "76", unit: "%", icon: Droplets },
      { label: "Solar Radiation", value: "820", unit: "W/m²", icon: Sun },
      { label: "Wind Velocity", value: "7.2", unit: "km/h", icon: Wind },
    ],
  },
  {
    id: "NODE-IV-302",
    name: "Smart Solar Irrigation Valve V1",
    type: "Bi-directional Valve Node",
    sector: "Canal Feeder Gate 3",
    crop: "Aman Rice",
    status: "online",
    battery: 98,
    solarCharging: true,
    signalRssi: -74,
    lastPing: "3m ago",
    metrics: [
      { label: "Gate Status", value: "Closed", unit: "Standby", icon: Cpu },
      { label: "Line Pressure", value: "2.4", unit: "bar", icon: Activity },
      { label: "Last Water Run", value: "1,650", unit: "Liters", icon: Droplets },
    ],
  },
  {
    id: "NODE-CN-405",
    name: "Canopy & Leaf Wetness Sensor L1",
    type: "Optical PAR & Wetness",
    sector: "Sector 2 (North)",
    crop: "Seasonal Pulses",
    status: "online",
    battery: 89,
    solarCharging: false,
    signalRssi: -79,
    lastPing: "4m ago",
    metrics: [
      { label: "Leaf Wetness", value: "14", unit: "% Dry", icon: Droplets },
      { label: "PAR Solar Flux", value: "1,450", unit: "µmol/m²s", icon: Sun },
      { label: "Canopy Temp", value: "28.2", unit: "°C", icon: Thermometer },
    ],
  },
];

export default function DeviceStatusPage() {
  const { lang } = useLanguage();
  const [nodes, setNodes] = useState<SensorNode[]>(mockNodes);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setNodes((prev) =>
        prev.map((n) => ({
          ...n,
          lastPing: "Just now",
        }))
      );
      setIsRefreshing(false);
    }, 800);
  };

  const filteredNodes =
    selectedFilter === "all"
      ? nodes
      : nodes.filter((n) => n.status === selectedFilter);

  return (
    <div className="pb-24 sm:pb-12">
      <TransparentNavSlot />

      {/* ================= HERO ================= */}
      <section className="relative min-h-[300px] overflow-hidden bg-[#fbfcfa] sm:min-h-[320px]">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-[center_35%]"
            style={{
              backgroundImage:
                "url('https://i.ibb.co.com/PG31PycM/Chat-GPT-Image-Sep-24-2026-05-42-01-PM.png')",
            }}
          />
          {/* Desktop: left fade */}
          <div className="absolute inset-y-0 left-0 hidden w-[45%] bg-gradient-to-r from-[#fbfcfa]/100 to-transparent sm:block" />
          {/* Mobile overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black/55 sm:hidden" />
          {/* Top fade */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/20 to-transparent" />
          {/* Bottom blend */}
          <div className="absolute inset-x-0 bottom-0 hidden h-[35%] bg-gradient-to-t from-[#f5f7f5]/90 to-transparent sm:block" />
        </div>

        <div className="relative px-6 pb-20 pt-24 sm:px-10 sm:pb-24 sm:pt-24">
          <div className="max-w-lg">
            <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold tracking-wider text-primary-700 uppercase sm:text-primary-800">
              <Radio className="h-3.5 w-3.5 animate-pulse" />
              {lang === "BN" ? "লাইভ আইওটি গ্রাউন্ড ট্রুথ" : "Live IoT Ground Truth"}
            </p>

            <h1 className="text-3xl font-bold leading-tight text-white drop-shadow sm:text-4xl sm:font-semibold sm:text-slate-900 sm:drop-shadow-none">
              {lang === "BN" ? "ডিভাইস স্ট্যাটাস" : "Device Status"}
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-white/90 drop-shadow sm:text-slate-600 sm:drop-shadow-none">
              {lang === "BN"
                ? "খামারের মাটির আর্দ্রতা, আবহাওয়া স্টেশন এবং স্বয়ংক্রিয় সেচ নোডের সরাসরি তথ্য ও ব্যাটারি স্থিতি।"
                : "Real-time telemetry and health diagnostics for your on-field IoT sensors and gateway nodes."}
            </p>
          </div>

          <p
            className={`${script.className} absolute right-6 top-20 hidden -rotate-2 text-2xl leading-6 text-white drop-shadow sm:right-10 sm:block sm:top-24`}
          >
            Connected Fields
            <br />
            Precise Decisions.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 -mt-8 space-y-6 px-4 sm:-mt-10 sm:px-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-medium">{lang === "BN" ? "সক্রিয় নোড" : "Active Nodes"}</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-slate-900">4 / 4</p>
            <p className="mt-1 text-[11px] font-medium text-emerald-600">100% Online</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-medium">{lang === "BN" ? "গেটওয়ে সংযোগ" : "Gateway Link"}</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                <Wifi className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-slate-900">LoRaWAN</p>
            <p className="mt-1 text-[11px] font-medium text-sky-600">915 MHz · -68 dBm</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-medium">{lang === "BN" ? "গড় ব্যাটারি" : "Avg Battery"}</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <BatteryCharging className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-slate-900">93.8%</p>
            <p className="mt-1 text-[11px] font-medium text-emerald-600">Solar Charging Active</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-medium">{lang === "BN" ? "নাসা সিংক" : "NASA Sync"}</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                <Satellite className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-slate-900">Verified</p>
            <p className="mt-1 text-[11px] font-medium text-primary-700">±1.4% Ground Match</p>
          </div>
        </div>

        {/* Action bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                selectedFilter === "all"
                  ? "bg-primary-800 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {lang === "BN" ? "সকল নোড (৪)" : "All Nodes (4)"}
            </button>
            <button
              onClick={() => setSelectedFilter("online")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                selectedFilter === "online"
                  ? "bg-primary-800 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {lang === "BN" ? "অনলাইন (৪)" : "Online (4)"}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-primary-700" : ""}`} />
              <span>{isRefreshing ? (lang === "BN" ? "সিংক হচ্ছে..." : "Syncing...") : (lang === "BN" ? "রিফ্রেশ করুন" : "Refresh")}</span>
            </button>
          </div>
        </div>

        {/* Node Cards Grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredNodes.map((node) => (
            <div
              key={node.id}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-primary-200 hover:shadow-md"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-800">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{node.name}</h3>
                    <p className="text-xs text-slate-400">
                      {node.sector} · <span className="font-medium text-primary-700">{node.crop}</span>
                    </p>
                  </div>
                </div>

                <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>

              {/* Live Metrics */}
              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {node.metrics.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.label} className="rounded-xl border border-slate-100 bg-slate-50/60 p-2.5">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Icon className="h-3.5 w-3.5 text-primary-600" />
                        <span className="text-[10px] font-medium">{m.label}</span>
                      </div>
                      <p className="mt-1 text-base font-bold text-slate-800">
                        {m.value} <span className="text-xs font-normal text-slate-500">{m.unit}</span>
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Card Footer: Diagnostics */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[11px] text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 font-medium text-slate-600">
                    <BatteryCharging className="h-3.5 w-3.5 text-emerald-600" />
                    {node.battery}%
                  </span>
                  <span className="flex items-center gap-1 font-medium text-slate-600">
                    <Wifi className="h-3.5 w-3.5 text-sky-600" />
                    {node.signalRssi} dBm
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{node.lastPing}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* NASA Earth Observation Sync Section */}
        <div className="rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50/60 via-white to-primary-50/40 p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-800 text-white">
                <Satellite className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">
                  {lang === "BN" ? "নাসা স্যাটেলাইট বনাম ফিল্ড সেন্সর তুলনা" : "NASA Satellite vs. Field Sensor Calibration"}
                </h4>
                <p className="mt-1 text-xs text-slate-600">
                  {lang === "BN"
                    ? "মাটির আর্দ্রতা প্রোব রিডিংস (SMAP এবং GPM উপাত্তের সাথে) প্রতি ৬ ঘণ্টা অন্তর স্বয়ংক্রিয়ভাবে ক্যালিব্রেট করা হয়।"
                    : "Soil moisture and precipitation ground sensors cross-calibrated against NASA SMAP and GPM satellite models every 6 hours."}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                Calibrated (±1.4%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
