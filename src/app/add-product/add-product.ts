import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductStore } from '../services/product.store';
import { Product } from '../interfaces/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
  constructor(
    private productStore: ProductStore,
    private router: Router,
  ) {}

  prodId: any = Date.now() + '';

  addProductForm = new FormGroup({
    id: new FormControl<string>(this.prodId, {
      nonNullable: true,
      validators: Validators.required,
    }),
    name: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(500)],
    }),
    imgUrl: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    price: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(100)],
    }),
    category: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    stock: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(10)],
    }),
  });

  submitHandle() {
    try {
      const formValue = this.addProductForm.getRawValue();
      const product: Product = {
        id: formValue.id,
        title: formValue.name,
        description: formValue.description,
        imageUrl: formValue.imgUrl,
        price: formValue.price,
        category: formValue.category,
        stock: formValue.stock,
      };

      console.log('Product details: ', product);

      this.productStore.addProduct(product).subscribe(() => {
        this.productStore.loadProducts(); // refresh the list
        this.addProductForm.reset();
        this.router.navigate(['/products']);
      });
    } catch (error) {
      console.error('Error adding product: ', error);
    }
  }
}
