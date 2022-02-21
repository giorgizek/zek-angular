import { Injector } from '@angular/core';

export class AppBaseModule {
    static injector: Injector;

    constructor(injector: Injector) {
        AppBaseModule.injector = injector;
    }
}