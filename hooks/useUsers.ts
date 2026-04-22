import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { UserService } from "@/services/user.service";
import { CreateUserInput, UpdateUserInput, ChangePasswordInput } from "@/types/user";

const USERS_KEY = ["users"];

export function useUsers() {
  const qc = useQueryClient();

  const useGetAllUsers = () =>
    useQuery({
      queryKey: USERS_KEY,
      queryFn: UserService.getAll,
    });

  const useCreateUser = () =>
    useMutation({
      mutationFn: (data: CreateUserInput) => UserService.create(data),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: USERS_KEY });
        toast.success("تم إضافة المستخدم بنجاح");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "فشل إضافة المستخدم");
      },
    });

  const useUpdateUser = () =>
    useMutation({
      mutationFn: ({ id, data }: { id: string; data: UpdateUserInput }) =>
        UserService.update(id, data),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: USERS_KEY });
        toast.success("تم تحديث المستخدم بنجاح");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "فشل تحديث المستخدم");
      },
    });

  const useDeleteUser = () =>
    useMutation({
      mutationFn: (id: string) => UserService.delete(id),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: USERS_KEY });
        toast.success("تم حذف المستخدم");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "فشل حذف المستخدم");
      },
    });

  const useChangePassword = () =>
    useMutation({
      mutationFn: (data: ChangePasswordInput) => UserService.changePassword(data),
      onSuccess: () => {
        toast.success("تم تغيير كلمة المرور بنجاح");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "فشل تغيير كلمة المرور");
      },
    });

  return {
    useGetAllUsers,
    useCreateUser,
    useUpdateUser,
    useDeleteUser,
    useChangePassword,
  };
}
