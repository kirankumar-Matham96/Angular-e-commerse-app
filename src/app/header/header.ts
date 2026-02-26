import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartStore } from '../services/cart.store';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  cartItemsCount: Observable<number>;

  constructor(private cartStore: CartStore) {
    this.cartItemsCount = this.cartStore.cart$.pipe(
      map((items) => items.reduce((total, item) => total + item.quantity, 0)),
    );
  }
}
