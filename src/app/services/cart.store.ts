import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

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
  // cartSubject to hold the cart state
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  getCartValue() {
    return this.cartSubject.getValue(); // gets the cart values
  }

  addToCart(item: CartItem) {
    // get all values
    const currentCart = this.getCartValue();

    // find if exists
    const existingItem = currentCart.find((product) => product.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1; // if exists, increase the quantity
    } else {
      currentCart.push({ ...item, quantity: 1 }); // if not add quantity property with value 1
    }

    // update the state
    this.cartSubject.next([...currentCart]);
  }

  removeFromCart(id: number) {
    // filter out the item from the cart state
    const updatedCart = this.getCartValue().filter((product) => product.id != id);

    // update the new state
    this.cartSubject.next(updatedCart);
  }

  clearCart() {
    // update the cart state with empty array
    this.cartSubject.next([]);
  }
}
