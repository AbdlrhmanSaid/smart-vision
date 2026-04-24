import React from "react";
import { LucideIcon } from "lucide-react";

interface LoadingStateProps {
  icon: LucideIcon;
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  icon: Icon,
  message = "جاري التحميل...",
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center h-96 gap-4"
      dir="rtl"
    >
      <div className="relative">
        <div className="w-14 h-14 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />

        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="size-5 text-primary" />
        </div>
      </div>

      <p className="text-muted-foreground text-sm animate-pulse font-medium">
        {message}
      </p>
    </div>
  );
};

export default LoadingState;
