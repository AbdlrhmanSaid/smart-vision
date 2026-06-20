import { useQuery } from "@tanstack/react-query";
import { ArmFunctionsService } from "@/services/arm-functions.service";

// Key for React Query cache
export const ARM_FUNCTIONS_QUERY_KEY = ["arm-functions"];

// 1. Get All Products
export const useGetAllArmFunctions = () => {
  return useQuery({
    queryKey: ARM_FUNCTIONS_QUERY_KEY,
    queryFn: ArmFunctionsService.getAll,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });
};
