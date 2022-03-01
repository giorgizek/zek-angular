import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'zek-grid-toolbar',
    templateUrl: './grid-toolbar.component.html'
})
export class GridToolbarComponent {
    // constructor(private readonly router: Router) {
    //     //private readonly viewContainerRef: ViewContainerRef,
    // }

    // getParentComponent(): any {
    //     return this.viewContainerRef['_data'].componentView.component.viewContainerRef['_view'].component
    // }

    @Input() model: any;

    @Input() showEdit = true;
    @Input() editEnabled = true;

    @Input() showDelete = true;
    @Input() deleteEnabled = true;

    @Input() showRestore = false;
    @Input() restoreEnabled = true;

    @Input() approveText = 'Action.Approve';
    @Input() showApprove = false;
    @Input() approveEnabled = false;

    @Output() onEdit = new EventEmitter<any>();
    edit() {
        //this.router.navigate([this.router.url, this.model]);
        this.onEdit.emit(this.model);
    }

    @Output() onDelete = new EventEmitter<any>();
    delete() {
        this.onDelete.emit(this.model)
    }

    @Output() onApprove = new EventEmitter<any>();
    approve() {
        this.onApprove.emit(this.model)
    }


    @Output() onRestore = new EventEmitter<any>();
    restore() {
        this.onRestore.emit(this.model)
    }
}
