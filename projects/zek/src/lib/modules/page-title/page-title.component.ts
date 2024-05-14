import { Component, Input } from '@angular/core';
import { BooleanInput } from '../../components';
import { Convert } from '../../utils';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    standalone: true,
    selector: 'zek-page-title',
    templateUrl: './page-title.component.html',
    imports: [CommonModule, TranslateModule]
})
export class ZekPageTitle {
    @Input() icon?: string;

    @Input() title?: string;


    private _isEditPage = false;
    @Input()
    get isEditPage(): boolean {
        return this._isEditPage;
    }
    set isEditPage(v: BooleanInput) {
        this._isEditPage = Convert.toBooleanProperty(v);
    }

    @Input() modelId?: number | null;

}