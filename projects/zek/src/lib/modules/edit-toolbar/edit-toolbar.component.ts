import { Component, Output, EventEmitter, Input } from '@angular/core';
import { PrintType } from '../../models/print.model';

@Component({
    selector: 'app-edit-toolbar',
    templateUrl: './edit-toolbar.component.html'
})
export class EditToolbarComponent {

    printType = PrintType;

    @Input() showExport = false;

    @Input() showPrint = false;

    @Input() readOnly?: boolean | null = false;

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