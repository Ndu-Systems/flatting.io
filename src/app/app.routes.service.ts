import { UploadPaymentFileComponent } from './views/payments/uplaod-payment-file/upload-payment-file/upload-payment-file.component';
import { ListBuildingsComponent } from './views/buildings/list-buildings/list-buildings.component';
import { AddTenantComponent } from './views/tenants/add-tenant/add-tenant.component';

import { Map1Component } from './views/maps/map1/map1.component';
import { ModalsComponent } from './views/modals/modals.component';
import { BasicTableComponent } from './views/tables/basic-table/basic-table.component';
import { Profile1Component } from './views/profile/profile1/profile1.component';
import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NotFoundComponent } from './views/errors/not-found/not-found.component';
import { Dashboard1Component } from './views/dashboards/dashboard1/dashboard1.component';
import { ListTenantsComponent, ViewTenantComponent, EditTenantComponent } from './views/tenants';


const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboards/v1' },
  {
    path: 'dashboards', children:
      [
        { path: 'v1', component: Dashboard1Component },
      ]
  },
  {
    path: 'tenants', children:
      [
        { path: 'tenants', component: ListTenantsComponent },
        { path: 'view/:id', component: ViewTenantComponent },
        { path: 'edit/:id', component: EditTenantComponent },
        { path: 'add', component: AddTenantComponent }
      ]
  },
  {
    path: 'buildings', children:
      [
        { path: 'buildings', component: ListBuildingsComponent }       
      ]
  },
  {
    path: 'payments', children:
    [
      { path: '', component: UploadPaymentFileComponent }
    ]
  }
];
export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
