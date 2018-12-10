import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';

const routes: Routes =   [
  {
    path: 'products',
    component: ProductsComponent,
    data: { title: 'List of Products' },
    children: [
      {
        path: 'details/:id',
        component: ProductDetailComponent,
        outlet: 'view'
      },
      {
        path: 'edit/:id',
        component: EditProductComponent,
        outlet: 'editing'
      },
    ]
  },
  { path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/products', }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
