import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order';
import { Order } from '../interfaces/Order';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit {
  orders: Order[] = [];
  expandedIndex: number | null = null;
  statusSteps = ['Placed', 'Packed', 'Shipped', 'Delivered'];

  constructor(
    private orderService: OrderService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.orders = this.orderService.getOrders();
  }

  toggleOrder(index: number) {
    if (this.expandedIndex === index) {
      this.expandedIndex = null;
    } else {
      this.expandedIndex = index;
    }
  }

  isStepCompleted(orderStatus: string, step: string) {
    const currentIndex = this.statusSteps.indexOf(orderStatus);
    const stepIndex = this.statusSteps.indexOf(step);

    return stepIndex <= currentIndex;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Placed':
        return 'bg-secondary';

      case 'Packed':
        return 'bg-info';

      case 'Shipped':
        return 'bg-primary';

      case 'Delivered':
        return 'bg-success';

      case 'Cancelled':
        return 'bg-danger';

      default:
        return 'bg-secondary';
    }
  }

  openProduct(id: number) {
    this.router.navigate(['/product', id]);
  }
}
