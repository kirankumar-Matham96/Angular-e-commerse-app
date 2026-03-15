import { Routes } from '@angular/router';

export const ADD_PRODUCT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./add-product').then((component) => component.AddProduct),
  },
];
