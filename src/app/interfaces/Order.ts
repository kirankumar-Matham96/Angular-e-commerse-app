import { Product } from './Product';

export enum Status {
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
  Placed = 'Placed',
  Packed = 'Packed',
  Shipped = 'Shipped',
}

export interface Order {
  id: string;
  items: Product[];
  total: number;
  status: Status;
  date: string;
}
