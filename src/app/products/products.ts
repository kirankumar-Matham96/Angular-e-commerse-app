import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductStore } from '../services/product.store';
import { TruncatePipe } from '../customPipes/truncatePipe';
import { CurrencyPipe } from '@angular/common';
import { CartStore } from '../services/cart.store';
import { Product } from '../interfaces/Product';
import { FormsModule } from '@angular/forms';
import { WishlistStore } from '../services/wishlist.store';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe, TruncatePipe, RouterModule, FormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class Products implements OnInit {
  products$!: Observable<Product[]>;

  filteredProducts: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'all';
  sortOption: string = '';
  categories: string[] = [];

  // dependenc injection through constructor
  constructor(
    private productStore: ProductStore,
    private cartStore: CartStore,
    private router: Router,
    private wishlistStore: WishlistStore,
  ) {}

  // angular hook for the initial loading conditions / operations
  ngOnInit(): void {
    this.productStore.loadProducts(); // call the method to make api call
    this.products$ = this.productStore.products$; // assign the products to local variable

    this.products$.subscribe((products) => {
      this.filteredProducts = products;
    });

    this.categories = this.productStore.categories$;
  }

  addToCart(item: any) {
    // ensure the cart item matches the store interface (numeric id)
    const cartItem = { ...item, id: item.id };
    console.log(`cartItem: ${cartItem}`);
    this.cartStore.addToCart(cartItem);
    this.wishlistStore.removeFromWishlist(cartItem.id);
  }

  openProductDetails(id: string | number) {
    this.router.navigate(['/product', id]);
    window.scrollTo(0, 0);
  }

  applyFilters() {
    this.products$.subscribe((products) => {
      let result = [...products];

      // search
      if (this.searchTerm) {
        result = result.filter((p) =>
          p.title.toLowerCase().includes(this.searchTerm.toLowerCase()),
        );
      }

      // category
      if (this.selectedCategory !== 'all') {
        result = result.filter((p) => p.category === this.selectedCategory);
      }

      // sorting
      if (this.sortOption === 'priceLow') {
        result.sort((a, b) => a.price - b.price);
      }

      if (this.sortOption === 'priceHigh') {
        result.sort((a, b) => b.price - a.price);
      }

      this.filteredProducts = result;
    });
  }

  resetFilters() {
    this.searchTerm = '';
    this.selectedCategory = 'all';
    this.sortOption = '';

    this.products$.subscribe((products) => {
      this.filteredProducts = products;
    });
  }

  toggleWishlist(product: Product) {
    this.wishlistStore.toggleWishlist(product);
  }

  isInWishlist(id: string): boolean {
    return this.wishlistStore.isInWishlist(id);
  }
}
