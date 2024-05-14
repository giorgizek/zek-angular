import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BooleanInput } from '../../components';
import { Convert } from '../../utils';
import { FormsModule } from '@angular/forms';
import { ZekFieldValidator } from '../validator';

@Component({
    standalone: true,
    selector: 'zek-password',
    templateUrl: './password.html',
    imports: [FormsModule, ZekFieldValidator]
})
export class ZekPassword {
    @Input() name = 'Password';

    private _required = false;
    @Input()
    get required(): boolean {
        return this._required;
    }
    set required(v: BooleanInput) {
        this._required = Convert.toBooleanProperty(v);
    }

    @Input() minlength: number | string | null = null;
    @Input() maxlength: number | string | null = null;

    @Input() model?: string | null;
    @Output('modelChange') onChange = new EventEmitter();

    private _type = 'password';
    get type() {
        return this._type;
    }

    showHide() {
        this._type = this._type === 'password' ? 'text' : 'password';
    }
}