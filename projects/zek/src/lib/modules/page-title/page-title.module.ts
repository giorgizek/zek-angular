import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { PageTitleComponent } from './page-title.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    declarations: [
        PageTitleComponent,
    ],
    exports: [PageTitleComponent]
})
export class PageTitleModule { }