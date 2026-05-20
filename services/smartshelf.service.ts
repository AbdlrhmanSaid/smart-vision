import axiosInstance from "@/server/axios";

export interface SmartShelfSection {
  section: string;
  product: string;
}

export interface SmartShelf {
  _id?: string;
  name: string;
  isMixed: boolean;
  sections: SmartShelfSection[];
  updatedAt?: string;
}

export interface SingleShelfResponse {
  success: boolean;
  message?: string;
  data: SmartShelf;
}

export interface AllShelvesResponse {
  success: boolean;
  message?: string;
  data: SmartShelf[];
}

export const SmartShelfService = {
  getAll: async (): Promise<SmartShelf[]> => {
    const response = await axiosInstance.get("/smartShelf");
    // Handle both cases: if backend wraps in {data: ...} or just returns the array
    return response.data.data || response.data;
  },

  getByName: async (name: string): Promise<SmartShelf> => {
    const response = await axiosInstance.get(`/smartShelf/${name}`);
    return response.data.data || response.data;
  },
};
