import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZekSort } from './sort';
import { ZekSortButtonGroup } from './sort-button-group/sort-button-group';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    declarations: [
        ZekSort,
        ZekSortButtonGroup
    ],
    exports: [
        ZekSort,
        ZekSortButtonGroup
    ]
})
export class ZekSortModule { }