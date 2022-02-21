import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ListToolbarComponent } from './list-toolbar.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    declarations: [ListToolbarComponent],
    exports: [ListToolbarComponent]
})
export class ListToolbarModule { }