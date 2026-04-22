import axiosInstance from "@/server/axios";
import {
  User,
  CreateUserInput,
  UpdateUserInput,
  ChangePasswordInput,
} from "@/types/user";

export const UserService = {
  // GET /api/users/
  getAll: async (): Promise<User[]> => {
    const res = await axiosInstance.get("/users/");
    return res.data;
  },

  // POST /api/users/add
  create: async (data: CreateUserInput): Promise<User> => {
    const res = await axiosInstance.post("/users/add", data);
    return res.data?.user ?? res.data;
  },

  // PUT /api/users/update/:id
  update: async (id: string, data: UpdateUserInput): Promise<User> => {
    const res = await axiosInstance.put(`/users/update/${id}`, data);
    return res.data?.user ?? res.data;
  },

  // DELETE /api/users/delete/:id
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/users/delete/${id}`);
  },

  // PUT /api/users/change-password
  changePassword: async (data: ChangePasswordInput): Promise<void> => {
    await axiosInstance.put("/users/change-password", data);
  },
};
