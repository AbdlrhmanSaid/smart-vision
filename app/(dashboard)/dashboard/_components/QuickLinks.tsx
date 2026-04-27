import Link from "next/link";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import { quickLinks } from "./dashboard.data";

export function QuickLinks() {
  return (
    <div className="bg-white dark:bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
        <TrendingUp className="size-4 text-primary" />
        <h2 className="font-semibold text-foreground text-sm">روابط سريعة</h2>
      </div>
      <div className="p-3 space-y-2">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-200 group"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200 shrink-0">
                <Icon className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {link.title}
                </p>
                <p className="text-xs text-muted-foreground">{link.desc}</p>
              </div>
              <ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
