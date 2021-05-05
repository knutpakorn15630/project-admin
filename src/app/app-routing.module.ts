import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentDeliveryComponent } from './components/component-delivery/component-delivery.component';
import { ComponentLoginComponent } from './components/component-login/component-login.component';
import { ComponentReportComponent } from './components/component-report/component-report.component';
import { ComponentShopComponent } from './components/component-shop/component-shop.component';
import { ComponentUserComponent } from './components/component-user/component-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GoogleMapNewComponent } from './components/google-map-new/google-map-new.component';
import { LoginGuard } from './services/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: ComponentLoginComponent,
  },
  {
    canActivate: [LoginGuard],
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'user',
        component: ComponentUserComponent,
      },
      {
        path: 'report',
        component: ComponentReportComponent,
      },
      {
        path: 'shop',
        component: ComponentShopComponent,
      },
      {
        path: 'delivery',
        component: ComponentDeliveryComponent,
      },
      {
        path: 'mapsNew',
        component: GoogleMapNewComponent,
      },
    ],
  },

  // {
  //   path: 'login',
  //   component: ComponentLoginComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
