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
    batch(model: any): Observable<any>;
}
export class CrudService extends BaseService implements IService {
    constructor(
        controller: string,
        api: WebApiClient,
        httpErrorHandler: HttpErrorHandler) {
        super(controller, api, httpErrorHandler);
    }

    get(id: number) {
        return this.api.get(`api/${this.controller}/${id}`).pipe(catchError(this.handleError(this.get.name, null)));
    }
    get2(id: number, id2: number) {
        return this.api.get(`api/${this.controller}/${id}/${id2}`).pipe(catchError(this.handleError(this.get2.name, null)));
    }

    getAll(filter?: any): Observable<PagedList> {
        return this.api.get(`api/${this.controller}`, filter).pipe(catchError(this.handleError(this.getAll.name)));
    }
    sum(filter?: any) {
        return this.api.get(`api/${this.controller}/Sum`, filter).pipe(catchError(this.handleError(this.sum.name)));
    }

    save(model: any) {
        return !model.id
            ? this.api.post<any>(`api/${this.controller}`, model).pipe(catchError(this.handleError(this.save.name, null)))
            : this.api.put<any>(`api/${this.controller}/${model.id}`, model).pipe(catchError(this.handleError(this.save.name, null)));
    }

    delete(id: any) {
        return this.api.delete(`api/${this.controller}/${id}`).pipe(catchError(this.handleError(this.delete.name, null)));
    }
    delete2(id: any, id2: any) {
        return this.api.delete(`api/${this.controller}/${id}/${id2}`).pipe(catchError(this.handleError(this.delete2.name, null)));
    }

    restore(id: any) {
        return this.api.patch(`api/${this.controller}/${id}/Restore`).pipe(catchError(this.handleError(this.restore.name, null)));
    }

    approve(model: any) {
        return this.api.patch(`api/${this.controller}/Approve`, model).pipe(catchError(this.handleError(this.approve.name, null)));
    }
    disapprove(model: any) {
        return this.api.patch(`api/${this.controller}/Disapprove`, model).pipe(catchError(this.handleError(this.disapprove.name, null)));
    }

    batch(model: any) {
        return this.api.post(`api/${this.controller}/Batch`, model).pipe(catchError(this.handleError(this.batch.name, null)));
    }


    export(model: any, fileTypeId: any): Observable<Blob | null> {
        return this.api.getBlob(`api/${this.controller}/Export/${fileTypeId}`, model).pipe(catchError(this.handleError('export', null)));
    }
}