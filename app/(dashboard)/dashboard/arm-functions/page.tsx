"use client";

import React, { useState } from "react";
import { useGetAllArmFunctions } from "@/hooks/arm-functions";
import { useSendRobotArmAction } from "@/hooks/useRobotArm";
import {
  ListOrdered,
  Play,
  Search,
  Activity,
  Box,
  Layers,
  Cpu,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ArmFunctionsPage() {
  const { data: armFunctions, isLoading } = useGetAllArmFunctions();
  const { mutate: sendAction, isPending } = useSendRobotArmAction();
  const [searchQuery, setSearchQuery] = useState("");
  const [runningAction, setRunningAction] = useState<string | null>(null);

  const handleExecute = (name: string) => {
    setRunningAction(name);
    sendAction([name], {
      onSettled: () => setRunningAction(null),
    });
  };

  const filteredFunctions =
    armFunctions?.filter((func) =>
      func.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  const getTypeInfo = (type: string) => {
    switch (type) {
      case "frames":
        return {
          icon: Video,
          color: "text-blue-500",
          bg: "bg-blue-500/10",
          label: "إطارات حركية",
        };
      case "steps":
        return {
          icon: Layers,
          color: "text-amber-500",
          bg: "bg-amber-500/10",
          label: "خطوات مبرمجة",
        };
      case "sequence":
        return {
          icon: ListOrdered,
          color: "text-purple-500",
          bg: "bg-purple-500/10",
          label: "تسلسل أوامر",
        };
      default:
        return {
          icon: Box,
          color: "text-slate-500",
          bg: "bg-slate-500/10",
          label: "غير معروف",
        };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card p-6 rounded-3xl border border-border shadow-sm relative overflow-hidden">
        <div className="absolute -left-20 -top-20 size-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="p-3 bg-primary/10 rounded-2xl shadow-inner">
            <Cpu className="size-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              أوامر الذراع الآلي
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              عرض وتشغيل جميع الحركات والأوامر المحفوظة للذراع
            </p>
          </div>
        </div>

        <div className="relative w-full md:w-72 z-10">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="البحث عن أمر..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pr-10 pl-4 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-ping duration-1000" />
            <Activity className="size-10 text-primary animate-pulse relative z-10" />
          </div>
          <p className="text-muted-foreground mt-6 font-medium animate-pulse">
            جاري تحميل الأوامر...
          </p>
        </div>
      ) : filteredFunctions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 bg-card rounded-3xl border border-dashed border-border shadow-sm">
          <div className="p-6 bg-muted/30 rounded-full mb-4">
            <Box className="size-12 text-muted-foreground/50" />
          </div>
          <p className="text-lg font-medium text-foreground">
            لا يوجد أوامر متاحة
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            جرب البحث بكلمة مختلفة
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredFunctions.map((func) => {
            const { icon: Icon, color, bg, label } = getTypeInfo(func.type);
            const isCurrentlyRunning = runningAction === func.name;

            return (
              <div
                key={func._id}
                className={cn(
                  "bg-card border transition-all duration-300 rounded-3xl p-5 shadow-sm group relative overflow-hidden flex flex-col h-full",
                  isCurrentlyRunning
                    ? "border-primary shadow-primary/20 shadow-lg"
                    : "border-border hover:border-primary/40 hover:shadow-md",
                )}
              >
                <div className="absolute -right-10 -top-10 size-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none" />

                <div className="flex justify-between items-start mb-5 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2.5 rounded-xl shadow-xs", bg)}>
                      <Icon className={cn("size-5", color)} />
                    </div>
                    <div>
                      <h3
                        className="font-bold text-foreground capitalize line-clamp-1"
                        title={func.name}
                      >
                        {func.name}
                      </h3>
                      <span className="text-xs text-muted-foreground mt-0.5 block">
                        {label}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/40 border border-border/50 rounded-2xl p-4 mb-5 relative z-10 flex-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground font-medium">
                      النقاط/الخطوات:
                    </span>
                    <span className="font-bold bg-background px-2 py-0.5 rounded-md border border-border/50 shadow-xs text-foreground">
                      {func.type === "frames"
                        ? func.frames?.length || 0
                        : func.steps?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-3 pt-3 border-t border-border/50">
                    <span className="text-muted-foreground font-medium">
                      تاريخ الإنشاء:
                    </span>
                    <span className="font-mono text-xs text-muted-foreground bg-background px-2 py-0.5 rounded-md border border-border/50">
                      {new Date(func.createdAt).toLocaleDateString("ar-EG")}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleExecute(func.name)}
                  disabled={isPending}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 z-10 relative overflow-hidden",
                    isCurrentlyRunning
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20",
                    isPending &&
                      !isCurrentlyRunning &&
                      "opacity-50 cursor-not-allowed",
                  )}
                >
                  {isCurrentlyRunning ? (
                    <>
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      <Activity className="size-4 animate-spin" /> جاري
                      التنفيذ...
                    </>
                  ) : (
                    <>
                      <Play className="size-4 group-hover:scale-110 transition-transform" />{" "}
                      تشغيل الأمر
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
