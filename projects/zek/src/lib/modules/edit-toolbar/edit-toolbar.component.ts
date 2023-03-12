import { Component, Output, EventEmitter, Input } from '@angular/core';
import { BooleanInput } from '../../components';
import { PrintType } from '../../models/print.model';
import { Convert } from '../../utils';

@Component({
    selector: 'zek-edit-toolbar',
    templateUrl: './edit-toolbar.component.html'
})
export class EditToolbarComponent {

    printType = PrintType;

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

    private _readOnly: boolean = false;
    @Input()
    get readOnly(): boolean {
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