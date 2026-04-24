import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { RoleService } from "@/services/role.service";
import { ActivityService } from "@/services/activity.service";
import { CreateRoleInput, UpdateRoleInput } from "@/types/role";

const ROLES_KEY = ["roles"];

export function useRoles() {
  const qc = useQueryClient();

  const useGetAllRoles = () =>
    useQuery({
      queryKey: ROLES_KEY,
      queryFn: RoleService.getAll,
    });

  const useCreateRole = () =>
    useMutation({
      mutationFn: (data: CreateRoleInput) => RoleService.create(data),
      onSuccess: (data) => {
        qc.invalidateQueries({ queryKey: ROLES_KEY });
        toast.success("تم إنشاء الرول بنجاح");
        ActivityService.create(`تم إضافة صلاحية جديدة: ${data.name}`).catch(console.error);
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.error || "فشل إنشاء الرول");
      },
    });

  const useUpdateRole = () =>
    useMutation({
      mutationFn: ({ id, data }: { id: string; data: UpdateRoleInput }) =>
        RoleService.update(id, data),
      onSuccess: (data) => {
        qc.invalidateQueries({ queryKey: ROLES_KEY });
        toast.success("تم تحديث الرول بنجاح");
        ActivityService.create(`تم تحديث اسم صلاحية إلى: ${data.name}`).catch(console.error);
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.error || "فشل تحديث الرول");
      },
    });

  const useDeleteRole = () =>
    useMutation({
      mutationFn: (id: string) => RoleService.delete(id),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ROLES_KEY });
        // also refresh users since their roles may have changed
        qc.invalidateQueries({ queryKey: ["users"] });
        toast.success("تم حذف الرول وتحديث المستخدمين");
        ActivityService.create(`تم حذف صلاحية من النظام`).catch(console.error);
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.error || "فشل حذف الرول");
      },
    });

  return { useGetAllRoles, useCreateRole, useUpdateRole, useDeleteRole };
}
