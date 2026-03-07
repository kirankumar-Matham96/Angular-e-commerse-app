import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order';
import { Order } from '../interfaces/Order';

@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orders = this.orderService.getOrders();
    console.log(`orders: ${this.orders}`);
  }
}
