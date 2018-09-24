import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: '/pages/login',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      }, {
        path: '',
        loadChildren: './userpage/user.module#UserModule'
      }, {
        path: '',
        loadChildren: './create-sku/create-sku.module#CreateSkuModule'
      },
      {
        path: '',
        loadChildren: './providers/providers.module#ProvidersModule'
      },
      {
        path: '',
        loadChildren: './clients/clients.module#ClientsModule'
      },
      {
        path: '',
        loadChildren: './skus/sku.module#SkusModule'
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [{
      path: 'pages',
      loadChildren: './pages/pages.module#PagesModule'
    }]
  }
];
