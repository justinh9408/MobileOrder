import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminsPage } from './admins.page';

import { AdminsPageRoutingModule } from './admins.router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminsPageRoutingModule
  ],
  declarations: [AdminsPage]
})
export class AdminsPageModule {}
