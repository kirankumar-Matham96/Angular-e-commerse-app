import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductStore {
  private productSubject = new BehaviorSubject<Product[]>([]);

  products$ = this.productSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadProducts() {
    this.http.get<Product[]>('https://fakestoreapi.com/products').subscribe((products) => {
      this.productSubject.next(products);
    });
  }
}
