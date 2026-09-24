"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ArrowRight, Eye, EyeOff, Leaf, Check } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

export default function SignUpPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const passwordChecks = {
    length: password.length >= 8,
    number: /\d/.test(password),
    letter: /[a-zA-Z]/.test(password),
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!name.trim()) next.name = "Full name is required.";

    if (!email.trim()) next.email = "Email is required.";
    else if (!EMAIL_REGEX.test(email)) next.email = "Enter a valid email address.";

    if (!password) next.password = "Password is required.";
    else if (!passwordChecks.length || !passwordChecks.number || !passwordChecks.letter) {
      next.password = "Password doesn't meet the requirements below.";
    }

    if (!confirmPassword) next.confirmPassword = "Please confirm your password.";
    else if (confirmPassword !== password) next.confirmPassword = "Passwords do not match.";

    if (!agreedToTerms) next.terms = "You must agree to the Terms & Privacy Policy.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulated registration call — swap this block for your real API request.
    setTimeout(() => {
      setLoading(false);
      login(name.trim(), email.trim());
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="rounded-2xl border border-primary-100 bg-white p-6 shadow-xl shadow-primary-900/5 sm:p-8">
      <div className="text-center">
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-primary-100 text-primary-700">
          <Leaf className="h-5 w-5" />
        </span>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">Create Account</h2>
        <p className="mt-1.5 text-xs text-slate-500">
          Join FieldShift to get NASA-powered climate insights for your farm
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-xs font-medium text-slate-600">Full Name</label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:ring-2 ${
                errors.name ? "border-rose-300 focus:ring-rose-100" : "border-slate-200 focus:border-primary-400 focus:ring-primary-100"
              }`}
            />
          </div>
          {errors.name && <p className="mt-1 text-[11px] text-rose-600">{errors.name}</p>}
        </div>

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
          <label htmlFor="password" className="block text-xs font-medium text-slate-600">Password</label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
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
          {password.length > 0 && (
            <div className="mt-2 space-y-1">
              {[
                { ok: passwordChecks.length, label: "At least 8 characters" },
                { ok: passwordChecks.letter, label: "Contains a letter" },
                { ok: passwordChecks.number, label: "Contains a number" },
              ].map((c) => (
                <p key={c.label} className={`flex items-center gap-1.5 text-[11px] ${c.ok ? "text-primary-700" : "text-slate-400"}`}>
                  <Check className={`h-3 w-3 ${c.ok ? "opacity-100" : "opacity-30"}`} /> {c.label}
                </p>
              ))}
            </div>
          )}
          {errors.password && <p className="mt-1 text-[11px] text-rose-600">{errors.password}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-xs font-medium text-slate-600">Confirm Password</label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:ring-2 ${
                errors.confirmPassword ? "border-rose-300 focus:ring-rose-100" : "border-slate-200 focus:border-primary-400 focus:ring-primary-100"
              }`}
            />
          </div>
          {errors.confirmPassword && <p className="mt-1 text-[11px] text-rose-600">{errors.confirmPassword}</p>}
        </div>

        <div>
          <label className="flex items-start gap-2 text-xs text-slate-500">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-primary-700 focus:ring-primary-400"
            />
            <span>I agree to FieldShift&apos;s Terms of Service and Privacy Policy.</span>
          </label>
          {errors.terms && <p className="mt-1 text-[11px] text-rose-600">{errors.terms}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-800 py-3 text-sm font-semibold text-white transition hover:bg-primary-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <span>Creating Account...</span>
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-slate-500">
        Already have an account?{" "}
        <Link href="/signin" className="font-semibold text-primary-700 hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}
