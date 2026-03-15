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
  reviews: any[] = [];
  isInCart!: boolean;

  constructor(
    private route: ActivatedRoute,
    private products: ProductStore,
    private cartStore: CartStore,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id')!;
      this.products.products$.subscribe((products) => {
        this.setProduct(products, id);
      });
    });

    this.cartStore.cart$.subscribe((products) => {
      this.isInCart = products.some((p) => p.id == this.product.id);
    });

    this.generateReviews();
  }

  // helper function
  setProduct(products: Product[], id: string) {
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

  openProduct(id: string) {
    this.router.navigate(['/product', id]);
    window.scrollTo(0, 0);
  }

  generateReviews() {
    const sampleReviews = [
      {
        name: 'Rahul',
        rating: 5,
        comment: 'Excellent product. Highly recommended!',
      },
      {
        name: 'Priya',
        rating: 4,
        comment: 'Good quality and worth the price.',
      },
      {
        name: 'Amit',
        rating: 4,
        comment: 'Works as expected. Delivery was fast.',
      },
      {
        name: 'Sneha',
        rating: 5,
        comment: 'Amazing product. I love it!',
      },
    ];

    this.reviews = sampleReviews.slice(0, 3);
  }
}
