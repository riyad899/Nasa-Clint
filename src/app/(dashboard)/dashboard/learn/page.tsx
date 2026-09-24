"use client";

import React, { useState } from "react";
import { Satellite, CloudRain, Sprout, Leaf, RotateCw, Droplet, CloudLightning, Play, ChevronRight, ArrowRight } from "lucide-react";
import AskAiBar from "@/Components/modules/Dashboord/AskAiBar";

const topics = ["All Topics", "NASA Data", "Climate & Weather", "Crops & Farming", "Soil & Water", "Sustainability"];

const guides = [
  { title: "What is NASA Earth Data?", desc: "Learn how satellite data helps us understand climate and support farming.", read: "5 min read", icon: Satellite, from: "from-sky-400", to: "to-indigo-700" },
  { title: "How Rainfall Affects Crops", desc: "Understand rainfall patterns, seasonal changes, and their impact on crop timing.", read: "4 min read", icon: CloudRain, from: "from-slate-400", to: "to-slate-600" },
  { title: "Soil Moisture and Plant Health", desc: "See how soil moisture influences growth and yield.", read: "4 min read", icon: Sprout, from: "from-amber-700", to: "to-primary-800" },
  { title: "What is NDVI?", desc: "Learn how vegetation index shows plant health from space.", read: "3 min read", icon: Leaf, from: "from-primary-400", to: "to-primary-800" },
];

const practices = [
  { title: "Crop Rotation Basics", desc: "Learn how crop rotation improves soil health and reduces risks.", read: "4 min read", icon: RotateCw, tone: "bg-primary-100 text-primary-700" },
  { title: "Water Saving Techniques", desc: "Practical tips to use water efficiently in your farm.", read: "4 min read", icon: Droplet, tone: "bg-sky-100 text-sky-600" },
  { title: "Climate-Resilient Crops", desc: "Explore crops that perform better in changing climate conditions.", read: "6 min read", icon: Sprout, tone: "bg-emerald-100 text-emerald-600" },
  { title: "Preparing for Extreme Weather", desc: "Learn how to protect your farm from floods, droughts and heatwaves.", read: "5 min read", icon: CloudLightning, tone: "bg-indigo-100 text-indigo-600" },
];

const videos = [
  { title: "Understanding Seasonal Rainfall", duration: "6:12", from: "from-slate-600", to: "to-slate-900" },
  { title: "Soil Health for Better Yield (বাংলা)", duration: "4:35", from: "from-amber-800", to: "to-primary-900" },
  { title: "Water Management Tips (English)", duration: "5:20", from: "from-primary-500", to: "to-primary-900" },
];

export default function LearnPage() {
  const [activeTopic, setActiveTopic] = useState("All Topics");

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#fdf3e0] via-[#f3e0bd] to-[#2f4f38] px-6 py-8 sm:px-10">
        <h1 className="text-3xl font-semibold text-slate-900">Learn</h1>
        <p className="mt-2 max-w-md text-sm text-slate-700">
          Simple guides for smarter, climate-resilient farming. Explore topics on climate, crops, soil, and NASA data — explained in simple language, with real examples.
        </p>
        <p className="mt-4 hidden -rotate-2 font-serif text-sm italic text-[#f4ead2] sm:block">
          Knowledge Today
          <br />
          Healthier Fields Tomorrow.
        </p>
      </section>

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
          <button className="flex items-center gap-1 text-xs font-semibold text-primary-700">View All <ArrowRight className="h-3.5 w-3.5" /></button>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guides.map((g) => (
            <div key={g.title} className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
              <div className={`flex h-28 items-center justify-center bg-gradient-to-br ${g.from} ${g.to}`}>
                <g.icon className="h-8 w-8 text-white/90" />
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-slate-900">{g.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">{g.desc}</p>
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
          <button className="flex items-center gap-1 text-xs font-semibold text-primary-700">View All <ArrowRight className="h-3.5 w-3.5" /></button>
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
          <button className="flex items-center gap-1 text-xs font-semibold text-primary-700">View All <ArrowRight className="h-3.5 w-3.5" /></button>
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
  );
}