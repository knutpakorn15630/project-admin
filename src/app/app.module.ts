import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentDeliveryComponent } from './components/component-delivery/component-delivery.component';
import { ComponentLoginComponent } from './components/component-login/component-login.component';
import { ComponentMapComponent } from './components/component-map/component-map.component';
import { ComponentReportComponent } from './components/component-report/component-report.component';
import { ComponentShopComponent } from './components/component-shop/component-shop.component';
import { ComponentUserComponent } from './components/component-user/component-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GoogleMapNewComponent } from './components/google-map-new/google-map-new.component';
import { InterceptorInterceptor } from './services/interceptor.interceptor';
import { PipeDatePipe } from './pipe-date.pipe';
import { PipetestPipe } from './pipetest.pipe';

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
    GoogleMapNewComponent,
    PipeDatePipe,
    PipetestPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    HttpClientModule,
    GoogleMapsModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
