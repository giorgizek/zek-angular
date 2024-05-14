import { Directive, ElementRef, HostListener, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[zek-sort]'
})
export class ZekSort implements AfterViewInit {
    private innerHtml: string = '';

    /**
     * name of sorting column
     */
    @Input() header: string | null = null;

    /**
     * Executes after 'sort' input changed
     */
    @Output() sortChange = new EventEmitter<string | null>();

    /**
     * Executes after 'asc' input changed
     */
    @Output() ascChange = new EventEmitter<boolean>();

    /**
     *  Executes after click on column
     */
    @Output() onChange = new EventEmitter();


    constructor(private el: ElementRef/*, renderer: Renderer, private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef */) {
    }

    // @Input() set myIf(shouldAdd: boolean) {
    //     if (shouldAdd) {
    //       // If condition is true add template to DOM
    //       this.viewContainer.createEmbeddedView(this.templateRef);
    //     } else {
    //      // Else remove template from DOM
    //       this.viewContainer.clear();
    //     }
    //   }


    ngAfterViewInit() {
        // Use renderer to render the element with styles
        //renderer.setElementStyle(el.nativeElement, 'display', 'none');

        this.innerHtml = this.el.nativeElement.innerHTML;
        this.initIcon();
    }

    initIcon() {
        if (!this.innerHtml) return;

        let tmpAsc = 0;
        if (!this.header || this.header !== this.sort) {
            tmpAsc = 1;
        } else if (this.asc) {
            tmpAsc = 2;
        } else {
            tmpAsc = 3;
        }

        this.el.nativeElement.innerHTML = (this.innerHtml || '')
            + '<span class="float-end' + (tmpAsc === 1 ? ' text-muted' : '') + '">'
            + (tmpAsc === 1 ? '<i class="fa-solid fa-sort"></i>' : '')
            + (tmpAsc === 2 ? '<i class="fa-solid fa-sort-up"></i>' : '')
            + (tmpAsc === 3 ? '<i class="fa-solid fa-sort-down"></i>' : '')
            + '</span>';
    }

    //    @HostListener('click', ['$event.target']) onClick(btn) {
    //      console.log('button', btn, 'number of clicks:', this.numberOfClicks++);
    //   }
    @HostListener('click') onClick() {
        if (this.sort !== this.header) {
            this.sort = this.header;
            this.sortChange.emit(this.sort);
            this.asc = true;
            this.ascChange.emit(this.asc);

        } else {
            this.asc = !this.asc;
            this.ascChange.emit(this.asc);
        }

        this.onChange.emit();
    }





    private _sort: string | null = null;
    get sort() {
        return this._sort;
    }
    @Input()
    set sort(value: string | null) {
        if (this._sort !== value) {
            this._sort = value;
            this.initIcon();
        }
    }


    private _asc = false;
    get asc() {
        return this._asc;
    }
    @Input()
    set asc(value: boolean) {
        if (this._asc !== value) {
            this._asc = value;
            this.initIcon();
        }
    }
}