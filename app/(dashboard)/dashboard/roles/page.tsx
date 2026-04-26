"use client";

import { useState } from "react";
import { useRoles } from "@/hooks/useRoles";
import { Modal } from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit, Shield, Loader2, Tag, Search } from "lucide-react";
import { Role } from "@/types/role";
import LoadingState from "@/components/shared/Loading";
import { withRoles } from "@/components/shared/withRoles";

// Color cycling for role badges
const colors = [
  "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800",
  "bg-violet-50 text-violet-600 border-violet-200 dark:bg-violet-950/20 dark:border-violet-800",
  "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800",
  "bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-950/20 dark:border-orange-800",
  "bg-pink-50 text-pink-600 border-pink-200 dark:bg-pink-950/20 dark:border-pink-800",
  "bg-teal-50 text-teal-600 border-teal-200 dark:bg-teal-950/20 dark:border-teal-800",
];

function getRoleColor(index: number) {
  return colors[index % colors.length];
}

function RolesPage() {
  const { useGetAllRoles, useCreateRole, useUpdateRole, useDeleteRole } =
    useRoles();

  const { data: roles, isLoading } = useGetAllRoles();
  const createMutation = useCreateRole();
  const updateMutation = useUpdateRole();
  const deleteMutation = useDeleteRole();

  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Role | null>(null);
  const [roleName, setRoleName] = useState("");

  const filtered = roles?.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const openCreate = () => {
    setEditingRole(null);
    setRoleName("");
    setIsFormOpen(true);
  };

  const openEdit = (role: Role) => {
    setEditingRole(role);
    setRoleName(role.name);
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = roleName.trim();
    if (!name) return;

    if (editingRole) {
      updateMutation.mutate(
        { id: editingRole._id, data: { name } },
        { onSuccess: () => setIsFormOpen(false) },
      );
    } else {
      createMutation.mutate(
        { name },
        {
          onSuccess: () => {
            setIsFormOpen(false);
            setRoleName("");
          },
        },
      );
    }
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget._id, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  if (isLoading) {
    return <LoadingState icon={Shield} />;
  }

  return (
    <div className="space-y-6 pb-10" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <Shield className="size-4 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              إدارة الصلاحيات
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            أنشئ وعدّل وامسح صلاحيات المستخدمين في النظام
          </p>
        </div>
        <Button
          onClick={openCreate}
          className="gap-2 h-10 px-5 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-px"
        >
          <Plus className="size-4" />
          إضافة صلاحية
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 flex items-center gap-4 shadow-sm">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 shrink-0">
            <Tag className="size-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">إجمالي الصلاحيات</p>
            <p className="text-2xl font-bold text-foreground">
              {roles?.length ?? 0}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 flex items-center gap-4 shadow-sm sm:col-span-2">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-2">
              الصلاحيات الموجودة
            </p>
            <div className="flex flex-wrap gap-2">
              {roles?.slice(0, 8).map((role, i) => (
                <span
                  key={role._id}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getRoleColor(i)}`}
                >
                  <Shield className="size-3" />
                  {role.name}
                </span>
              ))}
              {(roles?.length ?? 0) > 8 && (
                <span className="text-xs text-muted-foreground self-center">
                  +{(roles?.length ?? 0) - 8} أخرى
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      {roles && roles.length > 0 && (
        <div className="relative max-w-sm">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="ابحث عن صلاحية..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pr-10 pl-4 text-sm bg-white dark:bg-card border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
            dir="rtl"
          />
        </div>
      )}

      {/* Roles Grid */}
      {filtered && filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((role, i) => (
            <div
              key={role._id}
              className="group bg-white dark:bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-4"
            >
              {/* Role Icon + Name */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-xl border ${getRoleColor(i)} shrink-0`}
                >
                  <Shield className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate">
                    {role.name}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono truncate">
                    {role._id.slice(-6)}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 border-t border-border pt-3">
                <button
                  onClick={() => openEdit(role)}
                  className="flex-1 flex items-center justify-center gap-1.5 h-8 text-xs font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <Edit className="size-3.5" />
                  تعديل
                </button>
                <div className="w-px h-5 bg-border" />
                <button
                  onClick={() => setDeleteTarget(role)}
                  className="flex-1 flex items-center justify-center gap-1.5 h-8 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                >
                  <Trash2 className="size-3.5" />
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-card rounded-2xl border border-dashed border-border">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <Shield className="size-8 text-primary/40" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">
            {searchTerm ? "لا توجد نتائج" : "لا توجد صلاحيات"}
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            {searchTerm
              ? `لا توجد صلاحية باسم "${searchTerm}"`
              : "ابدأ بإضافة أول صلاحية"}
          </p>
          {!searchTerm && (
            <Button onClick={openCreate} className="gap-2">
              <Plus className="size-4" />
              إضافة صلاحية
            </Button>
          )}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingRole ? "تعديل الصلاحية" : "إضافة صلاحية جديدة"}
        maxWidth="sm"
      >
        <form onSubmit={handleSubmit} className="space-y-5" dir="rtl">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">
              اسم الصلاحية <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              autoFocus
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="مثال: admin أو moderator"
              className="w-full h-10 px-3 border border-border rounded-xl bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all font-mono"
              dir="ltr"
            />
            <p className="text-xs text-muted-foreground">
              يُفضّل استخدام حروف إنجليزية صغيرة وشرطة سفلية فقط (مثل:
              super_admin)
            </p>
          </div>

          {/* Live Preview */}
          {roleName.trim() && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/40">
              <span className="text-xs text-muted-foreground">معاينة:</span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getRoleColor(0)}`}
              >
                <Shield className="size-3" />
                {roleName.trim()}
              </span>
            </div>
          )}

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
                !roleName.trim()
              }
              className="flex-1 shadow-lg shadow-primary/20"
            >
              {createMutation.isPending || updateMutation.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin ml-1" />
                  جاري الحفظ...
                </>
              ) : editingRole ? (
                "حفظ التعديل"
              ) : (
                "إضافة الصلاحية"
              )}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="تأكيد حذف الصلاحية"
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
              هل أنت متأكد من حذف هذه الصلاحية؟
            </p>
            {deleteTarget && (
              <p className="text-sm text-muted-foreground">
                سيتم حذف{" "}
                <span className="font-semibold text-foreground font-mono">
                  &quot;{deleteTarget.name}&quot;
                </span>{" "}
                وإزالتها من جميع المستخدمين تلقائياً.
              </p>
            )}
            <div className="flex items-center justify-center gap-2 mt-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
              <span className="text-xs text-amber-700 dark:text-amber-400">
                ⚠️ المستخدمون بدون صلاحيات سيحصلون تلقائياً على صلاحية
                &quot;user&quot;
              </span>
            </div>
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

export default withRoles("roles")(RolesPage);
