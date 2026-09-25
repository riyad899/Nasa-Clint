"use client";

import React from "react";
import Link from "next/link";
import { Bot, Send } from "lucide-react";

export default function AskAiBar({
  title = "Have a question? Ask FieldShift AI",
  subtitle = "Get simple explanations, farming tips, or learn how it works in Bangla or English.",
  placeholder = "e.g. Rajshahi te Aman dhan kokhon ropon korbo?",
}: {
  title?: string;
  subtitle?: string;
  placeholder?: string;
}) {
  return (
    <div className="static flex w-full flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700">
          <Bot className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>
      </div>
      <Link
        href="/dashboard/ask-ai"
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-400 sm:w-80"
      >
        <span className="flex-1 truncate text-left">{placeholder}</span>
        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary-700 text-white">
          <Send className="h-3.5 w-3.5" />
        </span>
      </Link>
    </div>
  );
}
