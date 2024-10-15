import { Directive, Input } from '@angular/core';
import { BooleanInput } from '../../components';
import { Convert } from '../../utils';

@Directive({
    standalone: true,
    selector: '[readonly],[readOnly]',
    host: {
        '[attr.readonly]': '_readOnly ? "" : null'
    }
})
export class ZekReadOnlyDirective {
    private _readOnly = false;
    @Input()
    get readonly(): boolean {
        return this._readOnly;
    }
    set readonly(v: BooleanInput) {
        this._readOnly = Convert.toBooleanProperty(v);
    }
}