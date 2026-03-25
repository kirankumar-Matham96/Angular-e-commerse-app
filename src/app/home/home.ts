import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Hero } from '../hero/hero';
import { MainSlide } from '../main-slide/main-slide';
import { Categories } from '../categories/categories';
import { FeaturedProducts } from '../featured-products/featured-products';
import { WhyUs } from '../why-us/why-us';
import { Newsletter } from '../newsletter/newsletter';

@Component({
  selector: 'app-home',
  imports: [RouterModule, Hero, MainSlide, Categories, FeaturedProducts, WhyUs, Newsletter],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
