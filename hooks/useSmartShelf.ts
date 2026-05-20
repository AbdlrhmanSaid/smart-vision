import { useQuery } from "@tanstack/react-query";
import { SmartShelfService } from "@/services/smartshelf.service";

export const SMARTSHELF_QUERY_KEY = ["smartshelf"];

export const useGetAllSmartShelves = () =>
  useQuery({
    queryKey: SMARTSHELF_QUERY_KEY,
    queryFn: SmartShelfService.getAll,
    refetchInterval: 3000, // Poll every 3 seconds
  });

export const useGetSmartShelf = (name: string) =>
  useQuery({
    queryKey: [...SMARTSHELF_QUERY_KEY, name],
    queryFn: () => SmartShelfService.getByName(name),
    refetchInterval: 3000,
    enabled: !!name,
  });
