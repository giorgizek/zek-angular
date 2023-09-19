import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    standalone:true,
    selector: 'zek-field-validator, [zek-field-validator]',
    host: { '[class]': '"invalid-tooltip"' },
    templateUrl: './field-validator.html',
    imports: [CommonModule, TranslateModule]
})
export class ZekFieldValidator {
    @Input() field: any;
    // @Input() field?: NgModel;

    constructor() {
        if (this.field)
            console.log(this.field.errors);
    }
}