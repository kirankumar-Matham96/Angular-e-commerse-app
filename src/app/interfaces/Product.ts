export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  price: number;
  stock: number;
  quantity?: number;
}
