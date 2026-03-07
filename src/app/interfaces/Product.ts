export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
  rating: {
    count: number;
    rate: number;
  };
  quantity?: number;
}
