import { Injectable, ExistingProvider } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { finalize } from 'rxjs/operators';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    private pendingRequests = 0;
    private pendingRequestsStatus = new ReplaySubject<boolean>(1);
    filteredUrlPatterns: RegExp[] = [];
    filteredMethods: string[] = [];
    filteredHeaders: string[] = [];
    forceByPass: boolean = false;

    private shouldBypassUrl(url: string): boolean {
        return this.filteredUrlPatterns.some(e => {
            return e.test(url);
        });
    }

    private shouldBypassMethod(req: HttpRequest<any>): boolean {
        return this.filteredMethods.some(e => {
            return e.toUpperCase() === req.method.toUpperCase();
        });
    }

    private shouldBypassHeader(req: HttpRequest<any>): boolean {
        return this.filteredHeaders.some(e => {
            return req.headers.has(e);
        });
    }

    private shouldBypass(req: HttpRequest<any>): boolean {
        return this.forceByPass
            || this.shouldBypassUrl(req.urlWithParams)
            || this.shouldBypassMethod(req)
            || this.shouldBypassHeader(req);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const shouldBypass = this.shouldBypass(request);

        if (!shouldBypass) {
            this.pendingRequests++;

            if (1 === this.pendingRequests) {
                this.pendingRequestsStatus.next(true);
            }
        }

        return next.handle(request).pipe(
            // map(event => {
            //     return event;
            // }),
            // catchError(error => {
            //     return throwError(error);
            // }),
            finalize(() => {
                if (!shouldBypass) {
                    this.pendingRequests--;

                    if (0 === this.pendingRequests) {
                        this.pendingRequestsStatus.next(false);
                    }
                }
            })
        );
    }

    getStatus() {
        return this.pendingRequestsStatus.asObservable();
    }
}

// export const LoadingInterceptorProvider = {
//     provide: HTTP_INTERCEPTORS,
//     useClass: LoadingInterceptor,
//     multi: true,
// };

export const LoadingInterceptorProvider: ExistingProvider[] = [{
    provide: HTTP_INTERCEPTORS,
    useExisting: LoadingInterceptor,
    multi: true
}];