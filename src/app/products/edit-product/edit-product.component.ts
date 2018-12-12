import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../../service/product.service';
import { Product } from '../../models/product.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { switchMap, mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.sass']
})
export class EditProductComponent implements OnInit, OnDestroy {
  public id: number;
  display: boolean;
  product: Product;
  isSave: boolean;
  isAdd: boolean;
  isNewProduct: boolean;
  private paramsSubscription: Subscription;
  productForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serv: ProductService,
    private formBuilderService: FormBuilder) { }

  ngOnInit() {
    this.display = false;
    this.isSave = false;
    this.isAdd = false;
    this.isNewProduct = false;
    this.paramsSubscription = this.route.params.subscribe(params => this.id = params['id']);
    this.productForm = this.buildFormGroup();
    if (!this.id) {
      this.isNewProduct = true;
      this.display = true;
      return;
    }
    this.serv.getProduct(this.id)
      .pipe(
        switchMap((data: Product) => this.serv.getProduct(this.id).pipe(mapTo(this.product = data)))
      )
      .subscribe(product => {
        this.productForm.reset(product);
        this.display = true;
      });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  private buildFormGroup(): FormGroup {
    return this.formBuilderService.group({
      id: [null],
      first_name: [null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)
      ]],
      last_name: [null, [
        Validators.required
      ]]
    });
  }

  submit() {
    if (this.isNewProduct) {
      this.isAdd = true;
      this.display = false;
    } else {
      this.isSave = true;
      this.display = false;
    }
  }

  outletsNull(name) {
    this.router.navigate(['/products', { outlets: { [name]: null } }]);
  }

  onSlideBarHide() {
    this.outletsNull('sidebar');
  }
}
