import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZekFileViewer } from './file-viewer';
import { ZekModalModule } from '../modal';
import { SafeModule } from '../safe';


@NgModule({
    imports: [
        CommonModule,
        ZekModalModule,
        SafeModule
    ],
    declarations: [
        ZekFileViewer
    ],
    exports: [ZekFileViewer]
})
export class FileViewerModule { }