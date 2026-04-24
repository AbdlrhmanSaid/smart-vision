import axiosInstance from "@/server/axios";

export interface Activity {
  _id: string;
  user: {
    _id: string;
    username: string;
  } | null;
  description: string;
  isAI: boolean;
  createdAt: string;
  updatedAt: string;
}

export const ActivityService = {
  getAll: async (): Promise<Activity[]> => {
    const response = await axiosInstance.get("/activities");
    return response.data;
  },

  create: async (description: string, isAI: boolean = false): Promise<Activity> => {
    const response = await axiosInstance.post("/activities", { description, isAI });
    return response.data;
  },

  clearAll: async (): Promise<void> => {
    await axiosInstance.delete("/activities");
  },
};
