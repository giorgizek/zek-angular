import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BooleanInput } from '../../components';

import { PrintType } from '../../models/print.model';
import { Convert, UrlHelper } from '../../utils';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    standalone: true,
    selector: 'zek-list-toolbar',
    templateUrl: './list-toolbar.html',
    imports: [CommonModule, TranslateModule],
})
export class ZekListToolbar {
    constructor(private readonly router: Router) {
    }

    printType = PrintType;

    private _isFiltered = false;
    @Input()
    get isFiltered() {
        return this._isFiltered;
    }
    set isFiltered(v: BooleanInput) {
        this._isFiltered = Convert.toBooleanProperty(v);
    }


    private _showCreate = true;
    @Input()
    get showCreate() {
        return this._showCreate;
    }
    set showCreate(v: BooleanInput) {
        this._showCreate = Convert.toBooleanProperty(v);
    }




    private _showFilter = true;
    @Input()
    get showFilter() {
        return this._showFilter;
    }
    set showFilter(v: BooleanInput) {
        this._showFilter = Convert.toBooleanProperty(v);
    }


    private _showPrint = false;
    @Input()
    get showPrint() {
        return this._showPrint;
    }
    set showPrint(v: BooleanInput) {
        this._showPrint = Convert.toBooleanProperty(v);
    }




    private _showSum = false;
    @Input()
    get showSum() {
        return this._showSum;
    }
    set showSum(v: BooleanInput) {
        this._showSum = Convert.toBooleanProperty(v);
    }


    private _showExport = false;
    @Input()
    get showExport(): boolean {
        return this._showExport;
    }
    set showExport(v: BooleanInput) {
        this._showExport = Convert.toBooleanProperty(v);
    }


    @Output() onRefresh = new EventEmitter();

    @Output() onFilter = new EventEmitter();

    refresh() {
        this.onRefresh.emit();
    }

    create() {
        const url = UrlHelper.getNoParam(this.router.url);
        // this.router.navigate([url, 'create', { returnUrl: url + ';filter=1' }]);
        this.router.navigate([url, 'create'],
            { queryParams: { returnUrl: url + '?filter=1' } }
        );
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