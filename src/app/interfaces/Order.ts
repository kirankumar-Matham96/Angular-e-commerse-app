import { Product } from './Product';

export enum Status {
  Pending = 'Pending',
  Success = 'Success',
  Cancelled = 'Cancelled',
}

export interface Order {
  id: string;
  items: Product[];
  total: number;
  status: Status;
  date: string;
}
