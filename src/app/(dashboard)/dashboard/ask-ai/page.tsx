"use client";

import React, { useState } from "react";
import { Bot, Send, Paperclip, ChevronDown, RefreshCw, Pencil, MapPin, Leaf, Target, BookOpen, Droplet, CloudRain, RotateCw, BarChart3 } from "lucide-react";
import { DashboardHeaderSlot } from "../../header-context";
import FilterBar from "@/Components/modules/Dashboord/FilterBar";

const suggestions = [
  "কেন এই রোপণের সময় পরামর্শ দেওয়া হয়েছে?",
  "আমি যদি ৩০ দিন আগে রোপণ করি?",
  "কম পানিতে কোন ফসল ভালো হবে?",
  "ফসল আবর্তন (crop rotation) কীভাবে করব?",
  "বৃষ্টিপাত দেরি হলে কী করব?",
  "Explain this result in simple English",
];

const resources = [
  { label: "Aman Rice Farming Guide", icon: BookOpen, tone: "text-primary-600" },
  { label: "Water Saving Techniques", icon: Droplet, tone: "text-rose-500" },
  { label: "Understanding Rainfall Patterns", icon: CloudRain, tone: "text-sky-500" },
  { label: "Crop Rotation Basics", icon: RotateCw, tone: "text-amber-500" },
];

interface Message { from: "bot" | "user"; text: string; showChartsCta?: boolean }

const initialMessages: Message[] = [
  {
    from: "bot",
    text:
      "Hello! I'm FieldShift AI 🌱\nI can help you understand climate trends, recommendations, and farming practices for your area. You can ask questions in Bangla or English.\n\nHere are some things you can ask:\n• Why is the recommended planting window 15 – 25 July?\n• What will happen if I plant earlier?\n• Which crop is better with less water?\n• How does rainfall affect Aman rice?\n• Tell me about crop rotation for my area.\n• Give me simple tips to save water.\n• Explain this result in simple Bangla.\n• Compare Aman rice and Boro rice.",
  },
];

export default function AskAiPage() {
  const [location] = useState("Rajshahi");
  const [crop] = useState("Aman Rice");
  const [priority] = useState("Save Water");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState<"BN" | "EN">("BN");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { from: "user", text },
      {
        from: "bot",
        text:
          "রাজশাহীতে আমন ধানের জন্য ১৫ – ২৫ জুলাই রোপণের পরামর্শ দেওয়া হয়েছে কারণ সাম্প্রতিক বছরে (২০১৩ – ২০২৫) বৃষ্টিপাতের শুরু আগের তুলনায় প্রায় ১১ দিন দেরিতে হয়েছে। এ সময় মাটিতে পর্যাপ্ত আর্দ্রতা থাকে, যা চারা রোপণের জন্য উপযুক্ত।\n\nএছাড়াও, এই সময়ে তাপমাত্রা এবং মাটির আর্দ্রতার অবস্থা ধানের ভালো বৃদ্ধির জন্য সহায়ক। যদি আপনি আরও বিস্তারিত জানতে চান, আমি চার্ট ও ডেটা দেখাতে পারি।",
        showChartsCta: true,
      },
    ]);
    setInput("");
  };

  return (
    <div className="space-y-6">
      <DashboardHeaderSlot>
        <FilterBar
          variant="bar"
          location={location}
          crop={crop}
          priority={priority}
          onLocationChange={() => {}}
          onCropChange={() => {}}
          onPriorityChange={() => {}}
          onSubmit={() => {}}
          hasResult
        />
      </DashboardHeaderSlot>

      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#fdf3e0] via-[#f3e0bd] to-[#2f4f38] px-6 py-8 sm:px-10">
        <h1 className="text-3xl font-semibold text-slate-900">Ask FieldShift AI</h1>
        <p className="mt-2 max-w-md text-sm text-slate-700">
          Get simple, practical answers to your farming questions using NASA data and our climate analysis. Ask in Bangla or English — anytime, anything.
        </p>
        <p className="mt-4 hidden -rotate-2 font-serif text-sm italic text-[#f4ead2] sm:block">
          Your Farming
          <br />
          Companion, Always Here.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        {/* Chat panel */}
        <div className="flex flex-col rounded-2xl border border-slate-100 bg-white">
          <div className="flex-1 space-y-4 overflow-y-auto p-5" style={{ maxHeight: 480 }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.from === "user" ? "flex-row-reverse" : ""}`}>
                <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${m.from === "bot" ? "bg-primary-100 text-primary-700" : "bg-primary-800 text-white"}`}>
                  {m.from === "bot" ? <Bot className="h-4 w-4" /> : "R"}
                </span>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${m.from === "bot" ? "bg-slate-50 text-slate-700" : "bg-primary-800 text-white"}`}>
                  {m.text}
                  {m.showChartsCta && (
                    <button className="mt-3 flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
                      <BarChart3 className="h-3.5 w-3.5" /> Show data and charts
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-slate-100 p-3">
            <button className="rounded-full p-2 text-slate-400 hover:bg-slate-50" aria-label="Attach file">
              <Paperclip className="h-4.5 w-4.5" />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Ask anything about your farm..."
              className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
            />
            <button onClick={() => setLang(lang === "BN" ? "EN" : "BN")} className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
              {lang} <ChevronDown className="h-3 w-3" />
            </button>
            <button onClick={() => send(input)} className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary-800 text-white">
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="pb-3 text-center text-[11px] text-slate-300">FieldShift AI may make mistakes. Please verify important decisions.</p>
        </div>

        {/* Right rail */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Bot className="h-4 w-4 text-primary-600" /> Suggested Questions
            </p>
            <div className="mt-3 space-y-2">
              {suggestions.map((s) => (
                <button key={s} onClick={() => send(s)} className="flex w-full items-center justify-between rounded-lg border border-slate-100 px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50">
                  {s}
                  <ChevronDown className="h-3.5 w-3.5 flex-shrink-0 -rotate-90 text-slate-300" />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">Current Context</p>
              <button className="flex items-center gap-1 text-xs font-medium text-primary-700">
                <Pencil className="h-3 w-3" /> Edit
              </button>
            </div>
            <div className="mt-3 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-500"><MapPin className="h-3.5 w-3.5" /> Location <span className="ml-auto font-medium text-slate-800">{location}</span></div>
              <div className="flex items-center gap-2 text-slate-500"><Leaf className="h-3.5 w-3.5" /> Crop <span className="ml-auto font-medium text-slate-800">{crop}</span></div>
              <div className="flex items-center gap-2 text-slate-500"><Target className="h-3.5 w-3.5" /> Priority <span className="ml-auto font-medium text-slate-800">{priority}</span></div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">Helpful Resources</p>
              <span className="text-xs font-medium text-primary-700">View All</span>
            </div>
            <div className="mt-3 space-y-2.5">
              {resources.map((r) => (
                <div key={r.label} className="flex items-center gap-2 text-xs text-slate-600">
                  <r.icon className={`h-3.5 w-3.5 ${r.tone}`} /> {r.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
