import axiosInstance from "@/server/axios";
import { deleteCookie } from "cookies-next";
import { ActivityService } from "./activity.service";

export const AuthService = {
  logout: async (): Promise<void> => {
    try {
      // 1. Try to call backend logout (most reliable way to log)
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      console.warn("Logout endpoint failed, attempting manual activity log.", error);
      try {
        // 2. Fallback: Manually log the activity if backend supports POST /activities
        await ActivityService.create("قام بتسجيل الخروج من النظام");
      } catch (logError) {
        console.error("Manual activity log also failed.", logError);
      }
    } finally {
      // Always clear local cookies regardless of backend success
      deleteCookie("token", { path: "/" });
    }
  },
};
