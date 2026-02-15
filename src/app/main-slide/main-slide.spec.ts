import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSlide } from './main-slide';

describe('MainSlide', () => {
  let component: MainSlide;
  let fixture: ComponentFixture<MainSlide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSlide]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSlide);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
