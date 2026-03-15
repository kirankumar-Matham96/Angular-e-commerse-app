import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductStore } from '../services/product.store';
import { Product } from '../interfaces/Product';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
  constructor(private productStore: ProductStore) {}

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

    this.productStore.addProduct(product);
  }
}
