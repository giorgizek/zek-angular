import { Component, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'app-field-validator, [app-field-validator]',
    host: { '[class]': '"invalid-tooltip"' },
    templateUrl: './field-validator.component.html'
})
export class FieldValidatorComponent {
    @Input() field: any;
    // @Input() field?: NgModel;

    constructor() {
        if (this.field)
            console.log(this.field.errors);
    }
}