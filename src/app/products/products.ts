import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductStore } from '../services/product.store';
import { AsyncPipe } from '@angular/common';
import { TruncatePipe } from '../customPipes/truncatePipe';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-products',
  imports: [AsyncPipe, CurrencyPipe, TruncatePipe, RouterModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products$!: Observable<any[]>;

  // dependenc injection through constructor
  constructor(private productStore: ProductStore) {}

  // angular hook for the initial loading conditions / operations
  ngOnInit(): void {
    this.productStore.loadProducts(); // call the method to make api call
    this.products$ = this.productStore.products$; // assign the products to local variable
  }
}
