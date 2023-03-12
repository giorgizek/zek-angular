import { Component, Input } from '@angular/core';
import { BooleanInput } from '../../../components';
import { AlertType } from '../../../models';
import { Convert } from '../../../utils';
import { BootstrapHelper } from '../../../utils/bootstrap.helper';

@Component({
    selector: 'zek-alert',
    templateUrl: './alert.html',
    styles: [':host { display: block; }']
})
export class ZekAlert {
    private _type: AlertType | string | null | undefined = AlertType.Info;
    @Input()
    get type(): AlertType | string | null | undefined {
        return this._type;
    }
    set type(v: AlertType | string | null | undefined) {
        if (v !== this._type) {
            this._type = v

            this.cssAlert = '';
            this.cssIcon = '';
            if (typeof v === 'string') {
                let enumValue = BootstrapHelper.getAlertType(v);
                if (enumValue) {
                    this.cssAlert = BootstrapHelper.cssAlert(enumValue);
                    this.cssIcon = BootstrapHelper.cssAlertIcon(enumValue);
                }
            } else {
                this.cssAlert = BootstrapHelper.cssAlert(v);
                this.cssIcon = BootstrapHelper.cssAlertIcon(v);
            }
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


    cssAlert = '';
    cssIcon = '';


    // cssIcon() {
    //     return BootstrapHelper.cssAlertIcon(this._type);
    // }

    // cssAlert() {
    //     return BootstrapHelper.cssAlert(this._type);
    // }
}

