import { Routes } from '@angular/router';

export const SIGNIN_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./signin').then((component) => component.Signin) },
];
