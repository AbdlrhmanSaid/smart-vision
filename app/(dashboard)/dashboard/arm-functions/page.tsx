"use client";

import React, { useState, useMemo } from "react";
import { useGetAllArmFunctions } from "@/hooks/arm-functions";
import { useSendRobotArmAction } from "@/hooks/useRobotArm";
import {
  Search,
  Activity,
  Box,
  Cpu,
  Play,
  PackageOpen,
  ShieldCheck,
  PackageSearch,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────
// Helper: detect function role from name prefix
// ─────────────────────────────────────────────
type FuncRole = "pick" | "safe" | "place" | "other";

const getRole = (name: string): FuncRole => {
  const n = name.toLowerCase();
  if (n.startsWith("pick")) return "pick";
  if (n.startsWith("safe")) return "safe";
  if (n.startsWith("place")) return "place";
  return "other";
};

const ROLE_META: Record<
  FuncRole,
  { label: string; color: string; bg: string; border: string; Icon: React.ElementType }
> = {
  pick: {
    label: "تفريغ",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    Icon: PackageOpen,
  },
  safe: {
    label: "حركة آمنة",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    Icon: ShieldCheck,
  },
  place: {
    label: "تخزين",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    Icon: PackageSearch,
  },
  other: {
    label: "أخرى",
    color: "text-slate-500",
    bg: "bg-slate-500/10",
    border: "border-slate-500/30",
    Icon: Box,
  },
};

const ROLE_ORDER: FuncRole[] = ["pick", "safe", "place", "other"];

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
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

  // Filter + group by role
  const grouped = useMemo(() => {
    const filtered =
      armFunctions?.filter((func) =>
        func.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ) || [];

    const map: Record<FuncRole, typeof filtered> = {
      pick: [],
      safe: [],
      place: [],
      other: [],
    };
    filtered.forEach((f) => map[getRole(f.name)].push(f));
    return map;
  }, [armFunctions, searchQuery]);

  const totalFiltered = ROLE_ORDER.reduce(
    (acc, r) => acc + grouped[r].length,
    0,
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card p-6 rounded-3xl border border-border shadow-sm relative overflow-hidden">
        <div className="absolute -left-20 -top-20 size-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="p-3 bg-primary/10 rounded-2xl shadow-inner">
            <Cpu className="size-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              دوال الذراع الآلي
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              عرض وتشغيل جميع الدوال المحفوظة — يُرسَل الاسم فقط للذراع
            </p>
          </div>
        </div>

        <div className="relative w-full md:w-72 z-10">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="البحث عن دالة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pr-10 pl-4 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      {/* ── Content ── */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-ping duration-1000" />
            <Activity className="size-10 text-primary animate-pulse relative z-10" />
          </div>
          <p className="text-muted-foreground mt-6 font-medium animate-pulse">
            جاري تحميل الدوال...
          </p>
        </div>
      ) : totalFiltered === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 bg-card rounded-3xl border border-dashed border-border shadow-sm">
          <div className="p-6 bg-muted/30 rounded-full mb-4">
            <Box className="size-12 text-muted-foreground/50" />
          </div>
          <p className="text-lg font-medium text-foreground">
            لا توجد دوال متاحة
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            جرب البحث بكلمة مختلفة
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {ROLE_ORDER.map((role) => {
            const funcs = grouped[role];
            if (funcs.length === 0) return null;
            const { label, color, bg, border, Icon } = ROLE_META[role];

            return (
              <div
                key={role}
                className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm flex flex-col"
              >
                {/* Group header */}
                <div
                  className={cn(
                    "flex items-center gap-3 px-5 py-4 border-b",
                    bg,
                    border,
                  )}
                >
                  <div className={cn("p-2 rounded-xl bg-background/60", border, "border")}>
                    <Icon className={cn("size-4", color)} />
                  </div>
                  <div>
                    <p className={cn("font-bold text-sm", color)}>{label}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {funcs.length} دالة
                    </p>
                  </div>
                </div>

                {/* Function list */}
                <div className="flex flex-col divide-y divide-border flex-1">
                  {funcs.map((func) => {
                    const isRunning = runningAction === func.name;
                    return (
                      <div
                        key={func._id}
                        className={cn(
                          "flex items-center justify-between px-4 py-3 transition-colors duration-200",
                          isRunning
                            ? "bg-primary/5"
                            : "hover:bg-muted/40",
                        )}
                      >
                        {/* Name chip */}
                        <span
                          className={cn(
                            "font-mono text-sm font-semibold tracking-tight",
                            isRunning ? "text-primary" : "text-foreground",
                          )}
                          title={func.name}
                        >
                          {func.name}
                        </span>

                        {/* Execute button */}
                        <button
                          onClick={() => handleExecute(func.name)}
                          disabled={isPending}
                          title={`تشغيل ${func.name}`}
                          className={cn(
                            "size-8 flex items-center justify-center rounded-lg transition-all duration-200 shrink-0",
                            isRunning
                              ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                              : cn(
                                  "text-muted-foreground hover:text-primary",
                                  bg,
                                  "hover:scale-105",
                                ),
                            isPending && !isRunning && "opacity-40 cursor-not-allowed",
                          )}
                        >
                          {isRunning ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <Play className="size-3.5" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
