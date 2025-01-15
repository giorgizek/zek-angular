import { Component, Output, EventEmitter, Input, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BooleanInput, CoreComponent } from '../../../components';
import { BootstrapHelper, ComponentType, Convert, handler, ObjectHelper, RandomHelper } from '../../../utils';
import { ValidEventArgs } from '../../../models/valid-event-args.model';
import { ModalSize } from '../../../models';

declare let bootstrap: any;

@Component({
    standalone: false,
    selector: 'zek-modal',
    templateUrl: './modal.component.html'
})
export class ZekModal extends CoreComponent {
    protected readonly translate = inject(TranslateService);

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
            const modalEl = this.getModalElement();
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

    private _uniqueId: string = `zek-modal-${this.uniqueId}`;
    /** The unique ID for the radio button. */
    @Input() id: string = this._uniqueId;
    modalId = `${this.id}-modal`;
    lableId = `${this.id}-lable`;
    cancelButtonId = `${this.id}-cancel-button`;
    okButtonId = `${this.id}-ok-button`;

    shownHandler?: number | null;
    hiddenHandler?: number | null;

    @Input() model: any;
    readonly elementId = RandomHelper.randomHex();


    private _showOk = true;
    @Input()
    get showOk(): boolean {
        return this._showOk;
    }
    set showOk(v: BooleanInput) {
        this._showOk = Convert.toBooleanProperty(v);
    }

    private _disabledOk = false;
    @Input()
    get disabledOk(): boolean {
        return this._disabledOk;
    }
    set disabledOk(v: BooleanInput) {
        this._disabledOk = Convert.toBooleanProperty(v);
    }

    private _showCancel = true;
    @Input()
    get showCancel(): boolean {
        return this._showCancel;
    }
    set showCancel(v: BooleanInput) {
        this._showCancel = Convert.toBooleanProperty(v);
    }

    private _autoHide = true;
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

    @Output() onShown = new EventEmitter<void>();

    @Output() onHidden = new EventEmitter<void>();

    @Output() onOk = new EventEmitter<any>();
    @Output() onCancel = new EventEmitter<void>();

    @Input() componentType = ComponentType.Primary;



    private _size: ModalSize = '';
    @Input()
    get size() {
        return this._size;
    }
    set size(v: ModalSize) {
        this._size = v;
    }

    /**
     * @deprecated Please use size property
     */
    @Input()
    get large(): boolean {
        return this._size === 'lg';
    }
    set large(v: BooleanInput) {
        this._size = Convert.toBooleanProperty(v) ? 'lg' : '';
    }

    /**
     * @deprecated Please use size property
     */
    @Input()
    get xl(): boolean {
        return this._size === 'xl';
    }
    set xl(v: BooleanInput) {
        this._size = Convert.toBooleanProperty(v) ? 'xl' : '';
    }


    private _scrollable = false;
    @Input()
    get scrollable(): boolean {
        return this._scrollable;
    }
    set scrollable(v: BooleanInput) {
        this._scrollable = Convert.toBooleanProperty(v);
    }

    private _fullscreen = false;
    @Input()
    get fullscreen(): boolean {
        return this._fullscreen;
    }
    set fullscreen(v: BooleanInput) {
        this._fullscreen = Convert.toBooleanProperty(v);
    }

    private _showHeader = true;
    @Input()
    get showHeader(): boolean {
        return this._showHeader;
    }
    set showHeader(v: BooleanInput) {
        this._showHeader = Convert.toBooleanProperty(v);
    }

    private _showFooter = true;
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
        return document.getElementById(this.modalId);
    }
    /**
     * Creates  with method new bootstrap.Modal(modalId, { backdrop: 'static' });
     * @returns boostrap modal
     */
    protected createModal() {
        const modalEl = this.getModalElement();
        return new bootstrap.Modal(modalEl, { backdrop: 'static' });
    }




    cssButton() {
        return BootstrapHelper.cssButton(this.componentType);
    }

    // private isShown = false;
    show(model?: any) {
        if (!ObjectHelper.isDefined(model)) model = {};
        this.model = model;

        // this.modal?.show();


        if (!this._modal) {
            this._modal = this.createModal();
        }
        if (this._modal) {
            this._modal.show();
            // this.isShown = true;
        }
    }


    cancel() {
        this.onCancel.emit();
        this.hide();
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
            const btn = document.getElementById(this.cancelButtonId);
            if (btn) {
                btn.click();
            }
        }
    }



    ok() {
        const event = new ValidEventArgs();
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

/**
 * @deprecated Please use ZekModal
 */
@Component({
    standalone: false,
    selector: 'zek-delete-modal',
    templateUrl: './modal.component.html'
})
export class ZekDeleteModal extends ZekModal {
    constructor() {
        super();
        this.icon = 'fa-solid fa-trash';
        this.translate.get('Action.Delete').subscribe((res: string) => this.title = res);
        this.translate.get('Alert.DeleteQuestion').subscribe((res: string) => this.text = res);
        this.componentType = ComponentType.Delete;
    }
}

/**
 * @deprecated Please use ZekModal
 */
@Component({
    standalone: false,
    selector: 'zek-approve-modal',
    templateUrl: './modal.component.html'
})
export class ZekApproveModal extends ZekModal {
    constructor() {
        super();
        this.icon = 'fa-solid fa-thumbs-up';
        this.translate.get('Action.Approve').subscribe((res: string) => this.title = res);
        this.translate.get('Alert.ApproveQuestion').subscribe((res: string) => this.text = res);
        this.componentType = ComponentType.Success;
    }
}

/**
 * @deprecated Please use ZekModal
 */
@Component({
    standalone: false,
    selector: 'zek-submit-modal',
    templateUrl: './modal.component.html'
})
export class ZekSubmitModal extends ZekModal {
    constructor() {
        super();
        this.icon = 'fa-solid fa-thumbs-up';
        this.translate.get('Action.Submit').subscribe((res: string) => this.title = res);
        this.translate.get('Alert.SubmitQuestion').subscribe((res: string) => this.text = res);
        this.componentType = ComponentType.Success;
    }
}

/**
 * @deprecated Please use ZekModal
 */
@Component({
    standalone: false,
    selector: 'zek-disapprove-modal',
    templateUrl: './modal.component.html'
})
export class ZekDisapproveModal extends ZekModal {
    constructor() {
        super();
        this.icon = 'fa-solid fa-thumbs-down';
        this.translate.get('Action.Disapprove').subscribe((res: string) => this.title = res);
        this.translate.get('Alert.DisapproveQuestion').subscribe((res: string) => this.text = res);
        this.componentType = ComponentType.Delete;
    }
}


/**
 * @deprecated Please use ZekModal
 */
@Component({
    standalone: false,
    selector: 'zek-restore-modal',
    templateUrl: './modal.component.html'
})
export class ZekRestoreModal extends ZekModal {
    constructor() {
        super();
        this.icon = 'fa-solid fa-rotate-right';
        this.translate.get('Action.Restore').subscribe((res: string) => this.title = res);
        this.translate.get('Action.RestoreQuestion').subscribe((res: string) => this.text = res);
        this.componentType = ComponentType.Success;
    }
}