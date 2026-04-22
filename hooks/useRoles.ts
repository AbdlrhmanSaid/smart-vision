import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { RoleService } from "@/services/role.service";
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
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ROLES_KEY });
        toast.success("تم إنشاء الرول بنجاح");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.error || "فشل إنشاء الرول");
      },
    });

  const useUpdateRole = () =>
    useMutation({
      mutationFn: ({ id, data }: { id: string; data: UpdateRoleInput }) =>
        RoleService.update(id, data),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ROLES_KEY });
        toast.success("تم تحديث الرول بنجاح");
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
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.error || "فشل حذف الرول");
      },
    });

  return { useGetAllRoles, useCreateRole, useUpdateRole, useDeleteRole };
}
