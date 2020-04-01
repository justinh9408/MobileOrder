import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RstMenuPage } from './rst-menu.page';

import { MenuItemComponent } from '../menu-item/menu-item.component';

import { OrderModalPageModule } from '../order-modal/order-modal.module';

const routes: Routes = [
  {
    path: '',
    component: RstMenuPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    OrderModalPageModule
  ],
  declarations: [
    RstMenuPage,
    MenuItemComponent
  ]
})
export class RstMenuPageModule {}
