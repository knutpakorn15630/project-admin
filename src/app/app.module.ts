import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ComponentUserComponent } from './components/component-user/component-user.component';
import { ComponentReportComponent } from './components/component-report/component-report.component';
import { ComponentDeliveryComponent } from './components/component-delivery/component-delivery.component';
import { ComponentShopComponent } from './components/component-shop/component-shop.component';
import { ComponentMapComponent } from './components/component-map/component-map.component';
import { ComponentLoginComponent } from './components/component-login/component-login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapNewComponent } from './components/google-map-new/google-map-new.component';
import { ErrorInterceptor } from './interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ComponentUserComponent,
    ComponentReportComponent,
    ComponentDeliveryComponent,
    ComponentShopComponent,
    ComponentMapComponent,
    ComponentLoginComponent,
    GoogleMapNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    HttpClientModule,
    GoogleMapsModule
  ],
  providers: [
    { provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
