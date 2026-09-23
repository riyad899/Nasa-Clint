import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | TechSpace Computers",
    default: "TechSpace Computers — High Performance Systems & Workstations",
  },
  description:
    "Leading computer store specializing in custom high-performance desktops, AI workstations, gaming laptops, and certified electronics.",
  keywords: [
    "computer shop near me",
    "gaming pc",
    "custom workstation",
    "tech hardware",
    "electronics store",
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
        {children}
      </body>
    </html>
  );
}
