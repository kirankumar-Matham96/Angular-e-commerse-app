import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/Product';

@Injectable({
  providedIn: 'root',
})
export class WishlistStore {
  private wishlistSubject = new BehaviorSubject<Product[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();

  constructor() {
    const items = this.getStorage();
    this.wishlistSubject.next(items);
  }

  // Safe LocalStorage getter
  private getStorage(): Product[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem('wishlist');
      return data ? JSON.parse(data) : [];
    }

    return [];
  }

  // Safe LocalStorage setter
  private setStorage(items: Product[]) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('wishlist', JSON.stringify(items));
    }
  }

  addToWishlist(product: Product) {
    const current = this.wishlistSubject.value;

    const exists = current.find((p) => p.id === product.id);

    if (!exists) {
      const updated = [...current, product];

      this.wishlistSubject.next(updated);

      this.setStorage(updated);
    }
  }

  removeFromWishlist(id: string) {
    const updated = this.wishlistSubject.value.filter((p) => p.id !== id);

    this.wishlistSubject.next(updated);

    this.setStorage(updated);
  }

  toggleWishlist(product: Product) {
    const exists = this.wishlistSubject.value.find((p) => p.id === product.id);

    if (exists) {
      this.removeFromWishlist(product.id);
    } else {
      this.addToWishlist(product);
    }
  }

  isInWishlist(id: string): boolean {
    return this.wishlistSubject.value.some((p) => p.id === id);
  }
}
