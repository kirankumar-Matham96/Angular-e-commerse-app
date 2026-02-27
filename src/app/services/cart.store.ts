import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  // optional fields copied from the product
  image?: string;
  description?: string;
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

  // accept an object that has the core cart fields plus any extras like image/description
  addToCart(item: Partial<CartItem> & { id: number; title: string; price: number }) {
    // keep a debug log if you need to inspect
    console.log('Item at cartStore: ', { item });

    // get all values
    const currentCart = this.getCartValue();

    // find if exists
    const existingItem = currentCart.find((product) => product.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1; // if exists, increase the quantity
    } else {
      // spread whatever extra properties the caller passed (image/description)
      currentCart.push({ ...item, quantity: 1 } as CartItem);
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
