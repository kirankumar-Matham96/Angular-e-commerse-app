import { Injectable, Inject, PLATFORM_ID, inject } from '@angular/core';
import { Order } from '../interfaces/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders: Order[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  saveOrder(order: Order) {
    if (typeof window !== 'undefined') {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));
    }
    this.orders.push(order);
  }

  getOrders() {
    if (typeof window !== 'undefined') {
      return JSON.parse(JSON.parse(localStorage.getItem('orders') || '[]'));
    }
    return this.orders;
  }
}
