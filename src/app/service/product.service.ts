import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService {
  private url = 'https://reqres.in/api/users';
  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(this.url).pipe(map(data => {
      return data['data'].map(function (product: Product) {
        return { id: product.id, first_name: product.first_name, last_name: product.last_name };
      });
    }));
  }
  getProduct(id: number): Observable<any> {
    const urlParams = new HttpParams().set('id', id.toString());
    return this.http.get<any>(this.url, { params: urlParams })
      .pipe(map(data => data.data));
  }
  createProduct(product: Product) {
    return this.http.post(this.url, product);
  }
  updateProduct(id: number, product: Product) {
    const urlParams = new HttpParams().set('id', id.toString());
    return this.http.put(this.url, product, { params: urlParams });
  }
  deleteProduct(id: number) {
    const urlParams = new HttpParams().set('id', id.toString());
    return this.http.delete(this.url, { params: urlParams });
  }
}
