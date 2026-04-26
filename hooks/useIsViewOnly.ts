import { useAuthStore } from "@/store/useAuthStore";

/**
 * useIsViewOnly — يتحقق إذا كان المستخدم الحالي يملك رول "view"
 *
 * رول "view" يعني:
 *   - يمكنه رؤية البيانات فقط
 *   - جميع أزرار الإضافة / التعديل / الحذف تكون disabled
 *
 * ينطبق على الجميع بدون استثناء — بما فيهم super_admin
 */
export function useIsViewOnly(): boolean {
  const user = useAuthStore((state) => state.user);

  if (!user) return false;

  return user.roles.some((r) => r.name === "view");
}
