import { Product } from './Product';

export enum Status {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
}

export interface Order {
  id: string;
  items: Product[];
  total: number;
  status: Status;
  date: string;
}
