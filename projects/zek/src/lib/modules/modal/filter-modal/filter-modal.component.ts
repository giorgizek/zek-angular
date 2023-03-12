﻿import { Component, Output, EventEmitter } from '@angular/core';
import { ZekModal } from '../modal/modal.component';

@Component({
    selector: 'zek-filter-modal',
    templateUrl: './filter-modal.component.html'
})
export class ZekFilterModal extends ZekModal {
    @Output() onReset = new EventEmitter();

    reset() {
        this.onReset.emit();
    }

    protected override getModalElement(){
        return document.getElementById('filter-modal');
    }
}