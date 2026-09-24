"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface AuthUser {
  name: string;
  email: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  ready: boolean;
  login: (name: string, email: string) => void;
  logout: () => void;
}

const CURRENT_USER_KEY = "fieldshift_current_user";
const USERS_KEY = "fieldshift_users"; // { [email]: name } — lets Sign In recall the name given at Sign Up

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(CURRENT_USER_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        window.localStorage.removeItem(CURRENT_USER_KEY);
      }
    }
    setReady(true);
  }, []);

  const login = (name: string, email: string) => {
    const nextUser = { name, email };
    setUser(nextUser);
    window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(nextUser));

    const usersRaw = window.localStorage.getItem(USERS_KEY);
    const users = usersRaw ? JSON.parse(usersRaw) : {};
    users[email] = name;
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem(CURRENT_USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, ready, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

/** If this email signed up before, return the name they used. Otherwise null. */
export function lookupNameByEmail(email: string): string | null {
  if (typeof window === "undefined") return null;
  const usersRaw = window.localStorage.getItem(USERS_KEY);
  if (!usersRaw) return null;
  try {
    const users = JSON.parse(usersRaw) as Record<string, string>;
    return users[email] || null;
  } catch {
    return null;
  }
}

/** Fallback display name derived from an email, e.g. "riyad@x.com" -> "Riyad" */
export function nameFromEmail(email: string): string {
  const prefix = email.split("@")[0] || "Farmer";
  return prefix.charAt(0).toUpperCase() + prefix.slice(1);
}

export function initials(name: string): string {
  return name.trim().charAt(0).toUpperCase() || "?";
}
