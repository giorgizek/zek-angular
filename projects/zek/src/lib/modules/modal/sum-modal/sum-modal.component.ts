import { Component, Input, ViewChild } from '@angular/core';
import { ZekModal } from '../modal/modal.component';

@Component({
    selector: 'zek-sum-modal',
    templateUrl: './sum-modal.component.html'
})
export class ZekSumModal {

    @Input() model: any;

    @ViewChild('sumModal', { static: false }) private modal?: ZekModal;


    sum() {
        if (this.modal) {
            this.modal.show();
        }
        else {
            throw new Error('sumModal is null or undefined');
        }
    }
}