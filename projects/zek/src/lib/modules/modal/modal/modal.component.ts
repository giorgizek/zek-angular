﻿import { Component, Output, EventEmitter, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BooleanInput, CoreComponent } from '../../../components';
import { BootstrapHelper, ComponentType, Convert, handler, RandomHelper } from '../../../utils';
import { ValidEventArgs } from '../../../models/valid-event-args.model';

declare let bootstrap: any;
// let nextUniqueId = 0;

@Component({
    selector: 'zek-modal',
    templateUrl: './modal.component.html'
})
export class ZekModal extends CoreComponent {
    constructor(private readonly translate: TranslateService) {
        super();
        this.elementId = RandomHelper.randomHex();
    }
    override async destroy() {
        await super.destroy();
        this._modal?.dispose();
        this._modal = null;

        if (this.hiddenHandler) {
            handler.removeListener(this.hiddenHandler);
        }
        if (this.shownHandler) {
            handler.removeListener(this.shownHandler);
        }
    }
    override init() {
        super.init()
        if (!this.okButtonText) {
            this.translate.get('Action.Ok').subscribe(text => {
                this.okButtonText = text;
            });
        }

        setTimeout(() => {
            let modalEl = this.getModalElement();
            if (modalEl) {
                this.shownHandler = handler.addListener(modalEl, 'shown.bs.modal', () => {
                    this.onShown.emit();
                });

                this.hiddenHandler = handler.addListener(modalEl, 'hidden.bs.modal', () => {
                    this.onHidden.emit();
                });
            }
        }, 1);
    }



    shownHandler?: number | null;
    hiddenHandler?: number | null;

    @Input() model: any;
    readonly elementId: string;


    private _showOk: boolean = true;
    @Input()
    get showOk(): boolean {
        return this._showOk;
    }
    set showOk(v: BooleanInput) {
        this._showOk = Convert.toBooleanProperty(v);
    }

    private _disabledOk: boolean = false;
    @Input()
    get disabledOk(): boolean {
        return this._disabledOk;
    }
    set disabledOk(v: BooleanInput) {
        this._disabledOk = Convert.toBooleanProperty(v);
    }

    private _showCancel: boolean = true;
    @Input()
    get showCancel(): boolean {
        return this._showCancel;
    }
    set showCancel(v: BooleanInput) {
        this._showCancel = Convert.toBooleanProperty(v);
    }


    private _autoHide: boolean = true;
    @Input()
    get autoHide(): boolean {
        return this._autoHide;
    }
    set autoHide(v: BooleanInput) {
        this._autoHide = Convert.toBooleanProperty(v);
    }


    @Input() title?: string | null;

    @Input() text?: string | null;

    @Input() icon?: string | null;

    @Input() okButtonText?: string | null;

    @Output() onShown = new EventEmitter<any>();

    @Output() onHidden = new EventEmitter<any>();

    @Output() onOk = new EventEmitter<any>();

    @Input() componentType = ComponentType.Primary;




    private _large: boolean = false;
    @Input()
    get large(): boolean {
        return this._large;
    }
    set large(v: BooleanInput) {
        this._large = Convert.toBooleanProperty(v);
    }

    private _xl: boolean = false;
    @Input()
    get xl(): boolean {
        return this._xl;
    }
    set xl(v: BooleanInput) {
        this._xl = Convert.toBooleanProperty(v);
    }


    private _scrollable: boolean = false;
    @Input()
    get scrollable(): boolean {
        return this._scrollable;
    }
    set scrollable(v: BooleanInput) {
        this._scrollable = Convert.toBooleanProperty(v);
    }

    private _fullscreen: boolean = false;
    @Input()
    get fullscreen(): boolean {
        return this._fullscreen;
    }
    set fullscreen(v: BooleanInput) {
        this._fullscreen = Convert.toBooleanProperty(v);
    }

    private _showHeader: boolean = true;
    @Input()
    get showHeader(): boolean {
        return this._showHeader;
    }
    set showHeader(v: BooleanInput) {
        this._showHeader = Convert.toBooleanProperty(v);
    }

    private _showFooter: boolean = true;
    @Input()
    get showFooter(): boolean {
        return this._showFooter;
    }
    set showFooter(v: BooleanInput) {
        this._showFooter = Convert.toBooleanProperty(v);
    }




