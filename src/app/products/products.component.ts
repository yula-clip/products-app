import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {
  editedProduct: Product;
  products: Array<Product>;
  isNewRecord: boolean;
  statusMessage: string;

  constructor(private serv: ProductService) {
    this.products = new Array<Product>();
  }

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts() {
    this.serv.getProducts()
      .subscribe((data: Product[]) => {
        this.products = data.data;
      });
  }

  addProduct() {
    this.editedProduct = new Product(0, '', '');
    this.products.push(this.editedProduct);
    this.isNewRecord = true;
  }


  editProduct(product: Product) {
    this.editedProduct = new Product(product.id, product.first_name, product.last_name);
    this.saveProduct();
  }

  saveProduct() {
    if (this.isNewRecord) {
      this.serv.createProduct(this.editedProduct).subscribe(data => {
        this.statusMessage = 'Added success!',
          // this.loadProducts();
        console.log(this.statusMessage);
      });
      this.isNewRecord = false;
      this.editedProduct = null;
    } else {
    this.serv.updateProduct(this.editedProduct.id, this.editedProduct).subscribe(data => {
        this.statusMessage = 'Edited success!',
          console.log(data);
      });
      this.editedProduct = null;
    }
  }

  deleteProduct(product: Product) {
    const index = this.products.indexOf(product);
    this.serv.deleteProduct(product.id).subscribe(data => {
      this.statusMessage = 'Product id = ' + product.id + ' deleted success!',
        this.products.splice(index, 1);
    });
  }
}
