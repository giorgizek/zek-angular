import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

import { PrintType } from '../../models/print.model';

@Component({
    selector: 'zek-list-toolbar',
    templateUrl: './list-toolbar.component.html'
})
export class ListToolbarComponent {
    constructor(private readonly router: Router) {
    }

    printType = PrintType;

    @Input() isFiltered: boolean = false;

    @Input() showCreate = true;

    @Input() showFilter = true;

    @Input() showPrint = false;

    @Input() showSum = false;

    @Input() showExport = false;

    @Output() onRefresh = new EventEmitter();

    @Output() onFilter = new EventEmitter();

    refresh() {
        this.onRefresh.emit();
    }

    create() {
        const url = this.router.url.split(';')[0];
        this.router.navigate([url, 'create', { returnUrl: url + ';filter=1' }]);
    }


    filter() {
        this.onFilter.emit();
    }

    @Output()
    onPrint = new EventEmitter<PrintType>();
    print(printType?: PrintType) {
        this.onPrint.emit(printType);
    }

    @Output()
    onSum = new EventEmitter();
    sum() {
        this.onSum.emit();
    }


    @Output()
    onExport = new EventEmitter<number>();
    exportExcel() {
        this.onExport.emit(1);
    }
}