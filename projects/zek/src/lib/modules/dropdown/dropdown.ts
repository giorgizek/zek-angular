import { CommonModule } from "@angular/common";
import { Component, ElementRef, forwardRef, Input, Renderer2 } from "@angular/core";
import { FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { CoreUiComponent } from "../../components";
import { StringHelper } from "../../utils/string-helper";
import { Convert } from "../../utils/convert";
import { BooleanInput } from "../../components/types";

const ZEK_DROPDOWN_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ZekDropdown),
    multi: true,
};

@Component({
    standalone: true,
    selector: 'zek-dropdown,[zek-dropdown]',
    templateUrl: './dropdown.html',
    styles: [':host { display: inline-block; }'],
    providers: [ZEK_DROPDOWN_CONTROL_VALUE_ACCESSOR],
    host: {
        '[attr.id]': 'id',

    },
    imports: [
        CommonModule,
        FormsModule
    ],
})
export class ZekDropdown extends CoreUiComponent {
    constructor(renderer: Renderer2, elementRef: ElementRef) {
        super(renderer, elementRef);
    }

    private _uniqueId: string = `zek-dropdown-${this.uniqueId}`;
    /** The unique ID for the radio button. */
    @Input() id: string = this._uniqueId;
    get inputId(): string {
        return `${this.id || this._uniqueId}-input`;
    }

    private _multiple = false;
    get multiple() {
        return this._multiple;
    }
    @Input()
    set multiple(value: BooleanInput) {
        this._multiple = Convert.toBooleanProperty(value);
    }
    @Input() valueField?: string | null;
    @Input() textField?: string | null;
    @Input() checkedTextField?: string | null;

    @Input() css: 'primary' | 'secondary' | 'success' | 'danger ' | 'warning' | 'info' | 'light' | 'dark' = 'primary';


    searchText = '';
    @Input()
    get label(): string {
        return this._label;
    }
    set label(value: string | null | undefined) {
        if (value)
            this._label = value;
        else
            this._label = '';
    }
    private _label = '';


    private _data: any[] = [];
    get data(): any[] {
        return this._data;
    }
    @Input()
    set data(value: any[] | null | undefined) {
        if (this._data !== value) {
            this._data = value ? value : [];
            this._onDataChanged();
        }
    }
    private _onDataChanged() {
        this._normalizeData();
        this._filterData();
    }

    normalizedItems: any[] = [];
    filteredItems: any[] = [];
    selectedItems: any[] = [];
    selectedItemsText = '';


    onTextChange() {
        this._filterData();
    }
    private _filterData() {
        if (this.searchText) {
            const normalized = StringHelper.trimStart(this.searchText.toUpperCase(), ' ');
            this.filteredItems = this.normalizedItems.filter(item => item.normalized.indexOf(normalized) !== -1);
        }
        else {
            this.filteredItems = this.normalizedItems;
        }
    }




    private _normalizeData() {
        this.normalizedItems = [];
        if (this.valueField && this.textField) {
            for (const item of this._data) {
                this.normalizedItems.push({
                    key: item[this.valueField],
                    value: item[this.textField],
                    normalized: (item[this.textField] || '').toUpperCase(),
                    checked: this.selectedItems.includes(item),
                    item: item
                });
            }
        } else {
            for (const item of this._data) {
                this.normalizedItems.push({ key: item, value: item, checked: this.selectedItems.includes(item), item });
            }
        }
    }


    checkAll(checked: boolean, ngModelChange = true) {
        if (this.disabled || this.readonly) return;

        for (const item of this.normalizedItems) {
            item.checked = checked;
        }

        this.selectedItems = [];

        if (checked) {
            if (this.multiple) {
                const tmp = [];
                for (const normalized of this.normalizedItems) {
                    this.selectedItems.push(normalized.item);
                    tmp.push(normalized.key);
                }

                if (ngModelChange)
                    this.setNgModel(tmp);
            }
        }
        else
            if (ngModelChange)
                this.setNgModel(null);
    }

    toggleChecked(normalized: any) {
        if (!normalized || this.disabled || this.readonly) return;

        const checked = normalized.checked || false;
        if (!this.multiple) {
            for (const item of this.normalizedItems) {
                item.checked = false;
            }
        }


        //on check item
        if (!checked) {
            normalized.checked = true;
            if (this.multiple) {
                if (!this.selectedItems.includes(normalized.item)) {
                    this.selectedItems.push(normalized.item);
                }

                //todo optimize
                const tmp = [];
                for (const item of this.normalizedItems) {
                    if (item.checked) {
                        tmp.push(item.key);
                    }
                }
                this.setNgModel(tmp);
            }
            else {
                this.selectedItems = [normalized.item];
                this.setNgModel(normalized.key);
            }
        } else {
            //on uncheck
            normalized.checked = false;
            if (this.multiple) {
                const index = this.selectedItems.indexOf(normalized.item);
                if (index !== -1) {
                    this.selectedItems.splice(index, 1);
                }

                //todo optimize
                const tmp = [];
                for (const item of this.normalizedItems) {
                    if (item.checked) {
                        tmp.push(item.key);
                    }
                }
                this.setNgModel(tmp);
            }
            else {
                this.selectedItems = [];
                this.setNgModel(null);
            }
        }

        this._initText();
    }


    private _initText() {
        const field = this.checkedTextField || this.textField || '';
        if (field) {
            this.selectedItemsText = this.selectedItems.map(x => x[field]).join(', ');
        } else {
            this.selectedItemsText = this.selectedItems.join(', ');
        }
    }
}