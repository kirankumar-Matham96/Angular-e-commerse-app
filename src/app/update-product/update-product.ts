import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductStore } from '../services/product.store';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../interfaces/Product';

@Component({
  selector: 'app-update-product',
  imports: [ReactiveFormsModule],
  templateUrl: './update-product.html',
  styleUrl: './update-product.css',
})
export class UpdateProduct implements OnInit {
  private product: Product | undefined;
  updateProductForm!: FormGroup;

  constructor(
    private productStore: ProductStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id')!;

      this.productStore.products$.subscribe((products: Product[]) => {
        this.product = products?.find((p: Product) => p.id == id);
        this.initializeForm();
      });
    });
  }

  private initializeForm(): void {
    this.updateProductForm = new FormGroup({
      id: new FormControl<string>(this.product?.id || '', {
        nonNullable: true,
        validators: Validators.required,
      }),
      name: new FormControl<string>(this.product?.title || '', {
        nonNullable: true,
        validators: Validators.required,
      }),
      description: new FormControl<string>(this.product?.description || '', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(500)],
      }),
      imgUrl: new FormControl<string>(this.product?.imageUrl || '', {
        nonNullable: true,
        validators: Validators.required,
      }),
      price: new FormControl<number>(this.product?.price || 0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(100)],
      }),
      category: new FormControl<string>(this.product?.category || '', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3)],
      }),
      stock: new FormControl<number>(this.product?.stock || 0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(10)],
      }),
    });
  }

  submitHandle() {
    const formValue = this.updateProductForm.getRawValue();
    const product: Product = {
      id: formValue.id,
      title: formValue.name,
      description: formValue.description,
      imageUrl: formValue.imgUrl,
      price: formValue.price,
      category: formValue.category,
      stock: formValue.stock,
    };

    this.productStore.updateProduct(product).subscribe(() => {
      this.productStore.loadProducts(); // refresh the list
      this.updateProductForm.reset();
      this.router.navigate(['/products']);
    });
  }
}
