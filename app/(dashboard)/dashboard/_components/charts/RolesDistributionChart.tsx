"use client";

import { useMemo, useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Users } from "lucide-react";
import { User } from "@/types/user";

interface RolesDistributionChartProps {
  users: User[];
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#64748b"];

export function RolesDistributionChart({ users }: RolesDistributionChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = useMemo(() => {
    if (!users) return [];

    const roleCounts: Record<string, number> = {};
    
    users.forEach((user) => {
      // Assuming a user might have multiple roles, or at least one
      if (user.roles && user.roles.length > 0) {
        user.roles.forEach((role) => {
          roleCounts[role.name] = (roleCounts[role.name] || 0) + 1;
        });
      } else {
        roleCounts["غير محدد"] = (roleCounts["غير محدد"] || 0) + 1;
      }
    });

    return Object.entries(roleCounts).map(([name, value]) => ({
      name,
      value,
    }));
  }, [users]);

  return (
    <div className="bg-white dark:bg-card border border-border rounded-3xl p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-indigo-500/10 rounded-xl">
          <Users className="size-6 text-indigo-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">توزيع الصلاحيات</h2>
          <p className="text-xs text-muted-foreground mt-1">نسبة المستخدمين حسب الأدوار</p>
        </div>
      </div>

      <div className="flex-1 h-[250px] min-h-[250px] w-full min-w-0 flex items-center justify-center" dir="ltr">
        {mounted && data.length > 0 ? (
          <ResponsiveContainer width="99%" height="100%" minWidth={1} minHeight={1}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ fontWeight: 'bold' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                wrapperStyle={{ fontSize: '12px', marginTop: '10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-sm text-muted-foreground flex items-center justify-center h-full">
            لا توجد بيانات كافية
          </div>
        )}
      </div>
    </div>
  );
}
