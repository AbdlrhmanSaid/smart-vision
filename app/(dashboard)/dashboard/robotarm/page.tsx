"use client";

import { useState } from "react";
import { useGetRobotArmStatus, useSendRobotArmAction } from "@/hooks/useRobotArm";
import { useGetAllSmartShelves } from "@/hooks/useSmartShelf";
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
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

const GRID_MAPPING = [
  { id: "stThree", armAction: "stThree", armDirected: "to-stThree" },
  { id: "stTwo",   armAction: "stTwo",   armDirected: "to-stTwo" },
  { id: "stOne",   armAction: "stOne",   armDirected: "to-stOne" },
  { id: "stSix",   armAction: "sbThree", armDirected: "to-sbThree" },
  { id: "stFive",  armAction: "sbTwo",   armDirected: "to-sbTwo" },
  { id: "stFour",  armAction: "sbOne",   armDirected: "to-sbOne" },
];

export default function RobotArmPage() {
  // Robot Arm
  const { data: statusData, isLoading: isStatusLoading } = useGetRobotArmStatus();
  const { mutate: sendAction, isPending: isSending } = useSendRobotArmAction();

  // Smart Shelf
  const { data: shelves, isLoading: isShelvesLoading, error } = useGetAllSmartShelves();
  const [selectedShelfName, setSelectedShelfName] = useState<string | null>(null);
  const activeShelf = shelves?.find((s) => s.name === selectedShelfName) || shelves?.[0];

  const isBusy = statusData?.isBusy || false;
  const isArmLoading = isStatusLoading || isSending;

  const handleAction = (action: string) => {
    if (isBusy) return;
    sendAction(action);
  };

  const getSectionProduct = (sectionName: string) => {
    if (!activeShelf) return null;
    const section = activeShelf.sections.find((s) => s.section === sectionName);
    if (!section || !section.product) return null;
    
    const prodLower = section.product.toLowerCase().trim();
    if (prodLower === "empty" || prodLower === "empety" || prodLower === "null" || prodLower === "") {
      return null;
    }
    return section.product;
  };

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-2xl flex items-center gap-2">
              <Bot className="size-8 text-primary" />
              <Layers className="size-6 text-blue-500" />
            </div>
            النظام المدمج (الذراع والرف)
          </h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base pr-2">
            مراقبة محتويات الرف وتوجيه الذراع الآلي للتخزين والاستدعاء بسلاسة
          </p>
        </div>

        {/* Live Status Indicators */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Shelf Update Status */}
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl border bg-card shadow-xs w-full sm:w-auto">
            <RefreshCw className={cn("size-5 text-blue-500", isShelvesLoading && "animate-spin")} />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-foreground">بيانات الرف</span>
              <span className="text-[10px] text-muted-foreground">{isShelvesLoading ? "جاري التحديث..." : "متصل بالذكاء الاصطناعي"}</span>
            </div>
          </div>

          {/* Arm Status */}
          <div
            className={cn(
              "flex items-center gap-3 px-5 py-2.5 rounded-2xl border bg-card shadow-xs transition-colors duration-500 w-full sm:w-auto",
              isBusy ? "border-destructive/30 shadow-destructive/10" : "border-emerald-500/30 shadow-emerald-500/10"
            )}
          >
            <div className="relative flex size-3">
              <div className={cn("absolute inset-0 rounded-full opacity-75 animate-ping duration-1000", isBusy ? "bg-destructive" : "bg-emerald-500")} />
              <div className={cn("relative inline-flex rounded-full size-3", isBusy ? "bg-destructive" : "bg-emerald-500")} />
            </div>
            <div className="flex flex-col">
              <span className={cn("text-xs font-bold", isBusy ? "text-destructive" : "text-emerald-600 dark:text-emerald-400")}>
                {isBusy ? "الذراع مشغول" : "الذراع متاح"}
              </span>
              <span className="text-[10px] text-muted-foreground line-clamp-1 max-w-[120px]" title={statusData?.currentAction || ""}>
                {statusData?.currentAction ? `ينفذ: ${statusData.currentAction}` : "جاهز للأوامر"}
              </span>
            </div>
            {isBusy ? <Lock className="size-4 ml-1 text-destructive/70" /> : <Unlock className="size-4 ml-1 text-emerald-500/70" />}
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
          
          {/* Info Sidebar */}
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
                    <p className="text-xs text-muted-foreground">التفاصيل الحالية</p>
                  </div>
                </div>
                
                {shelves && shelves.length > 0 && (
                  <select
                    className="bg-muted border-none text-xs rounded-lg px-2 py-1 outline-none cursor-pointer"
                    value={selectedShelfName || activeShelf?.name || ""}
                    onChange={(e) => setSelectedShelfName(e.target.value)}
                  >
                    {shelves.map((shelf) => (
                      <option key={shelf.name} value={shelf.name}>{shelf.name}</option>
                    ))}
                  </select>
                )}
              </div>
              
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center p-3 rounded-xl bg-muted/50">
                  <span className="text-sm text-muted-foreground">نوع الرف</span>
                  <span className={cn("text-sm font-semibold px-3 py-1 rounded-full", activeShelf?.isMixed ? "bg-amber-500/10 text-amber-600" : "bg-emerald-500/10 text-emerald-600")}>
                    {activeShelf?.isMixed ? "متنوع (Mixed)" : "غير متنوع"}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-muted/50">
                  <span className="text-sm text-muted-foreground">حالة الاتصال بالذراع</span>
                  <span className="text-sm font-semibold flex items-center gap-2">
                    <Server className="size-4 text-emerald-500" /> متصل
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-muted/50">
                  <span className="text-sm text-muted-foreground">النقاط المشغولة</span>
                  <span className="text-sm font-semibold text-blue-500">
                    {GRID_MAPPING.filter(s => getSectionProduct(s.id) !== null).length} / 6
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6">
              <h3 className="font-bold text-primary flex items-center gap-2 mb-2">
                <Activity className="size-5" /> كيف يعمل النظام؟
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                إذا كانت النقطة <strong className="text-foreground">مشغولة</strong>، يمكنك الضغط على زر الاستدعاء لتحريك الذراع وإحضار المنتج للمنطقة الثابتة.<br/><br/>
                إذا كانت النقطة <strong className="text-foreground">فارغة</strong>، يمكنك الضغط على زر التخزين ليوجه الذراع بوضع المنتج الموجود في المنطقة الثابتة داخل هذا الرف.
              </p>
            </div>
          </div>

          {/* Interactive Unified Grid */}
          <div className="lg:col-span-8 bg-card border border-border rounded-3xl p-6 md:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <Layers className="size-6 text-blue-500" />
                المخطط التفاعلي للرف
              </h2>
            </div>

            {/* 2x3 Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 relative">
              {/* Shelves Background Lines */}
              <div className="absolute top-1/2 left-0 right-0 h-4 bg-muted/40 rounded-full -translate-y-1/2 shadow-inner pointer-events-none" />
              <div className="absolute bottom-[-16px] left-0 right-0 h-4 bg-muted/40 rounded-full shadow-inner pointer-events-none" />

              {GRID_MAPPING.map((section) => {
                const product = getSectionProduct(section.id);
                const isOccupied = product !== null;

                return (
                  <div
                    key={section.id}
                    className={cn(
                      "relative group flex flex-col items-center justify-between p-4 md:p-6 rounded-2xl transition-all duration-300 min-h-[220px] z-10",
                      "border-2 bg-background",
                      isOccupied ? "border-blue-500/30 shadow-sm" : "border-dashed border-border"
                    )}
                  >
                    <div className="absolute top-3 left-3 text-[10px] font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                      {section.id}
                    </div>

                    <div className="flex flex-col items-center gap-3 text-center mt-4">
                      {isOccupied ? (
                        <>
                          <div className="p-3 bg-blue-500/10 rounded-full">
                            <PackageSearch className="size-8 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="font-bold text-foreground capitalize leading-tight">{product}</p>
                            <p className="text-xs text-blue-500/80 mt-1">مشغول</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="p-3 bg-emerald-500/10 rounded-full opacity-60">
                            <PackageOpen className="size-8 text-emerald-500" />
                          </div>
                          <div>
                            <p className="font-bold text-emerald-600 dark:text-emerald-400">متاح</p>
                            <p className="text-xs text-muted-foreground mt-1">مساحة فارغة</p>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Arm Control Button Inside The Box */}
                    <div className="w-full mt-4 pt-4 border-t border-border/50">
                      {isOccupied ? (
                        <button
                          disabled={isBusy || isArmLoading}
                          onClick={() => handleAction(section.armAction)}
                          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-blue-500 text-white text-xs font-bold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <ArrowDownToLine className="size-4" />
                          استدعاء المنتج
                        </button>
                      ) : (
                        <button
                          disabled={isBusy || isArmLoading}
                          onClick={() => handleAction(section.armDirected)}
                          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <ArrowUpFromLine className="size-4" />
                          تخزين هنا
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
    </div>
  );
}
