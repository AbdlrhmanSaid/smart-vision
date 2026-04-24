import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ActivityService } from "@/services/activity.service";
import toast from "react-hot-toast";

export const ACTIVITIES_QUERY_KEY = ["activities"];

export const useActivity = () => {
  const queryClient = useQueryClient();

  const useGetAllActivities = () => {
    return useQuery({
      queryKey: ACTIVITIES_QUERY_KEY,
      queryFn: ActivityService.getAll,
      refetchInterval: 5000,
    });
  };

  const useClearActivities = () => {
    return useMutation({
      mutationFn: ActivityService.clearAll,
      onSuccess: () => {
        toast.success("تم مسح سجل النشاطات بنجاح");
        queryClient.invalidateQueries({ queryKey: ACTIVITIES_QUERY_KEY });
      },
      onError: () => {
        toast.error("حدث خطأ أثناء مسح النشاطات");
      },
    });
  };

  return {
    useGetAllActivities,
    useClearActivities,
  };
};
