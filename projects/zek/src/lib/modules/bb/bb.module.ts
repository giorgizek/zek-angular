import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ZekButtonBrowse } from './bb.component';
import { ZekButtonBrowseModalToolbar } from './bb-modal-toolbar';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
    ],
    declarations: [
        ZekButtonBrowse,
        ZekButtonBrowseModalToolbar
    ],
    exports: [
        ZekButtonBrowse,
        ZekButtonBrowseModalToolbar
    ]
})
export class ButtonBrowseModule { }