import React from "react";
import {
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "لوحة التحكم - Smart Vision",
  description: "لوحة التحكم الرئيسية للمشروع",
};

const stats = [
  {
    name: "إجمالي المستخدمين",
    value: "1,240",
    change: "+12%",
    changeLabel: "عن الشهر الماضي",
    icon: Users,
    color: "blue",
    trend: "up",
  },
  {
    name: "المبيعات الشهرية",
    value: "$45,231",
    change: "+24%",
    changeLabel: "عن الشهر الماضي",
    icon: DollarSign,
    color: "emerald",
    trend: "up",
  },
  {
    name: "معدل التفاعل",
    value: "84.2%",
    change: "-2%",
    changeLabel: "عن الأسبوع الماضي",
    icon: Activity,
    color: "violet",
    trend: "down",
  },
  {
    name: "المنتجات النشطة",
    value: "328",
    change: "+8%",
    changeLabel: "منتج جديد",
    icon: Package,
    color: "orange",
    trend: "up",
  },
];

const recentActivity = [
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
];

const quickLinks = [
  { title: "إدارة المنتجات", href: "/dashboard/products", icon: Package, desc: "أضف وعدّل منتجاتك" },
  { title: "المستخدمين", href: "/dashboard/users", icon: Users, desc: "إدارة حسابات المستخدمين" },
  { title: "التقارير", href: "/dashboard/reports", icon: TrendingUp, desc: "عرض التقارير والإحصائيات" },
  { title: "الإعدادات", href: "/dashboard/settings", icon: Activity, desc: "ضبط إعدادات النظام" },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
  emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
  violet: "bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-400",
  orange: "bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400",
};

const statusDot: Record<string, string> = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  info: "bg-blue-500",
};

export default function DashboardPage() {
  return (
    <div className="space-y-7 pb-10" dir="rtl">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-lg shadow-primary/20">
        <div className="absolute -top-10 -left-10 size-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-10 left-20 size-32 rounded-full bg-white/10 blur-2xl" />
        <div className="relative">
          <p className="text-sm font-medium text-primary-foreground/70 mb-1">
            مرحباً بك في
          </p>
          <h1 className="text-2xl font-bold mb-1">Smart Vision Dashboard</h1>
          <p className="text-sm text-primary-foreground/70">
            نظرة عامة على أداء متجرك اليوم
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isUp = stat.trend === "up";
          return (
            <div
              key={stat.name}
              className="bg-white dark:bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`flex items-center justify-center w-11 h-11 rounded-xl ${colorMap[stat.color]}`}>
                  <Icon className="size-5" />
                </div>
                <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                  isUp
                    ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20"
                    : "text-red-500 bg-red-50 dark:bg-red-950/20"
                }`}>
                  {isUp ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-foreground mb-0.5">{stat.name}</p>
              <p className="text-xs text-muted-foreground">{stat.changeLabel}</p>
            </div>
          );
        })}
      </div>

      {/* Bottom: Activity + Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-primary" />
              <h2 className="font-semibold text-foreground text-sm">آخر النشاطات</h2>
            </div>
            <span className="text-xs text-muted-foreground">اليوم</span>
          </div>
          <div className="divide-y divide-border">
            {recentActivity.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/30 transition-colors">
                  <div className="relative shrink-0">
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-muted">
                      <Icon className="size-4 text-muted-foreground" />
                    </div>
                    <span className={`absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-white dark:border-card ${statusDot[item.status]}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white dark:bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
            <TrendingUp className="size-4 text-primary" />
            <h2 className="font-semibold text-foreground text-sm">روابط سريعة</h2>
          </div>
          <div className="p-3 space-y-2">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-200 group"
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200 shrink-0">
                    <Icon className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{link.title}</p>
                    <p className="text-xs text-muted-foreground">{link.desc}</p>
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
