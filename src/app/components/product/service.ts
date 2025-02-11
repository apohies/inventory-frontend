import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8081/api/products';  

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  create(product: any): Observable<any> {
    return this.http.post(this.apiUrl, {
      name: product.name,
      description: product.description,
      price: product.price
    });
  }

}