import { Construction, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ComingSoonPageProps {
  title: string;
  description?: string;
}

export function ComingSoonPage({
  title,
  description = "هذه الصفحة قيد التطوير حالياً وستكون متاحة قريباً.",
}: ComingSoonPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6" dir="rtl">
      {/* Animated icon */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-3xl bg-primary/10 blur-xl scale-150" />
        <div className="relative flex items-center justify-center w-24 h-24 rounded-3xl bg-primary/10 border border-primary/20">
          <Construction className="size-10 text-primary" />
        </div>
        {/* Orbiting dots */}
        <span className="absolute -top-1 -right-1 size-3 rounded-full bg-amber-400 border-2 border-white dark:border-card animate-bounce" />
        <span className="absolute -bottom-1 -left-1 size-2.5 rounded-full bg-blue-400 border-2 border-white dark:border-card animate-bounce delay-150" />
      </div>

      {/* Text */}
      <h1 className="text-2xl font-bold text-foreground mb-3">{title}</h1>
      <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed">{description}</p>

      {/* Progress bar (decorative) */}
      <div className="w-48 h-1.5 bg-muted rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-primary rounded-full"
          style={{ width: "45%", animation: "none" }}
        />
      </div>

      {/* Badge */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 mb-8">
        <span className="size-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-sm font-medium text-amber-700 dark:text-amber-400">
          قيد التطوير — سيتم الإطلاق قريباً
        </span>
      </div>

      {/* Back link */}
      <Link
        href="/dashboard"
        className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
      >
        <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
        العودة إلى لوحة التحكم
      </Link>
    </div>
  );
}
