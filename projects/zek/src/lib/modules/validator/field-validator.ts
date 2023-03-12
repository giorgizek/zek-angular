import { Component, Input } from '@angular/core';

@Component({
    selector: 'zek-field-validator, [zek-field-validator]',
    host: { '[class]': '"invalid-tooltip"' },
    templateUrl: './field-validator.html'
})
export class ZekFieldValidator {
    @Input() field: any;
    // @Input() field?: NgModel;

    constructor() {
        if (this.field)
            console.log(this.field.errors);
    }
}