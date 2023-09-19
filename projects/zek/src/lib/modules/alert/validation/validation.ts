import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService, Alert } from '../../../services/alert.service';
import { BootstrapHelper } from '../../../utils';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'zek-validation',
    templateUrl: './validation.html',
    styles: [':host { display: block; }'],
    imports: [CommonModule]
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

        return BootstrapHelper.cssAlertIcon(alert.type);
    }

    cssAlert(alert: Alert) {
        if (!alert) {
            return;
        }

        return BootstrapHelper.cssAlert(alert.type);
    }
}