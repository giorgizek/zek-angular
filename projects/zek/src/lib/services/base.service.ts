import { WebApiClient } from "./web.api";
import { HttpErrorHandler, HandleError } from "./http-error-handler.service";

export class BaseService {
    protected readonly handleError: HandleError;
    constructor(
        protected readonly controller: string,
        protected readonly api: WebApiClient,
        httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError(this.constructor.name);
    }
}