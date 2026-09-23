import React from "react";
import Link from "next/link";
import { Laptop, Mail, Phone, MapPin, Heart, Shield, Cpu, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600">
      {/* Feature Highlights */}
      <div className="border-b border-slate-100 bg-slate-50/60 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Custom Built Rigs</h4>
                <p className="text-xs text-slate-500">Tailored to exact benchmarks</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">3-Year Warranty</h4>
                <p className="text-xs text-slate-500">Certified parts & labor</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Express Delivery</h4>
                <p className="text-xs text-slate-500">Same-day local dispatch</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Expert Support</h4>
                <p className="text-xs text-slate-500">24/7 technical hotline</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Laptop className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Tech<span className="text-blue-600">Space</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 max-w-sm">
              Your trusted partner for high-performance computing, AI workstations, custom water-cooled desktop rigs, and enterprise IT hardware.
            </p>
            <div className="space-y-2 text-sm text-slate-600">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0" />
                450 Innovation Parkway, Tech District, TX
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-600 flex-shrink-0" />
                +1 (800) 555-TECH (8324)
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-600 flex-shrink-0" />
                support@techspacecomputers.com
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Hardware</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Gaming Desktops</Link></li>
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Workstation PCs</Link></li>
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Custom Water Cooling</Link></li>
              <li><Link href="/" className="hover:text-blue-600 transition-colors">GPUs & Processors</Link></li>
              <li><Link href="/" className="hover:text-blue-600 transition-colors">High-Refresh Monitors</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Portals</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/signin" className="hover:text-blue-600 transition-colors">Customer Login</Link></li>
              <li><Link href="/signup" className="hover:text-blue-600 transition-colors">Register Account</Link></li>
              <li><Link href="/verify-email" className="hover:text-blue-600 transition-colors">Verify Email</Link></li>
              <li><Link href="/auth" className="hover:text-blue-600 transition-colors">Auth Hub</Link></li>
              <li><Link href="/dashboard" className="text-blue-600 font-medium hover:underline">Dashboard Portal</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Store Hours</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-500">
              <li className="flex justify-between">
                <span>Mon - Fri:</span>
                <span className="font-medium text-slate-800">9:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span className="font-medium text-slate-800">10:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-medium text-slate-800">Closed</span>
              </li>
            </ul>
            <div className="mt-5 rounded-lg bg-blue-50 p-3 text-xs text-blue-800 border border-blue-100">
              ⚡ Local repair lab open on weekends by appointment.
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-100 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} TechSpace Computers. All rights reserved.</p>
          <div className="mt-4 flex space-x-6 sm:mt-0">
            <Link href="/" className="hover:text-slate-700">Privacy Policy</Link>
            <Link href="/" className="hover:text-slate-700">Terms of Service</Link>
            <Link href="/" className="hover:text-slate-700">Warranty Registration</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
