import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SortDirective } from './sort.directive';
import { SortButtonGroupComponent } from './sort-button-group/sort-button-group.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    declarations: [
        SortDirective,
        SortButtonGroupComponent
    ],
    exports: [
        SortDirective,
        SortButtonGroupComponent
    ]
})
export class SortModule { }