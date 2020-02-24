import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsPage } from './admins.page';

const routes: Routes = [
  {
    path: 'admins',
    component: AdminsPage,
    children: [
        {
          path: 'home',
          children: [
              {
              path: '',
              loadChildren: () =>
                  import('../admin-home/admin-home.module').then(m => m.AdminHomePageModule)
              }
          ]
        },
        {
          path: 'menu',
          children: [
              {
              path: '',
              loadChildren: () =>
                  import('../admin-menu/admin-menu.module').then(m => m.AdminMenuPageModule)
              }
          ]
        },
        {
          path: 'order',
          children: [
              {
              path: '',
              loadChildren: () =>
                  import('../order/order.module').then(m => m.OrderPageModule)
              }
          ]
        },
        {
          path: 'menuitem/:catId/:itemId',
          children: [
              {
              path: '',
              loadChildren: () =>
                  import('../menu-item/menu-item.module').then(m => m.MenuItemPageModule)
              }
          ]
        },
        {
            path: '',
            redirectTo: '/admins/home',
            pathMatch: 'full'
        }
    ]
  },
  {
    path: '',
    redirectTo: '/admins/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsPageRoutingModule {}
