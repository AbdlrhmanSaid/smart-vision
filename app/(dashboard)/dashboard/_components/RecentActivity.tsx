"use client";
import { Clock } from "lucide-react";
import {
  getActivityIcon,
  getStatusColor,
} from "@/app/(dashboard)/dashboard/activity/page";
import { Bell, ArrowLeft } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import { Activity } from "@/services/activity.service";
import Link from "next/link";

export function RecentActivity({ activities }: { activities?: Activity[] }) {
  return (
    <div className="lg:col-span-2 bg-white dark:bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <Clock className="size-4 text-primary" />
          <h2 className="font-semibold text-foreground text-sm">
            آخر النشاطات
          </h2>
        </div>
        <span className="text-xs text-muted-foreground">اليوم</span>
      </div>

      {/* List */}
      <div className="flex-1 divide-y divide-border">
        {activities && activities.length > 0 ? (
          activities.slice(0, 5).map((activity, index) => (
            <div
              key={activity._id}
              className="group flex items-center gap-4 px-5 py-3.5 hover:bg-muted/30 transition-all duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Icon */}
              <div className="relative shrink-0">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted group-hover:scale-110 transition-transform duration-200">
                  {getActivityIcon(activity.description, activity.isAI)}
                </div>
                <span
                  className={`absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-white dark:border-card ${getStatusColor(
                    activity.description,
                    activity.isAI,
                  )}`}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0" dir="rtl">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span className="text-sm font-semibold text-foreground">
                    {activity.isAI
                      ? "تحديث تلقائي (AI)"
                      : activity.user?.username || "نظام"}
                  </span>
                  <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
                    {formatDistanceToNow(new Date(activity.createdAt), {
                      addSuffix: true,
                      locale: ar,
                    })}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {activity.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-3">
              <Bell className="size-7 text-muted-foreground/30" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">
              لا توجد نشاطات
            </h3>
            <p className="text-xs text-muted-foreground max-w-[200px] mx-auto">
              السجل فارغ حالياً، ستظهر العمليات هنا فور حدوثها.
            </p>
          </div>
        )}
      </div>

      {/* Footer — View More */}
      <Link
        href="/dashboard/activity"
        className="flex items-center justify-center gap-2 px-5 py-3 border-t border-border text-xs font-medium text-primary hover:bg-primary/5 transition-colors duration-200 shrink-0"
        dir="rtl"
      >
        <span>رؤية المزيد</span>
        <ArrowLeft className="size-3.5" />
      </Link>
    </div>
  );
}
