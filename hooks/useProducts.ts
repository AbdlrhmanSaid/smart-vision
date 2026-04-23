import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "@/services/product.service";
import { Product } from "@/types/product";
import toast from "react-hot-toast";

// Key for React Query cache
export const PRODUCTS_QUERY_KEY = ["products"];

export const useProducts = () => {
  const queryClient = useQueryClient();

  // 1. Get All Products
  const useGetAllProducts = () => {
    return useQuery({
      queryKey: PRODUCTS_QUERY_KEY,
      queryFn: ProductService.getAll,
      refetchInterval: 3000,
      refetchIntervalInBackground: true,
    });
  };

  // 2. Get Single Product
  const useGetProduct = (id: string) => {
    return useQuery({
      queryKey: [...PRODUCTS_QUERY_KEY, id],
      queryFn: () => ProductService.getById(id),
      enabled: !!id, // Only fetch if ID exists
    });
  };

  // 3. Create Product
  const useCreateProduct = () => {
    return useMutation({
      mutationFn: (data: FormData) => ProductService.create(data),
      onSuccess: () => {
        toast.success("تم إضافة المنتج بنجاح");
        queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
      },
      onError: (error: any) => {
        const message =
          error.response?.data?.message || "حدث خطأ أثناء إضافة المنتج";
        toast.error(message);
      },
    });
  };

  // 4. Update Product
  const useUpdateProduct = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: FormData }) =>
        ProductService.update(id, data),
      onSuccess: (updatedProduct: Product) => {
        toast.success("تم تعديل المنتج بنجاح");
        // Update specific product in the cache and invalidate the main list
        queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
        if (updatedProduct?._id) {
          queryClient.setQueryData(
            [...PRODUCTS_QUERY_KEY, updatedProduct._id],
            updatedProduct,
          );
        }
      },
      onError: (error: any) => {
        const message =
          error.response?.data?.message || "حدث خطأ أثناء تعديل المنتج";
        toast.error(message);
      },
    });
  };

  // 5. Delete Product
  const useDeleteProduct = () => {
    return useMutation({
      mutationFn: (id: string) => ProductService.delete(id),
      onSuccess: () => {
        toast.success("تم مسح المنتج بنجاح");
        queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
      },
      onError: (error: any) => {
        const message =
          error.response?.data?.message || "حدث خطأ أثناء مسح المنتج";
        toast.error(message);
      },
    });
  };

  return {
    useGetAllProducts,
    useGetProduct,
    useCreateProduct,
    useUpdateProduct,
    useDeleteProduct,
  };
};
