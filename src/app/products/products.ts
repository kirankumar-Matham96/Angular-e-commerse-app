import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductStore } from '../services/product.store';
import { AsyncPipe } from '@angular/common';
import { TruncatePipe } from '../customPipes/truncatePipe';
import { CurrencyPipe } from '@angular/common';
import { CartStore } from '../services/cart.store';
import { Product } from '../interfaces/Product';

@Component({
  selector: 'app-products',
  // remove `imports` unless this is a standalone component; keep it for now since the project may rely on module declarations
  imports: [AsyncPipe, CurrencyPipe, TruncatePipe, RouterModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class Products implements OnInit {
  products$!: Observable<Product[]>;

  // dependenc injection through constructor
  constructor(
    private productStore: ProductStore,
    private cartStore: CartStore,
    private router: Router,
  ) {}

  // angular hook for the initial loading conditions / operations
  ngOnInit(): void {
    this.productStore.loadProducts(); // call the method to make api call
    this.products$ = this.productStore.products$; // assign the products to local variable
  }

  addToCart(item: any) {
    // ensure the cart item matches the store interface (numeric id)
    const cartItem = { ...item, id: Number(item.id) };
    console.log(`cartItem: ${cartItem}`);
    this.cartStore.addToCart(cartItem);
  }

  openProductDetails(id: string | number) {
    this.router.navigate(['/product', id]);
  }
}
