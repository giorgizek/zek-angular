import { Component, Input } from '@angular/core';
import { AlertType } from '../../../models';
import { BootstrapHelper } from '../../../utils/bootstrap.helper';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styles: [':host { display: block; }']
})
export class AlertComponent {
    private _type: AlertType | string | null | undefined = AlertType.Info;
    get type(): AlertType | string | null | undefined {
        return this._type;
    }
    @Input() set type(v: AlertType | string | null | undefined) {
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

    @Input() title? : string | null;


    cssAlert = '';
    cssIcon = '';


    // cssIcon() {
    //     return BootstrapHelper.cssAlertIcon(this._type);
    // }

    // cssAlert() {
    //     return BootstrapHelper.cssAlert(this._type);
    // }
}

