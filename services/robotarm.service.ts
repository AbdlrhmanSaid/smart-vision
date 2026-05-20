import axiosInstance from "@/server/axios";

export interface RobotArmStatusResponse {
  success: boolean;
  isBusy: boolean;
  currentAction: string | null;
  message: string;
}

export interface RobotArmActionResponse {
  success: boolean;
  message: string;
  action?: string;
}

export const RobotArmService = {
  getStatus: async (): Promise<RobotArmStatusResponse> => {
    const response = await axiosInstance.get("/robotarm/status");
    return response.data;
  },

  sendAction: async (action: string): Promise<RobotArmActionResponse> => {
    const response = await axiosInstance.post("/robotarm", { action });
    return response.data;
  },
};
