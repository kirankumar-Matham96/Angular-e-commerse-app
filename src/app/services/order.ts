import { Injectable, Inject, PLATFORM_ID, inject } from '@angular/core';
// import { isPlatformBrowser, PlatformLocation } from '@angular/common';
import { Order } from '../interfaces/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders: Order[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  saveOrder(order: Order) {
    // if (isPlatformBrowser(this.platformId)) {
    //   const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    //   orders.push(order);
    //   localStorage.setItem('orders', JSON.stringify(orders));
    // }
    this.orders.push(order);
  }

  getOrders() {
    // if (isPlatformBrowser(this.platformId)) {
    //   return JSON.parse(JSON.parse(localStorage.getItem('orders') || '[]'));
    // }
    return this.orders;
  }
}
