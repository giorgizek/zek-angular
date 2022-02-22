import { Component, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
    selector: 'zek-filter-modal',
    templateUrl: './filter-modal.component.html'
})
export class FilterModalComponent extends ModalComponent {
    @Output() onReset = new EventEmitter();

    reset() {
        this.onReset.emit();
    }

    protected override getModalElement(){
        return document.getElementById('filter-modal');
    }
}