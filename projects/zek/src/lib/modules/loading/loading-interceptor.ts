import { ExistingProvider, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { RandomHelper } from 'zek';


@Injectable({providedIn:'root'})
export class ZekLoadingService {
    private _pendingRequests = 0;
    private _loadingSubject$?: BehaviorSubject<boolean>
    private _onLoadingObservable?: Observable<boolean>;

    start() {
        this._pendingRequests++;
        this._loadingSubject$?.next(true);
    }
    end() {
        this._pendingRequests--;
        if (this._pendingRequests < 0)
            this._pendingRequests = 0;

        if (0 === this._pendingRequests) {
            this._loadingSubject$?.next(false);
        }
    }

    get onLoading() {
        if (!this._loadingSubject$) {
            this._loadingSubject$ = new BehaviorSubject<boolean>(false);
            this._onLoadingObservable = this._loadingSubject$.asObservable();
        }

        if (!this._onLoadingObservable)
            throw new Error("_onExecuteObservable is undefined");

        return this._onLoadingObservable;
    }
}

@Injectable()
export class ZekLoadingInterceptor implements HttpInterceptor {
    constructor(private readonly _loading: ZekLoadingService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._loading.start();

        return next.handle(request).pipe(
            finalize(() => {
                this._loading.end();
            })
        );
    }
}

export const ZekLoadingInterceptorProvider = [{
    provide: HTTP_INTERCEPTORS,
    useClass: ZekLoadingInterceptor,
    multi: true
}];