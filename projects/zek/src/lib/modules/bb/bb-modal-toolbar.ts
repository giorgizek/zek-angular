import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BooleanInput } from '../../components';
import { Convert } from '../../utils';

@Component({
    selector: 'zek-bb-modal-toolbar',
    templateUrl: './bb-modal-toolbar.html',
})
export class ZekButtonBrowseModalToolbar {

    @Output() onSearch = new EventEmitter();
    search() {
        this.onSearch.emit();
    }

    @Output() onReset = new EventEmitter();
    reset() {
        this.onReset.emit();
    }

    private _multiSelect = false;
    @Input()  get multiSelect() {
        return this._multiSelect;
    }
    set multiSelect(v: BooleanInput) {
        this._multiSelect = Convert.toBooleanProperty(v);
    }

    @Output() onChooseAll = new EventEmitter();
    chooseAll() {
        if (!this.multiSelect) return;
        this.onChooseAll.emit();
    }

    // @Output()
    // onCreate = new EventEmitter();
    // create() {
    //     this.onCreate.emit();
    // }
}