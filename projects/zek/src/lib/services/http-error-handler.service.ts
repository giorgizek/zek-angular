import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from './alert.service';
import { AlertType } from '../models';
import { ObjectHelper } from '../utils/object-helper';

/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError = <T = any>(operation?: string, result?: T, show?: boolean) => (error: HttpErrorResponse) => Observable<T>;
export type HandleErrorResult = <T = any>(operation?: string, result?: T, show?: boolean) => (error: HttpErrorResponse) => Observable<T>;

/** Handles HttpClient errors */
@Injectable()
export class HttpErrorHandler {
    constructor(
        private readonly alert: AlertService,
        private readonly translate: TranslateService,
        private readonly router: Router) { }

    /** Create curried handleError function that already knows the service name */
    createHandleError = (serviceName = '') => <T>(operation = 'operation', result = {} as T, show = true) => this.handleError(serviceName, operation, result, show);
    createHandleErrorResult = (serviceName = '') => <T>(operation = 'operation', result = {} as T, show = true) => this.handleErrorResult(serviceName, operation, result, show);

    /**
     * Returns a function that handles Http operation failures.
     * This error handler lets the app continue to run as if no error occurred.
     * @param serviceName = name of the data service that attempted the operation
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     * @param show - optional value to show error
     */
    handleError<T>(serviceName = '', operation = 'operation', result = {} as T, show?: boolean) {
        return (response: HttpErrorResponse): Observable<T> => {
            console.error(response);

            if (show) {
                this.showError(serviceName, operation, response)
            }

            return of(result);
        };
    }



    /**
     * Returns a function that handles Http operation failures.
     * This error handler lets the app continue to run as if no error occurred.
     * @param serviceName = name of the data service that attempted the operation
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     * @param show - optional value to show error
     */
    handleErrorResult<T>(serviceName = '', operation = 'operation', result = {} as T, show?: boolean) {
        return (response: HttpErrorResponse): Observable<any> => {
            console.error(response);

            if (show) {
                this.showError(serviceName, operation, response)
            }


            let error: any;           
            if (typeof response.error === 'string' && response.error[0] === '{') {
                error = JSON.parse(response.error);
            } else {
                error = response.error;
            }

            if (error instanceof ErrorEvent) {
                error = response.error.message;
            }

            return ObjectHelper.isDefined(error) ? of(error) : of(result);
        };
    }


    private showError(serviceName: string, operation: string, response: HttpErrorResponse) {
        switch (response.status) {
            case 0://No Connection
                this.alert.error(`Can't connect to api server.`);
                break;

            case 400://Bad Request
                let error: any;
                if (typeof response.error === 'string' && response.error[0] === '{') {
                    error = JSON.parse(response.error);
                } else {
                    error = response.error;
                }

                if (error instanceof ErrorEvent) {
                    this.alert.error(`${serviceName}: ${operation} failed: ${response.error.message}`);
                } if (typeof error === 'string') {
                    this.alert.error(response.error as string);
                } else if (typeof error === 'object') {
                    const errors = error.traceId || error.success === false
                        ? error.errors
                        : error;

                    const errorMessages: string[] = [];
                    const properties = Object.getOwnPropertyNames(errors);

                    for (let property of properties) {
                        const messages = errors[property];
                        if (messages instanceof Array) {
                            for (let message of messages) {
                                const messageKey = `Validation.${message}`;
                                let translatedMessage = this.translate.instant(messageKey);
                                // if translation not found then use message
                                if (messageKey == translatedMessage) {
                                    translatedMessage = message;
                                }

                                if (property) {
                                    const propertyKey = `Fields.${property}`;
                                    let translatedProperty = this.translate.instant(`Fields.${property}`);
                                    // if translation not found then use property
                                    if (propertyKey == translatedProperty) {
                                        translatedProperty = property
                                    }
                                    errorMessages.push(translatedProperty + ' - ' + translatedMessage);
                                }
                                else {
                                    errorMessages.push(translatedMessage);
                                }
                            }
                        }
                    }
                    this.alert.addRange('danger', errorMessages);
                }
                break;

            case 401://Unauthorized
                this.alert.error('Unauthorized');
                this.router.navigate(['/login']);
                break;

            case 403://Forbidden
                this.alert.error('Forbidden');
                break;

            case 404://Not Found
                this.alert.error('Not Found');
                break;

            case 402://Payment Required
                this.alert.error('License Payment Required');
                break;

            case 500://Internal Server Error
                this.alert.error('Internal Server Error');
                break;

            default:
                break;
        }
    }

}