"use client";

import React, { useState } from "react";
import { Caveat } from "next/font/google";
import {
  Power,
  Zap,
  Gauge,
  Clock,
  AlertOctagon,
  ShieldCheck,
  Droplets,
  RotateCcw,
  Sparkles,
  Flame,
  CheckCircle2,
  Sliders,
} from "lucide-react";
import { TransparentNavSlot } from "../../header-context";
import { useLanguage } from "@/lib/language-context";

const script = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
});

export default function RelayControlPage() {
  const { lang } = useLanguage();
  const isBn = lang === "BN";

  // Relay states
  const [relay1, setRelay1] = useState(true); // Water Pump Motor
  const [relay2, setRelay2] = useState(false); // Drip Solenoid Valve
  const [quickTimer, setQuickTimer] = useState<number | null>(30); // minutes
  const [safetyLock, setSafetyLock] = useState(false);

  const handleAllOff = () => {
    setRelay1(false);
    setRelay2(false);
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
              <Power className="h-3.5 w-3.5 animate-pulse" />
              {isBn ? "লাইভ পাওয়ার ও মোটর সুইচ" : "Live Power & Actuator Control"}
            </p>

            <h1 className="text-3xl font-bold leading-tight text-white drop-shadow sm:text-4xl sm:font-semibold sm:text-slate-900 sm:drop-shadow-none">
              {isBn ? "রিলে ও মোটর কন্ট্রোল" : "Relay Control"}
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-white/90 drop-shadow sm:text-slate-600 sm:drop-shadow-none">
              {isBn
                ? "ESP32 এর সাথে সংযুক্ত ওয়াটার পাম্প (মোটর) এবং সোলেনয়েড ড্রিপ ভালভ আলাদাভাবে অন/অফ করুন।"
                : "Independently switch Relay 1 (Water Motor) and Relay 2 (Solenoid Valve) with real-time power telemetry and safety interlocks."}
            </p>
          </div>

          <p
            className={`${script.className} absolute right-6 top-20 hidden -rotate-2 text-2xl leading-6 text-white drop-shadow sm:right-10 sm:block sm:top-24`}
          >
            Instant Power.
            <br />
            Protected Motors.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 -mt-8 space-y-6 px-4 sm:-mt-10 sm:px-6">

        {/* Emergency Stop Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-rose-100 bg-rose-50/80 p-4 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-600 text-white shadow-sm">
              <AlertOctagon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-rose-950">
                {isBn ? "জরুরি শাটডাউন ও সেফটি ইন্টারলক" : "Emergency Shutoff & Motor Protection"}
              </p>
              <p className="text-xs text-rose-700">
                {isBn
                  ? "যেকোনো জরুরি অবস্থায় এক ক্লিকেই সব পাম্প এবং ভালভ সাথে সাথে বন্ধ করুন।"
                  : "Instant one-click override cuts power to all relays immediately."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSafetyLock(!safetyLock)}
              className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                safetyLock
                  ? "border-amber-300 bg-amber-100 text-amber-800"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {safetyLock ? (isBn ? "🔒 লক সক্রিয়" : "🔒 Safety Locked") : (isBn ? "লক করুন" : "Lock Controls")}
            </button>

            <button
              onClick={handleAllOff}
              disabled={safetyLock}
              className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-rose-700 active:scale-95 disabled:opacity-50"
            >
              <Power className="h-4 w-4" />
              {isBn ? "সব বন্ধ করুন (ALL OFF)" : "Emergency ALL OFF"}
            </button>
          </div>
        </div>

        {/* The Two Main Relays Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* RELAY 1: Water Pump Motor */}
          <div
            className={`relative overflow-hidden rounded-3xl border transition-all duration-300 ${
              relay1
                ? "border-emerald-300 bg-gradient-to-br from-emerald-50/90 via-white to-white shadow-lg shadow-emerald-500/10 ring-2 ring-emerald-500/20"
                : "border-slate-200 bg-white shadow-sm"
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl transition ${
                      relay1 ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 uppercase">
                        Relay 1 · GPIO 26
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          relay1 ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${relay1 ? "animate-ping bg-emerald-600" : "bg-slate-400"}`} />
                        {relay1 ? (isBn ? "চালু (RUNNING)" : "RUNNING") : (isBn ? "বন্ধ (OFF)" : "OFF")}
                      </span>
                    </div>
                    <h2 className="mt-1 text-xl font-bold text-slate-900">
                      {isBn ? "প্রধান পানি তোলার পাম্প (Motor 1)" : "Main Irrigation Motor (Pump 1)"}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isBn ? "১.৫ এইচপি মনোব্লক সেচ মোটর · সেক্টর ১ ও ২" : "1.5 HP Monoblock Submersible · East Sector"}
                    </p>
                  </div>
                </div>

                {/* Big Toggle Switch */}
                <button
                  type="button"
                  disabled={safetyLock}
                  onClick={() => setRelay1(!relay1)}
                  className={`relative inline-flex h-10 w-20 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                    relay1 ? "bg-emerald-600" : "bg-slate-300"
                  }`}
                  role="switch"
                  aria-checked={relay1}
                >
                  <span
                    className={`pointer-events-none inline-block h-9 w-9 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      relay1 ? "translate-x-10" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Live Telemetry inside card */}
              <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl bg-slate-50/80 p-3 text-center border border-slate-100">
                <div>
                  <p className="text-[10px] font-medium text-slate-400 uppercase">{isBn ? "পাওয়ার" : "Power"}</p>
                  <p className="mt-0.5 text-base font-bold text-slate-800">{relay1 ? "1,140 W" : "0 W"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium text-slate-400 uppercase">{isBn ? "ভোল্টেজ" : "Voltage"}</p>
                  <p className="mt-0.5 text-base font-bold text-slate-800">{relay1 ? "228 V" : "229 V"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium text-slate-400 uppercase">{isBn ? "কারেন্ট" : "Current"}</p>
                  <p className="mt-0.5 text-base font-bold text-slate-800">{relay1 ? "4.92 A" : "0.00 A"}</p>
                </div>
              </div>

              {/* Status bar */}
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  {relay1 ? (isBn ? "চলমান সময়: ২২ মিনিট" : "Runtime: 22m 14s") : (isBn ? "শেষ বন্ধ: ১০ মিনিট আগে" : "Last Stopped: 10m ago")}
                </span>
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {isBn ? "ড্রাই-রান প্রোটেকশন সক্রিয়" : "Dry-run Protected"}
                </span>
              </div>
            </div>
          </div>

          {/* RELAY 2: Solenoid Drip Valve */}
          <div
            className={`relative overflow-hidden rounded-3xl border transition-all duration-300 ${
              relay2
                ? "border-sky-300 bg-gradient-to-br from-sky-50/90 via-white to-white shadow-lg shadow-sky-500/10 ring-2 ring-sky-500/20"
                : "border-slate-200 bg-white shadow-sm"
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl transition ${
                      relay2 ? "bg-sky-600 text-white shadow-md shadow-sky-600/30" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <Droplets className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 uppercase">
                        Relay 2 · GPIO 27
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          relay2 ? "bg-sky-100 text-sky-800" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${relay2 ? "animate-ping bg-sky-600" : "bg-slate-400"}`} />
                        {relay2 ? (isBn ? "খোলা (OPEN)" : "OPEN") : (isBn ? "বন্ধ (CLOSED)" : "CLOSED")}
                      </span>
                    </div>
                    <h2 className="mt-1 text-xl font-bold text-slate-900">
                      {isBn ? "সোলেনয়েড ড্রিপ ভালভ (Valve 2)" : "Drip & Misting Valve (Relay 2)"}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isBn ? "২৪ ভোল্ট ডিসি অটোমেশন ভালভ · গ্রিনহাউস স্প্রিংকলার" : "24V DC Brass Solenoid Valve · Polyhouse"}
                    </p>
                  </div>
                </div>

                {/* Big Toggle Switch */}
                <button
                  type="button"
                  disabled={safetyLock}
                  onClick={() => setRelay2(!relay2)}
                  className={`relative inline-flex h-10 w-20 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                    relay2 ? "bg-sky-600" : "bg-slate-300"
                  }`}
                  role="switch"
                  aria-checked={relay2}
                >
                  <span
                    className={`pointer-events-none inline-block h-9 w-9 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      relay2 ? "translate-x-10" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Live Telemetry inside card */}
              <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl bg-slate-50/80 p-3 text-center border border-slate-100">
                <div>
                  <p className="text-[10px] font-medium text-slate-400 uppercase">{isBn ? "পানি প্রবাহ" : "Flow Rate"}</p>
                  <p className="mt-0.5 text-base font-bold text-slate-800">{relay2 ? "18.4 L/m" : "0.0 L/m"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium text-slate-400 uppercase">{isBn ? "লাইন প্রেসার" : "Line Pressure"}</p>
                  <p className="mt-0.5 text-base font-bold text-slate-800">{relay2 ? "2.4 Bar" : "0.2 Bar"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium text-slate-400 uppercase">{isBn ? "মোট পানি" : "Water Total"}</p>
                  <p className="mt-0.5 text-base font-bold text-slate-800">{relay2 ? "420 Liters" : "380 Liters"}</p>
                </div>
              </div>

              {/* Status bar */}
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  {relay2 ? (isBn ? "চলমান সময়: ৫ মিনিট" : "Open Duration: 5m") : (isBn ? "স্ট্যাটাস: স্ট্যান্ডবাই" : "Status: Standby")}
                </span>
                <span className="flex items-center gap-1 text-sky-600 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {isBn ? "নো-লিক ইন্টারগ্রিটি ঠিক আছে" : "No Leak Detected"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Timed Irrigation Boost Bar */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isBn ? "দ্রুত সেচ টাইমার (Quick Boost)" : "Quick Irrigation Boost"}
              </h3>
              <p className="text-xs text-slate-500">
                {isBn
                  ? "নির্দিষ্ট সময়ের জন্য মোটর চালু রাখুন, সময় শেষ হলে স্বয়ংক্রিয়ভাবে বন্ধ হয়ে যাবে।"
                  : "Run the motor for a specific duration; it will automatically cut off when timer expires."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {[15, 30, 45, 60].map((mins) => (
                <button
                  key={mins}
                  onClick={() => {
                    setQuickTimer(mins);
                    setRelay1(true);
                  }}
                  className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                    quickTimer === mins && relay1
                      ? "bg-primary-700 text-white shadow"
                      : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {mins} {isBn ? "মিনিট" : "Mins"}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
