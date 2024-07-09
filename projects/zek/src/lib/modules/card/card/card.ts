import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef, Input } from '@angular/core';

@Component({
    standalone: true,
    selector: 'zek-card',
    templateUrl: './card.html',
    styles: [':host { display: block; }'],
    imports: [CommonModule]
})
export class ZekCard implements AfterViewInit {
    /**
     *
     */
    constructor(private readonly cdRef: ChangeDetectorRef) {
    }

    @ViewChild('headerRef') private headerWrapper: ElementRef | undefined;
    @ViewChild('bodyRef') private bodyRef: ElementRef | undefined;
    // @ViewChild('contentRef') private contentRef: ElementRef | undefined;
    @ViewChild('footerRef') private footerRef: ElementRef | undefined;

    private _css = '';
    @Input()
    get css() {
        return this._css;
    }
    set css(value: string | null | undefined) {
        this._css = value || '';
    }
    showHeader = true;
    showBody = true;

    // showContent = true;
    showFooter = true;

    ngAfterViewInit() {
        this.showHeader = this.headerWrapper ? this.headerWrapper.nativeElement.childNodes.length > 0 : false;
        this.showBody = this.bodyRef ? this.bodyRef.nativeElement.children.length > 0 : false;
        // this.showContent = this.contentRef ? this.contentRef.nativeElement.children.length > 0 : false;
        this.showFooter = this.footerRef ? this.footerRef.nativeElement.childNodes.length > 0 : false;

        this.cdRef.detectChanges();
    }
}