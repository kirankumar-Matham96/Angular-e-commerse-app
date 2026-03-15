import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/Product';
import { WishlistStore } from '../services/wishlist.store';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { TruncatePipe } from '../customPipes/truncatePipe';
import { CartStore } from '../services/cart.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [AsyncPipe, TruncatePipe, CurrencyPipe],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist {
  wishlist$!: Observable<Product[]>;

  constructor(
    private wishlistStore: WishlistStore,
    private cartStore: CartStore,
    private router: Router,
  ) {
    this.wishlist$ = wishlistStore.wishlist$;
  }

  remove(id: string) {
    this.wishlistStore.removeFromWishlist(id);
  }

  getProductDetails(id: string) {
    this.router.navigate(['/product', id]);
    window.scrollTo(0, 0);
  }

  addToCart(product: Product) {
    this.cartStore.addToCart(product);
    this.remove(product.id);
  }
}
