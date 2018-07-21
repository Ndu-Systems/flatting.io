

// free
import { ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ButtonsModule } from './buttons/buttons.module';
import { RippleModule } from './ripple/ripple.module';
import { NavbarModule } from './navbars/navbar.module';
import { DropdownModule } from './dropdown/dropdown.module';
import { CarouselModule } from './carousel/carousel.module';
import { ChartsModule } from './charts/chart.module';
import { CollapseModule } from './collapse/collapse.module';
import { ModalModule } from './modals/modal.module';
import { TooltipModule } from './tooltip/tooltip.module';
import { PopoverModule } from './popover/popover.module';
import { InputsModule } from './inputs/inputs.module';
import { WavesModule } from './waves/waves.module';
import { IconsModule } from './icons/icon.module';
export {
  ButtonsModule, ButtonRadioDirective, ButtonCheckboxDirective
} from './buttons';

export {
  RippleModule, RippleDirective
} from './ripple';

export {
  WavesModule, WavesDirective
} from './waves';

export {
  InputsModule, MdbInputDirective
} from './inputs';

export {
  NavbarModule
} from './navbars';

export {
  BsDropdownConfig, BsDropdownContainerComponent, BsDropdownDirective, BsDropdownMenuDirective,
  DropdownModule, BsDropdownState, BsDropdownToggleDirective
} from './dropdown';

export {
  CarouselComponent, CarouselConfig, CarouselModule
} from './carousel';

export {
  ChartsModule, BaseChartDirective
} from './charts';

export {
  CollapseDirective, CollapseModule
} from './collapse';

export {
  ModalBackdropComponent, ModalBackdropOptions, ModalDirective, ModalModule, ModalOptions, MDBModalService,
  ModalContainerComponent, MDBModalRef
} from './modals';

export {
  TooltipConfig, TooltipContainerComponent, TooltipDirective, TooltipModule
} from './tooltip';

export {
  PopoverConfig, PopoverContainerComponent, PopoverModule, PopoverDirective
} from './popover';

export {
  IconsModule, MdbIconComponent
} from './icons';



const MODULES = [
  ButtonsModule,
  RippleModule,
  WavesModule,
  InputsModule,
  NavbarModule,
  DropdownModule,
  CarouselModule,
  ChartsModule,
  CollapseModule,
  ModalModule,
  TooltipModule,
  PopoverModule,
  IconsModule
];

@NgModule({
  imports: [
    ButtonsModule,
    RippleModule.forRoot(),
    WavesModule.forRoot(),
    InputsModule.forRoot(),
    NavbarModule,
    DropdownModule.forRoot(),
    CarouselModule.forRoot(),
    ChartsModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    IconsModule
  ],
  exports: MODULES,
  schemas: [NO_ERRORS_SCHEMA]
})
export class MDBRootModule {
}

@NgModule({ exports: MODULES })
export class MDBBootstrapModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: MDBRootModule };
  }
}
