﻿import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild, Directive } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { IService } from '../services';
import { BaseComponent } from './base.component';
import { FilterBase, PagedList, Pager, PrintType } from '../models';
import { ModalComponent } from '../modules/modal/modal/modal.component';
import { AlertService } from '../services/alert.service';
import { FilterHelper, ObjectHelper, PagerHelper, StorageHelper, StringHelper } from '../utils';
import { firstValueFrom } from 'rxjs';
declare let bootstrap: any;


@Directive()
export class ListBaseComponent<TService extends IService = IService> extends BaseComponent<PagedList> {
    filter: any = new FilterBase();
    saveFilter = true;
    sortFields: any;
    protected internalFilter: any = new FilterBase();
    isFiltered: boolean = false;
    selectedIds: any[] = [];
    pager = new Pager();
    sumModel: any;


    @ViewChild('filterModal', { static: false }) protected readonly filterModal?: ModalComponent | null;
    approveModel: { ids?: number[], comment?: string } = {};
    @ViewChild('approveModal', { static: false }) protected readonly approveModal?: ModalComponent | null;
    @ViewChild('disapproveModal', { static: false }) protected readonly disapproveModal?: ModalComponent | null;

    constructor(
        protected readonly service: TService,
        readonly translateService: TranslateService,
        readonly alertService: AlertService,
        route: ActivatedRoute,
        router: Router) {
        super(route, router);
    }

    override init() {
        super.init();

        this.reset();
        this.initDefaultFilter();
        this.initStoredFilter();
        this.assignFilter();

        //this.selectedIds = [];
        //this.pagedList = new PagedList();
    }
    override async bindModel(): Promise<void> {
        this.selectedIds = [];
        this.model = await firstValueFrom(this.service.getAll(this.internalFilter));
        if (this.model)
            this.pager =  PagerHelper.get(this.model.pager ? this.model.pager.totalItemCount : 0, this.internalFilter.page, this.internalFilter.pageSize);
        else
            this.pager = new Pager();
        //this.pagedList.pager = this.pager;
    }


    protected initDefaultFilter() {
    }
    private initStoredFilter() {
        let filterParam = this.getParam('filter');

        if (filterParam) {
            const tmp = StorageHelper.get('filter');
            if (tmp && tmp.url && tmp.url === this.url && tmp.filter) {
                this.filter = Object.assign({}, tmp.filter);
                //we dont need this.assignFilter(); because after initStoredFilter(); will be assigned.
            } else {
                localStorage.removeItem('filter');
            }
        } else {
            localStorage.removeItem('filter');
        }
    }
    changePage(page: number) {
        this.internalFilter.page = page;
        this.filter.page = page;
        this.refresh();
        this.autoSaveFilter();
    }
    changePageSize(pageSize: number) {
        this.internalFilter.pageSize = pageSize;
        this.filter.pageSize = pageSize;
        this.changePage(1);
    }
    showFilter() {
        this.filterModal?.show();
    }
    search() {
        //this.filterModal?.hide();
        this.assignFilter();
        this.changePage(1);
        //this.internalAutoSaveFilter();
    }
    protected assignFilter() {
        this.internalFilter = Object.assign({}, this.filter);
        this.isFiltered = !FilterHelper.isEmpty(this.internalFilter);
    }
    private autoSaveFilter() {
        if (this.saveFilter)
            this.internalSaveFilter()
    }
    private internalSaveFilter() {
        StorageHelper.set('filter', {
            url: this.url,
            filter: this.internalFilter
        });
    }
    reset() {
        this.filter = { page: 1, pageSize: 25 };
        this.assignFilter();
    }
    refresh() {
        this.bindModel();
    }


