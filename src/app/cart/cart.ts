import { Component, OnInit } from '@angular/core';
import { CartItem, CartStore } from '../services/cart.store';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { TruncatePipe } from '../customPipes/truncatePipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, AsyncPipe, TruncatePipe],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class Cart implements OnInit {
  constructor(private cartService: CartStore) {}

  cart$!: Observable<CartItem[]>;

  cartProducts$: CartItem[] = [];

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
    // subscribe so the view updates when the store changes
    this.cartService.cart$.subscribe((c) => {
      this.cartProducts$ = c;
      c.forEach((item) => {
        console.log(`item: ${JSON.stringify(item)}`);
      });
    });
  }

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id);
  }
}
