import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeValidator } from './directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        RangeValidator,
    ],
    exports: [RangeValidator]
})
export class ValidatorsModule { }