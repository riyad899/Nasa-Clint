"use client";

import React, { useState } from "react";
import { Caveat } from "next/font/google";
import {
  Layers,
  Cpu,
  Plus,
  ShieldCheck,
  Radio,
  MapPin,
  HardDrive,
  Settings,
  AlertCircle,
  CheckCircle2,
  X,
  Sparkles,
  Sliders,
  ChevronRight,
  Wifi,
} from "lucide-react";
import { TransparentNavSlot } from "../../header-context";
import { useLanguage } from "@/lib/language-context";

const script = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
});

interface DeviceItem {
  id: string;
  devEui: string;
  name: string;
  category: string;
  model: string;
  firmware: string;
  sector: string;
  deployedDate: string;
  battery: number;
  status: "active" | "standby" | "maintenance";
}

const initialDevices: DeviceItem[] = [
  {
    id: "DEV-101",
    devEui: "A8:61:0A:34:F1:C8",
    name: "Soil Moisture Array Pro",
    category: "Subsurface Sensor",
    model: "CropSense SM-4X",
    firmware: "v2.4.1",
    sector: "Sector 1 (East)",
    deployedDate: "14 Jul 2025",
    battery: 96,
    status: "active",
  },
  {
    id: "DEV-204",
    devEui: "A8:61:0A:48:B2:91",
    name: "Solar Micro-Station",
    category: "Weather Station",
    model: "AeroSense WS-PRO",
    firmware: "v2.4.2",
    sector: "Central Weather Mast",
    deployedDate: "02 Aug 2025",
    battery: 92,
    status: "active",
  },
  {
    id: "DEV-302",
    devEui: "A8:61:0A:77:E4:05",
    name: "Solar Flow Controller",
    category: "Irrigation Actuator",
    model: "HydroValve HV-2",
    firmware: "v2.3.8",
    sector: "Sector 1 Canal Gate",
    deployedDate: "20 Aug 2025",
    battery: 98,
    status: "active",
  },
  {
    id: "DEV-405",
    devEui: "A8:61:0A:99:A3:17",
    name: "Optical Canopy Monitor",
    category: "PAR & Leaf Sensor",
    model: "FloraScan L-10",
    firmware: "v2.4.0",
    sector: "Sector 2 (North)",
    deployedDate: "10 Sep 2025",
    battery: 89,
    status: "active",
  },
];

