import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgePipe } from './age.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AgePipe,
    ],
    exports: [AgePipe]
})
export class AgeModule { }