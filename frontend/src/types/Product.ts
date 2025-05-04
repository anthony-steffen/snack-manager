
export interface Product {
  id: number;
  code: number;
  name: string;
  description?: string;
  price: number;
  imgUrl?: string;
  stock: number;
  category?: {
    id: number;
    name: string;
  };
}

export interface ProductFormData {
  code: string;
  name: string;
  categoryId: string;
  description?: string;
  price: string;
  imgUrl?: string;
  stock: string;
}
