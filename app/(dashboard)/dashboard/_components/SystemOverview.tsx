"use client";

import { useGetRobotArmStatus } from "@/hooks/useRobotArm";
import { useGetAllSmartShelves } from "@/hooks/useSmartShelf";
import {
  Bot,
  Layers,
  CheckCircle2,
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function SystemOverview() {
  const { data: armStatus } = useGetRobotArmStatus();
  const { data: shelves } = useGetAllSmartShelves();

  const isBusy = armStatus?.isBusy || false;
  const activeShelf = shelves?.[0];

  const occupiedSections =
    activeShelf?.sections.filter((s) => {
      if (!s.product) return false;
      const p = s.product.toLowerCase().trim();
      return p !== "empty" && p !== "empety" && p !== "null" && p !== "";
    }).length || 0;

  return (
    <div className="bg-white dark:bg-card border border-border rounded-3xl p-6 shadow-sm overflow-hidden relative group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center relative z-10">
        {/* Title & Action */}
        <div className="space-y-4 md:border-l border-border/50 md:pl-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-primary/10 rounded-xl">
                <Bot className="size-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">
                النظام المدمج
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              مراقبة وتحكم شامل بالذراع الآلي والرف الذكي في وقت واحد.
            </p>
          </div>
          <Link
            href="/dashboard/robotarm"
            className="inline-block w-full sm:w-auto"
          >
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background hover:bg-foreground/90 font-medium transition-colors text-sm">
              إدارة النظام <ArrowUpRight className="size-4" />
            </button>
          </Link>
        </div>

        {/* Arm Status Widget */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
          <div
            className={cn(
              "p-4 rounded-xl",
              isBusy
                ? "bg-amber-500/10 text-amber-500"
                : "bg-emerald-500/10 text-emerald-500",
            )}
          >
            <Bot className="size-8" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              حالة الذراع الآلي
            </p>
            {isBusy ? (
              <div className="flex items-center gap-2 text-amber-600 font-bold">
                <span className="relative flex size-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full size-2.5 bg-amber-500"></span>
                </span>
                مشغول حالياً
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                <CheckCircle2 className="size-4" /> متاح للأوامر
              </div>
            )}
          </div>
        </div>

        {/* Shelf Status Widget */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
          <div className="p-4 rounded-xl bg-blue-500/10 text-blue-500">
            <Layers className="size-8" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              مساحة الرف الذكي
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-foreground">
                {occupiedSections}
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                من أصل 6 متاح
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-muted rounded-full h-1.5 mt-2">
              <div
                className="bg-blue-500 h-1.5 rounded-full"
                style={{ width: `${(occupiedSections / 6) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
