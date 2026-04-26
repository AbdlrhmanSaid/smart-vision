import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// -----------------------------------------------------------------------
// صفحة مسجلة في نظام الصلاحيات الديناميكي
// -----------------------------------------------------------------------
export interface RegisteredPage {
  key: string;
  label: string;
  path: string;
}

export const REGISTERED_PAGES: RegisteredPage[] = [
  { key: "products", label: "المنتجات",    path: "/dashboard/products" },
  { key: "users",    label: "المستخدمين",  path: "/dashboard/users"    },
  { key: "roles",    label: "الصلاحيات",   path: "/dashboard/roles"    },
  { key: "reports",  label: "التقارير",    path: "/dashboard/reports"  },
  { key: "settings", label: "الإعدادات",   path: "/dashboard/settings" },
  { key: "activity", label: "سجل النشاط",  path: "/dashboard/activity" },
];

// -----------------------------------------------------------------------
// الـ Store
// -----------------------------------------------------------------------
interface PermissionsState {
  /** { pageKey: ["admin", "products", ...] } — فارغ = مفتوح للجميع */
  pageRoles: Record<string, string[]>;

  /**
   * يُشير إلى أن الـ persist middleware أنهى تحميل البيانات من localStorage.
   * نستخدمه في withRoles لمنع render الصفحة قبل معرفة الصلاحيات الحقيقية.
   */
  _hasHydrated: boolean;
  _setHasHydrated: (v: boolean) => void;

  setPageRoles: (pageKey: string, roles: string[]) => void;
  addRoleToPage: (pageKey: string, role: string) => void;
  removeRoleFromPage: (pageKey: string, role: string) => void;
  getRolesForPage: (pageKey: string) => string[];
}

export const usePermissionsStore = create<PermissionsState>()(
  persist(
    (set, get) => ({
      pageRoles: {
        products: [],
        users:    [],
        roles:    [],
        reports:  [],
        settings: [],
        activity: [],
      },

      _hasHydrated: false,
      _setHasHydrated: (v) => set({ _hasHydrated: v }),

      setPageRoles: (pageKey, roles) =>
        set((state) => ({
          pageRoles: { ...state.pageRoles, [pageKey]: roles },
        })),

      addRoleToPage: (pageKey, role) =>
        set((state) => {
          const current = state.pageRoles[pageKey] ?? [];
          if (current.includes(role)) return state;
          return {
            pageRoles: { ...state.pageRoles, [pageKey]: [...current, role] },
          };
        }),

      removeRoleFromPage: (pageKey, role) =>
        set((state) => {
          const current = state.pageRoles[pageKey] ?? [];
          return {
            pageRoles: {
              ...state.pageRoles,
              [pageKey]: current.filter((r) => r !== role),
            },
          };
        }),

      getRolesForPage: (pageKey) => get().pageRoles[pageKey] ?? [],
    }),
    {
      name: "page-permissions",
      storage: createJSONStorage(() => localStorage),
      // بعد ما يخلص الـ rehydration من localStorage، اضبط الـ flag
      onRehydrateStorage: () => (state) => {
        state?._setHasHydrated(true);
      },
    },
  ),
);
