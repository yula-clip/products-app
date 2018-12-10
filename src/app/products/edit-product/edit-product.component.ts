import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ProductService } from '../../service/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.sass']
})
export class EditProductComponent implements OnInit, OnDestroy {
  @Output() productEdit = new EventEmitter<Product>();
  public id: number;
  display = false;
  product: Product;
  newProduct: Product;
  statusMessage: string;
  private paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private serv: ProductService) {
    this.product = new Product(null, '' , '');
  }
  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(params => this.id = params['id']);
    this.loadProduct(this.id);
    this.display = true;
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  private loadProduct(id) {
    this.serv.getProduct(id)
      .subscribe((data: Product) => {
        this.product = data.data;
      });
  }

  startEditing() {
    this.productEdit.emit(this.newProduct);
  }

  onSlideBarHide() {
    this.router.navigate(['/products', { outlets: { editing: null } }]);
  }
}
