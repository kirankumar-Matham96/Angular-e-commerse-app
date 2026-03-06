import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartStore } from '../services/cart.store';
import { map, Observable, Subject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements AfterViewInit {
  @ViewChild('cartWrapper') cartWrapper!: ElementRef;
  @ViewChild('cartBadge') cartBadge!: ElementRef;

  cartItemsCount: Observable<number>;

  constructor(private cartStore: CartStore) {
    this.cartItemsCount = this.cartStore.cart$.pipe(
      map((items) => items.reduce((total, item) => total + item.quantity, 0)),
    );
  }

  private destroy$ = new Subject<void>();

  ngAfterViewInit(): void {
    this.cartStore.cartAnimation$.subscribe(() => {
      const wrapper = this.cartWrapper.nativeElement;
      const badge = this.cartBadge.nativeElement;

      wrapper.classList.add('shake');

      if (badge) {
        badge.classList.add('pop');
      }

      setTimeout(() => {
        wrapper.classList.remove('shake');
        badge?.classList.remove('pop');
      }, 500);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
