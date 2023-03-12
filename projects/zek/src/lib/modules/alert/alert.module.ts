import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZekAlert } from './alert/alert';
import { ZekToast } from './toast/toast';
import { ZekValidation } from './validation/validation';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ZekAlert,
        ZekValidation,
        ZekToast,
    ],
    providers: [
    ],
    exports: [
        ZekAlert,
        ZekValidation,
        ZekToast,
    ]
})
export class AlertModule { }