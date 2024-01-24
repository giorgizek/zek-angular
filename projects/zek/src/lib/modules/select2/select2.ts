import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { RandomHelper, StringHelper } from '../../utils';

@Component({
    selector: 'zek-select2,[zek-select2]',
    templateUrl: './select2.html',
    styleUrls: ['./select2.css']

})
export class ZekSelect2 implements OnDestroy {
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
            this.findAndSetItem();
            this.filterData();
        }
    }
    filteredData: Array<any> = [];

    @Input() textField: any;
    @Input() valueField: any;
    @Input() placeholder: string = ''

    @Output() selectedItemChange = new EventEmitter<any>();
    private _selectedItem: any;
    get selectedItem(): any {
        return this._selectedItem;
    }

    @Output() valueChange = new EventEmitter<any>();
    private _value: any;
    @Input()
    get value() {
        return this._value;
    }
    set value(v: any) {
        if (this._value !== v) {
            this._value = v;
            this.findAndSetItem();
        }
    }

    private findAndSetItem() {
        let foundItem = null;
        if (this._value === undefined || this._value === null || !this.data) {

        } else if (this.valueField === undefined || this.valueField === null || this.valueField === '') {
            foundItem = this.data.find(x => x === this._value);
        } else {
            foundItem = this.data.find(x => x[this.valueField] === this._value);
        }

        this._selectedItem = foundItem;
        this.setText();
    }




    // private _dropdown: any;
    // public get dropdown(): any {
    //     if (!this._dropdown) {
    //         let el = document.getElementById('btn-' + this.elementId);
    //         this._dropdown = new bootstrap.Dropdown(el);
    //     }
    //     return this._dropdown;
    // }
    // public set dropdown(v: any) {
    //     this._dropdown = v;
    // }

    ngOnDestroy() {
        // this.dropdown?.dispose();
        // this.dropdown = null;
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
        else// if (this.filter === undefined || this.filter === null || this.filter === '') 
        {
            this.filteredData = this.data;
        }
    }

    onFocus(e: FocusEvent) {
        // if (this.dropdown){
        //   this.dropdown.show();
        // }
        // let dropdown = document.getElementById(`dropdown-menu-container-${this.elementId}`);
        // console.log(dropdown);

        // if (dropdown) {
        //   console.log(dropdown.classList);

        //   if (!dropdown.classList.contains('show')) {
        //     let el = document.getElementById(`input-${this.elementId}`);
        //     if (el) {
        //       el.click();
        //     }
        //   }
        // }



        // let inputId = 'input-' + this.elementId;
        // let el = document.getElementById(inputId);
        // if (el) {

        //   if (!el.classList.contains('show')) {
        //     this.dropdown?.show();
        //   }

        // let menuId = '#dropdown-menu-' + this.elementId + ' ' + 'a';
        // el.addEventListener('keydown', function (e) {
        //   if (e.key == 'ArrowDown') {
        //     (document.querySelectorAll(menuId)[0] as any).focus();
        //   }
        // });
        // }
    }
    inputUnfocused() {
        // this.expanded = false;
    }

    private setText() {
        if (this._selectedItem === undefined || this._selectedItem === null) {
            this.text = null;
        }
        else if (this.textField === undefined || this.textField === null) {
            this.text = this._selectedItem;
        } else {
            this.text = this._selectedItem[this.textField];
        }
    }

    selectItem(item: any) {

        if (this._selectedItem !== item) {
            this._selectedItem = item;
            this.selectedItemChange.emit(item);

            this.setText();

            //set value
            let v;
            if (this.valueField === undefined || this.valueField === null || this.valueField === '') {
                // this.value = v
                v = item;
            } else {
                // this.value = v[this.valueField];
                v = item[this.valueField];
            }

            //if value not equals then emit valueChange
            if (this._value !== v) {
                this._value = v;
                this.valueChange.emit(v);
            }
        }
    }


}