    create() {
        const url = this.router.url.split(';')[0];
        this.router.navigate([url, 'create', { returnUrl: url + ';filter=1' }]);
    }
    async delete(id: number) {
        let data = await firstValueFrom(this.service.delete(id));
        if (data?.success) {
            let message = await firstValueFrom(this.translateService.get('Alert.Deleted'));
            this.alertService.error(message, null, 'fas fa-trash')
            this.refresh();
        }
    }
    async delete2(id: number, id2: number) {
        let data = await firstValueFrom(this.service.delete2(id, id2))
        if (data?.success) {
            let message = await firstValueFrom(this.translateService.get('Alert.Deleted'));
            this.alertService.error(message, null, 'fas fa-trash')
            this.refresh();
        }
    }

    edit(id: number) {
        this.router.navigate([this.url, id, { returnUrl: this.url + ';filter=1' }]);
    }
    edit2(id: number, id2: number) {
        this.router.navigate([this.url, id, id2, { returnUrl: this.url + ';filter=1' }]);
    }
    select(item: any) {
        item.selected = !item.selected;
        let id = item.id;
        if (id) {
            if (item.selected) {
                this.selectedIds.push(id);
            } else {
                this.selectedIds = this.selectedIds.filter(item => item !== id);
            }
        }
    }



    showApproveModal(id: number) {
        if (!id || !this.approveModal) return;

        let tmp = { ids: [id] };
        this.approveModel = {};
        this.approveModal.show(tmp);
    }
    showApproveSelectedModal() {
        let tmp = { ids: this.getSelectedIds() };
        if (!tmp.ids || tmp.ids.length === 0 || !this.approveModal) return;

        this.approveModel = {};
        this.approveModal.show(tmp);
    }
    async approve(m: any) {
        if (!m) return;

        let data = await firstValueFrom(this.service.approve(m));
        if (!data || data.length === 0)
            return;

        let message = await firstValueFrom(this.translateService.get('Alert.Approved'));
        this.alertService.success(message, undefined, 'fas fa-thumbs-up')
        this.refresh();
    }


    showDisapproveModal(id: number) {
        if (!id || !this.disapproveModal) return;

        let tmp = { ids: [id] };
        this.approveModel = {};
        this.disapproveModal.show(tmp);
    }
    showDisapproveSelectedModal() {
        let tmp = { ids: this.getSelectedIds() };
        if (!tmp.ids || tmp.ids.length === 0 || !this.disapproveModal) return;

        this.approveModel = {};
        this.disapproveModal.show(tmp);
    }
    async disapprove(m: any) {
        if (!m || !this.approveModel) return;

        if ( typeof m === 'object'){
            m.comment = StringHelper.tryTrim(this.approveModel.comment);
            if (!m.comment) delete m.comment;
        }

        let data = await firstValueFrom(this.service.disapprove(m));
        if (!data || data.length === 0)
            return;

        let message = await firstValueFrom(this.translateService.get('Alert.Disapproved'));
        this.alertService.success(message, undefined, 'fas fa-thumbs-down')
        this.refresh();
    }

    getSelectedIds() {
        return this.selectedIds;
        // if (!this.pagedList || !this.pagedList.data) return [];

        // let ids = [];
        // for (const item of this.pagedList.data) {
        //     if (!item.selected || !item.id) continue;

        //     ids.push(item.id);
        // }
        // return ids;
    }

    showSum() { }
    async sum() {
        this.sumModel = null;
        let data = await firstValueFrom(this.service.sum(this.internalFilter));
        if (data) {
            this.sumModel = data;
            this.showSum();
        } else {
            let message = await firstValueFrom(this.translateService.get('Alert.SumError'));
            this.alertService.error(message);
        }
    }

    export(fileTypeId: number) {
        this.service.export(this.internalFilter, fileTypeId).subscribe(data => {
            this.downloadFile(data, 'export.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        });
    }


    override print(printType?: PrintType) {
        if (!this.model || !this.model.data) return;

        let ids = this.getSelectedIds();
        for (const id of ids) {
            super.print(id, printType);
        }
    }
}