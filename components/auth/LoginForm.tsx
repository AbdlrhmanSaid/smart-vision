"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Loader2, Zap } from "lucide-react";
import axiosInstance from "@/server/axios";
import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";
import logo from "@/public/logo.png";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }
    try {
      setLoading(true);
      const response = await axiosInstance.post("/auth/login", formData);
      const token = response.data?.token || response.data?.data?.token;
      const user = response.data?.user || response.data?.data?.user;

      if (token && user) {
        setCookie("token", token, { maxAge: 30 * 24 * 60 * 60, path: "/" });
        useAuthStore.getState().setAuth(user, token);

        toast.success("تم تسجيل الدخول بنجاح ");
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.error("لم يتم العثور على التوكن أو المستخدم");
      }
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        "حدث خطأ أثناء تسجيل الدخول، حاول مرة أخرى";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full" dir="rtl">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center rounded-2xl overflow-hidden">
          <Image
            src={logo}
            alt="logo"
            width={60}
            height={60}
            priority
            className="object-contain"
          />
        </div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">
          مرحباً بك
        </h1>
        <p className="text-muted-foreground text-sm">
          سجّل دخولك للوصول إلى لوحة التحكم
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div className="space-y-1.5">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-foreground"
          >
            اسم المستخدم
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="أدخل اسم المستخدم"
            disabled={loading}
            required
            autoComplete="username"
            className="w-full h-11 px-4 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:ring-2 focus:ring-primary/25 focus:border-primary/60 disabled:opacity-50"
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-foreground"
          >
            كلمة المرور
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="أدخل كلمة المرور"
              disabled={loading}
              required
              autoComplete="current-password"
              className="w-full h-11 pr-4 pl-11 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:ring-2 focus:ring-primary/25 focus:border-primary/60 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              disabled={loading}
              tabIndex={-1}
              className="absolute inset-y-0 left-0 flex items-center justify-center w-11 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 mt-2 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 hover:-translate-y-px active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              جاري التحقق...
            </>
          ) : (
            "تسجيل الدخول"
          )}
        </button>
      </form>
    </div>
  );
}
