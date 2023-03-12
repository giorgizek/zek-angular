import { Directive, EventEmitter, Input, Output } from "@angular/core";
import { BooleanInput, CoreComponent } from "../../components";
import { PagedList } from "../../models";
import { Convert } from "../../utils";

@Directive()
export class ButtonBrowseModalBaseComponent extends CoreComponent {
    @Input() type?: string | null;
    @Input() filter: any = {};
    @Input() data?: PagedList | null;

    private _multiSelect = false;
    @Input()  get multiSelect() {
        return this._multiSelect;
    }
    set multiSelect(v: BooleanInput) {
        this._multiSelect = Convert.toBooleanProperty(v);
    }

    @Input() value: any;

    @Output() onChoose = new EventEmitter();
    choose(value: any) {
        this.onChoose.emit(value);
    }

    @Output() onChooseAll = new EventEmitter();
    chooseAll() {
        this.onChooseAll.emit(this.filter);
    }

    onKeydown(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        this.search();
    }

    bindData() { }
    async refresh() {
        try {
            this.loading = true;
            await this.bindData();
        }
        finally {
            this.loading = false;
        }

    }
    onPageChange(page: number) {
        this.filter.page = page;
        this.refresh();
    }
    onPageSizeChange(pageSize: number) {
        this.filter.pageSize = pageSize;
        this.onPageChange(1);
    }

    search() {
        this.onPageChange(1);
    }

    reset() {
        this.filter = {};
    }
}