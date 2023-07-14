import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZekSafePipe } from './safe.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [ZekSafePipe],
    exports: [ZekSafePipe]
})
export class ZekSafeModule { }