export interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type CreateProductInput = Omit<Product, '_id' | 'createdAt' | 'updatedAt' | '__v'>;

export type UpdateProductInput = Partial<CreateProductInput>;
