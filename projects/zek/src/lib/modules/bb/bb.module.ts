import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonBrowseComponent } from './bb.component';
import { ButtonBrowseModalToolbarComponent } from './bb-modal-toolbar';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
    ],
    declarations: [
        ButtonBrowseComponent,
        ButtonBrowseModalToolbarComponent
    ],
    exports: [
        ButtonBrowseComponent,
        ButtonBrowseModalToolbarComponent
    ]
})
export class ButtonBrowseModule { }