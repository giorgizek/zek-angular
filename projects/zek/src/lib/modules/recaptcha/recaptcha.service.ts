import { Inject, Injectable, NgZone, Optional } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RECAPTCHA_SITE_KEY } from '../../tokens';
import { loader } from './loader';
import { ReCaptchaV2 } from './recaptcha.model';

declare var grecaptcha: ReCaptchaV2.ReCaptcha & {
    enterprise: ReCaptchaV2.ReCaptcha;
};


export interface ReCaptchaConfig {
    siteKey: string;
}


export interface OnExecuteData {
    /**
     * The name of the action that has been executed.
     */
    action: string;
    /**
     * The token that reCAPTCHA v3 provided when executing the action.
     */
    token: string;
}

export interface OnExecuteErrorData {
    /**
     * The name of the action that has been executed.
     */
    action: string;
    /**
     * The error which was encountered
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
}

type ActionBacklogEntry = [string, Subject<string>];



@Injectable()
export class ReCaptchaService {
    private readonly isBrowser = true;
    private readonly siteKey: string;
    private readonly zone: NgZone;

    private actionBacklog: ActionBacklogEntry[] | undefined;
    private grecaptcha?: ReCaptchaV2.ReCaptcha;
    private onExecuteSubject?: Subject<OnExecuteData>;
    private onExecuteErrorSubject?: Subject<OnExecuteErrorData>;
    private onExecuteObservable?: Observable<OnExecuteData>;
    private onExecuteErrorObservable?: Observable<OnExecuteErrorData>;

    constructor(
        zone: NgZone,
        @Optional() @Inject(RECAPTCHA_SITE_KEY) siteKey: string) {

        this.zone = zone;
        this.siteKey = siteKey;
        this.init();
    }

    public get onExecute(): Observable<OnExecuteData> {
        if (!this.onExecuteSubject) {
            this.onExecuteSubject = new Subject<OnExecuteData>();
            this.onExecuteObservable = this.onExecuteSubject.asObservable();
        }

        if (!this.onExecuteObservable)
            throw new Error("onExecuteObservable is undefined");

        return this.onExecuteObservable;
    }

    public get onExecuteError(): Observable<OnExecuteErrorData> {
        if (!this.onExecuteErrorSubject) {
            this.onExecuteErrorSubject = new Subject<OnExecuteErrorData>();
            this.onExecuteErrorObservable = this.onExecuteErrorSubject.asObservable();
        }

        if (!this.onExecuteErrorObservable)
            throw new Error("onExecuteErrorObservable is undefined");

        return this.onExecuteErrorObservable;
    }

    /**
     * Executes the provided `action` with reCAPTCHA v3 API.
     * Use the emitted token value for verification purposes on the backend.
     *
     * For more information about reCAPTCHA v3 actions and tokens refer to the official documentation at
     * https://developers.google.com/recaptcha/docs/v3.
     *
     * @param {string} action the action to execute
     * @returns {Observable<string>} an `Observable` that will emit the reCAPTCHA v3 string `token` value whenever ready.
     * The returned `Observable` completes immediately after emitting a value.
     */
    public execute(action: string): Observable<string> {
        const subject = new Subject<string>();
        if (this.isBrowser) {
            if (!this.grecaptcha) {
                // todo: add to array of later executions
                if (!this.actionBacklog) {
                    this.actionBacklog = [];
                }

                this.actionBacklog.push([action, subject]);
            } else {
                this.executeActionWithSubject(action, subject);
            }
        }

        return subject.asObservable();
    }

    /** @internal */
    private executeActionWithSubject(action: string, subject: Subject<string>): void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const onError = (error: any) => {
            this.zone.run(() => {
                subject.error(error);
                if (this.onExecuteErrorSubject) {
                    // We don't know any better at this point, unfortunately, so have to resort to `any`
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    this.onExecuteErrorSubject.next({ action, error });
                }
            });
        };

        this.zone.runOutsideAngular(() => {
            try {
                if (this.grecaptcha)
                    this.grecaptcha.execute(this.siteKey, { action }).then((token: string) => {
                        this.zone.run(() => {
                            subject.next(token);
                            subject.complete();
                            if (this.onExecuteSubject) {
                                this.onExecuteSubject.next({ action, token });
                            }
                        });
                    }, onError);
            } catch (e) {
                onError(e);
            }
        });
    }

    /** @internal */
    private init() {
        if (this.isBrowser) {
            if ("grecaptcha" in window) {
                this.grecaptcha = grecaptcha;
            } else {
                loader.loadScript(this.siteKey, this.onLoadComplete);
            }
        }
    }

    /** @internal */
    private onLoadComplete = (grecaptcha: ReCaptchaV2.ReCaptcha) => {
        this.grecaptcha = grecaptcha;
        if (this.actionBacklog && this.actionBacklog.length > 0) {
            this.actionBacklog.forEach(([action, subject]) => this.executeActionWithSubject(action, subject));
            this.actionBacklog = undefined;
        }
    }
}