import { Component, ElementRef, forwardRef, Input, Renderer2 } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BooleanInput, CoreUiComponent } from '../../components';
import { ArrayHelper, Convert } from '../../utils';
import { KeyPairOption } from './model';
import { CommonModule } from '@angular/common';


let uniqueId = 0;


const ZEK_SELECT_MULTIPLE_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ZekSelectMultiple),
    multi: true,
};

@Component({
    standalone: true,
    selector: 'zek-select,[zek-select]',
    templateUrl: './select.html',
    providers: [ZEK_SELECT_MULTIPLE_CONTROL_VALUE_ACCESSOR],
    imports: [
        CommonModule,
        FormsModule
    ],
})

export class ZekSelectMultiple extends CoreUiComponent {
    constructor(renderer: Renderer2, elementRef: ElementRef) {
        super(renderer, elementRef);
    }

    private _uniqueId: string = `zek-select-${++uniqueId}`;
    /** The unique ID for the radio button. */
    @Input() id: string = this._uniqueId;

    @Input() valueField?: string | null;
    @Input() textField?: string | null;
    @Input() checkedTextField?: string | null;

    @Input() css: 'primary' | 'secondary' | 'success' | 'danger ' | 'warning' | 'info' | 'light' | 'dark' = 'primary';


    @Input()
    get placeholder(): string {
        return this._placeholder;
    }
    set placeholder(value: string | null | undefined) {
        if (value)
            this._placeholder = value;
        else
            this._placeholder = '';
    }
    private _placeholder = '';

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



    @Input()
    get multiple() {
        return this._multiple;
    }
    set multiple(value: BooleanInput) {
        this._multiple = Convert.toBooleanProperty(value);
    }
    private _multiple = true;


    private _selected: any[] = [];

    @Input()
    get data() {
        return this._data;
    }
    set data(value: any[] | null | undefined) {
        if (this._data !== value) {
            this._data = value;
            this.onDataChanged();
        }
    }
    private _data?: any[] | null = [];
    normalized: KeyPairOption[] = [];
    onDataChanged() {
        this._setSelectionByValue(this._value);
        if (this.isInitialized) {
            this._normalizeData();
        }
    }

    _text = '';



    override onValueChanged() {
        if (Array.isArray(this._data)) {
            this._setSelectionByValue(this._value);
        }
    }


    override init(): void {
        this._normalizeData();
    }


    private _normalizeData() {
        this.normalized = [];
        if (Array.isArray(this._data)) {
            if (this.valueField && this.textField) {
                for (const item of this._data) {
                    this.normalized.push({ key: item[this.valueField], value: item[this.textField], checked: this._selected.includes(item), item: item });
                }
            } else {
                for (const item of this._data) {
                    this.normalized.push({ key: item, value: item, checked: this._selected.includes(item), item });
                }
            }
        }
    }

    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     */
    private _setSelectionByValue(value: any | any[]): void {
        this._selected = [];

        if (this.multiple && value) {
            if (!Array.isArray(value)) {
                throw new Error("value is not array");
            }

            if (Array.isArray(this._data)) {
                let notUnique: any[] = [];
                if (this.valueField) {
                    for (const currentValue of value) {
                        const items = ArrayHelper.filterByKey(currentValue, this.valueField, this._data);
                        notUnique = notUnique.concat(items);
                    }
                } else {
                    for (const currentValue of value) {
                        const items = this._data.filter(x => x === currentValue);
                        notUnique = notUnique.concat(items);
                    }
                }

                this._selected = ArrayHelper.distinct(notUnique);
            }
        } else {
            if (Array.isArray(this._data)) {
                if (this.valueField) {
                    this._selected = ArrayHelper.filterByKey(value, this.valueField, this._data);
                } else {
                    this._selected = this._data.filter(x => x === value);
                }
            }
        }

        for (const norm of this.normalized) {
            norm.checked = this._selected.includes(norm.item);
        }
        this._initText();
    }




    toggleChecked(v: any) {
        if (v && !this.disabled && !this.readonly) {
            if (!v.checked) {
                v.checked = true;

                if (this.multiple) {
                    const tmp = [];
                    for (const item of this.normalized) {
                        if (item.checked) {
                            tmp.push(item.key);
                        }
                    }

                    this.setNgModel(tmp);
                    // this.value = tmp;
                }
                else {
                    //this.value = v.key;
                    this.setNgModel(v.key);
                }
            } else {
                v.checked = false;
                if (this.multiple) {
                    if (Array.isArray(this._value)) {
                        this.setNgModel((this._value as any[]).filter(x => x !== v.key));
                    }
                } else {
                    this.setNgModel(null);
                }
            }
        }
    }


    private _initText() {
        const field = this.checkedTextField || this.textField || '';
        if (field) {
            this._text = this._selected.filter(x => x !== undefined && x !== null).map(x => x[field]).join(', ');
        } else {
            this._text = this._selected.join(', ');
        }
    }
}
