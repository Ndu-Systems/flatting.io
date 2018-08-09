import { PaymentsComponent } from './views/payments/payments/payments.component';
import { AddBuildingComponent } from './views/buildings/add-building/add-building.component';
import { UploadPaymentFileComponent } from './views/payments/uplaod-payment-file/upload-payment-file/upload-payment-file.component';
import { ListBuildingsComponent } from './views/buildings/list-buildings/list-buildings.component';
import { AddTenantComponent } from './views/tenants/add-tenant/add-tenant.component';
import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { Dashboard1Component } from './views/dashboards/dashboard1/dashboard1.component';
import { ListTenantsComponent, ViewTenantComponent, EditTenantComponent } from './views/tenants';
import { ViewBuildingComponent, EditBuildingComponent } from './views/buildings';
import { LoginComponent } from './views/accounts';
import { AuthGuard } from './shared/authantication';


const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'accounts/login' },

  {
    path: 'accounts', children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: 'dashboard', children:
      [
        { path: '', component: Dashboard1Component, canActivate: [AuthGuard] },
      ]
  },
  {
    path: 'tenants', children:
      [
        { path: '', component: ListTenantsComponent, canActivate: [AuthGuard] },
        { path: 'view/:id', component: ViewTenantComponent, canActivate: [AuthGuard] },
        { path: 'edit/:id', component: EditTenantComponent, canActivate: [AuthGuard] },
        { path: 'add', component: AddTenantComponent, canActivate: [AuthGuard] }
      ]
  },
  {
    path: 'buildings', children:
      [
        { path: '', component: ListBuildingsComponent, canActivate: [AuthGuard] },
        { path: 'view/:id', component: ViewBuildingComponent, canActivate: [AuthGuard] },
        { path: 'edit/:id', component: EditBuildingComponent, canActivate: [AuthGuard] },
        { path: 'add', component: AddBuildingComponent, canActivate: [AuthGuard] }
      ]
  },
  {
    path: 'payments', children:
      [
        { path: '', component: PaymentsComponent, canActivate: [AuthGuard] },        
        { path: 'process', component: UploadPaymentFileComponent, canActivate: [AuthGuard] }
      ]
  }
];
export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
