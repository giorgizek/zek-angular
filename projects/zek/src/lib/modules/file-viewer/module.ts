import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZekFileViewer } from './file-viewer';
import { ZekModalModule } from '../modal';
import { ZekSafeModule } from '../safe';


@NgModule({
    imports: [
        CommonModule,
        ZekModalModule,
        ZekSafeModule
    ],
    declarations: [
        ZekFileViewer
    ],
    exports: [ZekFileViewer]
})
export class FileViewerModule { }