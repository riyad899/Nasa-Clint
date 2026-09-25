"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  CloudSun,
  ClipboardCheck,
  HelpCircle,
  BotMessageSquare,
  BookOpen,
  Info,
  X,
  Leaf,
} from "lucide-react";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Climate Analysis", href: "/dashboard/climate-analysis", icon: CloudSun },
  { label: "Recommendations", href: "/dashboard/recommendations", icon: ClipboardCheck },
  { label: "Why This Result?", href: "/dashboard/why-this-result", icon: HelpCircle },
  { label: "Ask FieldShift AI", href: "/dashboard/ask-ai", icon: BotMessageSquare },
  { label: "Learn", href: "/dashboard/learn", icon: BookOpen },
  { label: "About", href: "/dashboard/about", icon: Info },
];

export default function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-56 flex-col  bg-slate-50 transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
  <div className="flex h-[76px] items-center justify-between  px-2">
  <Link href="/" className="relative flex items-center">
    {/* Leaf Image */}
    <Image
      src="/Green%20Leaf.png"
      alt="FieldShift"
      width={70}
      height={70}
      className="h-15 w-15 shrink-0 object-contain"
      priority
    />

    {/* Text over image */}
    <div className="absolute left-[55px] top-1/2 -translate-y-1/2 whitespace-nowrap">
      <span className="block text-[20px] font-semibold leading-none text-slate-900">
        FieldShift
      </span>

      <span className="mt-1 block text-[9px] leading-none text-primary-600">
        Adapting Farms with NASA Data
      </span>
    </div>
  </Link>

  <button
    onClick={onClose}
    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 md:hidden"
    aria-label="Close sidebar"
  >
    <X className="h-5 w-5" />
  </button>
</div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => window.innerWidth < 768 && onClose()}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-primary-50 font-medium text-primary-800"
                    : "font-normal text-slate-600 hover:bg-primary-50/60"
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-primary-700" : "text-slate-400"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="relative h-[106px]  bg-[#f4f8fb] px-4 py-3">
          {/* Decorative plant image, sitting behind/to the side */}
          <img
            src="/Leaf.png"
            alt=""
            className="pointer-events-none absolute right-[70px] top-[-100px] bottom-1 h-[200px] w-[140px] object-contain mix-blend-multiply"
          />

          {/* Text sits on top, offset so it doesn't collide with the leaf */}
          <div className="relative z-10 ml-12 mt-[-30px] pt-[-50px]">
            <p className="max-w-[150px] text-[11px] font-medium leading-[1.25] text-[#163b36]">
              A Climate-Resilient Future for Farmers
            </p>
            <p className="mt-2 max-w-[155px] text-[9px] leading-[1.35] text-slate-500">
              Earth data. Local impact. Stronger farms.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}