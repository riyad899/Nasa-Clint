"use client";

import React from "react";
import { MapPin, Leaf, Target, Search, RotateCw, ChevronDown } from "lucide-react";

export const LOCATIONS = ["Rajshahi", "Mymensingh", "Rangpur"];
export const CROPS = ["Aman Rice", "Boro Rice", "Maize"];
export const PRIORITIES = ["Save Water", "Maximize Yield", "Climate Resilience"];

interface FilterBarProps {
  location: string;
  crop: string;
  priority: string;
  onLocationChange: (v: string) => void;
  onCropChange: (v: string) => void;
  onPriorityChange: (v: string) => void;
  onSubmit: () => void;
  hasResult?: boolean;
  variant?: "card" | "bar";
}

function Field({
  label,
  icon: Icon,
  value,
  options,
  placeholder,
  onChange,
}: {
  label: string;
  icon: React.ElementType;
  value: string;
  options: string[];
  placeholder: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex-1 min-w-[150px]">
      <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </label>
      <div className="relative mt-1">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm font-medium text-slate-800 outline-none focus:border-primary-400"
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  );
}

export default function FilterBar({
  location, crop, priority,
  onLocationChange, onCropChange, onPriorityChange,
  onSubmit, hasResult, variant = "bar",
}: FilterBarProps) {
  const ready = location && crop && priority;

  return (
    <div
      className={
        variant === "card"
          ? "flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-lg sm:flex-row sm:items-end"
          : "flex flex-col gap-3 rounded-xl border border-slate-100 bg-white p-3 sm:flex-row sm:items-end"
      }
    >
      <Field label="Location" icon={MapPin} value={location} options={LOCATIONS} placeholder="Select Location" onChange={onLocationChange} />
      <Field label="Crop" icon={Leaf} value={crop} options={CROPS} placeholder="Select Crop" onChange={onCropChange} />
      <Field label="Farm Priority" icon={Target} value={priority} options={PRIORITIES} placeholder="Select Priority" onChange={onPriorityChange} />

      <button
        onClick={onSubmit}
        disabled={!ready}
        className="flex flex-shrink-0 items-center justify-center gap-2 rounded-lg bg-primary-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-900 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
      >
        {hasResult ? <RotateCw className="h-4 w-4" /> : <Search className="h-4 w-4" />}
        {hasResult ? "Update Analysis" : "Analyze"}
      </button>
    </div>
  );
}
