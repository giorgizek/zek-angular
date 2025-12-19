import { CommonModule } from '@angular/common';
import { Component, Input, Optional } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BooleanInput } from '../../components';
import { Convert } from '../../utils';
import { NgForm, FormGroupDirective } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'zek-field-validator, [zek-field-validator]',
    host: {
        '[class.invalid-tooltip]': 'hasErrors'
    },
    templateUrl: './field-validator.html',
    imports: [CommonModule, TranslateModule]
})
export class ZekFieldValidator {
    @Input() field: any;

    private _log = false;
    get log(): boolean {
        return this._log;
    }
    @Input()
    set log(value: BooleanInput) {
        const v = Convert.toBooleanProperty(value);
        if (this._log !== v) {
            this._log = v;
        }
    }

    constructor(
        @Optional() private parentForm: NgForm,
        @Optional() private parentFormGroup: FormGroupDirective
    ) { }


    get hasErrors(): boolean {
        if (!this.field) return false;

        const errors = this.field.errors;
        const invalid = this.field.invalid;

        // Check for specific error object existence
        if (!invalid || !errors) return false;

        // 1. Check if field is touched or dirty
        const isInteract = this.field.dirty || this.field.touched;

        // 2. Check if parent form is submitted (Works for both Reactive and Template)
        const isSubmitted = (this.parentForm && this.parentForm.submitted) ||
            (this.parentFormGroup && this.parentFormGroup.submitted) ||
            (this.field.formDirective && this.field.formDirective.submitted);

        return isInteract || isSubmitted;
    }
}