import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, OnDestroy, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BooleanInput } from '../../components';
import { CoreUiComponent } from '../../components/core-ui.component';
import { KeyPair, PagedList } from '../../models';
import { Convert } from '../../utils';
declare let bootstrap: any;
let uniqueId = 0;

/**
 * Provider Expression that allows bb to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
const ZEK_BB_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ButtonBrowseComponent),
    multi: true,
};

@Component({
    selector: 'zek-bb',
    templateUrl: './bb.component.html',
    providers: [ZEK_BB_CONTROL_VALUE_ACCESSOR],
})
export class ButtonBrowseComponent extends CoreUiComponent {
    override destroy() {
        this._modal?.dispose();
        this._modal = null;
        return super.destroy();
    }

    private _uniqueId: string = `zek-bb-${++uniqueId}`;
    /** The unique ID for the bb. */
    @Input() id: string = this._uniqueId;
    get modalId(): string {
        return `${this.id || this._uniqueId}-modal`;
    }
    filter: any = {};
    data: PagedList = new PagedList();


    private _type?: string | null;
    @Input()
    get type() {
        return this._type;
    }
    set type(v: string | null | undefined) {
        if (this._type !== v) {
            this._type = v;
            this.onValueChanged();//get and set input text
        }
    }

    private _text: string | null = null;
    @Input()
    get text(): string | null {
        return this._text;
    }
    set text(v: string | null) {
        if (this._text !== v) {
            this._text = v
            this.onTextChanged();
        }
    }
    onTextChanged() {
        this.onKeyPairChange.emit({ key: this._value, value: this._text } as KeyPair)
    }



    private _readOnly: boolean = false;
    @Input()
    get readOnly(): boolean {
        return this._readOnly;
    }
    set readOnly(v: BooleanInput) {
        this._readOnly = Convert.toBooleanProperty(v);
    }



    private _hide: boolean = false;
    @Input()
    get hide(): boolean {
        return this._hide;
    }
    set hide(v: BooleanInput) {
        this._hide = Convert.toBooleanProperty(v);
    }

    private _showInput: boolean = true;
    @Input()
    get showInput(): boolean {
        return this._showInput;
    }
    set showInput(v: BooleanInput) {
        this._showInput = Convert.toBooleanProperty(v);
    }

    private _multiSelect = false;
    @Input()
    get multiSelect() {
        return this._multiSelect;
    }
    set multiSelect(v: BooleanInput) {
        this._multiSelect = Convert.toBooleanProperty(v);
    }


    @Output() onShowModal = new EventEmitter();
    @Output() onChooseAll = new EventEmitter();
    @Output() onKeyPairChange = new EventEmitter<KeyPair>();
    @Output() onBindText = new EventEmitter();

    private _modal: any;
    get modal(): any {
        if (!this._modal) {
            let modalEl = document.getElementById(this.modalId);
            this._modal = new bootstrap.Modal(modalEl, { backdrop: false });
        }
        return this._modal;
    }
    set modal(v: any) {
        this._modal = v;
    }


    size?: '' | 'sm' | 'lg' | 'xl' | 'xxl' | null = 'lg';
    get _sizeCss() {
        switch (this.size) {
            case 'sm':
                return 'modal-sm';
            case 'lg':
                return 'modal-lg';
            case 'xl':
                return 'modal-xl';
            case 'xxl':
                return 'modal-xxl';
            default:
                return '';
        }
    }


    showModal() {
        if (!this.disabled && !this.readOnly) {
            this.onShowModal.emit(this.filter);

            this.data = new PagedList();
            if (this.modal)
                this.modal.show();
        }
    }
    close() {
        this._modal?.hide();
    }



    choose(value: any) {
        if (!this.disabled && !this.readOnly) {
            this.setNgModel(value);
            this.close();
        }
    }
    chooseAll(filter: any) {
        this.onChooseAll.emit(filter);
        this.close();
    }

    delete() {
        if (!this.readOnly) {//!this.disabled && 
            this.setNgModel(undefined);
        }
    }

    _onKey(event: KeyboardEvent) {
        if (event.key === 'Delete') {
            this.delete();
        }
    }




    override onValueChanged() {
        if (typeof this._value !== 'undefined' && this._value !== null &&
            typeof this._type !== 'undefined' && this._type !== null) {
            this.bindText();
        } else {
            this.text = null;
        }
    }
    bindText() {
        this.onBindText.emit();
    }
}