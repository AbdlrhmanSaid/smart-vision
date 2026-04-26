"use client";

import { useActivity } from "@/hooks/useActivity";
import {
  Users,
  Package,
  Clock,
  Cpu,
  RefreshCw,
  Bell,
  Trash2,
  LogIn,
  LogOut,
  PlusCircle,
  Settings,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import LoadingState from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Modal } from "@/components/shared/Modal";
import { withRoles } from "@/components/shared/withRoles";

function ActivityPage() {
  const { useGetAllActivities, useClearActivities } = useActivity();
  const { data: activities, isLoading, isRefetching } = useGetAllActivities();
  const clearMutation = useClearActivities();
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  if (isLoading) {
    return <LoadingState icon={Bell} />;
  }

  const getActivityIcon = (description: string, isAI: boolean) => {
    if (isAI) return <Cpu className="size-4 text-blue-500" />;

    const desc = description.toLowerCase();
    if (desc.includes("دخول") || desc.includes("login"))
      return <LogIn className="size-4 text-emerald-500" />;
    if (desc.includes("خروج") || desc.includes("logout"))
      return <LogOut className="size-4 text-amber-500" />;
    if (desc.includes("منتج") || desc.includes("product")) {
      if (desc.includes("إضافة") || desc.includes("add"))
        return <PlusCircle className="size-4 text-primary" />;
      if (
        desc.includes("حذف") ||
        desc.includes("delete") ||
        desc.includes("مسح")
      )
        return <Trash2 className="size-4 text-red-500" />;
      return <Package className="size-4 text-primary" />;
    }
    if (desc.includes("صلاحية") || desc.includes("role"))
      return <ShieldCheck className="size-4 text-violet-500" />;
    if (desc.includes("مستخدم") || desc.includes("user"))
      return <Users className="size-4 text-primary" />;
    if (desc.includes("إعدادات") || desc.includes("settings"))
      return <Settings className="size-4 text-slate-500" />;

    return <Clock className="size-4 text-muted-foreground" />;
  };

  const getStatusColor = (description: string, isAI: boolean) => {
    if (isAI) return "bg-blue-500";
    const desc = description.toLowerCase();
    if (desc.includes("حذف") || desc.includes("delete") || desc.includes("مسح"))
      return "bg-red-500";
    if (desc.includes("إضافة") || desc.includes("add") || desc.includes("دخول"))
      return "bg-emerald-500";
    if (desc.includes("تعديل") || desc.includes("update"))
      return "bg-amber-500";
    return "bg-primary";
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <Bell className="size-4 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">سجل النشاطات</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            تتبع كافة العمليات والتحركات التي تتم في النظام
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activities && activities.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsClearModalOpen(true)}
              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 border-red-200 dark:border-red-800 gap-2 h-9 rounded-xl"
            >
              <Trash2 className="size-4" />
              <span>مسح السجل</span>
            </Button>
          )}
          <div className="h-9 px-3 flex items-center gap-2 rounded-xl border border-border bg-card text-xs font-medium text-muted-foreground">
            <RefreshCw
              className={`size-3 ${isRefetching ? "animate-spin text-primary" : ""}`}
            />
            <span>تحديث تلقائي</span>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-muted-foreground mb-1">إجمالي النشاطات</p>
          <p className="text-2xl font-bold text-foreground">
            {activities?.length || 0}
          </p>
        </div>
        <div className="bg-white dark:bg-card border rounded-2xl p-5 shadow-sm text-blue-500 border-blue-100 dark:border-blue-900/30">
          <p className="text-xs text-blue-500/70 mb-1">نشاطات AI</p>
          <p className="text-2xl font-bold">
            {activities?.filter((a) => a.isAI).length || 0}
          </p>
        </div>
        <div className="bg-white dark:bg-card border rounded-2xl p-5 shadow-sm text-emerald-500 border-emerald-100 dark:border-emerald-900/30">
          <p className="text-xs text-emerald-500/70 mb-1">نشاطات المستخدمين</p>
          <p className="text-2xl font-bold">
            {activities?.filter((a) => !a.isAI).length || 0}
          </p>
        </div>
      </div>

      {/* List */}
      <div className="bg-white dark:bg-card border border-border rounded-2xl shadow-sm overflow-hidden min-h-[400px]">
        <div className="divide-y divide-border">
          {activities && activities.length > 0 ? (
            activities.map((activity, index) => (
              <div
                key={activity._id}
                className="group flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-all duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Icon Container */}
                <div className="relative shrink-0">
                  <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-muted group-hover:scale-110 transition-transform duration-200">
                    {getActivityIcon(activity.description, activity.isAI)}
                  </div>
                  {/* Status Indicator */}
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-white dark:border-card ${getStatusColor(
                      activity.description,
                      activity.isAI,
                    )}`}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-bold text-foreground">
                      {activity.isAI
                        ? "تحديث تلقائي (AI)"
                        : activity.user?.username || "نظام"}
                    </span>
                    <span className="text-[10px] sm:text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
                      {formatDistanceToNow(new Date(activity.createdAt), {
                        addSuffix: true,
                        locale: ar,
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {activity.description}
                  </p>
                </div>

                {/* Details Button (Optional placeholder) */}
                <div className="hidden sm:block shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground transition-colors cursor-pointer">
                    <AlertCircle className="size-4" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Bell className="size-8 text-muted-foreground/30" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                لا توجد نشاطات
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                السجل فارغ حالياً، سيتم عرض كافة التحركات والعمليات هنا فور
                حدوثها.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Clear Confirmation Modal */}
      <Modal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        title="مسح سجل النشاطات"
      >
        <div className="p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/20 flex items-center justify-center mx-auto mb-4">
            <Trash2 className="size-8 text-red-500" />
          </div>
          <p className="text-foreground font-semibold mb-2">
            هل أنت متأكد من مسح كافة النشاطات؟
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            هذا الإجراء سيقوم بحذف كافة السجلات بشكل نهائي ولا يمكن التراجع عنه.
          </p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsClearModalOpen(false)}
              className="flex-1 rounded-xl"
            >
              إلغاء
            </Button>
            <Button
              variant="destructive"
              disabled={clearMutation.isPending}
              onClick={() => {
                clearMutation.mutate(undefined, {
                  onSuccess: () => setIsClearModalOpen(false),
                });
              }}
              className="flex-1 rounded-xl bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20 text-white"
            >
              {clearMutation.isPending ? "جاري المسح..." : "نعم، امسح الكل"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default withRoles("activity")(ActivityPage);
