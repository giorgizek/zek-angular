import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BooleanInput } from '../../components';
import { CoreUiComponent } from '../../components/core-ui.component';
import { KeyPair, ModalSize, PagedList } from '../../models';
import { Convert, ObjectHelper } from '../../utils';
declare let bootstrap: any;

/**
 * Provider Expression that allows bb to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
const ZEK_BB_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ZekButtonBrowse),
    multi: true,
};

@Component({
    selector: 'zek-bb',
    templateUrl: './bb.component.html',
    providers: [ZEK_BB_CONTROL_VALUE_ACCESSOR],
})
export class ZekButtonBrowse extends CoreUiComponent {
    override destroy() {
        this._modal?.dispose();
        this._modal = null;
        return super.destroy();
    }

    private _uniqueId: string = `zek-bb-${this.uniqueId}`;
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
        this.onKeyPairChange.emit(new KeyPair({ key: this._value, value: this._text }))
    }



    private _readOnly = false;
    @Input()
    get readOnly(): boolean {
        return this._readOnly;
    }
    set readOnly(v: BooleanInput) {
        this._readOnly = Convert.toBooleanProperty(v);
    }



    private _hide = false;
    @Input()
    get hide(): boolean {
        return this._hide;
    }
    set hide(v: BooleanInput) {
        this._hide = Convert.toBooleanProperty(v);
    }

    private _showInput = true;
    @Input()
    get showInput(): boolean {
        return this._showInput;
    }
    set showInput(v: BooleanInput) {
        this._showInput = Convert.toBooleanProperty(v);
    }

    private _multiSelect = false;
    @Input()
    get multiSelect(): boolean {
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
            const modalEl = document.getElementById(this.modalId);
            this._modal = new bootstrap.Modal(modalEl, { backdrop: false });
        }
        return this._modal;
    }
    set modal(v: any) {
        this._modal = v;
    }


    private _size: ModalSize = '';
    @Input()
    get size() {
        return this._size;
    }
    set size(v: ModalSize) {
        this._size = v;
    }

    private _scrollable = false;
    @Input()
    get scrollable(): boolean {
        return this._scrollable;
    }
    set scrollable(v: BooleanInput) {
        this._scrollable = Convert.toBooleanProperty(v);
    }

    private _fullscreen = false;
    @Input()
    get fullscreen(): boolean {
        return this._fullscreen;
    }
    set fullscreen(v: BooleanInput) {
        this._fullscreen = Convert.toBooleanProperty(v);
    }

    private _showHeader = true;
    @Input()
    get showHeader(): boolean {
        return this._showHeader;
    }
    set showHeader(v: BooleanInput) {
        this._showHeader = Convert.toBooleanProperty(v);
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
            this.setNgModel(null);
        }
    }

    _onKey(event: KeyboardEvent) {
        if (event.key === 'Delete') {
            this.delete();
        }
    }




    override onValueChanged() {
        if (ObjectHelper.isDefined(this._value) && ObjectHelper.isDefined(this._type)) {
            this.bindText();
        } else {
            this.text = null;
        }
    }
    bindText() {
        this.onBindText.emit();
    }
}