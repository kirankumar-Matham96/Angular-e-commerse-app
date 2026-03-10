import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductStore } from '../services/product.store';
import { CartStore } from '../services/cart.store';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private products: ProductStore,
    private cartStore: CartStore,
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.products.products$.subscribe((products) => {
      this.product = products.find((p) => p.id == id);
    });
  }

  addToCart() {
    this.cartStore.addToCart(this.product);
  }

  addToWishList() {
    alert('Added to wish list');
  }
}
