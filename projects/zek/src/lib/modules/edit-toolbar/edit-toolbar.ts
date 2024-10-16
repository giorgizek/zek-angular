import { Component, Output, EventEmitter, Input } from '@angular/core';
import { BooleanInput } from '../../components';
import { PrintType } from '../../models/print.model';
import { Convert } from '../../utils';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'zek-edit-toolbar',
    templateUrl: './edit-toolbar.html',
    imports: [CommonModule, TranslateModule]
})
export class ZekEditToolbar {

    private _showSave = true;
    @Input()
    get showSave() {
        return this._showSave;
    }
    set showSave(v: BooleanInput) {
        this._showSave = Convert.toBooleanProperty(v);
    }

    private _showCancel = true;
    @Input()
    get showCancel() {
        return this._showCancel;
    }
    set showCancel(v: BooleanInput) {
        this._showCancel = Convert.toBooleanProperty(v);
    }


    PrintType = PrintType;

    private _showExport = false;
    @Input()
    get showExport() {
        return this._showExport;
    }
    set showExport(v: BooleanInput) {
        this._showExport = Convert.toBooleanProperty(v);
    }


    private _showPrint = false;
    @Input()
    get showPrint() {
        return this._showPrint;
    }
    set showPrint(v: BooleanInput) {
        this._showPrint = Convert.toBooleanProperty(v);
    }

    private _readOnly = false;
    @Input()
    get readOnly() : boolean {
        return this._readOnly;
    }
    set readOnly(v: BooleanInput) {
        this._readOnly = Convert.toBooleanProperty(v);
    }

    @Output() onSave = new EventEmitter();
    // save(navigateToReturnUrl: boolean) {
    //     this.onSave.emit(navigateToReturnUrl);
    // }

    @Output() onCancel = new EventEmitter();
    cancel() {
        this.onCancel.emit();
    }

    // @Output()
    // onReset = new EventEmitter();
    // reset() {
    //     this.onReset.emit();
    // }

    @Output() onPrint = new EventEmitter<PrintType>();
    print(printType?: PrintType) {
        this.onPrint.emit(printType);
    }


    @Output() onExport = new EventEmitter<number>();
    exportExcel() {
        this.onExport.emit(1);
    }
}