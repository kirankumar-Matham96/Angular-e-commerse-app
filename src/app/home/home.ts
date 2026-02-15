import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Hero } from '../hero/hero';
import { MainSlide } from '../main-slide/main-slide';

@Component({
  selector: 'app-home',
  imports: [RouterModule, Hero, MainSlide],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
