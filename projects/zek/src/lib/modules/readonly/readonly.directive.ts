import { Directive, Input } from '@angular/core';
import { BooleanInput } from '../../components';
import { Convert } from '../../utils';

@Directive({
    standalone: true,
    selector: '[readonly],[readOnly]',
    host: {
        '[attr.readonly]': '_readonly ? "" : null'
    }
})
export class ZekReadOnlyDirective {
    _readonly = false;
    @Input() readonly(v: BooleanInput) {
        this._readonly = Convert.toBooleanProperty(v);
    }
}