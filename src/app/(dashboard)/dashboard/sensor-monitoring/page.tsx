"use client";

import React, { useState } from "react";
import { Caveat } from "next/font/google";
import {
  Gauge,
  Thermometer,
  Droplets,
  CloudRain,
  MapPin,
  Compass,
  RefreshCw,
  Activity,
  Wind,
  Sun,
  Radio,
  Satellite,
  CheckCircle2,
} from "lucide-react";
import { TransparentNavSlot } from "../../header-context";
import { useLanguage } from "@/lib/language-context";

const script = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
});

export default function SensorMonitoringPage() {
  const { lang } = useLanguage();
  const isBn = lang === "BN";

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Live telemetry data
  const [telemetry, setTelemetry] = useState({
    temperature: 28.4,
    humidity: 68.2,
    soilMoisture10cm: 34.1,
    soilMoisture30cm: 42.6,
    rainStatus: isBn ? "শুষ্ক (বৃষ্টি নেই)" : "Dry (No Rain)",
    rainMm: 0.0,
    gpsLat: "24.3636° N",
    gpsLng: "88.6241° E",
    gpsAlt: "18.2 m",
    gpsSats: 9,
    battery: 98,
    solarPv: "5.8 V · 420 mA",
    lastUpdated: "Just now",
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setTelemetry((prev) => ({
        ...prev,
        temperature: +(28.0 + Math.random() * 1.5).toFixed(1),
        humidity: +(67.0 + Math.random() * 2.5).toFixed(1),
        soilMoisture10cm: +(33.5 + Math.random() * 1.2).toFixed(1),
        lastUpdated: "Just now",
      }));
      setIsRefreshing(false);
    }, 700);
  };

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
          <div className="absolute inset-y-0 left-0 hidden w-[45%] bg-gradient-to-r from-[#fbfcfa]/100 to-transparent sm:block" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black/55 sm:hidden" />
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 hidden h-[35%] bg-gradient-to-t from-[#f5f7f5]/90 to-transparent sm:block" />
        </div>

        <div className="relative px-6 pb-20 pt-24 sm:px-10 sm:pb-24 sm:pt-24">
          <div className="max-w-lg">
            <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold tracking-wider text-primary-700 uppercase sm:text-primary-800">
              <Radio className="h-3.5 w-3.5 animate-pulse" />
              {isBn ? "লাইভ টেলিমেট্রি ও ফিল্ড গেজ" : "Live Telemetry & Gauge Readings"}
            </p>

            <h1 className="text-3xl font-bold leading-tight text-white drop-shadow sm:text-4xl sm:font-semibold sm:text-slate-900 sm:drop-shadow-none">
              {isBn ? "সেন্সর মনিটরিং" : "Sensor Monitoring"}
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-white/90 drop-shadow sm:text-slate-600 sm:drop-shadow-none">
              {isBn
                ? "তাপমাত্রা, আর্দ্রতা, মাটির গভীরতার আর্দ্রতা, বৃষ্টিপাত এবং জিপিএস অবস্থানের সরাসরি তথ্য পর্যবেক্ষণ করুন।"
                : "Continuous real-time telemetry stream of temperature, air humidity, multi-depth soil moisture, rain sensors, and precision GPS."}
            </p>
          </div>

          <p
            className={`${script.className} absolute right-6 top-20 hidden -rotate-2 text-2xl leading-6 text-white drop-shadow sm:right-10 sm:block sm:top-24`}
          >
            Live Ground Data.
            <br />
            Total Clarity.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 -mt-8 space-y-6 px-4 sm:-mt-10 sm:px-6">

        {/* Refresh & Sync Bar */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-700">
              {isBn ? "সরাসরি ডাটা স্ট্রিম সক্রিয় · আপডেট: " : "Live LoRa Link Active · Last sync: "}
              <span className="text-primary-800 font-bold">{telemetry.lastUpdated}</span>
            </span>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-primary-700" : ""}`} />
            {isBn ? "রিফ্রেশ করুন" : "Refresh Stream"}
          </button>
        </div>

        {/* 4 Primary Gauges Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Temperature */}
          <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">{isBn ? "তাপমাত্রা" : "Temperature"}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Thermometer className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">{telemetry.temperature} °C</p>
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2">
              <span>{isBn ? "স্বাভাবিক রেঞ্জ" : "Normal Range"}: 20–32 °C</span>
              <span className="text-emerald-600 font-bold">Optimal</span>
            </div>
          </div>

          {/* Humidity */}
          <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">{isBn ? "বাতাসের আর্দ্রতা" : "Air Humidity"}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <Wind className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">{telemetry.humidity} %</p>
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2">
              <span>{isBn ? "শিশিরাঙ্ক (Dew Pt)" : "Dew Point"}: 21.4 °C</span>
              <span className="text-sky-600 font-bold">Comfort</span>
            </div>
          </div>

          {/* Soil Moisture */}
          <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">{isBn ? "মাটির আর্দ্রতা" : "Soil Moisture"}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Droplets className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">{telemetry.soilMoisture10cm} %</p>
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2">
              <span>{isBn ? "গভীরতা ৩০ সেমি" : "Root (30cm)"}: {telemetry.soilMoisture30cm}%</span>
              <span className="text-emerald-600 font-bold">Moist</span>
            </div>
          </div>

          {/* Rain Sensor */}
          <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">{isBn ? "বৃষ্টি সেন্সর" : "Rain Sensor"}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <CloudRain className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">{telemetry.rainStatus}</p>
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2">
              <span>{isBn ? "বৃষ্টিপাত" : "Rain Rate"}: {telemetry.rainMm} mm/h</span>
              <span className="text-slate-600 font-medium">{isBn ? "শুকনো" : "Dry"}</span>
            </div>
          </div>

        </div>

        {/* GPS & Location Module Card */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isBn ? "জিপিএস অবস্থান ও স্যাটেলাইট লিংক (U-Blox NEO-6M)" : "Precision GPS & Satellite Lock (NEO-6M)"}
              </h3>
              <p className="text-xs text-slate-500">
                {isBn ? "খামারের সুনির্দিষ্ট স্থানাঙ্ক এবং উচ্চতা পরিমাপ" : "Fixed real-time field coordinates, altitude, and GNSS satellite lock"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-center">
            <div className="rounded-2xl bg-slate-50 p-3 border border-slate-100">
              <p className="text-[10px] font-semibold text-slate-400 uppercase">{isBn ? "অক্ষাংশ (Latitude)" : "Latitude"}</p>
              <p className="mt-1 text-sm font-bold text-slate-800">{telemetry.gpsLat}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-3 border border-slate-100">
              <p className="text-[10px] font-semibold text-slate-400 uppercase">{isBn ? "দ্রাঘিমাংশ (Longitude)" : "Longitude"}</p>
              <p className="mt-1 text-sm font-bold text-slate-800">{telemetry.gpsLng}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-3 border border-slate-100">
              <p className="text-[10px] font-semibold text-slate-400 uppercase">{isBn ? "উচ্চতা (Altitude)" : "Altitude"}</p>
              <p className="mt-1 text-sm font-bold text-slate-800">{telemetry.gpsAlt}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-3 border border-slate-100">
              <p className="text-[10px] font-semibold text-slate-400 uppercase">{isBn ? "স্যাটেলাইট ফিক্স" : "Satellites Connected"}</p>
              <p className="mt-1 text-sm font-bold text-emerald-700">{telemetry.gpsSats} {isBn ? "টি স্যাটেলাইট" : "Sats (Locked)"}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
