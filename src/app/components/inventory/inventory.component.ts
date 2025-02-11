import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { InventoryService } from './service';
import { NavigationEnd, Router } from '@angular/router';
import { ProductService } from '../product/service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

interface Inventory {
  id: number;
  productId: string;
  quantity: number;
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, NgFor , FormsModule], 
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  inventoryList: Inventory[] = [];
  inventoryAux: Inventory[] = [];
  availableProducts: any[] = [];
  newInventory = {
    productId: '',
    quantity: 0
  };
  private routerSubscription: Subscription;

  constructor(private inventoryService: InventoryService,
     private router: Router,
     private productService: ProductService,) {
      this.routerSubscription = this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.loadAvailableProducts();
        }
      });
     }

  ngOnInit() {
    this.loadInventory();
    this.loadAvailableProducts();
  }

  loadInventory() {
    this.inventoryService.getAll().subscribe(response => {
      if (response.data) {
        this.inventoryList = response.data;
      }
    });
  }

  loadAvailableProducts() {
    this.productService.getAll().subscribe(response => {
      if (response.data) {
        
        this.availableProducts = response.data.filter((product: any) => 
          !this.inventoryList.some(inv => inv.productId === product.id)
        );
      }
    });
  }

  addInventory() {
    if (!this.newInventory.productId) {
      alert('Por favor seleccione un producto');
      return;
    }
    
    this.inventoryService.save(this.newInventory).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS') {
  
          this.refreshData(); 
          this.newInventory = {
            productId: '',
            quantity: 0
          };
        
          this.availableProducts = this.availableProducts.filter(
            product => product.id !== this.newInventory.productId
          );
        } else {
          alert(response.message);
        }
      },
      error: (error) => {
        alert('Error al crear inventario');
      }
    });
}

  navigateToProducts() {
    this.router.navigate(['/products']);
  }

  refreshData() {
 
    this.inventoryService.getAll().subscribe({
      next: (invResponse) => {
        if (invResponse.data) {
          this.inventoryList = invResponse.data;
     
          this.productService.getAll().subscribe({
            next: (prodResponse) => {
              if (prodResponse.data) {
               
                this.availableProducts = prodResponse.data.filter((product: any) => 
                  !this.inventoryList.some(inv => inv.productId === product.id)
                );
              }
            }
          });
        }
      }
    });
  }


}