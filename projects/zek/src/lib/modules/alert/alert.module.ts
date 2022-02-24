import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { ToastComponent } from './toast/toast.component';
import { ValidationComponent } from './validation/validation.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AlertComponent,
        ValidationComponent,
        ToastComponent,
    ],
    providers: [
    ],
    exports: [
        AlertComponent,
        ValidationComponent,
        ToastComponent,
    ]
})
export class AlertModule { }