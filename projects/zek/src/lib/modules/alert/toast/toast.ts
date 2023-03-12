import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { BootstrapHelper } from '../../../utils';
//declare let bootstrap: any;

import { AlertService, Toast } from '../../../services/alert.service';
import { AlertType } from '../../../models';

@Component({
    selector: 'zek-toast',
    styleUrls: ['./toast.css'],
    templateUrl: './toast.html'
})
export class ZekToast implements OnInit, OnDestroy {
    @Input() timeOut?: number;
    @Input() icon = true;

    toasts: any[] = [];
    private subscription?: Subscription;
    private timeout: any;

    constructor(private readonly alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.getToast().subscribe((toast: Toast) => {
            if (!toast) {
                // clear alerts when an empty alert is received
                this.toasts = [];
                return;
            }

            // add toast to array
            this.cssInit(toast);
            this.toasts.unshift(toast);

            this.timeout = setTimeout(() => {
                this.remove(toast);
                // let toastEl = document.getElementById(`toast-${toast.id}`);
                // let t = new bootstrap.Toast(toastEl);
                // t.show();
            }, 3000);


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
        if (this.subscription) {
            this.subscription.unsubscribe();
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
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }


    cssInit(toast: Toast) {
        if (!toast || !toast.type)
            return;


        if (this.icon) {
            toast.icon = BootstrapHelper.cssAlertIcon(toast.type);
        }

        var v = toast as any;
        switch (toast.type) {
            case AlertType.Primary:
                v.css = 'bg-primary text-white';
                break;
            case AlertType.Success:
                v.css = 'bg-success text-white';
                // v.iconColor = 'text--accent-green';
                // v.borderColor = 'border--accent-green';
                break;
            case AlertType.Danger:
                v.css = 'bg-danger text-white';
                // v.iconColor = 'text--accent-red';
                // v.borderColor = 'border--accent-red';
                break;
            case AlertType.Warning:
                v.css = 'bg-warning text-dark';
                // v.iconColor = 'text--accent-yellow';
                // v.borderColor = 'border--accent-yellow';
                break;
            case AlertType.Info:
                v.css = 'bg-info text-white';
                // v.iconColor = 'text--accent-blue';
                // v.borderColor = 'border--accent-blue';
                break;
            case AlertType.Light:
                v.css = 'bg-light text-dark';
                break;
            case AlertType.Dark:
                v.css = 'bg-dark text-white';
                break;


            default:
                v.css = 'bg-secondary text-white';
                break;
        }
    }
}

