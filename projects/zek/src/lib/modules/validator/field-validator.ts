import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

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


    get hasErrors(): boolean {
        return !!this.field &&
            this.field.invalid &&
            this.field.errors &&
            (this.field.dirty || this.field.touched || this.field.formDirective?.submitted);
    }
}