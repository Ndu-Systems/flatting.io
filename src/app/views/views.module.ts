 
import { AddBuildingComponent } from './buildings/add-building/add-building.component';
 
import { UploadPaymentFileComponent } from './payments/uplaod-payment-file/upload-payment-file/upload-payment-file.component';
import { AddTenantComponent } from './tenants/add-tenant/add-tenant.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { CalendarModule } from 'angular-calendar';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from '../main-layout/footer/footer.component';
import { StatsCardComponent } from './dashboards/common/stats-card/stats-card.component';
import { StatsCard2Component } from './dashboards/common/stats-card2/stats-card2.component';
import { Dashboard1Component } from './dashboards/dashboard1/dashboard1.component';
import { ListTenantsComponent, ViewTenantComponent, EditTenantComponent } from './tenants'; 
import { ListBuildingsComponent, ViewBuildingComponent, EditBuildingComponent } from './buildings';
import { LoginComponent } from './accounts';
import { PaymentsComponent } from './payments/payments/payments.component';
 
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: ''
    }),
    CalendarModule.forRoot()
  ],
  declarations: [
    FooterComponent,
    StatsCardComponent,
    StatsCard2Component,
    Dashboard1Component,
    ListTenantsComponent,
    ViewTenantComponent,
    EditTenantComponent,
    AddTenantComponent,
    ListBuildingsComponent,
    UploadPaymentFileComponent,
    ViewBuildingComponent,
    EditBuildingComponent,
    AddBuildingComponent,
    LoginComponent,
    PaymentsComponent
  ],
  exports: [
    FooterComponent,
    StatsCardComponent,
    StatsCard2Component,    
    Dashboard1Component,
    ReactiveFormsModule

  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ViewsModule { }
