import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WizardComponent } from './wizard/wizard.component';
import { WizardComponent2 } from './wizard2/wizard2.component';
import { ZekSafeModule } from '../safe';

@NgModule({
    imports: [
        CommonModule,
        ZekSafeModule
    ],
    declarations: [
        WizardComponent,
        WizardComponent2
    ],
    exports: [
        WizardComponent,
        WizardComponent2
    ]
})
export class WizardModule { }