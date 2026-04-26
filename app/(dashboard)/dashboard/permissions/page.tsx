"use client";

import { useAuthStore } from "@/store/useAuthStore";
import {
  usePermissionsStore,
  REGISTERED_PAGES,
} from "@/store/usePermissionsStore";
import { useRoles } from "@/hooks/useRoles";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  ShieldCheck,
  Lock,
  Unlock,
  Shield,
  Users,
  Package,
  Settings,
  Activity,
  LayoutDashboard,
  FileText,
  Check,
  X,
  Info,
} from "lucide-react";

// أيقونة لكل صفحة
const PAGE_ICONS: Record<string, React.ElementType> = {
  products: Package,
  users: Users,
  roles: Shield,
  reports: FileText,
  settings: Settings,
  activity: Activity,
  dashboard: LayoutDashboard,
};

export default function PermissionsPage() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const { useGetAllRoles } = useRoles();
  const { data: allRoles = [] } = useGetAllRoles();

  const { pageRoles, addRoleToPage, removeRoleFromPage } =
    usePermissionsStore();

  // فقط super_admin يدخل هنا
  const isSuperAdmin = user?.roles?.some((r) => r.name === "super_admin");

  useEffect(() => {
    if (user && !isSuperAdmin) {
      router.replace("/dashboard");
    }
    if (!user) {
      router.replace("/login");
    }
  }, [user, isSuperAdmin, router]);

  if (!user || !isSuperAdmin) return null;

  return (
    <div className="space-y-6 pb-10" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <ShieldCheck className="size-4 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              إدارة صلاحيات الصفحات
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            حدد الصلاحيات المطلوبة للوصول لكل صفحة — فارغ يعني الوصول مفتوح
            لجميع المستخدمين
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
        <Info className="size-4 text-primary mt-0.5 shrink-0" />
        <div className="text-sm text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">super_admin</span>{" "}
          معفي دائماً من جميع القيود ويمكنه الوصول لأي صفحة. التغييرات تُحفظ
          تلقائياً.
        </div>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {REGISTERED_PAGES.map((page) => {
          const Icon = PAGE_ICONS[page.key] ?? Shield;
          const currentRoles = pageRoles[page.key] ?? [];
          const isOpen = currentRoles.length === 0;

          return (
            <div
              key={page.key}
              className="bg-white dark:bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4 hover:shadow-md transition-shadow"
            >
              {/* Page Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {page.label}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {page.path}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                    isOpen
                      ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border-emerald-200 dark:border-emerald-800"
                      : "bg-amber-50 dark:bg-amber-950/20 text-amber-600 border-amber-200 dark:border-amber-800"
                  }`}
                >
                  {isOpen ? (
                    <>
                      <Unlock className="size-3" />
                      مفتوح للجميع
                    </>
                  ) : (
                    <>
                      <Lock className="size-3" />
                      مقيّد
                    </>
                  )}
                </span>
              </div>

              {/* Roles Selector */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">
                  الصلاحيات المطلوبة للوصول:
                </p>

                {allRoles.length === 0 ? (
                  <p className="text-xs text-muted-foreground italic py-1">
                    لا توجد صلاحيات في النظام بعد
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {allRoles
                      .filter((r) => r.name !== "super_admin") // super_admin معفي دائماً
                      .map((role) => {
                        const isSelected = currentRoles.includes(role.name);
                        return (
                          <button
                            key={role._id}
                            type="button"
                            onClick={() => {
                              if (isSelected) {
                                removeRoleFromPage(page.key, role.name);
                              } else {
                                addRoleToPage(page.key, role.name);
                              }
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all hover:-translate-y-px ${
                              isSelected
                                ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20"
                                : "bg-muted text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                            }`}
                          >
                            {isSelected ? (
                              <Check className="size-3" />
                            ) : (
                              <Shield className="size-3" />
                            )}
                            {role.name}
                          </button>
                        );
                      })}
                  </div>
                )}

                {/* Quick Actions */}
                {allRoles.filter((r) => r.name !== "super_admin").length >
                  0 && (
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        // اختر كل الـ roles
                        allRoles
                          .filter((r) => r.name !== "super_admin")
                          .forEach((r) => addRoleToPage(page.key, r.name));
                      }}
                      className="flex items-center gap-1 text-xs text-primary hover:underline transition-colors"
                    >
                      <Check className="size-3" />
                      اختيار الكل
                    </button>
                    <span className="text-muted-foreground text-xs">·</span>
                    <button
                      type="button"
                      onClick={() => {
                        // امسح كل الـ roles (اجعل الصفحة مفتوحة)
                        usePermissionsStore
                          .getState()
                          .setPageRoles(page.key, []);
                      }}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground hover:underline transition-colors"
                    >
                      <X className="size-3" />
                      إزالة الكل (مفتوح)
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
