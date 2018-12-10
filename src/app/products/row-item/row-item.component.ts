import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: '[app-row-item]',
  templateUrl: './row-item.component.html',
  styleUrls: ['./row-item.component.sass']
})
export class RowItemComponent implements OnInit {
  @Input() product: Product;

  @Output() productDeleted = new EventEmitter<Product>();
  @Output() productEdited = new EventEmitter<Product>();

  selectedProduct: Product;

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }
  constructor() { }

  ngOnInit() {
  }

  productEdit(product: Product) {
    this.productEdited.emit(product);
  }

  productDelete() {
    this.productDeleted.emit(this.product);
  }

}
