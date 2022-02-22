import { Component, Output, EventEmitter, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CoreComponent } from '../../../components';
import { BootstrapHelper, ComponentType, handler, RandomHelper } from '../../../utils';
import { ValidEventArgs } from '../../../models/valid-event-args.model';

declare let bootstrap: any;

@Component({
    selector: 'zek-modal',
    templateUrl: './modal.component.html'
})
export class ModalComponent extends CoreComponent {
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
            this.translate.get('Core.Action.OK').subscribe(text => {
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

    @Input() showOk = true;

    @Input() disabledOk = false;

    @Input() showCancel = true;

    @Input() autoHide = true;

    @Input() title?: string | null;

    @Input() text?: string;

    @Input() icon?: string;

    @Input() okButtonText?: string | null;

    @Output() onShown = new EventEmitter<any>();

    @Output() onHidden = new EventEmitter<any>();

    @Output() onOk = new EventEmitter<any>();

    @Input() componentType = ComponentType.Primary;

    @Input() large?: boolean;

    @Input() xl?: boolean;

    @Input() scrollable?: boolean;

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
export class DeleteModalComponent extends ModalComponent {
    constructor(translate: TranslateService) {
        super(translate);
        this.icon = 'fas fa-fas fa-trash';
        translate.get('Core.Action.Delete').subscribe((res: string) => this.title = res);
        translate.get('Core.Action.DeleteQuestion').subscribe((res: string) => this.text = res);
        this.componentType = ComponentType.Delete;
    }
}

@Component({
    selector: 'zek-approve-modal',
    templateUrl: './modal.component.html'
})
export class ApproveModalComponent extends ModalComponent {
    constructor(translate: TranslateService) {
        super(translate);
        this.icon = 'fas fa-thumbs-up';
        translate.get('Core.Action.Approve').subscribe((res: string) => this.title = res);
        translate.get('Core.Action.ApproveQuestion').subscribe((res: string) => this.text = res);
        this.componentType = ComponentType.Success;
    }
}
@Component({
    selector: 'zek-submit-modal',
    templateUrl: './modal.component.html'
})
export class SubmitModalComponent extends ModalComponent {
    constructor(translate: TranslateService) {
        super(translate);
        this.icon = 'fas fa-thumbs-up';
        translate.get('Core.Action.Submit').subscribe((res: string) => this.title = res);
        translate.get('Core.Action.SubmitQuestion').subscribe((res: string) => this.text = res);
        this.componentType = ComponentType.Success;
    }
}
@Component({
    selector: 'zek-disapprove-modal',
    templateUrl: './modal.component.html'
})
export class DisapproveModalComponent extends ModalComponent {
    constructor(translate: TranslateService) {
        super(translate);
        this.icon = 'fas fa-thumbs-down';
        translate.get('Core.Action.Disapprove').subscribe((res: string) => this.title = res);
        translate.get('Core.Action.DisapproveQuestion').subscribe((res: string) => this.text = res);
        this.componentType = ComponentType.Delete;
    }
}

@Component({
    selector: 'zek-restore-modal',
    templateUrl: './modal.component.html'
})
export class RestoreModalComponent extends ModalComponent {
    constructor(translate: TranslateService) {
        super(translate);
        this.icon = 'fas fa-redo';
        translate.get('Core.Action.Restore').subscribe((res: string) => this.title = res);
        translate.get('Core.Action.RestoreQuestion').subscribe((res: string) => this.text = res);
        this.componentType = ComponentType.Success;
    }
}