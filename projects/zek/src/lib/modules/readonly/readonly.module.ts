import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadOnlyDirective } from './readonly.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ReadOnlyDirective,
    ],
    exports: [ReadOnlyDirective]
})
export class ReadOnlyModule { }