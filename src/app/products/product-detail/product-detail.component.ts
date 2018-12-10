import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ProductService } from '../../service/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  public id: number;
  display = false;
  product: Product;
  private paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private serv: ProductService) {
    this.product = new Product(null, '' , '');
  }
  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(params => this.id = params['id']);
    this.loadProduct(this.id);
    this.display = true;
  }

  private loadProduct(id) {
    this.serv.getProduct(id)
      .subscribe((data: Product) => {
        this.product = data.data;
      });
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  onSlideBarHide() {
    this.router.navigate(['/products', { outlets: { view: null } }]);
  }
}
