"use client";

import React, { useState } from "react";
import { Caveat } from "next/font/google";
import { Satellite, CloudRain, Sprout, Leaf, RotateCw, Droplet, CloudLightning, Play, ChevronRight, ArrowRight } from "lucide-react";
import { TransparentNavSlot } from "../../header-context";
import AskAiBar from "@/Components/modules/Dashboord/AskAiBar";

// Handwritten font — same one used across the app for consistency
const script = Caveat({ subsets: ["latin"], weight: ["500", "600"] });

const topics = ["All Topics", "NASA Data", "Climate & Weather", "Crops & Farming", "Soil & Water", "Sustainability"];

// NOTE: these use gradient + icon placeholders. Swap the `from`/`to` classes
// for a `backgroundImage` (same workflow as your other hero photos — generate
// with ChatGPT, upload to ibb.co, paste the URL) to get the real photo
// thumbnails shown in the reference image (satellite in space, rain over a
// field, a seedling in soil, an aerial green field).
const guides = [
  {
    title: "What is NASA Earth Data?",
    desc: "Learn how satellite data helps us understand climate and support farming.",
    read: "5 min read",
    
    from: "from-sky-400",
    to: "to-indigo-700",
    image:
      "https://i.ibb.co.com/1GDRVzB6/Space.jpg",
  },

  {
    title: "How Rainfall Affects Crops",
    desc: "Understand rainfall patterns, seasonal changes, and their impact on crop timing.",
    read: "4 min read",
    
    from: "from-slate-400",
    to: "to-slate-600",
    image:
      "https://i.ibb.co.com/F4WJBLnQ/Download-Free-Vectors-Images-Photos-Vecteezy.jpg",
  },

  {
    title: "Soil Moisture and Plant Health",
    desc: "See how soil moisture influences growth and yield.",
    read: "4 min read",
    
    from: "from-amber-700",
    to: "to-primary-800",
    image:
      "https://i.ibb.co.com/9mb9Lx9T/Seasonal-soil-care.jpg",
  },

  {
    title: "What is NDVI?",
    desc: "Learn how vegetation index shows plant health from space.",
    read: "3 min read",
    
    from: "from-primary-400",
    to: "to-primary-800",
    image:
      "https://i.ibb.co.com/LL2MgDh/NDVI-image-The-field-has-a-great-amount-of-stress-in-the-northern-area.jpg",
  },
];

const practices = [
  { title: "Crop Rotation Basics", desc: "Learn how crop rotation improves soil health and reduces risks.", read: "4 min read", icon: RotateCw, tone: "bg-primary-100 text-primary-700" },
  { title: "Water Saving Techniques", desc: "Practical tips to use water efficiently in your farm.", read: "4 min read", icon: Droplet, tone: "bg-sky-100 text-sky-600" },
  { title: "Climate-Resilient Crops", desc: "Explore crops that perform better in changing climate conditions.", read: "6 min read", icon: Sprout, tone: "bg-emerald-100 text-emerald-600" },
  { title: "Preparing for Extreme Weather", desc: "Learn how to protect your farm from floods, droughts and heatwaves.", read: "5 min read", icon: CloudLightning, tone: "bg-indigo-100 text-indigo-600" },
];

// NOTE: same as guides above — swap gradients for real thumbnail photos when you have them.
const videos = [
  { title: "Understanding Seasonal Rainfall", duration: "6:12", from: "from-slate-600", to: "to-slate-900" },
  { title: "Soil Health for Better Yield (বাংলা)", duration: "4:35", from: "from-amber-800", to: "to-primary-900" },
  { title: "Water Management Tips (English)", duration: "5:20", from: "from-primary-500", to: "to-primary-900" },
];

export default function LearnPage() {
  const [activeTopic, setActiveTopic] = useState("All Topics");

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
          <div className="max-w-lg">
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Learn</h1>

            <p className="mt-1 text-base font-medium text-slate-700">
              Simple guides for smarter, climate-resilient farming.
            </p>

            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">
              Explore topics on climate, crops, soil, and NASA data — explained
              in simple language, with real examples.
            </p>
          </div>

          <p
            className={`${script.className} absolute right-6 top-20 hidden -rotate-2 text-2xl leading-6 text-white drop-shadow sm:right-10 sm:block sm:top-24`}
          >
            Knowledge Today
            <br />
            Healthier Fields Tomorrow.
          </p>
        </div>
      </section>

      {/* Content wrapper */}
      <div className="relative -mt-6 z-10 space-y-6 px-4 sm:px-6">

      <div className="flex flex-wrap gap-2">
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTopic(t)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
              activeTopic === t ? "bg-primary-800 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">Featured Learning Guides</h2>
          <button className="flex items-center gap-1 text-xs font-semibold text-blue-600">View All <ArrowRight className="h-3.5 w-3.5" /></button>
        </div>
       <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
  {guides.map((g) => (
    <div
      key={g.title}
      className="overflow-hidden rounded-2xl border border-slate-100 bg-white"
    >
      {/* Image */}
      <div
        className="relative h-28 bg-cover bg-center"
        style={{ backgroundImage: `url(${g.image})` }}
      >
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative flex h-full items-center justify-center">
          
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-sm font-semibold text-slate-900">{g.title}</p>

        <p className="mt-1 text-xs leading-relaxed text-slate-400">
          {g.desc}
        </p>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          {g.read}
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  ))}
</div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">Farming Practices</h2>
          <button className="flex items-center gap-1 text-xs font-semibold text-blue-600">View All <ArrowRight className="h-3.5 w-3.5" /></button>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {practices.map((p) => (
            <div key={p.title} className="rounded-2xl border border-slate-100 bg-white p-4">
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${p.tone}`}>
                <p.icon className="h-4.5 w-4.5" />
              </span>
              <p className="mt-3 text-sm font-semibold text-slate-900">{p.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">{p.desc}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                {p.read}
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">Video Tutorials</h2>
          <button className="flex items-center gap-1 text-xs font-semibold text-blue-600">View All <ArrowRight className="h-3.5 w-3.5" /></button>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {videos.map((v) => (
            <div key={v.title} className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
              <div className={`relative flex h-32 items-center justify-center bg-gradient-to-br ${v.from} ${v.to}`}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-primary-800">
                  <Play className="h-4 w-4 fill-current" />
                </span>
                <span className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">{v.duration}</span>
              </div>
              <p className="p-3 text-sm font-medium text-slate-800">{v.title}</p>
            </div>
          ))}
        </div>
      </section>

      <AskAiBar title="Ask FieldShift AI" subtitle="Get simple explanations, farming tips, or learn more about any topic in Bangla or English." placeholder="e.g. What is NDVI?" />
      </div>
    </div>
  );
}