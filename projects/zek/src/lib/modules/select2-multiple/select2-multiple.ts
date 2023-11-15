import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { RandomHelper, StringHelper } from '../../utils';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//declare let bootstrap: any;


@Component({
    standalone: true,
    selector: 'zek-select2-multiple,[zek-select2-multiple]',
    templateUrl: './select2-multiple.html',
    imports: [CommonModule, FormsModule]
})

export class ZekSelect2Multiple {
    filter?: string | null;
    text?: string | null;

    readonly elementId = RandomHelper.randomHex();

    private _data: Array<any> = [];
    @Input()
    get data(): Array<any> {
        return this._data;
    }
    set data(value: Array<any>) {
        if (this._data !== value) {
            this._data = value;
            this.findAndSetItems();
            this.filterData();
        }
    }
    filteredData: Array<any> = [];

    @Input() textField: any;
    @Input() valueField: any;
    @Input() placeholder: string = ''

    @Output() selectedItemChange = new EventEmitter<any>();
    private _selectedItems: Array<any> = [];
    get selectedItems(): Array<any> {
        return this._selectedItems;
    }

    @Output() valueChange = new EventEmitter<any>();
    private _value?: Array<any> | null;
    @Input()
    get value() {
        return this._value;
    }
    set value(v: any) {
        if (this._value !== v) {
            this._value = v;
            this.findAndSetItems();
        }
    }

    private findAndSetItems() {
        this._data?.forEach(x => x.selected = false);
        this._selectedItems = [];
        let foundItems: Array<any> = [];
        if (this._value === undefined || this._value === null || !this.data) {

        } else if (this.valueField === undefined || this.valueField === null || this.valueField === '') {
            foundItems = this.data.filter(x => this._value?.includes(x));
        } else {
            foundItems = this.data.filter(x => this._value?.includes(x[this.valueField]));
        }

        if (foundItems.length > 0) {
            foundItems.forEach(x => x.selected = true);
            this._selectedItems = foundItems;
        }
        this.setText();
    }



    onTextChange(text: string) {
        this.filter = StringHelper.tryTrim(text);
        this.filterData();
    }

    private filterData() {
        if (this.filter && this.filter !== '') {
            let searchString = this.filter;
            if (this.textField === undefined || this.textField === null) {
                this.filteredData = this.data.filter(item => item.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
            } else {
                this.filteredData = this.data.filter(item => item[this.textField].toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
            }
        }
        else {
            this.filteredData = this.data;
        }
    }

    onFocus(e: FocusEvent) {
        this.filter = '';
        this.text = '';
        this.filterData();
    }
    inputUnfocused() {
        this.setText();
    }

    private setText() {
        if (this.textField === undefined || this.textField === null) {
            this.text = this._selectedItems.join(', ');
        } else {
            this.text = this._selectedItems.map(x => x[this.textField]).join(', ');
        }
    }

    selectItem(item: any) {
        item.selected = !item.selected;

        if (item.selected) {
            this._selectedItems.push(item);
        } else {
            this._selectedItems = this._selectedItems.filter(x => x !== item);
        }

        this.selectedItemChange.emit(item);
        this.setText();

        let v: Array<any> | null;
        if (this.valueField === undefined || this.valueField === null || this.valueField === '') {
            v = this._selectedItems ? this._selectedItems : null;
        } else {
            v = this._selectedItems ? this._selectedItems.map(x => x[this.valueField]) : null;
        }

        this._value = v;
        this.valueChange.emit(v);
    }


}
