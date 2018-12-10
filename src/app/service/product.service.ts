import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Product} from '../models/product.model';
import {Observable} from 'rxjs';

@Injectable()
export class ProductService {
  private url = 'https://reqres.in/api/users';
  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(this.url);
  }
  getProduct(id: number) {
    const urlParams = new HttpParams().set('id', id.toString());
    return this.http.get(this.url, { params: urlParams});
  }
  createProduct(product: Product) {
    return this.http.post(this.url, product);
  }
  updateProduct(id: number, product: Product) {
    const urlParams = new HttpParams().set('id', id.toString());
    return this.http.put(this.url, product, { params: urlParams});
  }
  deleteProduct(id: number) {
    const urlParams = new HttpParams().set('id', id.toString());
    return this.http.delete(this.url, { params: urlParams});
  }
}
