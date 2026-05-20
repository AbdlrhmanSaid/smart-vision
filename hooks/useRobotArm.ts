import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RobotArmService } from "@/services/robotarm.service";
import toast from "react-hot-toast";

export const ROBOTARM_STATUS_QUERY_KEY = ["robotarm_status"];

export const useGetRobotArmStatus = () =>
  useQuery({
    queryKey: ROBOTARM_STATUS_QUERY_KEY,
    queryFn: RobotArmService.getStatus,
    refetchInterval: 2000, // Poll every 2 seconds to keep the dashboard status updated
  });

export const useSendRobotArmAction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: RobotArmService.sendAction,
    onSuccess: (data) => {
      toast.success(data.message || "تم إرسال الأمر بنجاح");
      queryClient.invalidateQueries({ queryKey: ROBOTARM_STATUS_QUERY_KEY });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "حدث خطأ أثناء إرسال الأمر";
      toast.error(message);
      queryClient.invalidateQueries({ queryKey: ROBOTARM_STATUS_QUERY_KEY });
    },
  });
};
