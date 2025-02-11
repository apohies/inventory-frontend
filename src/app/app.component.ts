import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InventoryComponent } from './components/inventory/inventory.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InventoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'inventory-frontend';
}
