import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductStore {
  private productSubject = new BehaviorSubject<Product[]>([]);
  categories$: string[] = [];
  products$ = this.productSubject.asObservable();

  constructor(private http: HttpClient) {}

  // get the products from the api
  loadProducts() {
    this.http.get<Product[]>('http://localhost:5272/api/products').subscribe((products) => {
      this.productSubject.next(products);
      console.log(`Products: ${JSON.stringify(products)}`);
      this.categories$ = ['all', ...new Set(products.map((product) => product.category))];
    });
  }

  addProduct(product: Product) {
    return this.http.post<Product>('http://localhost:5272/api/products', product);
  }

  updateProduct(product: Product) {
    this.http.put<Product>('http://localhost:5272/api/products', product);
  }
}
