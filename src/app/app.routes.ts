import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Products } from './products/products';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { NotFound } from './not-found/not-found';
import { Signin } from './signin/signin';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'signin', component: Signin },
  { path: 'products', component: Products },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: '**', component: NotFound },
];
