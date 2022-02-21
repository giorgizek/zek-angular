import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { EditToolbarComponent } from './edit-toolbar.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    declarations: [
        EditToolbarComponent,
    ],
    exports: [EditToolbarComponent]
})
export class EditToolbarModule { }