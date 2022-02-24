import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { WebApiClient } from './web.api';
import { BaseService } from './base.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { HtmlHelper } from '../utils';
import { SITE_KEY } from '../tokens';

declare let grecaptcha: any;
//var reCaptchaEvent: CustomEvent;

export interface ReCaptchaConfig {
    siteKey: string;
}

@Injectable()
export class ReCaptchaService extends BaseService {

    constructor(
        api: WebApiClient,
        httpErrorHandler: HttpErrorHandler,
        @Inject(SITE_KEY) siteKey: string) {
        super('recaptcha', api, httpErrorHandler);

        if (!ReCaptchaService.siteKey && siteKey) {
            ReCaptchaService.siteKey = siteKey;
        }
    }

    // static elementId = 'recaptcha';
    // static eventName = 'gettoken';
    // static attributeName = 'listener';

    private static siteKey?: string | null;
    // private recaptchaElement: HTMLElement | null = null;
    // private removeRecaptchaElement = false;

    private static loaded = false;
    async load() {
        await this.loadScript();
        // this.addEventListener();
    }

    private async loadScript() {
        if (!ReCaptchaService.siteKey) {
            ReCaptchaService.siteKey = await this.getSiteKey().toPromise();
        }
        // if google recaptcha script already loaded we don't need load many times
        if (!ReCaptchaService.loaded) {
            ReCaptchaService.loaded = true;

            if (!ReCaptchaService.siteKey) {
                throw new Error('No siteKey for Google reCAPTCHA.');
            }

            HtmlHelper.loadScript('https://www.google.com/recaptcha/api.js?render=' + ReCaptchaService.siteKey);
        }
    }
    // private addEventListener() {
    //     let el = document.getElementById(ReCaptchaService.elementId);
    //     if (!el) {
    //         el = addInput('hidden', ReCaptchaService.elementId);
    //         this.removeRecaptchaElement = true;
    //     }
    //     this.recaptchaElement = el;

    //     if (el.getAttribute(ReCaptchaService.attributeName) !== 'true') {
    //         let event = new CustomEvent(ReCaptchaService.eventName, {
    //             bubbles: true,
    //             cancelable: false,
    //             detail: {
    //                 subject: this.subject
    //             }
    //         });
    //         reCaptchaEvent = event;
    //         el.addEventListener(ReCaptchaService.eventName, this.complete);
    //         el.setAttribute(ReCaptchaService.attributeName, 'true');
    //     }
    // }
    // destroy() {
    //     if (this.recaptchaElement) {
    //         this.recaptchaElement.removeEventListener(ReCaptchaService.eventName, this.complete);
    //         this.recaptchaElement.removeAttribute(ReCaptchaService.attributeName);

    //         if (this.removeRecaptchaElement) {
    //             this.recaptchaElement.remove();
    //             this.removeRecaptchaElement = false;
    //         }
    //     }
    // }


    getSiteKey(): Observable<string | null> {
        return this.api.getString(`api/${this.controller}/GetSiteKey`).pipe(catchError(this.handleError('getSiteKey', null)));
    }

    private subject = new Subject<string>();

    getToken(): Observable<string> {
        return this.subject.asObservable();
    }

    // private complete(e: any) {
    //     let token = e.target.value;
    //     let subject = e.detail.subject as Subject<string>;

    //     subject.next(token);
    // }

    public execute(action: string) {
        grecaptcha.ready(() => {

            grecaptcha.execute(ReCaptchaService.siteKey, { action: action }).then((token: string) => {
                if (token) {
                    this.subject.next(token);
                    // let el = <HTMLInputElement>document.getElementById(ReCaptchaService.elementId);//
                    // if (el) {
                    //     el.value = token;
                    //     el.dispatchEvent(reCaptchaEvent);//execute event
                    // }
                }
            });
        });

        // grecaptcha.ready(function () {
        //     grecaptcha.execute(ReCaptchaService.siteKey, { action: action }).then(function (token: string) {

        //         if (token) {
        //             let el = <HTMLInputElement>document.getElementById(ReCaptchaService.elementId);//
        //             if (el) {
        //                 el.value = token;
        //                 el.dispatchEvent(reCaptchaEvent);//execute event
        //             }

        //         }
        //     });
        // });
    }
}