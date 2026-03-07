import { Routes } from '@angular/router';

export const PRODUCTDETAILS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./product-details').then((component) => component.ProductDetails),
  },
];
