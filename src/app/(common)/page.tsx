import React from "react";
import Link from "next/link";
import { 
  Laptop, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Award, 
  Server, 
  CheckCircle2,
  ChevronRight,
  Gauge
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Apex Cyber Titan X9",
    category: "Extreme Gaming Rig",
    specs: "Core i9-14900KS • RTX 4090 24GB • 64GB DDR5 • 4TB NVMe",
    price: "$3,499.00",
    badge: "Bestseller",
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    id: 2,
    name: "Precision AI Studio Max",
    category: "Deep Learning Workstation",
    specs: "Dual RTX 6000 Ada • Threadripper PRO 96-Core • 256GB ECC RAM",
    price: "$8,999.00",
    badge: "Enterprise",
    gradient: "from-purple-600 to-indigo-600",
  },
  {
    id: 3,
    name: "Valkyrie Stealth Blade 16",
    category: "Pro Gaming Laptop",
    specs: "16\" OLED 240Hz • RTX 4080 • Ryzen 9 7945HX • 32GB RAM",
    price: "$2,299.00",
    badge: "New Release",
    gradient: "from-emerald-600 to-teal-600",
  },
  {
    id: 4,
    name: "Quantum Liquid Custom Loop",
    category: "Custom Hardline Watercooled",
    specs: "Custom Monoblock • Dual 480mm Radiators • RTX 4090 OC",
    price: "$4,799.00",
    badge: "Custom Lab",
    gradient: "from-cyan-600 to-blue-600",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold text-blue-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Next-Gen Intel Core & RTX 40 Series In Stock</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Engineered for <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Extreme</span> Performance
              </h1>

              <p className="max-w-2xl text-base text-slate-300 sm:text-lg">
                Discover bespoke custom rigs, enterprise AI workstations, and high-frequency trading terminals built with hand-binned silicon and stress-tested for 72 hours straight.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-500 transition-all"
                >
                  <Gauge className="h-4 w-4" />
                  Explore Admin Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition-all"
                >
                  Create Member Account
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800 text-left">
                <div>
                  <div className="text-2xl font-bold text-white">99.9%</div>
                  <div className="text-xs text-slate-400">Benchmark Stability</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">3 Years</div>
                  <div className="text-xs text-slate-400">Comprehensive Care</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">Same Day</div>
                  <div className="text-xs text-slate-400">Ready Systems Dispatch</div>
                </div>
              </div>
            </div>

            {/* Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-slate-700/60 bg-gradient-to-b from-slate-800/80 to-slate-900/80 p-6 shadow-2xl backdrop-blur">
                <div className="flex items-center justify-between border-b border-slate-700/50 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-500"></span>
                    <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                    <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">spec_status: PASS</span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between rounded-xl bg-slate-950/60 p-4 border border-slate-800">
                    <div className="flex items-center gap-3">
                      <Cpu className="h-5 w-5 text-blue-400" />
                      <div>
                        <div className="text-xs font-semibold text-slate-200">CPU Benchmark</div>
                        <div className="text-[11px] text-slate-400">i9-14900KS @ 6.2 GHz</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400">100% Score</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-slate-950/60 p-4 border border-slate-800">
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-amber-400" />
                      <div>
                        <div className="text-xs font-semibold text-slate-200">Thermals & Acoustics</div>
                        <div className="text-[11px] text-slate-400">Full Load Under 62°C</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400">Ultra-Quiet</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-slate-950/60 p-4 border border-slate-800">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5 text-purple-400" />
                      <div>
                        <div className="text-xs font-semibold text-slate-200">QA Stress Certification</div>
                        <div className="text-[11px] text-slate-400">72-Hour Burn-in test</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-blue-400">Certified</span>
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-center">
                  <div className="text-xs font-medium uppercase tracking-wider text-blue-100">Layout Demo</div>
                  <div className="text-sm font-semibold text-white">This page is inside the Common Layout</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rigs Section */}
      <section id="featured" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600">Featured Builds</div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Flagship Series Systems
            </h2>
          </div>
          <Link
            href="/signin"
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Sign in to configure custom build <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700">
                    {item.badge}
                  </span>
                  <div className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${item.gradient}`}></div>
                </div>

                <h3 className="mt-4 font-bold text-slate-900 text-lg leading-snug">
                  {item.name}
                </h3>
                <p className="mt-1 text-xs font-medium text-slate-500">{item.category}</p>

                <p className="mt-3 text-xs leading-relaxed text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {item.specs}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] text-slate-400">Starting from</span>
                  <span className="text-lg font-bold text-slate-900">{item.price}</span>
                </div>
                <Link
                  href="/dashboard"
                  className="rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-600 transition-colors"
                >
                  Inspect
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation Matrix Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Experience All 3 Layouts</h3>
          <p className="mt-1 text-sm text-slate-500">
            Click any button below to see the dedicated layout in action:
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Link
              href="/"
              className="flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50/50 p-4 text-blue-900 hover:bg-blue-50 transition"
            >
              <div>
                <p className="font-semibold text-sm">1. Common Layout</p>
                <p className="text-xs text-blue-600 mt-0.5">Navbar + Schema + Footer (Current)</p>
              </div>
              <CheckCircle2 className="h-5 w-5 text-blue-600" />
            </Link>

            <Link
              href="/signin"
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-900 hover:bg-slate-100 transition"
            >
              <div>
                <p className="font-semibold text-sm">2. Auth Layout</p>
                <p className="text-xs text-slate-500 mt-0.5">No Navbar, No Footer (Full Focus)</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-400" />
            </Link>

            <Link
              href="/dashboard"
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-900 hover:bg-slate-100 transition"
            >
              <div>
                <p className="font-semibold text-sm">3. Dashboard Layout</p>
                <p className="text-xs text-slate-500 mt-0.5">Static Sidebar + Top Bar Console</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-400" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
