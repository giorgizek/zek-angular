import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { GridToolbarComponent } from './grid-toolbar/grid-toolbar.component';
import { GridToolbarBarComponent } from './grid-toolbar-bar/grid-toolbar-bar.component';


@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    declarations: [
        GridToolbarComponent,
        GridToolbarBarComponent
    ],
    exports: [
        GridToolbarComponent,
        GridToolbarBarComponent
    ]
})
export class GridToolbarModule { }