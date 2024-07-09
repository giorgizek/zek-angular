import { Component, ViewChild } from '@angular/core';

import { ZekModal, ZekModalModule } from '../modal';
import { CoreComponent } from '../../components';
import { FileHelper } from '../../utils';
import { CommonModule } from '@angular/common';
import { ZekSafePipe } from '../safe';

@Component({
    standalone: true,
    selector: 'zek-file-viewer',
    templateUrl: './file-viewer.html',
    imports: [CommonModule, ZekModalModule, ZekSafePipe],
    providers: []
})
export class ZekFileViewer<TModal extends ZekModal = ZekModal> extends CoreComponent {

    @ViewChild('viewModal', { static: true }) viewModal?: TModal | null;

    src?: string | null;

    show(url: string, extension?: string | null) {

        const ext = extension || FileHelper.getExtension(url);
        switch (ext) {
            case '.docx':
            case '.doc':
                this.src = 'https://docs.google.com/a/umd.edu/viewer?url=' + url + '&embedded=true';
                break;

            case '.xlsx':
            case '.xls':

                this.src = 'http://view.officeapps.live.com/op/view.aspx?src=' + url;
                break;

            // case '.jpg':
            // case '.jpeg':
            // case '.png':
            // case '.pdf':
            default:
                this.src = url;
                break;
        }


        // <!-- <iframe id="office" width="100%" height="99%" frameborder="0" marginheight="0" marginwidth="0" allowfullscreen="allowfullscreen"
        // src="https://docs.google.com/spreadsheets/u/0/d/1Yv92dG0AOki6prNq5RwRSWTpdcidzFkakW9nMf0RaUQ/preview/sheet?gid=0"></iframe> -->

        // <!-- <iframe id="office" width="100%" height="99%" frameborder="0" allowfullscreen="allowfullscreen" 
        // src="https://docs.google.com/a/umd.edu/viewer?url=https://github.com/poychang/blog.poychang.net/raw/master/assets/post-files/THIS-IS-WORD.docx&amp;embedded=true">
        // </iframe> -->
        // <!-- <iframe id="office" width="100%" height="99%" frameborder="0" allowfullscreen="allowfullscreen" 
        // src=" https://view.officeapps.live.com/op/embed.aspx?src=https://github.com/poychang/blog.poychang.net/raw/master/assets/post-files/THIS-IS-WORD.docx">
        // </iframe> -->


        // this.src = 'http://view.officeapps.live.com/op/view.aspx?src=https://sample-videos.com/xls/Sample-Spreadsheet-50000-rows.xls';

        if (this.viewModal) {
            this.viewModal.show();
        }
    }
}
