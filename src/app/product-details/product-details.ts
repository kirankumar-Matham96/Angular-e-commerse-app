import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductStore } from '../services/product.store';
import { CartStore } from '../services/cart.store';
import { TruncatePipe } from '../customPipes/truncatePipe';
import { Router } from '@angular/router';
import { Product } from '../interfaces/Product';

@Component({
  selector: 'app-product-details',
  imports: [TruncatePipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  product: any;
  relatedProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private products: ProductStore,
    private cartStore: CartStore,
    private router: Router,
  ) {}

  // ngOnInit(): void {
  //   const id = parseInt(this.route.snapshot.paramMap.get('id')!);
  //   this.products.products$.subscribe((products) => {
  //     this.product = products.find((p) => p.id == id);
  //     // related products
  //     this.relatedProducts = products.filter(
  //       (p) => p.id != id && p.category == this.product.category,
  //     );
  //   });
  // }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = parseInt(params.get('id')!);
      this.products.products$.subscribe((products) => {
        this.setProduct(products, id);
      });
    });
  }

  // helper function
  setProduct(products: Product[], id: number) {
    this.product = products.find((p) => p.id === id);

    this.relatedProducts = products
      .filter((p) => p.id !== id && p.category === this.product.category)
      .slice(0, 4);
  }

  addToCart() {
    this.cartStore.addToCart(this.product);
  }

  addToWishList() {
    alert('Added to wish list');
  }

  openProduct(id: number | string) {
    this.router.navigate(['/product', id]);
    window.scrollTo(0, 0);
  }
}
