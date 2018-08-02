import { ModalComponent } from './components/modal/modal.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CascadingPanelComponent } from './components/cascading-panel/cascading-panel.component';
import { CascadingCardComponent } from './components/cascading-card/cascading-card.component';
import { OverlayCardComponent } from './components/overlay-card/overlay-card.component';
import { PanelComponent } from './components/panel/panel.component';
import { SelectService, UserDataService } from './services';
import { TenantPipePipe, BuildingPipePipe } from './pipes';
import { NgxPaginationModule } from 'ngx-pagination';
import { PrimeNg } from './primeng';
 

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),   
    NgxPaginationModule,
    ... PrimeNg    
  ],
  declarations: [
    CascadingPanelComponent,
    CascadingCardComponent,
    OverlayCardComponent,
    PanelComponent,
    ModalComponent,
    TenantPipePipe,
    BuildingPipePipe
  ],
  exports: [
    MDBBootstrapModule,
    CascadingPanelComponent,
    CascadingCardComponent,
    OverlayCardComponent,
    PanelComponent,
    ModalComponent,
    TenantPipePipe, 
    BuildingPipePipe,  
    NgxPaginationModule,
    ... PrimeNg    
  ],
  providers: [ 
    SelectService,
    UserDataService
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
