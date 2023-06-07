import { Component, Input } from '@angular/core';
import { BooleanInput, CoreComponent } from '../../../components';
import { AlertType } from '../../../models';
import { Convert } from '../../../utils';
import { BootstrapHelper } from '../../../utils/bootstrap.helper';

@Component({
    selector: 'zek-alert',
    templateUrl: './alert.html',
    styles: [':host { display: block; }']
})
export class ZekAlert extends CoreComponent {
    private _type: AlertType | null | undefined = 'info';
    @Input()
    get type(): AlertType | null | undefined {
        return this._type;
    }
    set type(v: AlertType | null | undefined) {
        if (v !== this._type) {
            this._type = v
            this.init();
        }
    }

    _showClose: boolean = true;
    @Input()
    get showClose(): boolean {
        return this._showClose;
    }
    set showClose(v: BooleanInput) {
        this._showClose = Convert.toBooleanProperty(v);
    }

    @Input() title?: string | null;


    override init() {
        this.cssAlert = BootstrapHelper.cssAlert(this._type);
        this.cssIcon = BootstrapHelper.cssAlertIcon(this._type);
    }

    cssAlert = '';
    cssIcon = '';
}

