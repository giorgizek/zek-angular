import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { 
    ZekModal,
    ZekDeleteModal,
    ZekApproveModal,
    ZekDisapproveModal,
    ZekRestoreModal,
    ZekSubmitModal
} from './modal/modal.component';
import { ZekFilterModal } from './filter-modal/filter-modal.component';
import { ZekSumModal } from './sum-modal/sum-modal.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule
    ],
    declarations: [
        ZekModal,
        ZekDeleteModal,
        ZekApproveModal,
        ZekSubmitModal,
        ZekDisapproveModal,
        ZekRestoreModal,
        ZekFilterModal,
        ZekSumModal
    ],
    exports: [
        ZekModal,
        ZekDeleteModal,
        ZekApproveModal,
        ZekSubmitModal,
        ZekDisapproveModal,
        ZekRestoreModal,
        ZekFilterModal,
        ZekSumModal
    ]
})
export class ZekModalModule { }