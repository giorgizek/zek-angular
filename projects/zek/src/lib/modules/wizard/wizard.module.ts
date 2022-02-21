import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafeStyleModule } from '../safe-style';
import { WizardComponent } from './wizard/wizard.component';
import { WizardComponent2 } from './wizard2/wizard2.component';

@NgModule({
    imports: [
        CommonModule,
        SafeStyleModule
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