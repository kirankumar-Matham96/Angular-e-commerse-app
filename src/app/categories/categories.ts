import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  categories = [
    { name: 'Men', image: '/mens-category.jpg' },
    { name: 'Women', image: '/women-category.jpg' },
    { name: 'Jewellery', image: '/jwellery.jpg' },
    { name: 'Electronics', image: '/electronics.jpg' },
  ];
}
