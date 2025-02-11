import { Routes } from '@angular/router';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ProductComponent } from './components/product/product.component';

export const routes: Routes = [
    {path: '', redirectTo: 'inventory', pathMatch: 'full'},
    { path: 'inventory', component: InventoryComponent },
    {path: 'products', component: ProductComponent}
];
