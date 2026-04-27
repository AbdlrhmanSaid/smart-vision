"use client";

import { useState } from "react";
import { useChangePassword } from "@/hooks/useUsers";
import { Button } from "@/components/ui/button";
import {
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
  Loader2,
  KeyRound,
  User,
  Shield,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

function InputField({
  id,
  label,
  value,
  onChange,
  show,
  onToggle,
  placeholder,
  disabled,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full h-10 pr-10 pl-10 border border-border rounded-xl bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all placeholder:text-muted-foreground disabled:opacity-50"
        />
        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <button
          type="button"
          onClick={onToggle}
          disabled={disabled}
          tabIndex={-1}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </div>
  );
}

const roleColorMap: Record<string, string> = {
  super_admin:
    "text-red-600 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
  admin: "text-primary bg-primary/10 border-primary/20",
  user: "text-muted-foreground bg-muted border-border",
};

export default function SettingsPage() {
  const currentUser = useAuthStore((state) => state.user);
  const changePasswordMutation = useChangePassword();

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    old: false,
    new_: false,
    confirm: false,
  });

  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.newPassword !== form.confirmPassword) {
      setError("كلمة المرور الجديدة وتأكيدها غير متطابقتين");
      return;
    }
    if (form.newPassword.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    changePasswordMutation.mutate(
      { oldPassword: form.oldPassword, newPassword: form.newPassword },
      {
        onSuccess: () => {
          setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
        },
      },
    );
  };

  const strength = (() => {
    const p = form.newPassword;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 6) s++;
    if (p.length >= 10) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ["", "ضعيفة", "مقبولة", "جيدة", "قوية", "ممتازة"][
    strength
  ];
  const strengthColor = [
    "",
    "bg-red-500",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-emerald-400",
    "bg-emerald-500",
  ][strength];

  return (
    <div className="space-y-6 pb-10" dir="rtl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
            <ShieldCheck className="size-4 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">إعدادات الحساب</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          إدارة إعدادات حسابك وتأمين بياناتك
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile Card — full width */}
        {currentUser && (
          <div className="lg:col-span-3 bg-white dark:bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10">
                <User className="size-4 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground text-sm">
                  معلومات الحساب الحالي
                </h2>
                <p className="text-xs text-muted-foreground">
                  بيانات المستخدم المسجّل دخوله حالياً
                </p>
              </div>
            </div>
            <div className="px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Avatar */}
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary font-bold text-2xl shrink-0 shadow-sm">
                {currentUser.username.charAt(0).toUpperCase()}
              </div>
              {/* Info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-lg font-bold text-foreground">
                    {currentUser.username}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    متصل الآن
                  </span>
                </div>
                {/* Roles */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Shield className="size-3.5 text-muted-foreground shrink-0" />
                  {currentUser.roles.length > 0 ? (
                    currentUser.roles.map((role) => (
                      <span
                        key={role._id}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${
                          roleColorMap[role.name] ??
                          "text-violet-600 bg-violet-50 dark:bg-violet-950/20 border-violet-200"
                        }`}
                      >
                        <Shield className="size-3" />
                        {role.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground italic">
                      لا توجد صلاحيات
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Change Password Card */}
        <div className="lg:col-span-2 bg-white dark:bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10">
              <KeyRound className="size-4 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground text-sm">
                تغيير كلمة المرور
              </h2>
              <p className="text-xs text-muted-foreground">
                نوصي باستخدام كلمة مرور قوية وفريدة
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <InputField
              id="old-password"
              label="كلمة المرور الحالية"
              value={form.oldPassword}
              onChange={(v) => setForm({ ...form, oldPassword: v })}
              show={show.old}
              onToggle={() => setShow({ ...show, old: !show.old })}
              placeholder="أدخل كلمة مرورك الحالية"
              disabled={changePasswordMutation.isPending}
            />

            <InputField
              id="new-password"
              label="كلمة المرور الجديدة"
              value={form.newPassword}
              onChange={(v) => setForm({ ...form, newPassword: v })}
              show={show.new_}
              onToggle={() => setShow({ ...show, new_: !show.new_ })}
              placeholder="أدخل كلمة مرور جديدة"
              disabled={changePasswordMutation.isPending}
            />

            {/* Password strength */}
            {form.newPassword && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">قوة كلمة المرور</span>
                  <span
                    className={`font-medium ${
                      strength <= 1
                        ? "text-red-500"
                        : strength <= 2
                          ? "text-orange-400"
                          : strength <= 3
                            ? "text-yellow-500"
                            : "text-emerald-500"
                    }`}
                  >
                    {strengthLabel}
                  </span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                        i <= strength ? strengthColor : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            <InputField
              id="confirm-password"
              label="تأكيد كلمة المرور"
              value={form.confirmPassword}
              onChange={(v) => setForm({ ...form, confirmPassword: v })}
              show={show.confirm}
              onToggle={() => setShow({ ...show, confirm: !show.confirm })}
              placeholder="أعد كتابة كلمة المرور الجديدة"
              disabled={changePasswordMutation.isPending}
            />

            {/* Match indicator */}
            {form.confirmPassword && (
              <p
                className={`text-xs font-medium ${
                  form.newPassword === form.confirmPassword
                    ? "text-emerald-500"
                    : "text-red-500"
                }`}
              >
                {form.newPassword === form.confirmPassword
                  ? "✓ كلمتا المرور متطابقتان"
                  : "✗ كلمتا المرور غير متطابقتين"}
              </p>
            )}

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                <span className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </span>
              </div>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                disabled={
                  changePasswordMutation.isPending ||
                  !form.oldPassword ||
                  !form.newPassword ||
                  !form.confirmPassword
                }
                className="w-full sm:w-auto px-8 shadow-lg shadow-primary/20 gap-2"
              >
                {changePasswordMutation.isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <Lock className="size-4" />
                    تحديث كلمة المرور
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Tips Card */}
        <div className="bg-white dark:bg-card border border-border rounded-2xl shadow-sm p-6 h-fit">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="size-5 text-primary" />
            <h3 className="font-semibold text-foreground text-sm">
              نصائح الأمان
            </h3>
          </div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {[
              "استخدم 10 أحرف أو أكثر",
              "أضف أرقاماً ورموزاً خاصة",
              "تجنب البيانات الشخصية",
              "لا تُشارك كلمة مرورك مع أحد",
              "غيّر كلمة مرورك بانتظام",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-primary/10 text-primary text-[10px] font-bold shrink-0">
                  {i + 1}
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
