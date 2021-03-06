import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../models/product.model';

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
        this.products = data;
      });
  }

  addProduct(product: Product) {
    this.isNewRecord = true;
    this.saveProduct();
    this.products.push(product);
  }

  editProduct(product: Product) {
    this.editedProduct = new Product(product.id, product.first_name, product.last_name);
    this.saveProduct();
    // tslint:disable-next-line:triple-equals
    const index = this.products.findIndex(prod => prod.id == product.id);
    this.products.splice(index, 1, product);
  }

  saveProduct() {
    if (this.isNewRecord) {
      this.serv.createProduct(this.editedProduct).subscribe(data => {
        this.statusMessage = 'Added success!',
          this.isNewRecord = false;
        this.editedProduct = null;
      });
    } else {
      this.serv.updateProduct(this.editedProduct.id, this.editedProduct).subscribe((data: Product) => {
        this.statusMessage = 'Edited success!';
        this.editedProduct = null;
      });
    }
  }

  deleteProduct(product: Product) {
    const index = this.products.indexOf(product);
    this.serv.deleteProduct(product.id).subscribe(data => {
      this.statusMessage = 'Product id = ' + product.id + ' deleted success!',
        this.products.splice(index, 1);
    });
  }

  onDeactivate(component) {
    if (component.isAdd) {
      this.editedProduct = new Product(this.products.length + 1,
        component.productForm.value.first_name, component.productForm.value.last_name);
      this.addProduct(this.editedProduct);
    }
    if (component.isSave) {
      this.editedProduct = new Product(component.productForm.value.id,
        component.productForm.value.first_name, component.productForm.value.last_name);
      this.editProduct(this.editedProduct);
    }
  }
}
