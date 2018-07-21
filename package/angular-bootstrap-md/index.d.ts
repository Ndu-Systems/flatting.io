import { ModuleWithProviders } from '@angular/core';
export { ButtonsModule, ButtonRadioDirective, ButtonCheckboxDirective } from './buttons';
export { RippleModule, RippleDirective } from './ripple';
export { WavesModule, WavesDirective } from './waves';
export { InputsModule, MdbInputDirective } from './inputs';
export { NavbarModule } from './navbars';
export { BsDropdownConfig, BsDropdownContainerComponent, BsDropdownDirective, BsDropdownMenuDirective, DropdownModule, BsDropdownState, BsDropdownToggleDirective } from './dropdown';
export { CarouselComponent, CarouselConfig, CarouselModule } from './carousel';
export { ChartsModule, BaseChartDirective } from './charts';
export { CollapseDirective, CollapseModule } from './collapse';
export { ModalBackdropComponent, ModalBackdropOptions, ModalDirective, ModalModule, ModalOptions, MDBModalService, ModalContainerComponent, MDBModalRef } from './modals';
export { TooltipConfig, TooltipContainerComponent, TooltipDirective, TooltipModule } from './tooltip';
export { PopoverConfig, PopoverContainerComponent, PopoverModule, PopoverDirective } from './popover';
export { IconsModule, MdbIconComponent } from './icons';
export declare class MDBRootModule {
}
export declare class MDBBootstrapModule {
    static forRoot(): ModuleWithProviders;
}
