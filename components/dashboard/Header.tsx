"use client";

import { useRouter } from "next/navigation";
import { LogOut, Bell, LayoutDashboard, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/store/useAuthStore";

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

  const user = useAuthStore((state) => state.user);
  const roles =
    user?.roles?.map((r: any) => (typeof r === "string" ? r : r.name)) ?? [];
  const userInitial = user?.username
    ? user.username.charAt(0).toUpperCase()
    : "";

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

        {/* User Info */}
        {user && (
          <div
            className="hidden sm:flex items-center gap-2.5 bg-muted/20  rounded-2xl px-3 py-1.5 "
            dir="rtl"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 border border-primary/20 text-primary font-bold text-sm shrink-0">
              {userInitial}
            </div>
            <div className="flex flex-col text-right">
              <span className="text-xs font-semibold text-foreground leading-none">
                {user.username}
              </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {roles.map((roleName) => (
                  <span
                    key={roleName}
                    className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-primary/5 text-primary border border-primary/10"
                  >
                    {roleName}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

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
