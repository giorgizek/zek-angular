import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FieldValidatorComponent } from './field-validator.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
    ],
    declarations: [
        FieldValidatorComponent,
    ],
    exports: [FieldValidatorComponent]
})
export class ValidatorModule { }