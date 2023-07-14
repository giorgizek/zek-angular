import { Component, Input } from '@angular/core';
import { BooleanInput } from '../../components';
import { Convert } from '../../utils';

@Component({
    selector: 'zek-page-title',
    templateUrl: './page-title.component.html'
})
export class PageTitleComponent {
    @Input() icon?: string;

    @Input() title?: string;


    private _isEditPage: boolean = false;
    @Input()
    get isEditPage(): boolean {
        return this._isEditPage;
    }
    set isEditPage(v: BooleanInput) {
        this._isEditPage = Convert.toBooleanProperty(v);
    }

    @Input() modelId?: number | null;

}