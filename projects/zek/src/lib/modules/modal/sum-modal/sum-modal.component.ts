import { Component, Input, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
    selector: 'app-sum-modal',
    templateUrl: './sum-modal.component.html'
})
export class SumComponent {

    @Input() model: any;

    @ViewChild('sumModal', { static: false }) private modal?: ModalComponent;


    sum() {
        if (this.modal) {
            this.modal.show();
        }
        else {
            throw new Error('sumModal is null or undefined');
        }
    }
}