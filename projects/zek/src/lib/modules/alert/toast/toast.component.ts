import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertType } from '../../../utils';
//declare let bootstrap: any;

import { AlertService, Toast } from '../shared/alert.service';

@Component({
    selector: 'app-toast',
    styleUrls: ['./toast.component.css'],
    templateUrl: './toast.component.html'
})
export class ToastComponent implements OnInit, OnDestroy {
    @Input() timeOut?: number;

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

        var v = toast as any;
        switch (toast.type) {
            case AlertType.Success:
                v.iconColor = 'text--accent-green';
                v.borderColor = 'border--accent-green';
                break;
            case AlertType.Danger:
                v.iconColor = 'text--accent-red';
                v.borderColor = 'border--accent-red';
                break;
            case AlertType.Warning:
                v.iconColor = 'text--accent-yellow';
                v.borderColor = 'border--accent-yellow';
                break;
            case AlertType.Info:
                v.iconColor = 'text--accent-blue';
                v.borderColor = 'border--accent-blue';
                break;
        }
    }
    // .badge.bg-primary {
    //     background-color: $background-status-neutral !important;
    //     color: $text-status-neutral;
    //   }
    //   .badge.bg-secondary {
    //     background-color: $background-secondary !important;
    //     color: $text-secondary;
    //   }
    //   .badge.bg-success {
    //     background-color: $background-status-positive !important;
    //     color: $text-status-positive;
    //   }
    //   .badge.bg-danger {
    //     background-color: $background-status-distractive !important;
    //     color: $text-status-distractive;
    //   }
    //   .badge.bg-warning {
    //     background-color: $background-status-alert !important;
    //     color: $text-status-alert;
    //   }
    // cssIcon(toast: Toast) {
    //     if (!toast) {
    //         return;
    //     }

    //     if (toast.icon && toast.icon.length > 0)
    //         return toast.icon;


    //     if (!toast.type) {
    //         return;
    //     }

    //     switch (toast.type) {
    //         case AlertType.Success:
    //             return 'fas fa-check';
    //         case AlertType.Danger:
    //         case AlertType.Warning:
    //             return 'fas fa-exclamation-triangle';
    //         case AlertType.Info:
    //             return 'fas fa-info-circle';
    //         default:
    //             return;
    //     }
    // }

    // cssAlert(toast: Toast) {
    //     if (!toast) {
    //         return;
    //     }

    //     // return css class based on alert type
    //     switch (toast.type) {
    //         case AlertType.Primary:
    //             return 'bg-primary text-white';//'alert-primary';
    //         case AlertType.Success:
    //             return 'bg-success text-white';//'alert-success';
    //         case AlertType.Danger:
    //             return 'bg-danger text-white';//'alert-danger';
    //         case AlertType.Warning:
    //             return 'bg-warning text-dark';//'alert-warning';
    //         case AlertType.Info:
    //             return 'bg-info text-white';//'alert-info';
    //         case AlertType.Light:
    //             return 'bg-light text-dark';//'alert-light';
    //         case AlertType.Dark:
    //             return 'bg-dark text-white';//'alert-dark';
    //         default:
    //             return 'bg-secondary text-white';//'alert-secondary';
    //     }
    // }
}

