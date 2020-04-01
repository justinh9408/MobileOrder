import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'register/:isRst', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'log-in/:isRst', loadChildren: './log-in/log-in.module#LogInPageModule' },
  { path: '', loadChildren: './admin/admins/admins.module#AdminsPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
