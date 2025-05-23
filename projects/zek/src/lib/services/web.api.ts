import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams/*, HttpErrorResponse*/ } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { of } from 'rxjs/observable/of';
//import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';
//import { deleteNullProperties } from '../utils';
//import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { HttpParameterCodec } from '@angular/common/http';
import { API_BASE_URL } from '../tokens';
import { UrlHelper } from '../utils';

export interface WebApiConfig {
    baseUrl: string;
}

@Injectable()
export class WebApiClient {
    constructor(
        protected readonly http: HttpClient,
        protected readonly auth: AuthService,
        @Inject(API_BASE_URL) private readonly baseUrl: string) {
    }

    get<T = any>(url: string, params?: any): Observable<T> {
        const combinedUrl = UrlHelper.combine(this.baseUrl, url);
        return this.http.get<T>(combinedUrl, { headers: this.getHeaders(), params: this.toHttpParams(params) });
        /*.catch(catchError(this.handleError(url)))
        .do((res: Response) => {
            // Handle success, maybe display notification
        }, (error: any) => {
            // Handle errors
        })
        .finally(() => {
            // Request completed
        });
    */
    }

    getString(url: string, params?: object): Observable<string | null> {
        const combinedUrl = UrlHelper.combine(this.baseUrl, url);
        return this.http.get(combinedUrl, { headers: this.getHeaders(), responseType: 'text', params: this.toHttpParams(params) });
    }
    getBytes(url: string, params?: any): Observable<ArrayBuffer> {
        const combinedUrl = UrlHelper.combine(this.baseUrl, url);
        return this.http.get(combinedUrl, { headers: this.getHeaders(), responseType: 'arraybuffer', params: this.toHttpParams(params) });
    }
    getBlob(url: string, params?: any): Observable<Blob> {
        const combinedUrl = UrlHelper.combine(this.baseUrl, url);
        return this.http.get(combinedUrl, { headers: this.getHeaders(), responseType: 'blob', params: this.toHttpParams(params) });
    }
    postBlob(url: string, body: any): Observable<Blob> {
        const combinedUrl = UrlHelper.combine(this.baseUrl, url);
        return this.http.post(combinedUrl, body, { headers: this.getHeaders(), responseType: 'blob' });
    }


    protected toHttpParams(obj: any) {
        if (!obj)
            return undefined;

        let params = new HttpParams({ encoder: new CustomHttpParamEncoder() });
        for (const key of Object.keys(obj)) {
            const field = obj[key];

            if (field === undefined || field === null || (typeof field === 'string' && field.length === 0))
                continue;

            const value = field;
            // if (typeof field === 'string' && field.length > 0) {
            //     value = field.replace(/\+/gi, '%2B');
            // }

            params = params.append(key, value);
            // if (field instanceof Array) {
            //     field.forEach((item: any) => {
            //         params = params.append(`${key}[]`, item);
            //     });
            // } else {
            //     params = params.append(key, field);
            // }
        }
        return params;


        //deleteNullProperties(obj);
        //comment because int[] not sending in c# it send "1,2,3,4"
        // return obj
        //     ? Object.getOwnPropertyNames(obj).reduce((p, key) => p.set(key, obj[key]), new HttpParams())
        //     : undefined;
    }

    //toKeyPairs(obj: any): KeyPair[] | undefined {
    //    if (obj instanceof Object) {
    //        const properties = Object.getOwnPropertyNames(obj);
    //        const result = new Array<KeyPair>();
    //        for (let property of properties) {
    //            const value = obj[property];
    //            result.push({ key: property, value: value });
    //        }
    //        return result;
    //    }
    //    return undefined;
    //}

    post<T = any>(url: string, body?: any | null): Observable<T> {
        return this.http.post<T>(UrlHelper.combine(this.baseUrl, url), body, { headers: this.getHeaders(body) });
        //.pipe(
        //catchError(this.handleError(url))
        //);
    }
    put<T = any>(url: string, body?: any | null): Observable<T> {
        return this.http.put<T>(UrlHelper.combine(this.baseUrl, url), body, { headers: this.getHeaders(body) });
        //.pipe(
        //catchError(this.handleError(url))
        //);
    }
    delete<T = any>(url: string, body?: any | null): Observable<T> {
        return this.http.request<T>('delete', UrlHelper.combine(this.baseUrl, url), { body, headers: this.getHeaders(body) });
        //return this.http.delete(environment.url + url, { headers: this.getHeaders() });
        //.pipe(
        //catchError(this.handleError(url))
        //);
    }
    patch<T = any>(url: string, body?: any | null): Observable<T> {
        return this.http.patch<T>(UrlHelper.combine(this.baseUrl, url), body, { headers: this.getHeaders(body) });
    }


    protected getHeaders(body?: any | null): HttpHeaders {
        let httpHeaders = new HttpHeaders();
        if (!(body instanceof FormData))
            httpHeaders = httpHeaders.set('Content-Type', 'application/json');
        const tmp = this.auth.user;
        const token = tmp ? tmp.token : undefined;
        if (token)
            httpHeaders = httpHeaders.set('Authorization', token);
        return httpHeaders;
    }



    //private getParams(params?: KeyPair[] | null) {
    //    if (!params || params.length === 0) {
    //        return undefined;
    //    }
    //    let httpParams = new HttpParams();
    //    if (params) {
    //        for (let param of params) {
    //            httpParams = httpParams.set(param.key, param.value);
    //        }
    //    }
    //    return httpParams;
    //}
}



export class CustomHttpParamEncoder implements HttpParameterCodec {
    encodeKey(key: string): string {
        return encodeURIComponent(key);
    }
    encodeValue(value: string): string {
        return encodeURIComponent(value);
    }
    decodeKey(key: string): string {
        return decodeURIComponent(key);
    }
    decodeValue(value: string): string {
        return decodeURIComponent(value);
    }
}