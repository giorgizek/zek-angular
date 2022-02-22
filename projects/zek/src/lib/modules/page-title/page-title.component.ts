import { Component, Input } from '@angular/core';

@Component({
    selector: 'zek-page-title',
    templateUrl: './page-title.component.html'
})
export class PageTitleComponent {
    @Input() icon?: string;

    @Input() title?: string;

    @Input() isEditPage?: boolean;

    @Input() modelId?: number | null;

}