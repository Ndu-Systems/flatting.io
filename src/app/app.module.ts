import { AgmCoreModule } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes.service';
import { HttpClientModule } from "@angular/common/http";
import { ViewsModule } from './views/views.module';
import { SharedModule } from './shared/shared.module';

// main layout
import { NavigationModule } from './main-layout/navigation/navigation.module';
//Services 
import { TenantService, BuildingService, AccountService ,PaymentsService} from './services';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    NavigationModule,
    AppRoutes,
    RouterModule,
    FormsModule,
    ViewsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    TenantService,
    BuildingService,
    AccountService,
    PaymentsService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
