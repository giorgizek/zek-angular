import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertType } from '../../../models';

import { AlertService, Alert } from '../../../services/alert.service';

@Component({
    selector: 'zek-validation',
    templateUrl: './validation.html',
    styles: [':host { display: block; }']
})
export class ZekValidation implements OnInit, OnDestroy {
    alerts: Alert[] = [];
    private subscription?: Subscription;

    constructor(private readonly alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.getAlert().subscribe((alert: Alert) => {
            if (!alert) {
                // clear alerts when an empty alert is received
                this.alerts = [];
                return;
            }
            // add alert to array
            this.alerts.push(alert);
        });
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }


    clear() {
        this.alertService.clear();
    }
    remove(alert: Alert) {
        this.alerts = this.alerts.filter(x => x !== alert);
    }

    cssIcon(alert: Alert) {
        if (!alert) {
            return;
        }

        if (alert.icon && alert.icon.length > 0)
            return alert.icon;


        if (!alert.type) {
            return;
        }

        switch (alert.type) {
            case AlertType.Success:
                return 'fas fa-check';
            case AlertType.Danger:
            case AlertType.Warning:
                return 'fas fa-exclamation-triangle';
            case AlertType.Info:
                return 'fas fa-info-circle';
            default:
                return;
        }
    }

    cssAlert(alert: Alert) {
        if (!alert) {
            return;
        }

        // return css class based on alert type
        switch (alert.type) {
            case AlertType.Primary:
                return 'alert-primary';
            case AlertType.Secondary:
                return 'alert-secondary';
            case AlertType.Success:
                return 'alert-success';
            case AlertType.Danger:
                return 'alert-danger';
            case AlertType.Warning:
                return 'alert-warning';
            case AlertType.Info:
                return 'alert-info';
            case AlertType.Light:
                return 'alert-light';
            case AlertType.Dark:
                return 'alert-dark';
            default:
                return 'alert-secondary';
        }
    }
}
