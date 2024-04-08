import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZekLoadingInterceptor, ZekLoadingInterceptorProvider } from './loading-interceptor';
import { ZekLoading } from './loading';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ZekLoading
    ],
    providers: [
        ZekLoadingInterceptor,
        ZekLoadingInterceptorProvider,
    ],
    exports: [
        ZekLoading,
    ]
})
export class ZekLoadingModule {
}
