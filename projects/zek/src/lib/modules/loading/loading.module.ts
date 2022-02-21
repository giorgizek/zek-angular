import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingInterceptorProvider } from './loading-interceptor';
import { LoadingComponent } from './loading.component';

@NgModule({
     imports: [
         CommonModule,
     ],
    declarations: [
        LoadingComponent
    ],
    providers: [
        LoadingInterceptorProvider
    ],
    exports: [
        LoadingComponent
    ]
})
export class LoadingModule { }