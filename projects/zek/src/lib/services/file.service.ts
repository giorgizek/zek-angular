import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { CrudService } from './crud.service';
import { WebApiClient } from './web.api';
import { HttpErrorHandler } from './http-error-handler.service';

@Injectable()
export class FileService extends CrudService {
    constructor(api: WebApiClient, httpErrorHandler: HttpErrorHandler) {
        super('files', api, httpErrorHandler);
    }

    download(id: any, hash: any) {
        return this.api.getBlob(`api/${this.controller}`, { id, hash }).pipe(catchError(this.handleError(this.download.name, null)));
    }

    presignedUrl(id: any, hash: any) {
        return this.api.get(`api/${this.controller}/${id}/${hash}/presigned-url`).pipe(catchError(this.handleError(this.presignedUrl.name, null)));
    }
}