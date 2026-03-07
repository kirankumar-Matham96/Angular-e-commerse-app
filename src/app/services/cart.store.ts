import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../interfaces/Product';

/**
 * BehaviorSubject:
 *  -> it stores the current value
 *  -> New subscribers immediately receive latest state
 *  -> Perfect for global state
 */

@Injectable({
  providedIn: 'root',
})
export class CartStore {
  private cartAnimation = new Subject<void>();

  cartAnimation$ = this.cartAnimation.asObservable();

  // cartSubject to hold the cart state
  private cartSubject = new BehaviorSubject<Product[]>([]);
  cart$ = this.cartSubject.asObservable();

  getCartValue() {
    // getting the cart from the local storage
    const cartData = localStorage.getItem('cart');
    const cart = cartData ? JSON.parse(cartData) : [];

    return cart || this.cartSubject.getValue(); // gets the cart values
  }

  // accept an object that has the core cart fields plus any extras like image/description
  addToCart(item: Partial<Product> & { id: number; title: string; price: number }) {
    // keep a debug log if you need to inspect
    console.log('Item at cartStore: ', { item });

    // get all values
    const currentCart = this.getCartValue();

    // find if exists
    const existingItem = currentCart.find((product: Product) => product.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1; // if exists, increase the quantity
    } else {
      // spread whatever extra properties the caller passed (image/description)
      currentCart.push({ ...item, quantity: 1 } as Product);
    }

    // update the state
    this.cartSubject.next([...currentCart]);

    // store to local storage
    localStorage.setItem('cart', JSON.stringify([...currentCart]));

    // triggering animation
    this.cartAnimation.next();
  }

  removeFromCart(id: number) {
    // filter out the item from the cart state
    const updatedCart = this.getCartValue().filter((product: Product) => product.id != id);

    // update the new state
    this.cartSubject.next(updatedCart);

    // updating local storage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  clearCart() {
    // update the cart state with empty array
    this.cartSubject.next([]);

    // clearing the local Storage
    localStorage.removeItem('cart');
  }
}
