import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingInterceptor, LoadingInterceptorProvider } from './loading-interceptor';
import { LoadingComponent } from './loading.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        LoadingComponent
    ],
    providers: [
        LoadingInterceptorProvider,
        LoadingInterceptor,
    ],
    exports: [
        LoadingComponent
    ]
})
export class LoadingModule {
}
