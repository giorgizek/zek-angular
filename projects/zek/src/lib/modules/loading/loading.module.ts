import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingInterceptor, LoadingInterceptorProvider } from './loading-interceptor';
import { ZekLoading } from './loading.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ZekLoading
    ],
    providers: [
        LoadingInterceptorProvider,
        LoadingInterceptor,
    ],
    exports: [
        ZekLoading
    ]
})
export class ZekLoadingModule {
}
