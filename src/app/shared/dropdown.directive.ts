import {Directive, Input, HostBinding, ElementRef, Renderer2, HostListener} from "@angular/core";

@Directive({
    selector: "[appDropdown]"
})
export class DropdownDirective {

    @HostBinding('class.open') isOpen: boolean = false;

    @HostListener("click", ['$event']) toggleOpen (click: Event){
        this.isOpen = !this.isOpen;
    }
}