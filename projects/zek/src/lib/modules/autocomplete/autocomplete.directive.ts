import { AfterViewInit, ElementRef } from '@angular/core';
import { Directive } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
    selector: 'form'
})
export class AutoCompleteDirective implements AfterViewInit {
    constructor(private readonly el: ElementRef, private readonly router: Router) {

    }
    ngAfterViewInit() {
        if (this.router.url === '/login') { 
            return;
        }

        this.el.nativeElement.setAttribute('autocomplete', 'off');
    }
}