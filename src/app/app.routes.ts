import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.routes').then((route) => route.HOME_ROUTES),
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.routes').then((route) => route.SIGNIN_ROUTES),
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.routes').then((route) => route.SIGNUP_ROUTES),
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.routes').then((route) => route.PRODUCTS_ROUTES),
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.routes').then((route) => route.ABOUT_ROUTES),
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.routes').then((route) => route.CONTACT_ROUTES),
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.routes').then((route) => route.CART_ROUTES),
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.routes').then((route) => route.CHECKOUT_ROUTES),
  },
  {
    path: 'order-success',
    loadChildren: () =>
      import('./order-success/order-success.routes').then((route) => route.ORDERSUCCESS_ROUTES),
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.routes').then((route) => route.ORDERS_ROUTES),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./not-found/not-found.routes').then((component) => component.NOTFOUND_ROUTES),
  },
];
