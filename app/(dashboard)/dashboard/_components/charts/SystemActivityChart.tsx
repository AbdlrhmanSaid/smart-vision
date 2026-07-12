"use client";

import { useMemo, useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, parseISO } from "date-fns";
import { Activity, ShieldAlert } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

interface SystemActivityChartProps {
  activities: any[];
}

export function SystemActivityChart({ activities }: SystemActivityChartProps) {
  const [mounted, setMounted] = useState(false);
  const user = useAuthStore((state) => state.user);
  const roles = user?.roles?.map((r: any) => typeof r === "string" ? r : r.name) ?? [];
  const hasActivityRole = roles.includes("super_admin") || roles.includes("activity");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!hasActivityRole) {
    return (
      <div className="bg-white dark:bg-card border border-border rounded-3xl p-6 shadow-sm min-h-[350px] flex flex-col" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-primary/10 rounded-xl">
            <Activity className="size-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">نشاط النظام</h2>
            <p className="text-xs text-muted-foreground mt-1">مقارنة النشاط البشري والذكاء الاصطناعي بآخر 7 أيام</p>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/20 flex items-center justify-center mb-3 text-red-500 shadow-lg shadow-red-500/5">
            <ShieldAlert className="size-7" />
          </div>
          <h3 className="text-sm font-semibold text-foreground mb-1">
            غير مصرح بالدخول
          </h3>
          <p className="text-xs text-muted-foreground max-w-[240px] mx-auto leading-relaxed">
            ليس لديك الصلاحيات الكافية لعرض رسم نشاط النظام البياني.
          </p>
        </div>
      </div>
    );
  }

  const data = useMemo(() => {
    if (!activities) return [];

    // Initialize last 7 days with 0 counts
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), 6 - i);
      return {
        dateStr: format(date, "yyyy-MM-dd"),
        displayDate: format(date, "MMM dd"),
        human: 0,
        ai: 0,
      };
    });

    // Populate data
    activities.forEach((activity) => {
      if (!activity.createdAt) return;
      const activityDateStr = format(parseISO(activity.createdAt), "yyyy-MM-dd");
      
      const dayData = last7Days.find((d) => d.dateStr === activityDateStr);
      if (dayData) {
        if (activity.isAI) {
          dayData.ai += 1;
        } else {
          dayData.human += 1;
        }
      }
    });

    return last7Days;
  }, [activities]);

  return (
    <div className="bg-white dark:bg-card border border-border rounded-3xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-primary/10 rounded-xl">
          <Activity className="size-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">نشاط النظام</h2>
          <p className="text-xs text-muted-foreground mt-1">مقارنة النشاط البشري والذكاء الاصطناعي بآخر 7 أيام</p>
        </div>
      </div>
      
      <div className="h-[300px] w-full min-w-0" dir="ltr">
        {mounted && (
          <ResponsiveContainer width="99%" height="100%" minWidth={1} minHeight={1}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorHuman" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} className="dark:stroke-neutral-800" />
            <XAxis 
              dataKey="displayDate" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12 }} 
              dy={10} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12 }} 
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ fontWeight: 'bold' }}
            />
            <Area
              type="monotone"
              name="النشاط البشري"
              dataKey="human"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorHuman)"
            />
            <Area
              type="monotone"
              name="الذكاء الاصطناعي"
              dataKey="ai"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorAI)"
            />
          </AreaChart>
        </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
