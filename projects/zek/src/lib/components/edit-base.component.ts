import { ViewChild, Directive } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { BaseComponent } from './base.component';
import { IObjectConstructor, PrintType } from '../models';
import { ZekModal } from '../modules/modal/modal/modal.component';
import { AlertService } from '../services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { IService } from '../services';
import { firstValueFrom } from 'rxjs';
// import { IObjectConstructor } from '../models/ctor';
// import { IService } from '../services/base.service';
// import { AlertService } from '../modules/alert/shared/alert.service';
// import { Area } from '../models/area.model';
// import { PrintType } from '../models/print.model';
// import { TranslateService } from '@ngx-translate/core';
// import { ModalComponent } from '../modules/modal/modal.component';

@Directive()
export class EditFormComponent<TModel = any> extends BaseComponent<TModel> {
    id?: number | null;
    id2?: number | null;
    //   area = Area;
    @ViewChild('f', { static: false }) form?: NgForm;


    approveModel: { ids?: number[], comment?: string | null } = {};
    @ViewChild('approveModal', { static: false }) protected readonly approveModal?: ZekModal;
    @ViewChild('disapproveModal', { static: false }) protected readonly disapproveModal?: ZekModal;
    // @ViewChild('submitModal', { static: false }) protected readonly submitModal?: ModalComponent;

    override init() {
        super.init();
        const idParam = this.getParam('id') || this.getQueryParam('id');
        if (idParam)
            this.id = +idParam;

        const id2Param = this.getParam('id2') || this.getQueryParam('id2');
        if (id2Param)
            this.id2 = +id2Param;
    }

    override async bindModel() {
        if (this.id) {
            this.model = await this.getModel();
        }
        else {
            this.initCreate();
        }
    }

    protected initCreate() {
        this.model = {} as TModel;
    }

    protected getModel(): Promise<any> {
        throw 'Not implemented getModel';
    }

    onSubmit(f: NgForm) {
        this.save(f);
    }
    async save(f?: NgForm) {
        if (!f || f.valid) {
            return await this.internalSave(true);
        }

        return false;
    }
    protected internalSave(navigateToReturnUrl?: boolean): Promise<boolean> {
        throw 'Not implemented internalSave';
    }


    showApproveModal() {
        this.approveModel = {};
        if (this.approveModal) {
            this.approveModal.show();
        }
        else {
            throw new Error('approveModal is null or undefined');
        }
    }
    async approve() {
        if (this.id) {
            this.approveModel.ids = [this.id];
            let approved = await this.internalApprove(this.approveModel);
            if (approved) {
                this.load();
            }
        }
    }
    protected internalApprove(approveModel?: any): Promise<boolean> {
        throw 'Not implemented internalApprove';
    }

    showDisapproveModal() {
        this.approveModel = {};
        if (this.disapproveModal) {
            this.disapproveModal.show();
        }
        else {
            throw new Error('disapproveModal is null or undefined');
        }
    }
    async disapprove() {
        if (this.id) {
            this.approveModel.ids = [this.id];
            let disapproved = await this.internalDisapprove(this.approveModel);
            if (disapproved) {
                this.load();
            }
        }
    }
    protected internalDisapprove(model?: any): Promise<boolean> {
        throw 'Not implemented internalDisapprove';
    }
}

@Directive()
export class EditBaseComponent<TModel = any> extends EditFormComponent<TModel> {

    constructor(
        readonly service: IService,
        readonly translate: TranslateService,
        readonly alert: AlertService,
        route: ActivatedRoute,
        router: Router) {
        super(route, router);
    }

    protected override async internalSave(navigateToReturnUrl?: boolean | null): Promise<boolean> {
        this.alert.clear();
        let data = await firstValueFrom(this.service.save(this.model));
        let success = false;
        if (typeof data === 'number' && data > 0) {
            success = true;
            this.id = data;
        } else if (typeof data === 'object' && data?.success) {
            success = true;
        }

        if (success) {
            let message = await firstValueFrom(this.translate.get('Alert.SaveSuccess'));
            this.alert.success(message, null, 'fa-solid fa-floppy-disk');

            if (navigateToReturnUrl === true) {
                this.navigateReturnUrl();
            }

            return true;
            // if (navigateToReturnUrl) {
            //   this.navigateReturnUrl();
            // } else if (!this.id) {//if insert
            //   this.router.navigate([this.router.url.substring(0, this.router.url.length - 6), id]);
            // }
        } else {
            let message = await firstValueFrom(this.translate.get('Alert.SaveError'));
            this.alert.error(message, null, 'fa-solid fa-floppy-disk');
            return false;
        }
    }

    protected override async internalApprove(model?: any): Promise<boolean> {
        let data = await firstValueFrom(this.service.approve(model));
        if (data && data.length > 0) {
            let message = await firstValueFrom(this.translate.get('Alert.Approved'));
            this.alert.success(message, null, 'fa-solid fa-floppy-disk');
            return true;
        } else {
            let message = await firstValueFrom(this.translate.get('Alert.ApproveError'));
            this.alert.error(message, null, 'fa-solid fa-floppy-disk');
            return false;
        }
    }

    protected override async internalDisapprove(model?: any): Promise<boolean> {
        let data = await firstValueFrom(this.service.disapprove(model));
        if (data && data.length > 0) {
            let message = await firstValueFrom(this.translate.get('Alert.Disapproved'));
            this.alert.success(message, null, 'fa-solid fa-floppy-disk');
            return true;
        } else {
            let message = await firstValueFrom(this.translate.get('Alert.DisapproveError'));
            this.alert.error(message, null, 'fa-solid fa-floppy-disk');
            return false;
        }
    }

    protected async internalSubmit(model?: any): Promise<boolean> {
        let data = await firstValueFrom(this.service.approve(model));
        if (data && data.length > 0) {
            let message = await firstValueFrom(this.translate.get('Alert.Submitted'));
            this.alert.success(message, null, 'fa-solid fa-floppy-disk');
            return true;
        } else {
            let message = await firstValueFrom(this.translate.get('Alert.SubmitError'));
            this.alert.error(message, null, 'fa-solid fa-floppy-disk');
            return false;
        }
    }




    protected override async getModel() {
        if (this.id2)
            return await firstValueFrom(this.service.get2(this.id, this.id2));
        else
            return await firstValueFrom(this.service.get(this.id));
    }
    protected override initCreate() {
        this.model = {} as TModel;
    }

    override print(printType?: PrintType) {
        super.print(this.id, printType);
    }

    async restore() {
        let data = await firstValueFrom(this.service.restore(this.id))
        if (data?.success) {
            let message = await firstValueFrom(this.translate.get('Alert.Restored'));
            this.alert.success(message);
            this.load();
        }
    }
    export(fileTypeId: number) {
        this.service.export({ id: this.id }, fileTypeId).subscribe(data => {
            this.downloadFile(data, 'export.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        });
    }
}

@Directive()
export class EditComponent<TModel> extends EditBaseComponent<TModel> {

    constructor(
        private readonly ctorModel: IObjectConstructor<TModel>,
        service: IService,
        translate: TranslateService,
        alert: AlertService,
        route: ActivatedRoute,
        router: Router) {
        super(service, translate, alert, route, router);
    }

    protected override initCreate() {
        this.model = new this.ctorModel();
    }
}