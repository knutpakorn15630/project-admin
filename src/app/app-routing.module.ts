import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentDeliveryComponent } from './components/component-delivery/component-delivery.component';
import { ComponentLoginComponent } from './components/component-login/component-login.component';
import { ComponentMapComponent } from './components/component-map/component-map.component';
import { ComponentReportComponent } from './components/component-report/component-report.component';
import { ComponentShopComponent } from './components/component-shop/component-shop.component';
import { ComponentUserComponent } from './components/component-user/component-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { LoginGuard } from './login.guard';


const routes: Routes = [

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
  ,
  {
    // canActivate: [LoginGuard],
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'user',
        component: ComponentUserComponent
      },
      {
        path: 'report',
        component: ComponentReportComponent
      },
      {
        path: 'shop',
        component: ComponentShopComponent
      },
      {
        path: 'delivery',
        component: ComponentDeliveryComponent
      },
      {
        path: 'maps',
        component: GoogleMapComponent
      },
    ]
  },
  {
    path: 'login',
    component: ComponentLoginComponent
  },
  // {
  //   path: 'login',
  //   component: ComponentLoginComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
