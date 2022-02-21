import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[readonly],[readOnly]',
    host: {
        '[attr.readonly]': '_isReadonly ? "" : null'
    }
})
export class ReadOnlyDirective {
    _isReadonly = false;

    @Input() set readonly(v: boolean | string) {
        this._isReadonly = v == true || v == '';
    };
}