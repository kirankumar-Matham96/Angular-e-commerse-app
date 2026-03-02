import { Routes } from '@angular/router';

export const NOTFOUND_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./not-found').then((component) => component.NotFound) },
];
