import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { 
    ModalComponent,
    DeleteModalComponent,
    ApproveModalComponent,
    DisapproveModalComponent,
    RestoreModalComponent,
    SubmitModalComponent
} from './modal/modal.component';
import { FilterModalComponent } from './filter-modal/filter-modal.component';
import { SumComponent } from './sum-modal/sum-modal.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule
    ],
    declarations: [
        ModalComponent,
        DeleteModalComponent,
        ApproveModalComponent,
        SubmitModalComponent,
        DisapproveModalComponent,
        RestoreModalComponent,

        FilterModalComponent,
        SumComponent
    ],
    exports: [
        ModalComponent,
        DeleteModalComponent,
        ApproveModalComponent,
        SubmitModalComponent,
        DisapproveModalComponent,
        RestoreModalComponent,
        FilterModalComponent,
        SumComponent
    ]
})
export class ModalModule { }