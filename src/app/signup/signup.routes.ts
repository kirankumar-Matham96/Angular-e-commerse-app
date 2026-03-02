import { Routes } from '@angular/router';

export const SIGNUP_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./signup').then((component) => component.Signup) },
];
