import {
  Users,
  TrendingUp,
  Activity,
  Package,
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export const recentActivity = [
  {
    id: 1,
    icon: ShoppingBag,
    title: "طلب جديد #4521",
    desc: "منتج: بيبسي × 10",
    time: "منذ 5 دقائق",
    status: "success",
  },
  {
    id: 2,
    icon: Users,
    title: "مستخدم جديد",
    desc: "ahmed@example.com",
    time: "منذ 18 دقيقة",
    status: "success",
  },
  {
    id: 3,
    icon: AlertCircle,
    title: "نفاد مخزون",
    desc: "منتج: حليب نادك",
    time: "منذ 45 دقيقة",
    status: "warning",
  },
  {
    id: 4,
    icon: CheckCircle2,
    title: "اكتمال الشحن",
    desc: "طلب #4488 تم التوصيل",
    time: "منذ ساعة",
    status: "success",
  },
  {
    id: 5,
    icon: Package,
    title: "منتج جديد",
    desc: "تمت إضافة: شيبس ليز",
    time: "منذ ساعتين",
    status: "info",
  },
] as const;

export const quickLinks = [
  {
    title: "إدارة المنتجات",
    href: "/dashboard/products",
    icon: Package,
    desc: "أضف وعدّل منتجاتك",
  },
  {
    title: "المستخدمين",
    href: "/dashboard/users",
    icon: Users,
    desc: "إدارة حسابات المستخدمين",
  },
  {
    title: "التقارير",
    href: "/dashboard/reports",
    icon: TrendingUp,
    desc: "عرض التقارير والإحصائيات",
  },
  {
    title: "الإعدادات",
    href: "/dashboard/settings",
    icon: Activity,
    desc: "ضبط إعدادات النظام",
  },
] as const;

export const colorMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
  emerald:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
  violet:
    "bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-400",
  orange:
    "bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400",
  green: "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400",
};

export const statusDot: Record<string, string> = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  info: "bg-blue-500",
};
