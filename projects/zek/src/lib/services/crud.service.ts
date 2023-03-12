import { catchError, Observable } from "rxjs";

import { HttpErrorHandler } from "./http-error-handler.service";
import { PagedList } from "../models";
import { BaseService } from "./base.service";
import { WebApiClient } from "./web.api";

export interface IService {
    getAll(filter: any): Observable<PagedList>;
    delete(id: any): Observable<any>;
    delete2(id: any, id2: any): Observable<any>;
    export(filter: any, fileTypeId: any): Observable<Blob | null>;
    sum(filter: any): Observable<any>;

    get(id: any): Observable<any>;
    get2(id: any, id2: any): Observable<any>;
    save(model: any): Observable<any>;
    restore(id: any): Observable<any>;
    approve(model: any): Observable<any>;
    disapprove(model: any): Observable<any>;

}
export class CrudService extends BaseService implements IService {
    constructor(
        controller: string,
        api: WebApiClient,
        httpErrorHandler: HttpErrorHandler) {
        super(controller, api, httpErrorHandler);
    }

    get(id: number) {
        return this.api.get(`api/${this.controller}/${id}`).pipe(catchError(this.handleError('get', null)));
    }
    get2(id: number, id2: number) {
        return this.api.get(`api/${this.controller}/${id}/${id2}`).pipe(catchError(this.handleError('get2', null)));
    }

    getAll(filter?: any): Observable<PagedList> {
        return this.api.get(`api/${this.controller}`, filter).pipe(catchError(this.handleError('getAll')));
    }
    sum(filter?: any) {
        return this.api.get(`api/${this.controller}/Sum`, filter).pipe(catchError(this.handleError('sum')));
    }

    save(model: any) {
        return !model.id
            ? this.api.post<any>(`api/${this.controller}`, model).pipe(catchError(this.handleError('save', null)))
            : this.api.put<any>(`api/${this.controller}/${model.id}`, model).pipe(catchError(this.handleError('save', null)));
    }

    delete(id: any) {
        return this.api.delete(`api/${this.controller}/${id}`).pipe(catchError(this.handleError('delete', null)));
    }
    delete2(id: any, id2: any) {
        return this.api.delete(`api/${this.controller}/${id}/${id2}`).pipe(catchError(this.handleError('delete2', null)));
    }

    restore(id: any) {
        return this.api.post(`api/${this.controller}/Restore/${id}`).pipe(catchError(this.handleError('restore', null)));
    }

    approve(model: any) {
        return this.api.post(`api/${this.controller}/Approve`, model).pipe(catchError(this.handleError('approve', null)));
    }
    disapprove(model: any) {
        return this.api.post(`api/${this.controller}/Disapprove`, model).pipe(catchError(this.handleError('disapprove', null)));
    }


    export(model: any, fileTypeId: any): Observable<Blob | null> {
        return this.api.getBlob(`api/${this.controller}/Export/${fileTypeId}`, model).pipe(catchError(this.handleError('export', null)));
    }
}