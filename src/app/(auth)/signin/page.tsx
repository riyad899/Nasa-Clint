"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Leaf, AlertCircle } from "lucide-react";
import { useAuth, lookupNameByEmail, nameFromEmail } from "@/lib/auth-context";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  email?: string;
  password?: string;
}

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!email.trim()) next.email = "Email is required.";
    else if (!EMAIL_REGEX.test(email)) next.email = "Enter a valid email address.";

    if (!password) next.password = "Password is required.";
    else if (password.length < 6) next.password = "Password must be at least 6 characters.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!validate()) return;

    setLoading(true);
    // Simulated authentication call — swap this block for your real API request.
    setTimeout(() => {
      setLoading(false);

      // Demo credential check. Replace with a real backend call.
      if (password.length < 6) {
        setFormError("Incorrect email or password. Please try again.");
        return;
      }

      if (remember && typeof window !== "undefined") {
        window.localStorage.setItem("fieldshift_email", email);
      }
      const resolvedName = lookupNameByEmail(email.trim()) || nameFromEmail(email.trim());
      login(resolvedName, email.trim());
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="rounded-2xl border border-primary-100 bg-white p-6 shadow-xl shadow-primary-900/5 sm:p-8">
      <div className="text-center">
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-primary-100 text-primary-700">
          <Leaf className="h-5 w-5" />
        </span>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">Welcome Back</h2>
        <p className="mt-1.5 text-xs text-slate-500">
          Sign in to access your farm analyses and recommendations
        </p>
      </div>

      {formError && (
        <div className="mt-5 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-slate-600">Email Address</label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:ring-2 ${
                errors.email ? "border-rose-300 focus:ring-rose-100" : "border-slate-200 focus:border-primary-400 focus:ring-primary-100"
              }`}
            />
          </div>
          {errors.email && <p className="mt-1 text-[11px] text-rose-600">{errors.email}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-xs font-medium text-slate-600">Password</label>
            <Link href="#" className="text-xs font-medium text-primary-700 hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:ring-2 ${
                errors.password ? "border-rose-300 focus:ring-rose-100" : "border-slate-200 focus:border-primary-400 focus:ring-primary-100"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-[11px] text-rose-600">{errors.password}</p>}
        </div>

        <label className="flex items-center gap-2 text-xs text-slate-500">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-primary-700 focus:ring-primary-400"
          />
          Remember me on this device
        </label>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-800 py-3 text-sm font-semibold text-white transition hover:bg-primary-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <span>Signing In...</span>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-slate-500">
        Don&apos;t have an account yet?{" "}
        <Link href="/signup" className="font-semibold text-primary-700 hover:underline">
          Create Account
        </Link>
      </div>
    </div>
  );
}
