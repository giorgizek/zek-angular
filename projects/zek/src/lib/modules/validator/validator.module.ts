import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ZekFieldValidator } from './field-validator';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
    ],
    declarations: [
        ZekFieldValidator,
    ],
    exports: [ZekFieldValidator]
})
export class ValidatorModule { }