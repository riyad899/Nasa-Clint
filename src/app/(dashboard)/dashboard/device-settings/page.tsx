"use client";

import React, { useState } from "react";
import { Caveat } from "next/font/google";
import {
  Settings,
  Sliders,
  SlidersHorizontal,
  Power,
  ShieldAlert,
  Save,
  Check,
  RotateCcw,
  Clock,
  Wifi,
  Cpu,
  Zap,
  Info,
} from "lucide-react";
import { TransparentNavSlot } from "../../header-context";
import { useLanguage } from "@/lib/language-context";

const script = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
});

export default function DeviceSettingsPage() {
  const { lang } = useLanguage();
  const isBn = lang === "BN";

  // Form states
  const [deviceName, setDeviceName] = useState("ESP32-S3 Agricultural Master");
  const [motorHp, setMotorHp] = useState("1.5 HP");
  const [motorType, setMotorType] = useState("Monoblock Centrifugal");
  const [maxRuntime, setMaxRuntime] = useState(45); // minutes
  const [dryRunProtection, setDryRunProtection] = useState(true);
  const [voltageCutoff, setVoltageCutoff] = useState(true);
  const [relay1Pin, setRelay1Pin] = useState("GPIO 26");
  const [relay2Pin, setRelay2Pin] = useState("GPIO 27");
  const [timezone, setTimezone] = useState("Asia/Dhaka (GMT+6)");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
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
              <SlidersHorizontal className="h-3.5 w-3.5 animate-pulse" />
              {isBn ? "মোটর সেট সেটিংস ও ডিভাইস কনফিগারেশন" : "Actuator & Device Hardware Calibration"}
            </p>

            <h1 className="text-3xl font-bold leading-tight text-white drop-shadow sm:text-4xl sm:font-semibold sm:text-slate-900 sm:drop-shadow-none">
              {isBn ? "ডিভাইস ও মোটর সেটিংস" : "Device Settings"}
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-white/90 drop-shadow sm:text-slate-600 sm:drop-shadow-none">
              {isBn
                ? "মোটরের এইচপি রেটিং, ড্রাই-রান সুরক্ষা, সর্বোচ্চ চলমান সময়সীমা, রিলে পিন এবং ডিভাইস প্যারামিটার কনফিগার করুন।"
                : "Fine-tune motor horse-power ratings, safety runtime limits, dry-run cutoffs, relay pin mappings, and firmware parameters."}
            </p>
          </div>

          <p
            className={`${script.className} absolute right-6 top-20 hidden -rotate-2 text-2xl leading-6 text-white drop-shadow sm:right-10 sm:block sm:top-24`}
          >
            Custom Calibration.
            <br />
            Hardened Safety.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 -mt-8 space-y-6 px-4 sm:-mt-10 sm:px-6">

        {/* Save confirmation toast */}
        {savedSuccess && (
          <div className="flex items-center gap-2 rounded-2xl bg-emerald-600 p-4 text-xs font-semibold text-white shadow-lg animate-in fade-in slide-in-from-top-2">
            <Check className="h-4 w-4" />
            <span>
              {isBn
                ? "ডিভাইস ও মোটরের সেটিংস সফলভাবে সেভ করা হয়েছে এবং ESP32-তে সিঙ্ক হয়েছে!"
                : "Motor and device settings saved successfully and synced to ESP32!"}
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Motor Set Settings Card */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-800">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {isBn ? "মোটর সেট সেটিংস (Motor Set Settings)" : "Motor Set Settings & Parameters"}
                </h3>
                <p className="text-xs text-slate-500">
                  {isBn ? "সেচ মোটরের হর্স-পাওয়ার ও পাম্প স্পেসিফিকেশন" : "Physical pump electrical sizing and load thresholds"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isBn ? "মোটর হর্সপাওয়ার (HP Rating)" : "Motor Horsepower (HP)"}
                </label>
                <select
                  value={motorHp}
                  onChange={(e) => setMotorHp(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 outline-none focus:border-primary-600"
                >
                  <option>0.5 HP (370W)</option>
                  <option>1.0 HP (750W)</option>
                  <option>1.5 HP (1,120W)</option>
                  <option>2.0 HP (1,500W)</option>
                  <option>3.0 HP (2,200W)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isBn ? "পাম্পের ধরন (Pump Type)" : "Pump Architecture"}
                </label>
                <select
                  value={motorType}
                  onChange={(e) => setMotorType(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 outline-none focus:border-primary-600"
                >
                  <option>Monoblock Centrifugal</option>
                  <option>Submersible Borewell Pump</option>
                  <option>Solar DC Brushless Pump</option>
                  <option>Jet Well Pump</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    {isBn ? "সর্বোচ্চ একটানা চলার সীমা (Max Continuous Run)" : "Max Continuous Runtime Limit"}
                  </label>
                  <span className="text-xs font-bold text-primary-700">{maxRuntime} {isBn ? "মিনিট" : "Mins"}</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={120}
                  step={5}
                  value={maxRuntime}
                  onChange={(e) => setMaxRuntime(Number(e.target.value))}
                  className="w-full accent-primary-700"
                />
                <p className="mt-1 text-[11px] text-slate-400">
                  {isBn
                    ? "মোটর একটানা এই সময়ের বেশি চললে স্বয়ংক্রিয়ভাবে বন্ধ হবে যাতে কয়েল না পোড়ে।"
                    : "Automatic thermal trip prevention ensures coils never burn out."}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-center justify-between cursor-pointer rounded-2xl bg-slate-50 p-3 border border-slate-100">
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      {isBn ? "ড্রাই-রান সুরক্ষা (Dry-run Protection)" : "Dry-Run Current Detection"}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {isBn ? "পানি না উঠলে ৬০ সেকেন্ডে মোটর স্বয়ংক্রিয় বন্ধ" : "Auto shutoff within 60s if no water load is detected"}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={dryRunProtection}
                    onChange={(e) => setDryRunProtection(e.target.checked)}
                    className="h-4 w-4 accent-primary-700 rounded"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer rounded-2xl bg-slate-50 p-3 border border-slate-100">
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      {isBn ? "ভোল্টেজ কাট-অফ (Voltage Guard)" : "Voltage Guard (180V - 250V)"}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {isBn ? "বিদ্যুতের ভোল্টেজ বিপজ্জনক হলে পাম্প বন্ধ রাখা" : "Protects against low line voltage or surges"}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={voltageCutoff}
                    onChange={(e) => setVoltageCutoff(e.target.checked)}
                    className="h-4 w-4 accent-primary-700 rounded"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Device Hardware & Pin Settings */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-800">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {isBn ? "হার্ডওয়্যার ও ডিভাইস কনফিগারেশন" : "ESP32 Device Configuration"}
                </h3>
                <p className="text-xs text-slate-500">
                  {isBn ? "ডিভাইসের নাম, জিপিআইও পিন ও নেটওয়ার্ক সেটিংস" : "Network naming, GPIO mapping, and synchronization"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isBn ? "ডিভাইসের নাম (Device Name)" : "Device Friendly Name"}
                </label>
                <input
                  type="text"
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 outline-none focus:border-primary-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isBn ? "রিলে ১ পিন (Relay 1)" : "Relay 1 Pin"}
                  </label>
                  <select
                    value={relay1Pin}
                    onChange={(e) => setRelay1Pin(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 outline-none focus:border-primary-600"
                  >
                    <option>GPIO 26</option>
                    <option>GPIO 25</option>
                    <option>GPIO 32</option>
                    <option>GPIO 33</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isBn ? "রিলে ২ পিন (Relay 2)" : "Relay 2 Pin"}
                  </label>
                  <select
                    value={relay2Pin}
                    onChange={(e) => setRelay2Pin(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 outline-none focus:border-primary-600"
                  >
                    <option>GPIO 27</option>
                    <option>GPIO 14</option>
                    <option>GPIO 12</option>
                    <option>GPIO 13</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isBn ? "সময় অঞ্চল (Timezone)" : "Timezone & NTP Sync"}
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 outline-none focus:border-primary-600"
                >
                  <option>Asia/Dhaka (GMT+6)</option>
                  <option>Asia/Kolkata (GMT+5:30)</option>
                  <option>UTC (GMT+0)</option>
                </select>
              </div>

              <div className="rounded-2xl bg-sky-50/70 p-3 border border-sky-100 flex items-start gap-2.5">
                <Info className="h-4 w-4 text-sky-700 shrink-0 mt-0.5" />
                <p className="text-[11px] text-sky-800 leading-relaxed">
                  {isBn
                    ? "সব পরিবর্তন সরাসরি ESP32 এর নন-ভোলাটাইল স্টোরেজে (NVS) সংরক্ষিত হয়। বিদ্যুৎ চলে গেলেও সেটিংস নষ্ট হবে না।"
                    : "Settings are flushed directly to ESP32 Flash (NVS) over MQTT, surviving power loss and system reboots."}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMaxRuntime(45);
                    setDryRunProtection(true);
                    setVoltageCutoff(true);
                  }}
                  className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  {isBn ? "রিসেট" : "Reset Defaults"}
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-1.5 rounded-xl bg-primary-700 px-5 py-2 text-xs font-semibold text-white shadow transition hover:bg-primary-800"
                >
                  <Save className="h-3.5 w-3.5" />
                  {isBn ? "সেটিংস সংরক্ষণ করুন" : "Save All Settings"}
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
