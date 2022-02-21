import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pager } from '../../../models';

@Component({
    selector: 'app-pager',
    templateUrl: './pager.component.html',
    styles: [':host { display: block; }']
})
export class PagerComponent {
    @Input() pager = new Pager();
    @Input() showPageSize = true;
    @Input() pagerAlign = 'start';


    setPage(page: number) {
        // if (!this.pager) return;

        if (page === this.pager.pageNumber)
            return;
        this.onPageChange.emit(page);
    }
    setPageSize(pageSize: number) {
        // if (!this.pager) return;

        if (pageSize === this.pager.pageSize)
            return;
        this.onPageSizeChange.emit(pageSize);
    }

    @Output() onPageChange = new EventEmitter<number>();

    @Output() onPageSizeChange = new EventEmitter<number>();
}