import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تسجيل الدخول - Smart Vision",
  description: "تسجيل الدخول للوصول إلى لوحة التحكم الخاصة بك",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Gradient blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Card */}
      <div className="relative w-full max-w-sm mx-4">
        {/* Subtle top border glow */}
        <div className="absolute -top-px left-8 right-8 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

        <div className="bg-white/80 dark:bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl shadow-primary/10 p-8">
          <LoginForm />
        </div>

        {/* Bottom label */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          Smart Vision Dashboard &copy; {new Date().getFullYear()}
        </p>
      </div>
    </main>
  );
}
