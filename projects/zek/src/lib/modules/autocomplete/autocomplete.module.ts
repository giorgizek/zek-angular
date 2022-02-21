import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoCompleteDirective } from './autocomplete.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AutoCompleteDirective,
    ],
    exports: [AutoCompleteDirective]
})
export class AutoCompleteModule { }