    @Output() onValidating = new EventEmitter<ValidEventArgs>(false);
    // @Input() xxl: boolean;

    private _modal: any;
    // public get modal(): any {
    //     if (!this._modal) {
    //         this.getModal();
    //     }
    //     return this._modal;
    // }
    // public set modal(v: any) {
    //     this._modal = v;
    // }

    protected getModalElement() {
        return document.getElementById('modal-' + this.elementId);
    }
    protected getModal() {
        let modalEl = this.getModalElement();
        return new bootstrap.Modal(modalEl, { backdrop: 'static' });
    }




    cssButton(): string {
        return BootstrapHelper.cssButton(this.componentType);
    }

    // private isShown = false;
    show(model?: any) {
        if (!model) model = {};
        this.model = model;

        // this.modal?.show();


        if (!this._modal) {
            this._modal = this.getModal();
        }
        if (this._modal) {
            this._modal.show();
            // this.isShown = true;
        }
    }

    hide() {
        // this.modal?.hide();

        // if (this.isShown) {
        //     if (this._modal) {
        //         this._modal.hide();
        //         this.isShown = false;
        //     }
        // } else {

        // }

        if (this._modal) {
            this._modal.hide();
        }
        else {
            let btn = document.getElementById('modal-cancel-button-' + this.elementId);
            if (btn) {
                btn.click();
            }
        }
    }

    ok() {
        let event = new ValidEventArgs();
        this.onValidating.emit(event);
        if (!event.valid) return;

        if (this.autoHide)
            this.hide();

        this.onOk.emit(this.model);
    }

    keyDown(e: Event) {
        e.preventDefault();
        this.ok();
    }
}

@Component({
    selector: 'zek-delete-modal',
    templateUrl: './modal.component.html'
})
export class ZekDeleteModal extends ZekModal {
    constructor(translate: TranslateService) {
        super(translate);
        this.icon = 'fa-solid fa-trash';
        translate.get('Action.Delete').subscribe((res: string) => this.title = res);
        translate.get('Alert.DeleteQuestion').subscribe((res: string) => this.text = res);
        this.componentType = ComponentType.Delete;
    }
}

@Component({
    selector: 'zek-approve-modal',
    templateUrl: './modal.component.html'
})
export class ZekApproveModal extends ZekModal {
    constructor(translate: TranslateService) {
        super(translate);
        this.icon = 'fa-solid fa-thumbs-up';
        translate.get('Action.Approve').subscribe((res: string) => this.title = res);
        translate.get('Alert.ApproveQuestion').subscribe((res: string) => this.text = res);
        this.componentType = ComponentType.Success;
    }
}
@Component({
    selector: 'zek-submit-modal',
    templateUrl: './modal.component.html'
})
export class ZekSubmitModal extends ZekModal {
    constructor(translate: TranslateService) {
        super(translate);
        this.icon = 'fa-solid fa-thumbs-up';
        translate.get('Action.Submit').subscribe((res: string) => this.title = res);
        translate.get('Alert.SubmitQuestion').subscribe((res: string) => this.text = res);
        this.componentType = ComponentType.Success;
    }
}
@Component({
    selector: 'zek-disapprove-modal',
    templateUrl: './modal.component.html'
})
export class ZekDisapproveModal extends ZekModal {
    constructor(translate: TranslateService) {
        super(translate);
        this.icon = 'fa-solid fa-thumbs-down';
        translate.get('Action.Disapprove').subscribe((res: string) => this.title = res);
        translate.get('Alert.DisapproveQuestion').subscribe((res: string) => this.text = res);
        this.componentType = ComponentType.Delete;
    }
}

@Component({
    selector: 'zek-restore-modal',
    templateUrl: './modal.component.html'
})
export class ZekRestoreModal extends ZekModal {
    constructor(translate: TranslateService) {
        super(translate);
        this.icon = 'fa-solid fa-rotate-right';
        translate.get('Action.Restore').subscribe((res: string) => this.title = res);
        translate.get('Action.RestoreQuestion').subscribe((res: string) => this.text = res);
        this.componentType = ComponentType.Success;
    }
}