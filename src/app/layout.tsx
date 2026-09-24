import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: {
    template: "%s | FieldShift",
    default: "FieldShift — Farms Today. A Safer Tomorrow.",
  },
  description:
    "FieldShift turns NASA Earth observation data into simple, practical climate insights so farmers can adapt, plan, and grow with confidence.",
  keywords: [
    "climate smart farming",
    "NASA earth data",
    "crop planning",
    "farm climate analysis",
    "agriculture insights",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full bg-white text-slate-900 antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
