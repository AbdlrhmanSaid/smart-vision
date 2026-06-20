import axiosInstance from "@/server/axios";

export interface ArmFunction {
  _id: string;
  name: string;
  type: "steps" | "frames" | "sequence";
  frames: any[];
  steps: string[];
  createdAt: string;
  updatedAt: string;
}

export const ArmFunctionsService = {
  // Get all arm functions
  getAll: async (): Promise<ArmFunction[]> => {
    const response = await axiosInstance.get("/robotarm/arm-functions");
    return response.data?.data || response.data;
  },
};
