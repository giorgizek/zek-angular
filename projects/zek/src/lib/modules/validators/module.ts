import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchValidator, RangeValidator } from './directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        RangeValidator,
        MatchValidator,
    ],
    exports: [
        RangeValidator,
        MatchValidator
    ]
})
export class ValidatorsModule { }