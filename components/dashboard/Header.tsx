"use client";

import { useRouter } from "next/navigation";
import { LogOut, Bell, Search, LayoutDashboard, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AuthService } from "@/services/auth.service";

const pageTitles: Record<string, string> = {
  "/dashboard": "لوحة التحكم",
  "/dashboard/products": "إدارة المنتجات",
  "/dashboard/users": "المستخدمين",
  "/dashboard/roles": "الصلاحيات",
  "/dashboard/settings": "الإعدادات",
};

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const pageTitle = pageTitles[pathname] ?? "لوحة التحكم";

  const handleLogout = async () => {
    await AuthService.logout();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b border-border bg-white/90 dark:bg-card/90 backdrop-blur-xl shadow-sm">
      <div className="flex flex-1 items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Hamburger button — mobile only */}
        <button
          onClick={onMenuToggle}
          className="flex md:hidden items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="فتح القائمة"
        >
          <Menu className="size-5" />
        </button>

        {/* Page Title (mobile) */}
        <div className="flex items-center gap-1.5 sm:hidden">
          <LayoutDashboard className="size-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">
            {pageTitle}
          </span>
        </div>

        {/* Search bar */}
        <div className="relative hidden sm:flex items-center w-full max-w-xs">
          <Search className="absolute right-3 size-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="ابحث..."
            className="w-full h-9 pr-10 pl-4 text-sm bg-muted/40 hover:bg-muted/70 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/40 transition-all placeholder:text-muted-foreground"
            dir="rtl"
          />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          {/* Notification Bell */}
          <div className="relative">
            <Link
              href="/dashboard/activity"
              aria-label="الإشعارات"
              className="relative flex items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            >
              <Bell className="size-[18px]" />
              {/* Badge */}
              <span className="absolute top-1.5 right-1.5 flex size-[7px]">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full size-[7px] bg-primary" />
              </span>
            </Link>
          </div>

          {/* Divider */}
          <div className="h-5 w-px bg-border mx-1" />

          {/* Logout */}
          <button
            onClick={handleLogout}
            aria-label="تسجيل الخروج"
            className="flex items-center gap-2 px-3 h-9 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all duration-200"
          >
            <LogOut className="size-4 shrink-0" />
            <span className="hidden sm:inline">خروج</span>
          </button>
        </div>
      </div>
    </header>
  );
}
