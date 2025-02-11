import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from './interface';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'http://localhost:8080/api/inventory';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  create(inventory: Inventory): Observable<any> {
    return this.http.post(this.apiUrl, inventory);
  }

  save(inventory: any): Observable<any> {
    return this.http.post(this.apiUrl, inventory);
  }


  updateQuantity(productId: string, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/update-quantity`, { productId, quantity });
  }
}