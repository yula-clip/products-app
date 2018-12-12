import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-row-item',
  templateUrl: './row-item.component.html',
  styleUrls: ['./row-item.component.sass']
})
export class RowItemComponent {
  @Input() product: Product;
  @Output() productDeleted = new EventEmitter<Product>();

  constructor(
    private router: Router,
  ) { }

  productDelete() {
    this.productDeleted.emit(this.product);
  }

  routerOutlet(path, id) {
    const link = { outlets: { 'sidebar': [path, id] } };
    this.router.navigate(['/products', link]);
  }
}
