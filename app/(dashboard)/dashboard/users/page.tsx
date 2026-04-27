"use client";

import { useState } from "react";
import { Modal } from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Trash2,
  Edit,
  Users,
  Search,
  Shield,
  Eye,
  EyeOff,
  Loader2,
  Check,
} from "lucide-react";
import { User } from "@/types/user";
import { Role } from "@/types/role";
import { useAuthStore } from "@/store/useAuthStore";
import { deleteCookie } from "cookies-next";
import LoadingState from "@/components/shared/Loading";
import { withRoles } from "@/components/shared/withRoles";
import { useIsViewOnly } from "@/hooks/useIsViewOnly";
import {
  useGetAllUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from "@/hooks/useUsers";
import { useGetAllRoles } from "@/hooks/useRoles";

function RoleBadge({ role }: { role: { _id: string; name: string } }) {
  const colorMap: Record<string, string> = {
    super_admin:
      "text-red-500 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
    admin: "text-primary bg-primary/10 border-primary/20",
    user: "text-muted-foreground bg-muted border-border",
  };
  const color =
    colorMap[role.name] ??
    "text-violet-600 bg-violet-50 dark:bg-violet-950/20 border-violet-200";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${color}`}
    >
      <Shield className="size-3" />
      {role.name}
    </span>
  );
}

function RolePicker({
  allRoles,
  selected,
  onChange,
}: {
  allRoles: Role[];
  selected: string[];
  onChange: (names: string[]) => void;
}) {
  const toggle = (name: string) => {
    onChange(
      selected.includes(name)
        ? selected.filter((r) => r !== name)
        : [...selected, name],
    );
  };

  if (!allRoles.length) {
    return (
      <p className="text-sm text-muted-foreground py-2">
        لا توجد صلاحيات بعد، أضف صلاحيات من صفحة الصلاحيات أولاً.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {allRoles.map((role) => {
        const isSelected = selected.includes(role.name);
        return (
          <button
            type="button"
            key={role._id}
            onClick={() => toggle(role.name)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium border transition-all ${
              isSelected
                ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20"
                : "bg-muted text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {isSelected ? (
              <Check className="size-3.5" />
            ) : (
              <Shield className="size-3.5" />
            )}
            {role.name}
          </button>
        );
      })}
    </div>
  );
}

function UsersPage() {
  const { data: users, isLoading } = useGetAllUsers();
  const { data: allRoles = [] } = useGetAllRoles();

  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();

  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rolesNames: [] as string[], // store role names to send to API
  });

  const currentUser = useAuthStore((state) => state.user);
  const isViewOnly = useIsViewOnly();

  const filtered = users?.filter((u) =>
    u.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const openCreate = () => {
    setEditingUser(null);
    setFormData({ username: "", password: "", rolesNames: [] });
    setShowPassword(false);
    setIsFormOpen(true);
  };

  const openEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      password: "",
      rolesNames: user.roles.map((r) => r.name), // extract names from populated objects
    });
    setShowPassword(false);
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rolesNames.length === 0) return;

    if (editingUser) {
      updateMutation.mutate(
        {
          id: editingUser._id,
          data: { username: formData.username, roles: formData.rolesNames },
        },
        { onSuccess: () => setIsFormOpen(false) },
      );
    } else {
      createMutation.mutate(
        {
          username: formData.username,
          password: formData.password,
          roles: formData.rolesNames,
        },
        { onSuccess: () => setIsFormOpen(false) },
      );
    }
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const isSelfDelete = deleteTarget._id === currentUser?._id;

    deleteMutation.mutate(deleteTarget._id, {
      onSuccess: () => {
        setDeleteTarget(null);
        if (isSelfDelete) {
          useAuthStore.getState().clearAuth();
          deleteCookie("token");
          window.location.href = "/login";
        }
      },
    });
  };

  if (isLoading) {
    return <LoadingState icon={Users} />;
  }

  return (
    <div className="space-y-6 pb-10" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <Users className="size-4 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              إدارة المستخدمين
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            إضافة وتعديل وحذف مستخدمي النظام وصلاحياتهم
          </p>
        </div>
        <Button
          onClick={openCreate}
          disabled={isViewOnly}
          title={isViewOnly ? "وضع العرض فقط — لا يمكن الإضافة" : undefined}
          className="gap-2 h-10 px-5 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          <Plus className="size-4" />
          إضافة مستخدم
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: "إجمالي المستخدمين",
            value: users?.length ?? 0,
            color: "text-primary bg-primary/10",
          },
          {
            label: "عدد الصلاحيات",
            value: allRoles.length,
            color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20",
          },
          {
            label: "لديهم أكثر من صلاحية",
            value: users?.filter((u) => u.roles.length > 1).length ?? 0,
            color: "text-violet-500 bg-violet-50 dark:bg-violet-950/20",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-card border border-border rounded-2xl p-5 flex items-center gap-4 shadow-sm"
          >
            <div
              className={`flex items-center justify-center w-11 h-11 rounded-xl ${stat.color} shrink-0`}
            >
              <Users className="size-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      {users && users.length > 0 && (
        <div className="relative max-w-sm">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="ابحث عن مستخدم..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pr-10 pl-4 text-sm bg-white dark:bg-card border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
            dir="rtl"
          />
        </div>
      )}

      {/* Table */}
      {filtered && filtered.length > 0 ? (
        <div className="bg-white dark:bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="hidden sm:grid grid-cols-[1fr_1fr_auto] gap-4 px-6 py-3 border-b border-border bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            <span>المستخدم</span>
            <span>الصلاحيات</span>
            <span>الإجراءات</span>
          </div>

          <div className="divide-y divide-border">
            {filtered.map((user) => (
              <div
                key={user._id}
                className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 sm:gap-4 px-6 py-4 items-center hover:bg-muted/20 transition-colors group"
              >
                {/* Username */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 text-primary font-bold text-sm shrink-0">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-foreground text-sm">
                    {user.username}
                  </span>
                </div>

                {/* Populated Roles */}
                <div className="flex flex-wrap gap-1.5">
                  {user.roles.length > 0 ? (
                    user.roles.map((role) => (
                      <RoleBadge key={role._id} role={role} />
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground italic">
                      لا توجد صلاحيات
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => !isViewOnly && openEdit(user)}
                    disabled={isViewOnly}
                    title={isViewOnly ? "وضع العرض فقط" : undefined}
                    className="flex items-center gap-1 h-8 px-3 text-xs font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Edit className="size-3.5" />
                    تعديل
                  </button>
                  {/* Condition to prevent deleting ANOTHER super_admin */}
                  {!(
                    user.roles.some((r) => r.name === "super_admin") &&
                    user._id !== currentUser?._id
                  ) ? (
                    <button
                      onClick={() => !isViewOnly && setDeleteTarget(user)}
                      disabled={isViewOnly}
                      title={isViewOnly ? "وضع العرض فقط" : undefined}
                      className="flex items-center gap-1 h-8 px-3 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="size-3.5" />
                      حذف
                    </button>
                  ) : (
                    <span
                      className="flex items-center gap-1 h-8 px-3 text-xs font-medium text-muted-foreground opacity-50 cursor-not-allowed"
                      title="لا يمكن حذف مدير خارق آخر"
                    >
                      <Shield className="size-3.5" />
                      محمي
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-card rounded-2xl border border-dashed border-border">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <Users className="size-8 text-primary/40" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">
            {searchTerm ? "لا توجد نتائج" : "لا يوجد مستخدمون"}
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            {searchTerm
              ? `لا يوجد مستخدم باسم "${searchTerm}"`
              : "ابدأ بإضافة أول مستخدم"}
          </p>
          {!searchTerm && (
            <Button onClick={openCreate} className="gap-2">
              <Plus className="size-4" />
              إضافة مستخدم
            </Button>
          )}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingUser ? "تعديل مستخدم" : "إضافة مستخدم جديد"}
        maxWidth="sm"
      >
        <form onSubmit={handleSubmit} className="space-y-5" dir="rtl">
          {/* Username */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">
              اسم المستخدم <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full h-10 px-3 border border-border rounded-xl bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              placeholder="مثال: ahmed123"
            />
          </div>

          {/* Password (create only) */}
          {!editingUser && (
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-foreground">
                كلمة المرور <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full h-10 pr-3 pl-10 border border-border rounded-xl bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  placeholder="أدخل كلمة مرور قوية"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 left-0 flex items-center justify-center w-10 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Roles Picker — from API */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              الصلاحيات <span className="text-red-500">*</span>
            </label>
            <RolePicker
              allRoles={allRoles}
              selected={formData.rolesNames}
              onChange={(names) =>
                setFormData({ ...formData, rolesNames: names })
              }
            />
            {formData.rolesNames.length === 0 && (
              <p className="text-xs text-red-500">
                اختر صلاحية واحدة على الأقل
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsFormOpen(false)}
              className="flex-1"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              disabled={
                createMutation.isPending ||
                updateMutation.isPending ||
                formData.rolesNames.length === 0
              }
              className="flex-1 shadow-lg shadow-primary/20"
            >
              {createMutation.isPending || updateMutation.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin ml-1" />
                  جاري الحفظ...
                </>
              ) : editingUser ? (
                "حفظ التعديلات"
              ) : (
                "إضافة المستخدم"
              )}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="تأكيد الحذف"
        maxWidth="sm"
      >
        <div className="space-y-5" dir="rtl">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/20 flex items-center justify-center">
              <Trash2 className="size-8 text-red-500" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <p className="font-semibold text-foreground">
              هل أنت متأكد من حذف هذا المستخدم؟
            </p>
            {deleteTarget && (
              <p className="text-sm text-muted-foreground">
                سيتم حذف{" "}
                <span className="font-semibold text-foreground">
                  &quot;{deleteTarget.username}&quot;
                </span>{" "}
                نهائياً.
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              className="flex-1"
            >
              إلغاء
            </Button>
            <Button
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white border-0 shadow-lg shadow-red-500/25"
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin ml-1" />
                  جاري الحذف...
                </>
              ) : (
                "نعم، احذف"
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default withRoles("users")(UsersPage);
