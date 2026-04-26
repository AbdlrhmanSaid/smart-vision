"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
  Package,
  ChevronRight,
  X,
  Shield,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "@/public/logo-removebg.png";
import { useAuthStore } from "@/store/useAuthStore";

const menuItems = [
  { title: "لوحة التحكم", href: "/dashboard", icon: LayoutDashboard },
  { title: "المنتجات", href: "/dashboard/products", icon: Package },
  { title: "المستخدمين", href: "/dashboard/users", icon: Users },
  { title: "الصلاحيات", href: "/dashboard/roles", icon: Shield },
  { title: "الإعدادات", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const isSuperAdmin = user?.roles?.some((r) => r.name === "super_admin");

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-72 flex flex-col bg-white dark:bg-card border-l border-border shadow-xl shadow-primary/5 transition-transform duration-300 ease-in-out",
          // Desktop: always visible
          "md:translate-x-0",
          // Mobile: toggled by isOpen
          isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0",
        )}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center justify-between gap-3 px-6 border-b border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-l from-primary/10 to-transparent pointer-events-none" />
          <div className="relative flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl ">
              <Image
                src={logo}
                alt="logo"
                width={60}
                height={60}
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-foreground leading-tight">
                Smart Vision
              </span>
              <span className="text-[11px] text-muted-foreground font-medium">
                Dashboard
              </span>
            </div>
          </div>
          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="relative md:hidden p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="إغلاق القائمة"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col p-4 gap-1 overflow-y-auto">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 mb-2">
            القائمة الرئيسية
          </p>
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-linear-to-r from-white/10 to-transparent pointer-events-none" />
                )}
                <item.icon
                  className={cn(
                    "size-5 shrink-0 transition-transform duration-200 group-hover:scale-110",
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground group-hover:text-accent-foreground",
                  )}
                />
                <span className="flex-1">{item.title}</span>
                {isActive && (
                  <ChevronRight className="size-4 text-primary-foreground/70" />
                )}
              </Link>
            );
          })}

          {/* رابط إدارة الصلاحيات — فقط للـ super_admin */}
          {isSuperAdmin && (
            <>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 mt-3 mb-2">
                الإدارة المتقدمة
              </p>
              {(() => {
                const href = "/dashboard/permissions";
                const isActive = pathname === href;
                return (
                  <Link
                    href={href}
                    onClick={onClose}
                    className={cn(
                      "group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-linear-to-r from-white/10 to-transparent pointer-events-none" />
                    )}
                    <ShieldCheck
                      className={cn(
                        "size-5 shrink-0 transition-transform duration-200 group-hover:scale-110",
                        isActive
                          ? "text-primary-foreground"
                          : "text-muted-foreground group-hover:text-accent-foreground",
                      )}
                    />
                    <span className="flex-1">صلاحيات الصفحات</span>
                    {isActive && (
                      <ChevronRight className="size-4 text-primary-foreground/70" />
                    )}
                  </Link>
                );
              })()}
            </>
          )}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/60">
            <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">النظام يعمل</span>
            <span className="text-xs text-muted-foreground mr-auto">v1.0</span>
          </div>
        </div>
      </aside>
    </>
  );
}
