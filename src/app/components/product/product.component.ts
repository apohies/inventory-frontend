import { Component, OnInit } from '@angular/core';
import { Product } from './interface';
import { CommonModule } from '@angular/common';
import { ProductService } from './service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = {
    name: '',
    description: '',
    price: 0
  };

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe(response => {
      if (response.data) {
        this.products = response.data;
      }
    });
  }

  createProduct() {
    this.productService.create(this.newProduct).subscribe(response => {
      if (response.data) {
        this.products.push(response.data);
        this.newProduct = {
          name: '',
          description: '',
          price: 0
        };
      }
    });
  }

  navigateToInventory() {
    this.router.navigate(['/inventory']);
  }

}