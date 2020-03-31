import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderPage } from './order.page';

import { OrderItemModule } from '../../order-item/order-item.module';


const routes: Routes = [
  {
    path: '',
    component: OrderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderItemModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    OrderPage
  ]
})
export class OrderPageModule {}
