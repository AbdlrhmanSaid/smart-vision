"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { usePermissionsStore } from "@/store/usePermissionsStore";
import { useRouter } from "next/navigation";
import { useEffect, ComponentType } from "react";
import { ShieldX, Lock, Loader2 } from "lucide-react";

// -----------------------------------------------------------------------
// withRoles — Higher-Order Component لحماية الصفحات بصلاحيات ديناميكية
//
// الاستخدام:
//   export default withRoles("products")(ProductsPage);
//
// - يقرأ الـ roles من usePermissionsStore (ديناميكي / قابل للتعديل)
// - ينتظر انتهاء hydration الـ store من localStorage قبل أي قرار
// - super_admin معفي تلقائياً
// - roles فارغة = الصفحة متاحة لأي مستخدم مسجل دخول
// -----------------------------------------------------------------------

export function withRoles<P extends object>(pageKey: string) {
  return function (WrappedComponent: ComponentType<P>) {
    function ProtectedPage(props: P) {
      const user = useAuthStore((state) => state.user);
      const router = useRouter();

      // ⚠️ انتظر انتهاء الـ hydration من localStorage أولاً
      const hasHydrated = usePermissionsStore((state) => state._hasHydrated);
      const requiredRoles = usePermissionsStore((state) =>
        state.getRolesForPage(pageKey)
      );

      const userRoles = user?.roles?.map((r) => r.name) ?? [];
      const isSuperAdmin = userRoles.includes("super_admin");

      const hasAccess =
        isSuperAdmin ||
        requiredRoles.length === 0 ||
        requiredRoles.some((role) => userRoles.includes(role));

      // لو مفيش يوزر → redirect للـ login
      useEffect(() => {
        if (!user) router.replace("/login");
      }, [user, router]);

      // لو مفيش يوزر → لا تعرض حاجة
      if (!user) return null;

      // ⏳ انتظر انتهاء hydration الـ Zustand persist من localStorage
      // هذا يمنع render الصفحة قبل معرفة الصلاحيات الحقيقية
      if (!hasHydrated) {
        return (
          <div className="flex items-center justify-center min-h-[60vh]">
            <Loader2 className="size-8 animate-spin text-primary/40" />
          </div>
        );
      }

      // 🚫 عدم الصلاحية → شاشة احترافية
      if (!hasAccess) {
        return (
          <div
            className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4"
            dir="rtl"
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl bg-red-50 dark:bg-red-950/20 flex items-center justify-center shadow-lg shadow-red-500/10">
                <ShieldX className="size-12 text-red-500" strokeWidth={1.5} />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center shadow-md">
                <Lock className="size-4 text-white" strokeWidth={2} />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">
                غير مصرح بالوصول
              </h1>
              <p className="text-muted-foreground max-w-sm leading-relaxed">
                ليس لديك صلاحية لعرض هذه الصفحة. تواصل مع مدير النظام
                للحصول على الأذونات اللازمة.
              </p>
            </div>

            {requiredRoles.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center items-center">
                <span className="text-xs text-muted-foreground">
                  الصلاحيات المطلوبة:
                </span>
                {requiredRoles.map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 dark:bg-red-950/20 text-red-600 border border-red-200 dark:border-red-800"
                  >
                    {role}
                  </span>
                ))}
              </div>
            )}

            <button
              onClick={() => router.back()}
              className="mt-2 h-10 px-6 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all hover:-translate-y-px shadow-lg shadow-primary/25"
            >
              العودة للخلف
            </button>
          </div>
        );
      }

      // ✅ الصلاحية موجودة → عرض الصفحة
      return <WrappedComponent {...props} />;
    }

    ProtectedPage.displayName = `withRoles(${pageKey})(${
      WrappedComponent.displayName ?? WrappedComponent.name ?? "Component"
    })`;

    return ProtectedPage;
  };
}
