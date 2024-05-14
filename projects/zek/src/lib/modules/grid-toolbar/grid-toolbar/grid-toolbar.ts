import { Component, Output, EventEmitter, Input } from '@angular/core';
import { BooleanInput } from '../../../components';
import { Convert } from '../../../utils';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    standalone: true,
    selector: 'zek-grid-toolbar',
    templateUrl: './grid-toolbar.html',
    imports: [CommonModule, TranslateModule]
})
export class ZekGridToolbar {
    // constructor(private readonly router: Router) {
    //     //private readonly viewContainerRef: ViewContainerRef,
    // }

    // getParentComponent(): any {
    //     return this.viewContainerRef['_data'].componentView.component.viewContainerRef['_view'].component
    // }

    @Input() model: any;

    private _showEdit = true;
    @Input()
    get showEdit(): boolean {
        return this._showEdit;
    }
    set showEdit(v: BooleanInput) {
        this._showEdit = Convert.toBooleanProperty(v);
    }

    private _editEnabled = true;
    @Input()
    get editEnabled(): boolean {
        return this._editEnabled;
    }
    set editEnabled(v: BooleanInput) {
        this._editEnabled = Convert.toBooleanProperty(v);
    }

    private _showDelete = true;
    @Input()
    get showDelete(): boolean {
        return this._showDelete;
    }
    set showDelete(v: BooleanInput) {
        this._showDelete = Convert.toBooleanProperty(v);
    }

    private _deleteEnabled = true;
    @Input()
    get deleteEnabled(): boolean {
        return this._deleteEnabled;
    }
    set deleteEnabled(v: BooleanInput) {
        this._deleteEnabled = Convert.toBooleanProperty(v);
    }

    private _showRestore = false;
    @Input()
    get showRestore(): boolean {
        return this._showRestore;
    }
    set showRestore(v: BooleanInput) {
        this._showRestore = Convert.toBooleanProperty(v);
    }

    private _restoreEnabled = true;
    @Input()
    get restoreEnabled(): boolean {
        return this._restoreEnabled;
    }
    set restoreEnabled(v: BooleanInput) {
        this._restoreEnabled = Convert.toBooleanProperty(v);
    }


    @Input() approveText = 'Action.Approve';
    private _showApprove = false;
    @Input()
    get showApprove(): boolean {
        return this._showApprove;
    }
    set showApprove(v: BooleanInput) {
        this._showApprove = Convert.toBooleanProperty(v);
    }

    private _approveEnabled = false;
    @Input()
    get approveEnabled(): boolean {
        return this._approveEnabled;
    }
    set approveEnabled(v: BooleanInput) {
        this._approveEnabled = Convert.toBooleanProperty(v);
    }

    @Input() disapproveText = 'Action.Disapprove';
    private _showDisapprove = false;
    @Input()
    get showDisapprove(): boolean {
        return this._showDisapprove;
    }
    set showDisapprove(v: BooleanInput) {
        this._showDisapprove = Convert.toBooleanProperty(v);
    }


    private _disapproveEnabled = false;
    @Input()
    get disapproveEnabled(): boolean {
        return this._disapproveEnabled;
    }
    set disapproveEnabled(v: BooleanInput) {
        this._disapproveEnabled = Convert.toBooleanProperty(v);
    }

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

    @Output() onDisapprove = new EventEmitter<any>();
    disapprove() {
        this.onDisapprove.emit(this.model)
    }

    @Output() onRestore = new EventEmitter<any>();
    restore() {
        this.onRestore.emit(this.model)
    }
}
