import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderItemComponent } from './order-item.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    OrderItemComponent
  ],
  exports: [
    OrderItemComponent
  ]
})
export class OrderItemModule {}
