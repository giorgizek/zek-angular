﻿import { ViewChild, Directive, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { IService } from '../services';
import { BaseComponent } from './base.component';
import { ApproveModel, FilterBase, PagedList, Pager, PrintType } from '../models';
import { ZekModal } from '../modules/modal/modal/modal.component';
import { AlertService } from '../services/alert.service';
import { FilterHelper, PagerHelper, StorageHelper, StringHelper, UrlHelper } from '../utils';
import { firstValueFrom } from 'rxjs';
// declare let bootstrap: any;

@Directive()
export class ListBaseComponent<TService extends IService = IService, TPagedListData = any> extends BaseComponent<PagedList<TPagedListData>> {
    filter: any = new FilterBase();
    saveFilter = true;
    sortFields: any;
    protected internalFilter: any = new FilterBase();
    isFiltered = false;
    selectedIds: any[] = [];
    pager = new Pager();
    sumModel: any;


    @ViewChild('filterModal', { static: false }) protected readonly filterModal?: ZekModal | null;

    approveModel: ApproveModel = {};
    @ViewChild('approveModal', { static: false }) protected readonly approveModal?: ZekModal | null;
    protected approvedMesage = 'Alert.Approved';

    @ViewChild('disapproveModal', { static: false }) protected readonly disapproveModal?: ZekModal | null;
    protected disapprovedMesage = 'Alert.Disapproved';

    constructor(protected readonly service: TService) {
        super();
    }


    readonly translate = inject(TranslateService);
    readonly alert = inject(AlertService);






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
        this.model = await firstValueFrom(this.apiGetAll(this.internalFilter));
        if (this.model) {
            let totalCount = this.model.totalItemCount;
            if (!totalCount && this.model.pager) {
                totalCount = this.model.pager ? (this.model.pager.totalItemCount || 0) : 0;
            }
            this.pager = PagerHelper.get(totalCount, this.internalFilter.page, this.internalFilter.pageSize);

        }
        else
            this.pager = new Pager();
        //this.pagedList.pager = this.pager;
    }
    apiGetAll(filter: any) {
        return this.service.getAll(filter);
    }


    protected initDefaultFilter() {
    }
    private initStoredFilter() {
        const filterParam = this.getQueryParam('filter') || this.getParam('filter');

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
        const url = UrlHelper.getNoParam(this.router.url);
        // this.router.navigate([url, 'create', { returnUrl: url + ';filter=1' }]);
        this.router.navigate([url, 'create'],
            { queryParams: { returnUrl: url + '?filter=1' } }
        );
    }
    async delete(id: any) {
        this.alert.clear();
        const data = await firstValueFrom(this.apiDelete(id));
        if (data?.success) {
            const message = await firstValueFrom(this.translate.get('Alert.Deleted'));
            this.alert.error(message, null, 'fa-solid fa-trash')
            this.refresh();
        }
    }
    apiDelete(id: any) {
        return this.service.delete(id);
    }

    async delete2(id: any, id2: any) {
        this.alert.clear();
        const data = await firstValueFrom(this.apiDelete2(id, id2))
        if (data?.success) {
            const message = await firstValueFrom(this.translate.get('Alert.Deleted'));
            this.alert.error(message, null, 'fa-solid fa-trash')
            this.refresh();
        }
    }
    apiDelete2(id: any, id2: any) {
        return this.service.delete2(id, id2);
    }

    edit(id: number) {
        // this.router.navigate([this.url, id],
        //     { queryParams: { returnUrl: this.url + ';filter=1' } }
        // );

        this.router.navigate([this.url, id],
            { queryParams: { returnUrl: this.url + '?filter=1' } }
        );
    }
    edit2(id: number, id2: number) {
        // this.router.navigate([this.url, id, id2, { returnUrl: this.url + ';filter=1' }]);
        this.router.navigate([this.url, id, id2],
            { queryParams: { returnUrl: this.url + '?filter=1' } }
        );
    }
    select(item: any) {
        item.selected = !item.selected;
        const id = item.id;
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

        const tmp = { ids: [id] };
        this.approveModel = {};
        this.approveModal.show(tmp);
    }
    showApproveSelectedModal() {
        const tmp = { ids: this.getSelectedIds() };
        if (!tmp.ids || tmp.ids.length === 0 || !this.approveModal) return;

        this.approveModel = {};
        this.approveModal.show(tmp);
    }
    async approve(model: any) {
        if (!model) return;

        this.alert.clear();
        const data = await firstValueFrom(this.apiApprove(model));
        if (!data || data.length === 0)
            return;

        const message = await firstValueFrom(this.translate.get(this.approvedMesage));
        this.alert.success(message, null, 'fa-solid fa-thumbs-up')
        this.refresh();
    }
    apiApprove(model: any) {
        return this.service.approve(model);
    }


    showDisapproveModal(id: number) {
        if (!id || !this.disapproveModal) return;

        const tmp = { ids: [id] };
        this.approveModel = {};
        this.disapproveModal.show(tmp);
    }
    showDisapproveSelectedModal() {
        const tmp = { ids: this.getSelectedIds() };
        if (!tmp.ids || tmp.ids.length === 0 || !this.disapproveModal) return;

        this.approveModel = {};
        this.disapproveModal.show(tmp);
    }
    async disapprove(model: any) {
        if (!model || !this.approveModel) return;

        if (typeof model === 'object') {
            model.status = this.approveModel.status;
            model.comment = StringHelper.tryTrim(this.approveModel.comment);
            if (!model.comment) delete model.comment;
        }

        this.alert.clear();
        const data = await firstValueFrom(this.apiDisapprove(model));
        if (!data || data.length === 0)
            return;

        const message = await firstValueFrom(this.translate.get(this.disapprovedMesage));
        this.alert.success(message, null, 'fa-solid fa-thumbs-down')
        this.refresh();
    }
    apiDisapprove(model: any) {
        return this.service.disapprove(model);
    }

    getSelectedIds() {
        return this.selectedIds;
        // if (!this.pagedList || !this.pagedList.items) return [];

        // let ids = [];
        // for (const item of this.pagedList.items) {
        //     if (!item.selected || !item.id) continue;

        //     ids.push(item.id);
        // }
        // return ids;
    }

    showSum() { }
    async sum() {
        this.sumModel = null;
        const data = await firstValueFrom(this.apiSum(this.internalFilter));
        if (data) {
            this.sumModel = data;
            this.showSum();
        } else {
            const message = await firstValueFrom(this.translate.get('Alert.SumError'));
            this.alert.error(message);
        }
    }
    apiSum(filter: any) {
        return this.service.sum(filter);
    }

    export(fileTypeId: number) {
        this.service.export(this.internalFilter, fileTypeId).subscribe(data => {
            this.downloadFile(data, 'export.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        });
    }


    override print(printType?: PrintType) {
        if (!this.model || !this.model.items) return;

        const ids = this.getSelectedIds();
        for (const id of ids) {
            super.print(id, printType);
        }
    }
}