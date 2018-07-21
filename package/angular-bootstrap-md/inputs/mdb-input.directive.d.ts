import { ElementRef, Renderer2, AfterViewInit, AfterViewChecked, OnInit, OnDestroy } from '@angular/core';
export declare class MdbInputDirective implements AfterViewChecked, OnInit, AfterViewInit, OnDestroy {
    private _elRef;
    private _renderer;
    wrongTextContainer: any;
    rightTextContainer: any;
    el: ElementRef | any;
    elLabel: ElementRef | any;
    elIcon: Element | any;
    element: any;
    private changes;
    mdbInputDirective: MdbInputDirective;
    placeholder: string;
    customRegex: any;
    mdbValidate: boolean;
    focusCheckbox: boolean;
    focusRadio: boolean;
    isBrowser: any;
    isClicked: boolean;
    constructor(_elRef: ElementRef, _renderer: Renderer2, platformId: string);
    ngOnDestroy(): void;
    onfocus(): void;
    onblur(): void;
    onchange(): void;
    onkeydown(event: any): void;
    oncut(): void;
    onpaste(): void;
    ondrop(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    resize(): void;
    delayedResize(): void;
    initComponent(): void;
    private checkValue();
}