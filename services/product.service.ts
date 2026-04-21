import axiosInstance from '@/server/axios';
import { Product, CreateProductInput, UpdateProductInput } from '@/types/product';

export const ProductService = {
  // Get all products
  getAll: async (): Promise<Product[]> => {
    const response = await axiosInstance.get('/products');
    return response.data;
  },

  // Get a single product by ID
  getById: async (id: string): Promise<Product> => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  },

  // Create a new product
  create: async (data: FormData): Promise<Product> => {
    const response = await axiosInstance.post('/products', data);
    return response.data;
  },

  // Update an existing product
  update: async (id: string, data: FormData): Promise<Product> => {
    const response = await axiosInstance.put(`/products/${id}`, data);
    return response.data;
  },

  // Delete a product
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/products/${id}`);
  },
};
