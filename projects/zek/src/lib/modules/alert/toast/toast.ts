import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { BootstrapHelper, Convert } from '../../../utils';
//declare let bootstrap: any;

import { AlertService, Toast } from '../../../services/alert.service';
import { NumberInput } from '../../../components';
import { CommonModule } from '@angular/common';

function clamp(v: number, min = 100, max = 10000) {
    return Math.max(min, Math.min(max, v));
}

@Component({
    standalone: true,
    selector: 'zek-toast',
    styleUrls: ['./toast.css'],
    templateUrl: './toast.html',
    imports: [CommonModule]
})
export class ZekToast implements OnInit, OnDestroy {
    @Input()
    get delay(): number {
        return this._delay;
    }
    set delay(v: NumberInput) {
        let tmp = clamp(Convert.toNumber(v) || 0);
        if (this._delay !== tmp) {
            this._delay = tmp;
        }
    }
    _delay: number = 3000;
    
    
    @Input() icon = true;

    toasts: any[] = [];
    private _subscription?: Subscription;
    private _timeout: any;

    constructor(private readonly alertService: AlertService) { }

    ngOnInit() {
        this._subscription = this.alertService.getToast().subscribe((toast: Toast) => {
            if (!toast) {
                // clear alerts when an empty alert is received
                this.toasts = [];
                return;
            }

            // add toast to array
            this.cssInit(toast);
            this.toasts.unshift(toast);

            this._timeout = setTimeout(() => {
                this.remove(toast);
                // let toastEl = document.getElementById(`toast-${toast.id}`);
                // let t = new bootstrap.Toast(toastEl);
                // t.show();
            }, this._delay);


            // let toastElList = [].slice.call(document.querySelectorAll('.toast'))
            // let toastList = toastElList.map(function (toastEl) {
            //     return new bootstrap.Toast(toastEl)
            // })
            // toastList.forEach(t => {
            //     t.show();
            // });
        });



    }


    ngOnDestroy() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        this.clearTimeout();
    }


    clear() {
        this.alertService.clear();
    }
    remove(toast: Toast) {
        this.toasts = this.toasts.filter(x => x !== toast);
    }

    clearTimeout() {
        if (this._timeout) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
    }


    cssInit(toast: Toast) {
        if (!toast || !toast.type)
            return;


        if (this.icon && !toast.icon) {
            toast.icon = BootstrapHelper.cssAlertIcon(toast.type);
        }

        var v = toast as any;
        switch (toast.type) {
            case 'primary':
                v.css = 'bg-primary text-white';
                break;
            case 'success':
                v.css = 'bg-success text-white';
                // v.iconColor = 'text--accent-green';
                // v.borderColor = 'border--accent-green';
                break;
            case 'danger':
                v.css = 'bg-danger text-white';
                // v.iconColor = 'text--accent-red';
                // v.borderColor = 'border--accent-red';
                break;
            case 'warning':
                v.css = 'bg-warning text-dark';
                // v.iconColor = 'text--accent-yellow';
                // v.borderColor = 'border--accent-yellow';
                break;
            case 'info':
                v.css = 'bg-info text-white';
                // v.iconColor = 'text--accent-blue';
                // v.borderColor = 'border--accent-blue';
                break;
            case 'light':
                v.css = 'bg-light text-dark';
                break;
            case 'dark':
                v.css = 'bg-dark text-white';
                break;


            default:
                v.css = 'bg-secondary text-white';
                break;
        }
    }
}

