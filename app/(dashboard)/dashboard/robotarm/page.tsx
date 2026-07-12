"use client";

import { useState } from "react";
import {
  useGetRobotArmStatus,
  useSendRobotArmAction,
} from "@/hooks/useRobotArm";
import { useGetAllSmartShelves } from "@/hooks/useSmartShelf";
import { withRoles } from "@/components/shared/withRoles";
import { useGetAllArmFunctions } from "@/hooks/arm-functions";
import {
  Bot,
  Lock,
  Unlock,
  Server,
  Layers,
  PackageSearch,
  PackageOpen,
  RefreshCw,
  AlertCircle,
  Scan,
  ArrowDownToLine,
  ArrowUpFromLine,
  Activity,
  Settings2,
  X,
  ListOrdered,
  RotateCcw,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface PointSequence {
  retrieve: string[]; // Point → Fixed
  store: string[]; // Fixed → Point
}

interface PointConfig {
  id: string; // A1, A2, ... B3
  shelfSection: string; // stOne, stTwo, ...
  defaultSequence: PointSequence;
}

// ─────────────────────────────────────────────
// Default sequence builder
// ─────────────────────────────────────────────
const buildDefault = (id: string): PointSequence => ({
  // Retrieve: Point → Fixed
  // Safe_id → Pick_id → Safe_id → Safe_Fixed → Place_Fixed → Safe_Fixed
  retrieve: [
    `Safe_${id}`,
    `Pick_${id}`,
    `Safe_${id}`,
    `Safe_Fixed`,
    `Place_Fixed`,
    `Safe_Fixed`,
  ],
  // Store: Fixed → Point
  // Safe_Fixed → Pick_Fixed → Safe_Fixed → Safe_id → Place_id → Safe_id
  store: [
    `Safe_Fixed`,
    `Pick_Fixed`,
    `Safe_Fixed`,
    `Safe_${id}`,
    `Place_${id}`,
    `Safe_${id}`,
  ],
});

// ─────────────────────────────────────────────
// Grid: A3 A2 A1 / B3 B2 B1 (right → left order)
// ─────────────────────────────────────────────
const INITIAL_POINTS: PointConfig[] = [
  { id: "A1", shelfSection: "stThree", defaultSequence: buildDefault("A1") },
  { id: "A2", shelfSection: "stTwo", defaultSequence: buildDefault("A2") },
  { id: "A3", shelfSection: "stOne", defaultSequence: buildDefault("A3") },
  { id: "B1", shelfSection: "stSix", defaultSequence: buildDefault("B1") },
  { id: "B2", shelfSection: "stFive", defaultSequence: buildDefault("B2") },
  { id: "B3", shelfSection: "stFour", defaultSequence: buildDefault("B3") },
];

// ─────────────────────────────────────────────
// Sequence Edit Modal
// ─────────────────────────────────────────────
interface SequenceModalProps {
  point: PointConfig;
  customSequence: PointSequence;
  availableFunctions: string[];
  onSave: (seq: PointSequence) => void;
  onClose: () => void;
}

function SequenceModal({
  point,
  customSequence,
  availableFunctions,
  onSave,
  onClose,
}: SequenceModalProps) {
  const [retrieve, setRetrieve] = useState<string[]>([
    ...customSequence.retrieve,
  ]);
  const [store, setStore] = useState<string[]>([...customSequence.store]);

  const updateStep = (
    list: string[],
    setList: (v: string[]) => void,
    idx: number,
    val: string,
  ) => {
    const next = [...list];
    next[idx] = val;
    setList(next);
  };

  const addStep = (list: string[], setList: (v: string[]) => void) => {
    setList([...list, ""]);
  };

  const removeStep = (
    list: string[],
    setList: (v: string[]) => void,
    idx: number,
  ) => {
    setList(list.filter((_, i) => i !== idx));
  };

  const reset = () => {
    const def = buildDefault(point.id);
    setRetrieve([...def.retrieve]);
    setStore([...def.store]);
  };

  const StepList = ({
    label,
    steps,
    setSteps,
    color,
  }: {
    label: string;
    steps: string[];
    setSteps: (v: string[]) => void;
    color: string;
  }) => (
    <div className="flex-1">
      <p
        className={cn(
          "text-xs font-bold mb-2 flex items-center gap-1.5",
          color,
        )}
      >
        <ListOrdered className="size-3.5" /> {label}
      </p>
      <div className="space-y-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-5 shrink-0 text-center font-mono">
              {i + 1}
            </span>
            <select
              value={step}
              onChange={(e) => updateStep(steps, setSteps, i, e.target.value)}
              className="flex-1 h-9 px-2 bg-muted/60 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">-- اختر دالة --</option>
              {availableFunctions.map((fn) => (
                <option key={fn} value={fn}>
                  {fn}
                </option>
              ))}
            </select>
            <button
              onClick={() => removeStep(steps, setSteps, i)}
              className="size-8 flex items-center justify-center rounded-lg text-destructive hover:bg-destructive/10 transition-colors shrink-0"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ))}
        <button
          onClick={() => addStep(steps, setSteps)}
          className="w-full h-8 border border-dashed border-border rounded-lg text-xs text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
        >
          + إضافة خطوة
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Settings2 className="size-5 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">
                تعديل تسلسل النقطة {point.id}
              </h2>
              <p className="text-xs text-muted-foreground">
                يمكنك تخصيص ترتيب الحركات لكل عملية
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="size-9 flex items-center justify-center rounded-xl hover:bg-muted transition-colors text-muted-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          <div className="flex gap-6">
            <StepList
              label="الاستدعاء (النقطة → Fixed)"
              steps={retrieve}
              setSteps={setRetrieve}
              color="text-blue-500"
            />
            <StepList
              label="التخزين (Fixed → النقطة)"
              steps={store}
              setSteps={setStore}
              color="text-emerald-500"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30 gap-3">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
          >
            <RotateCcw className="size-4" /> إعادة الضبط
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium border border-border hover:bg-muted transition-colors"
            >
              إلغاء
            </button>
            <button
              onClick={() => onSave({ retrieve, store })}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20"
            >
              <Play className="size-4" /> حفظ التسلسل
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
function RobotArmPage() {
  const { data: statusData, isLoading: isStatusLoading } =
    useGetRobotArmStatus();
  const { mutate: sendAction, isPending: isSending } = useSendRobotArmAction();
  const {
    data: shelves,
    isLoading: isShelvesLoading,
    error,
  } = useGetAllSmartShelves();
  const { data: armFunctions } = useGetAllArmFunctions();

  const [selectedShelfName, setSelectedShelfName] = useState<string | null>(
    null,
  );
  const [editingPoint, setEditingPoint] = useState<PointConfig | null>(null);

  // customSequences overrides per point id
  const [customSequences, setCustomSequences] = useState<
    Record<string, PointSequence>
  >({});

  const activeShelf =
    shelves?.find((s) => s.name === selectedShelfName) || shelves?.[0];
  const isBusy = statusData?.isBusy || false;
  const isArmLoading = isStatusLoading || isSending;

  const getSequence = (point: PointConfig): PointSequence =>
    customSequences[point.id] || point.defaultSequence;

  const handleAction = (point: PointConfig, type: "retrieve" | "store") => {
    if (isBusy) return;
    const seq = getSequence(point);
    sendAction(type === "retrieve" ? seq.retrieve : seq.store);
  };

  const getSectionProduct = (sectionName: string) => {
    if (!activeShelf) return null;
    const section = activeShelf.sections.find((s) => s.section === sectionName);
    if (!section || !section.product) return null;
    const prodLower = section.product.toLowerCase().trim();
    if (["empty", "empety", "null", ""].includes(prodLower)) return null;
    return section.product;
  };

  const availableFunctionNames = armFunctions?.map((f) => f.name) || [];

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* ── Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-2xl flex items-center gap-2">
              <Bot className="size-8 text-primary" />
              <Layers className="size-6 text-blue-500" />
            </div>
            النظام المدمج
          </h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base pr-2">
            مراقبة محتويات الرف وتوجيه الذراع الآلي للتخزين والاستدعاء بسلاسة
          </p>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl border bg-card shadow-xs">
            <RefreshCw
              className={cn(
                "size-5 text-blue-500",
                isShelvesLoading && "animate-spin",
              )}
            />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-foreground">
                بيانات الرف
              </span>
              <span className="text-[10px] text-muted-foreground">
                {isShelvesLoading
                  ? "جاري التحديث..."
                  : "متصل بالذكاء الاصطناعي"}
              </span>
            </div>
          </div>

          <div
            className={cn(
              "flex items-center gap-3 px-5 py-2.5 rounded-2xl border bg-card shadow-xs transition-colors duration-500",
              isBusy ? "border-destructive/30" : "border-emerald-500/30",
            )}
          >
            <div className="relative flex size-3">
              <div
                className={cn(
                  "absolute inset-0 rounded-full opacity-75 animate-ping duration-1000",
                  isBusy ? "bg-destructive" : "bg-emerald-500",
                )}
              />
              <div
                className={cn(
                  "relative inline-flex rounded-full size-3",
                  isBusy ? "bg-destructive" : "bg-emerald-500",
                )}
              />
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  "text-xs font-bold",
                  isBusy
                    ? "text-destructive"
                    : "text-emerald-600 dark:text-emerald-400",
                )}
              >
                {isBusy ? "الذراع مشغول" : "الذراع متاح"}
              </span>
              <span
                className="text-[10px] text-muted-foreground line-clamp-1 max-w-[120px]"
                title={statusData?.currentAction || ""}
              >
                {statusData?.currentAction
                  ? `ينفذ: ${statusData.currentAction}`
                  : "جاهز للأوامر"}
              </span>
            </div>
            {isBusy ? (
              <Lock className="size-4 ml-1 text-destructive/70" />
            ) : (
              <Unlock className="size-4 ml-1 text-emerald-500/70" />
            )}
          </div>
        </div>
      </div>

      {error ? (
        <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 text-destructive">
          <AlertCircle className="size-10" />
          <p className="font-medium">حدث خطأ أثناء جلب بيانات النظام</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ── Sidebar ── */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card border border-border rounded-3xl p-6 shadow-xs relative overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Scan className="size-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">بيانات الرف</h3>
                    <p className="text-xs text-muted-foreground">
                      التفاصيل الحالية
                    </p>
                  </div>
                </div>

                {shelves && shelves.length > 0 && (
                  <select
                    className="bg-muted border-none text-xs rounded-lg px-2 py-1 outline-none cursor-pointer"
                    value={selectedShelfName || activeShelf?.name || ""}
                    onChange={(e) => setSelectedShelfName(e.target.value)}
                  >
                    {shelves.map((shelf) => (
                      <option key={shelf.name} value={shelf.name}>
                        {shelf.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center p-3 rounded-xl bg-muted/50">
                  <span className="text-sm text-muted-foreground">
                    نوع الرف
                  </span>
                  <span
                    className={cn(
                      "text-sm font-semibold px-3 py-1 rounded-full",
                      activeShelf?.isMixed
                        ? "bg-amber-500/10 text-amber-600"
                        : "bg-emerald-500/10 text-emerald-600",
                    )}
                  >
                    {activeShelf?.isMixed ? "متنوع (Mixed)" : "غير متنوع"}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-muted/50">
                  <span className="text-sm text-muted-foreground">
                    حالة الاتصال بالذراع
                  </span>
                  <span className="text-sm font-semibold flex items-center gap-2">
                    <Server className="size-4 text-emerald-500" /> متصل
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-muted/50">
                  <span className="text-sm text-muted-foreground">
                    النقاط المشغولة
                  </span>
                  <span className="text-sm font-semibold text-blue-500">
                    {
                      INITIAL_POINTS.filter(
                        (p) => getSectionProduct(p.shelfSection) !== null,
                      ).length
                    }{" "}
                    / 6
                  </span>
                </div>

                <Link
                  href="/dashboard/arm-functions"
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-primary text-background text-xs font-bold hover:bg-primary/90"
                >
                  أوامر النظام
                </Link>
              </div>
            </div>

            {/* How it works */}
            <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6">
              <h3 className="font-bold text-primary flex items-center gap-2 mb-2">
                <Activity className="size-5" /> كيف يعمل النظام؟
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                إذا كانت النقطة{" "}
                <strong className="text-foreground">مشغولة</strong>، يمكنك الضغط
                على زر الاستدعاء لتحريك الذراع وإحضار المنتج للمنطقة الثابتة.
                <br />
                <br />
                إذا كانت النقطة{" "}
                <strong className="text-foreground">فارغة</strong>، يمكنك الضغط
                على زر التخزين ليوجه الذراع بوضع المنتج في هذا الرف.
                <br />
                <br />
                اضغط <strong className="text-foreground">⚙️</strong> لتعديل
                تسلسل الحركات لأي نقطة.
              </p>
            </div>
          </div>

          {/* ── Grid ── */}
          <div className="lg:col-span-8 bg-card border border-border rounded-3xl p-6 md:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <Layers className="size-6 text-blue-500" />
                المخطط التفاعلي للرف
              </h2>
              {/* Row Labels */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-blue-400 inline-block" />{" "}
                  الصف A (علوي)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-purple-400 inline-block" />{" "}
                  الصف B (سفلي)
                </span>
              </div>
            </div>

            {/* 3x2 Grid */}
            <div className="grid grid-cols-3 gap-4 md:gap-5">
              {INITIAL_POINTS.map((point) => {
                const product = getSectionProduct(point.shelfSection);
                const isOccupied = product !== null;
                const isRowA = point.id.startsWith("A");
                const seq = getSequence(point);
                const hasCustom = !!customSequences[point.id];

                return (
                  <div
                    key={point.id}
                    className={cn(
                      "relative group flex flex-col items-center justify-between p-4 rounded-2xl transition-all duration-300 min-h-[200px] z-10 border-2 bg-background",
                      isOccupied
                        ? "border-blue-500/30 shadow-sm"
                        : "border-dashed border-border",
                    )}
                  >
                    {/* Point label */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span
                        className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-md",
                          isRowA
                            ? "bg-blue-500/15 text-blue-600"
                            : "bg-purple-500/15 text-purple-600",
                        )}
                      >
                        {point.id}
                      </span>
                      {hasCustom && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-amber-500/15 text-amber-600 font-medium">
                          مخصص
                        </span>
                      )}
                    </div>

                    {/* Edit sequence button */}
                    <button
                      onClick={() => setEditingPoint(point)}
                      className="absolute top-2.5 right-2.5 size-7 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
                      title="تعديل التسلسل"
                    >
                      <Settings2 className="size-3.5" />
                    </button>

                    {/* Product info */}
                    <div className="flex flex-col items-center gap-2 text-center mt-4 flex-1 justify-center">
                      {isOccupied ? (
                        <>
                          <div className="p-2.5 bg-blue-500/10 rounded-full">
                            <PackageSearch className="size-7 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="font-bold text-foreground capitalize leading-tight text-sm line-clamp-2">
                              {product}
                            </p>
                            <p className="text-xs text-blue-500/80 mt-0.5">
                              مشغول
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="p-2.5 bg-emerald-500/10 rounded-full opacity-60">
                            <PackageOpen className="size-7 text-emerald-500" />
                          </div>
                          <div>
                            <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                              متاح
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              مساحة فارغة
                            </p>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Sequence preview */}
                    <div className="w-full mt-2 mb-3 px-1">
                      <div className="text-[9px] text-muted-foreground/60 font-mono truncate text-center">
                        {isOccupied
                          ? seq.retrieve.join(" → ")
                          : seq.store.join(" → ")}
                      </div>
                    </div>

                    {/* Action button */}
                    <div className="w-full pt-3 border-t border-border/50">
                      {isOccupied ? (
                        <button
                          disabled={isBusy || isArmLoading}
                          onClick={() => handleAction(point, "retrieve")}
                          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-500 text-white text-xs font-bold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <ArrowDownToLine className="size-3.5" />
                          استدعاء
                        </button>
                      ) : (
                        <button
                          disabled={isBusy || isArmLoading}
                          onClick={() => handleAction(point, "store")}
                          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <ArrowUpFromLine className="size-3.5" />
                          تخزين
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Sequence Edit Modal ── */}
      {editingPoint && (
        <SequenceModal
          point={editingPoint}
          customSequence={getSequence(editingPoint)}
          availableFunctions={availableFunctionNames}
          onSave={(seq) => {
            setCustomSequences((prev) => ({ ...prev, [editingPoint.id]: seq }));
            setEditingPoint(null);
          }}
          onClose={() => setEditingPoint(null)}
        />
      )}
    </div>
  );
}
export default withRoles("operation")(RobotArmPage);
