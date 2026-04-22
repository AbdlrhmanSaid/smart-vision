import axiosInstance from "@/server/axios";
import { Role, CreateRoleInput, UpdateRoleInput } from "@/types/role";

export const RoleService = {
  // GET /api/roles/
  getAll: async (): Promise<Role[]> => {
    const res = await axiosInstance.get("/roles/");
    return res.data;
  },

  // GET /api/roles/:id
  getById: async (id: string): Promise<Role> => {
    const res = await axiosInstance.get(`/roles/${id}`);
    return res.data;
  },

  // POST /api/roles/
  create: async (data: CreateRoleInput): Promise<Role> => {
    const res = await axiosInstance.post("/roles/", data);
    return res.data?.role ?? res.data;
  },

  // PUT /api/roles/:id
  update: async (id: string, data: UpdateRoleInput): Promise<Role> => {
    const res = await axiosInstance.put(`/roles/${id}`, data);
    return res.data?.role ?? res.data;
  },

  // DELETE /api/roles/:id
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/roles/${id}`);
  },
};
