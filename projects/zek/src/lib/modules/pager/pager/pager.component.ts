﻿import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BooleanInput } from '../../../components';
import { Pager } from '../../../models';
import { Convert } from '../../../utils';

@Component({
    selector: 'zek-pager',
    templateUrl: './pager.component.html',
    styles: [':host { display: block; }']
})
export class ZekPager {
    @Input() pager = new Pager();

    private _showPageSize: boolean = true;
    @Input()
    get showPageSize(): boolean {
        return this._showPageSize;
    }
    set showPageSize(v: BooleanInput) {
        this._showPageSize = Convert.toBooleanProperty(v);
    }

    @Input() pagerAlign = 'start';


    setPage(page: number) {
        // if (!this.pager) return;

        if (page === this.pager.pageNumber)
            return;
        this.onPageChange.emit(page);
    }
    setPageSize(pageSize: number) {
        // if (!this.pager) return;

        if (pageSize === this.pager.pageSize)
            return;
        this.onPageSizeChange.emit(pageSize);
    }

    @Output() onPageChange = new EventEmitter<number>();

    @Output() onPageSizeChange = new EventEmitter<number>();
}