import { Routes } from '@angular/router';

export const UPDATE_PRODUCT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./update-product').then((component) => component.UpdateProduct),
  },
];
