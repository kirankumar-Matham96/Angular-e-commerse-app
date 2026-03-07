import { Component } from '@angular/core';
import { CartStore } from '../services/cart.store';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../customPipes/truncatePipe';
import { CurrencyPipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../services/order';
import { Order, Status } from '../interfaces/Order';

@Component({
  selector: 'app-checkout',
  imports: [
    CommonModule,
    TruncatePipe,
    CurrencyPipe,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  cartItems: any[] = [];
  total: number = 0;

  constructor(
    private cartStore: CartStore,
    private orderService: OrderService,
    private router: Router,
  ) {
    cartStore.cart$.subscribe((items) => {
      this.cartItems = items;

      this.total = items.reduce((sum, item) => sum + item.price * item?.quantity!, 0);
    });
  }

  // Handling buyyer info
  addressForm = new FormGroup({
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(16),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.nullValidator]),
    address: new FormControl('', [Validators.required]),
  });

  // create an order here with the buyyer info

  // Handle payment here
  payNow() {
    if (this.addressForm.invalid) {
      console.log('Invalid form');
      return;
    }

    const options = {
      key: 'rzp_test_SNv0qe7baZLsV9',
      // key: 'YOUR_RAZORPAY_KEY_ID',
      amount: this.total * 100, // Razorpay uses paise
      currency: 'INR',
      name: 'Orniva',
      description: 'Order Payment',
      handler: (response: any) => {
        console.log('Payment success', response);
        this.saveOrder(); // saving the order details
        this.cartStore.clearCart(); // clearing the cart
        this.router.navigate(['/order-success']); // navigating to the order-success page
      },
      prefill: {
        name: this.addressForm.value.fullName,
        email: this.addressForm.value.email,
        contact: this.addressForm.value.phone,
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  }

  saveOrder() {
    const order: Order = {
      id: 'ORD' + Date.now(),
      items: this.cartItems,
      total: this.total,
      status: Status.Pending,
      date: new Date().toLocaleDateString(),
    };
    this.orderService.saveOrder(order);
  }
}
