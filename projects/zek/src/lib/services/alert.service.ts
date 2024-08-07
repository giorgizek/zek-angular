import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs';
import { AlertType } from '../models';
import { BootstrapHelper } from '../utils/bootstrap.helper';

export class BaseAlert {
    type?: AlertType | null;
    icon?: string | null;
    title?: string | null;
    css?: string | null;
    // id?: string;
}

export class Alert extends BaseAlert {
    messages?: string[];
}

export class Toast extends BaseAlert {
    message?: string | null;
}

@Injectable()
export class AlertService {
    private alertSubject = new Subject<any>();
    private toastSubject = new Subject<any>();
    private keepAfterRouteChange = false;
    // private id = 0;

    constructor(router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert messages
                    this.clear();
                }
            }
        });
    }

    add(alertType: AlertType, message: string, keepAfterRouteChange = false) {
        const messages = [];
        messages.push(message);
        this.addRange(alertType, messages, keepAfterRouteChange);
    }
    addRange(alertType: AlertType, messages: string[], keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.alertSubject.next(<Alert>{ type: alertType, messages: messages });
    }
    clear() {
        this.alertSubject.next(null);
    }


    getAlert() {
        return this.alertSubject.asObservable();
    }
    getToast() {
        return this.toastSubject.asObservable();
    }


    success(message: string, title?: string | null, icon?: string | null) {
        this.show(message, title, 'success', icon);
    }
    error(message: string, title?: string | null, icon?: string | null) {
        this.show(message, title, 'danger', icon);
    }
    warning(message: string, title?: string | null, icon?: string | null) {
        this.show(message, title, 'warning', icon);
    }
    info(message: string, title?: string | null, icon?: string | null) {
        this.show(message, title, 'info', icon);
    }
    private show(message: string, title?: string | null, alertType?: AlertType | null, icon?: string | null) {
        // if (!icon) {
        //     icon = BootstrapHelper.cssAlertIcon(alertType)
        // }

        this.toastSubject.next(<Toast>{ message, title, type: alertType, icon });//, id: `${this.id++}`
    }
}