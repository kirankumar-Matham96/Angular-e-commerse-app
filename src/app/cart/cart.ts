import { Component, OnInit } from '@angular/core';
import { CartItem, CartStore } from '../services/cart.store';
import { CurrencyPipe } from '@angular/common';
import { TruncatePipe } from '../customPipes/truncatePipe';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, TruncatePipe],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class Cart implements OnInit {
  cart$!: Observable<CartItem[]>;
  cartProducts$: CartItem[] = [];
  cartTotal: number = 0;

  constructor(
    private cartService: CartStore,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;

    // subscribe so the view updates when the store changes
    this.cartService.cart$.subscribe((c) => {
      this.cartProducts$ = c;
      c.forEach((item) => {
        console.log(`item: ${JSON.stringify(item)}`);
      });
    });

    this.getCartTotal();
  }

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id);
  }

  getCartTotal(): void {
    this.cartTotal = this.cartProducts$.reduce((sum, p) => sum + p.price * p.quantity, 0);
    this.cartTotal = parseInt(this.cartTotal.toFixed(2));
  }

  increaseQuantity(id: number) {
    this.cartProducts$.map((p) => {
      if (p.id === id) p.quantity = p.quantity + 1;
      return p;
    });
    this.getCartTotal();
  }

  decreaseQuantity(id: number) {
    this.cartProducts$.map((p) => {
      if (p.id === id && p.quantity > 0) p.quantity = p.quantity - 1;
      return p;
    });
    this.getCartTotal();
  }

  checkout() {
    console.log('checked out ...');
    this.router.navigate(['/checkout']);
  }
}