export default function DeviceOverviewPage() {
  const { lang } = useLanguage();
  const [devices, setDevices] = useState<DeviceItem[]>(initialDevices);
  const [isPairModalOpen, setIsPairModalOpen] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState("");
  const [newDeviceSector, setNewDeviceSector] = useState("Sector 1 (East)");
  const [newDeviceType, setNewDeviceType] = useState("Soil Moisture Probe");

  const handlePairDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeviceName.trim()) return;

    const newDev: DeviceItem = {
      id: `DEV-${Math.floor(100 + Math.random() * 900)}`,
      devEui: `A8:61:0A:${Math.floor(10 + Math.random() * 89)}:${Math.floor(10 + Math.random() * 89)}:${Math.floor(10 + Math.random() * 89)}`,
      name: newDeviceName.trim(),
      category: newDeviceType,
      model: "CropSense Gen-3",
      firmware: "v2.4.2",
      sector: newDeviceSector,
      deployedDate: "Just now",
      battery: 100,
      status: "active",
    };

    setDevices((prev) => [newDev, ...prev]);
    setNewDeviceName("");
    setIsPairModalOpen(false);
  };

  return (
    <div className="pb-24 sm:pb-12">
      <TransparentNavSlot />

      {/* ================= HERO ================= */}
      <section className="relative min-h-[300px] overflow-hidden bg-[#fbfcfa] sm:min-h-[320px]">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-[center_45%]"
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
              <Layers className="h-3.5 w-3.5" />
              {lang === "BN" ? "হার্ডওয়্যার অবকাঠামো" : "Hardware Infrastructure"}
            </p>

            <h1 className="text-3xl font-bold leading-tight text-white drop-shadow sm:text-4xl sm:font-semibold sm:text-slate-900 sm:drop-shadow-none">
              {lang === "BN" ? "ডিভাইস ওভারভিউ" : "Device Overview"}
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-white/90 drop-shadow sm:text-slate-600 sm:drop-shadow-none">
              {lang === "BN"
                ? "খামারের সম্পূর্ণ আইওটি ডিভাইস ইনভেন্টরি, ফার্মওয়্যার ব্যবস্থাপনা এবং নেটওয়ার্ক টপোলজি।"
                : "Manage your farm's IoT fleet inventory, firmware updates, device pairing, and sensor topology."}
            </p>
          </div>

          <p
            className={`${script.className} absolute right-6 top-20 hidden -rotate-2 text-2xl leading-6 text-white drop-shadow sm:right-10 sm:block sm:top-24`}
          >
            Connected Fields
            <br />
            Smarter Agriculture.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 -mt-8 space-y-6 px-4 sm:-mt-10 sm:px-6">
        {/* Gateway & Network Header */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-100 text-primary-800">
                <Radio className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-slate-900">
                    LoRaWAN Central Gateway (Tower North)
                  </h3>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-500">
                  Model: Multitech Conduit IP67 · Frequency: 915 MHz AS923 · Firmware: v2.4.2 · IP: 192.168.1.120
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsPairModalOpen(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary-800 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-primary-900"
            >
              <Plus className="h-4 w-4" />
              <span>{lang === "BN" ? "নতুন ডিভাইস পেয়ার করুন" : "Pair New Device"}</span>
            </button>
          </div>
        </div>

        {/* Farm Topology Layout Visualization */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary-700" />
              <h3 className="text-sm font-semibold text-slate-900">
                {lang === "BN" ? "ফিল্ড সেন্সর ম্যাপ ও টপোলজি" : "Field Sensor Map & Topology"}
              </h3>
            </div>
            <span className="text-xs text-slate-400">Rajshahi Field Block #4</span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900">Sector 1 (East)</span>
                <span className="text-[10px] font-medium text-emerald-700">Aman Rice · 3.5 Acres</span>
              </div>
              <p className="mt-2 text-xs text-slate-600">
                Active Sensors: <strong>2</strong> (Probe A1, Valve V1)
              </p>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-emerald-800">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                Soil moisture optimal for current stage
              </div>
            </div>

            <div className="rounded-xl border border-sky-100 bg-sky-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-900">Central Mast</span>
                <span className="text-[10px] font-medium text-sky-700">Weather & Solar Hub</span>
              </div>
              <p className="mt-2 text-xs text-slate-600">
                Active Sensors: <strong>1</strong> (Micro Weather Station W2)
              </p>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-sky-800">
                <CheckCircle2 className="h-3.5 w-3.5 text-sky-600" />
                Solar radiation: 820 W/m² (Peak growth)
              </div>
            </div>

            <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900">Sector 2 (North)</span>
                <span className="text-[10px] font-medium text-amber-700">Seasonal Pulses · 2.0 Acres</span>
              </div>
              <p className="mt-2 text-xs text-slate-600">
                Active Sensors: <strong>1</strong> (Canopy Monitor L1)
              </p>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-amber-800">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-600" />
                No moisture stress detected
              </div>
            </div>
          </div>
        </div>

        {/* Device Fleet Table */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between pb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                {lang === "BN" ? "সংযুক্ত ডিভাইস তালিকা" : "Paired Fleet Inventory"}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === "BN"
                  ? "সকল সক্রিয় সেন্সর হার্ডওয়্যার আইডি ও ফার্মওয়্যার বিবরণ"
                  : "Hardware IDs, MAC addresses, and operational status for all field assets"}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-100 text-[11px] font-semibold text-slate-400">
                <tr>
                  <th className="pb-3">Device Name & Model</th>
                  <th className="pb-3">DevEUI / Hardware ID</th>
                  <th className="pb-3">Field Sector</th>
                  <th className="pb-3">Firmware</th>
                  <th className="pb-3">Battery</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {devices.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3.5">
                      <div className="font-semibold text-slate-800">{d.name}</div>
                      <div className="text-[11px] text-slate-400">{d.model} · {d.category}</div>
                    </td>
                    <td className="py-3.5 font-mono text-[11px] text-slate-500">{d.devEui}</td>
                    <td className="py-3.5 font-medium text-slate-700">{d.sector}</td>
                    <td className="py-3.5">
                      <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-600">
                        {d.firmware}
                      </span>
                    </td>
                    <td className="py-3.5 font-semibold text-emerald-700">{d.battery}%</td>
                    <td className="py-3.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= PAIR DEVICE MODAL ================= */}
      {isPairModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-semibold text-slate-900">
                {lang === "BN" ? "নতুন সেন্সর পেয়ার করুন" : "Pair New Field Sensor"}
              </h3>
              <button
                onClick={() => setIsPairModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handlePairDevice} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600">
                  {lang === "BN" ? "ডিভাইসের নাম" : "Device Friendly Name"}
                </label>
                <input
                  type="text"
                  required
                  value={newDeviceName}
                  onChange={(e) => setNewDeviceName(e.target.value)}
                  placeholder="e.g. South Paddy Moisture Sensor"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600">
                  {lang === "BN" ? "ডিভাইস ধরন" : "Device Type"}
                </label>
                <select
                  value={newDeviceType}
                  onChange={(e) => setNewDeviceType(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                >
                  <option>Soil Moisture Probe</option>
                  <option>Micro Weather Node</option>
                  <option>Smart Irrigation Gate Valve</option>
                  <option>Canopy & Leaf Wetness Sensor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600">
                  {lang === "BN" ? "খামার এলাকা / সেক্টর" : "Field Sector"}
                </label>
                <select
                  value={newDeviceSector}
                  onChange={(e) => setNewDeviceSector(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                >
                  <option>Sector 1 (East) - Aman Rice</option>
                  <option>Sector 2 (North) - Pulses</option>
                  <option>Sector 3 (West) - Vegetables</option>
                  <option>Canal Gate Feeder</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPairModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-primary-800 px-4 py-2 text-xs font-semibold text-white hover:bg-primary-900"
                >
                  Complete Pairing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
