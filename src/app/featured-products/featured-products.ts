import { Component, OnInit } from '@angular/core';
import { ProductStore } from '../services/product.store';
import { TruncatePipe } from '../customPipes/truncatePipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-featured-products',
  imports: [TruncatePipe],
  templateUrl: './featured-products.html',
  styleUrl: './featured-products.css',
})
export class FeaturedProducts implements OnInit {
  products: any[] = [];

  constructor(
    private productStore: ProductStore,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.productStore.products$.subscribe((prods) => (this.products = prods.slice(0, 4)));
    this.productStore.loadProducts();
  }

  openProductDetails(id: string | number) {
    this.router.navigate(['/product', id]);
    window.scrollTo(0, 0);
  }
}
