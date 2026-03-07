import { Routes } from '@angular/router';

export const ORDERSUCCESS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./order-success').then((component) => component.OrderSuccess),
  },
];
