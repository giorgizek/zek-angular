import { Component, Input, Output, EventEmitter } from '@angular/core';
import { KeyPair } from '../../../models/key-pair.model';
import { RandomHelper } from '../../../utils';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'zek-sort-button-group',
    templateUrl: './sort-button-group.html',
    imports: [CommonModule, TranslateModule],
})
export class ZekSortButtonGroup {
    elementName: string = '';

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

    sortField: any;
    private _sort: string | null = null;
    get sort(): string | null {
        return this._sort;
    }
    @Input()
    set sort(value: string | null) {
        if (this._sort !== value) {
            this._sort = value;
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
        }
    }

    @Input() sortFields: KeyPair[] | null = null;

    /**
     * Default constructor
     */
    constructor() {
        this.elementName = 'sort-button-group-' + RandomHelper.randomHex();
    }

    sortFieldClick(item: any) {
        if (!item || !item.key) return;

        this.sortField = item;
        if (this.sort !== item.key) {
            this.sort = item.key;
            this.sortChange.emit(this.sort);
            this.onChange.emit();
        }
    }

    ascDescClick() {
        this.asc = !this.asc;
        this.ascChange.emit(this.asc);
        this.onChange.emit();
    }
}
