import { colorMap } from "./dashboard.data";
import { Users, Cog, Package, Bot } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function StatsGrid({ users, products, roles }: any) {
  const stats = [
    {
      name: "إجمالي المستخدمين",
      value: users?.length,
      icon: Users,
      color: "blue",
      trend: "up",
    },

    {
      name: "المنتجات النشطة",
      value: products?.length,
      icon: Package,
      color: "orange",
      trend: "up",
    },
    {
      name: "إجمالي الأدوار",
      value: roles?.length,
      icon: Cog,
      color: "green",
      trend: "up",
    },
    {
      name: "تفاعل الذكاء الاصطناعي",
      value: 0,
      icon: Bot,
      color: "green",
      trend: "up",
      to: "/dashboard/ai",
    },
  ] as const;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.name}
            className="bg-white dark:bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`flex items-center justify-center w-11 h-11 rounded-xl ${colorMap[stat.color]}`}
              >
                <Icon className="size-5" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">
              {stat.value}
            </p>
            <p className="text-sm font-medium text-foreground mb-0.5">
              {stat.name}
            </p>
            {'to' in stat && stat.to && (
              <Link href={stat.to} className="w-full">
                <Button>عرض التفاصيل</Button>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
